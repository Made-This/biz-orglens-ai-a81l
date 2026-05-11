"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Cpu,
} from "lucide-react";

function unlockAndGo(router: ReturnType<typeof useRouter>) {
  try {
    window.localStorage.setItem("orglens_report_unlocked", "true");
  } catch {
    // ignore
  }
  router.push("/app/report");
}

type ScenarioKey = "A" | "B" | "C";
type Tone = "green" | "amber" | "red" | "cyan";

interface ScenarioMeta {
  key: ScenarioKey;
  name: string;
  tagline: string;
  accentHex: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  accentBar: string;
  recommended?: boolean;
}

const scenarios: Record<ScenarioKey, ScenarioMeta> = {
  A: {
    key: "A",
    name: "Lean",
    tagline: "Founder-led · 15-person core team · removes leadership layer",
    accentHex: "#f59e0b",
    accentText: "text-amber-300",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/[0.08]",
    accentBar: "bg-gradient-to-r from-amber-500 to-amber-300",
  },
  B: {
    key: "B",
    name: "Balanced",
    tagline: "28-person structure with clear functional leads",
    accentHex: "#6366f1",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-500/40",
    accentBg: "bg-indigo-500/[0.08]",
    accentBar: "bg-gradient-to-r from-indigo-500 to-indigo-300",
    recommended: true,
  },
  C: {
    key: "C",
    name: "AI-Native",
    tagline: "3 senior leads · AI handles ops, analytics, and workflows",
    accentHex: "#06b6d4",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-500/40",
    accentBg: "bg-cyan-500/[0.08]",
    accentBar: "bg-gradient-to-r from-cyan-500 to-cyan-300",
  },
};

interface ScenarioOverview {
  headcount: { from: number; to: number; deltaPct: string };
  primaryStat: { label: string; value: string };
  secondaryStat: { label: string; value: string; tone: Tone };
  description: string;
}

const overviews: Record<ScenarioKey, ScenarioOverview> = {
  A: {
    headcount: { from: 28, to: 15, deltaPct: "−46%" },
    primaryStat: { label: "Operating cost", value: "↓ 38%" },
    secondaryStat: { label: "Execution risk", value: "HIGH", tone: "red" },
    description:
      "NovaCloud consolidates to a 15-person core team, founder directly manages all functions. Higher founder dependency.",
  },
  B: {
    headcount: { from: 28, to: 28, deltaPct: "= 0%" },
    primaryStat: { label: "Leadership coverage", value: "↑ 18%" },
    secondaryStat: {
      label: "Execution stability",
      value: "STRONG",
      tone: "green",
    },
    description:
      "NovaCloud maintains 28-person structure with clear functional leads and shared accountability.",
  },
  C: {
    headcount: { from: 28, to: 22, deltaPct: "−21%" },
    primaryStat: { label: "Productivity (post 90d)", value: "↑ 40%" },
    secondaryStat: {
      label: "Transition risk",
      value: "MEDIUM",
      tone: "amber",
    },
    description:
      "NovaCloud adopts an AI-augmented model with 3 senior leads, AI tools handling ops and analytics.",
  },
};

interface OrgNode {
  name: string;
  role: string;
  tone: "green" | "amber" | "red";
  badge?: "PROMOTED" | "EXIT" | "AI-AUGMENTED" | "NEW ROLE";
  ai?: boolean;
}

interface OrgGroup {
  parent: OrgNode;
  children: OrgNode[];
}

interface OrgChart {
  ceo: OrgNode;
  groups: OrgGroup[];
  exits: string[];
  label?: string;
}

