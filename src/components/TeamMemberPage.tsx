import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/* ─── Types ─── */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  label: string;
  tagline: string;
  bio: string;
  skills: string[];
  image: string;
  social: { platform: "LinkedIn" | "GitHub" | "Twitter"; url: string }[];
};

/* ─── Team Data ─── */
export const teamMembers: TeamMember[] = [
  {
    id: "automation-lab",
    name: "Alex Rivera",
    role: "Automation Lab Lead",
    label: "Team Member — Automation Lab",
    tagline: "Automating the impossible, one workflow at a time.",
    bio: "Alex leads our automation division, building intelligent workflows that eliminate repetitive work across enterprise systems. With 6+ years in RPA and AI pipelines, he has scaled operations for 20+ clients globally, saving thousands of hours monthly.",
    skills: ["RPA", "n8n", "Make.com", "Python", "LLM Pipelines", "Zapier"],
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" },
    ],
  },
  {
    id: "agent-systems",
    name: "Omar Hassan",
    role: "Agent Systems Engineer",
    label: "Team Member — Agent Systems",
    tagline: "Teaching machines to think, act, and decide.",
    bio: "Omar architects multi-agent AI systems from orchestration layers to tool-use pipelines. His agent infrastructure runs at scale for thousands of daily users. He obsesses over reliability, speed, and making AI actually useful in the real world.",
    skills: ["LangChain", "AutoGen", "Claude API", "FastAPI", "RAG", "Vector DBs"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" },
      { platform: "Twitter", url: "#" },
    ],
  },
  {
    id: "ai-products",
    name: "Elena Vasquez",
    role: "AI Products Designer",
    label: "Team Member — AI Products",
    tagline: "Great AI products feel invisible — until they change everything.",
    bio: "Elena bridges design and AI intelligence, crafting experiences that make complex systems feel effortless. She has shipped 12+ AI-native products and specializes in human-AI interaction, zero-friction onboarding, and product intuition.",
    skills: ["Figma", "UX Research", "AI Prototyping", "Next.js", "Framer"],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
    ],
  },
  {
    id: "founder-strategy",
    name: "Sophia Chen",
    role: "Founder Strategy Lead",
    label: "Team Member — Founder Strategy",
    tagline: "Strategy is just storytelling with numbers behind it.",
    bio: "Sophia works directly with founders on AI strategy, go-to-market positioning, and investor narratives. Former consultant turned AI builder, she has advised 30+ startups across 3 continents and helped raise $40M+ in funding.",
    skills: ["GTM Strategy", "Fundraising", "AI Roadmaps", "Pitch Decks", "OKRs"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
    ],
  },
  {
    id: "ai-operator",
    name: "Marco Delgado",
    role: "AI Operator",
    label: "Team Member — AI Operator",
    tagline: "Ops is the silent engine that makes AI actually work.",
    bio: "Marco ensures every AI system we ship runs flawlessly in production — monitoring, scaling, and optimizing 24/7. He brings military-grade operational discipline to AI deployment, incident response, and infrastructure resilience.",
    skills: ["DevOps", "Docker", "Supabase", "CI/CD", "Monitoring", "Cloud Infra"],
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" },
    ],
  },
  {
    id: "product-lead",
    name: "Priya Nair",
    role: "Product Lead",
    label: "Team Member — Product Lead",
    tagline: "The best products are built at the intersection of empathy and data.",
    bio: "Priya owns the product roadmap end-to-end — from user research and prioritization to sprint planning and launch. With a background in behavioral design and AI systems, she ensures every feature we ship solves a real problem for real people.",
    skills: ["Product Strategy", "Roadmapping", "User Research", "Agile", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=92",
    social: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
    ],
  },
];

/* ─── Social Icons ─── */
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialIcon = ({ platform }: { platform: string }) => {
  if (platform === "LinkedIn") return <LinkedInIcon />;
  if (platform === "GitHub") return <GitHubIcon />;
  return <TwitterIcon />;
};

