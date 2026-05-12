"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";
import {
  BarChart2,
  GitBranch,
  AlertTriangle,
  Target,
  TrendingUp,
  Users,
  UserCheck,
  Network,
  Layers,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  Building2,
  AlertCircle,
  Table2,
} from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

// ─── Types ───────────────────────────────────────────────────────
type SectionId =
  | "executive-overview"
  | "traditional-org-chart"
  | "orglens-risk-view"
  | "founder-bottleneck"
  | "sales-execution-risk"
  | "leadership-coverage"
  | "role-fit-signals"
  | "ownership-gaps"
  | "team-risk-heatmap"
  | "scenario-comparison"
  | "next-actions"
  | "board-summary"
  | "responsible-ai";

// ─── Navigation ──────────────────────────────────────────────────
const NAV_ITEMS: { id: SectionId; label: string; icon: ElementType }[] =
  [
    { id: "executive-overview", label: "Executive Overview", icon: BarChart2 },
    {
      id: "traditional-org-chart",
      label: "Traditional Org Chart",
      icon: GitBranch,
    },
    {
      id: "orglens-risk-view",
      label: "OrgLens Risk View",
      icon: AlertTriangle,
    },
    { id: "founder-bottleneck", label: "Founder Bottleneck", icon: Target },
    {
      id: "sales-execution-risk",
      label: "Sales Execution Risk",
      icon: TrendingUp,
    },
    { id: "leadership-coverage", label: "Leadership Coverage", icon: Users },
    { id: "role-fit-signals", label: "Role-Fit Signals", icon: UserCheck },
    {
      id: "ownership-gaps",
      label: "Ownership & Reporting Gaps",
      icon: Network,
    },
    { id: "team-risk-heatmap", label: "Team Risk Heatmap", icon: Table2 },
    {
      id: "scenario-comparison",
      label: "Scenario Comparison",
      icon: Layers,
    },
    {
      id: "next-actions",
      label: "Recommended Next Actions",
      icon: CheckCircle2,
    },
    { id: "board-summary", label: "Board-Ready Summary", icon: FileText },
    { id: "responsible-ai", label: "Responsible AI Note", icon: ShieldCheck },
  ];

// ─── Shared helpers ──────────────────────────────────────────────

function SectionWrap({ children }: { children: React.ReactNode }) {
  return <div className="p-6 md:p-8 max-w-5xl">{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold tracking-tight text-white mb-6">
      {children}
    </h2>
  );
}

