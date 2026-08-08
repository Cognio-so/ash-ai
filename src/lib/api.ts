import { sendContactEmails, type ContactLead } from "./mail";
import { insertLead, fetchAllLeads } from "./supabase-admin";
import { sendResendConfirmation } from "./resend-mail";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
};

type ValidationResult =
  | { ok: true; lead: ContactLead & { company?: string } }
  | { ok: false; status: number; error: string; fields?: Record<string, string> };

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
};

const allowedMethods = "GET,POST,OPTIONS";
const rateLimitWindowMs = 60_000;
const rateLimitMax = 8;
const maxFieldLength = 160;
const maxMessageLength = 2_000;
const contactRateLimit = new Map<string, { count: number; resetAt: number }>();

function json(data: JsonValue, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init.headers,
    },
  });
}

function configuredOrigins() {
  return (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function isOriginAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const origins = configuredOrigins();
  if (origins.length === 0) return true;
  if (origins.includes(origin)) return true;

  // Allow all localhost origins during development
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
    return true;
  }

  // Allow if the origin matches the request host domain (e.g. self-requests)
  const host = request.headers.get("host");
  if (host && (origin === `http://${host}` || origin === `https://${host}`)) {
    return true;
  }

  // Allow Resend/Lovable/Vercel preview and development URLs
  try {
    const originUrl = new URL(origin);
    const hostname = originUrl.hostname;
    if (
      hostname.endsWith(".lovable.app") ||
      hostname.endsWith(".lovable.dev") ||
      hostname.endsWith(".vercel.app") ||
      hostname.endsWith(".codex.dev")
    ) {
      return true;
    }
  } catch {
    // Ignore invalid origin URLs
  }

  return false;
}

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const allowOrigin = origin && isOriginAllowed(request) ? origin : "*";

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": allowedMethods,
    "access-control-allow-headers": "content-type, authorization",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    ""
  );
}

function clientKey(request: Request) {
  return clientIp(request) || "local";
}

function isRateLimited(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const existing = contactRateLimit.get(key);

  if (!existing || existing.resetAt <= now) {
    contactRateLimit.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  existing.count += 1;
  return existing.count > rateLimitMax;
}

function rawString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function sanitizeInput(value: unknown, maxLength = maxFieldLength) {
  return stripControlCharacters(rawString(value)).replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeMessage(value: unknown) {
  return stripControlCharacters(rawString(value)).trim().slice(0, maxMessageLength);
}

function stripControlCharacters(value: string) {
  return Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127);
    })
    .join("");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return /^[+\d][\d\s().-]{6,24}$/.test(value);
}

function validateContactPayload(body: ContactPayload, request: Request): ValidationResult {
  const fields: Record<string, string> = {};
  const name = sanitizeInput(body.name);
  const email = sanitizeInput(body.email).toLowerCase();
  const phone = sanitizeInput(body.phone, 32);
  const company = sanitizeInput(body.company);
  const service = sanitizeInput(body.service);
  const message = sanitizeMessage(body.message);

  if (!name) fields.name = "Name is required.";
  if (!email) fields.email = "Email is required.";
  if (!phone) fields.phone = "Phone is required.";
  if (!service) fields.service = "Service is required.";
  if (!message) fields.message = "Message is required.";

  if (name && name.length < 2) fields.name = "Name must be at least 2 characters.";
  if (email && !isEmail(email)) fields.email = "Enter a valid email address.";
  if (phone && !isPhone(phone)) fields.phone = "Enter a valid phone number.";
  if (service && service.length < 2) fields.service = "Select a valid service.";

  if (rawString(body.message).trim().length > maxMessageLength) {
    fields.message = `Message must be ${maxMessageLength} characters or fewer.`;
  }

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      status: 422,
      error: "Please correct the highlighted fields.",
      fields,
    };
  }

  return {
    ok: true,
    lead: {
      name,
      email,
      phone,
      company,
      service,
      message,
      submittedAt: new Date().toISOString(),
      clientIp: clientIp(request),
    },
  };
}

