"use client";

import { useState, useMemo } from "react";

type Dimension = "Leadership" | "Execution" | "Adaptability" | "Risk";

interface Person {
  name: string;
  scores: Record<Dimension, number>;
}

interface Team {
  name: string;
  people: Person[];
}

// Representative scoring (1–9 scale) drawn from the Hillhouse dataset
const teams: Team[] = [
  {
    name: "Investment",
    people: [
      { name: "Chifong D.", scores: { Leadership: 8, Execution: 7, Adaptability: 7, Risk: 7 } },
      { name: "Supriya K.", scores: { Leadership: 8, Execution: 8, Adaptability: 7, Risk: 8 } },
      { name: "Eric L.", scores: { Leadership: 7, Execution: 7, Adaptability: 6, Risk: 7 } },
      { name: "Yijun S.", scores: { Leadership: 6, Execution: 7, Adaptability: 7, Risk: 7 } },
    ],
  },
  {
    name: "Operations",
    people: [
      { name: "Luke C.", scores: { Leadership: 5, Execution: 7, Adaptability: 4, Risk: 6 } },
      { name: "Yuzhe Z.", scores: { Leadership: 2, Execution: 3, Adaptability: 2, Risk: 3 } },
      { name: "Jerry Y.", scores: { Leadership: 4, Execution: 5, Adaptability: 4, Risk: 5 } },
      { name: "Marcus T.", scores: { Leadership: 5, Execution: 6, Adaptability: 5, Risk: 5 } },
    ],
  },
  {
    name: "Strategy & Research",
    people: [
      { name: "Yujin C.", scores: { Leadership: 5, Execution: 5, Adaptability: 6, Risk: 5 } },
      { name: "Ravi P.", scores: { Leadership: 6, Execution: 6, Adaptability: 7, Risk: 6 } },
      { name: "Aisha N.", scores: { Leadership: 7, Execution: 6, Adaptability: 6, Risk: 7 } },
      { name: "Lin H.", scores: { Leadership: 5, Execution: 5, Adaptability: 6, Risk: 5 } },
      { name: "Daniel K.", scores: { Leadership: 5, Execution: 6, Adaptability: 5, Risk: 5 } },
    ],
  },
  {
    name: "Support",
    people: [
      { name: "Priya S.", scores: { Leadership: 4, Execution: 5, Adaptability: 4, Risk: 5 } },
      { name: "Tom W.", scores: { Leadership: 4, Execution: 4, Adaptability: 4, Risk: 4 } },
      { name: "Mei L.", scores: { Leadership: 6, Execution: 6, Adaptability: 6, Risk: 6 } },
      { name: "Sam B.", scores: { Leadership: 3, Execution: 4, Adaptability: 3, Risk: 4 } },
    ],
  },
];

const dimensions: Dimension[] = [
  "Leadership",
  "Execution",
  "Adaptability",
  "Risk",
];

function scoreColor(score: number) {
  if (score >= 7) return "#10B981"; // green
  if (score >= 4) return "#F59E0B"; // yellow
  return "#EF4444"; // red
}

function teamAvg(team: Team, dim: Dimension) {
  const sum = team.people.reduce((a, p) => a + p.scores[dim], 0);
  return Math.round((sum / team.people.length) * 10) / 10;
}

function bucketCounts(team: Team, dim: Dimension) {
  let green = 0,
    yellow = 0,
    red = 0;
  for (const p of team.people) {
    const s = p.scores[dim];
    if (s >= 7) green++;
    else if (s >= 4) yellow++;
    else red++;
  }
  return { green, yellow, red };
}

export default function OrgMapPage() {
  const [active, setActive] = useState<Dimension>("Leadership");

  const teamSummaries = useMemo(
    () =>
      teams.map((t) => ({
        name: t.name,
        avg: teamAvg(t, active),
        ...bucketCounts(t, active),
      })),
    [active]
  );

  return (
    <div className="mx-auto max-w-[1400px]">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] md:text-3xl">
          Organizational Capability Map
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Visual overview of your team&apos;s competency distribution
        </p>
      </header>

      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap gap-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2">
        {dimensions.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={
              "rounded-md px-4 py-2 text-sm font-medium transition-colors " +
              (active === d
                ? "bg-[#4F46E5] text-white"
                : "bg-white text-[#111827] border border-[#E5E7EB] hover:border-gray-300")
            }
          >
            {d}
          </button>
        ))}
      </div>

      {/* Org chart */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
        {/* Root node */}
        <div className="flex flex-col items-center">
          <div className="rounded-lg bg-[#111827] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm">
            Hillhouse Investment
            <p className="mt-1 text-[10px] font-normal uppercase tracking-wider text-gray-300">
              30 people · {active}
            </p>
          </div>
          <div className="h-6 w-px bg-[#E5E7EB]" />
        </div>

        {/* Team row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => {
            const avg = teamAvg(team, active);
            return (
              <div key={team.name} className="flex flex-col">
                {/* Team node */}
                <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: scoreColor(avg) }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#111827]">
                      {team.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      avg {avg.toFixed(1)} · {team.people.length} people
                    </p>
                  </div>
                </div>

                <div className="mx-auto h-4 w-px bg-[#E5E7EB]" />

                {/* People nodes */}
                <div className="space-y-2">
                  {team.people.map((p) => {
                    const s = p.scores[active];
                    const c = scoreColor(s);
                    return (
                      <div
                        key={p.name}
                        className="flex items-center justify-between rounded-md border border-[#E5E7EB] bg-white px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: c }}
                          >
                            {s}
                          </span>
                          <span className="text-sm text-[#111827]">
                            {p.name}
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-medium uppercase tracking-wider"
                          style={{ color: c }}
                        >
                          {s >= 7 ? "Strong" : s >= 4 ? "Develop" : "Risk"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-6 rounded-lg border border-[#E5E7EB] bg-white px-5 py-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[#10B981]" />
          <span className="text-[#111827]">High Capability (7–9)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[#F59E0B]" />
          <span className="text-[#111827]">Development Needed (4–6)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-[#EF4444]" />
          <span className="text-[#111827]">Execution Risk (1–3)</span>
        </div>
      </div>

      {/* Team summary bar */}
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {teamSummaries.map((t) => (
          <div
            key={t.name}
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t.name}
            </p>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-[#10B981]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#10B981]" />
                {t.green}
              </span>
              <span className="flex items-center gap-1 text-[#F59E0B]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#F59E0B]" />
                {t.yellow}
              </span>
              <span className="flex items-center gap-1 text-[#EF4444]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#EF4444]" />
                {t.red}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
