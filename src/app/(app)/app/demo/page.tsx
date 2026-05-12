"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Map as MapIcon,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://madethis.com/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type TabKey =
  | "overview"
  | "org-map"
  | "role-fit"
  | "leadership"
  | "risks"
  | "recommendations"
  | "decision";

const TABS: { key: TabKey; label: string; icon: typeof MapIcon }[] = [
  { key: "overview", label: "Overview", icon: Sparkles },
  { key: "org-map", label: "Org Map", icon: Network },
  { key: "role-fit", label: "Role Fit", icon: Target },
  { key: "leadership", label: "Leadership Coverage", icon: ShieldCheck },
  { key: "risks", label: "Team Risks", icon: AlertTriangle },
  { key: "recommendations", label: "Recommendations", icon: CheckCircle2 },
  { key: "decision", label: "Decision Report", icon: FileText },
];

export default function FullDemoPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [tab, setTab] = useState<TabKey>("overview");

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/sign-in?redirect=/app/demo");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading demo…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Top banner */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.06] px-5 py-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-indigo-200">
            <Sparkles className="h-3 w-3" />
            Demo
          </span>
          <p className="text-sm text-zinc-300">
            You&rsquo;re viewing a demo report for{" "}
            <span className="font-semibold text-white">AtlasFlow Technologies</span>,
            a fictional company. Get a report for your actual team →
          </p>
        </div>
        <Link
          href="/pricing"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/50 px-3 py-1.5 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/15 hover:text-white"
        >
          View Pricing
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
          OrgLens AI · Full Demo Report
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          AtlasFlow Technologies — Organizational Intelligence Report
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          A consolidated demo report showing how OrgLens analyzes team
          structure, role fit, leadership coverage, and team risks. AtlasFlow
          Technologies is a fictional 42-person B2B SaaS company.
        </p>
      </header>

      {/* Tab nav */}
      <div className="mb-8 overflow-x-auto">
        <div className="inline-flex min-w-max items-center gap-1 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all md:text-sm ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-100 ring-1 ring-inset ring-indigo-400/40"
                    : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {tab === "overview" && <OverviewTab />}
        {tab === "org-map" && <OrgMapTab />}
        {tab === "role-fit" && <RoleFitTab />}
        {tab === "leadership" && <LeadershipTab />}
        {tab === "risks" && <RisksTab />}
        {tab === "recommendations" && <RecommendationsTab />}
        {tab === "decision" && <DecisionTab />}
      </div>

      {/* Bottom upgrade CTA */}
      <section className="mt-16">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.10] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Your team
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to run this analysis for your actual team?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            Same report, your data. Built from your team. Delivered in days.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              Get Founder Snapshot — $49
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              Run Full Analysis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  OVERVIEW                                    */
/* ─────────────────────────────────────────── */

