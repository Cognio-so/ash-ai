import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar, Footer, CursorSpotlight, ScrollProgress } from "@/components/AryanPortfolio";

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
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=92",
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
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=92",
  },
  {
    tag: "Automation",
    title: "Document Intelligence Pipeline",
    year: "2024",
    client: "International Logistics Carrier",
    duration: "6 weeks",
    summary:
      "End-to-end parsing of bills of lading, customs forms, and invoices across 17 languages.",
    problem:
      "Manual data entry on 40k documents/month produced a 7% error rate and a 3-day backlog at peak.",
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
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=92",
  },
  {
    tag: "AI Product",
    title: "Conversational Commerce Agent",
    year: "2024",
    client: "DTC fashion brand, $90M GMV",
    duration: "11 weeks",
    summary:
      "A storefront AI concierge that handles discovery, sizing, and post-purchase across SMS and web.",
    problem:
      "Conversion stalled at 1.8% and support tickets ballooned with sizing and returns questions.",
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
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=92",
  },
];

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Aryan.AI — Portfolio & Case Studies" },
      {
        name: "description",
        content:
          "A detailed list of production AI systems, custom RAG integrations, agentic automation, and conversational commerce case studies by Aryan.AI.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "RAG / Enterprise", "Multi-Agent System", "Automation", "AI Product"];

  const filteredItems =
    filter === "All" ? portfolioItems : portfolioItems.filter((item) => item.tag === filter);

  return (
    <main className="paper-page min-h-screen pt-32 pb-12 relative overflow-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

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
            Selected Works
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Deploying AI from research into enterprise runtime. These case studies represent
            production solutions delivering tangible operations returns.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-16 border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.15em] transition duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_14px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-32 mb-20">
          <AnimatePresence mode="wait">
            {filteredItems.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image Showcase with Lens Zoom */}
                <div
                  className={`lens-zoom-container aspect-[16/10] bg-slate-900 border border-white/10 shadow-2xl relative ${
                    idx % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                    className="lens-image w-full h-full"
                  />
                  <div className="lens-glare" />
                  <div className="absolute bottom-6 left-6 z-10 bg-slate-950/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl text-xs uppercase tracking-[0.2em] text-violet-300">
                    {project.tag}
                  </div>
                </div>

                {/* Case Study Details */}
                <div>
                  <div className="flex gap-4 items-center text-[10px] uppercase tracking-[0.2em] text-violet-400 mb-4">
                    <span>{project.year}</span>
                    <span>·</span>
                    <span>{project.duration}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-white">
                    {project.title}
                  </h2>
                  <p className="text-slate-300 mb-8 leading-relaxed">{project.summary}</p>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-900/20 border border-white/5 rounded-2xl p-5">
                    {project.results.map((res) => (
                      <div key={res.label}>
                        <div className="font-display text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                          {res.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-slate-400 mt-1">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Problem & Approach */}
                  <div className="space-y-6 mb-8 text-sm">
                    <div>
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-2">
                        The Problem
                      </h4>
                      <p className="text-slate-400 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-2">
                        The Solution
                      </h4>
                      <ul className="space-y-2">
                        {project.approach.slice(0, 3).map((app, i) => (
                          <li key={i} className="flex gap-2.5 text-slate-400">
                            <Check className="h-4.5 w-4.5 text-violet-400 shrink-0 mt-0.5" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:scale-105 shadow-[0_4px_14px_rgba(139,92,246,0.4)] transition"
                  >
                    Build A Similar System <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}

