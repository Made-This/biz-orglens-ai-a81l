"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────── */
/* Types                                       */
/* ─────────────────────────────────────────── */

type RiskTone = "amber" | "red";

type OrgNode = {
  id: string;
  role: string;
  /** percentage of container width (0–100) */
  x: number;
  /** percentage of container height (0–100) */
  y: number;
};

type Edge = {
  from: string;
  to: string;
};

type RiskBadge = {
  /** node id to attach to; for "overlap" type, this is the midpoint between nodes */
  nodeId: string;
  /** for amber overlap badges between two nodes */
  pairNodeId?: string;
  label: string;
  tooltip: string;
  tone: RiskTone;
  /** position relative to the node: "above" or "below" */
  position?: "above" | "below";
  /** show red pulsing dot next to badge */
  withDot?: boolean;
  /** allow label text to wrap (removes whitespace-nowrap, adds narrow max-width) */
  wrapLabel?: boolean;
};

/* ─────────────────────────────────────────── */
/* Org chart data — 7 nodes, identical layout  */
/* on both views                               */
/* ─────────────────────────────────────────── */

const NODES: OrgNode[] = [
  { id: "ceo", role: "Founder / CEO", x: 50, y: 10 },
  { id: "ops", role: "Operations Lead", x: 20, y: 46 },
  { id: "product", role: "Product Lead", x: 37, y: 46 },
  { id: "eng", role: "Engineering Lead", x: 63, y: 46 },
  { id: "sales", role: "Growth / Sales Lead", x: 87, y: 46 },
  { id: "cs", role: "Customer Success", x: 28, y: 84 },
  { id: "finance", role: "Finance / People", x: 72, y: 84 },
];

const EDGES: Edge[] = [
  { from: "ceo", to: "ops" },
  { from: "ceo", to: "product" },
  { from: "ceo", to: "eng" },
  { from: "ceo", to: "sales" },
  { from: "ops", to: "cs" },
  { from: "sales", to: "finance" },
];

const RISK_BADGES: RiskBadge[] = [
  {
    nodeId: "ceo",
    label: "Founder Bottleneck",
    tooltip:
      "Critical decisions still routed through the founder slow delegation and growth.",
    tone: "red",
    position: "above",
    withDot: true,
  },
  {
    nodeId: "ops",
    label: "Leadership Coverage Gap",
    tooltip: "Key operational areas lack dedicated leadership coverage.",
    tone: "amber",
    position: "below",
    wrapLabel: true,
  },
  {
    nodeId: "product",
    pairNodeId: "eng",
    label: "Role Overlap",
    tooltip:
      "Product and Engineering scope overlap increases coordination cost.",
    tone: "amber",
    position: "below",
  },
  {
    nodeId: "sales",
    label: "Sales Execution Risk",
    tooltip:
      "No dedicated sales leader — ownership unclear between founder and growth function.",
    tone: "red",
    position: "below",
    withDot: true,
  },
  {
    nodeId: "sales",
    label: "Ownership Gap",
    tooltip:
      "Accountability for revenue and pipeline is shared but not clearly owned.",
    tone: "red",
    position: "above",
  },
  {
    nodeId: "finance",
    label: "Key-Person Dependency",
    tooltip:
      "Single point of failure in Finance and People functions.",
    tone: "amber",
    position: "below",
  },
];

/* ─────────────────────────────────────────── */
/* Component                                   */
/* ─────────────────────────────────────────── */

