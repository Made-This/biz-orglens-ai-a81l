"use client";

import Link from "next/link";
import { Building2, Lock, Star, Pencil } from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type RiskLevel = "Low" | "Medium" | "High";

interface Scenario {
  letter: string;
  name: string;
  pill: string;
  pillTone: "gray" | "indigo" | "amber";
  headcountChange: string;
  costImpact: string;
  executionSpeed: string;
  riskLevel: RiskLevel;
  keyActions: string;
  highlighted?: boolean;
}

const scenarios: Scenario[] = [
  {
    letter: "A",
    name: "Lean Efficiency",
    pill: "CONSERVATIVE",
    pillTone: "gray",
    headcountChange: "-20% (24 → 6 cuts)",
    costImpact: "-$84K/mo",
    executionSpeed: "Fast (6–8 wks)",
    riskLevel: "Low",
    keyActions:
      "Consolidate ops, eliminate redundant roles, automate reporting",
  },
  {
    letter: "B",
    name: "Balanced Redesign",
    pill: "RECOMMENDED",
    pillTone: "indigo",
    headcountChange: "-10% (27 → 3 cuts)",
    costImpact: "-$42K/mo",
    executionSpeed: "Medium (10–12 wks)",
    riskLevel: "Medium",
    keyActions:
      "Promote top performers, restructure teams around product lines, hire 2 senior leads",
    highlighted: true,
  },
  {
    letter: "C",
    name: "AI-Native",
    pill: "AGGRESSIVE",
    pillTone: "amber",
    headcountChange: "-30% (21 → 9 cuts)",
    costImpact: "-$126K/mo",
    executionSpeed: "Slow (16–20 wks)",
    riskLevel: "High",
    keyActions:
      "Rebuild around AI workflows, retain only strategic roles, outsource execution",
  },
];

const competencyImpact: Array<{
  label: string;
  value: string;
  tone: "green" | "yellow" | "red";
  level: number;
}> = [
  { label: "Leadership Strength", value: "Moderate", tone: "yellow", level: 60 },
  { label: "Execution Reliability", value: "Strong", tone: "green", level: 85 },
  { label: "Adaptability", value: "At Risk", tone: "red", level: 28 },
  { label: "Team Stability", value: "Moderate", tone: "yellow", level: 55 },
];

function pillClass(tone: Scenario["pillTone"]) {
  switch (tone) {
    case "indigo":
      return "bg-[#4F46E5] text-white";
    case "amber":
      return "bg-amber-100 text-amber-800";
    case "gray":
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function riskDotColor(level: RiskLevel) {
  if (level === "Low") return "#10B981";
  if (level === "Medium") return "#F59E0B";
  return "#EF4444";
}

function toneColor(tone: "green" | "yellow" | "red") {
  if (tone === "green") return "#10B981";
  if (tone === "yellow") return "#F59E0B";
  return "#EF4444";
}

export default function ScenariosPage() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[280px_1fr]">
      {/* Left context panel */}
      <aside className="lg:sticky lg:top-10 lg:self-start">
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white border border-[#E5E7EB]">
              <Building2 className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Hillhouse Investment
              </p>
              <p className="text-[11px] text-gray-500">Series B • Singapore</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 rounded-lg border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-500">Headcount</span>
              <span className="text-sm font-semibold text-[#111827]">30</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-500">Monthly Burn</span>
              <span className="text-sm font-semibold text-[#111827]">$420K</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-500">Runway</span>
              <span className="text-sm font-semibold text-[#111827]">
                18 months
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Decision Context
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#374151]">
              Current structure is over-indexed on execution roles with
              insufficient leadership depth. Needs restructuring to support
              Series B growth.
            </p>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#4F46E5] hover:underline"
          >
            <Pencil className="h-3 w-3" />
            Edit context
          </button>
        </div>
      </aside>

      {/* Main content */}
      <section>
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827] md:text-3xl">
            Restructuring Scenarios
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Compare three strategic approaches for your organization
          </p>
        </header>

        {/* Scenario grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {scenarios.map((s) => (
            <article
              key={s.letter}
              className={
                "flex flex-col rounded-xl border bg-white p-5 transition-all " +
                (s.highlighted
                  ? "border-[#4F46E5] shadow-md ring-1 ring-[#4F46E5]/30 md:scale-[1.02]"
                  : "border-[#E5E7EB] hover:border-gray-300")
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider " +
                    pillClass(s.pillTone)
                  }
                >
                  {s.pill}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {s.letter}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[#111827]">
                Scenario {s.letter} — {s.name}
              </h3>

              {s.highlighted && (
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#4F46E5]">
                  <Star className="h-3 w-3 fill-[#4F46E5]" />
                  Best fit for your context
                </p>
              )}

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs text-gray-500">Headcount change</dt>
                  <dd className="text-right font-medium text-[#111827]">
                    {s.headcountChange}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs text-gray-500">Cost impact</dt>
                  <dd className="text-right font-medium text-[#111827]">
                    {s.costImpact}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs text-gray-500">Execution speed</dt>
                  <dd className="text-right font-medium text-[#111827]">
                    {s.executionSpeed}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs text-gray-500">Risk level</dt>
                  <dd className="flex items-center gap-1.5 text-right font-medium text-[#111827]">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: riskDotColor(s.riskLevel) }}
                    />
                    {s.riskLevel}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 rounded-md bg-gray-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Key actions
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#374151]">
                  {s.keyActions}
                </p>
              </div>

              <div className="mt-auto pt-5">
                <button
                  type="button"
                  className={
                    "w-full rounded-md px-3 py-2 text-sm font-medium transition-colors " +
                    (s.highlighted
                      ? "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                      : "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-gray-50")
                  }
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Competency Impact */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#111827]">Competency Impact</h2>
          <p className="mt-1 text-sm text-gray-500">
            How each scenario affects your team&apos;s capability profile
          </p>

          <div className="mt-5 grid gap-3 rounded-xl border border-[#E5E7EB] bg-white p-5 md:grid-cols-2">
            {competencyImpact.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-lg border border-[#E5E7EB] bg-[#FAFAFB] px-4 py-3"
              >
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: toneColor(c.tone) }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[#111827]">{c.label}</span>
                    <span className="text-xs font-medium text-gray-600">
                      {c.value}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${c.level}%`,
                        backgroundColor: toneColor(c.tone),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paywall */}
        <section className="relative mt-12">
          <div className="rounded-xl border border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF] to-white p-8 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E5E7EB]">
              <Lock className="h-4 w-4 text-[#4F46E5]" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#111827]">
              Full Analysis Locked
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              Unlock complete competency breakdown, org capability map, and
              role-fit talent rankings.
            </p>

            <a
              href={CHECKOUT_URL}
              className="mt-6 inline-flex w-full max-w-md items-center justify-center rounded-md bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA]"
            >
              Unlock Full Analysis — $49
            </a>
            <p className="mt-3 text-xs text-gray-500">
              One-time payment. Instant access.
            </p>
          </div>
        </section>

        <footer className="mt-12 flex items-center justify-between border-t border-[#E5E7EB] pt-6 text-xs text-gray-400">
          <span>OrgLens AI · Decision intelligence for founders</span>
          <Link
            href="https://madethis.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#4F46E5]"
          >
            Built with MadeThis
          </Link>
        </footer>
      </section>
    </div>
  );
}
