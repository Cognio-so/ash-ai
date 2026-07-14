import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Cpu, Workflow, Compass, GraduationCap, Check, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar, Footer, CursorSpotlight, ScrollProgress } from "@/components/AryanPortfolio";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Aryan.AI — AI Services & Solutions" },
      {
        name: "description",
        content: "Bespoke AI development, multi-agent frameworks, enterprise automations, technical consulting, and corporate training programs by Aryan.AI.",
      },
    ],
  }),
  component: ServicesPage,
});

const serviceDetails = [
  {
    icon: Cpu,
    title: "AI Development",
    tagline: "Build production-grade systems that scale.",
    desc: "Custom large language model pipelines, advanced retrieval engines (RAG), and agentic workflows built to run reliably inside your infrastructure.",
    features: [
      "Secure retrieval (RAG) with hybrid search & custom rerankers",
      "Multi-agent supervisor-worker topologies (using LangGraph/Temporal)",
      "Bespoke model fine-tuning & evaluation harnesses",
      "Deployment in private VPC or serverless container gateways",
    ],
    deliverables: ["Tested system source code", "LLM evaluation dashboard", "Latency/Cost benchmarks"],
  },
  {
    icon: Workflow,
    title: "Automation Systems",
    tagline: "Eliminate repetitive operations.",
    desc: "Connect your databases, SaaS platforms, and LLMs into self-executing automation workflows that eliminate human friction and administrative overhead.",
    features: [
      "Custom workflow design in n8n, Make, or Python",
      "Vision-language parsing for structured invoices, bills, & forms",
      "Robust retry loops, fallback routing, and human-in-the-loop gates",
      "Continuous operations logging and error telemetry hooks",
    ],
    deliverables: ["Active workflow configurations", "Operational dashboard", "Training hand-off guides"],
  },
  {
    icon: Compass,
    title: "AI Consulting",
    tagline: "Align technology with business metrics.",
    desc: "Workshops and strategic roadmapping sessions designed to identify actual ROI opportunities, vet vendor options, and design AI architectures.",
    features: [
      "Architecture design reviews and vendor evaluation reports",
      "Detailed feasibility studies with custom ROI models",
      "LLM security, privacy, compliance and risk-mitigation framing",
      "Fractional CTO advisory for AI engineering scaling",
    ],
    deliverables: ["AI Integration Roadmap", "Security & Compliance Guidelines", "Vendor Selection Matrix"],
  },
  {
    icon: GraduationCap,
    title: "Corporate Training",
    tagline: "Build the AI fluency of your team.",
    desc: "Hands-on workshops, lecture series, and custom learning portals built to upskill your existing software engineers and operational staff.",
    features: [
      "Prompt engineering masterclasses for operations teams",
      "Agentic framework deep dives for engineering teams",
      "Custom notebooks, guides, and shared learning sandboxes",
      "Curriculum alignment with your active business priorities",
    ],
    deliverables: ["Workshop recordings & notebooks", "Reference code repos", "Upskill completion badges"],
  },
];

const workflowSteps = [
  { num: "01", title: "Discovery", desc: "We deep-dive into your database systems, current workflows, and business roadblocks." },
  { num: "02", title: "Strategy & Spec", desc: "We deliver a detailed solution architecture specification, budget blueprint, and timeline." },
  { num: "03", title: "Active Build", desc: "Sprints with weekly staging check-ins. You see the pipelines running live." },
  { num: "04", title: "Evals & Hardening", desc: "Rigorous testing across 1,000+ query sets, securing compliance and latency gates." },
  { num: "05", title: "Launch & Hand-off", desc: "VPC deployment, staff training, and 30-day post-launch optimization support." },
];

function ServicesPage() {
  return (
    <main className="paper-page min-h-screen pt-32 pb-12 relative overflow-hidden">
      <CursorSpotlight />
      <ScrollProgress />
      <Navbar />

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

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
            Capabilities
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Engineering services spanning strategic advisory, bespoke model orchestration, document ingestion, and enterprise learning pipelines.
          </p>
        </div>

        {/* Detailed Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-32">
          {serviceDetails.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-3xl border border-white/10 bg-slate-900/30 p-8 md:p-10 flex flex-col justify-between hover:border-violet-500/30 hover:bg-slate-900/50 hover:shadow-[0_20px_45px_-20px_rgba(139,92,246,0.25)] transition duration-500"
            >
              <div>
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition duration-300">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-3xl mb-2 text-white group-hover:text-violet-300 transition duration-300">{service.title}</h3>
                <p className="text-violet-400/90 text-sm tracking-wider uppercase mb-6 font-semibold">{service.tagline}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">{service.desc}</p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Scope of Work</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex gap-2.5">
                        <Check className="h-4.5 w-4.5 text-violet-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Deliverables */}
                <div className="border-t border-white/5 pt-6 mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">Key Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((del) => (
                      <span key={del} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 border border-white/5">
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact trigger */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.20em] text-violet-300 group-hover:text-white transition duration-300 font-semibold"
                >
                  Initiate Engagement <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement Pipeline (Workflow) */}
        <section className="mb-24">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-white">How We Work Together</h2>
            <p className="mt-4 max-w-xl text-slate-300 text-sm">
              Our structured process ensures predictable deployment timelines, rigorous evaluation criteria, and smooth operational hand-off.
            </p>
          </div>

          <div className="grid gap-px bg-white/5 md:grid-cols-5 border border-white/10 rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            {workflowSteps.map((step) => (
              <div key={step.num} className="bg-slate-950/70 p-8 md:p-10 h-full border-r border-white/5 last:border-r-0">
                <div className="font-display text-4xl text-violet-400 mb-4">{step.num}</div>
                <h3 className="font-display text-xl text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/20 p-12 text-center mb-16 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/20 via-indigo-950/20 to-cyan-950/10 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">Have a specific roadmap in mind?</h2>
            <p className="max-w-md mx-auto text-slate-300 text-sm mb-10 leading-relaxed">
              Book a strategy call to lay down your product blueprint, evaluate engineering feasibility, and estimate integration budgets.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(139,92,246,0.4)] hover:scale-105 transition"
            >
              Book Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