function InfoCard({
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
  const nameCls = tiny
    ? "text-[9px]"
    : large
      ? "text-sm"
      : "text-[11px]";
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

function RiskBadge({
  label,
  tone,
}: {
  label: string;
  tone: "red" | "amber";
}) {
  const cls =
    tone === "red"
      ? "bg-rose-500/20 border-rose-400/40 text-rose-200"
      : "bg-amber-500/20 border-amber-400/40 text-amber-200";
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[8px] font-semibold animate-pulse ${cls}`}
    >
      {tone === "red" ? "🔴" : "🟠"} {label}
    </span>
  );
}

function VLine({ h = 5 }: { h?: number }) {
  return (
    <div
      className="w-px bg-zinc-700 mx-auto"
      style={{ height: `${h * 4}px` }}
    />
  );
}

// ─── Org Tree (shared by sections 2+3) ───────────────────────────

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
        {/* CEO */}
        <div className="flex justify-center mb-1">
          <div className="flex flex-col items-center gap-1 w-44">
            <OrgNode
              name="Alex Morgan"
              title="Founder & CEO"
              tone={t("ceo")}
              large
            />
            {showRisks && (
              <RiskBadge label="Founder Bottleneck" tone="red" />
            )}
          </div>
        </div>
        <VLine h={5} />

        {/* L1 row */}
        <div className="relative">
          {/* horizontal connector bar */}
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-zinc-700" />

          <div className="flex justify-between">
            {/* CTO */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode name="Jordan Lee" title="CTO" tone={t("cto")} />
              {showRisks && (
                <RiskBadge label="Key-Person Dep." tone="red" />
              )}
              <VLine h={4} />
              <OrgNode name="Morgan Chen" title="Eng. Lead" />
            </div>

            {/* Product */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode name="Taylor Brooks" title="Head of Product" />
            </div>

            {/* Operations */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode
                name="Casey Miller"
                title="Head of Operations"
                tone={t("ops")}
              />
              {showRisks && (
                <RiskBadge label="Ownership Gap" tone="amber" />
              )}
              <VLine h={3} />
              <div className="flex gap-1 w-full">
                <OrgNode name="Sam Parker" title="Finance" tiny />
                <OrgNode name="Dana Reed" title="People Ops" tiny />
              </div>
            </div>

            {/* Growth */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode
                name="Jamie Carter"
                title="Growth Lead"
                tone={t("growth")}
              />
              {showRisks && (
                <RiskBadge label="Role Overlap" tone="amber" />
              )}
            </div>

            {/* Sales */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode
                name="Avery Wilson"
                title="Sales Manager"
                tone={t("sales")}
              />
              {showRisks && (
                <RiskBadge label="Sales Leadership Gap" tone="red" />
              )}
            </div>

            {/* CS */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ width: "16%" }}
            >
              <VLine h={5} />
              <OrgNode
                name="Riley Johnson"
                title="CS Lead"
                tone={t("cs")}
              />
              {showRisks && (
                <RiskBadge label="Handoff Risk" tone="amber" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 1: Executive Overview ───────────────────────────────

function SectionExecutiveOverview() {
  const risks = [
    { label: "Founder Bottleneck", tone: "red" as const },
    { label: "Sales Leadership Gap", tone: "red" as const },
    { label: "Key-Person Dependency", tone: "red" as const },
    { label: "Ownership Gap", tone: "amber" as const },
    { label: "Customer Handoff Risk", tone: "amber" as const },
    { label: "Role Overlap", tone: "amber" as const },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Executive Overview</SectionTitle>

      {/* Summary */}
      <InfoCard className="mb-6">
        <p className="text-sm leading-relaxed text-zinc-300">
          AtlasFlow Technologies is growing from founder-led execution into a
          more structured operating model. OrgLens identifies risks in founder
          dependency, sales ownership, leadership coverage, and role clarity
          before the next hiring or restructuring decision.
        </p>
      </InfoCard>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 mb-6">
        {/* Health score ring */}
        <InfoCard className="flex flex-col items-center justify-center text-center py-4">
          <div className="relative h-16 w-16 mb-2">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#1E1E24"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeDasharray={`${(62 / 100) * 163.4} 163.4`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-amber-300">
              62
            </span>
          </div>
          <p className="text-[10px] text-zinc-400">Org Health Score</p>
          <p className="text-[10px] text-zinc-500">out of 100</p>
        </InfoCard>

        <InfoCard className="flex flex-col items-center justify-center text-center py-4">
          <p className="font-mono text-2xl font-bold text-rose-400">6</p>
          <p className="mt-1 text-[11px] text-zinc-400">Risks Detected</p>
        </InfoCard>

        <InfoCard className="flex flex-col items-center justify-center text-center py-4">
          <p className="font-mono text-2xl font-bold text-rose-400">3</p>
          <p className="mt-1 text-[11px] text-zinc-400">Critical Risks</p>
        </InfoCard>

        <InfoCard className="col-span-2 flex flex-col justify-center py-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
            Recommended Priority
          </p>
          <p className="text-sm font-semibold text-indigo-300">
            Sales leadership clarity
          </p>
        </InfoCard>

        <InfoCard className="hidden lg:flex flex-col items-center justify-center text-center py-4">
          <p className="font-mono text-2xl font-bold text-white">42</p>
          <p className="mt-1 text-[11px] text-zinc-400">Team Size</p>
        </InfoCard>
      </div>

      {/* Top Risks */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-3">
        Top Risks Detected
      </p>
      <div className="flex flex-wrap gap-2">
        {risks.map((r) => {
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

// ─── Section 2: Traditional Org Chart ────────────────────────────

function SectionTraditionalOrgChart() {
  return (
    <SectionWrap>
      <SectionTitle>Traditional Org Chart</SectionTitle>
      <InfoCard className="mb-4">
        <OrgTree showRisks={false} />
      </InfoCard>
      <InfoCard className="border-zinc-700/50 bg-zinc-800/30">
        <p className="text-sm italic text-zinc-400">
          &ldquo;A traditional org chart shows reporting lines, but it does not
          reveal hidden execution risks, ownership gaps, or leadership coverage
          issues.&rdquo;
        </p>
      </InfoCard>
    </SectionWrap>
  );
}

// ─── Section 3: OrgLens Risk View ────────────────────────────────

function SectionOrgLensRiskView() {
  return (
    <SectionWrap>
      <SectionTitle>OrgLens Risk View</SectionTitle>
      <InfoCard className="mb-4 border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.04] to-transparent">
        <OrgTree showRisks={true} />
      </InfoCard>

      {/* Comparison table */}
      <div className="grid grid-cols-2 gap-3">
        <InfoCard>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Traditional View
          </p>
          <ul className="space-y-2">
            {[
              "Clean reporting lines",
              "Static snapshot",
              "No ownership signal",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
                {item}
              </li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard className="border-indigo-500/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            OrgLens Risk View
          </p>
          <ul className="space-y-2">
            {[
              "Same structure + risk intelligence",
              "Reveals hidden operating risk",
              "Surfaces decision gaps",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>
    </SectionWrap>
  );
}

// ─── Section 4: Founder Bottleneck ───────────────────────────────

function SectionFounderBottleneck() {
  const nodes = [
    "Product Decisions",
    "Sales Strategy",
    "Operations Escalations",
    "Hiring Decisions",
  ];

  return (
    <SectionWrap>
      <SectionTitle>Founder Bottleneck</SectionTitle>

      {/* Hub diagram */}
      <InfoCard className="mb-5">
        <div className="flex flex-col items-center gap-4 py-4">
          {/* Top */}
          <div className="flex flex-col items-center gap-1">
            <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-200">
              Product Decisions
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-amber-500/40" />
              <span className="text-amber-400 text-base leading-none">↓</span>
            </div>
          </div>

          {/* Middle row */}
          <div className="flex items-center gap-4">
            {/* Left */}
            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200">
                Sales Strategy
              </div>
              <div className="flex items-center gap-0.5">
                <div className="h-px w-8 bg-amber-500/40" />
                <span className="text-amber-400 text-base leading-none">
                  →
                </span>
              </div>
            </div>

            {/* CEO node */}
            <div className="rounded-xl border-2 border-rose-500 bg-rose-500/10 px-6 py-3 text-center shadow-[0_0_24px_-5px_rgba(239,68,68,0.5)]">
              <p className="font-bold text-white text-sm">Alex Morgan</p>
              <p className="text-xs text-rose-300">Founder &amp; CEO</p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <span className="text-amber-400 text-base leading-none">
                  ←
                </span>
                <div className="h-px w-8 bg-amber-500/40" />
              </div>
              <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200">
                Operations Escalations
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center">
              <span className="text-amber-400 text-base leading-none">↑</span>
              <div className="h-6 w-px bg-amber-500/40" />
            </div>
            <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-200">
              Hiring Decisions
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] text-zinc-500 mt-2">
          4 critical decision streams route through the founder
        </p>
      </InfoCard>

      {/* Insight */}
      <InfoCard className="mb-3 border-rose-500/30 bg-rose-500/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-300 mb-2">
          Risk Insight
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          Alex Morgan remains the decision node for product, sales, operations,
          and key hiring decisions. This creates scaling risk as AtlasFlow
          prepares for its next growth phase.
        </p>
      </InfoCard>

      {/* Action */}
      <InfoCard className="border-indigo-500/30 bg-indigo-500/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 mb-2">
          Recommended Action
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          Move decision rights into functional leadership before adding more
          headcount.
        </p>
      </InfoCard>
    </SectionWrap>
  );
}

// ─── Section 5: Sales Execution Risk ─────────────────────────────

function SectionSalesExecutionRisk() {
  const flowNodes = [
    { label: "Founder", sub: "Strategic sales", badge: "High Risk", tone: "red" as const },
    { label: "Growth Lead", sub: "Jamie Carter · Pipeline", badge: "Overlap", tone: "amber" as const },
    { label: "Sales Manager", sub: "Avery Wilson · Execution", badge: "Gap", tone: "amber" as const },
    { label: "Customer Success", sub: "Riley Johnson · Post-sale", badge: "Handoff", tone: "amber" as const },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Sales Execution Risk</SectionTitle>

      {/* Alert banner */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
        <p className="text-sm font-semibold text-rose-200">
          ⚠ Critical Risk: Revenue ownership is unclear across 3 roles
        </p>
      </div>

      {/* Flow diagram */}
      <InfoCard className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Revenue Chain — No Clear Owner
        </p>
        <div className="flex flex-wrap items-start gap-0">
          {flowNodes.map((n, i) => {
            const badgeCls =
              n.tone === "red"
                ? "bg-rose-500/20 border-rose-400/40 text-rose-200"
                : "bg-amber-500/20 border-amber-400/40 text-amber-200";
            return (
              <div key={n.label} className="flex items-center">
                <div className="flex flex-col items-center text-center w-28">
                  <div
                    className={`w-full rounded-lg border ${n.tone === "red" ? "border-rose-500/40" : "border-amber-400/30"} bg-[#0A0A0B] px-2 py-2`}
                  >
                    <p className="text-xs font-semibold text-white">
                      {n.label}
                    </p>
                    <p className="text-[9px] text-zinc-400 mt-0.5">{n.sub}</p>
                  </div>
                  <span
                    className={`mt-1.5 inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] font-semibold ${badgeCls}`}
                  >
                    {n.badge}
                  </span>
                </div>
                {i < flowNodes.length - 1 && (
                  <div className="flex flex-col items-center px-1">
                    <span className="text-rose-400 text-lg">→</span>
                    <span className="text-[7px] text-rose-400 text-center leading-tight whitespace-nowrap">
                      No owner
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </InfoCard>

      {/* Risk statement */}
      <InfoCard className="mb-3 border-rose-500/30 bg-rose-500/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-300 mb-2">
          Risk Statement
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          The founder is still driving strategic sales decisions, while the
          Growth Lead and Sales Manager split pipeline ownership without clear
          leadership coverage. This creates risk as AtlasFlow prepares to scale
          revenue.
        </p>
      </InfoCard>

      {/* Action */}
      <InfoCard className="border-indigo-500/30 bg-indigo-500/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 mb-2">
          Recommended Action
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          Clarify sales ownership and leadership coverage before hiring
          additional sales roles or expanding pipeline targets.
        </p>
      </InfoCard>
    </SectionWrap>
  );
}

// ─── Section 6: Leadership Coverage ──────────────────────────────

function SectionLeadershipCoverage() {
  const functions = [
    {
      fn: "Engineering",
      coverage: "Strong",
      risk: "Key-person dependency risk",
      tone: "red" as const,
    },
    {
      fn: "Product",
      coverage: "Moderate",
      risk: "Prioritization tension with Engineering",
      tone: "amber" as const,
    },
    {
      fn: "Operations",
      coverage: "Moderate",
      risk: "Unclear ownership",
      tone: "amber" as const,
    },
    {
      fn: "Sales / Growth",
      coverage: "Weak",
      risk: "No clear revenue leader",
      tone: "red" as const,
    },
    {
      fn: "Customer Success",
      coverage: "Moderate",
      risk: "Handoff ambiguity",
      tone: "amber" as const,
    },
    {
      fn: "People / Finance",
      coverage: "Early",
      risk: "Limited strategic capacity",
      tone: "yellow" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Leadership Coverage</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {functions.map((f) => {
          const borderLeft =
            f.tone === "red"
              ? "border-l-rose-500"
              : f.tone === "amber"
                ? "border-l-amber-400"
                : "border-l-yellow-400";
          const coverageCls =
            f.coverage === "Strong"
              ? "bg-emerald-500/20 text-emerald-300"
              : f.coverage === "Moderate"
                ? "bg-amber-500/20 text-amber-300"
                : f.coverage === "Weak"
                  ? "bg-rose-500/20 text-rose-300"
                  : "bg-zinc-500/20 text-zinc-300";
          const riskDot =
            f.tone === "red"
              ? "🔴"
              : f.tone === "amber"
                ? "🟠"
                : "🟡";

          return (
            <div
              key={f.fn}
              className={`rounded-xl border-l-4 border border-[#1E1E24] bg-[#0F0F12] p-4 ${borderLeft}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{f.fn}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${coverageCls}`}
                >
                  {f.coverage}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {riskDot} {f.risk}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section 7: Role-Fit Signals ─────────────────────────────────

function SectionRoleFitSignals() {
  const cards = [
    {
      name: "Jordan Lee",
      title: "CTO",
      signal: "Strong technical fit",
      gap: "Key-person dependency — single point of failure in engineering leadership",
      gapTone: "red" as const,
    },
    {
      name: "Taylor Brooks",
      title: "Head of Product",
      signal: "Strong product ownership capability",
      gap: "Needs clearer decision rights vs. Engineering",
      gapTone: "amber" as const,
    },
    {
      name: "Jamie Carter",
      title: "Growth Lead",
      signal: "Growth capability present",
      gap: "Role overlaps significantly with Sales — ownership boundary unclear",
      gapTone: "amber" as const,
    },
    {
      name: "Avery Wilson",
      title: "Sales Manager",
      signal: "Sales execution capability present",
      gap: "Lacks clear leadership structure above — no VP-level accountability",
      gapTone: "amber" as const,
    },
    {
      name: "Riley Johnson",
      title: "Customer Success Lead",
      signal: "Post-sale relationship ownership",
      gap: "Role affected by unclear handoff from Sales",
      gapTone: "amber" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Role-Fit Signals</SectionTitle>

      {/* Disclaimer */}
      <div className="mb-5 rounded-xl border border-zinc-700/50 bg-zinc-800/30 px-4 py-3">
        <p className="text-xs text-zinc-400">
          <span className="font-semibold text-zinc-300">Note:</span> Role-fit
          signals are decision-support inputs, not employment decisions. OrgLens
          does not evaluate employees for hiring or firing.
        </p>
      </div>

      <div className="space-y-3">
        {cards.map((c) => (
          <InfoCard key={c.name}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <span className="text-[10px] text-zinc-500">·</span>
                  <p className="text-[11px] text-zinc-400">{c.title}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                    ✓ Signal: {c.signal}
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
              </div>
            </div>
          </InfoCard>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── Section 8: Ownership & Reporting Gaps ───────────────────────

function SectionOwnershipGaps() {
  const gaps = [
    {
      title: "Sales Ownership Gap",
      body: "Growth Lead and Sales Manager share pipeline responsibility without a clear revenue leader above them.",
      tone: "red" as const,
    },
    {
      title: "Customer Handoff Gap",
      body: "No defined handoff protocol between Sales (Avery Wilson) and Customer Success (Riley Johnson) — creates post-sale relationship risk.",
      tone: "amber" as const,
    },
    {
      title: "Operations Accountability Gap",
      body: "Head of Operations carries cross-functional issues without clear escalation paths or decision authority boundaries.",
      tone: "amber" as const,
    },
    {
      title: "Founder Escalation Gap",
      body: "Multiple functions still escalate to the Founder as the default decision-maker — compresses the founder's capacity for strategic work.",
      tone: "red" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Ownership &amp; Reporting Gaps</SectionTitle>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {gaps.map((g) => {
          const borderCls =
            g.tone === "red"
              ? "border-rose-500/30"
              : "border-amber-400/30";
          const badgeCls =
            g.tone === "red"
              ? "bg-rose-500/20 text-rose-300"
              : "bg-amber-500/20 text-amber-300";
          const emoji = g.tone === "red" ? "🔴" : "🟠";

          return (
            <div
              key={g.title}
              className={`rounded-xl border ${borderCls} bg-[#0F0F12] p-5`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-base">{emoji}</span>
                <p className="text-sm font-semibold text-white">{g.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">{g.body}</p>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section 9: Team Risk Heatmap ────────────────────────────────

function SectionTeamRiskHeatmap() {
  const rows = [
    {
      area: "Founder Dependency",
      severity: "High",
      impact: "High",
      urgency: "Immediate",
      rowTone: "critical",
    },
    {
      area: "Sales Ownership",
      severity: "High",
      impact: "High",
      urgency: "Immediate",
      rowTone: "critical",
    },
    {
      area: "Leadership Coverage",
      severity: "Medium",
      impact: "High",
      urgency: "Near-term",
      rowTone: "high",
    },
    {
      area: "Role Clarity",
      severity: "Medium",
      impact: "Medium",
      urgency: "Near-term",
      rowTone: "medium",
    },
    {
      area: "Customer Handoff",
      severity: "Medium",
      impact: "Medium",
      urgency: "Near-term",
      rowTone: "medium",
    },
    {
      area: "Key-Person Dependency",
      severity: "High",
      impact: "Medium",
      urgency: "Near-term",
      rowTone: "high",
    },
    {
      area: "Hiring Readiness",
      severity: "Medium",
      impact: "High",
      urgency: "Before next hire",
      rowTone: "medium",
    },
  ];

  const cellBg = (val: string) => {
    if (val === "High" || val === "Immediate")
      return "bg-rose-500/30 text-rose-200";
    if (val === "Medium" || val === "Near-term")
      return "bg-amber-500/20 text-amber-200";
    if (val === "Before next hire") return "bg-yellow-500/15 text-yellow-200";
    return "text-zinc-300";
  };

  return (
    <SectionWrap>
      <SectionTitle>Team Risk Heatmap</SectionTitle>
      <InfoCard className="overflow-x-auto mb-4">
        <table className="w-full text-xs min-w-[480px]">
          <thead>
            <tr>
              <th className="text-left px-3 py-2 text-zinc-500 font-medium">
                Risk Area
              </th>
              <th className="px-3 py-2 text-zinc-500 font-medium">Severity</th>
              <th className="px-3 py-2 text-zinc-500 font-medium">
                Business Impact
              </th>
              <th className="px-3 py-2 text-zinc-500 font-medium">Urgency</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.area}
                className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
              >
                <td className="px-3 py-2.5 font-medium text-white">
                  {r.area}
                </td>
                <td className={`px-3 py-2.5 text-center rounded-sm`}>
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.severity)}`}
                  >
                    {r.severity}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.impact)}`}
                  >
                    {r.impact}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${cellBg(r.urgency)}`}
                  >
                    {r.urgency}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfoCard>
      <p className="text-xs text-zinc-500">
        Areas marked <span className="text-rose-400 font-medium">Immediate</span>{" "}
        require action before the next hiring or restructuring decision.
      </p>
    </SectionWrap>
  );
}

// ─── Section 10: Scenario Comparison ─────────────────────────────

function SectionScenarioComparison() {
  const scenarios = [
    {
      title: "Lean Team",
      tag: null,
      desc: "Keep current structure but clarify decision rights and ownership.",
      benefits: [
        "Low cost, fast to implement",
        "Preserves current headcount",
      ],
      risks: [
        "Does not solve sales leadership gap",
        "Founder dependency persists",
      ],
      bestFor: "Companies not ready for new hires",
      highlighted: false,
    },
    {
      title: "Balanced Growth",
      tag: "⭐ Recommended",
      desc: "Add sales leadership, clarify customer handoff, and reduce founder dependency.",
      benefits: [
        "Addresses critical risks",
        "Improves execution clarity",
      ],
      risks: [
        "Requires one senior hire (VP Sales / Revenue Lead)",
      ],
      bestFor: "AtlasFlow at current stage — 42 employees, pre-next-round",
      highlighted: true,
    },
    {
      title: "AI-Native Operating Model",
      tag: null,
      desc: "Use AI-enabled workflows to reduce coordination drag while redesigning roles around higher-value decisions.",
      benefits: [
        "Modernizes operating model",
        "Reduces coordination overhead",
      ],
      risks: [
        "Requires change management, team buy-in, and tooling investment",
      ],
      bestFor: "Companies prepared for structural redesign alongside hiring",
      highlighted: false,
    },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Scenario Comparison</SectionTitle>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {scenarios.map((s) => (
          <div
            key={s.title}
            className={`rounded-xl border p-5 flex flex-col ${
              s.highlighted
                ? "border-indigo-500/50 bg-indigo-500/[0.06] shadow-[0_0_30px_-10px_rgba(99,102,241,0.4)]"
                : "border-[#1E1E24] bg-[#0F0F12]"
            }`}
          >
            {s.tag && (
              <span className="mb-2 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-200">
                {s.tag}
              </span>
            )}
            <p
              className={`text-sm font-bold mb-2 ${s.highlighted ? "text-indigo-200" : "text-white"}`}
            >
              {s.title}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-1">
              {s.desc}
            </p>

            <div className="space-y-2 text-xs">
              <div>
                <p className="text-[10px] font-semibold text-emerald-400 mb-1">
                  Benefits
                </p>
                <ul className="space-y-0.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="text-zinc-400 flex gap-1.5">
                      <span className="text-emerald-500">+</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-rose-400 mb-1">
                  Risks
                </p>
                <ul className="space-y-0.5">
                  {s.risks.map((r) => (
                    <li key={r} className="text-zinc-400 flex gap-1.5">
                      <span className="text-rose-400">−</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 mb-0.5">
                  Best for
                </p>
                <p className="text-zinc-400">{s.bestFor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

// ─── Section 11: Recommended Next Actions ────────────────────────

function SectionNextActions() {
  const actions = [
    {
      num: 1,
      title: "Define a VP of Sales or Revenue Lead",
      priority: "Critical",
      owner: "CEO",
      impact: "Closes largest org risk",
      urgency: "Before next hire",
      tone: "red" as const,
    },
    {
      num: 2,
      title: "Reduce founder involvement in sales decisions",
      priority: "Critical",
      owner: "CEO + new Sales Lead",
      impact: "Frees founder capacity",
      urgency: "Immediate",
      tone: "red" as const,
    },
    {
      num: 3,
      title: "Clarify Growth vs Sales ownership",
      priority: "High",
      owner: "CEO + Jamie Carter + Avery Wilson",
      impact: "Reduces pipeline confusion",
      urgency: "Near-term",
      tone: "amber" as const,
    },
    {
      num: 4,
      title: "Clarify Customer Success reporting and handoff",
      priority: "High",
      owner: "Head of Operations + Riley Johnson",
      impact: "Reduces post-sale churn risk",
      urgency: "Near-term",
      tone: "amber" as const,
    },
    {
      num: 5,
      title: "Create technical deputy under CTO",
      priority: "Medium",
      owner: "Jordan Lee",
      impact: "Reduces key-person dependency",
      urgency: "Before Series A",
      tone: "yellow" as const,
    },
  ];

  return (
    <SectionWrap>
      <SectionTitle>Recommended Next Actions</SectionTitle>
      <div className="space-y-3">
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
            <InfoCard key={a.num} className="flex items-start gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${numBg}`}
              >
                {String(a.num).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-2">
                  {a.title}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-4">
                  <div>
                    <span className="text-zinc-500">Priority </span>
                    <span className={`font-medium ${priorityCls}`}>
                      {a.priority}
                    </span>
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
            </InfoCard>
          );
        })}
      </div>
    </SectionWrap>
  );
}

// ─── Section 12: Board-Ready Summary ─────────────────────────────

function SectionBoardSummary() {
  return (
    <SectionWrap>
      <SectionTitle>Board-Ready Summary</SectionTitle>

      <InfoCard className="mb-5 border-indigo-500/20">
        <blockquote className="border-l-2 border-indigo-500 pl-4">
          <p className="text-sm leading-relaxed text-zinc-300 italic">
            &ldquo;AtlasFlow is ready for growth, but its operating model has
            not fully caught up with its team size. The largest risks are
            founder dependency, unclear sales ownership, and limited leadership
            coverage. Before adding more headcount, the company should clarify
            revenue ownership, move decision rights out of the founder role, and
            strengthen leadership coverage across Sales, Customer Success, and
            Operations.&rdquo;
          </p>
        </blockquote>
      </InfoCard>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400 mb-3">
            Top 3 Risks
          </p>
          <ol className="space-y-2">
            {[
              "Founder Dependency (Critical)",
              "Sales Ownership Gap (Critical)",
              "Leadership Coverage — Sales/Revenue (Critical)",
            ].map((item, i) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="text-rose-400 font-mono text-xs shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                {item}
              </li>
            ))}
          </ol>
        </InfoCard>

        <InfoCard>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            Top 3 Recommended Actions
          </p>
          <ol className="space-y-2">
            {[
              "Hire VP of Sales / Revenue Lead",
              "Move sales decision rights to functional leadership",
              "Define CS handoff process",
            ].map((item, i) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="text-indigo-400 font-mono text-xs shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                {item}
              </li>
            ))}
          </ol>
        </InfoCard>

        <InfoCard>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Suggested Next Hire
          </p>
          <p className="text-sm text-zinc-300">
            VP of Sales or Head of Revenue — before additional individual
            contributor hires
          </p>
        </InfoCard>

        <InfoCard>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-2">
            90-Day Focus
          </p>
          <p className="text-sm text-zinc-300">
            Clarify revenue ownership → Reduce founder escalation → Strengthen
            Sales + CS handoff
          </p>
        </InfoCard>
      </div>
    </SectionWrap>
  );
}

// ─── Section 13: Responsible AI Note ─────────────────────────────

function SectionResponsibleAI() {
  return (
    <SectionWrap>
      <SectionTitle>Responsible AI Note</SectionTitle>
      <InfoCard className="border-zinc-700/50 bg-zinc-800/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 shrink-0 text-zinc-400 mt-0.5" />
          <div>
            <p className="text-sm leading-relaxed text-zinc-300 mb-3">
              OrgLens is a decision-support tool. It does not make hiring,
              firing, promotion, compensation, or other employment decisions.
              Reports are designed to help leaders structure better conversations
              and review organizational risk with human judgment.
            </p>
            <Link
              href="/legal/responsible-ai"
              className="inline-flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
            >
              Learn more about Responsible AI
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </InfoCard>
    </SectionWrap>
  );
}

// ─── Section router ───────────────────────────────────────────────

function renderSection(id: SectionId) {
  switch (id) {
    case "executive-overview":
      return <SectionExecutiveOverview />;
    case "traditional-org-chart":
      return <SectionTraditionalOrgChart />;
    case "orglens-risk-view":
      return <SectionOrgLensRiskView />;
    case "founder-bottleneck":
      return <SectionFounderBottleneck />;
    case "sales-execution-risk":
      return <SectionSalesExecutionRisk />;
    case "leadership-coverage":
      return <SectionLeadershipCoverage />;
    case "role-fit-signals":
      return <SectionRoleFitSignals />;
    case "ownership-gaps":
      return <SectionOwnershipGaps />;
    case "team-risk-heatmap":
      return <SectionTeamRiskHeatmap />;
    case "scenario-comparison":
      return <SectionScenarioComparison />;
    case "next-actions":
      return <SectionNextActions />;
    case "board-summary":
      return <SectionBoardSummary />;
    case "responsible-ai":
      return <SectionResponsibleAI />;
    default:
      return <SectionExecutiveOverview />;
  }
}

// ─── Main Portal ──────────────────────────────────────────────────

export default function DemoPortal() {
  const [activeSection, setActiveSection] = useState<SectionId>(
    "executive-overview"
  );

  return (
    <div className="flex flex-col bg-[#0A0A0B]">
      {/* ── Demo Top Header ── */}
      <div className="border-b border-[#1E1E24] bg-[#0A0A0B] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            {/* Logo placeholder */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 ring-1 ring-inset ring-indigo-400/30">
              <Building2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm font-bold text-white">
                  AtlasFlow Technologies
                </h1>
                <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[9px] font-medium text-zinc-400">
                  Demo · Fictional company · No real data
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                Fictional B2B SaaS Company · 42 Employees · Growth Stage
              </p>
              <p className="text-[10px] text-indigo-400 font-medium">
                OrgLens Organizational Intelligence Report
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-400 transition-colors"
            >
              Get Founder Snapshot
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors border border-zinc-700 rounded-lg hover:border-zinc-600"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="flex min-h-screen items-start">
        {/* ── Sidebar ── */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-[#1E1E24] bg-[#0F0F12] flex flex-col">
          {/* Company identity */}
          <div className="px-4 py-4 border-b border-[#1E1E24]">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 ring-1 ring-inset ring-indigo-400/30">
                <Building2 className="h-4 w-4 text-indigo-400" />
              </div>
              <p className="text-xs font-semibold text-white">AtlasFlow</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 text-[9px] font-medium text-emerald-300">
                42 employees
              </span>
              <span className="rounded-full bg-zinc-700/50 px-2 py-0.5 text-[9px] text-zinc-400">
                Growth Stage
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all text-left ${
                    active
                      ? "bg-indigo-500/15 text-indigo-200 border border-indigo-500/30"
                      : "text-zinc-400 hover:bg-[#16161A] hover:text-white border border-transparent"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${active ? "text-indigo-400" : "text-zinc-500"}`}
                  />
                  <span className="leading-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar bottom CTA */}
          <div className="px-3 py-4 border-t border-[#1E1E24] space-y-2">
            <a
              href={CHECKOUT_URL}
              className="block w-full rounded-lg bg-indigo-500 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-indigo-400 transition-colors"
            >
              Get Founder Snapshot — $49
            </a>
            <Link
              href="/pricing"
              className="block w-full rounded-lg border border-zinc-700 px-3 py-2 text-center text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-h-screen">
          {/* Active section */}
          {renderSection(activeSection)}

          {/* Bottom CTA */}
          <div className="mx-6 mb-8 mt-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/[0.08] to-transparent p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              Want this report for your team?
            </p>
            <p className="text-lg font-bold text-white mb-4">
              Get the full OrgLens analysis for your actual organization
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CHECKOUT_URL}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
              >
                Get Founder Snapshot
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
