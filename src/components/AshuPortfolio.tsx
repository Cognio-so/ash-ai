import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ArrowUpRight, Cpu, Workflow, Compass, GraduationCap, ArrowRight, X, Home as HomeIcon, Briefcase, Wrench, Newspaper, HeartHandshake, Mail, Check } from "lucide-react";
import Dock from "./Dock";

const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
);
const Twitter = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

/* ---------------- Cursor spotlight ---------------- */
function CursorSpotlight() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  useEffect(() => {
    const handler = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="h-6 w-6 rounded-full border border-black/60 mix-blend-difference" />
    </motion.div>
  );
}

/* ---------------- Scroll progress ---------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] bg-black"
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
      onMouseLeave={() => { x.set(0); y.set(0); }}
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
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      className="absolute inset-0 grid-bg"
    >
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{ background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(0,0,0,0.08), transparent 40%)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#fff_70%)]" />
    </div>
  );
}

/* ---------------- Reveal ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const links = ["Home", "Portfolio", "Services", "Press", "Social Impact", "Contact"];
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/40 border-b border-black/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#home" className="font-display text-xl tracking-tight">ASHU<span className="opacity-50">.</span>AI</a>
        <div className="hidden lg:flex items-center gap-9 text-xs uppercase tracking-[0.18em]">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="relative group text-black/70 hover:text-black transition">
              {l}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <Magnetic>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-black/30 px-5 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-black hover:text-white hover:scale-105"
          >
            Work With Me <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 150]);
  const y2 = useTransform(scrollY, [0, 600], [0, -100]);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveGridBackground />
      {/* floating shapes */}
      <motion.div style={{ y: y1 }} className="absolute left-[8%] top-[20%] h-32 w-32 rounded-full border border-black/15" />
      <motion.div
        style={{ y: y2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] top-[28%] h-40 w-40 border border-black/15"
      />
      <motion.div style={{ y: y1 }} className="absolute right-[18%] bottom-[18%] h-24 w-24 rounded-full bg-black/[0.03] border border-black/10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-black/70">
            <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" /> Available for Q2 2026
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
            I Turn AI Into <em className="italic font-light">Business</em> Advantage.
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-base md:text-lg text-black/60 leading-relaxed">
            From startups to enterprises, I build AI systems that automate,
            accelerate and scale operations.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href="#portfolio" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-black px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition-transform hover:scale-105">
                <span className="relative z-10">View Portfolio</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-black/30 px-7 py-4 text-xs uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white hover:scale-105">
                Book Strategy Call
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-black/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}

