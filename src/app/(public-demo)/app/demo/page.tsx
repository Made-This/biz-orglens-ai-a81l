"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  LayoutGrid,
  GitBranch,
  Lightbulb,
  Download,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Sparkles,
  TrendingDown,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHECKOUT_URL =
  "https://madethis.com/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

// ─── Types ───────────────────────────────────────────────────────────────────

type SectionId =
  | "org-overview"
  | "people-analytics"
  | "competency-mapping"
  | "scenario-comparison"
  | "recommendations"
  | "export";

type ScenarioKey = "lean" | "balanced" | "ai-native" | "compare";
type RiskTone = "green" | "amber" | "red";
type Accent = "amber" | "indigo" | "cyan";
type FitBadge = "Strong" | "Moderate" | "Gap";
type NodeTone = "neutral" | "red" | "amber";

// ─── Nav Sections ─────────────────────────────────────────────────────────────

const NAV_SECTIONS: {
  id: SectionId;
  num: number;
  label: string;
  sublabel: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "org-overview",
    num: 1,
    label: "Org Overview",
    sublabel: "Hierarchy & Structure",
    Icon: Building2,
  },
  {
    id: "people-analytics",
    num: 2,
    label: "People Analytics",
    sublabel: "10 Team Members",
    Icon: Users,
  },
  {
    id: "competency-mapping",
    num: 3,
    label: "Competency Mapping",
    sublabel: "Great 8 Heatmap",
    Icon: LayoutGrid,
  },
  {
    id: "scenario-comparison",
    num: 4,
    label: "Scenario Comparison",
    sublabel: "Lean · Balanced · AI-Native",
    Icon: GitBranch,
  },
  {
    id: "recommendations",
    num: 5,
    label: "Recommendations",
    sublabel: "90-Day Roadmap",
    Icon: Lightbulb,
  },
  {
    id: "export",
    num: 6,
    label: "Export & Next Steps",
    sublabel: "Full Report — $49",
    Icon: Download,
  },
];

// ─── Great 8 ──────────────────────────────────────────────────────────────────

const GREAT_8 = [
  "Leading & Deciding",
  "Supporting & Cooperating",
  "Interacting & Presenting",
  "Analysing & Interpreting",
  "Creating & Conceptualising",
  "Organising & Executing",
  "Adapting & Coping",
  "Enterprising & Performing",
];

const GREAT_8_SHORT = [
  "Leading",
  "Cooperating",
  "Presenting",
  "Analysing",
  "Creating",
  "Executing",
  "Adapting",
  "Enterprising",
];

// ─── Team Data ────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  title: string;
  fitScore: number;
  tenure: string;
  riskFlag?: string;
  riskTone?: "red" | "amber";
  competencies: number[]; // 8 Great 8 scores
}

const TEAM: TeamMember[] = [
  {
    name: "Alex Morgan",
    title: "CEO",
    fitScore: 91,
    tenure: "4 yrs",
    riskFlag: "Founder Bottleneck — 7 direct reports",
    riskTone: "red",
    competencies: [92, 78, 85, 72, 76, 68, 80, 91],
  },
  {
    name: "Jordan Lee",
    title: "CTO",
    fitScore: 88,
    tenure: "3 yrs",
    riskFlag: "Key-Person Dependency",
    riskTone: "red",
    competencies: [80, 77, 72, 90, 88, 85, 82, 78],
  },
  {
    name: "Taylor Brooks",
    title: "Head of Product",
    fitScore: 85,
    tenure: "2.5 yrs",
    competencies: [75, 82, 83, 86, 90, 78, 77, 76],
  },
  {
    name: "Casey Miller",
    title: "Head of Ops",
    fitScore: 83,
    tenure: "2 yrs",
    riskFlag: "Scope Overload",
    riskTone: "amber",
    competencies: [70, 80, 72, 68, 58, 85, 75, 65],
  },
  {
    name: "Morgan Chen",
    title: "Engineering Lead",
    fitScore: 82,
    tenure: "2 yrs",
    competencies: [65, 70, 64, 85, 80, 82, 78, 72],
  },
  {
    name: "Riley Johnson",
    title: "CS Lead",
    fitScore: 78,
    tenure: "1.5 yrs",
    riskFlag: "Handoff Risk",
    riskTone: "amber",
    competencies: [62, 82, 78, 65, 60, 67, 74, 63],
  },
  {
    name: "Jamie Carter",
    title: "Growth Lead",
    fitScore: 74,
    tenure: "1.5 yrs",
    riskFlag: "Role Overlap",
    riskTone: "amber",
    competencies: [66, 64, 72, 58, 75, 60, 68, 74],
  },
  {
    name: "Avery Wilson",
    title: "Sales Manager",
    fitScore: 70,
    tenure: "1 yr",
    riskFlag: "Sales Gap",
    riskTone: "red",
    competencies: [68, 65, 76, 55, 60, 58, 62, 74],
  },
  {
    name: "Sam Parker",
    title: "Finance",
    fitScore: 77,
    tenure: "1 yr",
    competencies: [60, 65, 57, 78, 55, 76, 70, 62],
  },
  {
    name: "Dana Reed",
    title: "People Ops",
    fitScore: 72,
    tenure: "8 mo",
    competencies: [62, 78, 75, 60, 58, 63, 71, 58],
  },
];

// ─── Scenario Data ────────────────────────────────────────────────────────────

interface CompetencyMetric {
  label: string;
  value: number;
  note?: string;
}

interface OrgChange {
  action: "keep" | "exit" | "hire" | "promote";
  text: string;
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
  orgChanges: OrgChange[];
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
    speed: "Slower short-term",
    risk: "Medium",
    riskTone: "amber",
    accent: "amber",
    metrics: [
      { label: "Leadership", value: 72 },
      { label: "Execution", value: 68 },
      { label: "Adaptability", value: 55, note: "gap — exits 3 adaptability leads" },
      { label: "Stability", value: 80 },
    ],
    tradeoffs:
      "Removes 8 mid-tier execution roles. Preserves Jordan Lee (CTO), Morgan Chen (Engineering Lead), and Casey Miller (Operations). Exits Riley Johnson (CS Lead) and Dana Reed (People Ops). Risk: adaptability gap could slow product iteration.",
    insight:
      "Acts with Consideration gap remains post-restructure. Monitor morale through the first 60 days.",
    orgChanges: [
      { action: "keep", text: "Jordan Lee — CTO" },
      { action: "keep", text: "Morgan Chen — Engineering Lead" },
      { action: "keep", text: "Casey Miller — Head of Operations" },
      { action: "promote", text: "Morgan Chen → Engineering Director" },
      { action: "exit", text: "Riley Johnson — CS Lead" },
      { action: "exit", text: "Dana Reed — People Ops" },
      { action: "exit", text: "6 additional mid-tier ICs" },
    ],
  },
  {
    key: "balanced",
    letter: "B",
    name: "Balanced Redesign",
    shortName: "Balanced",
    tagline: "Rebalance execution with leadership clarity",
    headcount: 44,
    headcountChange: "+5%",
    headcountDetail: "42 → 44 employees",
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
      "Keeps all 10 key team members. Promotes Taylor Brooks to VP Product. Hires 1 Senior CS and 1 Growth. Adds clarity to Growth vs Sales ownership boundary. Lowest disruption to team cohesion.",
    insight:
      "Closes the Interacting with People gap at leadership level. Customer Success Lead and People Ops anchor cross-functional alignment.",
    orgChanges: [
      { action: "keep", text: "All 10 key team members" },
      { action: "promote", text: "Taylor Brooks → VP Product" },
      { action: "keep", text: "Casey Miller — Head of Operations (clarified)" },
      { action: "hire", text: "1 Senior CS Lead" },
      { action: "hire", text: "1 Growth Manager" },
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
      "Deep restructure. Exits Riley Johnson (CS), Avery Wilson (Sales), Dana Reed (People Ops). Hires 3 AI specialists. CS function restructured as automated. Requires full AI tooling stack before cutting headcount.",
    insight:
      "Jordan Lee (CTO) and Alex Morgan (CEO) become critical stabilizing nodes. Every remaining role operates with AI augmentation from Day 1.",
    orgChanges: [
      { action: "keep", text: "Jordan Lee — CTO (technical anchor)" },
      { action: "keep", text: "Morgan Chen — Engineering Lead" },
      { action: "exit", text: "Riley Johnson — CS Lead (role automated)" },
      { action: "exit", text: "Avery Wilson — Sales Manager" },
      { action: "exit", text: "Dana Reed — People Ops" },
      { action: "hire", text: "3 AI/ML specialists" },
    ],
  },
];

