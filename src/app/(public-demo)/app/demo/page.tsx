"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitCompare,
  Sparkles,
  TrendingDown,
  X,
  Zap,
} from "lucide-react";

const CHECKOUT_URL =
  "https://orglens-ai.madethis.app/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

// ---------- TYPES ----------
type RiskTone = "green" | "amber" | "red";
type Accent = "amber" | "indigo" | "cyan";
type ScenarioKey = "lean" | "balanced" | "ai-native" | "compare";

interface CompetencyMetric {
  label: string;
  value: number;
  note?: string;
}

interface Scenario {
  key: ScenarioKey;
  letter: string;
  name: string;
  shortName: string;
  tagline: string;
  headcount: number;
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
  orgChanges: { action: "keep" | "exit" | "hire" | "promote"; text: string }[];
  recommended?: boolean;
}

const SCENARIOS: Scenario[] = [
  {
    key: "lean",
    letter: "A",
    name: "Lean Efficiency Restructure",
    shortName: "Lean",
    tagline: "Cut cost, preserve core execution",
    headcount: 34,
    headcountChange: "−19%",
    headcountDetail: "42 → 34 employees",
    monthlySavings: "$76,000",
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
      "Removes 8 mid-tier execution roles. Preserves Jordan Lee (CTO, top scorer), Morgan Chen (Engineering Lead), and Casey Miller (Operations). Exits 3 low-fit ICs in Growth and Customer Success. Risk: adaptability gap could slow product iteration.",
    insight:
      "\"Acts with Consideration\" remains a team-wide gap post-restructure. Monitor morale through the first 60 days.",
    orgChanges: [
      { action: "keep", text: "Jordan Lee — CTO" },
      { action: "keep", text: "Morgan Chen — Engineering Lead" },
      { action: "keep", text: "Casey Miller — Head of Operations" },
      { action: "exit", text: "3 low-fit ICs across Growth and CS" },
      { action: "exit", text: "2 mid-tier execution roles" },
      { action: "exit", text: "3 contractor roles → insourced or dropped" },
    ],
  },
  {
    key: "balanced",
    letter: "B",
    name: "Balanced Redesign",
    shortName: "Balanced",
    tagline: "Rebalance execution with leadership clarity",
    headcount: 38,
    headcountChange: "−10%",
    headcountDetail: "42 → 38 employees",
    monthlySavings: "$38,000",
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
      "Exits 4 low-fit individuals. Promotes Taylor Brooks (Head of Product) to expanded scope. Retains all top-5 performers. Adds clarity to Growth vs. Sales ownership boundary. Lowest disruption to team cohesion.",
    insight:
      "Closes the \"Interacting with People\" gap at leadership level — Customer Success Lead and People Ops anchor cross-functional alignment.",
    orgChanges: [
      { action: "keep", text: "Jordan Lee — CTO (all technical decisions)" },
      { action: "promote", text: "Taylor Brooks → expanded Product + Strategy scope" },
      { action: "keep", text: "Casey Miller — Head of Operations (clarified)" },
      { action: "exit", text: "4 low-fit ICs (bottom quartile role-fit)" },
      { action: "hire", text: "1 VP Sales or Sr. Sales Lead" },
    ],
  },
  {
    key: "ai-native",
    letter: "C",
    name: "AI-Native Organization",
    shortName: "AI-Native",
    tagline: "Restructure for AI-speed execution",
    headcount: 31,
    headcountChange: "−26%",
    headcountDetail: "42 → 31 employees",
    monthlySavings: "$125,000",
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
      "Deep restructure. Retains only highest-scoring adaptability/execution profiles. Exits 11 roles. Significant morale risk during 90-day transition. Requires full AI tooling stack investment before cutting headcount.",
    insight:
      "Jordan Lee (CTO) and Alex Morgan (Founder) become critical stabilizing nodes. Every remaining role is expected to operate with AI augmentation from Day 1.",
    orgChanges: [
      { action: "keep", text: "Jordan Lee — CTO (technical anchor)" },
      { action: "keep", text: "Top 5 highest adaptability scorers" },
      { action: "exit", text: "11 roles across all functions" },
      { action: "hire", text: "2 AI/ML engineer roles (specialized)" },
      { action: "exit", text: "Traditional CS headcount → AI-assisted support model" },
    ],
  },
];

// ---------- ROLE-COMPETENCY FIT DATA ----------

type FitBadge = "Strong" | "Moderate" | "Gap";

interface TeamMemberFit {
  name: string;
  role: string;
  fitScore: number;
  fitBadge: FitBadge;
  strengths: string[];
  developments: string[];
  callout: string;
}

interface ScenarioFitData {
  members: TeamMemberFit[];
  orgStrengths: string[];
  orgGaps: string[];
  orgReadiness: number;
}

