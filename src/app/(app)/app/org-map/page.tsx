"use client";

import { useState, useMemo } from "react";
import { Lock, ArrowRight, AlertTriangle } from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type Dimension = "Leadership" | "Execution" | "Adaptability" | "Risk";

interface Person {
  name: string;
  role: string;
  scores: Record<Dimension, number>;
}

interface VPGroup {
  vp: Person;
  reports: Person[];
  team: string;
}

const ceo: Person = {
  name: "Wenjing Li",
  role: "CEO",
  scores: { Leadership: 50, Execution: 48, Adaptability: 47, Risk: 49 },
};

const orgTree: VPGroup[] = [
  {
    team: "Engineering",
    vp: {
      name: "Chifong Dong",
      role: "VP Engineering",
      scores: { Leadership: 50, Execution: 49, Adaptability: 46, Risk: 48 },
    },
    reports: [
      {
        name: "Yijun Sim",
        role: "Engineering Lead",
        scores: { Leadership: 46, Execution: 47, Adaptability: 44, Risk: 45 },
      },
      {
        name: "Luke Cai",
        role: "Senior Engineer",
        scores: { Leadership: 45, Execution: 47, Adaptability: 42, Risk: 44 },
      },
    ],
  },
  {
    team: "Product",
    vp: {
      name: "Supriya Kumar",
      role: "VP Product",
      scores: { Leadership: 47, Execution: 45, Adaptability: 48, Risk: 46 },
    },
    reports: [
      {
        name: "Patrick Wang",
        role: "Senior PM",
        scores: { Leadership: 41, Execution: 43, Adaptability: 45, Risk: 42 },
      },
      {
        name: "Mei Tanaka",
        role: "Product Designer",
        scores: { Leadership: 40, Execution: 42, Adaptability: 47, Risk: 43 },
      },
    ],
  },
  {
    team: "Operations",
    vp: {
      name: "Eric Li",
      role: "VP Operations",
      scores: { Leadership: 46, Execution: 46, Adaptability: 44, Risk: 45 },
    },
    reports: [
      {
        name: "Yuzhe Zhao",
        role: "Operations Analyst",
        scores: { Leadership: 28, Execution: 31, Adaptability: 26, Risk: 30 },
      },
      {
        name: "Jun Park",
        role: "Operations Manager",
        scores: { Leadership: 39, Execution: 41, Adaptability: 38, Risk: 40 },
      },
    ],
  },
];

const dimensions: Dimension[] = [
  "Leadership",
  "Execution",
  "Adaptability",
  "Risk",
];

function scoreTone(score: number): "green" | "amber" | "red" {
  if (score >= 45) return "green";
  if (score >= 35) return "amber";
  return "red";
}

function toneDot(t: "green" | "amber" | "red") {
  if (t === "green") return "bg-emerald-500";
  if (t === "amber") return "bg-amber-400";
  return "bg-rose-500";
}

function toneText(t: "green" | "amber" | "red") {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  return "text-rose-300";
}

function teamAvg(group: VPGroup, dim: Dimension) {
  const all = [group.vp, ...group.reports];
  const sum = all.reduce((a, p) => a + p.scores[dim], 0);
  return Math.round((sum / all.length) * 10) / 10;
}

