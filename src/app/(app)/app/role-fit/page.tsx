"use client";

import { useState } from "react";

type Role =
  | "Investment Director"
  | "Head of Operations"
  | "Strategy Lead"
  | "Analytics Manager";

type ActionLabel =
  | "Strong fit"
  | "Good fit"
  | "Develop first"
  | "Not recommended";

interface Candidate {
  name: string;
  fit: number;
  strengths: string;
  gaps: string;
  action: ActionLabel;
}

interface RoleProfile {
  role: Role;
  required: { label: string; level: "High" | "Medium" | "Low" }[];
  candidates: Candidate[];
}

const roles: RoleProfile[] = [
  {
    role: "Investment Director",
    required: [
      { label: "Drive", level: "High" },
      { label: "Leadership", level: "High" },
      { label: "Execution", level: "Medium" },
      { label: "Stability", level: "Medium" },
    ],
    candidates: [
      {
        name: "Chifong Dong",
        fit: 94,
        strengths: "Drive, Execution",
        gaps: "Minor: Adaptability",
        action: "Strong fit",
      },
      {
        name: "Supriya Kumar",
        fit: 88,
        strengths: "Leadership, Drive",
        gaps: "Minor: Stability",
        action: "Strong fit",
      },
      {
        name: "Eric Li",
        fit: 82,
        strengths: "Execution, Structure",
        gaps: "Gap: Influence",
        action: "Good fit",
      },
      {
        name: "Yijun Sim",
        fit: 79,
        strengths: "Resilience, Drive",
        gaps: "Gap: Leadership breadth",
        action: "Good fit",
      },
      {
        name: "Luke Cai",
        fit: 71,
        strengths: "Execution",
        gaps: "Gaps: Leadership, Influence",
        action: "Develop first",
      },
      {
        name: "Yujin Chen",
        fit: 58,
        strengths: "Stability",
        gaps: "Gaps: Drive, Leadership",
        action: "Not recommended",
      },
      {
        name: "Jerry Yen",
        fit: 51,
        strengths: "Support",
        gaps: "Gaps: Drive, Execution",
        action: "Not recommended",
      },
    ],
  },
  {
    role: "Head of Operations",
    required: [
      { label: "Execution", level: "High" },
      { label: "Structure", level: "High" },
      { label: "Leadership", level: "Medium" },
      { label: "Stability", level: "Medium" },
    ],
    candidates: [
      {
        name: "Eric Li",
        fit: 91,
        strengths: "Execution, Structure",
        gaps: "Minor: Adaptability",
        action: "Strong fit",
      },
      {
        name: "Supriya Kumar",
        fit: 86,
        strengths: "Leadership, Structure",
        gaps: "Minor: Stability",
        action: "Strong fit",
      },
      {
        name: "Luke Cai",
        fit: 78,
        strengths: "Execution, Reliability",
        gaps: "Gap: Leadership breadth",
        action: "Good fit",
      },
      {
        name: "Chifong Dong",
        fit: 74,
        strengths: "Drive, Execution",
        gaps: "Gap: Process orientation",
        action: "Good fit",
      },
      {
        name: "Yujin Chen",
        fit: 62,
        strengths: "Stability, Support",
        gaps: "Gaps: Drive, Decisiveness",
        action: "Develop first",
      },
      {
        name: "Yuzhe Zhao",
        fit: 38,
        strengths: "—",
        gaps: "Gaps: Execution, Stability",
        action: "Not recommended",
      },
    ],
  },
  {
    role: "Strategy Lead",
    required: [
      { label: "Drive", level: "High" },
      { label: "Adaptability", level: "High" },
      { label: "Leadership", level: "Medium" },
      { label: "Execution", level: "Medium" },
    ],
    candidates: [
      {
        name: "Supriya Kumar",
        fit: 92,
        strengths: "Leadership, Drive",
        gaps: "Minor: Stability",
        action: "Strong fit",
      },
      {
        name: "Yijun Sim",
        fit: 84,
        strengths: "Resilience, Adaptability",
        gaps: "Minor: Influence",
        action: "Strong fit",
      },
      {
        name: "Chifong Dong",
        fit: 80,
        strengths: "Drive, Execution",
        gaps: "Gap: Adaptability",
        action: "Good fit",
      },
      {
        name: "Eric Li",
        fit: 70,
        strengths: "Structure, Execution",
        gaps: "Gap: Adaptability",
        action: "Develop first",
      },
      {
        name: "Yujin Chen",
        fit: 55,
        strengths: "Stability",
        gaps: "Gaps: Drive, Adaptability",
        action: "Not recommended",
      },
    ],
  },
  {
    role: "Analytics Manager",
    required: [
      { label: "Execution", level: "High" },
      { label: "Adaptability", level: "Medium" },
      { label: "Drive", level: "Medium" },
      { label: "Collaboration", level: "Medium" },
    ],
    candidates: [
      {
        name: "Eric Li",
        fit: 89,
        strengths: "Structure, Execution",
        gaps: "Minor: Influence",
        action: "Strong fit",
      },
      {
        name: "Yijun Sim",
        fit: 81,
        strengths: "Adaptability, Drive",
        gaps: "Minor: Leadership",
        action: "Strong fit",
      },
      {
        name: "Luke Cai",
        fit: 73,
        strengths: "Execution",
        gaps: "Gap: Adaptability",
        action: "Good fit",
      },
      {
        name: "Jerry Yen",
        fit: 54,
        strengths: "Support",
        gaps: "Gaps: Drive, Execution",
        action: "Not recommended",
      },
    ],
  },
];

