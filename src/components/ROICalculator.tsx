"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";

type TeamSize = "10-20" | "21-50" | "51-100" | "101-150";
type Managers = "1-2" | "3-5" | "6-10" | "10+";
type Hires = "0" | "1-2" | "3-5" | "5+";
type FounderBottleneck = "yes" | "no" | "partially";
type RoleClarity = "yes" | "no" | "unsure";
type Transition =
  | "hiring-senior"
  | "restructuring"
  | "fundraising"
  | "promotion"
  | "none";

type Level = "low" | "medium" | "high";

const TEAM_SIZE_OPTIONS: { value: TeamSize; label: string }[] = [
  { value: "10-20", label: "10–20" },
  { value: "21-50", label: "21–50" },
  { value: "51-100", label: "51–100" },
  { value: "101-150", label: "101–150" },
];

const MANAGER_OPTIONS: { value: Managers; label: string }[] = [
  { value: "1-2", label: "1–2" },
  { value: "3-5", label: "3–5" },
  { value: "6-10", label: "6–10" },
  { value: "10+", label: "10+" },
];

const HIRE_OPTIONS: { value: Hires; label: string }[] = [
  { value: "0", label: "0" },
  { value: "1-2", label: "1–2" },
  { value: "3-5", label: "3–5" },
  { value: "5+", label: "5+" },
];

const TRANSITION_OPTIONS: { value: Transition; label: string }[] = [
  { value: "hiring-senior", label: "Hiring senior role" },
  { value: "restructuring", label: "Restructuring" },
  { value: "fundraising", label: "Fundraising / board review" },
  { value: "promotion", label: "Promotion" },
  { value: "none", label: "None" },
];

function teamSizeBucket(size: TeamSize): "10-20" | "21-50" | "51+" {
  if (size === "10-20") return "10-20";
  if (size === "21-50") return "21-50";
  return "51+";
}

function managerCountToNumber(m: Managers): number {
  switch (m) {
    case "1-2":
      return 2;
    case "3-5":
      return 5;
    case "6-10":
      return 10;
    case "10+":
      return 12;
  }
}

function compute(
  teamSize: TeamSize,
  managers: Managers,
  founderBottleneck: FounderBottleneck,
  roleClarity: RoleClarity,
  transitions: Set<Transition>,
): {
  orgRisk: Level;
  founderExposure: Level;
  leadershipRisk: Level;
  urgency: Level;
} {
  const size = teamSizeBucket(teamSize);
  const hasClarityProblems = roleClarity === "yes" || roleClarity === "unsure";
  const hasMajorTransition =
    transitions.has("hiring-senior") ||
    transitions.has("restructuring") ||
    transitions.has("fundraising") ||
    transitions.has("promotion");
  const mgrCount = managerCountToNumber(managers);

  // Org Risk Level
  let orgRisk: Level;
  if (size === "51+" && (hasClarityProblems || hasMajorTransition)) {
    orgRisk = "high";
  } else if (
    size === "21-50" ||
    (hasClarityProblems && !hasMajorTransition)
  ) {
    orgRisk = "medium";
  } else {
    orgRisk = "low";
  }

  // Founder Bottleneck Exposure
  let founderExposure: Level;
  if (founderBottleneck === "yes" && (size === "21-50" || size === "51+")) {
    founderExposure = "high";
  } else if (
    founderBottleneck === "partially" ||
    (founderBottleneck === "yes" && size === "10-20")
  ) {
    founderExposure = "medium";
  } else {
    founderExposure = "low";
  }

  // Leadership Coverage Risk
  let leadershipRisk: Level;
  if (size === "51+" && mgrCount <= 5) {
    leadershipRisk = "high";
  } else if (
    (size === "21-50" && mgrCount <= 3) ||
    (size === "51+" && mgrCount <= 10)
  ) {
    leadershipRisk = "medium";
  } else {
    leadershipRisk = "low";
  }

  // Urgency
  const levels = [orgRisk, founderExposure, leadershipRisk];
  const highCount = levels.filter((l) => l === "high").length;
  const medCount = levels.filter((l) => l === "medium").length;
  let urgency: Level;
  if (highCount >= 2 || (hasMajorTransition && highCount >= 1)) {
    urgency = "high";
  } else if (
    (highCount === 1 && medCount >= 1) ||
    medCount >= 2
  ) {
    urgency = "medium";
  } else {
    urgency = "low";
  }

  return { orgRisk, founderExposure, leadershipRisk, urgency };
}

function diagnosticMessage(urgency: Level): string {
  if (urgency === "high") {
    return "Based on your inputs, your team may be carrying significant structural risk. Reviewing org structure before your next hire or restructure is strongly recommended. (Illustrative estimate — not a guarantee.)";
  }
  if (urgency === "medium") {
    return "Your team shows moderate structural risk signals. An organizational review could surface hidden gaps before they become expensive. (Directional insight only.)";
  }
  return "Your team appears relatively lower-risk for its current size. A periodic review can still surface blind spots before major transitions. (Directional insight only.)";
}

