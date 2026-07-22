import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Workflow,
  Compass,
  GraduationCap,
  ArrowRight,
  X,
  Check,
  Mail,
  Phone,
  ArrowUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import CircularGallery from "./CircularGallery";
import Lens from "./Lens";
import SplitText from "./SplitText";
import TeamMemberPage, { teamMembers } from "./TeamMemberPage";
import aryanPortrait from "@/assets/aryan-portrait.png";
import aryanAboutPortrait from "@/assets/aryan-about-portrait.png";
import inspirationIllustration from "@/assets/inspiration-philosophy-illustration.png";

const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);
const Twitter = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Instagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const Facebook = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M14 8.5V7.1c0-.7.2-1.1 1.1-1.1H17V3.1c-.5-.1-1.5-.1-2.6-.1-2.7 0-4.5 1.6-4.5 4.6v.9H7v3.2h2.9V21H14v-9.3h2.7l.4-3.2H14z" />
  </svg>
);
const Telegram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M21.7 4.4c.3-1.1-.8-2-1.8-1.5L2.8 9.6c-1.2.5-1.1 2.2.1 2.5l4.4 1.3 1.7 5.2c.4 1.1 1.8 1.4 2.5.5l2.4-2.9 4.5 3.3c.9.7 2.2.2 2.4-1l2.9-14.1zM8.1 12.2l8.6-5.3-6.7 7.1-.3 3.1-1.6-4.9z" />
  </svg>
);

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/aryanthealgohype", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/aryanthealgohype", icon: Facebook },
  { label: "Telegram", href: "https://t.me/aryanthealgohype", icon: Telegram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X", href: "#", icon: Twitter },
];
/* ---------------- Cursor spotlight ---------------- */
export function CursorSpotlight() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block opacity-40"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="h-5 w-5 rounded-full border border-[#a67c52]/35 bg-[#fff8ed]/70 shadow-[0_0_18px_rgba(166,124,82,0.18)]" />
    </motion.div>
  );
}

/* ---------------- Scroll progress ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] bg-[#a67c52]/70 shadow-none"
    />
  );
}

/* ---------------- Magnetic button ---------------- */
function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Interactive grid background ---------------- */
function InteractiveGridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className="absolute inset-0 grid-bg"
    >
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(139, 92, 246, 0.12), transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,6,17,0.15)_0%,rgba(3,6,17,0.72)_72%,rgba(3,6,17,0.96)_100%)]" />
    </div>
  );
}

