"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type RiskTone = "green" | "amber" | "red";
type Accent = "amber" | "indigo" | "cyan";

interface CompetencyMetric {
  label: string;
  value: number;
  note?: string;
}

interface Scenario {
  letter: string;
  name: string;
  tagline: string;
  headcountChange: string;
  headcountDetail: string;
  monthlySavings: string;
  speed: string;
  risk: string;
  riskTone: RiskTone;
  accent: Accent;
  metrics: CompetencyMetric[];
  tradeoffs: string;
  insight: string;
  recommended?: boolean;
}

const scenarios: Scenario[] = [
  {
    letter: "A",
    name: "Lean Efficiency Restructure",
    tagline: "Cut cost, preserve core execution",
    headcountChange: "−18%",
    headcountDetail: "45 → 37 employees",
    monthlySavings: "$81,000",
    speed: "Slower short-term (−2 wk ramp)",
    risk: "Medium",
    riskTone: "amber",
    accent: "amber",
    metrics: [
      { label: "Leadership", value: 72 },
      { label: "Execution", value: 68 },
      { label: "Adaptability", value: 55, note: "gap — loses 3 adaptability leads" },
      { label: "Stability", value: 80 },
    ],
    tradeoffs:
      "Removes 3 mid-tier execution roles. Preserves Chifong Dong (top scorer, 50), Eric Li (46), Luke Cai (45). Exits Yuzhe Zhao (near-all-red). Risk: adaptability gap could slow product iteration.",
    insight:
      "\"Acts with Consideration\" remains a team-wide gap post-restructure.",
  },
  {
    letter: "B",
    name: "Balanced Redesign",
    tagline: "Rebalance execution with leadership clarity",
    headcountChange: "−9%",
    headcountDetail: "45 → 41 employees",
    monthlySavings: "$40,500",
    speed: "Maintained",
    risk: "Low",
    riskTone: "green",
    accent: "indigo",
    recommended: true,
    metrics: [
      { label: "Leadership", value: 88 },
      { label: "Execution", value: 85 },
      { label: "Adaptability", value: 78 },
      { label: "Stability", value: 82 },
    ],
    tradeoffs:
      "Exits 4 low-fit individuals. Promotes Supriya Kumar (47) to expanded scope. Retains all top-5 performers. Adds 2 senior IC hires in AI/ML execution. Lowest disruption to team cohesion.",
    insight:
      "Closes the \"Acting with Consideration\" gap — Supriya Kumar and Lili Mao anchor people leadership.",
  },
  {
    letter: "C",
    name: "AI-Native Organization",
    tagline: "Restructure for AI-speed execution",
    headcountChange: "−27%",
    headcountDetail: "45 → 33 employees",
    monthlySavings: "$135,000",
    speed: "Faster long-term (+40% post-90d)",
    risk: "High",
    riskTone: "red",
    accent: "cyan",
    metrics: [
      { label: "Leadership", value: 65 },
      { label: "Execution", value: 70, note: "AI-augmented roles" },
      { label: "Adaptability", value: 90, note: "high-adaptability bias" },
      { label: "Stability", value: 45, note: "major disruption risk" },
    ],
    tradeoffs:
      "Deep restructure. Retains only highest-scoring adaptability/execution profiles. Exits 12 roles. Joyce Zhang profile (Influencer/Networker/Pioneer) ideal for this scenario — she can drive change momentum. Significant morale risk during 90-day transition.",
    insight:
      "Yuzhe Zhao (near-all-red) must be exited in this scenario. Luke Cai and Yijun Sim become critical stabilizing nodes.",
  },
];

const competencyImpact: Array<{
  label: string;
  status: string;
  description: string;
  tone: RiskTone;
}> = [
  {
    label: "Leadership",
    status: "Maintained",
    description: "Core leadership depth preserved across product and ops.",
    tone: "green",
  },
  {
    label: "Execution",
    status: "Reduced",
    description: "Execution velocity dips during transition window.",
    tone: "amber",
  },
  {
    label: "Adaptability",
    status: "Stretched",
    description: "Remaining team absorbs broader scope; monitor closely.",
    tone: "amber",
  },
  {
    label: "Stability",
    status: "Maintained",
    description: "Tenured operators retained. Low attrition risk.",
    tone: "green",
  },
];

function toneBg(t: RiskTone) {
  if (t === "green") return "bg-emerald-500";
  if (t === "amber") return "bg-amber-400";
  return "bg-rose-500";
}

function toneText(t: RiskTone) {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  return "text-rose-300";
}

function toneRing(t: RiskTone) {
  if (t === "green") return "border-emerald-500/30 bg-emerald-500/[0.08]";
  if (t === "amber") return "border-amber-400/30 bg-amber-400/[0.08]";
  return "border-rose-500/30 bg-rose-500/[0.08]";
}

