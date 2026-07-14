import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar, Footer, CursorSpotlight, ScrollProgress } from "@/components/AryanPortfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Aryan.AI — Contact & Consultations" },
      {
        name: "description",
        content: "Get in touch with Aryan.AI for AI building, enterprise operational automation, and custom LLM strategy consulting.",
      },
    ],
  }),
  component: ContactPage,
});

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

const contactSocials = [
  { label: "Instagram", href: "https://instagram.com/aryanthealgohype", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/aryanthealgohype", icon: Facebook },
  { label: "Telegram", href: "https://t.me/aryanthealgohype", icon: Telegram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X", href: "#", icon: Twitter },
];
function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    type: "AI Development",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit trigger
    setSubmitted(true);
  };

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
            Let's Connect
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300 text-lg">
            Ready to build citation-grade AI retrieval systems, automate tedious operations, or upskill your developers? Tell us about your roadmap.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 mb-20 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-8 border border-white/10 bg-slate-900/30 rounded-3xl space-y-6">
              <h3 className="font-display text-2xl text-white">Direct Channels</h3>
              <div className="space-y-4 text-sm">
                <a
                  href="mailto:aryanthealgohype@gmail.com"
                  className="flex items-center gap-3 text-slate-300 hover:text-white group transition duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  aryanthealgohype@gmail.com
                </a>
                <a
                  href="tel:+918587951091"
                  className="flex items-center gap-3 text-slate-300 hover:text-white group transition duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  +91 8587951091
                </a>
                <div className="flex items-center gap-3 text-slate-300 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>Timezone: IST (GMT+5:30)</span>
                </div>
              </div>
            </div>

            <div className="p-8 border border-white/10 bg-slate-900/30 rounded-3xl space-y-6">
              <h3 className="font-display text-2xl text-white">Social Connections</h3>
              <div className="flex flex-wrap gap-3">
                {contactSocials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2117]/12 bg-[#fff8ed]/70 text-[#6b5137] transition hover:-translate-y-0.5 hover:border-[#a67c52]/55 hover:text-[#2e2a27]"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-10 border border-white/10 bg-slate-900/20 backdrop-blur-md rounded-3xl shadow-xl relative">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-400 font-bold">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Aryan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-wider text-slate-400 font-bold">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="org" className="text-xs uppercase tracking-wider text-slate-400 font-bold">Organization</label>
                    <input
                      type="text"
                      id="org"
                      placeholder="Company Name"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-xs uppercase tracking-wider text-slate-400 font-bold">Engagement Type</label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition cursor-pointer"
                    >
                      <option className="bg-slate-950" value="AI Development">AI Development & RAG</option>
                      <option className="bg-slate-950" value="Workflow Automation">Workflow Automation (n8n/Make)</option>
                      <option className="bg-slate-950" value="AI Consulting">AI Strategy Consulting</option>
                      <option className="bg-slate-950" value="Corporate Training">Corporate Team Training</option>
                      <option className="bg-slate-950" value="Other">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-400 font-bold">Project Brief</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Outline the operations bottlenecks, systems involved, or timeline target..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm text-white placeholder-slate-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 p-4 text-sm font-semibold uppercase tracking-[0.2em] text-white hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(139,92,246,0.4)] transition duration-300 cursor-pointer"
                  >
                    <span>Send Project Brief</span>
                    <Send className="h-4 w-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="submitted-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-3xl text-white">Brief Submitted!</h3>
                  <p className="max-w-sm mx-auto text-slate-300 text-sm leading-relaxed">
                    Thank you, {formData.name}. Your project brief has been received. Aryan will review your request and follow up within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", org: "", type: "AI Development", message: "" }); }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs uppercase tracking-wider text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


