type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
};

const allowedMethods = "GET,POST,OPTIONS";
const rateLimitWindowMs = 60_000;
const rateLimitMax = 12;
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

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const configuredOrigins = process.env.ALLOWED_ORIGINS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowOrigin =
    origin && configuredOrigins?.length
      ? configuredOrigins.includes(origin)
        ? origin
        : configuredOrigins[0]
      : origin || "*";

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": allowedMethods,
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
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

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function forwardLead(payload: Record<string, string>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      source: "ashu.ai",
      submittedAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with ${response.status}`);
  }
}

async function handleContact(request: Request) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  if (isRateLimited(request)) {
    return json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const company = asString(body.company);
  const service = asString(body.service);
  const message = asString(body.message);

  if (!name || !email || !message) {
    return json({ ok: false, error: "Name, email, and message are required" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return json({ ok: false, error: "Enter a valid email address" }, { status: 400 });
  }

  if (message.length > 2_000) {
    return json({ ok: false, error: "Message is too long" }, { status: 400 });
  }

  await forwardLead({ name, email, company, service, message });

  return json({
    ok: true,
    message: "Thanks. Your request has been received.",
  });
}

export async function handleApiRequest(request: Request) {
  const url = new URL(request.url);
  const corsHeaders = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let response: Response | undefined;

    if (url.pathname === "/api") {
      response = json({
        ok: true,
        name: "Ashu.AI API",
        endpoints: ["/api/health", "/api/contact"],
      });
    }

    if (url.pathname === "/api/health") {
      response = json({
        ok: true,
        status: "ready",
        service: "ashu-ai-backend",
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
    console.error(error);
    return json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
