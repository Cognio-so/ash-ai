import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   Inline SVG topic icons — pure black strokes
───────────────────────────────────────────── */
const IcCode = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <polyline points="13,12 5,20 13,28" />
    <polyline points="27,12 35,20 27,28" />
    <line x1="17" y1="7" x2="23" y2="33" />
  </svg>
);
const IcBrain = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M14 8c-4 0-7 3-7 7 0 2 1 4 2 5-1 1-2 3-2 5 0 4 3 7 7 7h12c4 0 7-3 7-7 0-2-1-4-2-5 1-1 2-3 2-5 0-4-3-7-7-7" />
    <line x1="20" y1="8" x2="20" y2="32" />
    <line x1="13" y1="17" x2="27" y2="17" />
    <line x1="13" y1="23" x2="27" y2="23" />
  </svg>
);
const IcNodes = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-9 h-9">
    <circle cx="20" cy="20" r="3" />
    <circle cx="8"  cy="10" r="3" />
    <circle cx="32" cy="10" r="3" />
    <circle cx="8"  cy="30" r="3" />
    <circle cx="32" cy="30" r="3" />
    <line x1="11" y1="12" x2="17" y2="18" />
    <line x1="29" y1="12" x2="23" y2="18" />
    <line x1="11" y1="28" x2="17" y2="22" />
    <line x1="29" y1="28" x2="23" y2="22" />
  </svg>
);
const IcChat = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M6 8h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H14l-6 4V10a2 2 0 0 1 2-2z" />
    <line x1="13" y1="16" x2="27" y2="16" />
    <line x1="13" y1="22" x2="21" y2="22" />
  </svg>
);
const IcShield = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M20 5l13 5v10c0 8-6 13-13 15C13 33 7 28 7 20V10z" />
    <polyline points="15,20 18,23 25,16" />
  </svg>
);
const IcPeople = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <circle cx="15" cy="13" r="4" />
    <path d="M5 32c0-6 4-10 10-10s10 4 10 10" />
    <circle cx="28" cy="13" r="3" />
    <path d="M35 32c0-4-3-8-7-9" />
  </svg>
);
const IcMicroscope = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <rect x="14" y="4" width="8" height="14" rx="1" />
    <circle cx="18" cy="11" r="3" />
    <line x1="18" y1="18" x2="18" y2="28" />
    <line x1="8" y1="36" x2="32" y2="36" />
    <path d="M10 36c0-6 3-8 8-8h0c5 0 8 2 8 8" />
  </svg>
);
const IcGear = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <circle cx="20" cy="20" r="5" />
    <path d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M10 30l3-3M27 13l3-3" />
  </svg>
);
const IcStack = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <rect x="7" y="26" width="26" height="7" rx="2" />
    <rect x="7" y="17" width="26" height="7" rx="2" />
    <rect x="7" y="8" width="26" height="7" rx="2" />
  </svg>
);
const IcDocument = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M10 5h14l8 8v22H10z" />
    <polyline points="24,5 24,13 32,13" />
    <line x1="15" y1="20" x2="27" y2="20" />
    <line x1="15" y1="25" x2="27" y2="25" />
    <line x1="15" y1="30" x2="21" y2="30" />
  </svg>
);
const IcPen = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M28 6l6 6L14 32H8v-6z" />
    <line x1="22" y1="12" x2="30" y2="20" />
  </svg>
);
const IcMic = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <rect x="14" y="4" width="12" height="18" rx="6" />
    <path d="M8 22c0 7 5 12 12 12s12-5 12-12" />
    <line x1="20" y1="34" x2="20" y2="38" />
    <line x1="14" y1="38" x2="26" y2="38" />
  </svg>
);
const IcWrench = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M30 6a8 8 0 0 0-10 10L6 30a2.83 2.83 0 0 0 4 4l14-14a8 8 0 0 0 10-10l-5 5-3-1-1-3z" />
  </svg>
);
const IcDatabase = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <ellipse cx="20" cy="11" rx="13" ry="5" />
    <path d="M7 11v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" />
    <path d="M7 19v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" />
  </svg>
);
const IcLightning = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <polyline points="22,5 10,22 20,22 18,35 30,18 20,18" />
  </svg>
);
const IcServer = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <rect x="6" y="6" width="28" height="10" rx="2" />
    <rect x="6" y="20" width="28" height="10" rx="2" />
    <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="25" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const IcStar = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <polygon points="20,4 24,15 36,15 26,22 30,34 20,27 10,34 14,22 4,15 16,15" />
  </svg>
);
const IcBubbles = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <path d="M5 8h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 3V10a2 2 0 0 1 2-2z" />
    <path d="M15 22v2a2 2 0 0 0 2 2h12l4 3V26a2 2 0 0 0-2-2H25" />
  </svg>
);