export default function HeroOrgChart({
  founderSnapshotUrl,
}: {
  founderSnapshotUrl: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [orgLensHovered, setOrgLensHovered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const summaryRows: {
    tone: "red" | "amber";
    label: string;
    value: string;
  }[] = [
    { tone: "red", label: "Founder dependency", value: "High" },
    { tone: "red", label: "Sales leadership coverage", value: "Gap detected" },
    { tone: "amber", label: "Ownership clarity", value: "Medium risk" },
    { tone: "amber", label: "Role-fit review", value: "Recommended" },
  ];

  return (
    <div className="relative">
      {/* keyframes scoped to this component */}
      <style>{`
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239,68,68,0.55); }
          70% { opacity: 0.85; box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        .orglens-line {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
        }
        .orglens-line.is-in {
          animation: draw-line 900ms ease-out forwards;
        }
        .orglens-badge {
          animation: pulse-badge 2s ease-in-out infinite;
        }
        .orglens-red-dot {
          animation: pulse-dot 1.6s ease-out infinite;
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

      {/* Outer glass card */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-4">
        {/* Window chrome */}
        <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-slate-950/60 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            OrgLens · Org Chart Comparison
          </p>
          <p className="text-[10px] font-medium text-zinc-600">Live</p>
        </div>

        {/* Two mini charts side by side */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            style={{
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: orgLensHovered ? "scale(0.72)" : "scale(1)",
              opacity: orgLensHovered ? 0.6 : 1,
              transformOrigin: "center center",
            }}
          >
            <MiniOrgChart
              label="Traditional View"
              sublabel="Static org chart · no signals"
              showRisks={false}
              mounted={mounted}
            />
          </div>
          <div
            onMouseEnter={() => setOrgLensHovered(true)}
            onMouseLeave={() => setOrgLensHovered(false)}
            style={{
              transition: "transform 0.3s ease",
              transform: orgLensHovered ? "scale(1.03)" : "scale(1)",
              transformOrigin: "center center",
            }}
          >
            <MiniOrgChart
              label="OrgLens Risk View"
              sublabel="Same structure · risks surfaced"
              showRisks
              mounted={mounted}
            />
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
                          : "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                      }`}
                    />
                    {row.label}
                  </span>
                  <span
                    className={`font-medium ${
                      row.tone === "red" ? "text-red-300" : "text-amber-200"
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
              Review structure and ownership before the next hire or sales
              expansion.
            </p>
            <Link
              href={founderSnapshotUrl}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
            >
              Get Founder Snapshot
              <ArrowRight className="h-3 w-3" />
            </Link>
            <div className="mt-2 hidden sm:block">
              <ChevronRight className="h-3 w-3 text-indigo-300/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Mini Org Chart                              */
/* ─────────────────────────────────────────── */

function MiniOrgChart({
  label,
  sublabel,
  showRisks,
  mounted,
}: {
  label: string;
  sublabel: string;
  showRisks: boolean;
  mounted: boolean;
}) {
  const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 p-2 sm:p-3 ${
        showRisks
          ? "bg-gradient-to-b from-slate-900/70 to-slate-950/80"
          : "bg-slate-950/40"
      }`}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
            showRisks ? "text-indigo-300" : "text-zinc-500"
          }`}
        >
          {label}
        </p>
        <p className="hidden text-[9px] text-zinc-500 sm:block">{sublabel}</p>
      </div>

      <div
        className="relative w-full"
        style={{ aspectRatio: "5 / 5" }}
        aria-label={
          showRisks
            ? "OrgLens risk view: same org structure with red and amber risk markers."
            : "Traditional view: static org chart with no risk markers."
        }
      >
        {/* SVG connectors */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`lineGradient-${showRisks ? "risk" : "trad"}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {showRisks ? (
                <>
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#71717a" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#52525b" stopOpacity="0.3" />
                </>
              )}
            </linearGradient>
          </defs>
          {EDGES.map((edge, i) => {
            const from = nodeById(edge.from);
            const to = nodeById(edge.to);
            const yFrom = from.y + 5;
            const yTo = to.y - 5;
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={`M ${from.x} ${yFrom} C ${from.x} ${yFrom + 6}, ${to.x} ${yTo - 6}, ${to.x} ${yTo}`}
                stroke={`url(#lineGradient-${showRisks ? "risk" : "trad"})`}
                strokeWidth="0.4"
                fill="none"
                vectorEffect="non-scaling-stroke"
                className={`orglens-line ${mounted ? "is-in" : ""}`}
                style={{
                  animationDelay: `${300 + i * 100}ms`,
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((n) => (
          <MiniNode
            key={n.id}
            node={n}
            muted={!showRisks}
          />
        ))}

        {/* Risk badges (only on risk view) */}
        {showRisks &&
          RISK_BADGES.map((b, i) => {
            const node = nodeById(b.nodeId);
            // For paired badge, center between two nodes
            let x = node.x;
            const y = node.y;
            if (b.pairNodeId) {
              const pair = nodeById(b.pairNodeId);
              x = (node.x + pair.x) / 2;
            }
            return (
              <RiskBadgePin
                key={`${b.label}-${i}`}
                x={x}
                y={y}
                badge={b}
              />
            );
          })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Mini Node                                   */
/* ─────────────────────────────────────────── */

function MiniNode({ node, muted }: { node: OrgNode; muted: boolean }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
      }}
    >
      <div
        className={`min-w-[68px] rounded-md border px-1.5 py-1 text-center backdrop-blur sm:min-w-[80px] sm:px-2 sm:py-1 ${
          muted
            ? "border-zinc-700/60 bg-zinc-800/60 opacity-70"
            : "border-white/15 bg-slate-800/85 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.7)]"
        }`}
      >
        <p
          className={`whitespace-nowrap text-[8px] font-semibold leading-tight sm:text-[9px] ${
            muted ? "text-zinc-400" : "text-white"
          }`}
        >
          {node.role}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Risk Badge Pin                              */
/* ─────────────────────────────────────────── */

function RiskBadgePin({
  x,
  y,
  badge,
}: {
  x: number;
  y: number;
  badge: RiskBadge;
}) {
  const isAbove = badge.position === "above";
  const toneClasses =
    badge.tone === "red"
      ? "bg-red-500/25 text-red-100 ring-1 ring-inset ring-red-400/60 shadow-[0_0_10px_-2px_rgba(239,68,68,0.6)]"
      : "bg-amber-500/25 text-amber-100 ring-1 ring-inset ring-amber-400/60 shadow-[0_0_10px_-2px_rgba(245,158,11,0.5)]";

  // Offset above vs below the node
  const offsetY = isAbove ? -16 : 16;

  return (
    <div
      className="absolute z-10 -translate-x-1/2"
      style={{
        left: `${x}%`,
        top: `calc(${y}% + ${offsetY}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="group relative inline-flex items-center gap-1">
        {badge.withDot && (
          <span
            aria-hidden
            className="orglens-red-dot inline-block h-1.5 w-1.5 rounded-full bg-red-500"
          />
        )}
        <span
          className={`orglens-badge inline-flex cursor-default items-center rounded-full px-1.5 py-[2px] text-[8px] font-semibold tracking-wide sm:text-[9px] ${
            badge.wrapLabel
              ? "w-[52px] text-center leading-tight"
              : "whitespace-nowrap"
          } ${toneClasses}`}
        >
          {badge.label}
        </span>
        {/* Tooltip */}
        <div
          role="tooltip"
          className={`pointer-events-none absolute z-30 w-36 rounded-md border border-white/10 bg-slate-950/95 px-2.5 py-1.5 text-[10px] leading-snug text-zinc-200 opacity-0 shadow-xl backdrop-blur transition-opacity duration-150 group-hover:opacity-100 ${
            isAbove ? "bottom-full mb-2" : "top-full mt-2"
          } ${badge.wrapLabel ? "left-0" : "left-1/2 -translate-x-1/2"}`}
        >
          {badge.tooltip}
        </div>
      </div>
    </div>
  );
}
