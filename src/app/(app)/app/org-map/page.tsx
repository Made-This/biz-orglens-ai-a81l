"use client";

import { useMemo, useState } from "react";
import { Lock, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type Dimension =
  | "Leadership"
  | "Execution"
  | "Adaptability"
  | "Stability"
  | "Risk";

interface Person {
  name: string;
  role: string;
  scores: {
    Leadership: number;
    Execution: number;
    Adaptability: number;
    Stability: number;
  };
  atRisk?: boolean;
  vacant?: boolean;
}

interface VPGroup {
  team: string;
  vp: Person;
  reports: Person[];
}

const ceo: Person = {
  name: "Wenjing Li",
  role: "CEO",
  scores: { Leadership: 8.2, Execution: 7.9, Adaptability: 8.0, Stability: 7.8 },
};

const orgTree: VPGroup[] = [
  {
    team: "Product",
    vp: {
      name: "Chifong Dong",
      role: "CTO",
      scores: { Leadership: 8.8, Execution: 9.0, Adaptability: 8.5, Stability: 8.7 },
    },
    reports: [
      {
        name: "Eric Li",
        role: "Engineering Lead",
        scores: { Leadership: 7.8, Execution: 9.1, Adaptability: 7.5, Stability: 8.2 },
      },
      {
        name: "Luke Cai",
        role: "Product Manager",
        scores: { Leadership: 7.9, Execution: 8.7, Adaptability: 8.1, Stability: 7.9 },
      },
      {
        name: "Yijun Sim",
        role: "Sr Engineer",
        scores: { Leadership: 7.2, Execution: 8.6, Adaptability: 7.8, Stability: 8.0 },
      },
      {
        name: "Jun Park",
        role: "Designer",
        scores: { Leadership: 6.5, Execution: 7.8, Adaptability: 7.9, Stability: 7.1 },
      },
    ],
  },
  {
    team: "Sales",
    vp: {
      name: "Supriya Kumar",
      role: "VP Sales",
      scores: { Leadership: 8.4, Execution: 8.5, Adaptability: 8.0, Stability: 7.9 },
    },
    reports: [
      {
        name: "Patrick Wang",
        role: "Account Executive",
        scores: { Leadership: 6.8, Execution: 7.5, Adaptability: 7.2, Stability: 7.0 },
      },
      {
        name: "Mei Tanaka",
        role: "SDR",
        scores: { Leadership: 6.2, Execution: 7.1, Adaptability: 7.0, Stability: 6.8 },
      },
    ],
  },
  {
    team: "Operations",
    vp: {
      name: "Lili Mao",
      role: "Head of Ops",
      scores: { Leadership: 8.3, Execution: 8.4, Adaptability: 7.2, Stability: 8.5 },
    },
    reports: [
      {
        name: "Yuzhe Zhao",
        role: "Ops Specialist",
        scores: { Leadership: 4.2, Execution: 5.1, Adaptability: 4.8, Stability: 4.5 },
        atRisk: true,
      },
      {
        name: "Support Lead",
        role: "Vacant",
        scores: { Leadership: 0, Execution: 0, Adaptability: 0, Stability: 0 },
        vacant: true,
      },
    ],
  },
];

const dimensions: Dimension[] = [
  "Leadership",
  "Execution",
  "Adaptability",
  "Stability",
  "Risk",
];

const dimensionMeta: Record<
  Dimension,
  { hex: string; bg: string; text: string; border: string }
> = {
  Leadership: {
    hex: "#6366f1",
    bg: "rgba(99,102,241,0.15)",
    text: "text-indigo-300",
    border: "border-indigo-500/40",
  },
  Execution: {
    hex: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    text: "text-emerald-300",
    border: "border-emerald-500/40",
  },
  Adaptability: {
    hex: "#06b6d4",
    bg: "rgba(6,182,212,0.12)",
    text: "text-cyan-300",
    border: "border-cyan-500/40",
  },
  Stability: {
    hex: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    text: "text-violet-300",
    border: "border-violet-500/40",
  },
  Risk: {
    hex: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    text: "text-rose-300",
    border: "border-rose-500/40",
  },
};

function tone(score: number): "green" | "amber" | "red" {
  if (score >= 7.5) return "green";
  if (score >= 5) return "amber";
  return "red";
}

function dotBg(t: "green" | "amber" | "red") {
  if (t === "green") return "bg-emerald-500";
  if (t === "amber") return "bg-amber-400";
  return "bg-rose-500";
}

function toneText(t: "green" | "amber" | "red") {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  return "text-rose-300";
}

// Risk inversion — lower scores = higher risk
function riskScore(p: Person): number {
  if (p.vacant) return 1.5;
  const avg =
    (p.scores.Leadership +
      p.scores.Execution +
      p.scores.Adaptability +
      p.scores.Stability) /
    4;
  return Math.max(0, 10 - avg);
}

function activeScore(p: Person, d: Dimension): number {
  if (p.vacant) return 0;
  if (d === "Risk") return riskScore(p);
  return p.scores[d];
}

function activeTone(p: Person, d: Dimension): "green" | "amber" | "red" {
  if (p.vacant) return "red";
  if (d === "Risk") {
    const r = riskScore(p);
    if (r <= 2.5) return "green";
    if (r <= 5) return "amber";
    return "red";
  }
  return tone(p.scores[d]);
}

export default function OrgMapPage() {
  const [active, setActive] = useState<Dimension>("Leadership");

  const teamSummaries = useMemo(() => {
    return orgTree.map((g) => {
      const all = [g.vp, ...g.reports.filter((r) => !r.vacant)];
      const sum = all.reduce((acc, p) => acc + activeScore(p, active), 0);
      const avg = sum / all.length;
      let t: "green" | "amber" | "red";
      if (active === "Risk") {
        if (avg <= 2.5) t = "green";
        else if (avg <= 5) t = "amber";
        else t = "red";
      } else {
        t = tone(avg);
      }
      return { team: g.team, avg: Math.round(avg * 10) / 10, tone: t };
    });
  }, [active]);

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Lens 1 — Competency Org Map
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Competency Org Map
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          Visualize how leadership, execution, adaptability, and stability flow
          across your organization.
        </p>
      </header>

      {/* Dimension toggle */}
      <div className="mb-6">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          View by dimension
        </p>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
          {dimensions.map((d) => {
            const m = dimensionMeta[d];
            const isActive = active === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setActive(d)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                style={
                  isActive
                    ? {
                        background: m.hex,
                        boxShadow: `0 0 24px -6px ${m.hex}`,
                      }
                    : undefined
                }
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Org chart */}
      <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6 md:p-8">
        {/* CEO */}
        <div className="flex flex-col items-center">
          <PersonNode person={ceo} dim={active} large />
          <div className="my-3 h-5 w-px bg-[#1E1E24]" />
        </div>

        {/* VP groups */}
        <div className="relative">
          <div className="absolute left-[8%] right-[8%] top-0 hidden h-px bg-[#1E1E24] md:block" />
          <div className="grid gap-5 md:grid-cols-3">
            {orgTree.map((group) => (
              <div key={group.team} className="flex flex-col items-center">
                <div className="hidden h-3 w-px bg-[#1E1E24] md:block" />
                <PersonNode person={group.vp} dim={active} />
                <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                <div className="w-full space-y-2">
                  {group.reports.map((p) => (
                    <PersonNode
                      key={p.name}
                      person={p}
                      dim={active}
                      compact
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#1E1E24] pt-5 text-xs text-zinc-500">
          <Legend tone="green" label="Strong (≥ 7.5)" />
          <Legend tone="amber" label="Moderate (5–7.4)" />
          <Legend tone="red" label="Weak (< 5)" />
          <span className="ml-auto text-[10px] uppercase tracking-widest">
            Showing:{" "}
            <span className={dimensionMeta[active].text}>{active}</span>
          </span>
        </div>
      </div>

      {/* Team-level insights */}
      <section className="mt-12">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Team-Level Insights
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          What the data says about each team
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {/* Product */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-emerald-500 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Product Team
              </p>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Strong
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">High execution balance.</strong>{" "}
                Chifong, Eric, and Luke maintain strong scores across all
                dimensions. Engineering capacity is well-covered.
              </span>
            </p>
          </div>

          {/* Operations */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-rose-500 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Operations Team
              </p>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Restructuring Risk
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <span>
                Low adaptability + low coping scores in Operations.{" "}
                <strong className="text-white">Yuzhe Zhao</strong> shows
                near-critical gaps across all four dimensions. Dependency on
                Lili Mao is high.
              </span>
            </p>
          </div>

          {/* Sales */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-amber-400 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Sales Team
              </p>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Collaboration Risk
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                High influence concentration around{" "}
                <strong className="text-white">Supriya Kumar</strong>. Patrick
                and Mei show moderate profiles. Team resilience is below
                benchmark.
              </span>
            </p>
          </div>
        </div>

        {/* Team averages strip */}
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {teamSummaries.map((t) => (
            <div
              key={t.team}
              className="rounded-xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-4"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                  {t.team} avg · {active}
                </p>
                <span className={`text-2xl font-bold ${toneText(t.tone)}`}>
                  {t.avg.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locked section / paywall */}
      <section className="relative mt-14">
        <div className="pointer-events-none select-none rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-8 blur-[3px]">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Behavioral Signal Map · 48 Competency Heatmap
          </p>
          <div className="mt-6 grid grid-cols-8 gap-1.5">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i % 7 === 0
                    ? "bg-rose-500/60"
                    : i % 4 === 0
                      ? "bg-amber-400/60"
                      : "bg-emerald-500/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111118]/95 to-[#0A0A0B]/95 p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
              Behavioral Signal Map locked
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Unlock the full 48-competency heatmap, every node-level score, and
              team-wide behavioral signal patterns.
            </p>
            <a
              href={CHECKOUT_URL}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              Unlock with Full Analysis — $49
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function PersonNode({
  person,
  dim,
  large,
  compact,
}: {
  person: Person;
  dim: Dimension;
  large?: boolean;
  compact?: boolean;
}) {
  const meta = dimensionMeta[dim];

  if (person.vacant) {
    return (
      <div
        className={`flex w-full max-w-[300px] items-center justify-between rounded-xl border-2 border-dashed border-zinc-700 bg-[#0A0A0B] ${
          compact ? "px-3 py-2" : "px-4 py-2.5"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <div>
            <p
              className={`font-medium text-zinc-500 ${
                compact ? "text-[11px]" : "text-xs"
              }`}
            >
              {person.name}
            </p>
            <p className="text-[10px] text-zinc-600">vacant</p>
          </div>
        </div>
        <span className="rounded-full border border-zinc-700 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-zinc-500">
          Open
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex w-full max-w-[300px] flex-col gap-2 rounded-xl border bg-[#0A0A0B] transition-all duration-200 ${
        person.atRisk
          ? "border-rose-500/40"
          : "border-[#1E1E24]"
      } ${large ? "px-5 py-3.5" : compact ? "px-3 py-2.5" : "px-4 py-3"}`}
      style={{
        background: meta.bg.replace(/[\d.]+\)/, (m) =>
          // softer for non-active, will override below for active
          m
        ),
        backgroundColor: undefined,
        // overlay tinted background
      }}
    >
      {/* Tinted overlay for active dim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl transition-colors duration-200"
        style={{ backgroundColor: meta.bg }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`flex items-center gap-2 font-semibold text-white ${
              large ? "text-sm" : compact ? "text-[12px]" : "text-xs"
            }`}
          >
            {person.name}
            {person.atRisk && (
              <span className="rounded-full border border-rose-500/40 bg-rose-500/[0.12] px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-rose-300">
                At Risk
              </span>
            )}
          </p>
          <p
            className={`truncate text-zinc-500 ${
              large ? "text-[11px]" : "text-[10px]"
            }`}
          >
            {person.role}
          </p>
        </div>
      </div>

      {/* L · E · A · S dots */}
      <div className="relative flex items-center gap-2">
        <CompetencyDot
          letter="L"
          score={person.scores.Leadership}
          highlight={dim === "Leadership"}
        />
        <CompetencyDot
          letter="E"
          score={person.scores.Execution}
          highlight={dim === "Execution"}
        />
        <CompetencyDot
          letter="A"
          score={person.scores.Adaptability}
          highlight={dim === "Adaptability"}
        />
        <CompetencyDot
          letter="S"
          score={person.scores.Stability}
          highlight={dim === "Stability"}
        />
        <span className="ml-auto font-mono text-[11px] text-zinc-300">
          {dim === "Risk" ? (
            <span className={toneText(activeTone(person, "Risk"))}>
              risk{" "}
              {Math.round(activeScore(person, "Risk") * 10) / 10}
            </span>
          ) : (
            <span className={toneText(activeTone(person, dim))}>
              {person.scores[dim].toFixed(1)}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function CompetencyDot({
  letter,
  score,
  highlight,
}: {
  letter: string;
  score: number;
  highlight: boolean;
}) {
  const t = tone(score);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest transition-all duration-200 ${
        highlight ? "bg-white/[0.04] ring-1 ring-white/10" : ""
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotBg(t)}`} />
      <span className="text-zinc-500">{letter}</span>
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
      <span className={`h-1.5 w-1.5 rounded-full ${dotBg(tone)}`} />
      <span>{label}</span>
    </div>
  );
}
