-- Aryan.AI Contact Leads Schema
-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS contact_leads (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  email        text NOT NULL,
  phone        text NOT NULL,
  company      text,
  service      text NOT NULL,
  message      text NOT NULL,
  client_ip    text,
  submitted_at timestamptz,
  created_at   timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role (your backend) full access
CREATE POLICY "Service role full access"
  ON contact_leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index for faster ordering by created_at (used in admin dashboard)
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at
  ON contact_leads (created_at DESC);
