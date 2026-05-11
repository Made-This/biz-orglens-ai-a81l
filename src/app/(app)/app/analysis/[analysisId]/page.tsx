"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Map as MapIcon,
  Network,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type TabKey =
  | "overview"
  | "org-map"
  | "role-fit"
  | "risk-summary"
  | "recommendations";

const TABS: { key: TabKey; label: string; icon: typeof MapIcon }[] = [
  { key: "overview", label: "Overview", icon: Sparkles },
  { key: "org-map", label: "Org Map", icon: Network },
  { key: "role-fit", label: "Role Fit", icon: Target },
  { key: "risk-summary", label: "Risk Summary", icon: ShieldAlert },
  { key: "recommendations", label: "Recommendations", icon: CheckCircle2 },
];

/* ────────────────────────────────────────────────────────────────────────── */
/*  Data types — match the JSON shape written by convex/analysis.ts.          */
/* ────────────────────────────────────────────────────────────────────────── */

interface OrgNodeData {
  name: string;
  role: string;
  tone: "green" | "amber" | "red";
}
interface OrgGroupData {
  parent: OrgNodeData;
  children: OrgNodeData[];
}
interface OrgMapData {
  companyName?: string;
  teamSize?: number;
  note?: string;
  ceo: OrgNodeData;
  groups: OrgGroupData[];
  competencyHeatmap: { label: string; score: number; tone: "green" | "amber" | "red" }[];
}
interface RoleFitData {
  rows: { name: string; role: string; fit: number; topSignal: string }[];
}
interface RiskSummaryData {
  topRisks: { title: string; level: "high" | "medium" | "low"; body: string }[];
  recommendations: { priority: number; title: string; body: string }[];
}