const ACCENT_STYLES: Record<
  Accent,
  {
    hex: string;
    text: string;
    softBg: string;
    softBorder: string;
    bar: string;
    glow: string;
    chip: string;
    button: string;
    buttonOutline: string;
  }
> = {
  amber: {
    hex: "#f59e0b",
    text: "text-amber-300",
    softBg: "bg-amber-500/[0.06]",
    softBorder: "border-amber-500/30",
    bar: "bg-gradient-to-r from-amber-500 to-amber-300",
    glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.6)]",
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    button:
      "bg-amber-500/10 text-amber-200 border border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400/60",
    buttonOutline:
      "bg-transparent text-amber-200 border border-amber-500/40 hover:bg-amber-500/10",
  },
  indigo: {
    hex: "#6366f1",
    text: "text-indigo-300",
    softBg: "bg-indigo-500/[0.08]",
    softBorder: "border-indigo-500/40",
    bar: "bg-gradient-to-r from-indigo-500 to-indigo-300",
    glow: "shadow-[0_0_60px_-15px_rgba(99,102,241,0.65)]",
    chip: "bg-indigo-500/15 text-indigo-200 border-indigo-500/40",
    button:
      "bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400 shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)]",
    buttonOutline:
      "bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400 shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)]",
  },
  cyan: {
    hex: "#06b6d4",
    text: "text-cyan-300",
    softBg: "bg-cyan-500/[0.06]",
    softBorder: "border-cyan-500/30",
    bar: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    glow: "shadow-[0_0_60px_-15px_rgba(6,182,212,0.6)]",
    chip: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    button:
      "bg-cyan-500/10 text-cyan-200 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400/60",
    buttonOutline:
      "bg-transparent text-cyan-200 border border-cyan-500/40 hover:bg-cyan-500/10",
  },
};

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <ScenarioStyles />

      {/* Header */}
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Restructuring Scenarios
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Compare three strategic paths for your organization. Built from
          competency intelligence and behavioral analytics.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Left context panel */}
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Company Overview
            </p>
            <h2 className="mt-2 text-base font-semibold text-white">
              Sample SaaS startup
            </h2>
            <p className="text-xs text-zinc-500">Series A · Singapore</p>

            <div className="mt-6 space-y-4 border-t border-[#1E1E24] pt-5">
              <Field label="Headcount" value="45" />
              <Field label="Monthly burn" value="$450K" />
              <Field label="Runway" value="6 months" />
              <Field
                label="Goal"
                value="Optimize execution capability"
                multiline
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section>
          {/* Scenario grid */}
          <div className="grid items-start gap-5 md:grid-cols-3">
            {scenarios.map((s, i) => (
              <ScenarioCard key={s.letter} scenario={s} index={i} />
            ))}
          </div>

          {/* Competency Impact */}
          <section className="mt-12">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Competency Impact
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              How the recommended path lands
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Capability profile after Scenario B — Balanced Redesign.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {competencyImpact.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${toneBg(c.tone)}`}
                    />
                    <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                      {c.label}
                    </p>
                  </div>
                  <p
                    className={`mt-3 text-base font-semibold ${toneText(
                      c.tone
                    )}`}
                  >
                    {c.status}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Paywall CTA */}
          <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
                Full Analysis
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Unlock the complete decision package
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
                Get the full competency org map, role-fit ranking across every
                team member, and a founder memo you can take to the board.
              </p>

              <a
                href={CHECKOUT_URL}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
              >
                Unlock Full Analysis — $49
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-xs text-zinc-500">
                One-time payment. Instant access.
              </p>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "" : "flex items-baseline justify-between"}>
      <span className="text-xs uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span
        className={`font-semibold text-white ${
          multiline ? "mt-1 block text-sm" : "text-sm"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: Scenario;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  // Trigger bar fill on mount (after entry animation completes)
  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 350 + index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const accent = ACCENT_STYLES[scenario.accent];
  const isRecommended = !!scenario.recommended;

  return (
    <div
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      className={`scenario-card group relative cursor-pointer rounded-2xl border bg-[#0f0f13] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#13131a] focus:outline-none ${
        isRecommended
          ? `${accent.softBorder} ${accent.glow} md:-translate-y-1 hover:!-translate-y-2`
          : "border-[#1E1E24]"
      }`}
      style={{
        animation: `scenarioIn 480ms cubic-bezier(0.22, 1, 0.36, 1) ${
          index * 100
        }ms both`,
        boxShadow: isRecommended
          ? undefined
          : `0 0 0 1px transparent`,
      }}
    >
      {/* Hover glow border (CSS variable-driven for accent color) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${accent.hex}55, 0 0 40px -10px ${accent.hex}80`,
        }}
      />

      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="recommended-badge inline-flex items-center gap-1 rounded-full border border-indigo-400/50 bg-indigo-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-100 backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Recommended
          </span>
        </div>
      )}

      {/* Header row */}
      <div className="relative flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md border bg-[#0A0A0B] font-mono text-sm font-semibold"
          style={{
            color: accent.hex,
            borderColor: `${accent.hex}55`,
          }}
        >
          {scenario.letter}
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${toneRing(
            scenario.riskTone
          )} ${toneText(scenario.riskTone)}`}
        >
          Risk · {scenario.risk}
        </span>
      </div>

      {/* Title + tagline */}
      <h3 className="relative mt-4 text-lg font-semibold leading-snug text-white">
        Scenario {scenario.letter} — {scenario.name}
      </h3>
      <p className={`relative mt-1 text-xs ${accent.text}`}>
        {scenario.tagline}
      </p>

      {/* Top-line metrics */}
      <div className="relative mt-5 grid grid-cols-2 gap-3 border-t border-[#1E1E24] pt-4">
        <Stat
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          label="Headcount"
          value={scenario.headcountChange}
          subValue={scenario.headcountDetail}
          tone={scenario.accent}
        />
        <Stat
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="Monthly savings"
          value={scenario.monthlySavings}
          subValue="estimated"
          tone="indigo"
          forceEmerald
        />
        <Stat
          icon={<Zap className="h-3.5 w-3.5" />}
          label="Execution speed"
          value={scenario.speed}
          tone={scenario.accent}
          small
        />
        <Stat
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="Risk level"
          value={scenario.risk}
          tone={scenario.accent}
          riskTone={scenario.riskTone}
          small
        />
      </div>

      {/* Competency bars */}
      <div className="relative mt-5">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Competency impact
        </p>
        <div className="space-y-2.5">
          {scenario.metrics.map((m) => (
            <MetricBar
              key={m.label}
              label={m.label}
              value={m.value}
              note={m.note}
              accent={accent}
              animate={animateBars}
            />
          ))}
        </div>
      </div>

      {/* Expandable section */}
      <div
        className={`relative grid transition-all duration-300 ease-out ${
          expanded
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-[#1E1E24] pt-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Key tradeoffs
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                {scenario.tradeoffs}
              </p>
            </div>
            <div
              className={`rounded-lg border ${accent.softBorder} ${accent.softBg} p-3`}
            >
              <p
                className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest ${accent.text}`}
              >
                <Sparkles className="h-3 w-3" />
                AI Insight
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-200">
                {scenario.insight}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`group/btn mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
                isRecommended ? accent.button : accent.buttonOutline
              }`}
            >
              Select This Scenario
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expand affordance */}
      <div className="relative mt-4 flex items-center justify-center">
        <span
          className={`text-[10px] font-medium uppercase tracking-widest text-zinc-500 transition-colors group-hover:${accent.text}`}
        >
          {expanded ? "Click to collapse" : "Click to expand details"}
        </span>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  subValue,
  tone,
  riskTone,
  small,
  forceEmerald,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  tone: Accent;
  riskTone?: RiskTone;
  small?: boolean;
  forceEmerald?: boolean;
}) {
  const accent = ACCENT_STYLES[tone];
  const valueColor = forceEmerald
    ? "text-emerald-300"
    : riskTone
    ? toneText(riskTone)
    : accent.text;

  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
        <span className="opacity-70">{icon}</span>
        {label}
      </span>
      <span
        className={`font-semibold ${valueColor} ${
          small ? "text-xs leading-tight" : "text-sm"
        }`}
      >
        {value}
      </span>
      {subValue && (
        <span className="text-[10px] text-zinc-500">{subValue}</span>
      )}
    </div>
  );
}

function MetricBar({
  label,
  value,
  note,
  accent,
  animate,
}: {
  label: string;
  value: number;
  note?: string;
  accent: (typeof ACCENT_STYLES)[Accent];
  animate: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="text-zinc-400">{label}</span>
        <span className={`font-mono font-semibold ${accent.text}`}>
          {value}%
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`h-full rounded-full ${accent.bar} transition-[width] duration-[1100ms] ease-out`}
          style={{ width: animate ? `${value}%` : "0%" }}
        />
      </div>
      {note && (
        <p className="mt-1 text-[10px] italic text-zinc-500">{note}</p>
      )}
    </div>
  );
}

function ScenarioStyles() {
  return (
    <style>{`
      @keyframes scenarioIn {
        0% {
          opacity: 0;
          transform: translateY(16px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes recommendedPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.6),
            0 0 20px -2px rgba(99, 102, 241, 0.5);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(99, 102, 241, 0),
            0 0 24px -2px rgba(99, 102, 241, 0.7);
        }
      }
      .recommended-badge {
        animation: recommendedPulse 2.2s ease-in-out infinite;
      }
      .scenario-card:hover {
        background-color: #13131a;
      }
    `}</style>
  );
}