const orgCharts: Record<ScenarioKey, OrgChart> = {
  A: {
    ceo: { name: "Alex Morgan", role: "Founder & CEO", tone: "green" },
    label: "Founder-led · leadership layer removed",
    groups: [
      {
        parent: {
          name: "Jordan Lee",
          role: "CTO · Product",
          tone: "green",
        },
        children: [
          { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
          { name: "Taylor Brooks", role: "Head of Product", tone: "green" },
        ],
      },
      {
        parent: { name: "Marcus Wright", role: "Sales Lead", tone: "amber" },
        children: [
          { name: "Lucas Kim", role: "Account Executive", tone: "amber" },
        ],
      },
      {
        parent: { name: "Casey Miller", role: "Ops Lead", tone: "amber" },
        children: [{ name: "Support", role: "Support", tone: "amber" }],
      },
    ],
    exits: [
      "Elena Torres",
      "Sophia Grant",
      "Noah Davis",
      "+10 roles consolidated across teams",
    ],
  },
  B: {
    ceo: { name: "Alex Morgan", role: "Founder & CEO", tone: "green" },
    groups: [
      {
        parent: { name: "Jordan Lee", role: "CTO · Engineering", tone: "green" },
        children: [
          { name: "Morgan Chen", role: "Engineering Lead", tone: "green" },
          { name: "Taylor Brooks", role: "Head of Product", tone: "green" },
          { name: "Sophia Grant", role: "UX Designer", tone: "amber" },
        ],
      },
      {
        parent: {
          name: "Riley Johnson",
          role: "Customer Success Lead",
          tone: "green",
          badge: "PROMOTED",
        },
        children: [
          { name: "Zoe Chambers", role: "Onboarding Specialist", tone: "amber" },
          { name: "Caden Brooks", role: "CS Manager", tone: "amber" },
        ],
      },
      {
        parent: {
          name: "Casey Miller",
          role: "Head of Operations",
          tone: "green",
          badge: "NEW ROLE",
        },
        children: [
          { name: "Avery Wilson", role: "Clinical Ops Lead", tone: "amber" },
          { name: "Isabella Park", role: "Executive Assistant", tone: "amber" },
        ],
      },
    ],
    exits: ["Elena Torres role reshaped", "2 redundant support roles", "1 mid-management layer"],
  },
  C: {
    ceo: { name: "Alex Morgan", role: "Founder & CEO", tone: "green" },
    label: "AI-augmented workflows",
    groups: [
      {
        parent: {
          name: "Jordan Lee",
          role: "CTO · Engineering",
          tone: "green",
          badge: "AI-AUGMENTED",
          ai: true,
        },
        children: [
          {
            name: "Morgan Chen",
            role: "Engineering Lead",
            tone: "green",
            badge: "AI-AUGMENTED",
            ai: true,
          },
          { name: "Taylor Brooks", role: "Head of Product", tone: "green" },
        ],
      },
      {
        parent: {
          name: "Riley Johnson",
          role: "Customer Success Lead",
          tone: "green",
          badge: "AI-AUGMENTED",
          ai: true,
        },
        children: [
          { name: "Caden Brooks", role: "CS Manager", tone: "amber" },
        ],
      },
      {
        parent: {
          name: "Casey Miller",
          role: "Head of Operations",
          tone: "green",
          badge: "AI-AUGMENTED",
          ai: true,
        },
        children: [
          { name: "AI Ops Layer", role: "Automation", tone: "green", ai: true },
        ],
      },
    ],
    exits: [
      "Elena Torres",
      "Noah Davis",
      "Sophia Grant",
      "+4 ops roles replaced by AI",
    ],
  },
};

interface ImpactRow {
  dimension: string;
  before: string;
  after: string;
  change: string;
  delta: number; // 0..100 progress for the After bar
  tone: "green" | "amber" | "red";
}

const competencyImpact: Record<ScenarioKey, ImpactRow[]> = {
  A: [
    {
      dimension: "Leadership Coverage",
      before: "58%",
      after: "41%",
      change: "▼ −17%",
      delta: 41,
      tone: "red",
    },
    {
      dimension: "Execution Stability",
      before: "Medium",
      after: "Weak",
      change: "▼ Reduced",
      delta: 38,
      tone: "red",
    },
    {
      dimension: "Adaptability",
      before: "Low in Ops",
      after: "Reduced",
      change: "▼ Reduced",
      delta: 44,
      tone: "amber",
    },
    {
      dimension: "Org Fragility",
      before: "High",
      after: "Severe",
      change: "▼ Worse",
      delta: 30,
      tone: "red",
    },
  ],
  B: [
    {
      dimension: "Leadership Coverage",
      before: "58%",
      after: "74%",
      change: "▲ +16%",
      delta: 74,
      tone: "green",
    },
    {
      dimension: "Execution Stability",
      before: "Medium",
      after: "Strong",
      change: "▲ Improved",
      delta: 82,
      tone: "green",
    },
    {
      dimension: "Adaptability",
      before: "Low in Ops",
      after: "Balanced",
      change: "▲ Improved",
      delta: 70,
      tone: "green",
    },
    {
      dimension: "Org Fragility",
      before: "High",
      after: "Reduced",
      change: "▲ Improved",
      delta: 68,
      tone: "green",
    },
  ],
  C: [
    {
      dimension: "Leadership Coverage",
      before: "58%",
      after: "62%",
      change: "▲ +4%",
      delta: 62,
      tone: "amber",
    },
    {
      dimension: "Execution Stability",
      before: "Medium",
      after: "Medium",
      change: "= Maintained",
      delta: 58,
      tone: "amber",
    },
    {
      dimension: "Adaptability",
      before: "Low in Ops",
      after: "High (AI)",
      change: "▲ Improved",
      delta: 88,
      tone: "green",
    },
    {
      dimension: "Org Fragility",
      before: "High",
      after: "Transition risk",
      change: "= Shifted",
      delta: 50,
      tone: "amber",
    },
  ],
};

interface AIInsight {
  tone: "good" | "warn" | "bad";
  text: string;
}

const aiInsights: Record<ScenarioKey, { items: AIInsight[]; why: string }> = {
  A: {
    items: [
      { tone: "warn", text: "High founder dependency — Alex Morgan manages all functions" },
      { tone: "bad", text: "Leadership coverage drops to 41%" },
      { tone: "bad", text: "Clinical operations fragility increases significantly" },
    ],
    why: "Lean consolidates NovaCloud into a 15-person founder-led team. Cuts cost quickly but removes the leadership layer that lets the company scale beyond Alex Morgan's direct attention.",
  },
  B: {
    items: [
      {
        tone: "good",
        text: "Leadership continuity maintained — Riley Johnson elevated to Customer Success Lead",
      },
      {
        tone: "good",
        text: "Execution reliability improved — core engineering and product team preserved",
      },
      {
        tone: "warn",
        text: "Moderate adaptability gaps remain in Clinical Operations",
      },
      {
        tone: "warn",
        text: "Acting with Consideration is still a team-wide development gap (avg 4.8)",
      },
    ],
    why: "Balanced preserves NovaCloud's strongest leads (Jordan Lee, Morgan Chen, Taylor Brooks, Casey Miller) while building functional accountability across 28 employees. Riley Johnson's promotion closes a key customer success coverage gap.",
  },
  C: {
    items: [
      { tone: "good", text: "Highest productivity potential at 90-day mark" },
      {
        tone: "warn",
        text: "Highest transition risk — requires AI tooling adoption across ops and analytics",
      },
      { tone: "warn", text: "4 ops & analytics roles restructured with AI augmentation" },
    ],
    why: "AI-Native bets on tooling-led leverage. With three senior leads (Jordan Lee, Taylor Brooks, Casey Miller) and AI handling ops and analytics, productivity peaks at +40% post-transition — but the org carries the highest change-management risk during the 90-day adoption window.",
  },
};

function toneBg(t: Tone) {
  if (t === "green") return "bg-emerald-500";
  if (t === "amber") return "bg-amber-400";
  if (t === "cyan") return "bg-cyan-400";
  return "bg-rose-500";
}

function toneText(t: Tone) {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  if (t === "cyan") return "text-cyan-300";
  return "text-rose-300";
}

function toneRing(t: Tone) {
  if (t === "green") return "border-emerald-500/30 bg-emerald-500/[0.08]";
  if (t === "amber") return "border-amber-400/30 bg-amber-400/[0.08]";
  if (t === "cyan") return "border-cyan-500/30 bg-cyan-500/[0.08]";
  return "border-rose-500/30 bg-rose-500/[0.08]";
}

export default function OverviewPage() {
  const router = useRouter();
  const [active, setActive] = useState<ScenarioKey>("B");
  const [animateBars, setAnimateBars] = useState(false);

  // Re-trigger bar fill on scenario change
  useEffect(() => {
    setAnimateBars(false);
    const t = setTimeout(() => setAnimateBars(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  const meta = scenarios[active];
  const overview = overviews[active];
  const chart = orgCharts[active];
  const impact = competencyImpact[active];
  const insights = aiInsights[active];

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageStyles />

      {/* Header */}
      <header className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Organizational Intelligence Report
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          NovaCloud Health — Health Tech Startup
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
          <Stat label="Stage" value="Seed → Series A" />
          <Sep />
          <Stat label="Sector" value="B2B SaaS · Health Tech" />
          <Sep />
          <Stat label="Team" value="28 employees" />
        </div>
        <div className="mt-6 max-w-2xl rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-300">
            Founder Challenge
          </p>
          <p className="mt-1 text-sm italic text-zinc-200">
            &ldquo;Move from founder-led execution to a structured leadership model — and understand whether team structure, role coverage, and competency signals are ready to support scaling.&rdquo;
          </p>
        </div>
      </header>

      {/* Scenario tabs */}
      <div className="mb-8">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Choose a scaling path
        </p>
        <div className="flex flex-wrap gap-2">
          {(["A", "B", "C"] as const).map((k) => {
            const s = scenarios[k];
            const isActive = active === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setActive(k)}
                className={`group relative flex items-center gap-3 rounded-xl border px-5 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? `${s.accentBorder} ${s.accentBg}`
                    : "border-[#1E1E24] bg-[#111118] hover:border-zinc-700"
                }`}
                style={
                  isActive
                    ? {
                        boxShadow: `0 0 40px -12px ${s.accentHex}80`,
                      }
                    : undefined
                }
              >
                {s.recommended && (
                  <span className="recommended-badge absolute -top-2.5 right-3 rounded-full border border-indigo-400/50 bg-indigo-500/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-indigo-100">
                    Recommended
                  </span>
                )}
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-[#0A0A0B] font-mono text-sm font-semibold"
                  style={{
                    color: s.accentHex,
                    borderColor: `${s.accentHex}55`,
                  }}
                >
                  {s.key}
                </span>
                <span className="flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    Scenario {k} — {s.name}
                  </span>
                  <span className={`text-[11px] ${s.accentText}`}>
                    {s.tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario overview cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {(["A", "B", "C"] as const).map((k) => {
          const s = scenarios[k];
          const o = overviews[k];
          const isActive = active === k;
          return (
            <div
              key={k}
              onClick={() => setActive(k)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(k);
                }
              }}
              className={`scenario-card cursor-pointer rounded-2xl border bg-[#111118] p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                isActive
                  ? `${s.accentBorder}`
                  : "border-[rgba(99,102,241,0.15)]"
              }`}
              style={
                isActive
                  ? {
                      boxShadow: `0 0 50px -15px ${s.accentHex}80`,
                    }
                  : undefined
              }
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`text-[10px] font-medium uppercase tracking-widest ${s.accentText}`}
                  >
                    Scenario {k}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {s.name}
                  </h3>
                </div>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${toneRing(
                    o.secondaryStat.tone
                  )} ${toneText(o.secondaryStat.tone)}`}
                >
                  {o.secondaryStat.value}
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t border-[#1E1E24] pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Headcount
                  </span>
                  <span className="font-mono text-sm text-zinc-200">
                    {o.headcount.from} → {o.headcount.to}{" "}
                    <span className={s.accentText}>
                      ({o.headcount.deltaPct})
                    </span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                    {o.primaryStat.label}
                  </span>
                  <span className="font-mono text-sm text-emerald-300">
                    {o.primaryStat.value}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                    {o.secondaryStat.label}
                  </span>
                  <span
                    className={`font-mono text-sm ${toneText(
                      o.secondaryStat.tone
                    )}`}
                  >
                    {o.secondaryStat.value}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                {o.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dynamic Org Chart Preview */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Org Chart Preview
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
              Scenario {active} — {meta.name}
            </h2>
          </div>
          {chart.label && (
            <span className={`text-xs ${meta.accentText}`}>{chart.label}</span>
          )}
        </div>

        <div className="mt-5 rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6 md:p-8">
          {/* CEO */}
          <div className="flex flex-col items-center">
            <OrgNodeCard node={chart.ceo} large />
            <div className="my-3 h-5 w-px bg-[#1E1E24]" />
          </div>

          {/* VP row */}
          <div className="relative">
            <div className="absolute left-[8%] right-[8%] top-0 hidden h-px bg-[#1E1E24] md:block" />
            <div className="grid gap-5 md:grid-cols-3">
              {chart.groups.map((g, gi) => (
                <div key={gi} className="flex flex-col items-center">
                  <div className="hidden h-3 w-px bg-[#1E1E24] md:block" />
                  <OrgNodeCard node={g.parent} />
                  <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                  <div className="w-full space-y-2">
                    {g.children.map((c, ci) => (
                      <OrgNodeCard key={ci} node={c} compact />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exits */}
          {chart.exits.length > 0 && (
            <div className="mt-8 border-t border-[#1E1E24] pt-5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Exits
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {chart.exits.map((e) => (
                  <span
                    key={e}
                    className="rounded-md border border-rose-500/30 bg-rose-500/[0.08] px-2.5 py-1 text-xs text-rose-300 line-through"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Competency Impact */}
      <section className="mt-12">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Competency Impact Analysis
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Before vs After — Scenario {active}
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118]">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-3 border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500 md:grid-cols-[1.4fr_0.8fr_2fr_1fr]">
            <span>Dimension</span>
            <span>Before</span>
            <span>After</span>
            <span className="text-right">Change</span>
          </div>
          {impact.map((row) => (
            <div
              key={row.dimension}
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center gap-3 border-b border-[#1E1E24] px-5 py-4 last:border-0 md:grid-cols-[1.4fr_0.8fr_2fr_1fr]"
            >
              <span className="text-sm font-medium text-white">
                {row.dimension}
              </span>
              <span className="text-sm text-zinc-500">{row.before}</span>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full ${meta.accentBar} transition-[width] duration-[1100ms] ease-out`}
                    style={{ width: animateBars ? `${row.delta}%` : "0%" }}
                  />
                </div>
                <span
                  className={`shrink-0 text-xs font-medium ${toneText(row.tone)}`}
                >
                  {row.after}
                </span>
              </div>
              <span
                className={`text-right text-xs font-medium ${toneText(row.tone)}`}
              >
                {row.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Insights Panel */}
      <section className="mt-12">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          AI Insights
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          What this scenario tells us
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
            <ul className="space-y-3">
              {insights.items.map((it, i) => (
                <li key={i} className="flex items-start gap-3">
                  {it.tone === "good" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  ) : it.tone === "warn" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  )}
                  <span className="text-sm text-zinc-200">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-2xl border ${meta.accentBorder} ${meta.accentBg} p-6`}
          >
            <p
              className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest ${meta.accentText}`}
            >
              <Sparkles className="h-3 w-3" />
              Why Scenario {active}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {insights.why}
            </p>
          </div>
        </div>
      </section>

      {/* Paywall */}
      <section className="mt-14">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111118] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Your Organization
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Run This Analysis on Your Own Team
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            Get a complete organizational intelligence decision report, founder
            memo, and scaling roadmap built from your team.
          </p>
          <button
            type="button"
            onClick={() => unlockAndGo(router)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
          >
            Get My Custom OrgLens Analysis
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-xs text-zinc-500">
            Built from your team. Delivered in minutes.
          </p>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="text-[10px] uppercase tracking-widest text-zinc-500">
        {label}
      </span>
      <span className="font-mono text-sm font-semibold text-white">
        {value}
      </span>
    </span>
  );
}

function Sep() {
  return <span className="text-zinc-700">·</span>;
}

function OrgNodeCard({
  node,
  large,
  compact,
}: {
  node: OrgNode;
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
      className={`relative flex w-full max-w-[280px] items-center justify-between gap-3 rounded-xl border bg-[#0A0A0B] transition-colors ${
        node.ai
          ? "border-cyan-500/30 bg-cyan-500/[0.04]"
          : "border-[#1E1E24]"
      } ${large ? "px-5 py-3" : compact ? "px-3 py-2" : "px-4 py-2.5"}`}
    >
      <div className="flex min-w-0 items-center gap-3">
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

      {node.badge && (
        <span
          className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest ${
            node.badge === "PROMOTED"
              ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300"
              : node.badge === "NEW ROLE"
                ? "border-indigo-500/30 bg-indigo-500/[0.08] text-indigo-300"
                : node.badge === "AI-AUGMENTED"
                  ? "border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300"
                  : "border-rose-500/30 bg-rose-500/[0.08] text-rose-300"
          }`}
        >
          {node.badge === "AI-AUGMENTED" ? (
            <span className="inline-flex items-center gap-1">
              <Cpu className="h-2.5 w-2.5" /> AI
            </span>
          ) : (
            node.badge
          )}
        </span>
      )}
    </div>
  );
}

function PageStyles() {
  return (
    <style>{`
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
      @keyframes scenarioFadeIn {
        0% { opacity: 0; transform: translateY(8px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .scenario-card {
        animation: scenarioFadeIn 350ms ease-out both;
      }
    `}</style>
  );
}