export default function OrgMapPage() {
  const [active, setActive] = useState<Dimension>("Leadership");

  const teamSummaries = useMemo(
    () =>
      orgTree.map((g) => {
        const avg = teamAvg(g, active);
        return {
          team: g.team,
          avg,
          tone: scoreTone(avg) as "green" | "amber" | "red",
        };
      }),
    [active]
  );

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Org Map
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Organizational Capability Map
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Visualize leadership, execution, adaptability, and team resilience
          across your company.
        </p>
      </header>

      {/* Toggle bar */}
      <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-[#1E1E24] bg-[#111113] p-1">
        {dimensions.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
              (active === d
                ? "bg-indigo-500 text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)]"
                : "text-zinc-400 hover:text-white")
            }
          >
            {d}
          </button>
        ))}
      </div>

      {/* Org chart */}
      <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-8">
        {/* CEO */}
        <div className="flex flex-col items-center">
          <PersonNode person={ceo} dim={active} large />
          <div className="my-4 h-6 w-px bg-[#1E1E24]" />
        </div>

        {/* VPs row with connectors */}
        <div className="relative">
          <div className="absolute left-[10%] right-[10%] top-0 hidden h-px bg-[#1E1E24] md:block" />
          <div className="grid gap-6 md:grid-cols-3">
            {orgTree.map((group) => (
              <div key={group.team} className="flex flex-col items-center">
                <div className="hidden h-4 w-px bg-[#1E1E24] md:block" />
                <PersonNode person={group.vp} dim={active} />
                <div className="my-3 h-4 w-px bg-[#1E1E24]" />
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
          <Legend tone="green" label="High capability (45+)" />
          <Legend tone="amber" label="Development needed (35–44)" />
          <Legend tone="red" label="Execution risk (under 35)" />
        </div>
      </div>

      {/* Team Risk Summary */}
      <section className="mt-12">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Team Risk Summary
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Where the gaps are
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {teamSummaries.map((t) => (
            <div
              key={t.team}
              className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-5"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                {t.team}
              </p>
              <div className="mt-2 flex items-baseline justify-between">
                <span
                  className={`text-2xl font-semibold ${toneText(t.tone)}`}
                >
                  {t.avg.toFixed(1)}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                    t.tone === "green"
                      ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300"
                      : t.tone === "amber"
                        ? "border-amber-400/30 bg-amber-400/[0.08] text-amber-300"
                        : "border-rose-500/30 bg-rose-500/[0.08] text-rose-300"
                  }`}
                >
                  {t.tone === "green"
                    ? "Stable"
                    : t.tone === "amber"
                      ? "Watch"
                      : "Risk"}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Average {active.toLowerCase()} score
              </p>
            </div>
          ))}
        </div>

        {/* Warning card */}
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-300">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Critical insight
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">
                Acting with Consideration — team-wide gap
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Cross-team behavioral analysis shows weak cooperative
                signaling. This pattern correlates with execution friction
                during high-pressure restructuring windows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paywall */}
      <section className="relative mt-12">
        {/* Blurred preview content */}
        <div className="pointer-events-none select-none rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 blur-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Behavioral signal map · locked
          </p>
          <div className="mt-6 grid grid-cols-4 gap-2">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i % 5 === 0
                    ? "bg-rose-500/60"
                    : i % 3 === 0
                      ? "bg-amber-400/60"
                      : "bg-emerald-500/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111113]/95 to-[#0A0A0B]/95 p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
              Full capability map locked
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Unlock the complete behavioral signal map, every node-level
              score, and team-wide risk highlights.
            </p>
            <a
              href={CHECKOUT_URL}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              Unlock Full Analysis — $49
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
  const score = person.scores[dim];
  const tone = scoreTone(score);
  return (
    <div
      className={
        "flex w-full items-center justify-between rounded-xl border border-[#1E1E24] bg-[#0A0A0B] " +
        (large
          ? "max-w-[260px] px-5 py-4"
          : compact
            ? "px-3 py-2"
            : "px-4 py-3")
      }
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className={`h-2 w-2 shrink-0 rounded-full ${toneDot(tone)}`} />
        <div className="min-w-0">
          <p
            className={`truncate font-medium text-white ${
              large ? "text-sm" : compact ? "text-xs" : "text-sm"
            }`}
          >
            {person.name}
          </p>
          <p
            className={`truncate text-zinc-500 ${
              large ? "text-xs" : "text-[10px]"
            }`}
          >
            {person.role}
          </p>
        </div>
      </div>
      <span
        className={`ml-3 shrink-0 font-mono text-xs ${toneText(tone)}`}
      >
        {score}
      </span>
    </div>
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
      <span className={`h-1.5 w-1.5 rounded-full ${toneDot(tone)}`} />
      <span>{label}</span>
    </div>
  );
}
