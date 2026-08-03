import { sendContactEmails, type ContactLead } from "./mail";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
};

type ValidationResult =
  | { ok: true; lead: ContactLead }
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
  const origins = configuredOrigins();
  return !origin || origins.length === 0 || origins.includes(origin);
}

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const origins = configuredOrigins();
  const allowOrigin = origin && origins.includes(origin) ? origin : origins[0] || origin || "*";

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": allowedMethods,
    "access-control-allow-headers": "content-type",
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

  const delivery = await sendContactEmails(validation.lead);
  if (!delivery.ok) {
    const responseBody: JsonValue = delivery.detail
      ? { ok: false, error: delivery.error, detail: delivery.detail }
      : { ok: false, error: delivery.error };

    return json(responseBody, { status: 500 });
  }

  return json(
    {
      ok: true,
      message: "Thanks. Your request has been received.",
    },
    { status: 200 },
  );
}

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
        endpoints: ["/api/health", "/api/contact"],
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
