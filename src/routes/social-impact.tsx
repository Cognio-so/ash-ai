import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Newspaper,
  GitBranch,
  Shield,
  Users,
  Globe,
  Flame,
  Server,
  Sparkles,
  MessageSquare,
  Terminal,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar, Footer, CursorSpotlight, ScrollProgress } from "@/components/AryanPortfolio";

export const Route = createFileRoute("/social-impact")({
  head: () => ({
    meta: [
      { title: "Aryan.AI — Social Impact & Community" },
      {
        name: "description",
        content:
          "Aryan.AI's community initiatives: open learning pathways, frontier research blogs, open-source repositories, and shared GPU compute tools.",
      },
    ],
  }),
  component: SocialImpactPage,
});

/* SVG Icons mapped locally to avoid complex imports */
const IcCode = () => <Terminal className="w-8 h-8 text-violet-400" />;
const IcBrain = () => <Sparkles className="w-8 h-8 text-violet-400" />;
const IcNodes = () => <GitBranch className="w-8 h-8 text-violet-400" />;
const IcChat = () => <MessageSquare className="w-8 h-8 text-violet-400" />;
const IcShield = () => <Shield className="w-8 h-8 text-violet-400" />;
const IcPeople = () => <Users className="w-8 h-8 text-violet-400" />;
const IcMicroscope = () => <BookOpen className="w-8 h-8 text-violet-400" />;
const IcGear = () => <Terminal className="w-8 h-8 text-violet-400" />;
const IcStack = () => <Newspaper className="w-8 h-8 text-violet-400" />;
const IcDocument = () => <Newspaper className="w-8 h-8 text-violet-400" />;
const IcPen = () => <Sparkles className="w-8 h-8 text-violet-400" />;
const IcMic = () => <MessageSquare className="w-8 h-8 text-violet-400" />;
const IcWrench = () => <Terminal className="w-8 h-8 text-violet-400" />;
const IcDatabase = () => <Server className="w-8 h-8 text-violet-400" />;
const IcLightning = () => <Flame className="w-8 h-8 text-violet-400" />;
const IcServer = () => <Server className="w-8 h-8 text-violet-400" />;
const IcStar = () => <Sparkles className="w-8 h-8 text-violet-400" />;
const IcBubbles = () => <MessageSquare className="w-8 h-8 text-violet-400" />;

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

const impactSections: PageData[] = [
  {
    id: "teach",
    label: "Teach & Learn",
    heading: "Knowledge Is The Greatest Gift.",
    tagline: "Because the best investment is in a mind that didn't have the chance.",
    quote:
      "We build free, structured learning paths for emerging AI engineers — from curious beginners to confident builders. Every course, every mentorship session, every certificate is offered at zero cost to those who need it most.",
    heroUrl: "/document-intelligence-pipeline.png",
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
  {
    id: "blogs",
    label: "AI Blogs",
    heading: "Ideas That Move The Field Forward.",
    tagline: "Deep thinking, long-form writing — no clickbait, no fluff, no paywalls.",
    quote:
      "Every post is a deliberate act of knowledge-sharing. We write to break down complexity, challenge assumptions, and give practitioners and policy-makers a shared language for what's coming next.",
    heroUrl: "/ashu-logo.png",
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
  {
    id: "community",
    label: "Community Projects",
    heading: "Build Together. Grow Together.",
    tagline: "The best tools are built by the people who need them most.",
    quote:
      "We fund, host, and maintain open infrastructure for independent AI builders — because great work shouldn't require a corporate backing. From shared GPU clusters to collaborative datasets, everything here is community-owned and community-led.",
    heroUrl: "/autonomous-operations-platform.png",
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

function SocialImpactPage() {
  const [activeTab, setActiveTab] = useState("teach");
  const activeSection = impactSections.find((s) => s.id === activeTab) || impactSections[0];

  return (
    <main className="paper-page min-h-screen pt-32 pb-12 relative overflow-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-violet-400 hover:text-white transition duration-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] bg-gradient-to-r from-white via-indigo-100 to-cyan-100 bg-clip-text text-transparent">
            Social Impact
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Mentoring the next generation of engineers, sharing open research analysis, and
            open-sourcing infrastructure libraries.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 mb-16 gap-6 overflow-x-auto pb-4">
          {impactSections.map((sect) => (
            <button
              key={sect.id}
              onClick={() => setActiveTab(sect.id)}
              className={`pb-4 text-sm font-semibold uppercase tracking-wider relative transition duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === sect.id ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {sect.label}
              {activeTab === sect.id && (
                <motion.div
                  layoutId="activeImpactTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            {/* Banner Block */}
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 mb-16 items-center">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeSection.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-300 px-3.5 py-1 text-xs uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight whitespace-pre-line">
                  {activeSection.heading}
                </h2>
                <p className="text-violet-400 text-lg mb-8 italic">"{activeSection.tagline}"</p>
                <div className="p-6 border border-white/10 bg-slate-900/30 rounded-2xl leading-relaxed text-sm text-slate-300 shadow-md">
                  {activeSection.quote}
                </div>
              </div>

              {/* Banner Image */}
              <div className="image-frame aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={activeSection.heroUrl}
                  alt={activeSection.label}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="image-frame-img w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Core Curriculum Grid */}
            <div className="mb-20">
              <h3 className="font-display text-3xl text-white mb-10 text-center">
                Program Core Elements
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeSection.topics.map((topic, i) => (
                  <motion.div
                    key={topic.title}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="p-8 rounded-3xl border border-white/10 bg-slate-900/30 hover:border-violet-500/40 hover:bg-slate-900/50 hover:shadow-[0_20px_40px_-20px_rgba(139,92,246,0.25)] transition duration-500 flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon */}
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400">
                        {topic.icon}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-3">
                        0{i + 1}
                      </div>
                      <h4 className="font-display text-xl text-white mb-2">{topic.title}</h4>
                      <p className="text-slate-400 text-xs italic mb-4">"{topic.tagline}"</p>
                      <p className="text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {topic.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
