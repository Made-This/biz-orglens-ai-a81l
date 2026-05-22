"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import {
  BarChart2,
  Activity,
  Network,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  Layers,
  CheckCircle2,
  ArrowRight,
  Building2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

const CHECKOUT_URL =
  "https://madethis.com/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

// ─── Types ───────────────────────────────────────────────────────
type SectionId =
  | "executive-summary"
  | "orglens-risk-view"
  | "interactive-org-map"
  | "org-health"
  | "team-structure"
  | "leadership-strengths"
  | "role-fit"
  | "ownership-gaps"
  | "risk-signals"
  | "recommended-actions";

// ─── Navigation ──────────────────────────────────────────────────
const NAV_ITEMS: { id: SectionId; label: string; icon: ElementType }[] = [
  { id: "executive-summary", label: "Executive Summary", icon: BarChart2 },
  { id: "orglens-risk-view", label: "OrgLens Risk View", icon: ShieldAlert },
  { id: "interactive-org-map", label: "Interactive Org Map", icon: Network },
  { id: "org-health", label: "Org Health Score", icon: Activity },
  { id: "team-structure", label: "Team Competency Map", icon: Network },
  { id: "leadership-strengths", label: "Leadership Strengths", icon: TrendingUp },
  { id: "role-fit", label: "Role-Fit Analysis", icon: UserCheck },
  { id: "ownership-gaps", label: "Ownership Gaps", icon: Layers },
  { id: "risk-signals", label: "Risk Signals", icon: AlertTriangle },
  { id: "recommended-actions", label: "Recommended Actions", icon: CheckCircle2 },
];

// ─── Shared helpers ──────────────────────────────────────────────

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="p-6 md:p-10 max-w-4xl">{children}</div>;
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
        {label}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
    </div>
  );
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

// ─── Org Chart primitives ─────────────────────────────────────────

type NodeTone = "neutral" | "red" | "amber";

function OrgNode({
  name,
  title,
  tone = "neutral",
  large = false,
  tiny = false,
}: {
  name: string;
  title: string;
  tone?: NodeTone;
  large?: boolean;
  tiny?: boolean;
}) {
  const border =
    tone === "red"
      ? "border-rose-500/50"
      : tone === "amber"
        ? "border-amber-400/40"
        : "border-zinc-700";
  const dot =
    tone === "red"
      ? "bg-rose-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-emerald-500";
  const pad = tiny ? "px-1.5 py-1" : large ? "px-4 py-2.5" : "px-2.5 py-2";
  const nameCls = tiny ? "text-[9px]" : large ? "text-sm" : "text-[11px]";
  const titleCls = tiny ? "text-[7px]" : large ? "text-[11px]" : "text-[9px]";

  return (
    <div
      className={`w-full rounded-lg border ${border} bg-[#0A0A0B] ${pad} flex items-start gap-1.5`}
    >
      <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <p className={`font-medium text-white truncate ${nameCls}`}>{name}</p>
        <p className={`text-zinc-500 truncate ${titleCls}`}>{title}</p>
      </div>
    </div>
  );
}

function RiskBadge({ label, tone }: { label: string; tone: "red" | "amber" }) {
  const cls =
    tone === "red"
      ? "bg-rose-500/20 border-rose-400/40 text-rose-200"
      : "bg-amber-500/20 border-amber-400/40 text-amber-200";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[8px] font-semibold ${cls}`}
    >
      {tone === "red" ? "🔴" : "🟠"} {label}
    </span>
  );
}

function VLine({ h = 5 }: { h?: number }) {
  return <div className="w-px bg-zinc-700 mx-auto" style={{ height: `${h * 4}px` }} />;
}

// ─── Org Tree ────────────────────────────────────────────────────

function OrgTree({ showRisks }: { showRisks: boolean }) {
  const t = (id: string): NodeTone => {
    if (!showRisks) return "neutral";
    if (["ceo", "cto", "sales"].includes(id)) return "red";
    if (["ops", "growth", "cs"].includes(id)) return "amber";
    return "neutral";
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[680px] text-xs">
        <div className="flex justify-center mb-1">
          <div className="flex flex-col items-center gap-1 w-44">
            <OrgNode name="Alex Morgan" title="Founder & CEO" tone={t("ceo")} large />
            {showRisks && <RiskBadge label="Founder Bottleneck" tone="red" />}
          </div>
        </div>
        <VLine h={5} />
        <div className="relative">
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-zinc-700" />
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Jordan Lee" title="CTO" tone={t("cto")} />
              {showRisks && <RiskBadge label="Key-Person Dep." tone="red" />}
              <VLine h={4} />
              <OrgNode name="Morgan Chen" title="Eng. Lead" />
            </div>
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Taylor Brooks" title="Head of Product" />
            </div>
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Casey Miller" title="Head of Operations" tone={t("ops")} />
              {showRisks && <RiskBadge label="Ownership Gap" tone="amber" />}
              <VLine h={3} />
              <div className="flex gap-1 w-full">
                <OrgNode name="Sam Parker" title="Finance" tiny />
                <OrgNode name="Dana Reed" title="People Ops" tiny />
              </div>
            </div>
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Jamie Carter" title="Growth Lead" tone={t("growth")} />
              {showRisks && <RiskBadge label="Role Overlap" tone="amber" />}
            </div>
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Avery Wilson" title="Sales Manager" tone={t("sales")} />
              {showRisks && <RiskBadge label="Sales Gap" tone="red" />}
            </div>
            <div className="flex flex-col items-center gap-0.5" style={{ width: "16%" }}>
              <VLine h={5} />
              <OrgNode name="Riley Johnson" title="CS Lead" tone={t("cs")} />
              {showRisks && <RiskBadge label="Handoff Risk" tone="amber" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 1: Executive Summary ────────────────────────────────

function SectionExecutiveSummary() {
  return (
    <SectionWrap>
      <SectionHeading
        label="OrgLens AI · Org Intelligence Report"
        title="Executive Summary"
      />

      <Card className="mb-6 border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.04] to-transparent">
        <p className="text-sm leading-relaxed text-zinc-300">
          AtlasFlow Technologies is a 42-person B2B SaaS company growing from
          founder-led execution into a more structured operating model. OrgLens
          identifies structural risks in founder dependency, sales ownership,
          leadership coverage, and role clarity — providing the decision
          intelligence needed before the next hire, restructure, or fundraise.
        </p>
      </Card>

      {/* Company snapshot */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="text-center py-4">
          <p className="font-mono text-2xl font-bold text-white">42</p>
          <p className="mt-1 text-[11px] text-zinc-400">Employees</p>
        </Card>
        <Card className="text-center py-4">
          <p className="font-mono text-lg font-bold text-white">B2B SaaS</p>
          <p className="mt-1 text-[11px] text-zinc-400">Company Type</p>
        </Card>
        <Card className="text-center py-4">
          <p className="font-mono text-lg font-bold text-white">Growth</p>
          <p className="mt-1 text-[11px] text-zinc-400">Stage</p>
        </Card>
      </div>

      {/* Health score */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-1">
              Overall Org Health
            </p>
            <div className="flex items-baseline gap-1">
              <p className="font-mono text-5xl font-bold text-amber-300">62</p>
              <p className="text-zinc-500 text-sm">/ 100</p>
            </div>
          </div>
          <div className="flex-1">
            <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06] mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-400"
                style={{ width: "62%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>Critical</span>
              <span>At Risk</span>
              <span>Healthy</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Top risks */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Key Risks Identified
      </p>
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Founder Bottleneck", tone: "red" as const },
          { label: "Sales Leadership Gap", tone: "red" as const },
          { label: "Key-Person Dependency", tone: "red" as const },
          { label: "Ownership Gap", tone: "amber" as const },
          { label: "Customer Handoff Risk", tone: "amber" as const },
          { label: "Role Overlap", tone: "amber" as const },
        ].map((r) => {
          const cls =
            r.tone === "red"
              ? "border-rose-400/40 bg-rose-500/15 text-rose-200"
              : "border-amber-400/40 bg-amber-500/15 text-amber-200";
          return (
            <span
              key={r.label}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${cls}`}
            >
              {r.tone === "red" ? "🔴" : "🟠"} {r.label}
            </span>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section 2: Org Health Score ─────────────────────────────────

