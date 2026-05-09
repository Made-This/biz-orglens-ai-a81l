import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type RiskTone = "green" | "amber" | "red";

interface Scenario {
  letter: string;
  name: string;
  headcount: string;
  cost: string;
  speed: string;
  risk: string;
  riskTone: RiskTone;
  recommended?: boolean;
}

const scenarios: Scenario[] = [
  {
    letter: "A",
    name: "Lean Efficiency",
    headcount: "−22%",
    cost: "−$99K/mo",
    speed: "Fast",
    risk: "High",
    riskTone: "red",
  },
  {
    letter: "B",
    name: "Balanced Redesign",
    headcount: "−12%",
    cost: "−$54K/mo",
    speed: "Moderate",
    risk: "Medium",
    riskTone: "amber",
    recommended: true,
  },
  {
    letter: "C",
    name: "AI-Native",
    headcount: "−8%",
    cost: "−$36K/mo",
    speed: "Slow",
    risk: "Low",
    riskTone: "green",
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

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-[1400px]">
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
          <div className="grid gap-5 md:grid-cols-3">
            {scenarios.map((s) => (
              <ScenarioCard key={s.letter} {...s} />
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
  letter,
  name,
  headcount,
  cost,
  speed,
  risk,
  riskTone,
  recommended,
}: Scenario) {
  return (
    <div
      className={`relative rounded-2xl border p-6 transition-all ${
        recommended
          ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]"
          : "border-[#1E1E24] bg-[#111113]"
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-indigo-300 backdrop-blur">
            Recommended
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1E1E24] bg-[#0A0A0B] font-mono text-xs text-zinc-400">
          {letter}
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${toneRing(
            riskTone
          )} ${toneText(riskTone)}`}
        >
          Risk · {risk}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        Scenario {letter} — {name}
      </h3>

      <dl className="mt-6 space-y-3 text-sm">
        <Row label="Headcount" value={headcount} />
        <Row label="Cost impact" value={cost} valueColor="text-emerald-300" />
        <Row label="Execution speed" value={speed} />
        <Row label="Risk level" value={risk} valueColor={toneText(riskTone)} />
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#1E1E24] pt-3 first:border-0 first:pt-0">
      <span className="text-zinc-500">{label}</span>
      <span className={`font-mono ${valueColor ?? "text-zinc-200"}`}>
        {value}
      </span>
    </div>
  );
}