const FIT_DATA: Record<"lean" | "balanced" | "ai-native", ScenarioFitData> = {
  lean: {
    members: [
      { name: "Alex Morgan", role: "CEO", fitScore: 76, fitBadge: "Moderate", strengths: ["Leading & Deciding", "Enterprising & Performing"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "Strong vision and commercial drive, but lean operating model exposes an execution oversight gap." },
      { name: "Jordan Lee", role: "CTO", fitScore: 85, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Organising & Executing", "Creating & Conceptualising"], developments: ["Interacting & Presenting", "Enterprising & Performing"], callout: "High-precision execution anchor — lean scenario plays directly to Jordan's core competency profile." },
      { name: "Taylor Brooks", role: "Head of Product", fitScore: 70, fitBadge: "Moderate", strengths: ["Creating & Conceptualising", "Analysing & Interpreting"], developments: ["Leading & Deciding", "Enterprising & Performing"], callout: "Product creativity is strong, but constrained scope in a lean org limits Taylor's full impact." },
      { name: "Casey Miller", role: "Head of Ops", fitScore: 88, fitBadge: "Strong", strengths: ["Organising & Executing", "Supporting & Cooperating", "Adapting & Coping"], developments: ["Creating & Conceptualising", "Enterprising & Performing"], callout: "Ops execution is the team's anchor — Casey's fit peaks in a lean, efficiency-first structure." },
      { name: "Morgan Chen", role: "Engineering Lead", fitScore: 82, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Organising & Executing"], developments: ["Leading & Deciding", "Interacting & Presenting"], callout: "Reliable technical execution; lean model rewards Morgan's precision over innovation appetite." },
      { name: "Riley Johnson", role: "CS Lead", fitScore: 68, fitBadge: "Moderate", strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"], developments: ["Analysing & Interpreting", "Enterprising & Performing"], callout: "Strong interpersonal skills, but CS headcount compression creates a coverage gap risk." },
      { name: "Jamie Carter", role: "Growth Lead", fitScore: 65, fitBadge: "Moderate", strengths: ["Enterprising & Performing", "Creating & Conceptualising"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "Growth creativity is high, but lean ops discipline gap limits campaign execution reliability." },
      { name: "Avery Wilson", role: "Sales Manager", fitScore: 71, fitBadge: "Moderate", strengths: ["Interacting & Presenting", "Enterprising & Performing"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "Commercial drive is present, but sales pipeline discipline gap surfaces under lean headcount." },
      { name: "Sam Parker", role: "Finance", fitScore: 86, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Organising & Executing", "Adapting & Coping"], developments: ["Interacting & Presenting", "Leading & Deciding"], callout: "Financial rigour is well-matched to the lean scenario's cost-control mandate." },
      { name: "Dana Reed", role: "People Ops", fitScore: 62, fitBadge: "Moderate", strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"], developments: ["Analysing & Interpreting", "Enterprising & Performing"], callout: "Culture anchoring is valuable, but People Ops scope compresses significantly in a lean restructure." },
    ],
    orgStrengths: ["Organising & Executing", "Analysing & Interpreting", "Adapting & Coping"],
    orgGaps: ["Creating & Conceptualising", "Interacting & Presenting", "Enterprising & Performing"],
    orgReadiness: 72,
  },
  balanced: {
    members: [
      { name: "Alex Morgan", role: "CEO", fitScore: 82, fitBadge: "Strong", strengths: ["Leading & Deciding", "Interacting & Presenting", "Enterprising & Performing"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "Well-positioned for a growth-stage CEO role — leadership depth compensates for execution gaps." },
      { name: "Jordan Lee", role: "CTO", fitScore: 88, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Creating & Conceptualising", "Organising & Executing"], developments: ["Interacting & Presenting", "Leading & Deciding"], callout: "Consistently strong fit — balanced scenario preserves Jordan's technical leadership mandate." },
      { name: "Taylor Brooks", role: "Head of Product", fitScore: 84, fitBadge: "Strong", strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Supporting & Cooperating"], developments: ["Leading & Deciding", "Enterprising & Performing"], callout: "Expanded scope in Scenario B unlocks Taylor's full product and strategy potential." },
      { name: "Casey Miller", role: "Head of Ops", fitScore: 85, fitBadge: "Strong", strengths: ["Organising & Executing", "Supporting & Cooperating", "Adapting & Coping"], developments: ["Creating & Conceptualising", "Enterprising & Performing"], callout: "Ops clarity in Scenario B gives Casey a well-defined mandate — strong fit confirmed." },
      { name: "Morgan Chen", role: "Engineering Lead", fitScore: 84, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Organising & Executing", "Creating & Conceptualising"], developments: ["Leading & Deciding", "Interacting & Presenting"], callout: "Steady performer across all dimensions; balanced scenario retains Morgan's full contribution." },
      { name: "Riley Johnson", role: "CS Lead", fitScore: 78, fitBadge: "Moderate", strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"], developments: ["Analysing & Interpreting", "Enterprising & Performing"], callout: "Riley's interpersonal depth anchors cross-functional alignment — a genuine asset in the balanced model." },
      { name: "Jamie Carter", role: "Growth Lead", fitScore: 76, fitBadge: "Moderate", strengths: ["Enterprising & Performing", "Creating & Conceptualising", "Interacting & Presenting"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "Growth-Sales boundary clarity in Scenario B reduces Jamie's execution friction significantly." },
      { name: "Avery Wilson", role: "Sales Manager", fitScore: 79, fitBadge: "Moderate", strengths: ["Interacting & Presenting", "Enterprising & Performing", "Leading & Deciding"], developments: ["Analysing & Interpreting", "Organising & Executing"], callout: "Commercial instincts are strong — new VP Sales hire provides the structure Avery currently lacks." },
      { name: "Sam Parker", role: "Finance", fitScore: 82, fitBadge: "Strong", strengths: ["Analysing & Interpreting", "Organising & Executing", "Adapting & Coping"], developments: ["Interacting & Presenting", "Leading & Deciding"], callout: "Financial precision is a reliable team asset; balanced scenario keeps Sam's role well-scoped." },
      { name: "Dana Reed", role: "People Ops", fitScore: 80, fitBadge: "Strong", strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"], developments: ["Analysing & Interpreting", "Enterprising & Performing"], callout: "Balanced redesign preserves the culture function — Dana's empathy skills are a genuine retention asset." },
    ],
    orgStrengths: ["Leading & Deciding", "Supporting & Cooperating", "Analysing & Interpreting"],
    orgGaps: ["Enterprising & Performing", "Creating & Conceptualising", "Organising & Executing"],
    orgReadiness: 84,
  },
  "ai-native": {
    members: [
      { name: "Alex Morgan", role: "CEO", fitScore: 79, fitBadge: "Moderate", strengths: ["Leading & Deciding", "Enterprising & Performing", "Adapting & Coping"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "AI-Native scenario demands Alex act as stabilising node — leadership agility is tested under high disruption." },
      { name: "Jordan Lee", role: "CTO", fitScore: 91, fitBadge: "Strong", strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"], developments: ["Interacting & Presenting", "Leading & Deciding"], callout: "Jordan's technical creativity is maximised in the AI-Native model — highest fit score across all scenarios." },
      { name: "Taylor Brooks", role: "Head of Product", fitScore: 82, fitBadge: "Strong", strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"], developments: ["Leading & Deciding", "Enterprising & Performing"], callout: "Product design for AI-augmented workflows plays directly to Taylor's conceptual strengths." },
      { name: "Casey Miller", role: "Head of Ops", fitScore: 62, fitBadge: "Moderate", strengths: ["Organising & Executing", "Supporting & Cooperating"], developments: ["Creating & Conceptualising", "Adapting & Coping", "Enterprising & Performing"], callout: "Ops role compressed in an AI-first model — Casey's traditional execution strengths have diminished leverage." },
      { name: "Morgan Chen", role: "Engineering Lead", fitScore: 90, fitBadge: "Strong", strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"], developments: ["Leading & Deciding", "Interacting & Presenting"], callout: "Top fit in AI-Native scenario — Morgan's technical creativity and adaptability are the defining profile." },
      { name: "Riley Johnson", role: "CS Lead", fitScore: 55, fitBadge: "Gap", strengths: ["Supporting & Cooperating", "Adapting & Coping"], developments: ["Analysing & Interpreting", "Enterprising & Performing", "Creating & Conceptualising"], callout: "CS role is substantially automated — Riley's interpersonal strengths are underutilised in an AI-first model." },
      { name: "Jamie Carter", role: "Growth Lead", fitScore: 84, fitBadge: "Strong", strengths: ["Enterprising & Performing", "Creating & Conceptualising", "Adapting & Coping"], developments: ["Organising & Executing", "Analysing & Interpreting"], callout: "AI-augmented growth stack elevates Jamie's creative and commercial instincts — strong scenario fit." },
      { name: "Avery Wilson", role: "Sales Manager", fitScore: 74, fitBadge: "Moderate", strengths: ["Interacting & Presenting", "Enterprising & Performing", "Leading & Deciding"], developments: ["Analysing & Interpreting", "Adapting & Coping"], callout: "Interpersonal sales skills remain relevant, but AI-driven pipeline management stretches Avery's adaptability." },
      { name: "Sam Parker", role: "Finance", fitScore: 72, fitBadge: "Moderate", strengths: ["Analysing & Interpreting", "Organising & Executing"], developments: ["Creating & Conceptualising", "Adapting & Coping", "Enterprising & Performing"], callout: "Routine finance tasks are heavily automated — Sam's analytical depth remains relevant but role scope narrows." },
      { name: "Dana Reed", role: "People Ops", fitScore: 58, fitBadge: "Gap", strengths: ["Supporting & Cooperating", "Interacting & Presenting"], developments: ["Analysing & Interpreting", "Adapting & Coping", "Enterprising & Performing"], callout: "People Ops role is substantially reduced in the AI-Native model — headcount drop limits cultural influence." },
    ],
    orgStrengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"],
    orgGaps: ["Supporting & Cooperating", "Organising & Executing", "Interacting & Presenting"],
    orgReadiness: 68,
  },
};

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
    tabActive: string;
  }
> = {
  amber: {
    hex: "#f59e0b",
    text: "text-amber-300",
    softBg: "bg-amber-500/[0.06]",
    softBorder: "border-amber-500/30",
    bar: "bg-gradient-to-r from-amber-500 to-amber-300",
    glow: "shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]",
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    button: "bg-amber-500/10 text-amber-200 border border-amber-500/40 hover:bg-amber-500/20",
    tabActive: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  },
  indigo: {
    hex: "#6366f1",
    text: "text-indigo-300",
    softBg: "bg-indigo-500/[0.08]",
    softBorder: "border-indigo-500/40",
    bar: "bg-gradient-to-r from-indigo-500 to-indigo-300",
    glow: "shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]",
    chip: "bg-indigo-500/15 text-indigo-200 border-indigo-500/40",
    button: "bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400",
    tabActive: "bg-indigo-500/10 text-indigo-300 border-indigo-500/40",
  },
  cyan: {
    hex: "#06b6d4",
    text: "text-cyan-300",
    softBg: "bg-cyan-500/[0.06]",
    softBorder: "border-cyan-500/30",
    bar: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    glow: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]",
    chip: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    button: "bg-cyan-500/10 text-cyan-200 border border-cyan-500/40 hover:bg-cyan-500/20",
    tabActive: "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
  },
};

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

// ---------- PAGE ----------
export default function AppDemoPage() {
  const [active, setActive] = useState<ScenarioKey>("balanced");
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const activeScenario = SCENARIOS.find((s) => s.key === active) ?? null;

  return (
    <div className="dark flex h-screen flex-col overflow-hidden bg-[#0A0A0B] text-zinc-100">
      <ScenarioStyles />

      {/* Demo banner */}
      {!bannerDismissed && (
        <div className="w-full bg-indigo-900 text-white shrink-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-base">
                📊
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Demo Mode — 3-Scenario Re-org Comparison
                </p>
                <p className="mt-0.5 text-xs leading-snug opacity-80">
                  See how OrgLens models your re-org options. Real analysis from $49.
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

      {/* Header */}
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
              AtlasFlow Technologies — Re-org Scenario Analysis
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

      {/* Scenario tab bar */}
      <div className="shrink-0 border-b border-[#1E1E24] bg-[#0A0A0B]">
        <div className="flex overflow-x-auto px-4 gap-1 py-2">
          {SCENARIOS.map((s) => {
            const accent = ACCENT_STYLES[s.accent];
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(s.key)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? `${accent.tabActive} border`
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-bold"
                  style={{
                    color: isActive ? accent.hex : undefined,
                    backgroundColor: isActive ? `${accent.hex}22` : "transparent",
                    border: `1px solid ${isActive ? `${accent.hex}55` : "transparent"}`,
                  }}
                >
                  {s.letter}
                </span>
                {s.shortName}
                {s.recommended && (
                  <span className="hidden rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-indigo-300 sm:inline">
                    Recommended
                  </span>
                )}
              </button>
            );
          })}
          {/* Compare tab */}
          <button
            type="button"
            onClick={() => setActive("compare")}
            className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
              active === "compare"
                ? "border-zinc-500/40 bg-zinc-500/10 text-zinc-200"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <GitCompare className="h-3.5 w-3.5" />
            Compare All
          </button>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0F] px-5 py-8 md:px-8 md:py-10">
        {active === "compare" ? (
          <ComparisonView />
        ) : activeScenario ? (
          <ScenarioDetailView scenario={activeScenario} />
        ) : null}
      </main>
    </div>
  );
}

// ---------- SCENARIO DETAIL VIEW ----------
function ScenarioDetailView({ scenario }: { scenario: Scenario }) {
  const [animateBars, setAnimateBars] = useState(false);
  const accent = ACCENT_STYLES[scenario.accent];

  useEffect(() => {
    setAnimateBars(false);
    const t = setTimeout(() => setAnimateBars(true), 200);
    return () => clearTimeout(t);
  }, [scenario.key]);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Scenario header */}
      <header>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-base font-bold"
            style={{
              color: accent.hex,
              backgroundColor: `${accent.hex}18`,
              border: `1px solid ${accent.hex}44`,
            }}
          >
            {scenario.letter}
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent.hex }}>
              Scenario {scenario.letter}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {scenario.name}
            </h1>
          </div>
          {scenario.recommended && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-indigo-400/50 bg-indigo-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-100">
              <Sparkles className="h-3 w-3" />
              Recommended
            </span>
          )}
        </div>
        <p className={`mt-2 text-sm ${accent.text}`}>{scenario.tagline}</p>
      </header>

      {/* Company context */}
      <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">Company context</p>
        <h2 className="mt-2 text-base font-semibold text-white">AtlasFlow Technologies</h2>
        <p className="text-xs text-zinc-500">B2B SaaS · Growth stage · 42 employees</p>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#1E1E24] pt-5 sm:grid-cols-4">
          {[
            { label: "Current headcount", value: "42" },
            { label: "Monthly burn", value: "$420K" },
            { label: "Runway", value: "8 months" },
            { label: "Goal", value: "Scale past Series A" },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">{f.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            icon: <TrendingDown className="h-4 w-4" />,
            label: "Headcount change",
            value: scenario.headcountChange,
            sub: scenario.headcountDetail,
            color: "text-amber-300",
          },
          {
            icon: <CheckCircle2 className="h-4 w-4" />,
            label: "Monthly savings",
            value: scenario.monthlySavings,
            sub: "estimated",
            color: "text-emerald-300",
          },
          {
            icon: <Zap className="h-4 w-4" />,
            label: "Execution speed",
            value: scenario.speed.split("(")[0].trim(),
            sub: scenario.speed.includes("(") ? scenario.speed.match(/\(([^)]+)\)/)?.[1] : undefined,
            color: accent.text,
          },
          {
            icon: <AlertTriangle className="h-4 w-4" />,
            label: "Risk level",
            value: scenario.risk,
            sub: "transition risk",
            color: toneText(scenario.riskTone),
          },
        ].map((m) => (
          <div
            key={m.label}
            className="flex flex-col gap-1 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5"
          >
            <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              <span className="opacity-60">{m.icon}</span>
              {m.label}
            </span>
            <span className={`text-xl font-bold ${m.color}`}>{m.value}</span>
            {m.sub && <span className="text-[10px] text-zinc-500">{m.sub}</span>}
          </div>
        ))}
      </div>

      {/* Two-column: Org changes + Competency bars */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Org changes */}
        <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Org changes
          </p>
          <h3 className="mt-2 text-base font-semibold text-white">What changes in this scenario</h3>
          <ul className="mt-5 space-y-3">
            {scenario.orgChanges.map((c, i) => {
              const cfg =
                c.action === "keep"
                  ? { dot: "bg-emerald-500", text: "text-emerald-300", label: "KEEP" }
                  : c.action === "exit"
                  ? { dot: "bg-rose-500", text: "text-rose-300", label: "EXIT" }
                  : c.action === "hire"
                  ? { dot: "bg-indigo-400", text: "text-indigo-300", label: "HIRE" }
                  : { dot: "bg-amber-400", text: "text-amber-300", label: "PROMOTE" };
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${cfg.dot}`} />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${cfg.text}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-zinc-200">{c.text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Competency bars */}
        <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Competency impact
          </p>
          <h3 className="mt-2 text-base font-semibold text-white">
            Capability profile post-restructure
          </h3>
          <div className="mt-5 space-y-4">
            {scenario.metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-zinc-300">{m.label}</span>
                  <span className={`font-mono font-semibold ${accent.text}`}>{m.value}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className={`h-full rounded-full ${accent.bar} transition-[width] duration-[1100ms] ease-out`}
                    style={{ width: animateBars ? `${m.value}%` : "0%" }}
                  />
                </div>
                {m.note && <p className="mt-1 text-[10px] italic text-zinc-500">{m.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tradeoffs + AI Insight */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Key tradeoffs</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{scenario.tradeoffs}</p>
        </div>
        <div
          className={`rounded-2xl border ${accent.softBorder} ${accent.softBg} p-6`}
        >
          <p className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${accent.text}`}>
            <Sparkles className="h-3.5 w-3.5" />
            AI Insight
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">{scenario.insight}</p>
        </div>
      </div>

      {/* Risk badge */}
      <div
        className={`flex items-center gap-4 rounded-2xl border p-5 ${toneRing(scenario.riskTone)}`}
      >
        <span className={`h-3 w-3 rounded-full shrink-0 ${toneBg(scenario.riskTone)}`} />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-widest ${toneText(scenario.riskTone)}`}>
            {scenario.risk} Risk — Scenario {scenario.letter}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {scenario.riskTone === "green"
              ? "Low disruption. Suitable for teams that need steady, incremental improvement without losing momentum."
              : scenario.riskTone === "amber"
              ? "Moderate disruption. Requires careful transition management and 30-day stabilization plan."
              : "High disruption. Only appropriate if leadership alignment and AI tooling investment are already in place."}
          </p>
        </div>
      </div>

      {/* Role-Competency Fit Panel */}
      <RoleFitPanel scenarioKey={scenario.key} scenarioAccent={scenario.accent} />

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">Full Analysis</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Run this on your real team
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Upload your HUCAMA psychometric reports. Get a full re-org scenario comparison, role-fit
          rankings, and a founder memo you can take to the board — in minutes.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
        >
          Unlock Full Analysis — $49
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-xs text-zinc-500">One-time payment. Instant access.</p>
      </div>
    </div>
  );
}

// ---------- COMPARISON VIEW ----------
function ComparisonView() {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimateBars(true), 200);
    return () => clearTimeout(t);
  }, []);

  const metrics = ["Leadership", "Execution", "Adaptability", "Stability"] as const;

  const competencyImpact = [
    {
      label: "Leadership",
      status: "Maintained (B)",
      description: "Core leadership depth preserved across product and ops in Scenario B.",
      tone: "green" as RiskTone,
    },
    {
      label: "Execution",
      status: "Reduced (A/C)",
      description: "Execution velocity dips during transition window in Lean and AI-Native.",
      tone: "amber" as RiskTone,
    },
    {
      label: "Adaptability",
      status: "Stretched (A)",
      description: "Remaining team absorbs broader scope in Lean; maximized in AI-Native.",
      tone: "amber" as RiskTone,
    },
    {
      label: "Stability",
      status: "High risk (C)",
      description: "AI-Native scenario creates significant morale and retention risk at 90 days.",
      tone: "red" as RiskTone,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      {/* Header */}
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Side-by-side analysis
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Comparing all 3 re-org scenarios
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          AtlasFlow Technologies · 42-person B2B SaaS · Growth stage
        </p>
      </header>

      {/* Cards grid */}
      <div className="grid items-start gap-5 md:grid-cols-3">
        {SCENARIOS.map((s, i) => (
          <CompareScenarioCard key={s.key} scenario={s} index={i} animateBars={animateBars} />
        ))}
      </div>

      {/* Diff table */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Scenario comparison
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
          Key metrics across all three paths
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E1E24] bg-[#0A0A0B]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Dimension
                </th>
                {SCENARIOS.map((s) => {
                  const accent = ACCENT_STYLES[s.accent];
                  return (
                    <th
                      key={s.key}
                      className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: accent.hex }}
                    >
                      {s.shortName}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E24] text-xs">
              <tr className="hover:bg-[#13131a]">
                <td className="px-5 py-3.5 font-medium text-zinc-400">Headcount</td>
                {SCENARIOS.map((s) => (
                  <td key={s.key} className="px-5 py-3.5 text-center text-white">{s.headcountDetail}</td>
                ))}
              </tr>
              <tr className="hover:bg-[#13131a]">
                <td className="px-5 py-3.5 font-medium text-zinc-400">Monthly savings</td>
                {SCENARIOS.map((s) => (
                  <td key={s.key} className="px-5 py-3.5 text-center text-emerald-300 font-semibold">{s.monthlySavings}</td>
                ))}
              </tr>
              <tr className="hover:bg-[#13131a]">
                <td className="px-5 py-3.5 font-medium text-zinc-400">Execution speed</td>
                {SCENARIOS.map((s) => (
                  <td key={s.key} className="px-5 py-3.5 text-center text-white">{s.speed.split("(")[0].trim()}</td>
                ))}
              </tr>
              <tr className="hover:bg-[#13131a]">
                <td className="px-5 py-3.5 font-medium text-zinc-400">Risk level</td>
                {SCENARIOS.map((s) => (
                  <td key={s.key} className={`px-5 py-3.5 text-center font-semibold ${toneText(s.riskTone)}`}>{s.risk}</td>
                ))}
              </tr>
              <tr className="hover:bg-[#13131a]">
                <td className="px-5 py-3.5 font-medium text-zinc-400">Recommended</td>
                {SCENARIOS.map((s) => (
                  <td key={s.key} className={`px-5 py-3.5 text-center font-semibold ${s.recommended ? "text-indigo-300" : "text-zinc-600"}`}>
                    {s.recommended ? "✓ Yes" : "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Competency radar comparison */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Competency profile comparison
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
          How each scenario affects your team&rsquo;s capabilities
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Modeled competency scores after restructure — based on who stays, who exits, and new roles.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
          {metrics.map((metricLabel) => {
            return (
              <div key={metricLabel} className="mb-5 last:mb-0">
                <p className="mb-3 text-xs font-semibold text-zinc-300">{metricLabel}</p>
                <div className="space-y-2">
                  {SCENARIOS.map((s) => {
                    const accent = ACCENT_STYLES[s.accent];
                    const metric = s.metrics.find((m) => m.label === metricLabel);
                    const value = metric?.value ?? 0;
                    return (
                      <div key={s.key} className="flex items-center gap-3">
                        <span
                          className="w-20 shrink-0 text-right text-[10px] font-semibold uppercase tracking-widest"
                          style={{ color: accent.hex }}
                        >
                          {s.shortName}
                        </span>
                        <div className="flex-1 h-2 overflow-hidden rounded-full bg-white/[0.04]">
                          <div
                            className={`h-full rounded-full ${accent.bar} transition-[width] duration-[1100ms] ease-out`}
                            style={{ width: animateBars ? `${value}%` : "0%" }}
                          />
                        </div>
                        <span className={`w-10 shrink-0 text-right font-mono text-xs font-semibold`} style={{ color: accent.hex }}>
                          {value}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact summary */}
      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Impact summary
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
          How the recommended path lands
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Capability profile after Scenario B — Balanced Redesign.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {competencyImpact.map((c) => (
            <div key={c.label} className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-5">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${toneBg(c.tone)}`} />
                <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{c.label}</p>
              </div>
              <p className={`mt-3 text-base font-semibold ${toneText(c.tone)}`}>{c.status}</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decision guidance */}
      <section className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Decision guidance
            </p>
            <h3 className="mt-1.5 text-lg font-bold text-white">Which scenario is right for AtlasFlow?</h3>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>
                <span className="font-semibold text-amber-300">Scenario A (Lean)</span> is the right
                path if AtlasFlow needs to extend runway immediately and can absorb a short-term
                execution dip. It sacrifices adaptability for cash — a legitimate trade if board pressure
                is high.
              </p>
              <p>
                <span className="font-semibold text-indigo-300">Scenario B (Balanced)</span> is the
                recommended path. It achieves meaningful savings while retaining full leadership depth
                and execution capacity. The 4 exits are low-fit — the organization gets stronger, not just
                smaller. This is the scenario with the highest probability of success without morale
                damage.
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Scenario C (AI-Native)</span> is only
                appropriate if AtlasFlow has already adopted AI tooling across engineering, sales, and
                support. Without that infrastructure in place, the headcount reduction will create
                execution gaps that outweigh the savings. This scenario is for founders who are already
                committed to an AI-first operating model — not as a cost cut, but as a strategic
                identity shift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">Full Analysis</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Unlock the complete decision package
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Get the full competency org map, role-fit ranking across every team member, and a founder
          memo you can take to the board.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
        >
          Unlock Full Analysis — $49
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-xs text-zinc-500">One-time payment. Instant access.</p>
      </div>
    </div>
  );
}

// ---------- COMPARE SCENARIO CARD ----------
function CompareScenarioCard({
  scenario,
  index,
  animateBars,
}: {
  scenario: Scenario;
  index: number;
  animateBars: boolean;
}) {
  const accent = ACCENT_STYLES[scenario.accent];
  const isRecommended = !!scenario.recommended;

  return (
    <div
      className={`relative rounded-2xl border bg-[#0f0f13] p-6 ${
        isRecommended
          ? `${accent.softBorder} ${accent.glow} md:-translate-y-1`
          : "border-[#1E1E24]"
      }`}
      style={{ animation: `scenarioIn 480ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms both` }}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="recommended-badge inline-flex items-center gap-1 rounded-full border border-indigo-400/50 bg-indigo-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-100 backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Recommended
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm font-semibold"
          style={{ color: accent.hex, borderColor: `${accent.hex}55`, backgroundColor: `${accent.hex}11` }}
        >
          {scenario.letter}
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${toneRing(scenario.riskTone)} ${toneText(scenario.riskTone)}`}
        >
          Risk · {scenario.risk}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">{scenario.name}</h3>
      <p className={`mt-1 text-xs ${accent.text}`}>{scenario.tagline}</p>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#1E1E24] pt-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">Headcount</p>
          <p className={`mt-1 text-sm font-bold ${toneText(scenario.riskTone === "green" ? "green" : "amber")}`}>
            {scenario.headcountChange}
          </p>
          <p className="text-[10px] text-zinc-500">{scenario.headcountDetail}</p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">Monthly savings</p>
          <p className="mt-1 text-sm font-bold text-emerald-300">{scenario.monthlySavings}</p>
          <p className="text-[10px] text-zinc-500">estimated</p>
        </div>
      </div>

      {/* Competency bars */}
      <div className="mt-5">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">Competency impact</p>
        <div className="space-y-2.5">
          {scenario.metrics.map((m) => (
            <div key={m.label}>
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-zinc-400">{m.label}</span>
                <span className={`font-mono font-semibold ${accent.text}`}>{m.value}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className={`h-full rounded-full ${accent.bar} transition-[width] duration-[1100ms] ease-out`}
                  style={{ width: animateBars ? `${m.value}%` : "0%" }}
                />
              </div>
              {m.note && <p className="mt-0.5 text-[9px] italic text-zinc-500">{m.note}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Insight */}
      <div className={`mt-5 rounded-lg border ${accent.softBorder} ${accent.softBg} p-3`}>
        <p className={`flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest ${accent.text}`}>
          <Sparkles className="h-3 w-3" />
          AI Insight
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-200">{scenario.insight}</p>
      </div>
    </div>
  );
}

// ---------- ROLE-COMPETENCY FIT PANEL ----------
function RoleFitPanel({
  scenarioKey,
  scenarioAccent,
}: {
  scenarioKey: ScenarioKey;
  scenarioAccent: Accent;
}) {
  if (scenarioKey === "compare") return null;
  const fitData = FIT_DATA[scenarioKey];
  const accent = ACCENT_STYLES[scenarioAccent];

  function badgeStyles(badge: FitBadge) {
    if (badge === "Strong") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    if (badge === "Moderate") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    return "bg-rose-500/15 text-rose-300 border-rose-500/30";
  }

  function scoreColor(score: number) {
    if (score >= 80) return "text-emerald-300";
    if (score >= 60) return "text-amber-300";
    return "text-rose-300";
  }

  const readinessColor =
    fitData.orgReadiness >= 80
      ? { text: "text-emerald-300", bar: "bg-emerald-500" }
      : fitData.orgReadiness >= 65
      ? { text: "text-amber-300", bar: "bg-amber-400" }
      : { text: "text-rose-300", bar: "bg-rose-500" };

  return (
    <div id="role-fit" className="space-y-8 border-t border-[#1E1E24] pt-10">
      {/* Section header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Role-Competency Fit
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
            Individual fit scores — this scenario
          </h2>
          <p className="mt-1.5 text-sm text-zinc-400">
            Competency signals mapped against role requirements. Role-fit indicators based on the Great 8 framework.
          </p>
        </div>
        {/* Org Readiness Score chip */}
        <div className="shrink-0 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] px-6 py-4 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">Org Readiness</p>
          <p className={`mt-1 text-4xl font-bold tabular-nums leading-none ${readinessColor.text}`}>
            {fitData.orgReadiness}
          </p>
          <p className="text-[10px] text-zinc-600">/100</p>
        </div>
      </div>

      {/* Readiness bar + org-level summary */}
      <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5 md:p-6">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="text-zinc-400">Team readiness for this restructure scenario</span>
          <span className={`font-mono font-bold ${readinessColor.text}`}>{fitData.orgReadiness}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className={`h-full rounded-full ${readinessColor.bar} transition-[width] duration-[1200ms] ease-out`}
            style={{ width: `${fitData.orgReadiness}%` }}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#1E1E24] pt-5 sm:grid-cols-2">
          {/* Org strengths */}
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
              Top 3 Org-Wide Strengths
            </p>
            <div className="space-y-2">
              {fitData.orgStrengths.map((s) => (
                <div key={s} className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-200">{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Org gaps */}
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-amber-400">
              Top 3 Org-Wide Development Gaps
            </p>
            <div className="space-y-2">
              {fitData.orgGaps.map((g) => (
                <div key={g} className="flex items-center gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.07] px-3 py-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span className="text-xs font-medium text-amber-200">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member cards grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fitData.members.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-5 space-y-4"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{member.name}</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">{member.role}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-2xl font-bold tabular-nums leading-none ${scoreColor(member.fitScore)}`}>
                  {member.fitScore}
                </p>
                <p className="text-[9px] text-zinc-600 mt-0.5">/100</p>
                <span
                  className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${badgeStyles(member.fitBadge)}`}
                >
                  {member.fitBadge}
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
                Areas of Strength
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-emerald-500/25 bg-emerald-500/[0.1] px-2.5 py-1 text-[10px] font-medium text-emerald-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Developments */}
            <div>
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-amber-400">
                Areas for Development
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.developments.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-amber-500/25 bg-amber-500/[0.1] px-2.5 py-1 text-[10px] font-medium text-amber-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Callout */}
            <div className={`rounded-lg border ${accent.softBorder} ${accent.softBg} px-3 py-2.5`}>
              <p className={`text-[11px] leading-relaxed italic ${accent.text}`}>
                &ldquo;{member.callout}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- STYLES ----------
function ScenarioStyles() {
  return (
    <style>{`
      @keyframes scenarioIn {
        0% { opacity: 0; transform: translateY(14px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes recommendedPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5),
            0 0 16px -2px rgba(99, 102, 241, 0.4);
        }
        50% {
          box-shadow: 0 0 0 5px rgba(99, 102, 241, 0),
            0 0 22px -2px rgba(99, 102, 241, 0.6);
        }
      }
      .recommended-badge {
        animation: recommendedPulse 2.2s ease-in-out infinite;
      }
    `}</style>
  );
}