function OverviewTab() {
  const metrics = [
    { label: "Team Size", value: "42", tone: "indigo" as const },
    { label: "Avg Role-Fit Score", value: "79%", tone: "emerald" as const },
    { label: "Risk Signals Identified", value: "6", tone: "amber" as const },
  ];

  const insights = [
    {
      tone: "warn" as const,
      title: "Sales Leadership Gap",
      body:
        "Sales execution risk detected: the founder is still driving strategic sales decisions, while the Growth Lead and Sales Manager split pipeline ownership without clear leadership coverage.",
    },
    {
      tone: "good" as const,
      title: "Role Fit Signal",
      body:
        "Top role-fit match: Jordan Lee (CTO) — overall score 7.94 across evaluating info, creating solutions, and structuring work.",
    },
    {
      tone: "bad" as const,
      title: "Founder Bottleneck",
      body:
        "Founder still involved in too many sales decisions. High founder dependency limits structured operating model transition.",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Company summary */}
      <section className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Company summary
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              AtlasFlow Technologies
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              AtlasFlow Technologies is a fictional B2B SaaS company with 42 employees. The company is growing from founder-led sales and product decisions into a more structured operating model. The leadership team wants to clarify ownership, reduce founder dependency, strengthen sales leadership, and understand whether the current org structure is ready for the next stage of growth.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">
            <SummaryStat label="Stage" value="Growth" />
            <SummaryStat label="Sector" value="B2B SaaS" sub="Software" />
            <SummaryStat label="Team" value="42" />
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Key metrics
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
          The headlines for AtlasFlow Technologies
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                {m.label}
              </p>
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
      </section>

      {/* Insight cards */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Top insights
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
          What OrgLens surfaces
        </h3>
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
                <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                  {i.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Fictional demo company
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          AtlasFlow Technologies is a fictional company used to illustrate how
          OrgLens works. No real employee or company data is shown. Any resemblance to real organizations is coincidental.
          OrgLens can be used by startups and SMEs with 10–150 employees across
          software, healthcare services, professional services, e-commerce,
          education, fintech, and other knowledge-work businesses.
        </p>
      </section>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
      {sub && <p className="text-[10px] text-zinc-500">{sub}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  ORG MAP                                     */
/* ─────────────────────────────────────────── */

interface OrgNodeData {
  name: string;
  role: string;
  tone: "green" | "amber" | "red";
}
interface OrgGroup {
  parent: OrgNodeData;
  children: OrgNodeData[];
}

const ORG_GROUPS: OrgGroup[] = [
  {
    parent: { name: "Jordan Lee", role: "CTO", tone: "green" },
    children: [
      { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
      { name: "Taylor Brooks", role: "Head of Product", tone: "amber" },
    ],
  },
  {
    parent: {
      name: "Casey Miller",
      role: "Head of Operations",
      tone: "green",
    },
    children: [
      { name: "Sam Parker", role: "Finance & Strategy Lead", tone: "green" },
      { name: "Dana Reed", role: "People Operations Lead", tone: "green" },
    ],
  },
  {
    parent: {
      name: "Jamie Carter",
      role: "Growth Lead",
      tone: "amber",
    },
    children: [],
  },
  {
    parent: {
      name: "Avery Wilson",
      role: "Sales Manager",
      tone: "amber",
    },
    children: [],
  },
  {
    parent: {
      name: "Riley Johnson",
      role: "Customer Success Lead",
      tone: "amber",
    },
    children: [],
  },
];

function OrgMapTab() {
  const competencyHeatmap: { label: string; score: number; tone: "green" | "amber" | "red" }[] = [
    { label: "Driving Success", score: 7.8, tone: "green" },
    { label: "Exerting Influence", score: 7.7, tone: "green" },
    { label: "Evaluating Information", score: 7.6, tone: "green" },
    { label: "Coping with Pressure", score: 7.4, tone: "green" },
    { label: "Interacting with People", score: 7.6, tone: "green" },
    { label: "Creating Solutions", score: 7.6, tone: "green" },
    { label: "Structuring Work", score: 7.6, tone: "green" },
    { label: "Supporting Individuals", score: 7.6, tone: "amber" },
  ];

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Full org chart
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              AtlasFlow Technologies — Reporting structure
            </h2>
          </div>
          <p className="text-xs text-zinc-500">42 team members</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
          {/* CEO */}
          <div className="flex flex-col items-center">
            <OrgMapNode
              node={{ name: "Alex Morgan", role: "Founder & CEO", tone: "green" }}
              large
            />
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
            Average score across AtlasFlow Technologies&rsquo; leadership team on the
            Great 8 competency model (1–9 scale).
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
                <span className="w-44 shrink-0 text-xs text-zinc-300">
                  {c.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${(c.score / 10) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-10 shrink-0 text-right font-mono text-xs font-semibold ${textColor}`}
                >
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
        <p
          className={`truncate text-zinc-500 ${
            large ? "text-[11px]" : "text-[10px]"
          }`}
        >
          {node.role}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  ROLE FIT                                    */
/* ─────────────────────────────────────────── */

interface RoleFitRow {
  name: string;
  role: string;
  fit: number;
  topSignal: string;
}

const ROLE_FIT_ROWS: RoleFitRow[] = [
  { name: "Jordan Lee", role: "CTO", fit: 94, topSignal: "Evaluating Info · Creating Solutions" },
  { name: "Alex Morgan", role: "Founder & CEO", fit: 91, topSignal: "Exerting Influence · Driving Success" },
  { name: "Taylor Brooks", role: "Head of Product", fit: 86, topSignal: "Creating Solutions · Evaluating Info" },
  { name: "Morgan Chen", role: "Engineering Lead", fit: 84, topSignal: "Evaluating Info · Creating Solutions" },
  { name: "Sam Parker", role: "Finance & Strategy Lead", fit: 82, topSignal: "Evaluating Info · Structuring Work" },
  { name: "Casey Miller", role: "Head of Operations", fit: 80, topSignal: "Structuring Work · Supporting Individuals" },
  { name: "Jamie Carter", role: "Growth Lead", fit: 78, topSignal: "Exerting Influence · Driving Success" },
  { name: "Riley Johnson", role: "Customer Success Lead", fit: 76, topSignal: "Interacting · Supporting Individuals" },
  { name: "Avery Wilson", role: "Sales Manager", fit: 73, topSignal: "Interacting · Exerting Influence" },
  { name: "Dana Reed", role: "People Operations Lead", fit: 71, topSignal: "Supporting Individuals · Interacting" },
];

function RoleFitTab() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Role fit rankings
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Leadership team · AtlasFlow Technologies
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Each team member&rsquo;s overall role-fit score against their current
          role, with the top competency signals contributing to the score.
        </p>
      </div>

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
                <tr
                  key={r.name}
                  className="border-b border-[#1E1E24] last:border-b-0 hover:bg-[#13131A]"
                >
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">
                    {i + 1}
                  </td>
                  <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                  <td className="px-5 py-3 text-zinc-400">{r.role}</td>
                  <td className="px-5 py-3 hidden text-xs text-zinc-500 md:table-cell">
                    {r.topSignal}
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-mono font-semibold ${scoreColor}`}
                  >
                    {r.fit}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  LEADERSHIP COVERAGE                         */
/* ─────────────────────────────────────────── */

function LeadershipTab() {
  const items: { tone: "good" | "warn"; title: string; body: string }[] = [
    {
      tone: "good",
      title: "Strong",
      body: "Leading, Driving Success, Coping with Pressure",
    },
    {
      tone: "warn",
      title: "Gap: Interacting with People",
      body: "Only 2 of 6 leaders score above 7.5",
    },
    {
      tone: "warn",
      title: "Gap: Evaluating Information",
      body: "Strategic analysis coverage thin below VP level",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Leadership coverage
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Where leadership is strong, where it&rsquo;s thin
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          A read on the senior team&rsquo;s competency coverage across the
          Great 8 model.
        </p>
      </div>

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
            <div
              key={i.title}
              className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ${tone.iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {i.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {i.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  TEAM RISKS                                  */
/* ─────────────────────────────────────────── */

function RisksTab() {
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
      body: "Unclear boundary between Growth, Sales, and Customer Success functions.",
      level: "medium",
    },
    {
      title: "Key-Person Dependency",
      body: "Jordan Lee (CTO) is a single point of failure for all technical decisions.",
      level: "high",
    },
    {
      title: "Customer Handoff Risk",
      body: "Handoff process from Sales to Customer Success is undefined. Risk of churn at onboarding.",
      level: "medium",
    },
    {
      title: "Product/Engineering Tension",
      body: "Prioritization conflicts between Head of Product (Taylor Brooks) and Engineering Lead (Morgan Chen).",
      level: "medium",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Team risks
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          What could limit the next growth phase
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Structural and people risks identified across AtlasFlow Technologies&rsquo;
          current team and org design.
        </p>
      </div>

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
            <div
              key={r.title}
              className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ${tone.iconColor}`}
                >
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${tone.badge}`}
                >
                  {tone.label} risk
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {r.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  RECOMMENDATIONS                             */
/* ─────────────────────────────────────────── */

function RecommendationsTab() {
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
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Recommended actions
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Eight things AtlasFlow should do next
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Prioritized actions to clarify ownership, reduce key-person risk, and
          set the org up for its next stage.
        </p>
      </div>

      <ol className="space-y-3">
        {recs.map((r, i) => (
          <li
            key={r}
            className="flex items-start gap-4 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5"
          >
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

/* ─────────────────────────────────────────── */
/*  DECISION REPORT                             */
/* ─────────────────────────────────────────── */

function DecisionTab() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Decision report
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Founder-ready brief — AtlasFlow Technologies
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          A consolidated narrative summary of the report — structured to support
          a board, co-founder, or operator conversation.
        </p>
      </div>

      <article className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h3 className="text-base font-semibold text-white">
              Team Strengths
            </h3>
            <p className="mt-3">
              AtlasFlow Technologies has a strong core at the leadership level. Jordan Lee (CTO) leads with the highest overall score at 7.94, followed by Alex Morgan (CEO) at 7.76 and Taylor Brooks (Head of Product) at 7.64. The engineering function has strong competency alignment across Evaluating Information and Creating Solutions. The company has a credible foundation to build a more structured operating model from.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">Key Risks</h3>
            <p className="mt-3">
              The primary risk is structural: sales execution risk is high. The founder is still driving strategic sales decisions, while the Growth Lead and Sales Manager split pipeline ownership without clear leadership coverage. Jordan Lee (CTO) represents a key-person dependency for all technical decisions. The handoff from Sales to Customer Success is undefined, creating churn risk. Casey Miller&rsquo;s Operations scope is unclear relative to Finance and People functions, creating potential ownership confusion.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              Recommended Next Steps
            </h3>
            <p className="mt-3">
              Clarify sales ownership and leadership coverage before hiring additional sales roles or expanding pipeline targets. Define the ownership boundary between Jamie Carter (Growth Lead) and Avery Wilson (Sales Manager) for pipeline responsibility. Establish a handoff process from Sales to Customer Success before the next growth cycle. Reduce CTO key-person dependency by identifying a second technical leader or cross-training Morgan Chen. Run an org readiness assessment before adding a management layer.
            </p>
          </section>
        </div>
      </article>

      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.06] p-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            Get your own report for your actual team
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Same depth, same structure, your data.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
        >
          View Pricing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