/* ---------------- Section title ---------------- */
function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-20 max-w-3xl">
      <Reveal>
        <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-black/50">
          <span className="h-px w-8 bg-black/40" /> {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base text-black/60 leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Portfolio (3D-ish glass cards) ---------------- */
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
    summary: "A secure, citation-grade retrieval system unifying 40+ years of internal research across 12M documents.",
    problem: "Analysts were spending 6+ hours/week hunting through siloed PDFs, intranets, and SharePoint. Compliance demanded verifiable citations on every generated answer.",
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
    summary: "A supervisor-worker agent mesh that resolves 62% of L1/L2 ops tickets without human escalation.",
    problem: "Operations was scaling linearly with revenue. Tickets queued for hours; root cause analysis lived in tribal knowledge.",
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
  {
    tag: "Automation",
    title: "Document Intelligence Pipeline",
    year: "2024",
    client: "International Logistics Carrier",
    duration: "6 weeks",
    summary: "End-to-end parsing of bills of lading, customs forms, and invoices across 17 languages.",
    problem: "Manual data entry on 40k documents/month produced a 7% error rate and a 3-day backlog at peak.",
    approach: [
      "Layout-aware extraction with vision-language models + structured schema validation.",
      "Confidence routing: high-confidence auto-posts; ambiguous fields go to a review UI.",
      "Continuous learning loop from correction telemetry.",
    ],
    results: [
      { label: "Documents/month", value: "40k → 110k" },
      { label: "Field accuracy", value: "99.2%" },
      { label: "Backlog", value: "3d → 4h" },
      { label: "Cost / document", value: "−68%" },
    ],
    stack: ["Donut", "GPT-4o Vision", "Pydantic", "Redis", "FastAPI", "n8n"],
  },
  {
    tag: "AI Product",
    title: "Conversational Commerce Agent",
    year: "2024",
    client: "DTC fashion brand, $90M GMV",
    duration: "11 weeks",
    summary: "A storefront AI concierge that handles discovery, sizing, and post-purchase across SMS and web.",
    problem: "Conversion stalled at 1.8% and support tickets ballooned with sizing and returns questions.",
    approach: [
      "Catalog-grounded retrieval with stylist persona and structured product tools.",
      "Realtime inventory + size-fit model trained on 2.4M historical orders.",
      "A/B framework with sequential testing and guardrails on tone, pricing, and claims.",
    ],
    results: [
      { label: "Conversion", value: "1.8% → 3.4%" },
      { label: "Support tickets", value: "−41%" },
      { label: "AOV", value: "+22%" },
      { label: "Return rate", value: "−18%" },
    ],
    stack: ["Next.js", "Pinecone", "Anthropic Claude", "Stripe", "Segment", "Shopify"],
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
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        whileHover={{ scale: 1.03, y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative w-full text-left overflow-hidden rounded-3xl border border-black/15 bg-black/[0.02] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col justify-between cursor-pointer"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(0,0,0,0.06),transparent_60%)]" />
        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-black/50">
          <span>{item.tag}</span>
          <span>{item.year}</span>
        </div>
        <div>
          <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4">{item.title}</h3>
          <p className="text-sm text-black/60 leading-relaxed mb-6 line-clamp-2">{item.summary}</p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/70 group-hover:text-black transition">
            View Case Study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-black/10 transition-transform duration-700 group-hover:scale-150" />
      </motion.button>
    </Reveal>
  );
}

/* ---------------- Project detail modal ---------------- */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 md:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl rounded-3xl border border-black/15 bg-white shadow-2xl overflow-hidden my-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-8 md:px-14 pt-14 pb-10 border-b border-black/10 bg-[#fafafa]">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="relative">
                <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.25em] text-black/50">
                  <span>{project.tag}</span><span>·</span><span>{project.year}</span><span>·</span><span>{project.duration}</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] mt-5 max-w-3xl">{project.title}</h2>
                <p className="mt-5 max-w-2xl text-black/60 leading-relaxed">{project.summary}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-black/50">Client · <span className="text-black/80">{project.client}</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 border-b border-black/10">
              {project.results.map((r) => (
                <div key={r.label} className="p-6 md:p-8 border-r last:border-r-0 border-black/10">
                  <div className="font-display text-3xl md:text-4xl">{r.value}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-black/50">{r.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10 px-8 md:px-14 py-12">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/50 mb-4">The Problem</div>
                <p className="text-black/75 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-black/50 mb-4">The Approach</div>
                <ul className="space-y-3">
                  {project.approach.map((a) => (
                    <li key={a} className="flex gap-3 text-sm text-black/75 leading-relaxed">
                      <Check className="h-4 w-4 mt-1 shrink-0" /> <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-8 md:px-14 pb-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/50 mb-4">Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-black/20 px-3 py-1 text-xs">{s}</span>
                ))}
              </div>
            </div>

            <div className="px-8 md:px-14 pb-12 flex flex-wrap gap-4 border-t border-black/10 pt-8">
              <a href="#contact" onClick={onClose} className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:scale-105 transition">
                Discuss A Similar Engagement <ArrowRight className="h-4 w-4" />
              </a>
              <button onClick={onClose} className="inline-flex items-center gap-2 rounded-full border border-black/30 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition">
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
  { icon: Cpu, title: "AI Development", desc: "Production-grade AI systems — RAG, multi-agent architectures, and bespoke models that ship." },
  { icon: Workflow, title: "Automation Systems", desc: "End-to-end workflow automation that unlocks measurable productivity across departments." },
  { icon: Compass, title: "AI Consulting", desc: "Strategic integration roadmaps aligning AI capability with business objectives." },
  { icon: GraduationCap, title: "Corporate Training", desc: "Enterprise-ready AI capability building. Frameworks that make your team AI-fluent." },
];

/* ---------------- Press / Clients logos ---------------- */
const pressLogos = ["The Daily Guardian", "APN News", "Money Control", "Institute of Internal Auditors", "Forbes India", "Economic Times", "YourStory", "Inc42"];
const clientLogos = ["Stripe", "Notion", "Linear", "Vercel", "Anthropic", "OpenAI", "Figma", "Loom"];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="group relative overflow-hidden py-6">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
      <div
        className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((logo, i) => (
          <div key={i} className="font-display text-2xl md:text-3xl text-black/40 hover:text-black transition whitespace-nowrap">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const dockItems = [
    { icon: <HomeIcon size={20} color="#fff" />, label: "Home", onClick: () => scrollTo("home") },
    { icon: <Briefcase size={20} color="#fff" />, label: "Portfolio", onClick: () => scrollTo("portfolio") },
    { icon: <Wrench size={20} color="#fff" />, label: "Services", onClick: () => scrollTo("services") },
    { icon: <Newspaper size={20} color="#fff" />, label: "Press", onClick: () => scrollTo("press") },
    { icon: <HeartHandshake size={20} color="#fff" />, label: "Social Impact", onClick: () => scrollTo("social-impact") },
    { icon: <Mail size={20} color="#fff" />, label: "Contact", onClick: () => scrollTo("contact") },
  ];

  return (
    <main className="relative bg-white text-black overflow-x-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <Hero />

      {/* PORTFOLIO */}
      <section id="portfolio" className="relative px-6 py-32 md:py-40">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Selected Work"
            title="AI Systems. Automation. Transformation."
            subtitle="A curated selection of recent engagements — from venture-backed startups to global enterprises. Click any project to read the full case study."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {portfolioItems.map((item, i) => (
              <PortfolioCard key={item.title} item={item} i={i} onOpen={() => setActiveProject(item)} />
            ))}
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section id="services" className="relative px-6 py-32 md:py-40 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Services" title="Four ways we work together." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative h-full rounded-3xl border border-black/15 bg-[#fafafa] p-8 transition-all duration-500 hover:border-black hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.4)]"
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }} className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/20">
                    <s.icon className="h-5 w-5" />
                  </motion.div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-3">0{i + 1}</div>
                  <h3 className="font-display text-2xl mb-4">{s.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section id="press" className="relative py-32 border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <SectionTitle eyebrow="In The Press" title="Featured in." />
        </div>
        <Marquee items={pressLogos} />
      </section>

      {/* SOCIAL IMPACT */}
      <section id="social-impact" className="relative px-6 py-32 md:py-40 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Social Impact" title="Giving knowledge back." />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Teach & Learn", d: "Free curriculum and mentorship for emerging AI engineers in underserved regions." },
              { t: "AI Blogs", d: "Long-form writing exploring frontier research and practical industry application." },
              { t: "Community Projects", d: "Open source tools and shared infrastructure for independent builders." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl border border-black/15 bg-[#fafafa] p-10 min-h-[360px] flex flex-col justify-between transition-all duration-500 hover:border-black">
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <div className="relative text-[10px] uppercase tracking-[0.3em] text-black/50 group-hover:text-white/60 transition">0{i + 1}</div>
                  <div className="relative">
                    <h3 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-white transition">{c.t}</h3>
                    <p className="text-sm text-black/55 group-hover:text-white/70 leading-relaxed mb-6 transition">{c.d}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] group-hover:text-white transition">
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER GUIDE */}
      <section className="px-6 py-32 md:py-40 border-t border-black/10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-black/20 bg-[#fafafa] p-12 md:p-20 text-center">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#fff_80%)]" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-black/50">
                  <span className="h-px w-8 bg-black/40" /> Master Guide
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl mx-auto">
                  Unlock The Full <em className="italic font-light">Potential</em> Of AI
                </h2>
                <p className="mt-8 max-w-xl mx-auto text-black/60">
                  A free, in-depth guide to expert prompt engineering, agentic systems, and production deployment.
                </p>
                <div className="mt-12 inline-block">
                  <Magnetic>
                    <a href="#" className="group inline-flex items-center gap-3 rounded-full border border-black/30 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white hover:scale-105">
                      Download Free Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-32 border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <SectionTitle eyebrow="Happy Clients" title="Trusted by leading teams." />
        </div>
        <Marquee items={clientLogos} reverse />
      </section>

      {/* FUN FACT */}
      <section className="px-6 py-32 md:py-40 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Fun Facts" title="By the numbers." />
          <div className="grid gap-px bg-black/10 md:grid-cols-4 border border-black/10 rounded-3xl overflow-hidden">
            {[
              { n: 50, s: "+", l: "Projects Shipped" },
              { n: 4, s: "", l: "Continents Served" },
              { n: 9, s: "", l: "Dogs (Yes, Nine)" },
              { n: 100, s: "+", l: "Workshops Led" },
            ].map((f, i) => (
              <Reveal key={f.l} delay={i * 0.1}>
                <div className="bg-white p-10 md:p-14 h-full">
                  <div className="font-display text-6xl md:text-7xl mb-4">
                    <Counter to={f.n} suffix={f.s} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-black/50">{f.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="px-6 py-32 md:py-40 border-t border-black/10">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Journal" title="Our Blogs." />
          <Reveal>
            <a href="#" className="group relative block overflow-hidden rounded-3xl border border-black/15">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[#fafafa]">
                  <div className="absolute inset-0 grid-bg transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.15),transparent_60%)] transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute bottom-6 left-6 font-display text-7xl text-black/10">01</div>
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-between bg-[#fafafa]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-black/50 mb-6">Ashutosh Upadhyay · March 28, 2025</div>
                    <h3 className="font-display text-4xl md:text-5xl leading-[1.05] mb-6">Man's Garden Of Computation</h3>
                    <p className="text-black/55 leading-relaxed">An exploration of how human intuition shapes the architectures we build — and how those same systems are quietly reshaping us in return.</p>
                  </div>
                  <div className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                    Read More
                    <span className="relative block h-px w-12 bg-black/40 overflow-hidden">
                      <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
          <div className="mt-12 text-center">
            <Magnetic>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-black/30 px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all hover:bg-black hover:text-white hover:scale-105">
                See All Posts
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative border-t border-black/10 px-6 pt-32 pb-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight mb-20">
              Let's <em className="italic font-light">build</em><br />something rare.
            </h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-4 border-t border-black/10 pt-16">
            <div className="md:col-span-2">
              <div className="font-display text-3xl mb-2">ASHU.AI</div>
              <p className="text-black/50 text-sm max-w-sm mt-4">AI builder, consultant and eternal tinkerer. Turning AI from buzzword into competitive edge.</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-5">Contact</div>
              <ul className="space-y-3 text-sm">
                <li><a className="story-link inline-block relative group" href="mailto:info@ashu.ai">info@ashu.ai<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-black group-hover:w-full transition-all duration-300" /></a></li>
                <li className="text-black/50">Press: palack@thealgohype</li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-5">Social</div>
              <ul className="space-y-3 text-sm">
                <li><a className="group inline-flex items-center gap-2 relative" href="#"><Linkedin className="h-4 w-4" /> LinkedIn<span className="absolute -bottom-0.5 left-6 h-px w-0 bg-black group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" /></a></li>
                <li><a className="group inline-flex items-center gap-2 relative" href="#"><Twitter className="h-4 w-4" /> X<span className="absolute -bottom-0.5 left-6 h-px w-0 bg-black group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" /></a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 flex flex-col md:flex-row justify-between gap-4 text-xs text-black/40">
            <div>© {new Date().getFullYear()} Ashu.AI — All rights reserved.</div>
            <div>Crafted with intent.</div>
          </div>
        </div>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />

      <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={72} />
    </main>
  );
}