// ─── Fit Data ─────────────────────────────────────────────────────────────────

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
      {
        name: "Alex Morgan",
        role: "CEO",
        fitScore: 76,
        fitBadge: "Moderate",
        strengths: ["Leading & Deciding", "Enterprising & Performing"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "Strong vision and commercial drive, but lean operating model exposes an execution oversight gap.",
      },
      {
        name: "Jordan Lee",
        role: "CTO",
        fitScore: 85,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Organising & Executing", "Creating & Conceptualising"],
        developments: ["Interacting & Presenting", "Enterprising & Performing"],
        callout:
          "High-precision execution anchor — lean scenario plays directly to Jordan's core competency profile.",
      },
      {
        name: "Taylor Brooks",
        role: "Head of Product",
        fitScore: 70,
        fitBadge: "Moderate",
        strengths: ["Creating & Conceptualising", "Analysing & Interpreting"],
        developments: ["Leading & Deciding", "Enterprising & Performing"],
        callout:
          "Product creativity is strong, but constrained scope in a lean org limits Taylor's full impact.",
      },
      {
        name: "Casey Miller",
        role: "Head of Ops",
        fitScore: 83,
        fitBadge: "Strong",
        strengths: ["Organising & Executing", "Supporting & Cooperating", "Adapting & Coping"],
        developments: ["Creating & Conceptualising", "Enterprising & Performing"],
        callout:
          "Ops execution is the team's anchor — Casey's fit peaks in a lean, efficiency-first structure.",
      },
      {
        name: "Morgan Chen",
        role: "Engineering Director",
        fitScore: 82,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Organising & Executing"],
        developments: ["Leading & Deciding", "Interacting & Presenting"],
        callout:
          "Reliable technical execution; lean model rewards Morgan's precision over innovation appetite.",
      },
      {
        name: "Jamie Carter",
        role: "Growth Lead",
        fitScore: 65,
        fitBadge: "Moderate",
        strengths: ["Enterprising & Performing", "Creating & Conceptualising"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "Growth creativity is high, but lean ops discipline gap limits campaign execution reliability.",
      },
      {
        name: "Avery Wilson",
        role: "Sales Manager",
        fitScore: 71,
        fitBadge: "Moderate",
        strengths: ["Interacting & Presenting", "Enterprising & Performing"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "Commercial drive is present, but sales pipeline discipline gap surfaces under lean headcount.",
      },
      {
        name: "Sam Parker",
        role: "Finance",
        fitScore: 86,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Organising & Executing", "Adapting & Coping"],
        developments: ["Interacting & Presenting", "Leading & Deciding"],
        callout:
          "Financial rigour is well-matched to the lean scenario's cost-control mandate.",
      },
    ],
    orgStrengths: ["Organising & Executing", "Analysing & Interpreting", "Adapting & Coping"],
    orgGaps: ["Creating & Conceptualising", "Interacting & Presenting", "Enterprising & Performing"],
    orgReadiness: 72,
  },
  balanced: {
    members: [
      {
        name: "Alex Morgan",
        role: "CEO",
        fitScore: 82,
        fitBadge: "Strong",
        strengths: ["Leading & Deciding", "Interacting & Presenting", "Enterprising & Performing"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "Well-positioned for a growth-stage CEO role — leadership depth compensates for execution gaps.",
      },
      {
        name: "Jordan Lee",
        role: "CTO",
        fitScore: 88,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Creating & Conceptualising", "Organising & Executing"],
        developments: ["Interacting & Presenting", "Leading & Deciding"],
        callout:
          "Consistently strong fit — balanced scenario preserves Jordan's technical leadership mandate.",
      },
      {
        name: "Taylor Brooks",
        role: "VP Product",
        fitScore: 85,
        fitBadge: "Strong",
        strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Supporting & Cooperating"],
        developments: ["Leading & Deciding", "Enterprising & Performing"],
        callout:
          "Expanded scope in Scenario B unlocks Taylor's full product and strategy potential.",
      },
      {
        name: "Casey Miller",
        role: "Head of Ops",
        fitScore: 86,
        fitBadge: "Strong",
        strengths: ["Organising & Executing", "Supporting & Cooperating", "Adapting & Coping"],
        developments: ["Creating & Conceptualising", "Enterprising & Performing"],
        callout:
          "Ops clarity in Scenario B gives Casey a well-defined mandate — strong fit confirmed.",
      },
      {
        name: "Morgan Chen",
        role: "Engineering Lead",
        fitScore: 85,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Organising & Executing", "Creating & Conceptualising"],
        developments: ["Leading & Deciding", "Interacting & Presenting"],
        callout:
          "Steady performer across all dimensions; balanced scenario retains Morgan's full contribution.",
      },
      {
        name: "Riley Johnson",
        role: "CS Lead",
        fitScore: 80,
        fitBadge: "Strong",
        strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"],
        developments: ["Analysing & Interpreting", "Enterprising & Performing"],
        callout:
          "Riley's interpersonal depth anchors cross-functional alignment — a genuine asset in the balanced model.",
      },
      {
        name: "Jamie Carter",
        role: "Growth Lead",
        fitScore: 76,
        fitBadge: "Moderate",
        strengths: ["Enterprising & Performing", "Creating & Conceptualising", "Interacting & Presenting"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "Growth-Sales boundary clarity in Scenario B reduces Jamie's execution friction significantly.",
      },
      {
        name: "Avery Wilson",
        role: "Sales Manager",
        fitScore: 79,
        fitBadge: "Moderate",
        strengths: ["Interacting & Presenting", "Enterprising & Performing", "Leading & Deciding"],
        developments: ["Analysing & Interpreting", "Organising & Executing"],
        callout:
          "Commercial instincts are strong — new Senior CS hire provides structure Avery currently lacks.",
      },
      {
        name: "Sam Parker",
        role: "Finance",
        fitScore: 82,
        fitBadge: "Strong",
        strengths: ["Analysing & Interpreting", "Organising & Executing", "Adapting & Coping"],
        developments: ["Interacting & Presenting", "Leading & Deciding"],
        callout:
          "Financial precision is a reliable team asset; balanced scenario keeps Sam's role well-scoped.",
      },
      {
        name: "Dana Reed",
        role: "People Ops",
        fitScore: 80,
        fitBadge: "Strong",
        strengths: ["Supporting & Cooperating", "Interacting & Presenting", "Adapting & Coping"],
        developments: ["Analysing & Interpreting", "Enterprising & Performing"],
        callout:
          "Balanced redesign preserves the culture function — Dana's empathy skills are a genuine retention asset.",
      },
    ],
    orgStrengths: ["Leading & Deciding", "Supporting & Cooperating", "Analysing & Interpreting"],
    orgGaps: ["Enterprising & Performing", "Creating & Conceptualising", "Organising & Executing"],
    orgReadiness: 84,
  },
  "ai-native": {
    members: [
      {
        name: "Alex Morgan",
        role: "CEO",
        fitScore: 79,
        fitBadge: "Moderate",
        strengths: ["Leading & Deciding", "Enterprising & Performing", "Adapting & Coping"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "AI-Native scenario demands Alex act as stabilising node — leadership agility is tested under high disruption.",
      },
      {
        name: "Jordan Lee",
        role: "CTO",
        fitScore: 91,
        fitBadge: "Strong",
        strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"],
        developments: ["Interacting & Presenting", "Leading & Deciding"],
        callout:
          "Jordan's technical creativity is maximised in the AI-Native model — highest fit score across all scenarios.",
      },
      {
        name: "Taylor Brooks",
        role: "Head of Product",
        fitScore: 82,
        fitBadge: "Strong",
        strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"],
        developments: ["Leading & Deciding", "Enterprising & Performing"],
        callout:
          "Product design for AI-augmented workflows plays directly to Taylor's conceptual strengths.",
      },
      {
        name: "Casey Miller",
        role: "Head of Ops",
        fitScore: 62,
        fitBadge: "Moderate",
        strengths: ["Organising & Executing", "Supporting & Cooperating"],
        developments: ["Creating & Conceptualising", "Adapting & Coping", "Enterprising & Performing"],
        callout:
          "Ops role compressed in an AI-first model — Casey's traditional execution strengths have diminished leverage.",
      },
      {
        name: "Morgan Chen",
        role: "Engineering Lead",
        fitScore: 90,
        fitBadge: "Strong",
        strengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"],
        developments: ["Leading & Deciding", "Interacting & Presenting"],
        callout:
          "Top fit in AI-Native scenario — Morgan's technical creativity and adaptability are the defining profile.",
      },
      {
        name: "Jamie Carter",
        role: "Growth Lead",
        fitScore: 84,
        fitBadge: "Strong",
        strengths: ["Enterprising & Performing", "Creating & Conceptualising", "Adapting & Coping"],
        developments: ["Organising & Executing", "Analysing & Interpreting"],
        callout:
          "AI-augmented growth stack elevates Jamie's creative and commercial instincts — strong scenario fit.",
      },
      {
        name: "Sam Parker",
        role: "Finance",
        fitScore: 72,
        fitBadge: "Moderate",
        strengths: ["Analysing & Interpreting", "Organising & Executing"],
        developments: ["Creating & Conceptualising", "Adapting & Coping", "Enterprising & Performing"],
        callout:
          "Routine finance tasks are heavily automated — Sam's analytical depth remains relevant but role scope narrows.",
      },
    ],
    orgStrengths: ["Creating & Conceptualising", "Analysing & Interpreting", "Adapting & Coping"],
    orgGaps: ["Supporting & Cooperating", "Organising & Executing", "Interacting & Presenting"],
    orgReadiness: 68,
  },
};

// ─── Accent Styles ────────────────────────────────────────────────────────────

const ACCENT: Record<
  Accent,
  {
    hex: string;
    text: string;
    softBg: string;
    softBorder: string;
    bar: string;
    glow: string;
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
    tabActive: "bg-amber-500/10 text-amber-300 border-amber-500/40",
  },
  indigo: {
    hex: "#6366f1",
    text: "text-indigo-300",
    softBg: "bg-indigo-500/[0.08]",
    softBorder: "border-indigo-500/40",
    bar: "bg-gradient-to-r from-indigo-500 to-indigo-300",
    glow: "shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]",
    tabActive: "bg-indigo-500/10 text-indigo-300 border-indigo-500/40",
  },
  cyan: {
    hex: "#06b6d4",
    text: "text-cyan-300",
    softBg: "bg-cyan-500/[0.06]",
    softBorder: "border-cyan-500/30",
    bar: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    glow: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]",
    tabActive: "bg-cyan-500/10 text-cyan-300 border-cyan-500/40",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(n: number) {
  if (n >= 80) return "text-emerald-300";
  if (n >= 60) return "text-amber-300";
  return "text-rose-300";
}

function heatCell(n: number) {
  if (n >= 80) return "bg-emerald-500/25 text-emerald-200";
  if (n >= 60) return "bg-amber-400/20 text-amber-200";
  return "bg-rose-500/30 text-rose-200";
}

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

function badgeStyles(badge: FitBadge) {
  if (badge === "Strong") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (badge === "Moderate") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  return "bg-rose-500/15 text-rose-300 border-rose-500/30";
}

// ─── Org Node ─────────────────────────────────────────────────────────────────

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
    <div className={`w-full rounded-lg border ${border} bg-[#0A0A0B] ${pad} flex items-start gap-1.5`}>
      <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <p className={`font-medium text-white truncate ${nameCls}`}>{name}</p>
        <p className={`text-zinc-500 truncate ${titleCls}`}>{title}</p>
      </div>
    </div>
  );
}

// ─── Section 1: Org Overview ──────────────────────────────────────────────────

function SectionOrgOverview() {
  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 1 · Org Overview
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Organization Structure
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          AtlasFlow Technologies — 42 people, B2B SaaS, Series A
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Headcount", value: "42", sub: "employees" },
          { label: "Departments", value: "8", sub: "functions" },
          { label: "Avg Tenure", value: "2.1 yrs", sub: "key leaders" },
          { label: "Mgmt Layers", value: "3", sub: "CEO → IC" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4 text-center"
          >
            <p className="font-mono text-2xl font-bold text-white">{s.value}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">{s.label}</p>
            <p className="text-[9px] text-zinc-600">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Founder bottleneck callout */}
      <div className="mb-8 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-rose-300">
            Founder Bottleneck Detected
          </p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">
            Alex Morgan (CEO) has{" "}
            <strong className="text-white">7 direct reports</strong> — spanning
            Engineering, Product, Operations, Growth, Sales, Customer Success, and
            Finance. Above the recommended 5–6 span for a growth-stage CEO,
            creating a structural bottleneck in strategic decision-making.
          </p>
        </div>
      </div>

      {/* Org chart */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 mb-6 overflow-x-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-5">
          Reporting Structure
        </p>
        <div className="min-w-[700px] text-xs">
          {/* CEO */}
          <div className="flex justify-center mb-1">
            <div className="flex flex-col items-center w-44">
              <OrgNode name="Alex Morgan" title="CEO · Founder" tone="red" large />
              <span className="mt-1 rounded-full border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[8px] text-rose-300">
                🔴 7 Direct Reports
              </span>
            </div>
          </div>
          {/* V-line down */}
          <div className="mx-auto h-5 w-px bg-zinc-700" />
          {/* Horizontal bar + columns */}
          <div className="relative flex justify-between px-2">
            <div className="absolute left-[8%] right-[8%] top-0 h-px bg-zinc-700" />
            {/* Jordan */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Jordan Lee" title="CTO" tone="red" />
              <span className="mt-0.5 rounded bg-rose-500/15 px-1 text-[7px] text-rose-300">
                Key-Person
              </span>
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Morgan Chen" title="Eng. Lead" />
            </div>
            {/* Taylor */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Taylor Brooks" title="Head of Product" />
            </div>
            {/* Casey */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Casey Miller" title="Head of Ops" tone="amber" />
              <span className="mt-0.5 rounded bg-amber-500/15 px-1 text-[7px] text-amber-300">
                Overloaded
              </span>
              <div className="h-3 w-px bg-zinc-700" />
              <div className="flex w-full gap-0.5">
                <div className="flex-1">
                  <OrgNode name="Sam P." title="Finance" tiny />
                </div>
                <div className="flex-1">
                  <OrgNode name="Dana R." title="People" tiny />
                </div>
              </div>
            </div>
            {/* Riley */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Riley Johnson" title="CS Lead" tone="amber" />
            </div>
            {/* Jamie */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Jamie Carter" title="Growth Lead" tone="amber" />
            </div>
            {/* Avery */}
            <div className="flex w-[14%] flex-col items-center">
              <div className="h-4 w-px bg-zinc-700" />
              <OrgNode name="Avery Wilson" title="Sales Mgr" tone="red" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom three-col detail */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Span of Control
          </p>
          <div className="space-y-2">
            {[
              { label: "Alex Morgan (CEO)", val: "7 direct", cls: "text-rose-300" },
              { label: "Casey Miller (Ops)", val: "3 direct", cls: "text-amber-300" },
              { label: "Jordan Lee (CTO)", val: "1 direct", cls: "text-emerald-300" },
              { label: "Others", val: "0 direct", cls: "text-zinc-400" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between text-xs">
                <span className="text-zinc-400">{r.label}</span>
                <span className={`font-mono font-semibold ${r.cls}`}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Department Coverage
          </p>
          <div className="space-y-1.5">
            {[
              "Engineering",
              "Product",
              "Operations",
              "Growth",
              "Sales",
              "Customer Success",
              "Finance",
              "People Ops",
            ].map((d) => (
              <div key={d} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                <span className="text-xs text-zinc-400">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Risk Signals
          </p>
          <div className="space-y-2">
            {[
              { label: "Founder Bottleneck", tone: "red" as const },
              { label: "Key-Person Dep. (CTO)", tone: "red" as const },
              { label: "Sales Leadership Gap", tone: "red" as const },
              { label: "Ownership Overlap", tone: "amber" as const },
              { label: "CS Handoff Risk", tone: "amber" as const },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${r.tone === "red" ? "bg-rose-500" : "bg-amber-400"}`}
                />
                <span
                  className={`text-xs ${r.tone === "red" ? "text-rose-300" : "text-amber-300"}`}
                >
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: People Analytics ──────────────────────────────────────────────

type PeopleFilter = "all" | "high-risk" | "strong";

function SectionPeopleAnalytics() {
  const [filter, setFilter] = useState<PeopleFilter>("all");

  const filtered = TEAM.filter((m) => {
    if (filter === "high-risk") return m.riskTone === "red";
    if (filter === "strong") return m.fitScore >= 80;
    return true;
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 2 · People Analytics
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Team Member Profiles
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Great 8 competency signals and role-fit scores for the 10 key team members.
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            { key: "all", label: "All Members" },
            { key: "high-risk", label: "High Risk" },
            { key: "strong", label: "Strong Performers" },
          ] as { key: PeopleFilter; label: string }[]
        ).map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              filter === f.key
                ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-200"
                : "border-[#1E1E24] text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-zinc-600">
          {filtered.length} of {TEAM.length} members
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((member) => (
          <PersonCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
}

function PersonCard({ member }: { member: TeamMember }) {
  // Show 6 of 8 competencies for the card
  const displayComps = member.competencies.slice(0, 6);
  const displayLabels = GREAT_8_SHORT.slice(0, 6);

  return (
    <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{member.name}</p>
          <p className="mt-0.5 text-[11px] text-zinc-500">{member.title}</p>
          <p className="mt-0.5 text-[10px] text-zinc-600">Tenure: {member.tenure}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-2xl font-bold tabular-nums leading-none ${scoreColor(member.fitScore)}`}>
            {member.fitScore}
          </p>
          <p className="mt-0.5 text-[9px] text-zinc-600">/100 fit</p>
        </div>
      </div>

      {/* Risk flag */}
      {member.riskFlag && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${
            member.riskTone === "red"
              ? "border-rose-500/30 bg-rose-500/10"
              : "border-amber-400/30 bg-amber-400/10"
          }`}
        >
          <AlertTriangle
            className={`h-3.5 w-3.5 shrink-0 ${member.riskTone === "red" ? "text-rose-400" : "text-amber-400"}`}
          />
          <span
            className={`text-[10px] font-medium ${member.riskTone === "red" ? "text-rose-300" : "text-amber-300"}`}
          >
            {member.riskFlag}
          </span>
        </div>
      )}

      {/* Competency bars */}
      <div className="space-y-2">
        {displayComps.map((val, i) => (
          <div key={displayLabels[i]}>
            <div className="flex items-baseline justify-between text-[11px]">
              <span className="text-zinc-400">{displayLabels[i]}</span>
              <span className={`font-mono font-semibold ${scoreColor(val)}`}>{val}</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className={`h-full rounded-full ${val >= 80 ? "bg-emerald-500" : val >= 60 ? "bg-amber-400" : "bg-rose-500"}`}
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 3: Competency Mapping ───────────────────────────────────────────

function SectionCompetencyMapping() {
  // Compute org-wide competency averages
  const orgAverages = GREAT_8.map((_, ci) => {
    const sum = TEAM.reduce((a, m) => a + m.competencies[ci], 0);
    return Math.round(sum / TEAM.length);
  });

  const sortedIdxAsc = [...orgAverages]
    .map((v, i) => ({ v, i }))
    .sort((a, b) => a.v - b.v);
  const topStrengths = [...sortedIdxAsc].reverse().slice(0, 3).map((x) => x.i);
  const criticalGaps = sortedIdxAsc.slice(0, 3).map((x) => x.i);

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 3 · Competency Mapping
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Great 8 Competency Heatmap
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Organization-wide competency scores across all 8 Great 8 dimensions.
          Green = strong (80+), amber = moderate (60–79), red = gap (&lt;60).
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-4 text-xs">
        {[
          { label: "Strong (80+)", bg: "bg-emerald-500/30", text: "text-emerald-300" },
          { label: "Moderate (60–79)", bg: "bg-amber-400/25", text: "text-amber-300" },
          { label: "Gap (<60)", bg: "bg-rose-500/30", text: "text-rose-300" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded ${l.bg}`} />
            <span className={l.text}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Heatmap table */}
      <div className="mb-8 overflow-x-auto rounded-xl border border-[#1E1E24] bg-[#0F0F12]">
        <table className="w-full min-w-[820px] text-xs">
          <thead>
            <tr className="border-b border-[#1E1E24] bg-[#0A0A0B]">
              <th className="sticky left-0 z-10 bg-[#0A0A0B] px-4 py-3 text-left font-medium text-zinc-500 min-w-[140px]">
                Team Member
              </th>
              {GREAT_8_SHORT.map((label) => (
                <th
                  key={label}
                  className="px-2 py-3 text-center text-[9px] font-semibold uppercase tracking-wider text-zinc-500"
                  style={{ minWidth: "72px" }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E24]">
            {TEAM.map((member) => (
              <tr key={member.name} className="hover:bg-white/[0.02]">
                <td className="sticky left-0 z-10 bg-[#0F0F12] px-4 py-2.5">
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-[9px] text-zinc-500">{member.title}</p>
                </td>
                {member.competencies.map((val, ci) => (
                  <td key={ci} className="px-1.5 py-2 text-center">
                    <span
                      className={`inline-block min-w-[42px] rounded px-2 py-1 text-[11px] font-mono font-semibold ${heatCell(val)}`}
                    >
                      {val}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            {/* Org average row */}
            <tr className="border-t border-white/10 bg-[#0A0A0B]">
              <td className="sticky left-0 z-10 bg-[#0A0A0B] px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Org Average
                </p>
              </td>
              {orgAverages.map((avg, ci) => (
                <td key={ci} className="px-1.5 py-2 text-center">
                  <span
                    className={`inline-block min-w-[42px] rounded px-2 py-1 text-[11px] font-mono font-bold ${heatCell(avg)}`}
                  >
                    {avg}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Strengths & Gaps */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            Top 3 Org Strengths
          </p>
          <div className="space-y-3">
            {topStrengths.map((idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-xs font-semibold text-emerald-200">{GREAT_8[idx]}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">
                    Org avg: {orgAverages[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Gaps */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-rose-400">
            Critical Gaps
          </p>
          <div className="space-y-3">
            {criticalGaps.map((idx) => (
              <div key={idx} className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <div>
                  <p className="text-xs font-semibold text-rose-200">{GREAT_8[idx]}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">
                    Org avg: {orgAverages[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap analysis callout */}
      <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-5">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
          Gap Analysis Callout
        </p>
        <div className="space-y-2 text-xs leading-relaxed text-zinc-300">
          <p>
            <strong className="text-white">Highest-risk mismatch:</strong> Avery
            Wilson (Sales Manager) scores 55 on Analysing &amp; Interpreting — the
            lowest individual score on a role where data-driven pipeline decisions
            are critical. Combined with no VP-level Sales oversight, this creates
            compounding execution risk.
          </p>
          <p>
            <strong className="text-white">Second-risk mismatch:</strong> Riley
            Johnson (CS Lead) scores 60 on Creating &amp; Conceptualising and 63 on
            Enterprising &amp; Performing — in a role that increasingly requires
            proactive renewal and upsell capability.
          </p>
          <p>
            <strong className="text-white">Leadership gap:</strong> Only Alex Morgan
            scores above 85 on Leading &amp; Deciding (92). No succession depth
            exists for the CEO function.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Section 4: Scenario Comparison ──────────────────────────────────────────

function SectionScenarioComparison() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("balanced");
  const scenario = SCENARIOS.find((s) => s.key === activeScenario) ?? null;

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 4 · Scenario Comparison
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Re-org Scenario Analysis
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Three restructure paths modeled for AtlasFlow — Lean, Balanced, and AI-Native.
          Balanced (B) is recommended.
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* Scenario tabs */}
      <div className="mb-8 flex flex-wrap gap-1">
        {SCENARIOS.map((s) => {
          const acc = ACCENT[s.accent];
          const isActive = activeScenario === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveScenario(s.key)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
                isActive ? `${acc.tabActive} border` : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-bold"
                style={{
                  color: isActive ? acc.hex : undefined,
                  backgroundColor: isActive ? `${acc.hex}22` : "transparent",
                  border: `1px solid ${isActive ? `${acc.hex}55` : "transparent"}`,
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
        <button
          type="button"
          onClick={() => setActiveScenario("compare")}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all ${
            activeScenario === "compare"
              ? "border-zinc-500/40 bg-zinc-500/10 text-zinc-200"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Compare All
        </button>
      </div>

      {activeScenario === "compare" ? (
        <CompareAllView />
      ) : scenario ? (
        <ScenarioDetailView scenario={scenario} />
      ) : null}
    </div>
  );
}

function ScenarioDetailView({ scenario }: { scenario: Scenario }) {
  const [bars, setBars] = useState(false);
  const acc = ACCENT[scenario.accent];
  const fitData =
    scenario.key === "lean" || scenario.key === "balanced" || scenario.key === "ai-native"
      ? FIT_DATA[scenario.key]
      : null;

  useEffect(() => {
    setBars(false);
    const t = setTimeout(() => setBars(true), 200);
    return () => clearTimeout(t);
  }, [scenario.key]);

  return (
    <div className="space-y-8">
      {/* Scenario header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg font-mono text-base font-bold"
          style={{
            color: acc.hex,
            backgroundColor: `${acc.hex}18`,
            border: `1px solid ${acc.hex}44`,
          }}
        >
          {scenario.letter}
        </div>
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: acc.hex }}
          >
            Scenario {scenario.letter}
          </p>
          <h3 className="text-xl font-bold tracking-tight text-white">{scenario.name}</h3>
        </div>
        {scenario.recommended && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-indigo-400/50 bg-indigo-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-100">
            <Sparkles className="h-3 w-3" />
            Recommended
          </span>
        )}
      </div>
      <p className={`text-sm ${acc.text}`}>{scenario.tagline}</p>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            Icon: TrendingDown,
            label: "Headcount change",
            value: scenario.headcountChange,
            sub: scenario.headcountDetail,
            cls: "text-amber-300",
          },
          {
            Icon: CheckCircle2,
            label: "Monthly savings",
            value: scenario.monthlySavings,
            sub: "estimated",
            cls: "text-emerald-300",
          },
          {
            Icon: Zap,
            label: "Execution speed",
            value: scenario.speed.split("(")[0].trim(),
            sub: undefined,
            cls: acc.text,
          },
          {
            Icon: AlertTriangle,
            label: "Risk level",
            value: scenario.risk,
            sub: "transition risk",
            cls: toneText(scenario.riskTone),
          },
        ].map((m) => (
          <div
            key={m.label}
            className="flex flex-col gap-1 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4"
          >
            <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
              <m.Icon className="h-3 w-3 opacity-60" />
              {m.label}
            </span>
            <span className={`text-lg font-bold ${m.cls}`}>{m.value}</span>
            {m.sub && <span className="text-[10px] text-zinc-500">{m.sub}</span>}
          </div>
        ))}
      </div>

      {/* Org changes + competency bars */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Org Changes
          </p>
          <ul className="space-y-3">
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
                  <div className="min-w-0">
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${cfg.text}`}>
                      {cfg.label}
                    </span>
                    <p className="mt-0.5 text-xs text-zinc-200">{c.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Competency Impact
          </p>
          <div className="space-y-4">
            {scenario.metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-zinc-300">{m.label}</span>
                  <span className={`font-mono font-semibold ${acc.text}`}>{m.value}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className={`h-full rounded-full ${acc.bar} transition-[width] duration-[1100ms] ease-out`}
                    style={{ width: bars ? `${m.value}%` : "0%" }}
                  />
                </div>
                {m.note && <p className="mt-1 text-[10px] italic text-zinc-500">{m.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tradeoffs + AI insight */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Key Tradeoffs
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">{scenario.tradeoffs}</p>
        </div>
        <div className={`rounded-xl border ${acc.softBorder} ${acc.softBg} p-5`}>
          <p className={`mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest ${acc.text}`}>
            <Sparkles className="h-3.5 w-3.5" />
            AI Insight
          </p>
          <p className="text-sm leading-relaxed text-zinc-200">{scenario.insight}</p>
        </div>
      </div>

      {/* Risk badge */}
      <div className={`flex items-center gap-4 rounded-xl border p-5 ${toneRing(scenario.riskTone)}`}>
        <span className={`h-3 w-3 shrink-0 rounded-full ${toneBg(scenario.riskTone)}`} />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-widest ${toneText(scenario.riskTone)}`}>
            {scenario.risk} Risk — Scenario {scenario.letter}
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            {scenario.riskTone === "green"
              ? "Low disruption. Suitable for teams that need steady improvement without losing momentum."
              : scenario.riskTone === "amber"
                ? "Moderate disruption. Requires careful transition management and 30-day stabilization plan."
                : "High disruption. Only appropriate if AI tooling investment is already in place."}
          </p>
        </div>
      </div>

      {/* Role-Competency Fit Panel */}
      {fitData && <RoleFitPanel fitData={fitData} accent={scenario.accent} />}
    </div>
  );
}

function RoleFitPanel({
  fitData,
  accent,
}: {
  fitData: ScenarioFitData;
  accent: Accent;
}) {
  const acc = ACCENT[accent];
  const readinessColor =
    fitData.orgReadiness >= 80
      ? { text: "text-emerald-300", bar: "bg-emerald-500" }
      : fitData.orgReadiness >= 65
        ? { text: "text-amber-300", bar: "bg-amber-400" }
        : { text: "text-rose-300", bar: "bg-rose-500" };

  return (
    <div className="space-y-6 border-t border-[#1E1E24] pt-8">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Role-Competency Fit
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">
            Individual fit scores — this scenario
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Great 8 competency signals mapped against role requirements.
          </p>
        </div>
        <div className="shrink-0 rounded-xl border border-[#1E1E24] bg-[#0F0F12] px-5 py-3 text-center">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">
            Org Readiness
          </p>
          <p className={`mt-1 text-4xl font-bold tabular-nums leading-none ${readinessColor.text}`}>
            {fitData.orgReadiness}
          </p>
          <p className="text-[10px] text-zinc-600">/100</p>
        </div>
      </div>

      {/* Org-level summary */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="text-zinc-400">Team readiness for this restructure</span>
          <span className={`font-mono font-bold ${readinessColor.text}`}>
            {fitData.orgReadiness}/100
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className={`h-full rounded-full ${readinessColor.bar}`}
            style={{ width: `${fitData.orgReadiness}%` }}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#1E1E24] pt-4 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
              Top Org Strengths
            </p>
            <div className="space-y-2">
              {fitData.orgStrengths.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-200">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-amber-400">
              Development Gaps
            </p>
            <div className="space-y-2">
              {fitData.orgGaps.map((g) => (
                <div
                  key={g}
                  className="flex items-center gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.07] px-3 py-2"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span className="text-xs font-medium text-amber-200">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member fit cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fitData.members.map((m) => (
          <div key={m.name} className="space-y-3 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{m.name}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">{m.role}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-2xl font-bold tabular-nums leading-none ${scoreColor(m.fitScore)}`}>
                  {m.fitScore}
                </p>
                <p className="text-[9px] text-zinc-600">/100</p>
                <span
                  className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${badgeStyles(m.fitBadge)}`}
                >
                  {m.fitBadge}
                </span>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
                Strengths
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-emerald-500/25 bg-emerald-500/[0.1] px-2 py-0.5 text-[10px] font-medium text-emerald-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-amber-400">
                Development Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.developments.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-amber-500/25 bg-amber-500/[0.1] px-2 py-0.5 text-[10px] font-medium text-amber-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className={`rounded-lg border ${acc.softBorder} ${acc.softBg} px-3 py-2`}>
              <p className={`text-[11px] leading-relaxed italic ${acc.text}`}>
                &ldquo;{m.callout}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareAllView() {
  const [bars, setBars] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBars(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      {/* Cards grid */}
      <div className="grid items-start gap-4 md:grid-cols-3">
        {SCENARIOS.map((s) => {
          const acc = ACCENT[s.accent];
          return (
            <div
              key={s.key}
              className={`relative rounded-xl border bg-[#0F0F12] p-5 ${
                s.recommended
                  ? `${acc.softBorder} ${acc.glow}`
                  : "border-[#1E1E24]"
              }`}
            >
              {s.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/50 bg-indigo-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-indigo-100 backdrop-blur">
                    <Sparkles className="h-3 w-3" />
                    Recommended
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm font-semibold"
                  style={{
                    color: acc.hex,
                    borderColor: `${acc.hex}55`,
                    backgroundColor: `${acc.hex}11`,
                  }}
                >
                  {s.letter}
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${toneRing(s.riskTone)} ${toneText(s.riskTone)}`}
                >
                  {s.risk} Risk
                </span>
              </div>
              <h4 className="mt-4 text-base font-semibold text-white">{s.name}</h4>
              <p className={`mt-1 text-xs ${acc.text}`}>{s.tagline}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#1E1E24] pt-3">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500">Headcount</p>
                  <p className={`mt-1 text-sm font-bold ${toneText("amber")}`}>{s.headcountChange}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-zinc-500">Monthly Savings</p>
                  <p className="mt-1 text-sm font-bold text-emerald-300">{s.monthlySavings}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {s.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400">{m.label}</span>
                      <span className={`font-mono font-semibold ${acc.text}`}>{m.value}%</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className={`h-full rounded-full ${acc.bar} transition-[width] duration-[1100ms] ease-out`}
                        style={{ width: bars ? `${m.value}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics table */}
      <div className="overflow-hidden rounded-xl border border-[#1E1E24] bg-[#0F0F12]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1E1E24] bg-[#0A0A0B]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Dimension
              </th>
              {SCENARIOS.map((s) => (
                <th
                  key={s.key}
                  className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: ACCENT[s.accent].hex }}
                >
                  {s.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E24] text-xs">
            <tr className="hover:bg-[#13131a]">
              <td className="px-5 py-3.5 font-medium text-zinc-400">Headcount</td>
              {SCENARIOS.map((s) => (
                <td key={s.key} className="px-5 py-3.5 text-center text-white">
                  {s.headcountDetail}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-[#13131a]">
              <td className="px-5 py-3.5 font-medium text-zinc-400">Monthly Savings</td>
              {SCENARIOS.map((s) => (
                <td key={s.key} className="px-5 py-3.5 text-center font-semibold text-emerald-300">
                  {s.monthlySavings}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-[#13131a]">
              <td className="px-5 py-3.5 font-medium text-zinc-400">Risk Level</td>
              {SCENARIOS.map((s) => (
                <td
                  key={s.key}
                  className={`px-5 py-3.5 text-center font-semibold ${toneText(s.riskTone)}`}
                >
                  {s.risk}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-[#13131a]">
              <td className="px-5 py-3.5 font-medium text-zinc-400">Org Readiness</td>
              {SCENARIOS.map((s) => {
                const rd =
                  s.key === "lean" ? 72 : s.key === "balanced" ? 84 : 68;
                return (
                  <td key={s.key} className={`px-5 py-3.5 text-center font-semibold ${scoreColor(rd)}`}>
                    {rd}/100
                  </td>
                );
              })}
            </tr>
            <tr className="hover:bg-[#13131a]">
              <td className="px-5 py-3.5 font-medium text-zinc-400">Recommended</td>
              {SCENARIOS.map((s) => (
                <td
                  key={s.key}
                  className={`px-5 py-3.5 text-center font-semibold ${s.recommended ? "text-indigo-300" : "text-zinc-600"}`}
                >
                  {s.recommended ? "✓ Yes" : "—"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Decision guidance */}
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Decision Guidance
            </p>
            <h3 className="mt-1.5 text-base font-bold text-white">
              Which scenario is right for AtlasFlow?
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>
                <span className="font-semibold text-amber-300">Scenario A (Lean)</span> is right if
                AtlasFlow needs to extend runway immediately and can absorb a short-term execution dip.
                It sacrifices adaptability for cash — a legitimate trade if board pressure is high.
              </p>
              <p>
                <span className="font-semibold text-indigo-300">Scenario B (Balanced)</span> is the
                recommended path. It achieves meaningful savings while retaining full leadership depth.
                The exits are low-fit — the organization gets stronger, not just smaller. Highest
                probability of success without morale damage.
              </p>
              <p>
                <span className="font-semibold text-cyan-300">Scenario C (AI-Native)</span> is only
                appropriate if AtlasFlow has already adopted AI tooling across engineering, sales, and
                support. Without that infrastructure in place, the headcount reduction creates execution
                gaps that outweigh the savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 5: Recommendations ──────────────────────────────────────────────

function SectionRecommendations() {
  const actions = [
    {
      num: 1,
      title: "Redistribute Alex Morgan's direct reports",
      priority: "Critical",
      affected: "CEO, Head of Ops, Head of Product",
      impact: "Reduces founder bottleneck — 7 → 4 direct reports",
      phase: "Immediate",
      tone: "red" as const,
    },
    {
      num: 2,
      title: "Define VP Sales or Head of Revenue role",
      priority: "Critical",
      affected: "Jamie Carter, Avery Wilson",
      impact: "Closes sales ownership gap — resolves pipeline ambiguity",
      phase: "Immediate",
      tone: "red" as const,
    },
    {
      num: 3,
      title: "Backfill CS Lead before AI-Native transition",
      priority: "High",
      affected: "Riley Johnson, Customer Success",
      impact: "Prevents churn risk during restructure window",
      phase: "30-day",
      tone: "amber" as const,
    },
    {
      num: 4,
      title: "Promote Taylor Brooks to VP Product scope",
      priority: "High",
      affected: "Taylor Brooks",
      impact: "Unlocks strategic product leadership — improves fit 70 → 85",
      phase: "30-day",
      tone: "amber" as const,
    },
    {
      num: 5,
      title: "Create engineering deputy or senior IC role under Jordan Lee",
      priority: "Medium",
      affected: "Jordan Lee, Morgan Chen",
      impact: "Reduces key-person dependency — Engineering resilience +30%",
      phase: "90-day",
      tone: "amber" as const,
    },
  ];

  const roadmap = [
    {
      phase: "Immediate",
      label: "0–30 days",
      accent: "border-rose-500/30 bg-rose-500/[0.05]",
      items: [
        "Reassign Growth Lead and Sales Manager to report to a new Revenue Lead",
        "Clarify CEO direct report structure — move Casey Miller to COO scope",
        "Document Sales ↔ CS handoff protocol",
      ],
    },
    {
      phase: "30-day",
      label: "30–60 days",
      accent: "border-amber-400/30 bg-amber-400/[0.05]",
      items: [
        "Promote Taylor Brooks to VP Product with expanded scope",
        "Hire Senior CS Lead (or promote Riley Johnson if fit confirmed)",
        "Implement weekly revenue leadership sync (Growth + Sales)",
      ],
    },
    {
      phase: "90-day",
      label: "60–90 days",
      accent: "border-indigo-500/30 bg-indigo-500/[0.05]",
      items: [
        "Evaluate Morgan Chen for Engineering Director elevation",
        "Review Alex Morgan's calendar — strategic work should be 70%+",
        "Run quarterly org health re-score to track improvement",
      ],
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 5 · Recommendations
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Top Recommendations
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Prioritized by impact. Ordered by urgency for AtlasFlow&rsquo;s current stage.
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* Action list */}
      <div className="mb-8 space-y-3">
        {actions.map((a) => {
          const numBg =
            a.tone === "red"
              ? "bg-rose-500/15 border-rose-400/40 text-rose-200"
              : "bg-amber-500/15 border-amber-400/40 text-amber-200";
          const priorityCls = a.tone === "red" ? "text-rose-400" : "text-amber-400";
          const phaseCls =
            a.phase === "Immediate"
              ? "bg-rose-500/20 text-rose-300"
              : a.phase === "30-day"
                ? "bg-amber-500/20 text-amber-300"
                : "bg-indigo-500/20 text-indigo-300";

          return (
            <div
              key={a.num}
              className="flex items-start gap-4 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${numBg}`}
              >
                {String(a.num).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{a.title}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${phaseCls}`}>
                    {a.phase}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-3">
                  <div>
                    <span className="text-zinc-500">Priority </span>
                    <span className={`font-medium ${priorityCls}`}>{a.priority}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Affected </span>
                    <span className="text-zinc-300">{a.affected}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Impact </span>
                    <span className="text-zinc-300">{a.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 90-day roadmap */}
      <div className="mb-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          90-Day Action Roadmap
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {roadmap.map((r) => (
            <div key={r.phase} className={`rounded-xl border p-5 ${r.accent}`}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {r.phase}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-white">{r.label}</p>
              <ul className="mt-3 space-y-2">
                {r.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    <span className="text-xs text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Board-ready summary */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
          Board-Ready Summary
        </p>
        <blockquote className="space-y-3 border-l-2 border-indigo-500 pl-5">
          <p className="text-sm leading-relaxed italic text-zinc-300">
            AtlasFlow Technologies is a well-resourced B2B SaaS company at a critical inflection point. The team has strong technical and product leadership under Jordan Lee and Taylor Brooks, but the operating model has not fully scaled with the organization. Alex Morgan continues to function as the de facto decision-maker across 7 direct report functions — a pattern that will compress strategic capacity as the company grows toward Series B.
          </p>
          <p className="text-sm leading-relaxed italic text-zinc-300">
            The primary structural risk is a sales ownership gap: no single leader owns the full revenue funnel from pipeline to retention. Growth and Sales operate in overlapping mandates without a revenue lead above them. Customer Success is isolated from the sales motion, creating churn exposure at the onboarding boundary. These are not performance issues — they are structural issues that require clear role definitions and reporting-line changes.
          </p>
          <p className="text-sm leading-relaxed italic text-zinc-300">
            OrgLens recommends the Balanced Redesign scenario (B): promote Taylor Brooks to VP Product, define a Revenue Lead above Growth and Sales, and clarify Casey Miller&rsquo;s mandate as COO scope. These three moves will reduce Alex Morgan&rsquo;s direct reports to 4, close the sales ownership gap, and increase the Org Readiness Score from 62 to an estimated 82+ within 90 days.
          </p>
        </blockquote>
      </div>
    </div>
  );
}

// ─── Section 6: Export & Next Steps ──────────────────────────────────────────

function SectionExport() {
  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400 mb-2">
          Section 6 · Export &amp; Next Steps
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Get the Full Report
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          This is a demo report for AtlasFlow Technologies. Run real analysis on
          your team for $49.
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
      </div>

      {/* CTA cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Download,
            title: "Download Full PDF Report",
            desc: "Formatted McKinsey-style org intelligence report — ready for board and investors.",
            locked: true,
          },
          {
            icon: ArrowRight,
            title: "Share with Board",
            desc: "Send a secure link to your board, co-founders, or advisors. No login required.",
            locked: true,
          },
          {
            icon: Users,
            title: "Upload Your Team Data",
            desc: "Import your HUCAMA psychometric reports or team spreadsheet to run real analysis.",
            locked: false,
          },
        ].map((c) => (
          <div key={c.title} className="relative rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
            {c.locked && (
              <span className="absolute right-3 top-3 rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[9px] text-zinc-500">
                Full report
              </span>
            )}
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
              <c.icon className="h-4.5 w-4.5 h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-white">{c.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{c.desc}</p>
            <a
              href={CHECKOUT_URL}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300"
            >
              {c.locked ? "Unlock →" : "Get started →"}
            </a>
          </div>
        ))}
      </div>

      {/* Paywall comparison */}
      <div className="mb-8 rounded-xl border border-[#1E1E24] bg-[#0F0F12] overflow-hidden">
        <div className="border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Demo vs Full Analysis
          </p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1E1E24]">
              <th className="px-5 py-3 text-left text-zinc-500 font-medium">Feature</th>
              <th className="px-5 py-3 text-center text-zinc-500 font-medium">Demo</th>
              <th className="px-5 py-3 text-center text-indigo-400 font-medium">Full — $49</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E1E24]">
            {[
              { label: "Org chart view", demo: true, full: true },
              { label: "10 key member profiles", demo: true, full: true },
              { label: "Great 8 competency heatmap", demo: true, full: true },
              { label: "3 re-org scenario comparison", demo: true, full: true },
              { label: "Role-competency fit analysis", demo: true, full: true },
              { label: "Based on your real team data", demo: false, full: true },
              { label: "HUCAMA psychometric parsing", demo: false, full: true },
              { label: "Custom scenario modeling", demo: false, full: true },
              { label: "PDF board-ready export", demo: false, full: true },
              { label: "Shareable report link", demo: false, full: true },
              { label: "Founder memo template", demo: false, full: true },
            ].map((row) => (
              <tr key={row.label} className="hover:bg-white/[0.02]">
                <td className="px-5 py-2.5 text-zinc-400">{row.label}</td>
                <td className="px-5 py-2.5 text-center">
                  {row.demo ? (
                    <span className="text-emerald-400">✓</span>
                  ) : (
                    <span className="text-zinc-700">—</span>
                  )}
                </td>
                <td className="px-5 py-2.5 text-center">
                  <span className="text-emerald-400">✓</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main CTA */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.1] to-[#0F0F12] p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Full Analysis
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
          Analyze Your Own Team — $49
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-zinc-400">
          Upload your team data and get a full org intelligence report in minutes.
          HUCAMA psychometric parsing, Great 8 mapping, 3 re-org scenarios, and a
          board-ready founder memo.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
        >
          Unlock Full Analysis — $49
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-xs text-zinc-500">One-time payment. Instant access.</p>
      </div>
    </div>
  );
}

// ─── Section Router ───────────────────────────────────────────────────────────

function renderSection(id: SectionId) {
  switch (id) {
    case "org-overview":
      return <SectionOrgOverview />;
    case "people-analytics":
      return <SectionPeopleAnalytics />;
    case "competency-mapping":
      return <SectionCompetencyMapping />;
    case "scenario-comparison":
      return <SectionScenarioComparison />;
    case "recommendations":
      return <SectionRecommendations />;
    case "export":
      return <SectionExport />;
    default:
      return <SectionOrgOverview />;
  }
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AppDemoPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("org-overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeNav = NAV_SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="flex h-screen overflow-hidden bg-[#13151f]">
      {/* ── Fixed Sidebar (desktop) ────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col bg-[#0f1117] md:flex">
        {/* Header */}
        <div className="border-b border-white/[0.06] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="text-sm font-bold tracking-tight text-white"
                >
                  OrgLens<span className="text-indigo-400">.</span>AI
                </Link>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-indigo-400">
                  Demo
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-white">
                AtlasFlow Technologies
              </p>
              <p className="text-[10px] text-zinc-500">42 People · B2B SaaS</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
            Report Sections
          </p>
          <div className="space-y-0.5">
            {NAV_SECTIONS.map((item) => {
              const isActive = activeSection === item.id;
              const { Icon } = item;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? "border-l-2 border-indigo-500 bg-indigo-500/10 text-indigo-200"
                      : "border-l-2 border-transparent text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                  }`}
                >
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-600"}`}
                  />
                  <div className="min-w-0">
                    <span className="flex items-center gap-1.5 text-xs font-medium leading-tight">
                      <span className="text-[9px] font-mono opacity-50">{item.num}.</span>
                      {item.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[10px] opacity-50">
                      {item.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* CTA */}
        <div className="border-t border-white/[0.06] p-4">
          <a
            href={CHECKOUT_URL}
            className="block w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            $49 — Full Analysis
          </a>
          <p className="mt-2 text-center text-[10px] text-zinc-600">
            One-time · Your real team data
          </p>
        </div>
      </aside>

      {/* ── Mobile sidebar overlay ──────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[260px] flex-col bg-[#0f1117]">
            <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
              <div>
                <p className="text-sm font-bold text-white">AtlasFlow Technologies</p>
                <p className="text-[10px] text-zinc-500">42 People · B2B SaaS</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-0.5">
                {NAV_SECTIONS.map((item) => {
                  const isActive = activeSection === item.id;
                  const { Icon } = item;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? "bg-indigo-500/15 text-indigo-200"
                          : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-600"}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
            <div className="border-t border-white/[0.06] p-4">
              <a
                href={CHECKOUT_URL}
                className="block w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-center text-xs font-semibold text-white"
              >
                $49 — Full Analysis
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main content area ──────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden md:ml-[260px]">
        {/* Top bar (mobile hamburger + breadcrumb + CTA) */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#0f1117] px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-zinc-500">
              <span className="hidden text-zinc-400 sm:inline">AtlasFlow Technologies / </span>
              {activeNav?.label}
            </p>
          </div>
          <a
            href={CHECKOUT_URL}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            <span className="hidden sm:inline">Unlock Full Analysis —</span> $49
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile section tab bar */}
        <div className="flex shrink-0 overflow-x-auto border-b border-white/[0.06] bg-[#0f1117] px-2 py-2 md:hidden">
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`mx-0.5 shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                {item.num}. {item.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-[#13151f]">
          {renderSection(activeSection)}

          {/* Footer CTA */}
          <div className="border-t border-white/[0.06] px-6 py-8">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.05] p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Want this for your real team?
              </p>
              <p className="mt-2 text-base font-bold text-white">
                Get the full OrgLens analysis — $49
              </p>
              <a
                href={CHECKOUT_URL}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
              >
                Get your report
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