/* ─── Initials avatar fallback ─── */
function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: "125%",
        position: "relative",
        borderRadius: 16,
        background: "#1a1a1a",
        border: "0.5px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
          fontWeight: 300,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        {initials}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function TeamMemberPage({
  memberId,
  onClose,
}: {
  memberId: string | null;
  onClose: () => void;
}) {
  const member = teamMembers.find((m) => m.id === memberId) ?? null;

  /* Lock scroll */
  useEffect(() => {
    if (!memberId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [memberId]);

  /* Escape key */
  useEffect(() => {
    if (!memberId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [memberId, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#030611",
            backgroundImage:
              "radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)",
            overflowY: "auto",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {/* ── Back button ── */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            onClick={onClose}
            aria-label="Back to Team"
            style={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 210,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 40,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(15,23,42,0.8)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#8b5cf6";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#8b5cf6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(15,23,42,0.8)";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <ArrowLeft size={13} />
            <span style={{ display: "none" }} className="sm-show">
              Back to Team
            </span>
            <style>{`.sm-show { display: inline !important; }`}</style>
          </motion.button>

          {/* ── Main layout ── */}
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "100px 32px 80px",
              display: "grid",
              gridTemplateColumns: "2fr 3fr",
              gap: "80px",
              alignItems: "flex-start",
            }}
            className="team-detail-grid"
          >
            {/* LEFT — Photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ position: "relative" }}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="eager"
                    decoding="async"
                    style={{
                      width: "100%",
                      aspectRatio: "4/5",
                      objectFit: "cover",
                      objectPosition: "center top",
                      borderRadius: 16,
                      filter: "saturate(1.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "block",
                      boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
                    }}
                  />
                ) : (
                  <InitialsAvatar name={member.name} />
                )}
                {/* Role badge below photo */}
                <div
                  style={{
                    marginTop: 16,
                    textAlign: "center",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  {member.role}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ paddingTop: 8 }}
            >
              {/* Small label */}
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 20,
                  fontFamily: "var(--font-sans, sans-serif)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 1,
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                {member.label}
              </div>

              {/* Name */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 400,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: "0 0 10px",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {member.name}
              </h1>

              {/* Role title */}
              <div
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 400,
                  marginBottom: 18,
                  fontFamily: "var(--font-sans, sans-serif)",
                  letterSpacing: "0.01em",
                }}
              >
                {member.role}
              </div>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "#a78bfa",
                  lineHeight: 1.65,
                  marginBottom: 28,
                }}
              >
                "{member.tagline}"
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                  marginBottom: 28,
                }}
              />

              {/* Bio */}
              <p
                style={{
                  fontSize: "0.925rem",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: 32,
                  fontFamily: "var(--font-sans, sans-serif)",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {member.bio}
              </p>

              {/* Skills */}
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 12,
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  Expertise
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: "5px 16px",
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-sans, sans-serif)",
                        letterSpacing: "0.04em",
                        transition: "border-color 0.2s, color 0.2s, background 0.2s",
                        background: "rgba(255,255,255,0.05)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#8b5cf6";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                        (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.05)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "rgba(255,255,255,0.1)",
                  marginBottom: 24,
                }}
              />

              {/* Social links */}
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: 14,
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  Connect
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                  {member.social.map(({ platform, url }) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                        textDecoration: "none",
                        fontFamily: "var(--font-sans, sans-serif)",
                        letterSpacing: "0.02em",
                        transition: "color 0.2s",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                        const underline = e.currentTarget.querySelector(".ul") as HTMLElement;
                        if (underline) underline.style.width = "100%";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "rgba(255,255,255,0.5)";
                        const underline = e.currentTarget.querySelector(".ul") as HTMLElement;
                        if (underline) underline.style.width = "0%";
                      }}
                    >
                      <SocialIcon platform={platform} />
                      {platform}
                      <span
                        className="ul"
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0,
                          height: 1,
                          width: "0%",
                          background: "#8b5cf6",
                          transition: "width 0.25s ease",
                        }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile responsive style */}
          <style>{`
            @media (max-width: 768px) {
              .team-detail-grid {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
                padding: 90px 20px 60px !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