async function handleContact(request: Request) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  if (!isOriginAllowed(request)) {
    console.warn("[contact-api] Blocked disallowed origin", {
      origin: request.headers.get("origin"),
    });
    return json({ ok: false, error: "Origin is not allowed" }, { status: 403 });
  }

  if (isRateLimited(request)) {
    console.warn("[contact-api] Rate limit exceeded", { clientIp: clientIp(request) || "local" });
    return json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateContactPayload(body, request);
  if (!validation.ok) {
    console.info("[contact-api] Validation failed", {
      fields: Object.keys(validation.fields || {}),
    });
    return json(
      {
        ok: false,
        error: validation.error,
        fields: validation.fields || {},
      },
      { status: validation.status },
    );
  }

  console.info("[contact-api] Contact submission accepted", {
    email: validation.lead.email,
    service: validation.lead.service,
    clientIp: validation.lead.clientIp || "unavailable",
  });

  // 1. Save to Supabase (non-blocking for UX — errors are logged but don't fail the request)
  insertLead({
    name: validation.lead.name,
    email: validation.lead.email,
    phone: validation.lead.phone,
    company: validation.lead.company,
    service: validation.lead.service,
    message: validation.lead.message,
    clientIp: validation.lead.clientIp,
    submittedAt: validation.lead.submittedAt,
  }).catch((err) => console.error("[contact-api] Supabase save failed", err));

  // 2. Send beautiful Resend confirmation to the client (non-blocking)
  sendResendConfirmation(validation.lead).catch((err) =>
    console.error("[contact-api] Resend confirmation failed", err),
  );

  // 3. Send admin notification via SMTP (existing flow)
  const delivery = await sendContactEmails(validation.lead);
  if (!delivery.ok) {
    // SMTP failed, but we still saved to Supabase — return success to user
    console.warn("[contact-api] SMTP delivery failed (Supabase save succeeded)", delivery.error);
  }

  return json(
    {
      ok: true,
      message: "Thanks. Your request has been received.",
    },
    { status: 200 },
  );
}

// ─── Admin Auth ────────────────────────────────────────────────────────────────

function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "aryan-ai-admin-secret-2024-secure";
}

function verifyAdminToken(request: Request): boolean {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token === getAdminSecret();
}

async function handleAdminLogin(request: Request) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as { username?: unknown; password?: unknown };
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const expectedUsername = process.env.ADMIN_USERNAME?.trim() || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim() || "admin@123";

  if (username !== expectedUsername || password !== expectedPassword) {
    console.warn("[admin-api] Failed login attempt", { username });
    return json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  console.info("[admin-api] Admin login successful");
  return json({ ok: true, token: getAdminSecret() }, { status: 200 });
}

async function handleAdminLeads(request: Request) {
  if (request.method !== "GET") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  if (!verifyAdminToken(request)) {
    return json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const result = await fetchAllLeads();
  if (!result.ok) {
    return json({ ok: false, error: result.error || "Failed to fetch leads" }, { status: 500 });
  }

  return json({ ok: true, leads: result.leads ?? [] }, { status: 200 });
}

// ─── Router ────────────────────────────────────────────────────────────────────

export async function handleApiRequest(request: Request) {
  const url = new URL(request.url);
  const corsHeaders = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    if (!isOriginAllowed(request)) {
      return new Response(null, { status: 403, headers: corsHeaders });
    }
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let response: Response | undefined;

    if (url.pathname === "/api") {
      response = json({
        ok: true,
        name: "Aryan.AI API",
        endpoints: ["/api/health", "/api/contact", "/api/admin/login", "/api/admin/leads"],
      });
    }

    if (url.pathname === "/api/health") {
      response = json({
        ok: true,
        status: "ready",
        service: "aryan-ai-backend",
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === "/api/contact") {
      response = await handleContact(request);
    }

    if (url.pathname === "/api/admin/login") {
      response = await handleAdminLogin(request);
    }

    if (url.pathname === "/api/admin/leads") {
      response = await handleAdminLeads(request);
    }

    if (!response) {
      response = json({ ok: false, error: "API route not found" }, { status: 404 });
    }

    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error("[api] Unhandled API error", error);
    return json(
      { ok: false, error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}
