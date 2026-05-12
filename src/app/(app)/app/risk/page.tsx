"use client";

import {
  Lock,
  ArrowRight,
  AlertTriangle,
  Users,
  GitBranch,
  Flame,
  Zap,
  Crown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

function unlockAndGo(router: ReturnType<typeof useRouter>) {
  try {
    window.localStorage.setItem("orglens_report_unlocked", "true");
  } catch {
    // ignore
  }
  router.push("/app/report");
}

type Severity = "HIGH" | "MEDIUM" | "LOW";
type Tone = "red" | "amber" | "green" | "yellow";

interface RiskCard {
  id: string;
  number: number;
  category: string;
  title: string;
  severity: Severity;
  tone: Tone;
  affected: string[];
  body: string;
  impact: string;
  simulation?: string[];
  icon: ReactNode;
}

const risks: RiskCard[] = [
  {
    id: "leadership",
    number: 1,
    category: "Founder Risk",
    title: "Founder Bottleneck",
    severity: "HIGH",
    tone: "red",
    affected: ["Sales", "Leadership"],
    body: "Alex Morgan (Founder & CEO) is still driving strategic sales decisions at AtlasFlow Technologies. This prevents the company from building an independent revenue function.",
    impact: "If founder is unavailable → sales pipeline stalls immediately",
    icon: <Crown className="h-4 w-4" />,
  },
  {
    id: "execution",
    number: 2,
    category: "Sales Risk",
    title: "Sales Leadership Gap",
    severity: "HIGH",
    tone: "red",
    affected: ["Sales", "Growth"],
    body: "Jamie Carter (Growth Lead) and Avery Wilson (Sales Manager) split pipeline ownership without clear sales leadership coverage. Risk of conflicting priorities and missed targets.",
    impact:
      "Pipeline coverage may drop 30% without a defined sales ownership model",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "dependency",
    number: 3,
    category: "Dependency Risk",
    title: "Key-Person Dependency: CTO",
    severity: "HIGH",
    tone: "red",
    affected: ["Engineering", "Product"],
    body: "Jordan Lee (CTO) is the sole technical decision-maker at AtlasFlow. No successor identified. Morgan Chen is the strongest internal candidate but has not been developed for this role.",
    impact: "If CTO is unavailable",
    simulation: [
      "Product velocity drops 50–60%",
      "Technical architecture decisions stall",
      "Engineering Lead (Morgan Chen) faces leadership gap without support",
    ],
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    id: "burnout",
    number: 4,
    category: "Handoff Risk",
    title: "Customer Handoff Risk",
    severity: "MEDIUM",
    tone: "amber",
    affected: ["Sales", "Customer Success"],
    body: "The handoff from Sales to Customer Success (Riley Johnson) is undefined. Customers won by Sales may not receive timely onboarding, increasing early churn risk.",
    impact: "Early churn risk increases by estimated 25–35% without defined handoff SOP",
    icon: <Flame className="h-4 w-4" />,
  },
  {
    id: "conflict",
    number: 5,
    category: "Ownership Risk",
    title: "Ownership Gap: Growth / Sales / CS",
    severity: "MEDIUM",
    tone: "amber",
    affected: ["Growth", "Sales", "Customer Success"],
    body: "Unclear ownership boundary between Jamie Carter (Growth), Avery Wilson (Sales), and Riley Johnson (Customer Success). Role overlap creates execution friction and accountability gaps.",
    impact: "Cross-functional coordination score estimated at 5.8/10",
    icon: <Users className="h-4 w-4" />,
  },
];

const heatmapDepartments = ["Product", "Sales", "Operations", "Engineering"];
const heatmapRiskTypes = [
  "Leadership",
  "Execution",
  "Dependency",
  "Burnout",
  "Conflict",
];

// "g" green / "y" amber / "r" red
const heatmap: Array<("g" | "y" | "r")[]> = [
  // Product
  ["y", "y", "g", "r", "g"],
  // Sales
  ["r", "y", "y", "y", "y"],
  // Operations
  ["y", "r", "r", "y", "g"],
  // Engineering
  ["g", "g", "y", "y", "g"],
];

function cellClasses(c: "g" | "y" | "r") {
  if (c === "g") return "bg-emerald-500/20 border-emerald-500/40";
  if (c === "y") return "bg-amber-500/20 border-amber-500/40";
  return "bg-rose-500/25 border-rose-500/50";
}

function cellLabel(c: "g" | "y" | "r") {
  if (c === "g") return "Low";
  if (c === "y") return "Med";
  return "High";
}

function severityRing(t: Tone) {
  if (t === "red") return "border-rose-500/40 bg-rose-500/[0.08] text-rose-300";
  if (t === "amber")
    return "border-amber-500/40 bg-amber-500/[0.08] text-amber-300";
  if (t === "yellow")
    return "border-yellow-500/40 bg-yellow-500/[0.08] text-yellow-300";
  return "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300";
}

function severityDot(t: Tone) {
  if (t === "red") return "bg-rose-500";
  if (t === "amber") return "bg-amber-400";
  if (t === "yellow") return "bg-yellow-400";
  return "bg-emerald-500";
}

interface ScenarioRiskRow {
  label: string;
  scenarioA: string;
  scenarioB: string;
  scenarioC: string;
  toneA: "red" | "amber" | "green";
  toneB: "red" | "amber" | "green";
  toneC: "red" | "amber" | "green";
}

const scenarioRiskComparison: ScenarioRiskRow[] = [
  {
    label: "Leadership Risk",
    scenarioA: "↑ Worsens",
    scenarioB: "↓ Improves",
    scenarioC: "= Unchanged",
    toneA: "red",
    toneB: "green",
    toneC: "amber",
  },
  {
    label: "Execution Risk",
    scenarioA: "↑↑ Sharply worse",
    scenarioB: "↓ Improves",
    scenarioC: "↓ Improves",
    toneA: "red",
    toneB: "green",
    toneC: "green",
  },
  {
    label: "Dependency Risk",
    scenarioA: "↑↑ Sharply worse",
    scenarioB: "= Unchanged",
    scenarioC: "↓ Improves",
    toneA: "red",
    toneB: "amber",
    toneC: "green",
  },
];

function rowToneText(t: "red" | "amber" | "green") {
  if (t === "red") return "text-rose-300";
  if (t === "green") return "text-emerald-300";
  return "text-amber-300";
}

function rowToneBg(t: "red" | "amber" | "green") {
  if (t === "red") return "bg-rose-500/[0.08] border-rose-500/30";
  if (t === "green") return "bg-emerald-500/[0.08] border-emerald-500/30";
  return "bg-amber-500/[0.08] border-amber-500/30";
}

export default function RiskIntelligencePage() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Lens 4 — Organizational Risk Intelligence
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Organizational Risk Intelligence
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          Detect hidden structural and leadership risks before they become
          failures.
        </p>

        {/* Header summary stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Pill
            tone="red"
            label="3 high risks detected"
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
          />
          <Pill tone="amber" label="2 medium risks" />
          <Pill tone="yellow" label="1 low risk" />
          <Pill tone="green" label="2 succession gaps" />
        </div>
      </header>

      {/* Risk dashboard cards */}
      <section>
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Risk Dashboard
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Five risk types across your organization
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {risks.map((r) => (
            <article
              key={r.id}
              className={`rounded-2xl border ${
                r.tone === "red"
                  ? "border-rose-500/30"
                  : r.tone === "amber"
                    ? "border-amber-500/30"
                    : r.tone === "yellow"
                      ? "border-yellow-500/30"
                      : "border-emerald-500/30"
              } bg-[#111118] p-6 transition-all duration-300 hover:-translate-y-0.5`}
              style={{
                boxShadow:
                  r.tone === "red"
                    ? "0 0 50px -20px rgba(239,68,68,0.5)"
                    : r.tone === "amber"
                      ? "0 0 50px -20px rgba(245,158,11,0.4)"
                      : "0 0 30px -20px rgba(99,102,241,0.3)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                      r.tone === "red"
                        ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
                        : r.tone === "amber"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                          : r.tone === "yellow"
                            ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-300"
                            : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                      {r.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      {r.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${severityRing(r.tone)}`}
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle">
                    <span
                      className={`block h-full w-full rounded-full ${severityDot(r.tone)}`}
                    />
                  </span>
                  {r.severity}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {r.body}
              </p>

              <div className="mt-5 border-t border-[#1E1E24] pt-4">
                <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                  Affected
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {r.affected.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-[#1E1E24] bg-[#0A0A0B] px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {r.simulation ? (
                <div
                  className={`mt-4 rounded-lg border p-3 ${
                    r.tone === "red"
                      ? "border-rose-500/30 bg-rose-500/[0.06]"
                      : "border-amber-500/30 bg-amber-500/[0.06]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-medium uppercase tracking-widest ${
                      r.tone === "red" ? "text-rose-300" : "text-amber-300"
                    }`}
                  >
                    Simulation: {r.impact}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {r.simulation.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-xs text-zinc-300"
                      >
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    Predicted Impact
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-200">
                    {r.impact}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Heatmap */}
      <section className="mt-14">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Risk Heatmap
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Departments × Risk Types
        </h2>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
          <div
            className="grid min-w-[640px] gap-2"
            style={{
              gridTemplateColumns: `160px repeat(${heatmapRiskTypes.length}, minmax(0,1fr))`,
            }}
          >
            <div />
            {heatmapRiskTypes.map((t) => (
              <div
                key={t}
                className="text-center text-[10px] font-medium uppercase tracking-widest text-zinc-500"
              >
                {t}
              </div>
            ))}
            {heatmapDepartments.map((dept, di) => (
              <div key={dept} className="contents">
                <div className="flex items-center text-sm font-medium text-zinc-300">
                  {dept}
                </div>
                {heatmap[di].map((c, ci) => (
                  <div
                    key={ci}
                    className={`flex h-12 items-center justify-center rounded-md border text-[10px] font-medium uppercase tracking-widest ${cellClasses(c)} ${
                      c === "g"
                        ? "text-emerald-300"
                        : c === "y"
                          ? "text-amber-300"
                          : "text-rose-300"
                    }`}
                  >
                    {cellLabel(c)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-[#1E1E24] pt-4 text-xs text-zinc-500">
            <Legend tone="green" label="Low risk" />
            <Legend tone="amber" label="Medium risk" />
            <Legend tone="red" label="High risk" />
          </div>
        </div>
      </section>

      {/* Scenario risk comparison */}
      <section className="mt-14">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Scenario Risk Comparison
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          How each scenario affects your risk profile
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118]">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            <span>Risk type</span>
            <span className="text-amber-300">Scenario A · Lean</span>
            <span className="text-indigo-300">Scenario B · Balanced</span>
            <span className="text-cyan-300">Scenario C · AI-Augmented</span>
          </div>
          {scenarioRiskComparison.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-3 border-b border-[#1E1E24] px-5 py-4 last:border-0"
            >
              <span className="text-sm font-medium text-white">
                {row.label}
              </span>
              <ScenarioCell tone={row.toneA} value={row.scenarioA} />
              <ScenarioCell tone={row.toneB} value={row.scenarioB} />
              <ScenarioCell tone={row.toneC} value={row.scenarioC} />
            </div>
          ))}
        </div>
      </section>

      {/* Paywall */}
      <section className="relative mt-14">
        <div className="pointer-events-none select-none rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-8 blur-[3px]">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Predictive Risk Modeling · 90-day attrition probability per role
          </p>
          <div className="mt-6 grid gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-3"
              >
                <span className="h-3 w-32 rounded-full bg-white/10" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full ${
                      i % 3 === 0
                        ? "bg-rose-500"
                        : i % 2 === 0
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                    }`}
                    style={{ width: `${30 + i * 11}%` }}
                  />
                </div>
                <span className="h-3 w-10 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111118]/95 to-[#0A0A0B]/95 p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
              Predictive Risk Modeling locked
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Unlock 90-day attrition probability per role, succession-readiness
              scoring, and dependency simulation models.
            </p>
            <button
              type="button"
              onClick={() => unlockAndGo(router)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              $49 — Unlock Full Risk Report
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ScenarioCell({
  tone,
  value,
}: {
  tone: "red" | "amber" | "green";
  value: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium ${rowToneBg(tone)} ${rowToneText(tone)}`}
    >
      {value}
    </span>
  );
}

function Legend({
  tone,
  label,
}: {
  tone: "green" | "amber" | "red";
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded ${
          tone === "green"
            ? "bg-emerald-500/80"
            : tone === "amber"
              ? "bg-amber-400/80"
              : "bg-rose-500/80"
        }`}
      />
      <span>{label}</span>
    </div>
  );
}

function Pill({
  tone,
  label,
  icon,
}: {
  tone: Tone;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${severityRing(tone)}`}
    >
      {icon}
      {label}
    </span>
  );
}