export default function ROICalculator({
  founderSnapshotUrl,
}: {
  founderSnapshotUrl: string;
}) {
  const [teamSize, setTeamSize] = useState<TeamSize>("21-50");
  const [managers, setManagers] = useState<Managers>("3-5");
  const [hires, setHires] = useState<Hires>("1-2");
  const [founderBottleneck, setFounderBottleneck] =
    useState<FounderBottleneck>("partially");
  const [roleClarity, setRoleClarity] = useState<RoleClarity>("unsure");
  const [transitions, setTransitions] = useState<Set<Transition>>(
    new Set<Transition>(["hiring-senior"]),
  );

  const result = useMemo(
    () =>
      compute(teamSize, managers, founderBottleneck, roleClarity, transitions),
    [teamSize, managers, founderBottleneck, roleClarity, transitions],
  );

  const toggleTransition = (t: Transition) => {
    setTransitions((prev) => {
      const next = new Set(prev);
      if (t === "none") {
        return new Set<Transition>(["none"]);
      }
      next.delete("none");
      if (next.has(t)) {
        next.delete(t);
      } else {
        next.add(t);
      }
      if (next.size === 0) next.add("none");
      return next;
    });
  };

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            ROI Calculator
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Estimate your organizational risk exposure
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Answer a few questions about your team. Get a directional
            diagnostic preview — not a guarantee, but a useful starting point.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-b from-[#12121A] to-[#0F0F12] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Inputs */}
              <div className="space-y-6 lg:col-span-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Your team
                  </h3>
                </div>

                <Field label="Team size">
                  <SegmentedControl
                    value={teamSize}
                    onChange={setTeamSize}
                    options={TEAM_SIZE_OPTIONS}
                  />
                </Field>

                <Field label="Number of managers / leaders">
                  <SegmentedControl
                    value={managers}
                    onChange={setManagers}
                    options={MANAGER_OPTIONS}
                  />
                </Field>

                <Field label="Planned hires in next 6–12 months">
                  <SegmentedControl
                    value={hires}
                    onChange={setHires}
                    options={HIRE_OPTIONS}
                  />
                </Field>

                <Field label="Is the founder still the primary decision bottleneck?">
                  <SegmentedControl
                    value={founderBottleneck}
                    onChange={setFounderBottleneck}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "partially", label: "Partially" },
                      { value: "no", label: "No" },
                    ]}
                  />
                </Field>

                <Field label="Are there role clarity problems in the team?">
                  <SegmentedControl
                    value={roleClarity}
                    onChange={setRoleClarity}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "unsure", label: "Unsure" },
                      { value: "no", label: "No" },
                    ]}
                  />
                </Field>

                <Field label="Is the company preparing for a major transition?">
                  <div className="flex flex-wrap gap-2">
                    {TRANSITION_OPTIONS.map((opt) => {
                      const active = transitions.has(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleTransition(opt.value)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            active
                              ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-100"
                              : "border-[#1E1E24] bg-[#0A0A0B] text-zinc-400 hover:bg-[#15151F] hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-indigo-400/25 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-300" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
                      Diagnostic preview
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    <ScoreRow
                      label="Organizational Risk Level"
                      level={result.orgRisk}
                    />
                    <ScoreRow
                      label="Founder Bottleneck Exposure"
                      level={result.founderExposure}
                    />
                    <ScoreRow
                      label="Leadership Coverage Risk"
                      level={result.leadershipRisk}
                    />
                    <ScoreRow
                      label="Urgency to Review Structure"
                      level={result.urgency}
                      emphasize
                    />
                  </ul>

                  <div className="mt-5 rounded-lg border border-white/10 bg-[#0A0A0B]/60 p-4">
                    <p className="text-xs leading-relaxed text-zinc-300">
                      {diagnosticMessage(result.urgency)}
                    </p>
                  </div>

                  <a
                    href={founderSnapshotUrl}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
                  >
                    Get a Real Founder Snapshot — $49
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-center text-[10px] leading-relaxed text-zinc-500">
                    Illustrative estimate · Not a guarantee · No AI employment
                    decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Helpers                                     */
/* ─────────────────────────────────────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-300">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg border border-[#1E1E24] bg-[#0A0A0B] p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-indigo-500/20 text-indigo-100 ring-1 ring-inset ring-indigo-400/40"
                : "text-zinc-400 hover:bg-[#15151F] hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ScoreRow({
  label,
  level,
  emphasize,
}: {
  label: string;
  level: Level;
  emphasize?: boolean;
}) {
  const dotColor =
    level === "high"
      ? "bg-rose-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
      : level === "medium"
        ? "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
        : "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]";
  const valueColor =
    level === "high"
      ? "text-rose-300"
      : level === "medium"
        ? "text-amber-200"
        : "text-emerald-300";
  const valueLabel =
    level === "high" ? "High" : level === "medium" ? "Medium" : "Low";
  return (
    <li
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
        emphasize
          ? "border border-indigo-400/30 bg-indigo-500/[0.06]"
          : "border border-transparent"
      }`}
    >
      <span className="flex items-center gap-2 text-zinc-300">
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
        {label}
      </span>
      <span className={`font-semibold ${valueColor}`}>{valueLabel}</span>
    </li>
  );
}
