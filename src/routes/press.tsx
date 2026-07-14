import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Newspaper, Download, ExternalLink, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar, Footer, CursorSpotlight, ScrollProgress } from "@/components/AryanPortfolio";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Aryan.AI — Press & Media Mentions" },
      {
        name: "description",
        content: "Aryan.AI features in the press and media mentions across major publications, including Economic Times, Forbes India, YourStory, and Inc42.",
      },
    ],
  }),
  component: PressPage,
});

const featuredArticles = [
  {
    source: "Economic Times",
    title: "How Agentic Architectures are Reshaping Operational Cost Structures in Series C Startups",
    date: "May 12, 2025",
    link: "#",
    excerpt: "In an exclusive layout, AI Architect Aryan shares how supervisor-worker agent meshes are resolving L1 support loads and altering hiring roadmaps.",
  },
  {
    source: "Forbes India",
    title: "Venture Builder Aryan.AI Named in Top AI Integrators to Watch in 2025",
    date: "March 18, 2025",
    link: "#",
    excerpt: "From RAG pipelines for major logistics carriers to financial citation-locking engines, Aryan.AI is leading practical model integration.",
  },
  {
    source: "YourStory",
    title: "Building the AI Workforce: How Teams Across 4 Continents are Upskilling via Aryan.AI Masterclasses",
    date: "January 24, 2025",
    link: "#",
    excerpt: "With a custom curriculum covering prompt design systems and LangGraph APIs, Aryan.AI has upskilled over 5,000+ developers globally.",
  },
  {
    source: "Inc42",
    title: "Unlocking Ingestion backlogs: How Vision Models Resolved Bill-of-Lading Latency by 80%",
    date: "October 09, 2024",
    link: "#",
    excerpt: "An in-depth study of layout-aware OCR and confidence routing loops configured for international logistics carriers.",
  },
];

const mediaAssets = [
  { name: "Brand Logo Package", format: "SVG / PNG (Light & Dark)", size: "4.2 MB", desc: "Includes high-definition versions of Aryan.AI primary and secondary text logos." },
  { name: "Aryan Biography & Headshots", format: "PDF / JPEG (Color & B&W)", size: "12.8 MB", desc: "Curated profiles, headshots, and biographical summaries in short and long formats." },
  { name: "System Architecture Slide Deck", format: "PDF / PPTX", size: "8.5 MB", desc: "Speaker presentation decks on Agentic AI Topologies and citation-grade retrieval." },
];

function PressPage() {
  return (
    <main className="paper-page min-h-screen pt-32 pb-12 relative overflow-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-violet-400 hover:text-white transition duration-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] bg-gradient-to-r from-white via-indigo-100 to-cyan-100 bg-clip-text text-transparent">
            Press & Media
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Featured articles, media coverage, and downloadable brand assets for conferences, podcasts, and publications.
          </p>
        </div>

        {/* Featured Press Articles Grid */}
        <section className="mb-24">
          <h2 className="font-display text-3xl text-white mb-10 border-b border-white/5 pb-4">Recent Press Coverage</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article, idx) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group p-8 rounded-3xl border border-white/10 bg-slate-900/30 hover:border-violet-500/30 hover:bg-slate-900/50 hover:shadow-[0_15px_30px_rgba(139,92,246,0.15)] transition duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-6">
                    <span className="text-violet-400 font-semibold">{article.source}</span>
                    <span className="text-slate-500 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{article.date}</span>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-4 leading-tight group-hover:text-violet-300 transition duration-300">
                    {article.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8">{article.excerpt}</p>
                </div>
                <a
                  href={article.link}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-violet-300 hover:text-white transition duration-300"
                >
                  Read Coverage <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Downloadable Media Kit */}
        <section className="mb-16">
          <h2 className="font-display text-3xl text-white mb-10 border-b border-white/5 pb-4">Downloadable Brand Kit</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {mediaAssets.map((asset, idx) => (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-slate-900/20 hover:border-violet-500/20 hover:bg-slate-900/40 transition duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">{asset.name}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-violet-400 mb-4">{asset.format} · {asset.size}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-8">{asset.desc}</p>
                </div>
                <button
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.15em] text-white hover:bg-violet-600 hover:border-violet-500 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Download Asset</span>
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Short Bio Block */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/20 p-10 md:p-12 mb-16">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl text-white mb-6">About Aryan</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Aryan is an independent AI builder, operations engineer, and technology consultant. He partners with executive teams at early-stage startups and global enterprises to turn algorithmic potentials into practical business systems.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Operating across projects in multi-agent orchestration, layout-intelligent data streams, and retrieval benchmarks, Aryan operates as a hands-on engineer and fractional CTO.
              </p>
            </div>
            <div className="border border-white/10 rounded-2xl p-6 bg-slate-950/60 backdrop-blur-sm">
              <h4 className="text-xs uppercase tracking-widest text-violet-400 font-bold mb-4">Speaking & Media Topics</h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex gap-2">✔ <span>Citation-Locking in Enterprise RAG</span></li>
                <li className="flex gap-2">✔ <span>Supervisor-Worker Multi-Agent Meshes</span></li>
                <li className="flex gap-2">✔ <span>Layout-Aware PDF Ingestion Pipelines</span></li>
                <li className="flex gap-2">✔ <span>Accelerated Ops: AI-fluent Team Building</span></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

