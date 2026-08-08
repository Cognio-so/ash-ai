// Server-side only Supabase helper (uses service role key — never expose to browser)

type SupabaseConfig = {
  url: string;
  key: string;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_KEY?.trim();
  if (!url || !key) {
    console.warn("[supabase] SUPABASE_URL or SUPABASE_SERVICE_KEY not configured");
    return null;
  }
  return { url, key };
}

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  message: string;
  client_ip: string | null;
  submitted_at: string;
  created_at: string;
};

/** Insert a new contact lead into the contact_leads table */
export async function insertLead(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  clientIp?: string;
  submittedAt: string;
}): Promise<{ ok: boolean; error?: string }> {
  const cfg = getSupabaseConfig();
  if (!cfg) return { ok: false, error: "Supabase not configured" };

  try {
    const res = await fetch(`${cfg.url}/rest/v1/contact_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company ?? null,
        service: data.service,
        message: data.message,
        client_ip: data.clientIp ?? null,
        submitted_at: data.submittedAt,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[supabase] insertLead failed", res.status, text);
      return { ok: false, error: `Supabase error: ${res.status}` };
    }

    console.info("[supabase] Lead saved successfully", { email: data.email });
    return { ok: true };
  } catch (err) {
    console.error("[supabase] insertLead exception", err);
    return { ok: false, error: "Network error saving lead" };
  }
}

/** Fetch all leads ordered by newest first */
export async function fetchAllLeads(): Promise<{ ok: boolean; leads?: LeadRow[]; error?: string }> {
  const cfg = getSupabaseConfig();
  if (!cfg) return { ok: false, error: "Supabase not configured" };

  try {
    const res = await fetch(
      `${cfg.url}/rest/v1/contact_leads?select=*&order=created_at.desc`,
      {
        method: "GET",
        headers: {
          apikey: cfg.key,
          Authorization: `Bearer ${cfg.key}`,
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[supabase] fetchAllLeads failed", res.status, text);
      return { ok: false, error: `Supabase error: ${res.status}` };
    }

    const leads = (await res.json()) as LeadRow[];
    return { ok: true, leads };
  } catch (err) {
    console.error("[supabase] fetchAllLeads exception", err);
    return { ok: false, error: "Network error fetching leads" };
  }
}
