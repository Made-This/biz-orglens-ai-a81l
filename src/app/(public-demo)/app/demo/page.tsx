"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";

const CHECKOUT_URL =
  "https://orglens-ai.madethis.app/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

// ---------- TYPES ----------
type SectionKey =
  | "overview"
  | "org-map"
  | "role-fit"
  | "leadership"
  | "risks"
  | "recommendations"
  | "decision";

const SECTIONS: { key: SectionKey; label: string; icon: typeof Sparkles }[] = [
  { key: "overview", label: "Overview", icon: Sparkles },
  { key: "org-map", label: "Org Map", icon: Network },
  { key: "role-fit", label: "Role Fit", icon: Target },
  { key: "leadership", label: "Leadership Coverage", icon: ShieldCheck },
  { key: "risks", label: "Team Risks", icon: AlertTriangle },
  { key: "recommendations", label: "Recommendations", icon: CheckCircle2 },
  { key: "decision", label: "Decision Report", icon: FileText },
];

// ---------- IN-VIEW HOOK ----------
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.1, ...opts }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, opts]);

  return { ref, inView };
}

// ---------- PAGE ----------
export default function AppDemoPage() {
  const [active, setActive] = useState<SectionKey>("overview");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleSectionChange = (key: SectionKey) => {
    setActive(key);
    if (typeof window !== "undefined") {
      const el = document.getElementById("demo-content");
      if (el) el.scrollTop = 0;
    }
  };

  return (
    <div className="dark flex h-screen flex-col overflow-hidden bg-[#0A0A0B] text-zinc-100">
      {/* Demo banner */}
      {!bannerDismissed && (
        <div className="w-full bg-indigo-900 text-white shrink-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3.5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg">
                📊
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Demo Mode — Sample Organizational Analysis
                </p>
                <p className="mt-0.5 text-xs leading-snug opacity-80">
                  This is a fully unlocked preview. Real analysis costs $49.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={CHECKOUT_URL}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Unlock Real Analysis — $49
              </a>
              <button
                onClick={() => setBannerDismissed(true)}
                aria-label="Close demo banner"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky header */}
      <header className="shrink-0 border-b border-[#1E1E24] bg-[#0A0A0B]/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between gap-4 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="shrink-0 text-sm font-bold tracking-tight text-white"
            >
              OrgLens<span className="text-indigo-400">.</span>AI
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="truncate text-xs text-zinc-400">
              AtlasFlow Technologies — OrgLens Demo Report
            </span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
          >
            Unlock Real Analysis — $49
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Mobile tab bar */}
      <div className="shrink-0 border-b border-[#1E1E24] bg-[#0A0A0B] md:hidden">
        <div className="flex overflow-x-auto px-3 py-2 gap-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => handleSectionChange(s.key)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Desktop section sidebar */}
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[#1E1E24] bg-[#0A0A0B] md:flex">
          <div className="flex-1 overflow-y-auto px-3 py-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
              Report Sections
            </p>
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => handleSectionChange(s.key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                        : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar CTA */}
          <div className="shrink-0 border-t border-[#1E1E24] p-4">
            <a
              href={CHECKOUT_URL}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              <Sparkles className="h-4 w-4" />
              Unlock Real Analysis — $49
            </a>
            <p className="mt-2 text-center text-[10px] text-zinc-600">
              One-time payment · Instant access
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main
          id="demo-content"
          className="flex-1 overflow-y-auto bg-[#0D0D0F] px-5 py-8 md:px-8 md:py-10"
        >
          {active === "overview" && <SectionOverview />}
          {active === "org-map" && <SectionOrgMap />}
          {active === "role-fit" && <SectionRoleFit />}
          {active === "leadership" && <SectionLeadership />}
          {active === "risks" && <SectionRisks />}
          {active === "recommendations" && <SectionRecommendations />}
          {active === "decision" && <SectionDecision />}
        </main>
      </div>
    </div>
  );
}

// ---------- SECTION TITLE ----------
function SectionTitle({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
        Section {num}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
    </div>
  );
}

// =============================================================
// SECTION 1: OVERVIEW
// =============================================================
function SectionOverview() {
  const metrics = [
    { label: "Team Size", value: "42", tone: "indigo" as const },
    { label: "Avg Role-Fit Score", value: "79%", tone: "emerald" as const },
    { label: "Risk Signals Identified", value: "6", tone: "amber" as const },
  ];

  const insights = [
    {
      tone: "warn" as const,
      title: "Sales Leadership Gap",
      body: "Sales execution risk detected: the founder is still driving strategic sales decisions, while the Growth Lead and Sales Manager split pipeline ownership without clear leadership coverage.",
    },
    {
      tone: "good" as const,
      title: "Role Fit Signal",
      body: "Top role-fit match: Jordan Lee (CTO) — overall score 7.94 across Evaluating Information, Creating Solutions, and Structuring Work.",
    },
    {
      tone: "bad" as const,
      title: "Founder Bottleneck",
      body: "Founder still involved in too many sales decisions. High founder dependency limits structured operating model transition.",
    },
  ];

  return (
    <div className="space-y-10">
      <SectionTitle num="01" title="Executive Summary" />

      {/* Company card */}
      <div className="rounded-xl border border-white/[0.08] bg-[#111116] p-6">
        <h3 className="text-xl font-bold text-white">AtlasFlow Technologies</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          AtlasFlow Technologies is a fictional B2B SaaS company with 42 employees. The company is growing
          from founder-led sales and product decisions into a more structured operating model. The leadership
          team wants to clarify ownership, reduce founder dependency, strengthen sales leadership, and
          understand whether the current org structure is ready for the next stage of growth.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:max-w-sm">
          <div className="rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Stage</p>
            <p className="mt-1 text-sm font-semibold text-white">Growth</p>
          </div>
          <div className="rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Sector</p>
            <p className="mt-1 text-sm font-semibold text-white">B2B SaaS</p>
          </div>
          <div className="rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Team</p>
            <p className="mt-1 text-sm font-semibold text-white">42</p>
          </div>
        </div>
      </div>

      {/* Key metrics */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">Key metrics</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">The headlines for AtlasFlow Technologies</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{m.label}</p>
              <p
                className={`mt-2 font-mono text-3xl font-bold ${
                  m.tone === "emerald"
                    ? "text-emerald-300"
                    : m.tone === "amber"
                      ? "text-amber-300"
                      : "text-indigo-300"
                }`}
              >
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">Top insights</p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">What OrgLens surfaces</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {insights.map((i) => {
            const tone =
              i.tone === "good"
                ? {
                    border: "border-emerald-500/30",
                    bg: "from-emerald-500/[0.06]",
                    badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
                  }
                : i.tone === "warn"
                  ? {
                      border: "border-amber-500/30",
                      bg: "from-amber-500/[0.06]",
                      badge: "bg-amber-500/15 text-amber-200 border-amber-400/40",
                    }
                  : {
                      border: "border-rose-500/30",
                      bg: "from-rose-500/[0.06]",
                      badge: "bg-rose-500/15 text-rose-200 border-rose-400/40",
                    };
            return (
              <div
                key={i.title}
                className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}
              >
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest ${tone.badge}`}
                >
                  {i.title}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-zinc-200">{i.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Fictional demo company</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          AtlasFlow Technologies is a fictional company used to illustrate how OrgLens works. No real employee or
          company data is shown. Any resemblance to real organizations is coincidental. OrgLens can be used by
          startups and SMEs with 10–150 employees across software, healthcare services, professional services,
          e-commerce, education, fintech, and other knowledge-work businesses.
        </p>
      </div>
    </div>
  );
}

// =============================================================
// SECTION 2: ORG MAP
// =============================================================
interface OrgNodeData {
  name: string;
  role: string;
  tone: "green" | "amber" | "red";
}

function OrgMapNode({
  node,
  large,
  compact,
}: {
  node: OrgNodeData;
  large?: boolean;
  compact?: boolean;
}) {
  const dot =
    node.tone === "green"
      ? "bg-emerald-500"
      : node.tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  return (
    <div
      className={`relative flex w-full max-w-[280px] items-center gap-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] ${
        large ? "px-5 py-3" : compact ? "px-3 py-2" : "px-4 py-2.5"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <p
          className={`truncate font-medium text-white ${
            large ? "text-sm" : compact ? "text-[11px]" : "text-xs"
          }`}
        >
          {node.name}
        </p>
        <p className={`truncate text-zinc-500 ${large ? "text-[11px]" : "text-[10px]"}`}>
          {node.role}
        </p>
      </div>
    </div>
  );
}

const ORG_GROUPS: { parent: OrgNodeData; children: OrgNodeData[] }[] = [
  {
    parent: { name: "Jordan Lee", role: "CTO", tone: "green" },
    children: [
      { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
      { name: "Taylor Brooks", role: "Head of Product", tone: "amber" },
    ],
  },
  {
    parent: { name: "Casey Miller", role: "Head of Operations", tone: "green" },
    children: [
      { name: "Sam Parker", role: "Finance & Strategy Lead", tone: "green" },
      { name: "Dana Reed", role: "People Operations Lead", tone: "green" },
    ],
  },
  {
    parent: { name: "Jamie Carter", role: "Growth Lead", tone: "amber" },
    children: [],
  },
  {
    parent: { name: "Avery Wilson", role: "Sales Manager", tone: "amber" },
    children: [],
  },
  {
    parent: { name: "Riley Johnson", role: "Customer Success Lead", tone: "amber" },
    children: [],
  },
];

function SectionOrgMap() {
  const competencyHeatmap: { label: string; score: number; tone: "green" | "amber" | "red" }[] = [
    { label: "Driving Success", score: 7.8, tone: "green" },
    { label: "Exerting Influence", score: 7.7, tone: "green" },
    { label: "Evaluating Information", score: 7.6, tone: "green" },
    { label: "Coping with Pressure", score: 7.4, tone: "green" },
    { label: "Interacting with People", score: 7.6, tone: "green" },
    { label: "Creating Solutions", score: 7.6, tone: "green" },
    { label: "Structuring Work", score: 7.6, tone: "green" },
    { label: "Supporting Individuals", score: 7.4, tone: "amber" },
  ];

  return (
    <div className="space-y-10">
      <SectionTitle
        num="02"
        title="Competency Org Map"
        subtitle="Great 8 competencies visualized across the AtlasFlow Technologies team"
      />

      <section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Full org chart
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              AtlasFlow Technologies — Reporting structure
            </h3>
          </div>
          <p className="text-xs text-zinc-500">42 team members</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
          {/* CEO */}
          <div className="flex flex-col items-center">
            <OrgMapNode node={{ name: "Alex Morgan", role: "Founder & CEO", tone: "green" }} large />
            <div className="my-3 h-5 w-px bg-[#1E1E24]" />
          </div>

          {/* Groups */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ORG_GROUPS.map((g, gi) => (
              <div key={gi} className="flex flex-col items-center">
                <OrgMapNode node={g.parent} />
                <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                <div className="w-full space-y-2">
                  {g.children.map((c, ci) => (
                    <OrgMapNode key={ci} node={c} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competency heatmap */}
      <section>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Competency heatmap
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
            Team-wide competency averages
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Average score across AtlasFlow Technologies&rsquo; leadership team on the Great 8 competency model (1–9 scale).
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2.5 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5 md:grid-cols-2">
          {competencyHeatmap.map((c) => {
            const barColor =
              c.tone === "green"
                ? "bg-emerald-500"
                : c.tone === "amber"
                  ? "bg-amber-400"
                  : "bg-rose-500";
            const textColor =
              c.tone === "green"
                ? "text-emerald-300"
                : c.tone === "amber"
                  ? "text-amber-300"
                  : "text-rose-300";
            return (
              <div key={c.label} className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-xs text-zinc-300">{c.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div className={`h-full ${barColor}`} style={{ width: `${(c.score / 10) * 100}%` }} />
                </div>
                <span className={`w-10 shrink-0 text-right font-mono text-xs font-semibold ${textColor}`}>
                  {c.score.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// =============================================================
// SECTION 3: ROLE FIT
// =============================================================
interface RoleFitRow {
  name: string;
  role: string;
  fit: number;
  topSignal: string;
}

const ROLE_FIT_ROWS: RoleFitRow[] = [
  { name: "Jordan Lee", role: "CTO", fit: 94, topSignal: "Evaluating Information · Creating Solutions" },
  { name: "Alex Morgan", role: "Founder & CEO", fit: 91, topSignal: "Exerting Influence · Driving Success" },
  { name: "Taylor Brooks", role: "Head of Product", fit: 86, topSignal: "Creating Solutions · Evaluating Information" },
  { name: "Morgan Chen", role: "Engineering Lead", fit: 84, topSignal: "Evaluating Information · Creating Solutions" },
  { name: "Sam Parker", role: "Finance & Strategy Lead", fit: 82, topSignal: "Evaluating Information · Structuring Work" },
  { name: "Casey Miller", role: "Head of Operations", fit: 80, topSignal: "Structuring Work · Supporting Individuals" },
  { name: "Jamie Carter", role: "Growth Lead", fit: 78, topSignal: "Exerting Influence · Driving Success" },
  { name: "Riley Johnson", role: "Customer Success Lead", fit: 76, topSignal: "Interacting with People · Supporting Individuals" },
  { name: "Avery Wilson", role: "Sales Manager", fit: 73, topSignal: "Interacting with People · Exerting Influence" },
  { name: "Dana Reed", role: "People Operations Lead", fit: 71, topSignal: "Supporting Individuals · Interacting with People" },
];

function SectionRoleFit() {
  return (
    <div className="space-y-6">
      <SectionTitle
        num="03"
        title="Role–Competency Fit Ranking"
        subtitle="Each team member's overall role-fit score against their current role, with the top Great 8 competency signals."
      />

      <div className="overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E24] bg-[#0A0A0B] text-left text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              <th className="px-5 py-3 w-12">#</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 hidden md:table-cell">Top Signals</th>
              <th className="px-5 py-3 text-right">Fit Score</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {ROLE_FIT_ROWS.sort((a, b) => b.fit - a.fit).map((r, i) => {
              const scoreColor =
                r.fit >= 85
                  ? "text-emerald-300"
                  : r.fit >= 75
                    ? "text-indigo-300"
                    : r.fit >= 70
                      ? "text-amber-300"
                      : "text-rose-300";
              return (
                <tr key={r.name} className="border-b border-[#1E1E24] last:border-b-0 hover:bg-[#13131A]">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                  <td className="px-5 py-3 text-zinc-400">{r.role}</td>
                  <td className="px-5 py-3 hidden text-xs text-zinc-500 md:table-cell">{r.topSignal}</td>
                  <td className={`px-5 py-3 text-right font-mono font-semibold ${scoreColor}`}>{r.fit}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============================================================
// SECTION 4: LEADERSHIP COVERAGE
// =============================================================
function SectionLeadership() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const items: { tone: "good" | "warn"; title: string; body: string }[] = [
    {
      tone: "good",
      title: "Strong",
      body: "Driving Success and Coping with Pressure are well-covered across the senior team.",
    },
    {
      tone: "warn",
      title: "Gap: Interacting with People",
      body: "Only 2 of 6 leaders score above 7.5 on Interacting with People. Customer-facing and cross-functional alignment is thin.",
    },
    {
      tone: "warn",
      title: "Gap: Evaluating Information",
      body: "Strategic analysis coverage is thin below VP level. Sales and Growth functions lack evaluative depth.",
    },
  ];

  const rows = [
    { label: "Driving Success", before: 72, after: 84, insight: "CEO and CTO lead strongly; mid-level alignment improving." },
    { label: "Evaluating Information", before: 61, after: 74, insight: "CTO high; coverage thin in Growth and Sales functions." },
    { label: "Coping with Pressure", before: 70, after: 80, insight: "Operations and Engineering show resilience." },
    { label: "Interacting with People", before: 55, after: 68, insight: "CS Lead and People Ops carry this; senior team gap remains." },
  ];

  return (
    <div className="space-y-8">
      <SectionTitle
        num="04"
        title="Leadership Coverage"
        subtitle="Where leadership is strong, where it's thin — across the Great 8 model"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((i) => {
          const tone =
            i.tone === "good"
              ? {
                  border: "border-emerald-500/30",
                  bg: "from-emerald-500/[0.06]",
                  badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
                  icon: ShieldCheck,
                  iconColor: "text-emerald-300",
                }
              : {
                  border: "border-amber-500/30",
                  bg: "from-amber-500/[0.06]",
                  badge: "bg-amber-500/15 text-amber-200 border-amber-400/40",
                  icon: AlertTriangle,
                  iconColor: "text-amber-300",
                };
          const Icon = tone.icon;
          return (
            <div key={i.title} className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ${tone.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{i.body}</p>
            </div>
          );
        })}
      </div>

      <div ref={ref} className="rounded-xl border border-white/[0.08] bg-[#111116] p-6 md:p-8">
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Coverage delta — before vs. after structural clarification
        </p>
        <div className="space-y-7">
          {rows.map((r, i) => (
            <div key={r.label} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <p className="text-sm font-semibold text-white">{r.label}</p>
                <p className="mt-1 hidden text-[11px] leading-relaxed text-zinc-500 lg:block">{r.insight}</p>
              </div>
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-14 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Before</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-zinc-500 to-zinc-400 transition-all duration-1000 ease-out`}
                      style={{ width: inView ? `${r.before}%` : "0%" }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-xs font-semibold text-zinc-400">{r.before}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">After</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-1000 ease-out`}
                      style={{ width: inView ? `${r.after}%` : "0%", transitionDelay: `${i * 80 + 200}ms` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-xs font-semibold text-white">{r.after}%</span>
                </div>
              </div>
              <div className="lg:col-span-2 lg:text-right">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                  ↑ +{r.after - r.before}pp
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500 lg:hidden">{r.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// SECTION 5: TEAM RISKS
// =============================================================
function SectionRisks() {
  const risks: { title: string; body: string; level: "high" | "medium" }[] = [
    {
      title: "Founder Bottleneck",
      body: "Founder still involved in too many sales decisions. Limits structured operating model transition.",
      level: "high",
    },
    {
      title: "Sales Leadership Gap",
      body: "No dedicated sales leader. Pipeline split between Growth Lead (Jamie Carter) and Sales Manager (Avery Wilson) without clear ownership.",
      level: "high",
    },
    {
      title: "Ownership Gap",
      body: "Unclear boundary between Growth, Sales, and Customer Success functions creates handoff risk and duplicated effort.",
      level: "medium",
    },
    {
      title: "Key-Person Dependency",
      body: "Jordan Lee (CTO) is a single point of failure for all technical decisions. No technical succession plan.",
      level: "high",
    },
    {
      title: "Customer Handoff Risk",
      body: "Handoff process from Sales to Customer Success is undefined. Risk of churn at onboarding.",
      level: "medium",
    },
    {
      title: "Product/Engineering Tension",
      body: "Prioritization conflicts between Head of Product (Taylor Brooks) and Engineering Lead (Morgan Chen). No shared roadmap process.",
      level: "medium",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        num="05"
        title="Team Risks"
        subtitle="Structural and people risks identified across AtlasFlow Technologies' current team and org design"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {risks.map((r) => {
          const tone =
            r.level === "high"
              ? {
                  border: "border-rose-500/30",
                  bg: "from-rose-500/[0.06]",
                  badge: "bg-rose-500/15 text-rose-200 border-rose-400/40",
                  iconColor: "text-rose-300",
                  label: "High",
                }
              : {
                  border: "border-amber-500/30",
                  bg: "from-amber-500/[0.06]",
                  badge: "bg-amber-500/15 text-amber-200 border-amber-400/40",
                  iconColor: "text-amber-300",
                  label: "Medium",
                };
          return (
            <div key={r.title} className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}>
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ${tone.iconColor}`}>
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${tone.badge}`}>
                  {tone.label} risk
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{r.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================
// SECTION 6: RECOMMENDATIONS
// =============================================================
function SectionRecommendations() {
  const recs = [
    "Clarify sales ownership and leadership coverage before hiring additional sales roles or expanding pipeline targets.",
    "Define clear ownership boundary between Growth Lead and Sales Manager for pipeline responsibility.",
    "Establish a defined handoff process from Sales to Customer Success before next growth cycle.",
    "Reduce CTO key-person dependency — identify second technical leader or cross-train Engineering Lead.",
    "Clarify Casey Miller's Operations scope relative to Finance & People Operations functions.",
    "Run an org readiness assessment before adding a new management layer or making senior hires.",
    "Address Product/Engineering prioritization conflicts with a shared roadmap process.",
    "Evaluate founder involvement in sales decisions and create a delegation plan.",
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        num="06"
        title="Recommended Actions"
        subtitle="Eight things AtlasFlow should do next — prioritized to clarify ownership, reduce key-person risk, and set the org up for its next stage"
      />

      <ol className="space-y-3">
        {recs.map((r, i) => (
          <li key={r} className="flex items-start gap-4 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/40 bg-indigo-500/15 font-mono text-sm font-semibold text-indigo-200">
              {i + 1}
            </span>
            <p className="pt-1.5 text-sm leading-relaxed text-zinc-200">{r}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// =============================================================
// SECTION 7: DECISION REPORT
// =============================================================
function SectionDecision() {
  const findings = [
    {
      title: "SALES LEADERSHIP GAP",
      body: "Sales execution risk is high. The founder is still driving strategic sales decisions, while the Growth Lead and Sales Manager split pipeline ownership without clear leadership coverage. No dedicated VP of Sales or Revenue leader has been identified.",
    },
    {
      title: "FOUNDER DEPENDENCY — ALEX MORGAN",
      body: "The CEO remains the primary decision-maker across sales, product, and investor relations. High founder dependency limits the company's ability to transition to a structured operating model as headcount scales past 50.",
    },
    {
      title: "CTO KEY-PERSON RISK — JORDAN LEE",
      body: "Jordan Lee (CTO) has the highest role-fit score (94%) and is a single point of failure for all technical architecture and delivery decisions. No succession depth exists at the VP Engineering or technical leadership level.",
    },
    {
      title: "PRODUCT/ENGINEERING TENSION",
      body: "Unclear prioritization ownership between Taylor Brooks (Head of Product) and Morgan Chen (Engineering Lead) is creating delivery friction. A shared roadmap process is not in place.",
    },
  ];

  const priorities = [
    {
      label: "Priority 1",
      window: "Immediate — 0–30 days",
      items: [
        "Define sales ownership: clarify whether Growth Lead or Sales Manager owns pipeline",
        "Create a founder delegation plan for sales decisions",
        "Identify cross-training path for a second technical leader under Jordan Lee",
      ],
    },
    {
      label: "Priority 2",
      window: "Short-term — 30–60 days",
      items: [
        "Establish Sales → Customer Success handoff process",
        "Implement shared roadmap process between Product and Engineering",
        "Clarify Head of Operations scope vs. Finance and People Ops functions",
      ],
    },
    {
      label: "Priority 3",
      window: "Structural — 60–90 days",
      items: [
        "Run an org readiness assessment before adding a management layer",
        "Evaluate whether to hire a dedicated VP Sales or promote from within",
        "Re-run OrgLens analysis post-restructuring to measure improvement",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <SectionTitle num="07" title="Decision Report" />

      <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white text-zinc-900 shadow-[0_0_60px_-20px_rgba(99,102,241,0.4)]">
        {/* Memo header */}
        <header className="bg-[#0a0e27] px-7 py-6 text-white md:px-10 md:py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500/20 ring-1 ring-inset ring-indigo-500/40">
                <FileText className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-300">
                  Confidential — Founder Memo
                </p>
                <p className="mt-1 text-sm font-semibold tracking-wide text-white">
                  AtlasFlow Technologies
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-zinc-400">
              <span>OrgLens AI</span>
              <span className="text-zinc-700">·</span>
              <span>Demo Report</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">To</p>
              <p className="mt-1 text-sm font-semibold text-white">Alex Morgan, CEO</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">From</p>
              <p className="mt-1 text-sm font-semibold text-white">OrgLens AI Organizational Intelligence</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Re</p>
              <p className="mt-1 text-sm font-semibold text-white">Organizational Intelligence Assessment</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Classification</p>
              <p className="mt-1 text-sm font-semibold text-white">Confidential</p>
            </div>
          </div>
        </header>

        {/* Memo body */}
        <div className="space-y-10 px-7 py-10 md:px-12 md:py-12">
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">Executive Summary</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              AtlasFlow Technologies has a strong core leadership team with high competency scores across Driving
              Success, Evaluating Information, and Creating Solutions. The primary risks are structural: sales
              execution gaps, founder dependency, and unclear ownership boundaries that will limit the
              company&rsquo;s ability to scale beyond 50 employees without structural intervention.
            </p>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">Key Findings</h3>
            <ol className="mt-4 space-y-5">
              {findings.map((f, i) => (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-mono text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-zinc-900">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Recommended Actions (Priority Order)
            </h3>
            <div className="mt-4 space-y-4">
              {priorities.map((p) => (
                <div key={p.label} className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      {p.label}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{p.window}</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-800">
                        <span className="mt-1 text-indigo-600">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">Conclusion</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              AtlasFlow Technologies has strong talent at the senior layer. The priority is structural — not
              performance. Addressing sales ownership, founder delegation, and cross-functional boundaries will
              unlock execution capacity without additional headcount cost.
            </p>
            <p className="mt-3 text-sm italic leading-relaxed text-zinc-600 md:text-base">
              OrgLens AI recommends re-analysis in 90 days to measure competency movement post-restructuring.
            </p>
          </section>

          <div className="flex items-center gap-4 border-t border-zinc-200 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">OrgLens AI</p>
              <p className="text-xs text-zinc-500">Organizational Decision Intelligence</p>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0f0f14] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
        <div className="mx-auto max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-400">Your turn</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to run this analysis on your own team?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Upload your team&rsquo;s HUCAMA reports. Get a McKinsey-quality organizational analysis report in minutes.
          </p>
          <a
            href={CHECKOUT_URL}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.9)]"
          >
            <Sparkles className="h-4 w-4" />
            Analyze My Organization — $49
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-zinc-500">One-time payment. Instant access. No subscription.</p>
        </div>
      </div>
    </div>
  );
}