function SectionOrgHealth() {
  const dimensions = [
    { label: "Decision Clarity", score: 48, color: "bg-rose-400" },
    { label: "Leadership Coverage", score: 55, color: "bg-amber-400" },
    { label: "Role Fit", score: 70, color: "bg-yellow-400" },
    { label: "Team Execution", score: 72, color: "bg-indigo-400" },
    { label: "Ownership Clarity", score: 45, color: "bg-rose-400" },
    { label: "Structural Resilience", score: 60, color: "bg-amber-400" },
  ];

  return (
    <SectionWrap>
      <SectionHeading label="Section 3 of 9" title="Org Health Score" />

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-1">
              Overall Score
            </p>
            <div className="relative h-24 w-24 mx-auto">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="38" fill="none" stroke="#1E1E24" strokeWidth="8" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="8"
                  strokeDasharray={`${(62 / 100) * 238.8} 238.8`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold text-amber-300">
                62
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">out of 100</p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            <div className="text-center rounded-lg border border-rose-500/30 bg-rose-500/[0.04] p-3">
              <p className="font-mono text-2xl font-bold text-rose-400">3</p>
              <p className="text-[10px] text-zinc-400 mt-1">Critical Risks</p>
            </div>
            <div className="text-center rounded-lg border border-amber-500/30 bg-amber-500/[0.04] p-3">
              <p className="font-mono text-2xl font-bold text-amber-400">3</p>
              <p className="text-[10px] text-zinc-400 mt-1">Moderate Risks</p>
            </div>
            <div className="text-center rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3">
              <p className="font-mono text-2xl font-bold text-white">6</p>
              <p className="text-[10px] text-zinc-400 mt-1">Total Signals</p>
            </div>
          </div>
        </div>

        {/* Dimension breakdown */}
        <div className="space-y-3">
          {dimensions.map((d) => (
            <div key={d.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">{d.label}</span>
                <span className="font-mono text-white font-medium">{d.score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${d.color}`}
                  style={{ width: `${d.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-amber-500/20 bg-amber-500/[0.03]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 mb-2">
          Score Interpretation
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          A score of 62 signals an organization at risk. Decision clarity (48) and
          ownership clarity (45) are the lowest dimensions — meaning the company
          has structural gaps that will compound as headcount grows. Leadership
          coverage and team execution are moderate; with the right structural
          moves, this org can reach 75+ in one quarter.
        </p>
      </Card>
    </SectionWrap>
  );
}

// ─── Section 3: Team Competency Map ──────────────────────────────

function SectionTeamStructure() {
  return (
    <SectionWrap>
      <SectionHeading label="Section 4 of 9" title="Team Competency Map" />

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        OrgLens overlays risk intelligence on the standard org chart — revealing
        execution gaps and ownership risks that reporting lines alone don't show.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        <Card>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-4">
            Reporting Lines Only
          </p>
          <OrgTree showRisks={false} />
        </Card>

        <Card className="border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.04] to-transparent">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 mb-4">
            With Risk Intelligence Overlay
          </p>
          <OrgTree showRisks={true} />
        </Card>
      </div>

      {/* Legend */}
      <Card className="border-zinc-700/50">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          Risk Legend
        </p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="text-zinc-400">Critical risk — immediate attention required</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-zinc-400">Moderate risk — action needed near-term</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-zinc-400">Healthy — no risk signal detected</span>
          </div>
        </div>
      </Card>
    </SectionWrap>
  );
}

// ─── Section 4: Leadership Strengths ─────────────────────────────

function SectionLeadershipStrengths() {
  const functions = [
    {
      fn: "Engineering",
      coverage: "Strong",
      note: "Strong technical leadership under Jordan Lee. Deep delivery capability.",
      tone: "green" as const,
    },
    {
      fn: "Product",
      coverage: "Strong",
      note: "Taylor Brooks has clear product ownership and strong prioritization capacity.",
      tone: "green" as const,
    },
    {
      fn: "Operations",
      coverage: "Moderate",
      note: "Casey Miller carries broad scope — operational process is present.",
      tone: "amber" as const,
    },
    {
      fn: "Sales / Growth",
      coverage: "Weak",
      note: "Coverage is split across two roles with no clear revenue leadership.",
      tone: "red" as const,
    },
    {
      fn: "Customer Success",
      coverage: "Moderate",
      note: "Post-sale relationship ownership exists; handoff from sales needs clarity.",
      tone: "amber" as const,
    },
    {
      fn: "People / Finance",
      coverage: "Early-stage",
      note: "Present but underscoped relative to team size and growth trajectory.",
      tone: "yellow" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionHeading label="Section 5 of 9" title="Leadership Strengths" />

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Where the team has clear ownership, strong capability, and functional
        coverage — and where coverage is thin or missing.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {functions.map((f) => {
          const borderLeft =
            f.tone === "red"
              ? "border-l-rose-500"
              : f.tone === "amber"
                ? "border-l-amber-400"
                : f.tone === "green"
                  ? "border-l-emerald-500"
                  : "border-l-yellow-400";
          const coverageCls =
            f.coverage === "Strong"
              ? "bg-emerald-500/20 text-emerald-300"
              : f.coverage === "Moderate"
                ? "bg-amber-500/20 text-amber-300"
                : f.coverage === "Weak"
                  ? "bg-rose-500/20 text-rose-300"
                  : "bg-zinc-500/20 text-zinc-300";

          return (
            <div
              key={f.fn}
              className={`rounded-xl border-l-4 border border-[#1E1E24] bg-[#0F0F12] p-4 ${borderLeft}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{f.fn}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${coverageCls}`}>
                  {f.coverage}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.note}</p>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section 5: Role-Fit Analysis ────────────────────────────────

function SectionRoleFit() {
  const cards = [
    {
      name: "Jordan Lee",
      title: "CTO",
      signal: "Strong technical fit — deep engineering leadership capacity",
      gap: "Key-person dependency — single point of failure in engineering",
      gapTone: "red" as const,
    },
    {
      name: "Taylor Brooks",
      title: "Head of Product",
      signal: "Strong product ownership and roadmap capability",
      gap: "Decision rights vs. Engineering need clearer boundaries",
      gapTone: "amber" as const,
    },
    {
      name: "Jamie Carter",
      title: "Growth Lead",
      signal: "Growth and demand generation capability present",
      gap: "Significant role overlap with Sales — ownership boundary unclear",
      gapTone: "amber" as const,
    },
    {
      name: "Avery Wilson",
      title: "Sales Manager",
      signal: "Sales execution capability and deal management present",
      gap: "No VP-level accountability above — lacks clear leadership structure",
      gapTone: "amber" as const,
    },
    {
      name: "Riley Johnson",
      title: "Customer Success Lead",
      signal: "Post-sale relationship ownership and retention focus",
      gap: "Role affected by unclear handoff process from Sales",
      gapTone: "amber" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionHeading label="Section 6 of 9" title="Role-Fit Analysis" />

      <div className="mb-5 rounded-xl border border-zinc-700/50 bg-zinc-800/20 px-4 py-3">
        <p className="text-xs text-zinc-400">
          <span className="font-semibold text-zinc-300">Note:</span> Role-fit
          signals are decision-support inputs, not employment decisions. OrgLens
          does not evaluate employees for hiring or firing.
        </p>
      </div>

      <div className="space-y-3">
        {cards.map((c) => (
          <Card key={c.name}>
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <span className="text-[10px] text-zinc-500">·</span>
                <p className="text-[11px] text-zinc-400">{c.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                ✓ {c.signal}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                  c.gapTone === "red"
                    ? "border-rose-400/40 bg-rose-500/15 text-rose-300"
                    : "border-amber-400/40 bg-amber-500/15 text-amber-300"
                }`}
              >
                {c.gapTone === "red" ? "⚠" : "△"} Gap: {c.gap}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── Section 6: Ownership Gaps ───────────────────────────────────

function SectionOwnershipGaps() {
  const gaps = [
    {
      title: "Sales Ownership Gap",
      body: "Growth Lead and Sales Manager share pipeline responsibility without a clear revenue leader above them. No single person owns the full funnel.",
      tone: "red" as const,
    },
    {
      title: "Customer Handoff Gap",
      body: "No defined handoff protocol between Sales (Avery Wilson) and Customer Success (Riley Johnson) — creates post-sale relationship risk and churn exposure.",
      tone: "amber" as const,
    },
    {
      title: "Operations Accountability Gap",
      body: "Head of Operations carries cross-functional issues without clear escalation paths or decision authority boundaries — scope is too broad.",
      tone: "amber" as const,
    },
    {
      title: "Founder Escalation Gap",
      body: "Multiple functions still escalate to the Founder as the default decision-maker — compressing the founder's capacity for strategic work.",
      tone: "red" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionHeading label="Section 7 of 9" title="Ownership Gaps" />

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Areas where decision rights, accountability, or reporting lines are
        unclear — creating friction and risk as the company scales.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {gaps.map((g) => (
          <div
            key={g.title}
            className={`rounded-xl border bg-[#0F0F12] p-5 ${
              g.tone === "red" ? "border-rose-500/30" : "border-amber-400/30"
            }`}
          >
            <div className="flex items-start gap-2 mb-3">
              <span className="text-base">{g.tone === "red" ? "🔴" : "🟠"}</span>
              <p className="text-sm font-semibold text-white">{g.title}</p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">{g.body}</p>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── Section 7: Risk Signals ──────────────────────────────────────

function SectionRiskSignals() {
  const rows = [
    { area: "Founder Dependency", severity: "High", impact: "High", urgency: "Immediate" },
    { area: "Sales Ownership", severity: "High", impact: "High", urgency: "Immediate" },
    { area: "Leadership Coverage", severity: "Medium", impact: "High", urgency: "Near-term" },
    { area: "Role Clarity", severity: "Medium", impact: "Medium", urgency: "Near-term" },
    { area: "Customer Handoff", severity: "Medium", impact: "Medium", urgency: "Near-term" },
    { area: "Key-Person Dependency", severity: "High", impact: "Medium", urgency: "Near-term" },
    { area: "Hiring Readiness", severity: "Medium", impact: "High", urgency: "Before next hire" },
  ];

  const cellBg = (val: string) => {
    if (val === "High" || val === "Immediate") return "bg-rose-500/30 text-rose-200";
    if (val === "Medium" || val === "Near-term") return "bg-amber-500/20 text-amber-200";
    if (val === "Before next hire") return "bg-yellow-500/15 text-yellow-200";
    return "text-zinc-300";
  };

  return (
    <SectionWrap>
      <SectionHeading label="Section 8 of 9" title="Risk Signals" />

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Prioritized risk matrix showing severity, business impact, and urgency
        for each structural signal detected.
      </p>

      <Card className="overflow-x-auto mb-4">
        <table className="w-full text-xs min-w-[480px]">
          <thead>
            <tr className="border-b border-[#1E1E24]">
              <th className="text-left px-3 py-2 text-zinc-500 font-medium">Risk Area</th>
              <th className="px-3 py-2 text-zinc-500 font-medium text-center">Severity</th>
              <th className="px-3 py-2 text-zinc-500 font-medium text-center">Business Impact</th>
              <th className="px-3 py-2 text-zinc-500 font-medium text-center">Urgency</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.area} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                <td className="px-3 py-2.5 font-medium text-white">{r.area}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.severity)}`}>
                    {r.severity}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.impact)}`}>
                    {r.impact}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.urgency)}`}>
                    {r.urgency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-zinc-500">
        Areas marked{" "}
        <span className="text-rose-400 font-medium">Immediate</span> require
        action before the next hiring or restructuring decision.
      </p>
    </SectionWrap>
  );
}

// ─── Section 8: Recommended Actions ──────────────────────────────

function SectionRecommendedActions() {
  const actions = [
    {
      num: 1,
      title: "Define a VP of Sales or Revenue Lead",
      priority: "Critical",
      owner: "CEO",
      impact: "Closes the largest org risk — unclear sales ownership",
      urgency: "Before next hire",
      tone: "red" as const,
    },
    {
      num: 2,
      title: "Reduce founder involvement in sales decisions",
      priority: "Critical",
      owner: "CEO + new Sales Lead",
      impact: "Frees founder capacity for strategic work",
      urgency: "Immediate",
      tone: "red" as const,
    },
    {
      num: 3,
      title: "Clarify Growth vs Sales pipeline ownership",
      priority: "High",
      owner: "CEO · Jamie Carter · Avery Wilson",
      impact: "Reduces pipeline confusion and role overlap",
      urgency: "Near-term",
      tone: "amber" as const,
    },
    {
      num: 4,
      title: "Define Customer Success handoff from Sales",
      priority: "High",
      owner: "Head of Operations · Riley Johnson",
      impact: "Reduces post-sale churn risk",
      urgency: "Near-term",
      tone: "amber" as const,
    },
    {
      num: 5,
      title: "Create technical deputy or engineering manager role",
      priority: "Medium",
      owner: "Jordan Lee",
      impact: "Reduces key-person dependency in Engineering",
      urgency: "Before Series A",
      tone: "yellow" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionHeading label="Section 9 of 9" title="Recommended Actions" />

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        Prioritized actions based on org health score, risk severity, and
        business impact. Ordered by urgency.
      </p>

      <div className="space-y-3 mb-8">
        {actions.map((a) => {
          const numBg =
            a.tone === "red"
              ? "bg-rose-500/15 border-rose-400/40 text-rose-200"
              : a.tone === "amber"
                ? "bg-amber-500/15 border-amber-400/40 text-amber-200"
                : "bg-yellow-500/10 border-yellow-400/40 text-yellow-200";
          const priorityCls =
            a.tone === "red"
              ? "text-rose-400"
              : a.tone === "amber"
                ? "text-amber-400"
                : "text-yellow-400";

          return (
            <Card key={a.num} className="flex items-start gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${numBg}`}
              >
                {String(a.num).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-2">{a.title}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-zinc-500">Priority </span>
                    <span className={`font-medium ${priorityCls}`}>{a.priority}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Owner </span>
                    <span className="text-zinc-300">{a.owner}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Impact </span>
                    <span className="text-zinc-300">{a.impact}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Urgency </span>
                    <span className="text-zinc-300">{a.urgency}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Board summary */}
      <Card className="border-indigo-500/20 mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 mb-3">
          Board-Ready Summary
        </p>
        <blockquote className="border-l-2 border-indigo-500 pl-4">
          <p className="text-sm leading-relaxed text-zinc-300 italic">
            &ldquo;AtlasFlow is ready for growth, but its operating model has not
            fully caught up with its team size. The largest risks are founder
            dependency, unclear sales ownership, and limited leadership coverage.
            Before adding headcount, clarify revenue ownership, move decision
            rights out of the founder role, and strengthen leadership coverage
            across Sales, Customer Success, and Operations.&rdquo;
          </p>
        </blockquote>
      </Card>

      {/* Responsible AI */}
      <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/20 px-4 py-3 flex items-start gap-2">
        <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-500 mt-0.5" />
        <p className="text-xs text-zinc-500 leading-relaxed">
          OrgLens is a decision-support tool. It does not make hiring, firing,
          promotion, or employment decisions.{" "}
          <Link
            href="/legal/responsible-ai"
            className="text-zinc-400 hover:text-indigo-300 underline underline-offset-2"
          >
            Learn more
          </Link>
          .
        </p>
      </div>
    </SectionWrap>
  );
}

// ─── OrgLens Risk View: Risk Node Card ───────────────────────────

function RiskNodeCard({
  name,
  title,
  risk,
  flag,
}: {
  name: string;
  title: string;
  risk: "HIGH" | "MEDIUM" | "LOW";
  flag: string;
}) {
  const borderColor =
    risk === "HIGH"
      ? "border-rose-500/60"
      : risk === "MEDIUM"
        ? "border-amber-400/50"
        : "border-emerald-500/40";
  const dot =
    risk === "HIGH"
      ? "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]"
      : risk === "MEDIUM"
        ? "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.7)]"
        : "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]";
  const badgeCls =
    risk === "HIGH"
      ? "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/40"
      : risk === "MEDIUM"
        ? "bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40"
        : "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40";

  return (
    <div className={`rounded-xl border ${borderColor} bg-[#0A0A0B] p-3`}>
      <div className="flex items-start gap-2 mb-2">
        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dot}`} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white truncate">{name}</p>
          <p className="text-[10px] text-zinc-500 truncate">{title}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${badgeCls}`}>
          {risk}
        </span>
      </div>
      <p className="text-[10px] text-zinc-400 leading-snug">{flag}</p>
    </div>
  );
}

// ─── OrgLens Risk View Section ────────────────────────────────────

function SectionOrgLensRiskView() {
  const members: {
    name: string;
    title: string;
    risk: "HIGH" | "MEDIUM" | "LOW";
    flag: string;
  }[] = [
    {
      name: "Alex Morgan",
      title: "CEO",
      risk: "HIGH",
      flag: "7 direct reports, founder bottleneck, single point of failure",
    },
    {
      name: "Jordan Lee",
      title: "CTO",
      risk: "MEDIUM",
      flag: "Tech roadmap concentration, no deputy",
    },
    {
      name: "Taylor Brooks",
      title: "Head of Product",
      risk: "MEDIUM",
      flag: "Misaligned with sales priorities, low execution score",
    },
    {
      name: "Casey Miller",
      title: "Head of Ops",
      risk: "LOW",
      flag: "Strong operational coverage, solid span of control",
    },
    {
      name: "Morgan Chen",
      title: "Engineering Lead",
      risk: "HIGH",
      flag: "Key-person dependency, 60% of critical IP",
    },
    {
      name: "Riley Johnson",
      title: "CS Lead",
      risk: "HIGH",
      flag: "At-risk role in AI-Native scenario, no succession",
    },
    {
      name: "Jamie Carter",
      title: "Growth Lead",
      risk: "MEDIUM",
      flag: "Growth pipeline thin, low strategic influence",
    },
    {
      name: "Avery Wilson",
      title: "Sales Manager",
      risk: "MEDIUM",
      flag: "Sales execution gaps, coaching dependency",
    },
    {
      name: "Sam Parker",
      title: "Finance",
      risk: "LOW",
      flag: "Stable, process-driven, low risk",
    },
    {
      name: "Dana Reed",
      title: "People Ops",
      risk: "LOW",
      flag: "Low exposure, support function",
    },
  ];

  const topRisks = [
    {
      title: "Founder Bottleneck",
      desc: "Alex Morgan holds 7 direct reports + key decisions across all functions, compressing strategic capacity",
      tone: "red" as const,
    },
    {
      title: "Key-Person Dependency",
      desc: "Morgan Chen owns 60% of critical engineering IP — no deputy, no succession plan, single point of failure",
      tone: "red" as const,
    },
    {
      title: "Succession Gap",
      desc: "Riley Johnson role eliminated in AI-Native scenario — no succession plan or internal handoff ready",
      tone: "red" as const,
    },
  ];

  const riskFlags: {
    label: string;
    desc: string;
    severity: "HIGH" | "MEDIUM";
  }[] = [
    {
      label: "Founder Span of Control",
      desc: "Alex Morgan has 7 direct reports — exceeds healthy range (5–6)",
      severity: "HIGH",
    },
    {
      label: "Engineering IP Concentration",
      desc: "Morgan Chen controls 60% of critical tech IP with no documented succession",
      severity: "HIGH",
    },
    {
      label: "CS Role Automation Risk",
      desc: "Riley Johnson role is at-risk in AI-Native scenario with no internal successor",
      severity: "HIGH",
    },
    {
      label: "No CTO Deputy",
      desc: "Jordan Lee has no technical backup — single engineering decision point",
      severity: "MEDIUM",
    },
    {
      label: "Product-Sales Misalignment",
      desc: "Taylor Brooks roadmap not aligned with revenue priorities; low cross-function execution score",
      severity: "MEDIUM",
    },
    {
      label: "Growth Pipeline Thinness",
      desc: "Jamie Carter lacks strategic influence; pipeline depth insufficient for growth stage",
      severity: "MEDIUM",
    },
    {
      label: "Sales Coaching Dependency",
      desc: "Avery Wilson requires ongoing coaching to perform consistently — scalability risk",
      severity: "MEDIUM",
    },
    {
      label: "No Revenue Leadership Layer",
      desc: "No VP-level sales accountability above Sales Manager — coverage gap as company scales",
      severity: "MEDIUM",
    },
  ];

  return (
    <SectionWrap>
      <SectionHeading
        label="OrgLens AI · Risk Intelligence"
        title="OrgLens Risk View"
      />

      {/* ── Hero-style glass card: side-by-side comparison ── */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] mb-6">
        {/* Window chrome */}
        <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-slate-950/60 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            OrgLens · Org Chart Comparison — AtlasFlow Technologies
          </p>
          <p className="text-[10px] font-medium text-zinc-600">Live</p>
        </div>

        {/* Two mini charts side by side */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-3">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-1">
              Traditional View
            </p>
            <p className="text-[9px] text-zinc-600 mb-3">Static org chart · no signals</p>
            <OrgTree showRisks={false} />
          </div>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-950/80 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300 mb-1">
              OrgLens Risk View
            </p>
            <p className="text-[9px] text-zinc-500 mb-3">Same structure · risks surfaced</p>
            <OrgTree showRisks={true} />
          </div>
        </div>

        {/* Risk summary + health score row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {/* Risk signals panel */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-lg sm:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              <h4 className="text-sm font-semibold text-white">Risk Signals Detected</h4>
            </div>
            <ul className="space-y-2">
              {[
                { tone: "red" as const, label: "Founder dependency (Alex Morgan)", value: "High" },
                { tone: "red" as const, label: "Key-person risk (Morgan Chen)", value: "High" },
                { tone: "red" as const, label: "CS succession gap (Riley Johnson)", value: "High" },
                { tone: "amber" as const, label: "Tech roadmap concentration", value: "Medium" },
                { tone: "amber" as const, label: "Sales execution gaps", value: "Medium" },
              ].map((row) => (
                <li key={row.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        row.tone === "red"
                          ? "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                          : "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                      }`}
                    />
                    {row.label}
                  </span>
                  <span
                    className={`font-medium ${
                      row.tone === "red" ? "text-red-300" : "text-amber-200"
                    }`}
                  >
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Org Health Score card */}
          <div className="rounded-xl border border-rose-400/30 bg-gradient-to-b from-rose-500/[0.10] to-slate-900/80 p-4 shadow-lg sm:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-300 mb-2">
              Org Health Score
            </p>
            <div className="flex items-baseline gap-1 mb-2">
              <p className="font-mono text-3xl font-bold text-amber-300">62</p>
              <p className="text-zinc-500 text-sm">/ 100</p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06] mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-400"
                style={{ width: "62%" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/[0.08] py-1.5">
                <p className="font-mono text-sm font-bold text-rose-400">3</p>
                <p className="text-[8px] text-zinc-500 mt-0.5">HIGH</p>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.08] py-1.5">
                <p className="font-mono text-sm font-bold text-amber-400">4</p>
                <p className="text-[8px] text-zinc-500 mt-0.5">MED</p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.08] py-1.5">
                <p className="font-mono text-sm font-bold text-emerald-400">3</p>
                <p className="text-[8px] text-zinc-500 mt-0.5">LOW</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full 10-member risk node map ── */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Full Team Risk Map — All 10 Members
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-6">
        {members.map((m) => (
          <RiskNodeCard key={m.name} {...m} />
        ))}
      </div>

      {/* ── Top 3 risk callout cards ── */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Top 3 Surfaced Risks
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-6">
        {topRisks.map((r, i) => (
          <div
            key={r.title}
            className="rounded-xl border border-rose-500/30 bg-rose-500/[0.04] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-[10px] font-bold text-rose-300 shrink-0">
                {i + 1}
              </span>
              <p className="text-xs font-semibold text-rose-200 leading-tight">{r.title}</p>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Risk flags list ── */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Surfaced Risk Flags
      </p>
      <div className="space-y-2">
        {riskFlags.map((f) => {
          const severityCls =
            f.severity === "HIGH"
              ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
              : "bg-amber-500/20 text-amber-200 border border-amber-400/40";
          const iconColor =
            f.severity === "HIGH" ? "text-rose-400" : "text-amber-400";
          return (
            <div
              key={f.label}
              className="flex items-start gap-3 rounded-lg border border-[#1E1E24] bg-[#0F0F12] px-4 py-3"
            >
              <AlertTriangle
                className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${iconColor}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">{f.label}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">{f.desc}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${severityCls}`}
              >
                {f.severity}
              </span>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section: Interactive Org Map ────────────────────────────────

// Data for all 10 AtlasFlow team members
const ORG_MEMBERS = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    title: "CEO",
    risk: "HIGH" as const,
    insightLabel: "Ownership Gap",
    bullets: [
      "Accountability for revenue and pipeline is shared across 3 functions with no clear owner.",
      "Founder still holds final sign-off on deals >$50K, creating a bottleneck at scale.",
      "Strategic bandwidth compressed by 7 direct reports — above recommended span for growth-stage CEO.",
    ],
    fitScore: 71,
    aiInsight: "High commercial drive but execution oversight gaps surface under lean operating conditions — delegation infrastructure urgently needed.",
    competencies: [82, 68, 75, 70, 78, 62, 65, 88],
    strengths: ["Enterprising & Performing", "Leading & Deciding"],
    devAreas: ["Organising & Executing", "Adapting & Coping"],
  },
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    title: "CTO",
    risk: "LOW" as const,
    insightLabel: "Key-Person Risk",
    bullets: [
      "Key-person dependency risk. 70% of infrastructure decisions funnel through this role.",
      "No documented succession or deputy — single engineering decision point.",
      "Technical depth is strong; stakeholder communication remains a development gap.",
    ],
    fitScore: 78,
    aiInsight: "Consistently strong technical fit — thrives in analytical, execution-heavy environments, but presentation and stakeholder communication require deliberate development.",
    competencies: [74, 72, 62, 91, 85, 80, 70, 68],
    strengths: ["Analysing & Interpreting", "Creating & Conceptualising"],
    devAreas: ["Interacting & Presenting"],
  },
  {
    id: "morgan-chen",
    name: "Morgan Chen",
    title: "Eng Lead",
    risk: "HIGH" as const,
    insightLabel: "Burnout Signal",
    bullets: [
      "Scope exceeds tenure. Managing 8 ICs with limited leadership development support.",
      "Leading & Deciding score (55) is below threshold for the current span of control.",
      "Burnout signal — adaptability index at 52, well below the team average.",
    ],
    fitScore: 61,
    aiInsight: "Technical precision is high, but the leadership scope has outpaced competency development — without structural support, performance risk increases within 90 days.",
    competencies: [55, 68, 58, 84, 76, 62, 52, 60],
    strengths: ["Analysing & Interpreting", "Creating & Conceptualising"],
    devAreas: ["Leading & Deciding", "Adapting & Coping"],
  },
  {
    id: "taylor-brooks",
    name: "Taylor Brooks",
    title: "Head of Product",
    risk: "MEDIUM" as const,
    insightLabel: "Authority Diffuse",
    bullets: [
      "Product roadmap authority diffuse. Competing priorities from CEO and CTO unresolved.",
      "Execution risk high — organising score (60) insufficient for the current roadmap scale.",
      "Creative and presentation strengths underutilised due to structural misalignment.",
    ],
    fitScore: 69,
    aiInsight: "Strong product intuition, but without clear mandate boundaries between CEO and CTO input, execution reliability will remain unpredictable.",
    competencies: [65, 74, 78, 72, 80, 60, 68, 62],
    strengths: ["Creating & Conceptualising", "Interacting & Presenting"],
    devAreas: ["Organising & Executing", "Leading & Deciding"],
  },
  {
    id: "casey-miller",
    name: "Casey Miller",
    title: "Head of Ops",
    risk: "LOW" as const,
    insightLabel: "Executional Anchor",
    bullets: [
      "Strong executional anchor. Low flight risk. Competency fit strong for current scope.",
      "Organising & Executing score (91) is the highest on the leadership team.",
      "Supporting & Cooperating at 82 — cross-functional alignment asset.",
    ],
    fitScore: 84,
    aiInsight: "Ops execution is the team's most reliable anchor — Casey's profile peaks in structured, efficiency-first environments.",
    competencies: [76, 82, 70, 78, 65, 91, 80, 72],
    strengths: ["Organising & Executing", "Supporting & Cooperating"],
    devAreas: ["Creating & Conceptualising"],
  },
  {
    id: "sam-parker",
    name: "Sam Parker",
    title: "Finance",
    risk: "MEDIUM" as const,
    insightLabel: "CFO Gap Emerging",
    bullets: [
      "Finance function operating reactively. No forward-looking model in place.",
      "CFO-level gap emerging as the company approaches Series B scale.",
      "Strong analytical depth (88) — scope expansion would be justified with additional support.",
    ],
    fitScore: 73,
    aiInsight: "Financial rigour is well-matched to the current mandate, but the absence of a forward-looking financial model is a material gap for growth-stage operations.",
    competencies: [65, 70, 60, 88, 62, 78, 74, 65],
    strengths: ["Analysing & Interpreting", "Organising & Executing"],
    devAreas: ["Interacting & Presenting", "Creating & Conceptualising"],
  },
  {
    id: "dana-reed",
    name: "Dana Reed",
    title: "People Ops",
    risk: "LOW" as const,
    insightLabel: "Infrastructure Lag",
    bullets: [
      "People infrastructure scaling behind headcount. No structured L&D or performance calibration cadence.",
      "Supporting & Cooperating at 84 — highest empathy score on the team.",
      "People function needs a structured framework before headcount doubles.",
    ],
    fitScore: 72,
    aiInsight: "Strong culture and empathy anchor — but the people infrastructure is scaling reactively and will require structural investment within the next quarter.",
    competencies: [68, 84, 72, 66, 65, 74, 78, 60],
    strengths: ["Supporting & Cooperating", "Adapting & Coping"],
    devAreas: ["Enterprising & Performing", "Creating & Conceptualising"],
  },
  {
    id: "jamie-carter",
    name: "Jamie Carter",
    title: "Growth Lead",
    risk: "MEDIUM" as const,
    insightLabel: "Underresourced",
    bullets: [
      "Growth function underresourced. Single contributor with no team support.",
      "High dependency on founder network for pipeline — not scalable post-Series A.",
      "Interacting & Presenting at 80 — commercial presence strong, execution infra weak.",
    ],
    fitScore: 70,
    aiInsight: "Commercial instincts and presentation strengths are present, but without team build-out, growth function output will remain founder-dependent.",
    competencies: [68, 65, 80, 62, 74, 60, 70, 78],
    strengths: ["Interacting & Presenting", "Enterprising & Performing"],
    devAreas: ["Organising & Executing", "Analysing & Interpreting"],
  },
  {
    id: "riley-johnson",
    name: "Riley Johnson",
    title: "CS Lead",
    risk: "HIGH" as const,
    insightLabel: "Retention Gap",
    bullets: [
      "Revenue retention accountability unclear. CS and Sales overlap on renewals.",
      "No defined handoff protocol — churn attribution is ambiguous.",
      "Supporting & Cooperating at 78 — strong with customers, but role clarity is the constraint.",
    ],
    fitScore: 66,
    aiInsight: "Interpersonal depth and customer empathy are genuine assets, but without a clear CS-to-Sales handoff protocol, revenue retention accountability remains diffuse.",
    competencies: [62, 78, 74, 65, 60, 68, 72, 58],
    strengths: ["Supporting & Cooperating", "Interacting & Presenting"],
    devAreas: ["Enterprising & Performing", "Creating & Conceptualising"],
  },
  {
    id: "avery-wilson",
    name: "Avery Wilson",
    title: "Sales Mgr",
    risk: "MEDIUM" as const,
    insightLabel: "Process Gap",
    bullets: [
      "Pipeline accountability diffuse. No formalized sales process in place.",
      "Quota attainment tracking is manual — no CRM discipline.",
      "Interacting & Presenting at 82 — strong relationship skills; execution framework is the gap.",
    ],
    fitScore: 67,
    aiInsight: "Commercial instincts are strong but sales pipeline discipline is absent — a formal CRM process and quota framework would materially improve output predictability.",
    competencies: [70, 62, 82, 58, 60, 64, 66, 80],
    strengths: ["Interacting & Presenting", "Enterprising & Performing"],
    devAreas: ["Analysing & Interpreting", "Creating & Conceptualising"],
  },
] as const;

type OrgMember = typeof ORG_MEMBERS[number];

const GREAT_8_LABELS = [
  "Leading & Deciding",
  "Supporting & Cooperating",
  "Interacting & Presenting",
  "Analysing & Interpreting",
  "Creating & Conceptualising",
  "Organising & Executing",
  "Adapting & Coping",
  "Enterprising & Performing",
] as const;

function competencyColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#f43f5e";
}

function fitGradient(score: number): string {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 70) return "from-amber-400 to-emerald-400";
  if (score >= 60) return "from-amber-500 to-amber-400";
  return "from-rose-500 to-amber-400";
}

function riskBorderClass(risk: "HIGH" | "MEDIUM" | "LOW"): string {
  if (risk === "HIGH") return "border-rose-500/60";
  if (risk === "MEDIUM") return "border-amber-400/50";
  return "border-emerald-500/40";
}

function riskDotClass(risk: "HIGH" | "MEDIUM" | "LOW"): string {
  if (risk === "HIGH") return "bg-rose-500";
  if (risk === "MEDIUM") return "bg-amber-400";
  return "bg-emerald-500";
}

function riskTextClass(risk: "HIGH" | "MEDIUM" | "LOW"): string {
  if (risk === "HIGH") return "text-rose-300";
  if (risk === "MEDIUM") return "text-amber-300";
  return "text-emerald-300";
}

// ─── Competency Panel (slide-in from right) ──────────────────────

function CompetencyPanel({
  member,
  onClose,
}: {
  member: OrgMember;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[440px] flex flex-col bg-[#0f1117] border-l border-white/10 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 border-b border-white/[0.08]">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">{member.name}</h3>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  member.risk === "HIGH"
                    ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                    : member.risk === "MEDIUM"
                    ? "bg-amber-400/15 border-amber-400/30 text-amber-300"
                    : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                }`}
              >
                {member.risk} RISK
              </span>
            </div>
            <p className="mt-0.5 text-sm text-zinc-400">{member.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Role Fit Score */}
        <div className="p-5 border-b border-white/[0.08]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-3">
            Overall Role Fit
          </p>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-5xl font-bold text-white leading-none">{member.fitScore}</span>
            <span className="text-lg text-zinc-500 mb-1">/100</span>
            <span
              className={`ml-auto text-sm font-semibold ${
                member.fitScore >= 80
                  ? "text-emerald-300"
                  : member.fitScore >= 70
                  ? "text-amber-300"
                  : "text-rose-300"
              }`}
            >
              {member.fitScore >= 80 ? "Strong Fit" : member.fitScore >= 70 ? "Moderate Fit" : "Fit Gap"}
            </span>
          </div>
          {/* Gradient bar */}
          <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${fitGradient(member.fitScore)} transition-all`}
              style={{ width: `${member.fitScore}%` }}
            />
          </div>
        </div>

        {/* Great 8 Breakdown */}
        <div className="p-5 border-b border-white/[0.08]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-4">
            Great 8 Competency Breakdown
          </p>
          <div className="space-y-3">
            {GREAT_8_LABELS.map((label, idx) => {
              const score = member.competencies[idx];
              const color = competencyColor(score);
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-zinc-400">{label}</span>
                    <span
                      className="text-[11px] font-semibold font-mono"
                      style={{ color }}
                    >
                      {score}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${score}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strength & Dev Tags */}
        <div className="p-5 border-b border-white/[0.08]">
          <div className="mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Strengths
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.strengths.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-medium text-emerald-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-2">
              Development Areas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.devAreas.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-amber-400/15 border border-amber-400/30 px-2.5 py-1 text-[10px] font-medium text-amber-300"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
            AI Insight
          </p>
          <p className="text-xs leading-relaxed text-zinc-300 italic">
            &ldquo;{member.aiInsight}&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Interactive Org Node ─────────────────────────────────────────

function InteractiveOrgNode({
  member,
  onHover,
  onLeave,
  onClick,
  isHovered,
}: {
  member: OrgMember;
  onHover: (id: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
  isHovered: boolean;
}) {
  return (
    <div
      className={`relative w-full rounded-lg border ${riskBorderClass(member.risk)} bg-[#0D0D10] cursor-pointer select-none transition-all duration-150 px-2.5 py-2 flex items-start gap-1.5 ${
        isHovered ? "bg-[#14141A] shadow-lg" : "hover:bg-[#111116]"
      }`}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(member.id)}
    >
      <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${riskDotClass(member.risk)}`} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-white truncate">{member.name}</p>
        <p className="text-[9px] text-zinc-500 truncate">{member.title}</p>
      </div>
    </div>
  );
}

// ─── Hover Tooltip ────────────────────────────────────────────────

function OrgTooltip({ member }: { member: OrgMember }) {
  return (
    <div
      className="absolute z-30 w-64 rounded-xl border bg-[#111318]/95 p-4 shadow-2xl backdrop-blur-md animate-fade-in pointer-events-none"
      style={{
        borderColor:
          member.risk === "HIGH"
            ? "rgba(244,63,94,0.35)"
            : member.risk === "MEDIUM"
            ? "rgba(251,191,36,0.35)"
            : "rgba(34,197,94,0.35)",
        left: "calc(100% + 10px)",
        top: "0",
      }}
    >
      <div className="mb-2">
        <p className="text-xs font-bold text-white">{member.name}</p>
        <p className="text-[10px] text-zinc-400">{member.title}</p>
      </div>
      <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${riskTextClass(member.risk)}`}>
        {member.insightLabel}
      </p>
      <ul className="space-y-1.5">
        {member.bullets.map((b) => (
          <li key={b} className="flex items-start gap-1.5">
            <span className={`mt-0.5 h-1 w-1 shrink-0 rounded-full ${riskDotClass(member.risk)}`} />
            <span className="text-[10px] leading-relaxed text-zinc-300">{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[9px] text-zinc-600 border-t border-white/[0.06] pt-2">
        Click to view full competency profile
      </p>
    </div>
  );
}

// ─── Section: Interactive Org Map ────────────────────────────────

function SectionInteractiveOrgMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const byId = (id: string) => ORG_MEMBERS.find((m) => m.id === id)!;

  const selectedMember = selectedId ? byId(selectedId) : null;

  const nodeProps = (id: string) => ({
    member: byId(id),
    onHover: setHoveredId,
    onLeave: () => setHoveredId(null),
    onClick: setSelectedId,
    isHovered: hoveredId === id,
  });

  return (
    <SectionWrap>
      <SectionHeading
        label="OrgLens AI · Interactive Org Map"
        title="Interactive Org Map"
      />

      {/* Legend */}
      <div className="mb-5 flex flex-wrap items-center gap-3 text-[10px]">
        <span className="text-zinc-500 font-medium">Risk level:</span>
        {(["HIGH", "MEDIUM", "LOW"] as const).map((r) => (
          <span key={r} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${riskDotClass(r)}`} />
            <span className={riskTextClass(r)}>{r}</span>
          </span>
        ))}
        <span className="ml-auto text-zinc-600 italic">Hover for insights · Click for competency profile</span>
      </div>

      {/* Org Chart */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 mb-6 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* CEO row */}
          <div className="flex justify-center mb-1">
            <div className="relative flex flex-col items-center" style={{ width: "18%" }}>
              <InteractiveOrgNode {...nodeProps("alex-morgan")} />
              {hoveredId === "alex-morgan" && (
                <OrgTooltip member={byId("alex-morgan")} />
              )}
            </div>
          </div>

          {/* V-line down */}
          <div className="mx-auto h-5 w-px bg-zinc-700" />

          {/* Horizontal bar + columns */}
          <div className="relative flex justify-between px-2">
            <div className="absolute left-[8%] right-[8%] top-0 h-px bg-zinc-700" />

            {/* Jordan Lee (CTO) + Morgan Chen */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("jordan-lee")} />
                {hoveredId === "jordan-lee" && (
                  <OrgTooltip member={byId("jordan-lee")} />
                )}
              </div>
              <div className="h-4 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("morgan-chen")} />
                {hoveredId === "morgan-chen" && (
                  <OrgTooltip member={byId("morgan-chen")} />
                )}
              </div>
            </div>

            {/* Taylor Brooks */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("taylor-brooks")} />
                {hoveredId === "taylor-brooks" && (
                  <OrgTooltip member={byId("taylor-brooks")} />
                )}
              </div>
            </div>

            {/* Casey Miller + Sam Parker + Dana Reed */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("casey-miller")} />
                {hoveredId === "casey-miller" && (
                  <OrgTooltip member={byId("casey-miller")} />
                )}
              </div>
              <div className="h-3 w-px bg-zinc-700" />
              <div className="flex gap-1 w-full">
                <div className="relative flex-1">
                  <div
                    className={`relative w-full rounded-lg border ${riskBorderClass(byId("sam-parker").risk)} bg-[#0D0D10] cursor-pointer px-1.5 py-1 flex items-start gap-1 transition-all hover:bg-[#111116]`}
                    onMouseEnter={() => setHoveredId("sam-parker")}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId("sam-parker")}
                  >
                    <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${riskDotClass(byId("sam-parker").risk)}`} />
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold text-white truncate">Sam P.</p>
                      <p className="text-[7px] text-zinc-500 truncate">Finance</p>
                    </div>
                    {hoveredId === "sam-parker" && (
                      <OrgTooltip member={byId("sam-parker")} />
                    )}
                  </div>
                </div>
                <div className="relative flex-1">
                  <div
                    className={`relative w-full rounded-lg border ${riskBorderClass(byId("dana-reed").risk)} bg-[#0D0D10] cursor-pointer px-1.5 py-1 flex items-start gap-1 transition-all hover:bg-[#111116]`}
                    onMouseEnter={() => setHoveredId("dana-reed")}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId("dana-reed")}
                  >
                    <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${riskDotClass(byId("dana-reed").risk)}`} />
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold text-white truncate">Dana R.</p>
                      <p className="text-[7px] text-zinc-500 truncate">People</p>
                    </div>
                    {hoveredId === "dana-reed" && (
                      <OrgTooltip member={byId("dana-reed")} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Jamie Carter */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("jamie-carter")} />
                {hoveredId === "jamie-carter" && (
                  <OrgTooltip member={byId("jamie-carter")} />
                )}
              </div>
            </div>

            {/* Riley Johnson */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("riley-johnson")} />
                {hoveredId === "riley-johnson" && (
                  <OrgTooltip member={byId("riley-johnson")} />
                )}
              </div>
            </div>

            {/* Avery Wilson */}
            <div className="flex flex-col items-center" style={{ width: "16%" }}>
              <div className="h-5 w-px bg-zinc-700" />
              <div className="relative w-full">
                <InteractiveOrgNode {...nodeProps("avery-wilson")} />
                {hoveredId === "avery-wilson" && (
                  <OrgTooltip member={byId("avery-wilson")} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "HIGH Risk", count: ORG_MEMBERS.filter((m) => m.risk === "HIGH").length, cls: "text-rose-300", bg: "bg-rose-500/[0.06] border-rose-500/20" },
          { label: "MEDIUM Risk", count: ORG_MEMBERS.filter((m) => m.risk === "MEDIUM").length, cls: "text-amber-300", bg: "bg-amber-400/[0.06] border-amber-400/20" },
          { label: "LOW Risk", count: ORG_MEMBERS.filter((m) => m.risk === "LOW").length, cls: "text-emerald-300", bg: "bg-emerald-500/[0.06] border-emerald-500/20" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl border ${stat.bg} p-4 text-center`}>
            <p className={`text-2xl font-bold font-mono ${stat.cls}`}>{stat.count}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Member list with fit scores */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Team Competency Summary — Click any row to view full profile
          </p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {ORG_MEMBERS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedId(m.id)}
              className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-white/[0.03] transition-colors group"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${riskDotClass(m.risk)}`} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white">{m.name}</p>
                <p className="text-[10px] text-zinc-500">{m.title}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${m.fitScore}%`,
                      backgroundColor: competencyColor(m.fitScore),
                    }}
                  />
                </div>
                <span
                  className="text-xs font-semibold font-mono w-10 text-right"
                  style={{ color: competencyColor(m.fitScore) }}
                >
                  {m.fitScore}
                </span>
                <span className={`text-[9px] font-semibold uppercase tracking-wider ${riskTextClass(m.risk)} hidden sm:block`}>
                  {m.risk}
                </span>
                <svg className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Competency panel */}
      {selectedMember && (
        <CompetencyPanel
          member={selectedMember}
          onClose={() => setSelectedId(null)}
        />
      )}
    </SectionWrap>
  );
}

// ─── Section router ───────────────────────────────────────────────

function renderSection(id: SectionId) {
  switch (id) {
    case "executive-summary":
      return <SectionExecutiveSummary />;
    case "orglens-risk-view":
      return <SectionOrgLensRiskView />;
    case "interactive-org-map":
      return <SectionInteractiveOrgMap />;
    case "org-health":
      return <SectionOrgHealth />;
    case "team-structure":
      return <SectionTeamStructure />;
    case "leadership-strengths":
      return <SectionLeadershipStrengths />;
    case "role-fit":
      return <SectionRoleFit />;
    case "ownership-gaps":
      return <SectionOwnershipGaps />;
    case "risk-signals":
      return <SectionRiskSignals />;
    case "recommended-actions":
      return <SectionRecommendedActions />;
    default:
      return <SectionExecutiveSummary />;
  }
}

// ─── Main Portal ──────────────────────────────────────────────────

export default function DemoPortal() {
  const [activeSection, setActiveSection] = useState<SectionId>("executive-summary");

  return (
    <div className="flex flex-col bg-[#0A0A0B] min-h-screen">
      {/* ── Report Header ── */}
      <div className="border-b border-[#1E1E24] bg-[#0A0A0B] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-inset ring-indigo-400/30">
              <Building2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-bold text-white">AtlasFlow Technologies</h1>
                <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[9px] font-medium text-zinc-500">
                  Demo · Fictional company
                </span>
              </div>
              <p className="mt-0.5 text-xs text-zinc-500">
                B2B SaaS · 42 Employees · Growth Stage
              </p>
              <p className="text-[11px] text-indigo-400 font-medium">
                OrgLens AI Organizational Intelligence Report
              </p>
            </div>
          </div>

          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400 transition-colors shrink-0"
          >
            Get your report — $49
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* ── Sidebar ── */}
        <aside className="sticky top-0 h-screen w-56 shrink-0 overflow-y-auto border-r border-[#1E1E24] bg-[#0A0A0B] flex flex-col hidden md:flex">
          <div className="px-3 py-4 border-b border-[#1E1E24]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Report Sections
            </p>
          </div>

          <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              const isRisk = item.id === "orglens-risk-view";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all text-left ${
                    active
                      ? isRisk
                        ? "bg-rose-500/15 text-rose-200 border border-rose-500/30"
                        : "bg-indigo-500/15 text-indigo-200 border border-indigo-500/30"
                      : "text-zinc-500 hover:bg-[#16161A] hover:text-white border border-transparent"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      active
                        ? isRisk
                          ? "text-rose-400"
                          : "text-indigo-400"
                        : "text-zinc-600"
                    }`}
                  />
                  <span className="leading-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-3 py-4 border-t border-[#1E1E24]">
            <a
              href={CHECKOUT_URL}
              className="block w-full rounded-lg bg-indigo-500 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-indigo-400 transition-colors"
            >
              Get your report — $49
            </a>
          </div>
        </aside>

        {/* ── Mobile nav ── */}
        <div className="md:hidden w-full border-b border-[#1E1E24] bg-[#0A0A0B] overflow-x-auto sticky top-0 z-10">
          <div className="flex px-2 py-2 gap-1 min-w-max">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              const isRisk = item.id === "orglens-risk-view";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-all ${
                    active
                      ? isRisk
                        ? "bg-rose-500/20 text-rose-200 border border-rose-500/30"
                        : "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                      : "text-zinc-500 hover:text-white border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Content ── */}
        <main className="flex-1 min-h-screen">
          {renderSection(activeSection)}

          {/* Bottom CTA */}
          <div className="mx-6 mb-10 mt-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/[0.08] to-transparent p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
              Want this for your team?
            </p>
            <p className="text-lg font-bold text-white mb-3">
              Get the full OrgLens analysis for your organization
            </p>
            <p className="text-sm text-zinc-400 mb-4">
              Upload your team data, get your report in minutes. No consultants.
              No waiting.
            </p>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
            >
              Get your report — $49
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
