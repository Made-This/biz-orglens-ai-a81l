"use client";

import { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

const SALARY_OPTIONS = [40000, 60000, 80000, 100000, 125000, 150000, 200000];

type RiskLevel = "Low" | "Medium" | "High";
type RoleType = "ic" | "mgr";

const RISK_MULTIPLIERS: Record<RiskLevel, number> = {
  Low: 0.1,
  Medium: 0.2,
  High: 0.3,
};

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HeroRoiCalculator({
  checkoutUrl,
}: {
  checkoutUrl: string;
}) {
  const [employees, setEmployees] = useState(35);
  const [salary, setSalary] = useState(80000);
  const [roleType, setRoleType] = useState<RoleType>("ic");
  const [hiringRisk, setHiringRisk] = useState<RiskLevel>("Medium");
  const [plannedHires, setPlannedHires] = useState(3);

  const wrongHireCost = roleType === "ic" ? salary * 0.3 : salary * 0.5;
  const riskExposure =
    plannedHires * wrongHireCost * RISK_MULTIPLIERS[hiringRisk];
  const snapshotPct = ((49 / wrongHireCost) * 100).toFixed(1);

  const orgRisk: RiskLevel =
    employees <= 15 ? "Low" : employees <= 50 ? "Medium" : "High";

  const orgRiskLabel =
    employees <= 15
      ? "Early structure risk"
      : employees <= 50
        ? "Founder bottleneck risk rising"
        : "Leadership coverage risk high";

  const orgRiskClass =
    orgRisk === "High"
      ? "bg-red-500/20 text-red-300 ring-red-400/40"
      : orgRisk === "Medium"
        ? "bg-amber-500/20 text-amber-300 ring-amber-400/40"
        : "bg-emerald-500/20 text-emerald-300 ring-emerald-400/40";

  return (
    <div className="rounded-2xl border border-indigo-400/20 bg-gradient-to-b from-[#12121A] to-[#0F0F12] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
          <Calculator className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-white">
          Estimate the cost of a wrong people decision
        </h3>
      </div>

      <div className="space-y-4">
        {/* Team size */}
        <div>
          <div className="mb-1.5 flex justify-between">
            <label className="text-xs font-medium text-zinc-400">
              Team size
            </label>
            <span className="text-xs font-bold text-indigo-300">
              {employees} employees
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={150}
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            style={{ accentColor: "#6366f1" }}
            className="w-full cursor-pointer appearance-none rounded-full"
          />
          <div className="mt-0.5 flex justify-between text-[10px] text-zinc-600">
            <span>5</span>
            <span>150</span>
          </div>
        </div>

        {/* Average salary */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Average salary
          </label>
          <select
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full rounded-lg border border-[#1E1E24] bg-[#0A0A0B] px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-400/40"
          >
            {SALARY_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(s)}
              </option>
            ))}
          </select>
        </div>

        {/* Role type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Role type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["ic", "mgr"] as const).map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => setRoleType(rt)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  roleType === rt
                    ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-100"
                    : "border-[#1E1E24] bg-[#0A0A0B] text-zinc-400 hover:text-white"
                }`}
              >
                {rt === "ic" ? "Individual contributor" : "Manager / leadership"}
              </button>
            ))}
          </div>
        </div>

        {/* Hiring risk */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-400">
            Hiring risk
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Low", "Medium", "High"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setHiringRisk(r)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  hiringRisk === r
                    ? r === "High"
                      ? "border-red-400/50 bg-red-500/15 text-red-100"
                      : r === "Medium"
                        ? "border-amber-400/50 bg-amber-500/15 text-amber-100"
                        : "border-emerald-400/50 bg-emerald-500/15 text-emerald-100"
                    : "border-[#1E1E24] bg-[#0A0A0B] text-zinc-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Planned hires */}
        <div>
          <div className="mb-1.5 flex justify-between">
            <label className="text-xs font-medium text-zinc-400">
              Planned hires (6–12 months)
            </label>
            <span className="text-xs font-bold text-indigo-300">
              {plannedHires}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            value={plannedHires}
            onChange={(e) => setPlannedHires(Number(e.target.value))}
            style={{ accentColor: "#6366f1" }}
            className="w-full cursor-pointer appearance-none rounded-full"
          />
          <div className="mt-0.5 flex justify-between text-[10px] text-zinc-600">
            <span>0</span>
            <span>20</span>
          </div>
        </div>
      </div>

      {/* Output panel */}
      <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-[#08080C]/80 p-4">
        {/* Wrong hire cost */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs leading-tight text-zinc-400">
            Est. cost of one wrong hire
          </span>
          <span className="shrink-0 text-2xl font-bold tabular-nums text-red-300">
            {formatUSD(wrongHireCost)}
          </span>
        </div>

        {/* Risk exposure */}
        {plannedHires > 0 && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs leading-tight text-zinc-400">
              Potential hiring-risk exposure
            </span>
            <span className="shrink-0 text-xl font-bold tabular-nums text-amber-300">
              {formatUSD(riskExposure)}
            </span>
          </div>
        )}

        {/* Org risk */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-zinc-400">Org risk level</span>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${orgRiskClass}`}
          >
            {orgRiskLabel}
          </span>
        </div>

        {/* Snapshot comparison */}
        <div className="rounded-lg border border-indigo-400/25 bg-indigo-500/[0.12] px-3 py-3">
          <p className="mb-1 text-[11px] text-zinc-400">
            Founder Snapshot ($49) is less than
          </p>
          <p className="tabular-nums text-3xl font-bold text-indigo-300">
            {snapshotPct}%
          </p>
          <p className="mt-0.5 text-[10px] text-zinc-500">
            of your estimated wrong-hire cost
          </p>
        </div>
      </div>

      <a
        href={checkoutUrl}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
      >
        Get Founder Snapshot — $49
        <ArrowRight className="h-4 w-4" />
      </a>

      <p className="mt-2.5 text-center text-[10px] leading-relaxed text-zinc-600">
        Estimates are directional and based on public hiring-cost benchmarks.
        OrgLens does not guarantee savings or employment outcomes.
      </p>
    </div>
  );
}
