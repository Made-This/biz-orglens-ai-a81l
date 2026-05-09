"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type Role =
  | "CTO"
  | "VP Engineering"
  | "VP Product"
  | "Head of Operations"
  | "Lead Engineer";

interface Candidate {
  rank: number;
  name: string;
  fit: number;
  strengths: string;
  gaps: string;
}

interface RoleProfile {
  role: Role;
  required: { label: string; level: "high" | "medium" }[];
  candidates: Candidate[];
}

const roleProfiles: RoleProfile[] = [
  {
    role: "VP Engineering",
    required: [
      { label: "Leading/Deciding", level: "high" },
      { label: "Analyzing/Interpreting", level: "high" },
      { label: "Organizing/Executing", level: "medium" },
    ],
    candidates: [
      {
        rank: 1,
        name: "Luke Cai",
        fit: 92,
        strengths: "Leading/Deciding, Supporting/Cooperating",
        gaps: "Enterprising/Performing",
      },
      {
        rank: 2,
        name: "Chifong Dong",
        fit: 89,
        strengths: "Organizing/Executing, Analyzing/Interpreting",
        gaps: "Adapting/Coping",
      },
      {
        rank: 3,
        name: "Eric Li",
        fit: 85,
        strengths: "Analyzing/Interpreting, Creating/Conceptualizing",
        gaps: "Interacting/Presenting",
      },
      {
        rank: 4,
        name: "Yijun Sim",
        fit: 79,
        strengths: "Supporting/Cooperating, Organizing/Executing",
        gaps: "Leading/Deciding",
      },
      {
        rank: 5,
        name: "Supriya Kumar",
        fit: 76,
        strengths: "Creating/Conceptualizing, Adapting/Coping",
        gaps: "Organizing/Executing",
      },
    ],
  },
  {
    role: "CTO",
    required: [
      { label: "Leading/Deciding", level: "high" },
      { label: "Creating/Conceptualizing", level: "high" },
      { label: "Analyzing/Interpreting", level: "medium" },
    ],
    candidates: [
      {
        rank: 1,
        name: "Chifong Dong",
        fit: 91,
        strengths: "Leading/Deciding, Analyzing/Interpreting",
        gaps: "Adapting/Coping",
      },
      {
        rank: 2,
        name: "Luke Cai",
        fit: 84,
        strengths: "Leading/Deciding, Organizing/Executing",
        gaps: "Creating/Conceptualizing",
      },
      {
        rank: 3,
        name: "Eric Li",
        fit: 80,
        strengths: "Analyzing/Interpreting, Creating/Conceptualizing",
        gaps: "Interacting/Presenting",
      },
      {
        rank: 4,
        name: "Supriya Kumar",
        fit: 73,
        strengths: "Creating/Conceptualizing, Adapting/Coping",
        gaps: "Organizing/Executing",
      },
      {
        rank: 5,
        name: "Yijun Sim",
        fit: 68,
        strengths: "Organizing/Executing, Supporting/Cooperating",
        gaps: "Leading/Deciding",
      },
    ],
  },
  {
    role: "VP Product",
    required: [
      { label: "Creating/Conceptualizing", level: "high" },
      { label: "Adapting/Coping", level: "high" },
      { label: "Interacting/Presenting", level: "medium" },
    ],
    candidates: [
      {
        rank: 1,
        name: "Supriya Kumar",
        fit: 93,
        strengths: "Creating/Conceptualizing, Adapting/Coping",
        gaps: "Organizing/Executing",
      },
      {
        rank: 2,
        name: "Eric Li",
        fit: 82,
        strengths: "Analyzing/Interpreting, Creating/Conceptualizing",
        gaps: "Interacting/Presenting",
      },
      {
        rank: 3,
        name: "Chifong Dong",
        fit: 78,
        strengths: "Analyzing/Interpreting, Leading/Deciding",
        gaps: "Adapting/Coping",
      },
      {
        rank: 4,
        name: "Yijun Sim",
        fit: 71,
        strengths: "Supporting/Cooperating, Adapting/Coping",
        gaps: "Leading/Deciding",
      },
      {
        rank: 5,
        name: "Luke Cai",
        fit: 64,
        strengths: "Organizing/Executing, Leading/Deciding",
        gaps: "Creating/Conceptualizing",
      },
    ],
  },
  {
    role: "Head of Operations",
    required: [
      { label: "Organizing/Executing", level: "high" },
      { label: "Analyzing/Interpreting", level: "high" },
      { label: "Supporting/Cooperating", level: "medium" },
    ],
    candidates: [
      {
        rank: 1,
        name: "Eric Li",
        fit: 90,
        strengths: "Analyzing/Interpreting, Organizing/Executing",
        gaps: "Interacting/Presenting",
      },
      {
        rank: 2,
        name: "Chifong Dong",
        fit: 86,
        strengths: "Organizing/Executing, Leading/Deciding",
        gaps: "Adapting/Coping",
      },
      {
        rank: 3,
        name: "Yijun Sim",
        fit: 81,
        strengths: "Organizing/Executing, Supporting/Cooperating",
        gaps: "Leading/Deciding",
      },
      {
        rank: 4,
        name: "Luke Cai",
        fit: 74,
        strengths: "Organizing/Executing, Leading/Deciding",
        gaps: "Adapting/Coping",
      },
      {
        rank: 5,
        name: "Supriya Kumar",
        fit: 65,
        strengths: "Creating/Conceptualizing, Adapting/Coping",
        gaps: "Organizing/Executing",
      },
    ],
  },
  {
    role: "Lead Engineer",
    required: [
      { label: "Organizing/Executing", level: "high" },
      { label: "Analyzing/Interpreting", level: "high" },
      { label: "Adapting/Coping", level: "medium" },
    ],
    candidates: [
      {
        rank: 1,
        name: "Luke Cai",
        fit: 88,
        strengths: "Organizing/Executing, Leading/Deciding",
        gaps: "Adapting/Coping",
      },
      {
        rank: 2,
        name: "Yijun Sim",
        fit: 84,
        strengths: "Organizing/Executing, Adapting/Coping",
        gaps: "Leading/Deciding",
      },
      {
        rank: 3,
        name: "Chifong Dong",
        fit: 80,
        strengths: "Analyzing/Interpreting, Organizing/Executing",
        gaps: "Adapting/Coping",
      },
      {
        rank: 4,
        name: "Eric Li",
        fit: 73,
        strengths: "Analyzing/Interpreting, Creating/Conceptualizing",
        gaps: "Interacting/Presenting",
      },
      {
        rank: 5,
        name: "Supriya Kumar",
        fit: 60,
        strengths: "Creating/Conceptualizing, Adapting/Coping",
        gaps: "Organizing/Executing",
      },
    ],
  },
];

