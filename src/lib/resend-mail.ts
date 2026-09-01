// Server-side Resend email sender for client confirmation
// Docs: https://resend.com/docs/api-reference/emails/send-email

import type { ContactLead } from "./mail";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildResendEmailHtml(lead: ContactLead): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you — Aryan.AI</title>
</head>
<body style="margin:0;padding:0;background:#05050f;font-family:'Inter',Arial,sans-serif;color:#e2e8f0">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#05050f;padding:40px 20px">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:linear-gradient(145deg,#0d0d1f,#11112a);border:1px solid rgba(139,92,246,0.25);border-radius:24px;overflow:hidden">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed,#06b6d4);padding:36px 40px;text-align:center">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7)">A R Y A N . A I</p>
              <h1 style="margin:0;font-size:30px;font-weight:800;color:#ffffff;line-height:1.2">✨ We've received your brief!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#cbd5e1">
                Hey <strong style="color:#a78bfa">${escapeHtml(lead.name)}</strong>, 👋
              </p>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#94a3b8">
                Thank you for reaching out about <strong style="color:#e2e8f0">${escapeHtml(lead.service)}</strong>. 
                I personally read every inquiry and will get back to you within <strong style="color:#34d399">24 hours</strong>.
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(139,92,246,0.2);margin:28px 0"></div>

              <!-- Submission Summary -->
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6366f1;font-weight:700">📋 Your Submission Summary</p>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:14px;overflow:hidden">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);width:130px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Name</td>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);color:#e2e8f0;font-size:14px">${escapeHtml(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Email</td>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);color:#e2e8f0;font-size:14px">${escapeHtml(lead.email)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Service</td>
                  <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);color:#a78bfa;font-size:14px;font-weight:600">${escapeHtml(lead.service)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Phone</td>
                  <td style="padding:14px 18px;color:#e2e8f0;font-size:14px">${escapeHtml(lead.phone)}</td>
                </tr>
              </table>

              <!-- Message Preview -->
              <div style="margin-top:24px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.15);border-radius:14px;padding:20px">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6366f1;font-weight:700">Your Message</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#94a3b8;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
              </div>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(139,92,246,0.2);margin:28px 0"></div>

              <!-- CTA -->
              <div style="text-align:center">
                <p style="margin:0 0 20px;font-size:14px;color:#64748b">While you wait, explore my work</p>
                <a href="https://aryan.ai/portfolio" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#7c3aed);color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:50px">
                  View Portfolio →
                </a>
              </div>

              <!-- Divider -->
              <div style="border-top:1px solid rgba(139,92,246,0.2);margin:28px 0"></div>

              <p style="margin:0;font-size:13px;line-height:1.7;color:#475569;text-align:center">
                Sent with ❤️ from <strong style="color:#818cf8">Aryan.AI</strong><br/>
                Building practical AI systems from India 🇮🇳
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background:rgba(0,0,0,0.3);text-align:center;border-top:1px solid rgba(255,255,255,0.05)">
              <p style="margin:0;font-size:11px;color:#334155">
                © ${new Date().getFullYear()} Aryan.AI · All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildAdminNotificationHtml(lead: ContactLead & { company?: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Brief — Aryan.AI</title>
</head>
<body style="margin:0;padding:0;background:#06060c;font-family:'Inter',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#e2e8f0">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#06060c;padding:36px 16px">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background:#0d0e1a;border:1px solid rgba(139,92,246,0.3);border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.5)">

          <!-- Top Brand Bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#d946ef 100%);padding:32px 36px;text-align:left">
              <div style="display:inline-block;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.35);padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ffffff;margin-bottom:12px">
                🚀 NEW CLIENT INQUIRY
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;line-height:1.2">
                ${escapeHtml(lead.name)} submitted a project brief
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85)">
                Service: <strong style="color:#ffffff">${escapeHtml(lead.service)}</strong>
              </p>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding:24px 36px 8px;background:#131424;border-bottom:1px solid rgba(255,255,255,0.06)">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px">
                    <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:#8b5cf6;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:10px 22px;border-radius:10px">
                      ✉️ Reply to ${escapeHtml(lead.name.split(" ")[0])}
                    </a>
                  </td>
                  <td>
                    <a href="tel:${escapeHtml(lead.phone)}" style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#e2e8f0;text-decoration:none;font-size:13px;font-weight:600;padding:10px 20px;border-radius:10px">
                      📞 Call ${escapeHtml(lead.phone)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding:28px 36px">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#818cf8;font-weight:700">
                📋 Client Information
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden">
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);width:140px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Full Name</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#f1f5f9;font-size:14px;font-weight:600">${escapeHtml(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Email</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#a78bfa;font-size:14px">
                    <a href="mailto:${escapeHtml(lead.email)}" style="color:#a78bfa;text-decoration:none">${escapeHtml(lead.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Phone</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#f1f5f9;font-size:14px">
                    <a href="tel:${escapeHtml(lead.phone)}" style="color:#f1f5f9;text-decoration:none">${escapeHtml(lead.phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Organization</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#f1f5f9;font-size:14px">${escapeHtml(lead.company || "Not provided")}</td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Engagement Type</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#34d399;font-size:14px;font-weight:600">${escapeHtml(lead.service)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Submitted At</td>
                  <td style="padding:13px 18px;border-bottom:1px solid rgba(255,255,255,0.06);color:#94a3b8;font-size:13px">${escapeHtml(lead.submittedAt)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">Client IP</td>
                  <td style="padding:13px 18px;color:#94a3b8;font-size:13px">${escapeHtml(lead.clientIp || "Unavailable")}</td>
                </tr>
              </table>

              <!-- Project Brief Content -->
              <div style="margin-top:28px">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#818cf8;font-weight:700">
                  📝 Project Brief / Requirements
                </p>
                <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.22);border-radius:14px;padding:22px;font-size:15px;line-height:1.75;color:#e2e8f0;white-space:pre-wrap">
${escapeHtml(lead.message)}
                </div>
              </div>

              <!-- Footer tip -->
              <p style="margin:24px 0 0;font-size:12px;color:#64748b;text-align:center;line-height:1.6">
                💡 Tip: You can hit <strong>Reply</strong> in your email client to respond directly to <strong>${escapeHtml(lead.email)}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px;background:#080911;text-align:center;border-top:1px solid rgba(255,255,255,0.05)">
              <p style="margin:0;font-size:11px;color:#475569">
                Aryan.AI Lead Telemetry System · Sent directly to aryanthealgohype@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Send admin alert to Aryan's email using Resend */
export async function sendResendAdminNotification(
  lead: ContactLead & { company?: string },
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || "aryanthealgohype@gmail.com";

  if (!apiKey) {
    console.warn("[resend] RESEND_API_KEY not configured — skipping admin notification email");
    return { ok: false, error: "Resend not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aryan.AI Leads <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: lead.email,
        subject: `🚀 New Client Lead: ${lead.name} (${lead.service})`,
        html: buildAdminNotificationHtml(lead),
        text: `New Client Brief Received!

Client Details:
- Name: ${lead.name}
- Email: ${lead.email}
- Phone: ${lead.phone}
- Organization: ${lead.company || "Not provided"}
- Engagement Type: ${lead.service}
- Submission Time: ${lead.submittedAt}
- Client IP: ${lead.clientIp || "Unavailable"}

Project Brief:
${lead.message}

Reply directly to this email to contact ${lead.name} (${lead.email}).`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[resend] Failed to send admin notification", res.status, body);
      return { ok: false, error: `Resend error: ${res.status}` };
    }

    const data = (await res.json()) as { id?: string };
    console.info("[resend] Admin notification email sent successfully", { id: data.id, to: toEmail });
    return { ok: true };
  } catch (err) {
    console.error("[resend] Exception sending admin notification", err);
    return { ok: false, error: "Network error sending Resend admin email" };
  }
}

/** Send confirmation email to the client using Resend */
export async function sendResendConfirmation(lead: ContactLead): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[resend] RESEND_API_KEY not configured — skipping client confirmation email");
    return { ok: false, error: "Resend not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aryan.AI <onboarding@resend.dev>",
        to: [lead.email],
        subject: `✨ Got your brief, ${lead.name.split(" ")[0]}! — Aryan.AI`,
        html: buildResendEmailHtml(lead),
        text: `Hey ${lead.name}!

Thank you for reaching out about ${lead.service}.

I personally read every inquiry and will get back to you within 24 hours.

Your Submission:
- Name: ${lead.name}
- Email: ${lead.email}
- Phone: ${lead.phone}
- Service: ${lead.service}

Your Message:
${lead.message}

Sent with ❤️ from Aryan.AI
Building practical AI systems from India 🇮🇳`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.warn("[resend] Note: Client auto-confirmation could not be sent (requires custom domain in Resend):", res.status, body);
      return { ok: false, error: `Resend error: ${res.status}` };
    }

    const data = (await res.json()) as { id?: string };
    console.info("[resend] Confirmation email sent", { id: data.id, to: lead.email });
    return { ok: true };
  } catch (err) {
    console.error("[resend] Exception sending confirmation", err);
    return { ok: false, error: "Network error sending Resend email" };
  }
}
