import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Users,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MessageSquare,
  Clock,
  BarChart3,
  FileSpreadsheet,
  Star,
  Zap,
  UserPlus,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Aryan.AI" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// ── Types ──────────────────────────────────────────────────────────────────────
type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  message: string;
  client_ip: string | null;
  submitted_at: string;
  created_at: string;
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const SESSION_KEY = "aryan_admin_token";

function getStoredToken() {
  try {
    return sessionStorage.getItem(SESSION_KEY) || "";
  } catch {
    return "";
  }
}

function storeToken(token: string) {
  try {
    sessionStorage.setItem(SESSION_KEY, token);
  } catch {}
}

function clearToken() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function isToday(iso: string) {
  try {
    const d = new Date(iso);
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  } catch {
    return false;
  }
}

function topService(leads: Lead[]): string {
  if (!leads.length) return "—";
  const counts: Record<string, number> = {};
  for (const l of leads) {
    counts[l.service] = (counts[l.service] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
}

// ── Excel / CSV Export ─────────────────────────────────────────────────────────
function downloadExcel(leads: Lead[]) {
  const headers = [
    "#",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Service",
    "Message",
    "Submitted At",
    "Created At",
    "Client IP",
  ];

  const rows = leads.map((l, i) => [
    i + 1,
    l.name,
    l.email,
    l.phone,
    l.company || "",
    l.service,
    l.message,
    formatDate(l.submitted_at || l.created_at),
    formatDate(l.created_at),
    l.client_ip || "",
  ]);

  // Build proper CSV
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join(
    "\r\n",
  );

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aryan-ai-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Main Component ─────────────────────────────────────────────────────────────
function AdminPage() {
  const [token, setToken] = useState(() => getStoredToken());
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <LoginScreen onLogin={(t) => { storeToken(t); setToken(t); }} />;
  }

  return (
    <Dashboard
      token={token}
      onLogout={() => {
        clearToken();
        setToken("");
      }}
    />
  );
}

// ── Login Screen ───────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; token?: string; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }

      onLogin(data.token || "");
    } catch {
      setError("Connection error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fbfaf7 0%, #f6f0e2 50%, #eee5d0 100%)" }}
    >
      {/* Animated background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse 5s ease-in-out infinite 1s",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background:
              i % 3 === 0
                ? "rgba(212,175,55,0.6)"
                : i % 3 === 1
                  ? "rgba(197,160,89,0.5)"
                  : "rgba(170,124,17,0.4)",
            left: `${5 + i * 8}%`,
            top: `${10 + (i * 7) % 80}%`,
            animation: `float ${3 + (i % 4)}s ease-in-out infinite ${i * 0.3}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 15px 35px rgba(212, 175, 55, 0.08), 0 5px 15px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Gradient top border */}
          <div
            className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg, #d4af37, #f3e5ab, #aa7c11)" }}
          />

          <div className="p-10">
            {/* Logo */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #aa7c11)",
                  boxShadow: "0 8px 32px rgba(212, 175, 55, 0.3)",
                }}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div
                className="text-xs uppercase tracking-[0.3em] font-bold mb-2"
                style={{ color: "#aa7c11" }}
              >
                Aryan.AI
              </div>
              <h1 className="text-2xl font-bold" style={{ color: "#2c251a" }}>Admin Portal</h1>
              <p className="mt-2 text-sm" style={{ color: "#7c7261" }}>
                Secure access · Authorized personnel only
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-xs uppercase tracking-wider font-bold mb-2"
                  style={{ color: "#8a7d6a" }}
                >
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    color: "#2c251a",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(212, 175, 55, 0.6)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(212, 175, 55, 0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(212, 175, 55, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs uppercase tracking-wider font-bold mb-2"
                  style={{ color: "#8a7d6a" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPass ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 pr-12 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                      color: "#2c251a",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(212, 175, 55, 0.6)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(212, 175, 55, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(212, 175, 55, 0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition"
                    style={{ color: "#8a7d6a" }}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{
                      background: "rgba(220, 38, 38, 0.08)",
                      border: "1px solid rgba(220, 38, 38, 0.2)",
                      color: "#b91c1c",
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "rgba(212,175,55,0.5)"
                    : "linear-gradient(135deg, #d4af37, #c5a059, #aa7c11)",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(212, 175, 55, 0.3)",
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: "#8a7d6a" }}>
          © {new Date().getFullYear()} Aryan.AI · Admin access only
        </p>
      </motion.div>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"submissions" | "exports" | "users">("submissions");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [adminUsers, setAdminUsers] = useState<{ id: string; username: string; role: string; lastActive: string }[]>([
    { id: "1", username: "admin", role: "Super Admin", lastActive: "Active Now" },
    { id: "2", username: "aryan", role: "Administrator", lastActive: "2 hours ago" },
  ]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Administrator");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLeads = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      else setRefreshing(true);
      setError("");

      try {
        const res = await fetch("/api/admin/leads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = (await res.json()) as { ok?: boolean; leads?: Lead[]; error?: string };

        if (!res.ok || !data.ok) {
          if (res.status === 401) {
            onLogout();
            return;
          }
          setError(data.error || "Failed to load leads");
          return;
        }

        setLeads(data.leads || []);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [token, onLogout],
  );

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  // ── Stats ──
  const todayLeads = leads.filter((l) => isToday(l.created_at || l.submitted_at));
  const topSvc = topService(leads);
  const serviceCounts: Record<string, number> = {};
  for (const l of leads) serviceCounts[l.service] = (serviceCounts[l.service] || 0) + 1;

  // ── Filter ──
  const filtered = leads.filter(
    (l) =>
      !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const serviceColor: Record<string, string> = {
    "AI Development": "#7c3aed",
    "Workflow Automation": "#059669",
    "AI Consulting": "#d47a08",
    "Corporate Training": "#0284c7",
    Other: "#8a7d6a",
  };

  function getServiceColor(svc: string) {
    for (const [key, color] of Object.entries(serviceColor)) {
      if (svc.includes(key.split(" ")[0])) return color;
    }
    return "#8a7d6a";
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #fbfaf7 0%, #edf4f9 50%, #f7f1e3 100%)" }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(56, 189, 248, 0.08), 0 5px 15px rgba(212, 175, 55, 0.06) !important;
        }
        .lead-row:hover { background: rgba(56, 189, 248, 0.05) !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 4px; }
      `}</style>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #d4af37, #38bdf8)" }}
          >
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm leading-none" style={{ color: "#2c251a" }}>Aryan.AI</div>
            <div className="text-xs mt-0.5" style={{ color: "#aa7c11" }}>
              Admin Panel
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Refresh */}
          <button
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(212, 175, 55, 0.06)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              color: "#aa7c11",
            }}
            title="Refresh leads"
            id="refresh-leads-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: "rgba(212, 175, 55, 0.06)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              color: "#aa7c11",
            }}
            id="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold"
            style={{
              color: "#2c251a",
            }}
          >
            Client Inquiries Dashboard
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#6e6352" }}>
            All form submissions from aryan.ai/contact — live from Supabase
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b mb-8 pb-1" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
          {[
            { id: "submissions", label: "Inquiries", icon: MessageSquare },
            { id: "exports", label: "Excel Downloads", icon: FileSpreadsheet },
            { id: "users", label: "Admin Users", icon: Shield },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all duration-200 cursor-pointer -mb-1"
                style={{
                  background: isActive ? "rgba(255, 255, 255, 0.85)" : "transparent",
                  borderLeft: isActive ? "1px solid rgba(212, 175, 55, 0.2)" : "1px solid transparent",
                  borderRight: isActive ? "1px solid rgba(212, 175, 55, 0.2)" : "1px solid transparent",
                  borderTop: isActive ? "1px solid rgba(212, 175, 55, 0.2)" : "1px solid transparent",
                  color: isActive ? "#aa7c11" : "#8a7d6a",
                  boxShadow: isActive ? "0 -4px 10px rgba(212, 175, 55, 0.03)" : "none",
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "submissions" && (
          <>
            {/* Stats Grid */}
            <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Inquiries",
              value: leads.length,
              icon: Users,
              color: "#0284c7",
              bg: "rgba(2, 132, 199, 0.05)",
              border: "rgba(2, 132, 199, 0.15)",
            },
            {
              label: "Today's Leads",
              value: todayLeads.length,
              icon: TrendingUp,
              color: "#059669",
              bg: "rgba(5, 150, 105, 0.05)",
              border: "rgba(5, 150, 105, 0.15)",
            },
            {
              label: "Top Service",
              value: topSvc.length > 14 ? topSvc.slice(0, 14) + "…" : topSvc,
              icon: Star,
              color: "#aa7c11",
              bg: "rgba(212, 175, 55, 0.05)",
              border: "rgba(212, 175, 55, 0.15)",
              isText: true,
            },
            {
              label: "This Week",
              value: leads.filter((l) => {
                try {
                  const d = new Date(l.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return d >= weekAgo;
                } catch {
                  return false;
                }
              }).length,
              icon: Calendar,
              color: "#7c3aed",
              bg: "rgba(124, 58, 237, 0.05)",
              border: "rgba(124, 58, 237, 0.15)",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="stat-card rounded-2xl p-5 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                border: `1px solid ${stat.border}`,
                boxShadow: "0 10px 25px rgba(56, 189, 248, 0.02), 0 4px 12px rgba(212, 175, 55, 0.02)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: "#8a7d6a" }}>
                  {stat.label}
                </p>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
              <div
                className={`font-bold ${stat.isText ? "text-lg" : "text-3xl"}`}
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service breakdown */}
        {leads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl p-5 mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              boxShadow: "0 10px 25px rgba(56, 189, 248, 0.02)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4" style={{ color: "#aa7c11" }} />
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#2c251a" }}>Service Breakdown</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(serviceCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([svc, count]) => (
                  <div
                    key={svc}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      border: `1px solid ${getServiceColor(svc)}40`,
                      color: getServiceColor(svc),
                    }}
                  >
                    <span>{svc}</span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-xs font-bold"
                      style={{ background: `${getServiceColor(svc)}18` }}
                    >
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(212, 175, 55, 0.15)",
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.02)",
          }}
        >
          {/* Table Header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.1)" }}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" style={{ color: "#0284c7" }} />
              <h2 className="font-bold text-sm uppercase tracking-wider" style={{ color: "#2c251a" }}>
                All Submissions
              </h2>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(56, 189, 248, 0.15)", color: "#0284c7" }}
              >
                {filtered.length}
              </span>
            </div>

            {/* Search */}
            <input
              type="search"
              placeholder="Search by name, email, service…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="leads-search"
              className="px-4 py-2 rounded-xl text-xs outline-none transition-all duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                color: "#2c251a",
                width: "260px",
              }}
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <RefreshCw
                className="w-8 h-8 mx-auto mb-3 animate-spin"
                style={{ color: "#0284c7" }}
              />
              <p className="text-sm" style={{ color: "#6e6352" }}>
                Loading leads from Supabase…
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-16 text-center px-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4"
                style={{
                  background: "rgba(220, 38, 38, 0.06)",
                  border: "1px solid rgba(220, 38, 38, 0.15)",
                  color: "#b91c1c",
                }}
              >
                {error}
              </div>
              <br />
              <button
                onClick={() => fetchLeads()}
                className="text-xs px-4 py-2 rounded-xl cursor-pointer transition"
                style={{
                  background: "rgba(56, 189, 248, 0.08)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  color: "#0284c7",
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="py-20 text-center px-6">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: "#aa7c11" }} />
              <p className="font-semibold mb-2" style={{ color: "#2c251a" }}>
                {searchQuery ? "No matching leads found" : "No inquiries yet"}
              </p>
              <p className="text-sm" style={{ color: "#8a7d6a" }}>
                {searchQuery
                  ? "Try a different search term"
                  : "When clients submit the contact form, their details will appear here"}
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.1)" }}>
                    {["#", "Client", "Contact", "Company", "Service", "Date", ""].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-xs uppercase tracking-wider font-bold"
                        style={{ color: "#8a7d6a" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="lead-row transition-colors duration-150 cursor-pointer"
                      style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.08)" }}
                      onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                    >
                      {/* # */}
                      <td className="px-5 py-4 text-xs" style={{ color: "#8a7d6a" }}>
                        {i + 1}
                      </td>

                      {/* Client */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase flex-shrink-0"
                            style={{
                              background: `${getServiceColor(lead.service)}18`,
                              color: getServiceColor(lead.service),
                            }}
                          >
                            {lead.name.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold leading-none" style={{ color: "#2c251a" }}>
                              {lead.name}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#6e6352" }}>
                              {lead.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6e6352" }}>
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      </td>

                      {/* Company */}
                      <td className="px-5 py-4 text-xs" style={{ color: "#6e6352" }}>
                        {lead.company || <span style={{ color: "#c5a059" }}>—</span>}
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `${getServiceColor(lead.service)}12`,
                            color: getServiceColor(lead.service),
                          }}
                        >
                          {lead.service}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#6e6352" }}>
                          <Clock className="w-3 h-3" />
                          {formatDate(lead.created_at || lead.submitted_at)}
                        </div>
                        {isToday(lead.created_at || lead.submitted_at) && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-bold mt-1 inline-block"
                            style={{ background: "rgba(5, 150, 105, 0.1)", color: "#059669" }}
                          >
                            Today
                          </span>
                        )}
                      </td>

                      {/* Expand */}
                      <td className="px-5 py-4">
                        <ChevronRight
                          className="w-4 h-4 transition-transform duration-200"
                          style={{
                            color: "#8a7d6a",
                            transform: selectedLead?.id === lead.id ? "rotate(90deg)" : "rotate(0deg)",
                          }}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Expanded Message Panel */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                    style={{ borderTop: "1px solid rgba(212, 175, 55, 0.15)" }}
                  >
                    <div
                      className="p-6"
                      style={{ background: "rgba(56, 189, 248, 0.03)" }}
                    >
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Details */}
                        <div className="lg:col-span-1 space-y-3">
                          <h4
                            className="text-xs uppercase tracking-wider font-bold mb-3"
                            style={{ color: "#0284c7" }}
                          >
                            Contact Details
                          </h4>
                          {[
                            { icon: Mail, label: "Email", value: selectedLead.email },
                            { icon: Phone, label: "Phone", value: selectedLead.phone },
                            { icon: Building2, label: "Company", value: selectedLead.company || "—" },
                            { icon: Briefcase, label: "Service", value: selectedLead.service },
                          ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-start gap-3">
                              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0284c7" }} />
                              <div>
                                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#8a7d6a" }}>
                                  {label}
                                </div>
                                <div className="text-sm mt-0.5 font-medium" style={{ color: "#2c251a" }}>{value}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Message */}
                        <div className="lg:col-span-2">
                          <h4
                            className="text-xs uppercase tracking-wider font-bold mb-3"
                            style={{ color: "#0284c7" }}
                          >
                            Project Brief
                          </h4>
                          <div
                            className="rounded-xl p-4 text-sm leading-relaxed"
                            style={{
                              background: "rgba(255, 255, 255, 0.9)",
                              border: "1px solid rgba(212, 175, 55, 0.15)",
                              color: "#352e22",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {selectedLead.message}
                          </div>
                          {selectedLead.client_ip && (
                            <p className="text-xs mt-2" style={{ color: "#8a7d6a" }}>
                              IP: {selectedLead.client_ip}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </>
    )}

        {/* Excel Downloads Tab */}
        {activeTab === "exports" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-2xl p-6 flex items-center justify-between"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              border: "1px solid rgba(212, 175, 55, 0.15)",
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.02)",
            }}
          >
            <div className="text-sm font-medium" style={{ color: "#8a7d6a" }}>
              {leads.length} records
            </div>

            <button
              onClick={() => downloadExcel(leads)}
              disabled={!leads.length}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                borderColor: "rgba(212, 175, 55, 0.3)",
                background: "rgba(255, 255, 255, 0.95)",
                color: "#aa7c11",
              }}
            >
              <Download className="w-4 h-4" />
              Download Excel
            </button>
          </motion.div>
        )}

        {/* Admin Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header with CTA */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold" style={{ color: "#2c251a" }}>
                  Admin User Accounts
                </h2>
                <p className="text-xs mt-1" style={{ color: "#8a7d6a" }}>
                  Manage administrators who have access to the Aryan.AI Admin Portal
                </p>
              </div>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #aa7c11)",
                  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
                }}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add Admin User
              </button>
            </div>

            {/* Users List Card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                border: "1px solid rgba(212, 175, 55, 0.15)",
                boxShadow: "0 10px 30px rgba(56, 189, 248, 0.02)",
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(212, 175, 55, 0.1)" }}>
                      {["#", "User", "Role", "Last Active Status", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-xs uppercase tracking-wider font-bold"
                          style={{ color: "#8a7d6a" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user, idx) => (
                      <tr
                        key={user.id}
                        style={{ borderBottom: idx < adminUsers.length - 1 ? "1px solid rgba(212, 175, 55, 0.08)" : "none" }}
                      >
                        <td className="px-6 py-4 text-xs font-medium" style={{ color: "#8a7d6a" }}>
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase"
                              style={{
                                background: "rgba(212, 175, 55, 0.1)",
                                color: "#aa7c11",
                              }}
                            >
                              {user.username.slice(0, 2)}
                            </div>
                            <div className="text-sm font-semibold" style={{ color: "#2c251a" }}>
                              {user.username}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              background: user.role === "Super Admin" ? "rgba(2, 132, 199, 0.08)" : "rgba(138, 125, 106, 0.08)",
                              color: user.role === "Super Admin" ? "#0284c7" : "#6e6352",
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs" style={{ color: "#6e6352" }}>
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={user.username === "admin"}
                            onClick={() => setAdminUsers(adminUsers.filter((u) => u.id !== user.id))}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                              borderColor: "rgba(239, 68, 68, 0.2)",
                              background: "rgba(239, 68, 68, 0.02)",
                              color: "#dc2626",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: "#8a7d6a" }}>
            Data stored in Supabase · Aryan.AI Admin Panel · {new Date().getFullYear()}
          </p>
        </div>
      </main>

      {/* Add Admin User Modal */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddUserModal(false)}
              className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Top gradient border */}
              <div
                className="h-1 w-full"
                style={{ background: "linear-gradient(90deg, #d4af37, #f3e5ab, #aa7c11)" }}
              />

              <div className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "#2c251a" }}>
                  <UserPlus className="w-5 h-5" style={{ color: "#aa7c11" }} />
                  Create Admin User
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newUsername || !newPassword) return;
                    setAdminUsers([
                      ...adminUsers,
                      {
                        id: String(Date.now()),
                        username: newUsername,
                        role: newRole,
                        lastActive: "Never logged in",
                      },
                    ]);
                    setNewUsername("");
                    setNewPassword("");
                    setNewRole("Administrator");
                    setShowAddUserModal(false);
                  }}
                  className="space-y-4"
                >
                  {/* Username */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: "#8a7d6a" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. aryan_dev"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        color: "#2c251a",
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: "#8a7d6a" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        color: "#2c251a",
                      }}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: "#8a7d6a" }}>
                      Role
                    </label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white"
                      style={{
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        color: "#2c251a",
                      }}
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  {/* Submit / Cancel Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddUserModal(false)}
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      style={{
                        background: "rgba(0, 0, 0, 0.04)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        color: "#6e6352",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-all cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #d4af37, #aa7c11)",
                        boxShadow: "0 4px 12px rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
