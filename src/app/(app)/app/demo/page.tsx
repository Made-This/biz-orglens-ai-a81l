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
            <span className="font-semibold text-white">NovaCloud Health</span>,
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
          NovaCloud Health — Organizational Intelligence Report
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
          A consolidated demo report showing how OrgLens analyzes team
          structure, role fit, leadership coverage, and team risks. NovaCloud
          Health is a fictional 28-person health-tech startup.
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
    { label: "Team Size", value: "28", tone: "indigo" as const },
    { label: "Avg Role-Fit Score", value: "82%", tone: "emerald" as const },
    { label: "Leadership Gaps Identified", value: "3", tone: "amber" as const },
  ];

  const insights = [
    {
      tone: "warn" as const,
      title: "Org Structure Signal",
      body:
        "3 of 6 leadership roles have unclear ownership boundaries. CTO and Head of Product have overlapping accountability in roadmap decisions.",
    },
    {
      tone: "good" as const,
      title: "Role Fit Signal",
      body:
        "Top role-fit match: Alex Morgan (CEO) — 91% fit score across leading, driving success, and coping with pressure.",
    },
    {
      tone: "bad" as const,
      title: "Founder Dependency",
      body:
        "CEO involved in 80%+ of key decisions. High founder dependency limits scaling capacity beyond 30 people.",
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
              NovaCloud Health
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              NovaCloud Health is a fictional demo company used to show how
              OrgLens works for a growing team. 28-person health-tech SaaS
              startup, Series A, founder-led, moving from informal execution to
              a structured operating model.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:min-w-[320px]">
            <SummaryStat label="Stage" value="Series A" />
            <SummaryStat label="Sector" value="Health Tech" sub="SaaS" />
            <SummaryStat label="Team" value="28" />
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Key metrics
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
          The headlines for NovaCloud Health
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
          NovaCloud Health is a fictional company used to illustrate how
          OrgLens works. Any resemblance to real organizations is coincidental.
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
    parent: { name: "Jordan Lee", role: "CTO · Engineering", tone: "green" },
    children: [
      { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
      { name: "Taylor Brooks", role: "Head of Product", tone: "amber" },
      { name: "Sophia Grant", role: "UX Designer", tone: "amber" },
      { name: "Devon Lin", role: "Senior Engineer", tone: "green" },
      { name: "Priya Shah", role: "Engineer", tone: "amber" },
      { name: "Owen Park", role: "Engineer", tone: "amber" },
    ],
  },
  {
    parent: {
      name: "Riley Johnson",
      role: "Customer Success Lead",
      tone: "green",
    },
    children: [
      { name: "Zoe Chambers", role: "Onboarding Specialist", tone: "amber" },
      { name: "Caden Brooks", role: "CS Manager", tone: "amber" },
      { name: "Maya Reeves", role: "CS Specialist", tone: "amber" },
      { name: "Noah Davis", role: "Support Lead", tone: "amber" },
    ],
  },
  {
    parent: {
      name: "Casey Miller",
      role: "Head of Operations",
      tone: "green",
    },
    children: [
      { name: "Avery Wilson", role: "Clinical Ops Lead", tone: "amber" },
      { name: "Isabella Park", role: "Executive Assistant", tone: "amber" },
      { name: "Elena Torres", role: "Compliance Specialist", tone: "amber" },
      { name: "Jonas Reid", role: "Ops Analyst", tone: "amber" },
    ],
  },
  {
    parent: {
      name: "Marcus Wright",
      role: "VP Sales",
      tone: "amber",
    },
    children: [
      { name: "Lucas Kim", role: "Account Executive", tone: "amber" },
      { name: "Anika Rao", role: "Account Executive", tone: "amber" },
      { name: "Jenna Cole", role: "SDR", tone: "amber" },
      { name: "Tomas Vega", role: "SDR", tone: "amber" },
    ],
  },
];

function OrgMapTab() {
  const competencyHeatmap: { label: string; score: number; tone: "green" | "amber" | "red" }[] = [
    { label: "Leading", score: 8.2, tone: "green" },
    { label: "Driving Success", score: 8.0, tone: "green" },
    { label: "Coping with Pressure", score: 7.8, tone: "green" },
    { label: "Structuring Work", score: 7.1, tone: "amber" },
    { label: "Interacting with People", score: 6.4, tone: "amber" },
    { label: "Evaluating Information", score: 6.1, tone: "amber" },
    { label: "Adapting", score: 5.8, tone: "amber" },
    { label: "Acting with Consideration", score: 4.8, tone: "red" },
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
              NovaCloud Health — Reporting structure
            </h2>
          </div>
          <p className="text-xs text-zinc-500">28 team members</p>
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
            Average score across NovaCloud Health&rsquo;s 28 team members on the
            Great 8 competency model.
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
  { name: "Alex Morgan", role: "CEO", fit: 91, topSignal: "Leading · Driving Success" },
  { name: "Jordan Lee", role: "CTO", fit: 84, topSignal: "Structuring · Evaluating" },
  { name: "Taylor Brooks", role: "Head of Product", fit: 79, topSignal: "Adapting · Influencing" },
  { name: "Casey Miller", role: "Head of Operations", fit: 76, topSignal: "Structuring · Driving Success" },
  { name: "Riley Johnson", role: "Customer Success Lead", fit: 88, topSignal: "Interacting · Acting with Consideration" },
  { name: "Marcus Wright", role: "VP Sales", fit: 71, topSignal: "Influencing · Driving Success" },
  { name: "Morgan Chen", role: "Engineering Lead", fit: 85, topSignal: "Structuring · Evaluating" },
  { name: "Sophia Grant", role: "UX Designer", fit: 73, topSignal: "Adapting · Interacting" },
  { name: "Devon Lin", role: "Senior Engineer", fit: 82, topSignal: "Evaluating · Structuring" },
  { name: "Priya Shah", role: "Engineer", fit: 74, topSignal: "Adapting · Structuring" },
  { name: "Owen Park", role: "Engineer", fit: 70, topSignal: "Adapting · Evaluating" },
  { name: "Zoe Chambers", role: "Onboarding Specialist", fit: 81, topSignal: "Interacting · Acting with Consideration" },
  { name: "Caden Brooks", role: "CS Manager", fit: 77, topSignal: "Interacting · Driving Success" },
  { name: "Maya Reeves", role: "CS Specialist", fit: 79, topSignal: "Interacting · Adapting" },
  { name: "Noah Davis", role: "Support Lead", fit: 72, topSignal: "Interacting · Coping" },
  { name: "Avery Wilson", role: "Clinical Ops Lead", fit: 80, topSignal: "Structuring · Acting with Consideration" },
  { name: "Isabella Park", role: "Executive Assistant", fit: 86, topSignal: "Structuring · Interacting" },
  { name: "Elena Torres", role: "Compliance Specialist", fit: 78, topSignal: "Structuring · Evaluating" },
  { name: "Jonas Reid", role: "Ops Analyst", fit: 75, topSignal: "Evaluating · Structuring" },
  { name: "Lucas Kim", role: "Account Executive", fit: 73, topSignal: "Influencing · Interacting" },
  { name: "Anika Rao", role: "Account Executive", fit: 76, topSignal: "Influencing · Driving Success" },
  { name: "Jenna Cole", role: "SDR", fit: 68, topSignal: "Influencing · Coping" },
  { name: "Tomas Vega", role: "SDR", fit: 70, topSignal: "Influencing · Adapting" },
  { name: "Quinn Hayes", role: "Marketing Lead", fit: 81, topSignal: "Influencing · Adapting" },
  { name: "Sasha Patel", role: "Content Manager", fit: 74, topSignal: "Structuring · Influencing" },
  { name: "Diego Alvarez", role: "Data Analyst", fit: 83, topSignal: "Evaluating · Structuring" },
  { name: "Lena Moss", role: "People Operations", fit: 80, topSignal: "Interacting · Acting with Consideration" },
  { name: "Reuben Cole", role: "Finance Lead", fit: 87, topSignal: "Evaluating · Structuring" },
];

function RoleFitTab() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Role fit rankings
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          All 28 team members
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
      title: "Founder Dependency",
      body: "CEO involved in 80%+ of key decisions",
      level: "high",
    },
    {
      title: "Accountability Gap",
      body: "Product + Engineering ownership overlap",
      level: "medium",
    },
    {
      title: "Key Person Risk",
      body: "CTO is single point of failure for technical direction",
      level: "high",
    },
    {
      title: "Thin Bench",
      body: "3 of 6 leadership roles have no identified successor",
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
          Structural and people risks identified across NovaCloud Health&rsquo;s
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
    "Define ownership boundary between CTO and Head of Product on roadmap decisions",
    "Identify a second technical leader to reduce key-person dependency",
    "Strengthen analytical capability in senior team — 3 roles score below threshold",
    "Clarify reporting lines for 4 IC roles currently reporting to multiple stakeholders",
    "Run role redesign workshop before next hiring cycle",
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Recommended actions
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Five things NovaCloud should do next
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
          Founder-ready brief — NovaCloud Health
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
              NovaCloud Health has a strong founder-led core. Leadership scores
              highly on Leading, Driving Success, and Coping with Pressure,
              which has carried the team through Seed and into Series A. The
              engineering and customer success functions have clear,
              competency-aligned leads in Jordan Lee, Morgan Chen, and Riley
              Johnson. Role-fit is strongest in the executive tier — Alex
              Morgan (CEO) at 91% and Riley Johnson (CS Lead) at 88% — giving
              the company a credible base to build from.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">Key Risks</h3>
            <p className="mt-3">
              The most important risk is structural: ownership boundaries
              between CTO and Head of Product are not clearly defined, which
              shows up as overlap on roadmap decisions and slows execution.
              Founder dependency is high — Alex Morgan is involved in 80%+ of
              key decisions, which limits the company&rsquo;s scaling capacity
              beyond a 30-person team. The senior team also has thin coverage
              on Interacting with People and Evaluating Information, with only
              2 of 6 leaders scoring above 7.5 on the former. Three of six
              leadership roles currently have no identified successor.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white">
              Recommended Next Steps
            </h3>
            <p className="mt-3">
              Before the next hiring cycle, NovaCloud should run a focused role
              redesign to define the ownership boundary between CTO and Head of
              Product, and identify a second technical leader to reduce
              key-person dependency on Jordan Lee. The senior team would
              benefit from one new hire (or internal promotion) strong on
              Evaluating Information to lift strategic analysis coverage below
              the VP level. Clarifying reporting lines for the 4 IC roles
              currently reporting to multiple stakeholders is the lowest-cost,
              highest-leverage move available in the next 30 days.
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
