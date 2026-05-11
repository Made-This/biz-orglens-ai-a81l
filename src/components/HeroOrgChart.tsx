"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────── */
/* Types                                       */
/* ─────────────────────────────────────────── */

type RiskTone = "amber" | "red" | "orange" | "yellow";

type OrgNode = {
  id: string;
  role: string;
  /** percentage of container width (0–100) */
  x: number;
  /** percentage of container height (0–100) */
  y: number;
  risk?: {
    label: string;
    tooltip: string;
    tone: RiskTone;
  };
};

type Edge = {
  from: string;
  to: string;
};

/* ─────────────────────────────────────────── */
/* Org chart data                              */
/* ─────────────────────────────────────────── */

const NODES: OrgNode[] = [
  {
    id: "ceo",
    role: "Founder / CEO",
    x: 50,
    y: 9,
    risk: {
      label: "Founder Bottleneck",
      tooltip: "Decision-making concentrated at the top",
      tone: "amber",
    },
  },
  {
    id: "ops",
    role: "Operations Lead",
    x: 14,
    y: 42,
    risk: {
      label: "Ownership Gap",
      tooltip: "Key function lacks clear owner",
      tone: "red",
    },
  },
  {
    id: "product",
    role: "Product Lead",
    x: 38,
    y: 42,
    risk: {
      label: "Role Overlap",
      tooltip: "Responsibilities unclear between roles",
      tone: "yellow",
    },
  },
  {
    id: "eng",
    role: "Engineering Lead",
    x: 62,
    y: 42,
    risk: {
      label: "Key-Person Dependency",
      tooltip: "Critical knowledge held by one person",
      tone: "orange",
    },
  },
  {
    id: "finance",
    role: "Finance / People Lead",
    x: 86,
    y: 42,
    risk: {
      label: "Scaling Risk",
      tooltip: "Structure may not support next growth stage",
      tone: "orange",
    },
  },
  {
    id: "cs",
    role: "Customer Success Lead",
    x: 38,
    y: 80,
    risk: {
      label: "Leadership Coverage Gap",
      tooltip: "Team lacks management coverage",
      tone: "red",
    },
  },
  {
    id: "sales",
    role: "Sales / Growth Lead",
    x: 62,
    y: 80,
  },
];

const EDGES: Edge[] = [
  { from: "ceo", to: "ops" },
  { from: "ceo", to: "product" },
  { from: "ceo", to: "eng" },
  { from: "ceo", to: "finance" },
  { from: "product", to: "cs" },
  { from: "eng", to: "sales" },
];

/* ─────────────────────────────────────────── */
/* Risk tone styling                           */
/* ─────────────────────────────────────────── */

const TONE_STYLES: Record<RiskTone, string> = {
  amber:
    "bg-amber-500/20 text-amber-200 ring-1 ring-inset ring-amber-400/40 shadow-[0_0_10px_-2px_rgba(245,158,11,0.5)]",
  red: "bg-red-500/20 text-red-200 ring-1 ring-inset ring-red-400/40 shadow-[0_0_10px_-2px_rgba(239,68,68,0.5)]",
  orange:
    "bg-orange-500/20 text-orange-200 ring-1 ring-inset ring-orange-400/40 shadow-[0_0_10px_-2px_rgba(249,115,22,0.5)]",
  yellow:
    "bg-yellow-500/20 text-yellow-100 ring-1 ring-inset ring-yellow-400/40 shadow-[0_0_10px_-2px_rgba(234,179,8,0.45)]",
};

/* ─────────────────────────────────────────── */
/* Component                                   */
/* ─────────────────────────────────────────── */