/* ─────────────────────────────────────────────
   Data — all 3 sub-pages
───────────────────────────────────────────── */
type Topic = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  icon: React.ReactNode;
};

type PageData = {
  id: string;
  label: string;
  heading: string;
  tagline: string;
  quote: string;
  heroUrl: string;
  topics: Topic[];
  tags: string[];
};

const pages: PageData[] = [
  /* ── 01  Teach & Learn ── */
  {
    id: "teach",
    label: "01 — Teach & Learn",
    heading: "Knowledge Is The\nGreatest Gift.",
    tagline: "Because the best investment is in a mind that didn't have the chance.",
    quote:
      "We build free, structured learning paths for emerging AI engineers — from curious beginners to confident builders. Every course, every mentorship session, every certificate is offered at zero cost to those who need it most.",
    heroUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2400&q=80&sat=-100",
    topics: [
      {
        num: "01",
        title: "Python for AI",
        tagline: "The language of the machine age.",
        desc: "A ground-up Python curriculum built for real AI workloads. Covers data structures, NumPy, Pandas, and async patterns — all through hands-on notebooks and live weekly sessions.",
        icon: <IcCode />,
      },
      {
        num: "02",
        title: "Machine Learning Fundamentals",
        tagline: "Intuition before equations.",
        desc: "Regression, classification, clustering — taught visually first, then mathematically. Real datasets, real decisions, zero hand-waving. Build your first end-to-end ML pipeline in week one.",
        icon: <IcBrain />,
      },
      {
        num: "03",
        title: "Deep Learning & Neural Nets",
        tagline: "Layers upon layers of understanding.",
        desc: "From perceptrons to transformers — a rigorous, project-driven deep-dive. Train CNNs, RNNs, and attention mechanisms on your own hardware or our shared GPU cluster.",
        icon: <IcNodes />,
      },
      {
        num: "04",
        title: "LLMs & Prompt Engineering",
        tagline: "Words are the new code.",
        desc: "Master the craft of prompting, few-shot learning, RAG pipelines, and tool-use. Build production-grade LLM apps using open and closed models with structured output guarantees.",
        icon: <IcChat />,
      },
      {
        num: "05",
        title: "AI Ethics & Safety",
        tagline: "Build responsibly. Ship thoughtfully.",
        desc: "A deep examination of bias, fairness, interpretability, and alignment. Case studies from real deployments. Every engineer we train understands the societal weight of what they build.",
        icon: <IcShield />,
      },
      {
        num: "06",
        title: "Mentorship Program",
        tagline: "A senior mind in your corner.",
        desc: "Paired 1-on-1 with a practising AI engineer for 12 weeks. Weekly sessions, code reviews, career guidance, and a direct line into the industry you're trying to break into.",
        icon: <IcPeople />,
      },
    ],
    tags: ["Free Access", "Beginner-friendly", "Live Mentorship", "Certificates", "Project-based"],
  },

  /* ── 02  AI Blogs ── */
  {
    id: "blogs",
    label: "02 — AI Blogs",
    heading: "Ideas That Move\nThe Field Forward.",
    tagline: "Deep thinking, long-form writing — no clickbait, no fluff, no paywalls.",
    quote:
      "Every post is a deliberate act of knowledge-sharing. We write to break down complexity, challenge assumptions, and give practitioners and policy-makers a shared language for what's coming next.",
    heroUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2400&q=80&sat=-100",
    topics: [
      {
        num: "01",
        title: "Frontier Research Breakdowns",
        tagline: "The paper, without the pain.",
        desc: "We read the preprints so you don't have to — then explain every key idea with diagrams, code, and plain language. Updated weekly as major papers drop.",
        icon: <IcMicroscope />,
      },
      {
        num: "02",
        title: "AI in Industry",
        tagline: "What actually ships matters most.",
        desc: "Real-world case studies from finance, logistics, healthcare, and e-commerce. We document what worked, what failed, and why the gap between research and production is always wider than expected.",
        icon: <IcGear />,
      },
      {
        num: "03",
        title: "Building with LLMs",
        tagline: "From prototype to production-grade.",
        desc: "A practitioner's guide to LLM application architecture — RAG patterns, agent loops, evaluation harnesses, cost optimisation, and everything your README doesn't cover.",
        icon: <IcStack />,
      },
      {
        num: "04",
        title: "AI Policy & Regulation",
        tagline: "The law is always one step behind.",
        desc: "We track legislation across the EU AI Act, US executive orders, and emerging frameworks worldwide — and translate their implications for builders, founders, and engineers on the ground.",
        icon: <IcDocument />,
      },
      {
        num: "05",
        title: "Opinion & Analysis",
        tagline: "Unpopular takes, rigorously defended.",
        desc: "Provocative but grounded essays on where the field is heading, what the hype gets wrong, and what genuinely matters for the next decade of AI development.",
        icon: <IcPen />,
      },
      {
        num: "06",
        title: "Interview Series",
        tagline: "The people behind the models.",
        desc: "Long-form conversations with researchers, founders, policymakers, and practitioners. No sound-bites — just deep, honest dialogue about what they've learned and what keeps them up at night.",
        icon: <IcMic />,
      },
    ],
    tags: ["Long-form", "Weekly posts", "Research", "Industry", "Open Access"],
  },

  /* ── 03  Community Projects ── */
  {
    id: "community",
    label: "03 — Community Projects",
    heading: "Build Together.\nGrow Together.",
    tagline: "The best tools are built by the people who need them most.",
    quote:
      "We fund, host, and maintain open infrastructure for independent AI builders — because great work shouldn't require a corporate backing. From shared GPU clusters to collaborative datasets, everything here is community-owned and community-led.",
    heroUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80&sat=-100",
    topics: [
      {
        num: "01",
        title: "Open Source AI Tools",
        tagline: "Free, forkable, forever.",
        desc: "A curated suite of open-source libraries, wrappers, and utilities built by the community. Every tool is documented, tested, and maintained with long-term stability in mind.",
        icon: <IcWrench />,
      },
      {
        num: "02",
        title: "Shared Datasets",
        tagline: "Data should democratise, not gatekeep.",
        desc: "A public repository of cleaned, structured, and well-documented datasets across NLP, vision, and structured data — free for research and non-commercial use, with clear licensing.",
        icon: <IcDatabase />,
      },
      {
        num: "03",
        title: "Collaborative Hackathons",
        tagline: "48 hours to ship something real.",
        desc: "Quarterly virtual hackathons with real problem statements from NGOs and civic institutions. Prizes include cloud credits, mentorship, and potential integration into live systems.",
        icon: <IcLightning />,
      },
      {
        num: "04",
        title: "Infra for Builders",
        tagline: "Serious compute, without the invoice.",
        desc: "Shared GPU access, hosted model endpoints, and collaborative notebooks — available to vetted community members for research and open-source projects. No corporate account needed.",
        icon: <IcServer />,
      },
      {
        num: "05",
        title: "Project Showcase",
        tagline: "Your best work, seen by the right people.",
        desc: "A curated gallery of community-built AI projects — with writeups, demos, and source links. Featured projects get amplified to our 50k+ audience across platforms.",
        icon: <IcStar />,
      },
      {
        num: "06",
        title: "Discussion Forums",
        tagline: "Where deep questions get deep answers.",
        desc: "A structured, moderated forum for technical discussion — no noise, no self-promotion. Separated by topic area, with dedicated threads for research papers, debugging, and career questions.",
        icon: <IcBubbles />,
      },
    ],
    tags: ["Open Source", "Collaborative", "GPU Credits", "Hackathons", "Community-led"],
  },
];

