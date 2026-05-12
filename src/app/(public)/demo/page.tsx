import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Map as MapIcon,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  UserCog,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import DemoTabs from "./DemoTabs";

export const metadata: Metadata = {
  title: "OrgLens AI Demo Report | SaaS Org Chart and Team Risk Example",
  description:
    "Explore the public OrgLens AI demo report for AtlasFlow Technologies, a fictional B2B SaaS company. See org chart risk markers, role-fit signals, leadership coverage, sales execution risk, and recommendations.",
  // no robots noindex — allow indexing
};

const CHECKOUT_URL =
  "https://madethis.com/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

/* ─────────────────────────────────────────── */
/* PAGE                                        */
/* ─────────────────────────────────────────── */

export default function DemoPage() {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0B]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[560px]">
        <div className="absolute left-1/2 top-0 h-[440px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/[0.09] blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6">
        {/* ── A. HERO ────────────────────────────────── */}
        <section>
          {/* Demo badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-indigo-200">
              <Sparkles className="h-3 w-3" />
              Public Demo · No login required
            </span>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              AtlasFlow Technologies
            </h1>
            <p className="mt-2 text-lg font-medium text-indigo-300">
              OrgLens AI Org Intelligence Report
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-indigo-400/20 bg-indigo-500/[0.05] px-4 py-3 text-center text-xs text-zinc-400">
            <span className="font-semibold text-indigo-300">
              Fictional demo company.
            </span>{" "}
            This is a fictional demo company. No real employee or company data
            is shown.
          </div>

          {/* Company description */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-400 sm:text-base">
            AtlasFlow Technologies is a fictional B2B SaaS company with 42
            employees. The company is growing from founder-led sales and product
            decisions into a more structured operating model. The leadership team
            wants to clarify ownership, reduce founder dependency, strengthen
            sales leadership, and understand whether the current org structure is
            ready for the next stage of growth.
          </p>

          {/* Stats row */}
          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Employees
              </p>
              <p className="mt-1 font-mono text-xl font-bold text-white">42</p>
            </div>
            <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Type
              </p>
              <p className="mt-1 text-sm font-semibold text-white">B2B SaaS</p>
            </div>
            <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Stage
              </p>
              <p className="mt-1 text-sm font-semibold text-white">Growth</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              Get Founder Snapshot
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              View Pricing
            </Link>
          </div>
        </section>

        {/* ── B. ORG CHART COMPARISON ─────────────────── */}
        <section className="mt-20">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Org chart comparison
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What the traditional view misses
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left: Traditional View */}
            <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5">
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Traditional View
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Normal reporting lines. Clean but static. Does not show hidden
                  risks.
                </p>
              </div>
              <OrgChartPanel showRisks={false} />
            </div>

            {/* Right: OrgLens Risk View */}
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.05] to-[#0F0F12] p-5 shadow-[0_0_40px_-15px_rgba(99,102,241,0.4)]">
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                  OrgLens Risk View
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Same structure. Risk markers revealed.
                </p>
              </div>
              <OrgChartPanel showRisks />
            </div>
          </div>
        </section>

        {/* ── C. SALES CHALLENGE ──────────────────────── */}
        <section className="mt-16">
          <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-500/[0.07] to-[#0F0F12] p-6 md:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-400/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <span className="inline-flex items-center rounded-full border border-rose-400/40 bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-rose-200">
                  Critical · Sales Execution Risk
                </span>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Sales execution risk detected
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  The founder is still driving strategic sales decisions, while
                  the Growth Lead and Sales Manager split pipeline ownership
                  without clear leadership coverage. This creates risk as
                  AtlasFlow prepares to scale revenue.
                </p>
                <div className="mt-4 rounded-xl border border-indigo-400/30 bg-indigo-500/[0.08] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
                    Recommendation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                    Clarify sales ownership and leadership coverage before hiring
                    additional sales roles or expanding pipeline targets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── D. MULTI-PERSPECTIVE TABS ───────────────── */}
        <DemoTabs />

        {/* ── E. RISK SUMMARY ─────────────────────────── */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Risk summary
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              AtlasFlow org health at a glance
            </h2>
          </div>

          <div className="mt-10 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
            {/* Health score */}
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Overall Org Health
                </p>
                <p className="mt-1 font-mono text-5xl font-bold text-indigo-300">
                  62
                </p>
                <p className="mt-1 text-sm text-zinc-500">out of 100</p>
              </div>
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-indigo-400"
                    style={{ width: "62%" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-zinc-500">
                  <span>Critical</span>
                  <span>62 / 100</span>
                  <span>Healthy</span>
                </div>
              </div>
            </div>

            {/* Risk counts */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-white">6</p>
                <p className="mt-1 text-sm text-zinc-400">Risks detected</p>
              </div>
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.04] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-rose-300">3</p>
                <p className="mt-1 text-sm text-rose-200">Critical risks</p>
                <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
                  Founder Bottleneck · Sales Leadership Gap · Key-Person
                  Dependency
                </p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4 text-center">
                <p className="font-mono text-3xl font-bold text-amber-300">3</p>
                <p className="mt-1 text-sm text-amber-200">Moderate risks</p>
                <p className="mt-2 text-[10px] leading-relaxed text-zinc-500">
                  Ownership Gap · Role Overlap · Customer Handoff Risk
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── F. RECOMMENDATIONS ──────────────────────── */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Recommended actions
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Top 3 things AtlasFlow should do next
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                num: "01",
                title: "Define a VP of Sales or Revenue Lead",
                body: "Define a VP of Sales or Revenue Lead to own full-funnel pipeline. Currently split between Growth and Sales with no clear ownership.",
              },
              {
                num: "02",
                title: "Reduce founder involvement in sales",
                body: "Reduce founder involvement in sales decisions. Alex Morgan is a decision bottleneck — structured handoff will accelerate deal velocity.",
              },
              {
                num: "03",
                title: "Clarify the Customer Success reporting line",
                body: "Clarify the Customer Success reporting line. Riley Johnson should align to the sales/revenue motion, not Operations.",
              },
            ].map((r) => (
              <div
                key={r.num}
                className="flex items-start gap-4 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5 md:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-400/40 bg-indigo-500/15 font-mono text-sm font-bold text-indigo-200">
                  {r.num}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{r.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {r.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── G. DECISION REPORT PREVIEW ──────────────── */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.10] to-[#0F0F12] p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Full report
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              What&rsquo;s included in a full OrgLens report
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              Get all of this for your actual team — built from your data,
              delivered fast.
            </p>

            <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {[
                { icon: Network, label: "Competency org map with risk heatmap" },
                { icon: Target, label: "Role-fit scores for all leadership positions" },
                { icon: TrendingUp, label: "Scenario comparison (Lean / Balanced / AI-Native)" },
                { icon: UserCog, label: "Founder bottleneck diagnosis" },
                { icon: Users, label: "Key-person dependency map" },
                { icon: CheckCircle2, label: "Recommended next hire priority" },
                { icon: FileText, label: "Executive memo (board-ready)" },
                { icon: BookOpen, label: "90-day action plan" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-500/[0.05] px-4 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-indigo-400" />
                    <p className="text-sm text-zinc-200">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <a
                href={CHECKOUT_URL}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
              >
                Get Founder Snapshot — $49
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── H. NEWSLETTER / CONTACT ─────────────────── */}
        <section className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Monthly Insights
            </h3>
            <p className="mt-1.5 text-sm text-zinc-400">
              Org design, founder bottlenecks, and leadership coverage — once a
              month, no noise.
            </p>
            <Link
              href="/newsletter"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Subscribe to Monthly Insights
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Talk to us
            </h3>
            <p className="mt-1.5 text-sm text-zinc-400">
              Questions about OrgLens or your team&rsquo;s situation? We read
              every message.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Responsible AI note */}
        <div className="mt-12 rounded-xl border border-[#1E1E24] bg-[#0F0F12]/60 p-4 text-center">
          <p className="text-xs leading-relaxed text-zinc-500">
            OrgLens is a decision-support tool. It does not make hiring,
            firing, promotion, compensation, or other employment decisions.{" "}
            <Link
              href="/legal/responsible-ai"
              className="text-zinc-400 underline-offset-2 hover:text-indigo-300 hover:underline"
            >
              Learn more about Responsible AI
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* ORG CHART PANEL                             */
/* ─────────────────────────────────────────── */

type NodeTone = "neutral" | "amber" | "red";

function OrgNode({
  name,
  role,
  tone = "neutral",
  large,
}: {
  name: string;
  role: string;
  tone?: NodeTone;
  large?: boolean;
}) {
  const dotColor =
    tone === "red"
      ? "bg-rose-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-emerald-500";

  const borderColor =
    tone === "red"
      ? "border-rose-500/30"
      : tone === "amber"
        ? "border-amber-400/20"
        : "border-[#1E1E24]";

  return (
    <div
      className={`flex w-full items-center gap-2 rounded-lg border ${borderColor} bg-[#0A0A0B] ${
        large ? "px-3 py-2" : "px-2 py-1.5"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
      />
      <div className="min-w-0">
        <p
          className={`truncate font-medium text-white ${
            large ? "text-[11px]" : "text-[9px]"
          }`}
        >
          {name}
        </p>
        <p className="truncate text-[8px] text-zinc-500">{role}</p>
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
      ? "border-rose-400/50 bg-rose-500/20 text-rose-200"
      : "border-amber-400/50 bg-amber-500/20 text-amber-200";

  return (
    <span
      className={`inline-flex animate-pulse items-center rounded-full border px-1.5 py-0.5 text-[7px] font-semibold tracking-wide ${cls}`}
    >
      {tone === "red" ? "🔴" : "🟠"} {label}
    </span>
  );
}

function OrgChartPanel({ showRisks }: { showRisks: boolean }) {
  const nodeTone = (id: string): NodeTone => {
    if (!showRisks) return "neutral";
    const redNodes = ["ceo", "cto", "sm", "csl"];
    const amberNodes = ["hoo", "gl"];
    if (redNodes.includes(id)) return "red";
    if (amberNodes.includes(id)) return "amber";
    return "neutral";
  };

  return (
    <div className="space-y-3">
      {/* CEO */}
      <div className="flex flex-col items-center gap-1">
        <OrgNode
          name="Alex Morgan"
          role="Founder & CEO"
          tone={nodeTone("ceo")}
          large
        />
        {showRisks && (
          <RiskBadge label="Founder Bottleneck" tone="red" />
        )}
        <div className="h-3 w-px bg-[#1E1E24]" />
      </div>

      {/* L1 reports — 4-column grid */}
      <div className="grid grid-cols-2 gap-1.5 xl:grid-cols-4">
        {/* CTO + Engineering Lead */}
        <div className="flex flex-col items-center gap-1">
          <OrgNode
            name="Jordan Lee"
            role="CTO"
            tone={nodeTone("cto")}
          />
          {showRisks && (
            <RiskBadge label="Key-Person Dep." tone="red" />
          )}
          <div className="h-2 w-px bg-[#1E1E24]" />
          <OrgNode
            name="Morgan Chen"
            role="Engineering Lead"
            tone="neutral"
          />
        </div>

        {/* Head of Product */}
        <div className="flex flex-col items-start gap-1">
          <OrgNode
            name="Taylor Brooks"
            role="Head of Product"
            tone="neutral"
          />
        </div>

        {/* Head of Operations + CS Lead */}
        <div className="flex flex-col items-center gap-1">
          <OrgNode
            name="Casey Miller"
            role="Head of Operations"
            tone={nodeTone("hoo")}
          />
          {showRisks && (
            <RiskBadge label="Ownership Gap" tone="amber" />
          )}
          <div className="h-2 w-px bg-[#1E1E24]" />
          <OrgNode
            name="Riley Johnson"
            role="Customer Success"
            tone={nodeTone("csl")}
          />
          {showRisks && (
            <RiskBadge label="Handoff Risk" tone="red" />
          )}
        </div>

        {/* Growth + Sales */}
        <div className="flex flex-col gap-1">
          <OrgNode
            name="Jamie Carter"
            role="Growth Lead"
            tone={nodeTone("gl")}
          />
          {showRisks && (
            <RiskBadge label="Role Overlap" tone="amber" />
          )}
          <OrgNode
            name="Avery Wilson"
            role="Sales Manager"
            tone={nodeTone("sm")}
          />
          {showRisks && (
            <RiskBadge label="Sales Gap" tone="red" />
          )}
        </div>
      </div>

      {/* Finance & People — bottom row */}
      <div className="grid grid-cols-2 gap-1.5">
        <OrgNode
          name="Sam Parker"
          role="Finance & Strategy"
          tone="neutral"
        />
        <OrgNode
          name="Dana Reed"
          role="People Operations"
          tone="neutral"
        />
      </div>
    </div>
  );
}