const roleOrder: Role[] = [
  "CTO",
  "VP Engineering",
  "VP Product",
  "Head of Operations",
  "Lead Engineer",
];

function fitTone(fit: number): "green" | "amber" | "red" {
  if (fit >= 80) return "green";
  if (fit >= 60) return "amber";
  return "red";
}

function toneBg(t: "green" | "amber" | "red") {
  if (t === "green") return "bg-emerald-500";
  if (t === "amber") return "bg-amber-400";
  return "bg-rose-500";
}

function toneText(t: "green" | "amber" | "red") {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  return "text-rose-300";
}

export default function RoleFitPage() {
  const [selected, setSelected] = useState<Role>("VP Engineering");
  const profile =
    roleProfiles.find((r) => r.role === selected) ?? roleProfiles[0];

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Role Fit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Role Fit & Talent Ranking
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Identify the best-fit team members for critical roles using
          competency-based ranking from the Great 8 model.
        </p>
      </header>

      {/* Role selector */}
      <div className="mb-8">
        <label
          htmlFor="role"
          className="block text-[10px] font-medium uppercase tracking-widest text-zinc-500"
        >
          Select role
        </label>
        <div className="relative mt-2 max-w-sm">
          <select
            id="role"
            value={selected}
            onChange={(e) => setSelected(e.target.value as Role)}
            className="w-full appearance-none rounded-full border border-[#1E1E24] bg-[#111113] px-4 py-2.5 pr-10 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            {roleOrder.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-500">
            ▾
          </span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Talent table with paywall */}
        <section className="relative">
          <div className="overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#111113]">
            <div className="grid grid-cols-[40px_1.4fr_1.6fr_1.6fr_1.4fr] gap-4 border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              <span>#</span>
              <span>Name</span>
              <span>Fit Score</span>
              <span>Key Strengths</span>
              <span>Gaps</span>
            </div>

            {profile.candidates.map((c, idx) => {
              const tone = fitTone(c.fit);
              const locked = idx >= 2;
              return (
                <div
                  key={c.name}
                  className={`relative grid grid-cols-[40px_1.4fr_1.6fr_1.6fr_1.4fr] items-center gap-4 border-b border-[#1E1E24] px-5 py-4 last:border-0 ${
                    locked ? "select-none" : ""
                  }`}
                >
                  <div className={locked ? "pointer-events-none blur-sm" : ""}>
                    <span className="font-mono text-xs text-zinc-500">
                      {c.rank}
                    </span>
                  </div>
                  <div className={locked ? "pointer-events-none blur-sm" : ""}>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                  </div>
                  <div className={locked ? "pointer-events-none blur-sm" : ""}>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#1E1E24]">
                        <div
                          className={`h-full ${toneBg(tone)}`}
                          style={{ width: `${c.fit}%` }}
                        />
                      </div>
                      <span
                        className={`font-mono text-sm ${toneText(tone)}`}
                      >
                        {c.fit}%
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      locked
                        ? "pointer-events-none truncate text-xs text-zinc-400 blur-sm"
                        : "truncate text-xs text-zinc-300"
                    }
                  >
                    {c.strengths}
                  </div>
                  <div
                    className={
                      locked
                        ? "pointer-events-none truncate text-xs text-zinc-500 blur-sm"
                        : "truncate text-xs text-zinc-500"
                    }
                  >
                    {c.gaps}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paywall overlay anchored to locked rows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px]">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8">
              <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111113] to-[#0A0A0B] p-6 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
                <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">
                  Unlock the full ranking
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  See every candidate, fit score, and gap analysis.
                </p>
                <a
                  href={CHECKOUT_URL}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
                >
                  Unlock Full Analysis — $49
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Role requirements */}
        <aside className="space-y-6 lg:sticky lg:top-10 lg:self-start">
          <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Selected Role
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {profile.role}
            </h3>

            <div className="mt-6 space-y-3 border-t border-[#1E1E24] pt-5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Required Competencies
              </p>
              {profile.required.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-zinc-300">{r.label}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                      r.level === "high"
                        ? "border-indigo-500/30 bg-indigo-500/[0.08] text-indigo-300"
                        : "border-amber-400/30 bg-amber-400/[0.08] text-amber-300"
                    }`}
                  >
                    {r.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              Methodology
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Fit scores are computed against the Great 8 competency model
              using HUCAMA psychometric inputs and behavioral signal analysis
              across the team.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