/* ─────────────────────────────────────────────
   Reveal helper (in-view fade/rise)
───────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Topic Card
───────────────────────────────────────────── */
function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  return (
    <FadeUp delay={0.3 + index * 0.07}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group flex flex-col gap-5 rounded-xl border border-black/[0.08] bg-white p-7 hover:border-black/30 hover:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.18)] transition-all duration-300"
      >
        {/* Icon container */}
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-black/10 bg-[#f9f9f9] text-black/70 group-hover:border-black/25 group-hover:text-black transition-all duration-300">
          {topic.icon}
        </div>

        {/* Number label */}
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
          {topic.num}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl leading-snug text-black md:text-2xl">
          {topic.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm italic text-black/50 leading-snug -mt-2">
          "{topic.tagline}"
        </p>

        {/* Description */}
        <p className="text-sm text-black/60 leading-relaxed border-t border-black/[0.06] pt-4">
          {topic.desc}
        </p>
      </motion.div>
    </FadeUp>
  );
}

/* ─────────────────────────────────────────────
   Main export — KnowledgeSubPage
───────────────────────────────────────────── */
export default function KnowledgeSubPage({
  pageId,
  onClose,
}: {
  pageId: string | null;
  onClose: () => void;
}) {
  const page = pages.find((p) => p.id === pageId) ?? null;

  /* Lock body scroll while open */
  useEffect(() => {
    if (!pageId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [pageId]);

  /* Keyboard escape */
  useEffect(() => {
    if (!pageId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pageId, onClose]);

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          key={page.id}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[130] overflow-y-auto bg-white"
        >
          {/* ── Back button ─────────────────────── */}
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            onClick={onClose}
            aria-label="Back to Knowledge section"
            className="fixed left-5 top-5 z-[140] inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/90 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-black shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-black hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back</span>
          </motion.button>

          {/* ── Hero image ───────────────────────── */}
          <div className="relative h-[55vh] w-full overflow-hidden bg-[#111]">
            <motion.img
              key={page.heroUrl}
              src={page.heroUrl}
              alt={page.label}
              loading="eager"
              initial={{ scale: 1.06, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover opacity-70 grayscale"
            />
            {/* bottom fade to white */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
            {/* top gradient */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/30 to-transparent" />

            {/* Label on hero */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="absolute bottom-12 left-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 md:left-16"
            >
              {page.label}
            </motion.div>
          </div>

          {/* ── Content ─────────────────────────── */}
          <div className="mx-auto max-w-6xl px-6 pb-28 md:px-10 lg:px-16">
            {/* Heading block */}
            <FadeUp delay={0.15}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 mb-6">
                {page.label}
              </div>
              <h1 className="font-display text-5xl leading-[1.05] md:text-7xl whitespace-pre-line">
                {page.heading}
              </h1>
              <p className="mt-5 text-lg italic text-black/50 max-w-xl leading-snug md:text-xl">
                {page.tagline}
              </p>
            </FadeUp>

            {/* Quote paragraph */}
            <FadeUp delay={0.22} className="mt-8 max-w-2xl">
              <p className="text-base text-black/60 leading-relaxed">{page.quote}</p>
            </FadeUp>

            {/* Divider */}
            <FadeUp delay={0.28}>
              <div className="my-14 h-px w-full bg-black/10" />
            </FadeUp>

            {/* Topic grid — 2 columns */}
            <div className="grid gap-5 sm:grid-cols-2">
              {page.topics.map((topic, i) => (
                <TopicCard key={topic.title} topic={topic} index={i} />
              ))}
            </div>

            {/* Tags row */}
            <FadeUp delay={0.6} className="mt-16">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35 mb-5">
                Topics & Access
              </div>
              <div className="flex flex-wrap gap-2.5">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-black/20 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-black/60 transition-all duration-200 hover:border-black hover:text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>

            {/* Bottom back button */}
            <FadeUp delay={0.7} className="mt-20 pt-10 border-t border-black/10 flex justify-center sm:justify-start">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-3 rounded-full border border-black/20 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black shadow-sm transition-all duration-200 hover:bg-black hover:text-white hover:border-black cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Knowledge
              </button>
            </FadeUp>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