function fitColor(fit: number) {
  if (fit > 80) return "#10B981";
  if (fit >= 60) return "#F59E0B";
  return "#EF4444";
}

function actionStyles(a: ActionLabel) {
  switch (a) {
    case "Strong fit":
      return "bg-emerald-50 text-[#047857] border border-emerald-100";
    case "Good fit":
      return "bg-blue-50 text-[#1D4ED8] border border-blue-100";
    case "Develop first":
      return "bg-amber-50 text-[#B45309] border border-amber-100";
    case "Not recommended":
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
}

function levelChipColor(level: "High" | "Medium" | "Low") {
  if (level === "High") return "bg-[#EEF2FF] text-[#4F46E5]";
  if (level === "Medium") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

export default function RoleFitPage() {
  const [selected, setSelected] = useState<Role>("Investment Director");
  const profile = roles.find((r) => r.role === selected) ?? roles[0];

  return (
    <div className="mx-auto max-w-[1400px]">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] md:text-3xl">
          Role Fit & Talent Ranking
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Identify who is best positioned for each role in your restructured org
        </p>
      </header>

      {/* Role tabs */}
      <div className="mb-6 flex flex-wrap gap-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2">
        {roles.map((r) => (
          <button
            key={r.role}
            type="button"
            onClick={() => setSelected(r.role)}
            className={
              "rounded-md px-4 py-2 text-sm font-medium transition-colors " +
              (selected === r.role
                ? "bg-[#4F46E5] text-white"
                : "bg-white text-[#111827] border border-[#E5E7EB] hover:border-gray-300")
            }
          >
            {r.role}
          </button>
        ))}
      </div>

      {/* Required competencies */}
      <div className="mb-8 flex flex-wrap items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Required
        </span>
        {profile.required.map((r) => (
          <span
            key={r.label}
            className={
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium " +
              levelChipColor(r.level)
            }
          >
            {r.label}: {r.level}
          </span>
        ))}
      </div>

      {/* Talent table */}
      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-left">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Fit Score
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Key Strengths
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Gaps
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {profile.candidates.map((c) => {
              const color = fitColor(c.fit);
              return (
                <tr
                  key={c.name}
                  className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#FAFAFB]"
                >
                  <td className="px-5 py-4 font-medium text-[#111827]">
                    {c.name}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${c.fit}%`,
                            backgroundColor: color,
                          }}
                        />
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color }}
                      >
                        {c.fit}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#374151]">{c.strengths}</td>
                  <td className="px-5 py-4 text-gray-500">{c.gaps}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
                        actionStyles(c.action)
                      }
                    >
                      {c.action}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Fit scores combine drive, leadership, execution, adaptability, stability,
        and collaboration signals from the team&apos;s competency profile.
      </p>
    </div>
  );
}
