import nodemailer, { type Transporter } from "nodemailer";

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  submittedAt: string;
  clientIp: string;
};

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  toEmail: string;
  fromEmail: string;
};

let cachedTransporter: Transporter | undefined;
let cachedConfigKey = "";

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function parseBoolean(value: string | undefined) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;
  return undefined;
}

function getMailConfig(): { config?: MailConfig; missing: string[]; invalid: string[] } {
  const missing: string[] = [];
  const invalid: string[] = [];

  const host = requiredEnv("SMTP_HOST");
  const rawPort = requiredEnv("SMTP_PORT");
  const rawSecure = requiredEnv("SMTP_SECURE");
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const toEmail = requiredEnv("CONTACT_TO_EMAIL") || "aryanthealgohype@gmail.com";
  const fromEmail = requiredEnv("CONTACT_FROM_EMAIL") || requiredEnv("SMTP_USER") || "aryanthealgohype@gmail.com";

  for (const [key, value] of Object.entries({
    SMTP_HOST: host,
    SMTP_PORT: rawPort,
    SMTP_SECURE: rawSecure,
    SMTP_USER: user,
    SMTP_PASS: pass,
    CONTACT_TO_EMAIL: toEmail,
    CONTACT_FROM_EMAIL: fromEmail,
  })) {
    if (!value) missing.push(key);
  }

  const port = rawPort ? Number(rawPort) : NaN;
  if (rawPort && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    invalid.push("SMTP_PORT must be an integer between 1 and 65535");
  }

  const secure = parseBoolean(rawSecure);
  if (rawSecure && secure === undefined) {
    invalid.push("SMTP_SECURE must be true or false");
  }

  if (missing.length || invalid.length || secure === undefined) {
    return { missing, invalid };
  }

  return {
    missing,
    invalid,
    config: {
      host: host!,
      port,
      secure,
      user: user!,
      pass: pass!,
      toEmail: toEmail!,
      fromEmail: fromEmail!,
    },
  };
}

function configKey(config: MailConfig) {
  return [
    config.host,
    config.port,
    config.secure,
    config.user,
    config.toEmail,
    config.fromEmail,
  ].join("|");
}

export function getMailTransporter(config: MailConfig) {
  const nextKey = configKey(config);
  if (!cachedTransporter || cachedConfigKey !== nextKey) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
    cachedConfigKey = nextKey;
  }

  return cachedTransporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function adminEmailHtml(lead: ContactLead) {
  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Selected Service", lead.service],
    ["Submission Time", lead.submittedAt],
    ["Client IP", lead.clientIp || "Unavailable"],
  ];

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f0e8;padding:32px;font-family:Inter,Arial,sans-serif;color:#2d261f">
    <table role="presentation" style="width:100%;border-collapse:collapse">
      <tr>
        <td align="center">
          <table role="presentation" style="width:100%;max-width:680px;border-collapse:collapse;background:#fffaf3;border:1px solid #ded0bd;border-radius:18px;overflow:hidden">
            <tr>
              <td style="background:#23180f;color:#fffaf3;padding:28px 32px">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d7c3ab">Aryan.AI Contact</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2">New project brief received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px">
                <table role="presentation" style="width:100%;border-collapse:collapse">
                  ${rows
                    .map(
                      ([label, value]) => `<tr>
                        <td style="width:180px;padding:12px;border-bottom:1px solid #eadfce;color:#725f4c;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">${escapeHtml(label)}</td>
                        <td style="padding:12px;border-bottom:1px solid #eadfce;font-size:15px;color:#2d261f">${escapeHtml(value)}</td>
                      </tr>`,
                    )
                    .join("")}
                </table>
                <div style="margin-top:24px">
                  <p style="margin:0 0 10px;color:#725f4c;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">Message</p>
                  <div style="white-space:pre-wrap;background:#f8f1e7;border:1px solid #eadfce;border-radius:14px;padding:18px;font-size:15px;line-height:1.65;color:#2d261f">${escapeHtml(lead.message)}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function confirmationEmailHtml(lead: ContactLead) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f6f0e8;padding:32px;font-family:Inter,Arial,sans-serif;color:#2d261f">
    <table role="presentation" style="width:100%;border-collapse:collapse">
      <tr>
        <td align="center">
          <table role="presentation" style="width:100%;max-width:620px;border-collapse:collapse;background:#fffaf3;border:1px solid #ded0bd;border-radius:18px;overflow:hidden">
            <tr>
              <td style="background:#23180f;color:#fffaf3;padding:28px 32px">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d7c3ab">Aryan.AI</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2">Thanks for reaching out</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;font-size:15px;line-height:1.7">
                <p style="margin:0 0 16px">Hi ${escapeHtml(lead.name)},</p>
                <p style="margin:0 0 16px">Thanks for contacting us about <strong>${escapeHtml(lead.service)}</strong>. Your message has been received, and Aryan will review it shortly.</p>
                <p style="margin:0 0 16px">We usually reply within 24 hours. Here is a copy of your message for reference:</p>
                <div style="white-space:pre-wrap;background:#f8f1e7;border:1px solid #eadfce;border-radius:14px;padding:18px;color:#2d261f">${escapeHtml(lead.message)}</div>
                <p style="margin:20px 0 0;color:#725f4c;font-size:13px">Submitted at ${escapeHtml(lead.submittedAt)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactEmails(lead: ContactLead) {
  const { config, missing, invalid } = getMailConfig();
  if (!config) {
    const detail = [...missing.map((key) => `Missing ${key}`), ...invalid].join("; ");
    console.error("[contact-mail] SMTP configuration error:", detail);
    return {
      ok: false as const,
      error: "Contact email delivery is not configured correctly.",
      detail,
    };
  }

  const transporter = getMailTransporter(config);

  try {
    const adminMail = await transporter.sendMail({
      from: config.fromEmail,
      to: config.toEmail,
      replyTo: lead.email,
      subject: `New project brief from ${lead.name}`,
      html: adminEmailHtml(lead),
      text: `New project brief

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
Selected Service: ${lead.service}
Submission Time: ${lead.submittedAt}
Client IP: ${lead.clientIp || "Unavailable"}

Message:
${lead.message}`,
    });

    const confirmationMail = await transporter.sendMail({
      from: config.fromEmail,
      to: lead.email,
      replyTo: config.toEmail,
      subject: "Thanks for contacting Aryan.AI",
      html: confirmationEmailHtml(lead),
      text: `Hi ${lead.name},

Thanks for contacting us about ${lead.service}. Your message has been received, and Aryan will review it shortly.

Message:
${lead.message}`,
    });

    console.info("[contact-mail] Emails sent", {
      adminMessageId: adminMail.messageId,
      confirmationMessageId: confirmationMail.messageId,
      to: config.toEmail,
      customer: lead.email,
    });

    return { ok: true as const };
  } catch (error) {
    console.error("[contact-mail] Failed to send contact emails", error);
    return {
      ok: false as const,
      error: "Unable to send contact email right now. Please try again later.",
    };
  }
}