export default function HeroOrgChart({
  founderSnapshotUrl,
}: {
  founderSnapshotUrl: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // small delay so the entry animations are visible after hydration
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

  const summaryRows: {
    tone: "red" | "yellow";
    label: string;
    value: string;
  }[] = [
    { tone: "red", label: "Founder dependency", value: "High" },
    { tone: "yellow", label: "Ownership clarity", value: "Medium risk" },
    { tone: "red", label: "Leadership coverage", value: "Gap detected" },
    {
      tone: "yellow",
      label: "Role-fit review",
      value: "Recommended before next hire",
    },
  ];

  return (
    <div className="relative">
      {/* keyframes scoped to this component */}
      <style>{`
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        .orglens-node {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.92);
          transition: opacity 600ms ease-out, transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .orglens-node.is-in {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .orglens-line {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
        }
        .orglens-line.is-in {
          animation: draw-line 900ms ease-out forwards;
        }
        .orglens-badge {
          animation: pulse-soft 2.4s ease-in-out infinite;
        }
        .orglens-row {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 500ms ease-out, transform 500ms ease-out;
        }
        .orglens-row.is-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Frame */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-4">
        {/* Window chrome */}
        <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-slate-950/60 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            OrgLens · Team Risk Preview
          </p>
          <p className="text-[10px] font-medium text-zinc-600">Live</p>
        </div>

        {/* Org map */}
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-950/80 p-2 sm:p-3">
          <div
            className="relative w-full"
            style={{ aspectRatio: "16 / 11" }}
            aria-label="Organizational structure preview with highlighted risks"
          >
            {/* SVG connectors */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {EDGES.map((edge, i) => {
                const from = nodeById(edge.from);
                const to = nodeById(edge.to);
                // Offset to start/end at node edges instead of centers
                const yFrom = from.y + 5;
                const yTo = to.y - 5;
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={`M ${from.x} ${yFrom} C ${from.x} ${yFrom + 6}, ${to.x} ${yTo - 6}, ${to.x} ${yTo}`}
                    stroke="url(#lineGradient)"
                    strokeWidth="0.35"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    className={`orglens-line ${mounted ? "is-in" : ""}`}
                    style={{
                      animationDelay: `${300 + i * 120}ms`,
                    }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {NODES.map((n, idx) => (
              <div
                key={n.id}
                className={`orglens-node ${mounted ? "is-in" : ""} absolute`}
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transitionDelay: `${idx * 110}ms`,
                }}
              >
                <NodeCard node={n} />
              </div>
            ))}
          </div>
        </div>

        {/* Risk summary + recommendation row */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-5">
          {/* Risk summary */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-lg backdrop-blur sm:col-span-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              <h4 className="text-sm font-semibold text-white">
                Risk Signals Detected
              </h4>
            </div>
            <ul className="mt-3 space-y-2">
              {summaryRows.map((row, i) => (
                <li
                  key={row.label}
                  className={`orglens-row ${mounted ? "is-in" : ""} flex items-center justify-between text-xs`}
                  style={{ transitionDelay: `${900 + i * 110}ms` }}
                >
                  <span className="flex items-center gap-2 text-zinc-300">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        row.tone === "red"
                          ? "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                          : "bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.7)]"
                      }`}
                    />
                    {row.label}
                  </span>
                  <span
                    className={`font-medium ${
                      row.tone === "red" ? "text-red-300" : "text-yellow-200"
                    }`}
                  >
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation card */}
          <div className="rounded-xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/[0.14] to-slate-900/80 p-4 shadow-lg backdrop-blur sm:col-span-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
              Recommended Next Step
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-200">
              Review team structure before adding the next leadership role.
            </p>
            <Link
              href={founderSnapshotUrl}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
            >
              Get Founder Snapshot
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Node Card                                   */
/* ─────────────────────────────────────────── */

function NodeCard({ node }: { node: OrgNode }) {
  return (
    <div className="relative">
      {/* Card */}
      <div className="min-w-[112px] rounded-lg border border-white/10 bg-slate-800/80 px-2.5 py-1.5 text-center shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] backdrop-blur sm:min-w-[128px] sm:px-3 sm:py-2">
        <p className="whitespace-nowrap text-[10px] font-semibold leading-tight text-white sm:text-xs">
          {node.role}
        </p>
      </div>

      {/* Risk badge */}
      {node.risk && (
        <div className="group absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2">
          <span
            className={`orglens-badge inline-flex cursor-default items-center whitespace-nowrap rounded-full px-2 py-[3px] text-[9px] font-semibold tracking-wide ${TONE_STYLES[node.risk.tone]}`}
          >
            {node.risk.label}
          </span>
          {/* Tooltip */}
          <div
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 w-44 -translate-x-1/2 rounded-md border border-white/10 bg-slate-950/95 px-2.5 py-1.5 text-[10px] leading-snug text-zinc-200 opacity-0 shadow-xl backdrop-blur transition-opacity duration-150 group-hover:opacity-100"
          >
            {node.risk.tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