/* ---------------- Reveal ---------------- */
function Reveal({
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Counter ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------------- Navbar ---------------- */
export function Navbar() {
  const links = [
    { label: "Home", to: "/" as const },
    { label: "Portfolio", to: "/portfolio" as const },
    { label: "Services", to: "/services" as const },
    { label: "Press", to: "/press" as const },
    { label: "Social Impact", to: "/social-impact" as const },
    { label: "Contact", to: "/contact" as const },
  ];

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[#2b2117]/10 bg-[#f4ecde]/88 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-normal text-[#241a12]"
          aria-label="Aryan.ai home"
        >
          Aryan.ai
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              activeProps={{ className: "text-[#241a12]" }}
              inactiveProps={{ className: "text-[#75654f] hover:text-[#241a12]" }}
              className="nav-animated-link text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="nav-call-button inline-flex items-center justify-center border border-[#2b2117]/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2b2117] transition hover:border-[#2b2117] hover:bg-[#2b2117] hover:text-[#f8f0e4]"
        >
          Book a Call
        </Link>
      </div>
    </motion.nav>
  );
}
/* ---------------- Hero ---------------- */
function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section
      id="home"
      className="paper-hero relative flex min-h-screen items-center overflow-hidden px-5 pt-24 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 py-10 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-5 text-[10px] font-semibold uppercase leading-6 tracking-[0.24em] text-[#9b8668] md:mb-7 md:text-[11px] md:tracking-[0.38em]">
            Founder&nbsp;&nbsp;-&nbsp;&nbsp;AI
            Builder&nbsp;&nbsp;-&nbsp;&nbsp;Consultant&nbsp;&nbsp;-&nbsp;&nbsp;Teacher
          </div>
          <h1 className="font-display text-5xl leading-[0.98] tracking-normal text-[#241a12] sm:text-8xl lg:text-[7.5rem]">
            Aryan
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.7] text-[#5f503e] md:mt-9 md:text-[1.62rem] md:leading-[1.75]">
            Building practical AI systems, automation workflows, and learning spaces from India,
            with clarity, craft, and real-world outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
            <Link
              to="/portfolio"
              className="inline-flex min-h-11 items-center justify-center bg-[#241a12] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fff8ed] shadow-[4px_4px_0_rgba(36,26,18,0.18)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(36,26,18,0.16)] md:px-7 md:py-4 md:text-[11px] md:tracking-[0.24em]"
            >
              View Work
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center border border-[#2b2117]/20 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5f503e] transition hover:border-[#2b2117] hover:text-[#241a12] md:px-7 md:py-4 md:text-[11px] md:tracking-[0.24em]"
            >
              Book a Call
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[330px] sm:max-w-[420px] md:max-w-[460px]"
        >
          <div className="portrait-paper-frame hero-lens-frame relative overflow-hidden">
            <Lens zoomFactor={2.25} lensSize={156} ariaLabel="Zoom Aryan portrait">
              <img
                src={aryanPortrait}
                alt="Aryan portrait"
                fetchPriority="high"
                decoding="async"
                className="hero-lens-image h-full w-full object-cover object-top"
              />
            </Lens>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
/* ---------------- Section title ---------------- */
function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-20 max-w-3xl">
      <Reveal>
        <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-violet-400">
          <span className="h-px w-8 bg-violet-500/50" /> {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base text-slate-300 leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Portfolio Types ---------------- */
type Project = {
  tag: string;
  title: string;
  year: string;
  client: string;
  duration: string;
  summary: string;
  problem: string;
  approach: string[];
  results: { label: string; value: string }[];
  stack: string[];
};

const portfolioItems: Project[] = [
  {
    tag: "RAG / Enterprise",
    title: "Retrieval Engine for Fortune 500",
    year: "2025",
    client: "Global Financial Services Firm",
    duration: "14 weeks",
    summary:
      "A secure, citation-grade retrieval system unifying 40+ years of internal research across 12M documents.",
    problem:
      "Analysts were spending 6+ hours/week hunting through siloed PDFs, intranets, and SharePoint. Compliance demanded verifiable citations on every generated answer.",
    approach: [
      "Hybrid retrieval (BM25 + dense embeddings) with re-ranking and per-tenant ACLs.",
      "Citation-locked generation: every claim grounded to a source span with confidence.",
      "Evaluation harness with 1.2k expert-graded queries; weekly regression CI.",
      "On-prem deployment with private model gateway and full audit trail.",
    ],
    results: [
      { label: "Time-to-answer", value: "−87%" },
      { label: "Citation accuracy", value: "98.4%" },
      { label: "Analyst hours saved / wk", value: "4,200" },
      { label: "ROI in year 1", value: "11×" },
    ],
    stack: ["LangGraph", "pgvector", "Cohere Rerank", "vLLM", "Kubernetes", "OpenTelemetry"],
  },
  {
    tag: "Multi-Agent System",
    title: "Autonomous Operations Platform",
    year: "2025",
    client: "Series C SaaS, 800 employees",
    duration: "9 weeks",
    summary:
      "A supervisor-worker agent mesh that resolves 62% of L1/L2 ops tickets without human escalation.",
    problem:
      "Operations was scaling linearly with revenue. Tickets queued for hours; root cause analysis lived in tribal knowledge.",
    approach: [
      "Supervisor agent with planning loop; specialized worker agents for runbooks, billing, and infra.",
      "Tool-use sandbox with policy gating, dry-run, and human-in-the-loop fallback.",
      "Long-term memory in vector + graph store; postmortems auto-summarized.",
    ],
    results: [
      { label: "Tickets auto-resolved", value: "62%" },
      { label: "MTTR", value: "−71%" },
      { label: "Headcount avoided", value: "8 FTE" },
      { label: "CSAT change", value: "+14 pts" },
    ],
    stack: ["LangGraph", "Temporal", "Postgres", "Neo4j", "Datadog", "OpenAI / Anthropic"],
  },
];

const galleryItems = [
  {
    image: aryanPortrait,
    text: "Aryan",
  },
  {
    image: aryanAboutPortrait,
    text: "Builder",
  },
  {
    image: inspirationIllustration,
    text: "Philosophy",
  },
  {
    image: "/document-intelligence-pipeline.png",
    text: "Documents",
  },
  {
    image: "/autonomous-operations-platform.png",
    text: "Operations",
  },
  {
    image: "/ashu-logo.png",
    text: "Ashu AI",
  },
];

function PortfolioCard({ item, i, onOpen }: { item: Project; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <Reveal delay={i * 0.08}>
      <motion.button
        ref={ref}
        onClick={onOpen}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        whileHover={{ scale: 1.02, y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative w-full text-left overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-6 md:p-8 min-h-[260px] md:min-h-[300px] flex flex-col justify-between cursor-pointer hover:border-violet-500/30 transition-all duration-300"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(139,92,246,0.06),transparent_60%)]" />
        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-violet-400">
          <span>{item.tag}</span>
          <span>{item.year}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4 text-white group-hover:text-violet-300 transition duration-300">
            {item.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2">{item.summary}</p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6b5137] transition">
            View Case Study{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-white/5 transition-transform duration-700 group-hover:scale-150" />
      </motion.button>
    </Reveal>
  );
}

/* ---------------- Project detail modal ---------------- */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-[#090d16] shadow-2xl overflow-hidden my-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white hover:bg-violet-600 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-8 md:px-14 pt-14 pb-10 border-b border-white/10 bg-slate-950/80">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative">
                <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.25em] text-violet-400">
                  <span>{project.tag}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.duration}</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] mt-5 max-w-3xl text-white">
                  {project.title}
                </h2>
                <p className="mt-5 max-w-2xl text-slate-300 leading-relaxed">{project.summary}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Client · <span className="text-white">{project.client}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 border-b border-white/10 bg-slate-900/20">
              {project.results.map((r) => (
                <div key={r.label} className="p-6 md:p-8 border-r last:border-r-0 border-white/10">
                  <div className="font-display text-3xl md:text-4xl text-white bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {r.value}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10 px-8 md:px-14 py-12">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-violet-400 mb-4">
                  The Problem
                </div>
                <p className="text-slate-300 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-violet-400 mb-4">
                  The Approach
                </div>
                <ul className="space-y-3">
                  {project.approach.map((a) => (
                    <li key={a} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <Check className="h-4 w-4 mt-1 shrink-0 text-violet-400" /> <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-8 md:px-14 pb-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-violet-400 mb-4">
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-8 md:px-14 pb-12 flex flex-wrap gap-4 border-t border-white/10 pt-8 bg-slate-950/40">
              <Link
                to="/contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white hover:scale-105 shadow-[0_8px_20px_-8px_rgba(139,92,246,0.5)] transition"
              >
                Discuss A Similar Engagement <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Services ---------------- */
const services = [
  {
    icon: Cpu,
    title: "AI Development",
    desc: "Production-grade AI systems — RAG, multi-agent architectures, and bespoke models that ship.",
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    desc: "End-to-end workflow automation that unlocks measurable productivity across departments.",
  },
  {
    icon: Compass,
    title: "AI Consulting",
    desc: "Strategic integration roadmaps aligning AI capability with business objectives.",
  },
  {
    icon: GraduationCap,
    title: "Corporate Training",
    desc: "Enterprise-ready AI capability building. Frameworks that make your team AI-fluent.",
  },
];

/* ---------------- Press / Clients logos ---------------- */
const pressLogos = [
  "The Daily Guardian",
  "APN News",
  "Money Control",
  "Institute of Internal Auditors",
  "Forbes India",
  "Economic Times",
  "YourStory",
  "Inc42",
];

type MarqueeItem = string | { name: string; iconUrl?: string };

const clientLogos = [
  { name: "Stripe", iconUrl: "https://cdn.simpleicons.org/stripe/2e2a27" },
  { name: "Notion", iconUrl: "https://cdn.simpleicons.org/notion/2e2a27" },
  { name: "Linear", iconUrl: "https://cdn.simpleicons.org/linear/2e2a27" },
  { name: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/2e2a27" },
  { name: "Anthropic", iconUrl: "https://cdn.simpleicons.org/anthropic/2e2a27" },
  { name: "OpenAI", iconUrl: "https://cdn.simpleicons.org/openai/2e2a27" },
  { name: "Figma", iconUrl: "https://cdn.simpleicons.org/figma/2e2a27" },
  { name: "Loom", iconUrl: "https://cdn.simpleicons.org/loom/2e2a27" },
];

function Marquee({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden border-y border-[#2b2117]/8 bg-[#fff8ed]/42 py-7">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#f8f4ec] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#f8f4ec] to-transparent" />
      <div
        className="flex w-max items-center gap-10 animate-marquee group-hover:[animation-play-state:paused] md:gap-14"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-14">
            <div className="flex items-center gap-3 whitespace-nowrap text-[#2e2a27] transition duration-300">
              {typeof logo !== "string" && logo.iconUrl && (
                <img
                  src={logo.iconUrl}
                  alt=""
                  loading="lazy"
                  className="h-7 w-7 object-contain opacity-90 md:h-8 md:w-8"
                />
              )}
              <span className="font-display text-2xl md:text-3xl">
                {typeof logo === "string" ? logo : logo.name}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#d7c6ae] shadow-[0_0_0_4px_rgba(255,248,237,0.68)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const philosophyCards = [
  {
    label: "PHILOSOPHY",
    heading: "Build for People, Powered by AI",
    content:
      "Technology should never feel complicated. I create digital experiences that are simple, intelligent, and genuinely useful. Every interface is designed to feel effortless while every system works powerfully behind the scenes.",
  },
  {
    label: "AI ENGINEERING",
    heading: "Creating Intelligent Digital Products",
    content:
      "From AI agents and business automations to modern SaaS platforms, I build scalable systems that save time, automate repetitive work, and help businesses grow faster.",
  },
  {
    label: "DESIGN",
    heading: "Minimal Design. Maximum Impact.",
    content:
      "Great products are remembered because they feel intuitive. I combine elegant design with clean engineering to create experiences that are fast, accessible, and enjoyable.",
  },
  {
    label: "VISION",
    heading: "Building the Future with AI",
    content:
      "I believe artificial intelligence will become the foundation of every modern business. My goal is to build products that make advanced AI simple, practical, and available to everyone.",
  },
];

function InspirationPhilosophy() {
  return (
    <section id="inspiration" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#a67c52]">
              Inspiration & Philosophy
            </div>
            <h2 className="font-display max-w-xl text-5xl leading-[0.98] text-[#241a12] md:text-7xl">
              The blueprint behind my work
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-[1.8] text-[#6a5b49] md:text-xl">
              Every product I build begins with curiosity, thoughtful design, and the belief that
              technology should solve real-world problems beautifully.
            </p>

            <Link
              to="/portfolio"
              className="group/button mt-10 inline-flex items-center justify-center gap-4 rounded-[3px] bg-[#241a12] px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fff8ed] shadow-[5px_5px_0_rgba(36,26,18,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_rgba(36,26,18,0.16)]"
            >
              <span>Explore My Journey</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>

            <div className="mt-12 w-full max-w-[380px] overflow-hidden bg-[#ead7b9] p-3 shadow-[0_24px_60px_rgba(67,45,24,0.12)] md:ml-20 lg:ml-24">
              <img
                src={inspirationIllustration}
                alt="Sepia editorial illustration of an AI brain, neural network, code particles, and geometric innovation patterns"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

        <div className="space-y-6 lg:pt-4">
          {philosophyCards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="relative overflow-hidden rounded-[3px] border border-[#2b2117]/12 bg-[#fbf4ea]/42 px-6 py-8 shadow-[0_18px_42px_rgba(67,45,24,0.06)] backdrop-blur-sm md:px-8 md:py-9"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),transparent_60%)]" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[#a67c52]">
                    <span>{card.label}</span>
                    <span className="font-display text-lg tracking-normal text-[#8b6c47]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl leading-tight text-[#241a12] md:text-[2.35rem]">
                    {card.heading}
                  </h3>
                  <p className="mt-5 max-w-3xl text-base leading-[1.9] text-[#6a5b49] md:text-lg">
                    {card.content}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutMe() {
  const paragraphs = [
    "Hi, I'm Aryan, an AI Engineer, Full Stack Web Developer, and Automation Specialist from India.",
    "I build modern websites, intelligent AI agents, business automations, SaaS platforms, and custom digital products that help businesses grow faster.",
    "My passion is combining clean design with powerful AI to create experiences that are beautiful, practical, and easy to use.",
    "From premium websites to autonomous AI assistants, I enjoy turning ideas into products that people genuinely love.",
    "Every project I build focuses on performance, elegant design, scalability, and real business impact.",
    "Outside of coding, I continuously explore new AI technologies, learn emerging tools, and create products that push creativity and innovation forward.",
  ];

  return (
    <section id="about" className="relative scroll-mt-28 px-5 py-28 md:px-6 md:py-36 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:gap-18">
        <Reveal>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="about-artwork relative mx-auto h-[clamp(560px,78vh,860px)] w-full max-w-[610px] overflow-hidden"
          >
            <img
              src={aryanAboutPortrait}
              alt="Aryan full body editorial portrait"
              loading="lazy"
              className="h-full w-full object-contain object-bottom"
            />
          </motion.div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="max-w-3xl pt-2 lg:pt-4">
            <h2 className="font-display pb-3 text-[clamp(3.2rem,6.4vw,6.4rem)] leading-[1.08] text-[#2e2a27]">
              Building AI that feels human.
            </h2>
            <p className="mt-6 text-xl leading-[1.65] text-[#8d857b] md:text-2xl">
              I believe technology should simplify life, not complicate it.
            </p>
            <div className="mt-8 space-y-4 text-[17px] leading-[1.85] text-[#4f463d] md:text-[18px]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-10 border-l border-[#a67c52]/40 pl-6 font-display text-2xl leading-snug text-[#2e2a27]">
              "Great software isn't just written, it is thoughtfully crafted."
              <footer className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a67c52]">
                Aryan
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ---------------- Page ---------------- */
export default function AryanPortfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="paper-page relative overflow-x-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <Hero />
      <AboutMe />
      <InspirationPhilosophy />

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="relative px-6 py-32 md:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Selected Work"
            title="AI Systems. Automation. Transformation."
            subtitle="A curated selection of recent engagements — from venture-backed startups to global enterprises. Click any project to read the full case study."
          />
          <Reveal>
            <div className="editorial-gallery-shell relative mb-16 h-[420px] overflow-hidden rounded-[1.4rem] border border-[#2b2117]/12 bg-[#fff8ed]/48 shadow-[0_24px_60px_rgba(67,45,24,0.12)]">
              <CircularGallery
                items={galleryItems}
                bend={2.4}
                textColor="#2e2a27"
                borderRadius={0.06}
                scrollEase={0.02}
                scrollSpeed={2.2}
                fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
                font="bold 30px Orbitron"
              />
              {/* Invisible click overlay — maps gallery slots to team members */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="flex gap-[clamp(60px,9vw,130px)] pointer-events-none">
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => setActiveTeamMember(member.id)}
                      aria-label={`View ${member.name}'s profile`}
                      title={member.name}
                      className="pointer-events-auto w-[clamp(60px,8vw,110px)] h-[clamp(80px,12vw,160px)] rounded-xl bg-transparent border-0 cursor-pointer opacity-0 hover:opacity-100 hover:bg-white/5 transition-all duration-300"
                      style={{ transform: "translateY(-10px)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 mb-16">
            {portfolioItems.map((item, i) => (
              <PortfolioCard
                key={item.title}
                item={item}
                i={i}
                onOpen={() => setActiveProject(item)}
              />
            ))}
          </div>

          <div className="text-center">
            <Magnetic>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-violet-500/50 transition-all hover:scale-105 hover:shadow-[0_12px_24px_rgba(139,92,246,0.2)]"
              >
                <span>View Full Case Studies</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative px-6 py-32 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Services" title="Four ways we work together." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-16">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative h-full rounded-3xl border border-white/10 bg-slate-900/30 p-8 transition-all duration-500 hover:border-violet-500/40 hover:bg-slate-900/60 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.3)]"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition duration-300"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-violet-400/70 mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-2xl mb-4 text-white group-hover:text-violet-300 transition duration-300">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Magnetic>
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-violet-500/50 transition-all hover:scale-105"
              >
                <span>Explore Detailed Services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* PRESS SECTION */}
      <section id="press" className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <SectionTitle eyebrow="In The Press" title="Featured in." />
        </div>
        <Marquee items={pressLogos} />
        <div className="mt-12 text-center">
          <Magnetic>
            <Link
              to="/press"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-violet-500/50 transition-all hover:scale-105"
            >
              <span>View Press Releases & Kits</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* SOCIAL IMPACT SECTION */}
      <section id="social-impact" className="relative px-6 py-32 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Social Impact" title="Giving knowledge back." />
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {[
              {
                t: "Teach & Learn",
                id: "teach",
                d: "Free curriculum and mentorship for emerging AI engineers in underserved regions.",
              },
              {
                t: "AI Blogs",
                id: "blogs",
                d: "Long-form writing exploring frontier research and practical industry application.",
              },
              {
                t: "Community Projects",
                id: "community",
                d: "Open source tools and shared infrastructure for independent builders.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <Link
                  to="/social-impact"
                  className="group relative w-full text-left overflow-hidden rounded-[1.4rem] border border-[#2b2117]/12 bg-[#fff8ed]/58 p-8 min-h-[240px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-[#a67c52]/45 hover:shadow-[0_20px_46px_rgba(67,45,24,0.12)] cursor-pointer"
                >
                  <div className="relative text-[10px] uppercase tracking-[0.3em] text-[#a67c52] transition">
                    0{i + 1}
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-3xl mb-4 text-[#2e2a27] transition">{c.t}</h3>
                    <p className="text-sm text-[#6f6357] leading-relaxed mb-6 transition">{c.d}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6b5137] transition">
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Magnetic>
              <Link
                to="/social-impact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-violet-500/50 transition-all hover:scale-105"
              >
                <span>Read Social Impact Stories</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* MASTER GUIDE SECTION */}
      <section className="px-6 py-32 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.4rem] border border-[#2b2117]/12 bg-[#fff8ed]/58 p-12 text-center shadow-[0_26px_70px_rgba(67,45,24,0.12)] md:p-20">
              <div className="absolute inset-0 grid-bg opacity-30" />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-violet-400">
                  <span className="h-px w-8 bg-violet-500/50" /> Master Guide
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl mx-auto text-white">
                  Unlock The Full <em className="italic font-light text-violet-300">Potential</em>{" "}
                  Of AI
                </h2>
                <p className="mt-8 max-w-xl mx-auto text-slate-300">
                  A free, in-depth guide to expert prompt engineering, agentic systems, and
                  production deployment.
                </p>
                <div className="mt-12 inline-block">
                  <Magnetic>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4.5 text-xs uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_-8px_rgba(139,92,246,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_24px_-6px_rgba(139,92,246,0.6)]"
                    >
                      Download Free Guide{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <SectionTitle eyebrow="Happy Clients" title="Trusted by leading teams." />
        </div>
        <Marquee items={clientLogos} reverse />
      </section>

      {/* FUN FACTS */}
      <section className="px-6 py-32 md:py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Fun Facts" title="By the numbers." />
          <div className="grid gap-px bg-white/5 md:grid-cols-4 border border-white/10 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {[
              { n: 50, s: "+", l: "Projects Shipped" },
              { n: 4, s: "", l: "Continents Served" },
              { n: 9, s: "", l: "Dogs (Yes, Nine)" },
              { n: 100, s: "+", l: "Workshops Led" },
            ].map((f, i) => (
              <Reveal key={f.l} delay={i * 0.1}>
                <div className="bg-slate-950/70 backdrop-blur-sm p-10 md:p-14 h-full border-r border-white/5 last:border-r-0">
                  <div className="font-display text-6xl md:text-7xl mb-4 bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                    <Counter to={f.n} suffix={f.s} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{f.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg cursor-pointer hover:bg-violet-500 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <TeamMemberPage memberId={activeTeamMember} onClose={() => setActiveTeamMember(null)} />
    </main>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-white/5 px-6 pt-32 pb-12 bg-slate-950/40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight mb-20 text-white">
            Let's <em className="italic font-light text-violet-400">build</em>
            <br />
            something rare.
          </h2>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-4 border-t border-white/10 pt-16">
          <div className="md:col-span-2">
            <div className="mb-4 font-display text-3xl font-semibold text-[#241a12]">Aryan</div>
            <p className="text-slate-400 text-sm max-w-sm mt-4">
              AI builder, consultant and eternal tinkerer. Turning AI from buzzword into competitive
              edge.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-violet-400 mb-5">
              Contact
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition group relative"
                  href="mailto:aryanthealgohype@gmail.com"
                >
                  <Mail className="h-4 w-4 text-violet-400 group-hover:scale-110 transition" />
                  aryanthealgohype@gmail.com
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition group relative"
                  href="tel:+918587951091"
                >
                  <Phone className="h-4 w-4 text-violet-400 group-hover:scale-110 transition" />
                  +91 8587951091
                </a>
              </li>
              <li className="text-slate-400 text-xs mt-2">Press: palack@thealgohype</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-violet-400 mb-5">
              Social
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-white relative"
                  href="#"
                >
                  <Linkedin className="h-4 w-4 text-violet-400" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="group inline-flex items-center gap-2 text-slate-300 hover:text-white relative"
                  href="#"
                >
                  <Twitter className="h-4 w-4 text-violet-400" /> X
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Aryan — All rights reserved.</div>
          <div>Crafted with intent.</div>
        </div>
      </div>
    </footer>
  );
}