function safeParse<T>(json: string | undefined | null): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export default function AnalysisPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const analysisId = params.analysisId as Id<"analyses"> | undefined;

  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace(`/sign-in?redirect=/app/analysis/${analysisId ?? ""}`);
    }
  }, [authLoading, isAuthenticated, router, analysisId]);

  const analysis = useQuery(
    api.uploads.getAnalysis,
    isAuthenticated && analysisId ? { analysisId } : "skip"
  );

  const [tab, setTab] = useState<TabKey>("overview");

  const orgMap = useMemo<OrgMapData | null>(
    () => safeParse<OrgMapData>(analysis?.orgMapData),
    [analysis?.orgMapData]
  );
  const roleFit = useMemo<RoleFitData | null>(
    () => safeParse<RoleFitData>(analysis?.roleFitData),
    [analysis?.roleFitData]
  );
  const risk = useMemo<RiskSummaryData | null>(
    () => safeParse<RiskSummaryData>(analysis?.riskSummary),
    [analysis?.riskSummary]
  );

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  if (analysis === undefined) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Loading analysis…
          </p>
        </div>
      </div>
    );
  }

  if (analysis === null) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          href="/app/workspace"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to workspace
        </Link>
        <div className="mt-8 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8">
          <h1 className="text-xl font-bold text-white">Analysis not found</h1>
          <p className="mt-2 text-sm text-zinc-400">
            We couldn&rsquo;t find this analysis. It may have been removed or
            belongs to a different account.
          </p>
          <Link
            href="/app/upload"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
          >
            Upload a new report
          </Link>
        </div>
      </div>
    );
  }

  if (analysis.status === "processing") {
    return <AnalysisProcessing fileName={analysis.fileName} />;
  }

  if (analysis.status === "error") {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          href="/app/workspace"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to workspace
        </Link>
        <div className="mt-8 rounded-2xl border border-rose-500/30 bg-rose-500/[0.06] p-8">
          <h1 className="text-xl font-bold text-white">
            Analysis didn&rsquo;t complete
          </h1>
          <p className="mt-2 text-sm text-zinc-300">
            Something went wrong analyzing this report. Please try uploading
            again.
          </p>
          <Link
            href="/app/upload"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
          >
            Retry upload
          </Link>
        </div>
      </div>
    );
  }

  // status === "complete"
  return (
    <div className="mx-auto max-w-[1400px]">
      <Link
        href="/app/workspace"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to workspace
      </Link>

      {/* Banner */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] px-5 py-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-sm text-zinc-200">
            Analysis based on uploaded reports. PDF parsing is in beta —
            results reflect demo data until full parsing is enabled.
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            OrgLens AI · Your Analysis
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Your Analysis — {analysis.fileName}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Uploaded {formatRelativeTime(analysis.uploadedAt)} · {orgMap?.teamSize ?? 28} team members detected
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            toast({
              title: "Coming soon",
              description: "PDF export will be available in a later release.",
            })
          }
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-4 py-2.5 text-sm font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/15 hover:text-white"
        >
          <Download className="h-4 w-4" />
          Download Report (PDF)
        </button>
      </header>

      {/* Tab nav */}
      <div className="mt-8 overflow-x-auto">
        <div className="inline-flex min-w-max items-center gap-1 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-1">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all md:text-sm ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-100 ring-1 ring-inset ring-indigo-400/40"
                    : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 min-h-[400px]">
        {tab === "overview" && (
          <OverviewTab orgMap={orgMap} risk={risk} />
        )}
        {tab === "org-map" && <OrgMapTab orgMap={orgMap} />}
        {tab === "role-fit" && <RoleFitTab roleFit={roleFit} />}
        {tab === "risk-summary" && <RiskSummaryTab risk={risk} />}
        {tab === "recommendations" && (
          <RecommendationsTab risk={risk} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  PROCESSING STATE                            */
/* ─────────────────────────────────────────── */

function AnalysisProcessing({ fileName }: { fileName: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/app/workspace"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to workspace
      </Link>
      <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Analyzing your team reports…
          </h1>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            OrgLens is parsing{" "}
            <span className="font-medium text-zinc-200">{fileName}</span> and
            building your org analysis.
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-1/3 animate-[progress_1.6s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500/40 via-indigo-400 to-indigo-500/40" />
          </div>
        </div>
        <style jsx global>{`
          @keyframes progress {
            0% {
              transform: translateX(-100%);
              width: 33%;
            }
            50% {
              width: 60%;
            }
            100% {
              transform: translateX(220%);
              width: 33%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  OVERVIEW                                    */
/* ─────────────────────────────────────────── */

function OverviewTab({
  orgMap,
  risk,
}: {
  orgMap: OrgMapData | null;
  risk: RiskSummaryData | null;
}) {
  const teamSize = orgMap?.teamSize ?? 28;
  const topRisks = (risk?.topRisks ?? []).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Org summary
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Your Team Analysis
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          OrgLens detected {teamSize} team members in the uploaded reports.
          Below is a snapshot of the top risks identified.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Metric
            label="Team Size"
            value={String(teamSize)}
            tone="indigo"
          />
          <Metric
            label="Top Risks Surfaced"
            value={String((risk?.topRisks ?? []).length)}
            tone="amber"
          />
          <Metric
            label="Recommendations"
            value={String((risk?.recommendations ?? []).length)}
            tone="emerald"
          />
        </div>
      </section>

      <section>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Top risks called out
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
          What OrgLens flagged first
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {topRisks.map((r) => {
            const tone =
              r.level === "high"
                ? {
                    border: "border-rose-500/30",
                    bg: "from-rose-500/[0.06]",
                    badge: "bg-rose-500/15 text-rose-200 border-rose-400/40",
                    label: "High",
                  }
                : r.level === "medium"
                  ? {
                      border: "border-amber-500/30",
                      bg: "from-amber-500/[0.06]",
                      badge: "bg-amber-500/15 text-amber-200 border-amber-400/40",
                      label: "Medium",
                    }
                  : {
                      border: "border-emerald-500/30",
                      bg: "from-emerald-500/[0.06]",
                      badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
                      label: "Low",
                    };
            return (
              <div
                key={r.title}
                className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}
              >
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${tone.badge}`}
                >
                  {tone.label} risk
                </span>
                <h4 className="mt-4 text-base font-semibold text-white">
                  {r.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {r.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {orgMap?.note && (
        <section className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            About this analysis
          </p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            {orgMap.note}
          </p>
        </section>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "indigo" | "emerald" | "amber";
}) {
  const colorClass =
    tone === "emerald"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : "text-indigo-300";
  return (
    <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className={`mt-2 font-mono text-3xl font-bold ${colorClass}`}>
        {value}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  ORG MAP                                     */
/* ─────────────────────────────────────────── */

function OrgMapTab({ orgMap }: { orgMap: OrgMapData | null }) {
  if (!orgMap) {
    return (
      <p className="text-sm text-zinc-400">No org map data available.</p>
    );
  }
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Full org chart
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Reporting structure
            </h2>
          </div>
          <p className="text-xs text-zinc-500">{orgMap.teamSize ?? 28} team members</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
          <div className="flex flex-col items-center">
            <OrgMapNode node={orgMap.ceo} large />
            <div className="my-3 h-5 w-px bg-[#1E1E24]" />
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {orgMap.groups.map((g, gi) => (
              <div key={gi} className="flex flex-col items-center">
                <OrgMapNode node={g.parent} />
                <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                <div className="w-full space-y-2">
                  {g.children.map((c, ci) => (
                    <OrgMapNode key={ci} node={c} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Competency heatmap
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
            Team-wide competency averages
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Average score across the team on the Great 8 competency model.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2.5 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5 md:grid-cols-2">
          {orgMap.competencyHeatmap.map((c) => {
            const barColor =
              c.tone === "green"
                ? "bg-emerald-500"
                : c.tone === "amber"
                  ? "bg-amber-400"
                  : "bg-rose-500";
            const textColor =
              c.tone === "green"
                ? "text-emerald-300"
                : c.tone === "amber"
                  ? "text-amber-300"
                  : "text-rose-300";
            return (
              <div key={c.label} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-xs text-zinc-300">
                  {c.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${(c.score / 10) * 100}%` }}
                  />
                </div>
                <span
                  className={`w-10 shrink-0 text-right font-mono text-xs font-semibold ${textColor}`}
                >
                  {c.score.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function OrgMapNode({
  node,
  large,
  compact,
}: {
  node: OrgNodeData;
  large?: boolean;
  compact?: boolean;
}) {
  const dot =
    node.tone === "green"
      ? "bg-emerald-500"
      : node.tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  return (
    <div
      className={`relative flex w-full max-w-[280px] items-center gap-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] ${
        large ? "px-5 py-3" : compact ? "px-3 py-2" : "px-4 py-2.5"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <p
          className={`truncate font-medium text-white ${
            large ? "text-sm" : compact ? "text-[11px]" : "text-xs"
          }`}
        >
          {node.name}
        </p>
        <p
          className={`truncate text-zinc-500 ${
            large ? "text-[11px]" : "text-[10px]"
          }`}
        >
          {node.role}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  ROLE FIT                                    */
/* ─────────────────────────────────────────── */

function RoleFitTab({ roleFit }: { roleFit: RoleFitData | null }) {
  if (!roleFit) {
    return (
      <p className="text-sm text-zinc-400">No role-fit data available.</p>
    );
  }
  const sorted = [...roleFit.rows].sort((a, b) => b.fit - a.fit);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Role fit rankings
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          All {sorted.length} team members
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Each team member&rsquo;s overall role-fit score, with the top
          competency signals contributing to the score.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E24] bg-[#0A0A0B] text-left text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              <th className="px-5 py-3 w-12">#</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 hidden md:table-cell">Top Signals</th>
              <th className="px-5 py-3 text-right">Fit Score</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sorted.map((r, i) => {
              const scoreColor =
                r.fit >= 85
                  ? "text-emerald-300"
                  : r.fit >= 75
                    ? "text-indigo-300"
                    : r.fit >= 70
                      ? "text-amber-300"
                      : "text-rose-300";
              return (
                <tr
                  key={r.name}
                  className="border-b border-[#1E1E24] last:border-b-0 hover:bg-[#13131A]"
                >
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">
                    {i + 1}
                  </td>
                  <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                  <td className="px-5 py-3 text-zinc-400">{r.role}</td>
                  <td className="px-5 py-3 hidden text-xs text-zinc-500 md:table-cell">
                    {r.topSignal}
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-mono font-semibold ${scoreColor}`}
                  >
                    {r.fit}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  RISK SUMMARY                                */
/* ─────────────────────────────────────────── */

function RiskSummaryTab({ risk }: { risk: RiskSummaryData | null }) {
  if (!risk) {
    return (
      <p className="text-sm text-zinc-400">No risk summary available.</p>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Risk summary
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          What could limit your next growth phase
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Structural and people risks identified from the uploaded reports.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {risk.topRisks.map((r) => {
          const tone =
            r.level === "high"
              ? {
                  border: "border-rose-500/30",
                  bg: "from-rose-500/[0.06]",
                  badge: "bg-rose-500/15 text-rose-200 border-rose-400/40",
                  iconColor: "text-rose-300",
                  label: "High",
                }
              : r.level === "medium"
                ? {
                    border: "border-amber-500/30",
                    bg: "from-amber-500/[0.06]",
                    badge: "bg-amber-500/15 text-amber-200 border-amber-400/40",
                    iconColor: "text-amber-300",
                    label: "Medium",
                  }
                : {
                    border: "border-emerald-500/30",
                    bg: "from-emerald-500/[0.06]",
                    badge: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
                    iconColor: "text-emerald-300",
                    label: "Low",
                  };
          return (
            <div
              key={r.title}
              className={`rounded-2xl border ${tone.border} bg-gradient-to-b ${tone.bg} to-[#0F0F12] p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] ${tone.iconColor}`}
                >
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${tone.badge}`}
                >
                  {tone.label} risk
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {r.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  RECOMMENDATIONS                             */
/* ─────────────────────────────────────────── */

function RecommendationsTab({ risk }: { risk: RiskSummaryData | null }) {
  const recs = risk?.recommendations ?? [];
  if (recs.length === 0) {
    return (
      <p className="text-sm text-zinc-400">No recommendations available.</p>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Recommended actions
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Three prioritized moves
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Clarify ownership, reduce key-person risk, and set the org up for its
          next stage.
        </p>
      </div>

      <ol className="space-y-3">
        {recs.map((r) => (
          <li
            key={r.priority}
            className="flex items-start gap-4 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/40 bg-indigo-500/15 font-mono text-sm font-semibold text-indigo-200">
              {r.priority}
            </span>
            <div className="pt-0.5">
              <p className="text-sm font-semibold text-white">{r.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                {r.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.06] p-6 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            Want to dig deeper into one of these recommendations?
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            View the full org map and role-fit data for context.
          </p>
        </div>
        <Link
          href="/app/workspace"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
        >
          <FileText className="h-4 w-4" />
          Go to workspace
        </Link>
      </div>
    </div>
  );
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(ts).toLocaleDateString();
}
