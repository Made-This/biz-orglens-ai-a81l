"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  FileText,
  X,
  Network,
  Building2,
} from "lucide-react";

const PRODUCT_ID = "md7aftkyt1kn4qx4mgpeg4w2ts86cse5";
const CHECKOUT_URL = `https://madethis.com/checkout/orglens-ai/${PRODUCT_ID}`;

function unlockAndGo(router: ReturnType<typeof useRouter>) {
  try {
    window.localStorage.setItem("orglens_report_unlocked", "true");
  } catch {
    // ignore
  }
  router.push("/app/report");
}

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
  name: "Alex Morgan",
  role: "Founder & CEO",
  scores: { Leadership: 8.2, Execution: 7.9, Adaptability: 8.0, Stability: 7.8 },
};

const orgTree: VPGroup[] = [
  {
    team: "Engineering & Product",
    vp: {
      name: "Jordan Lee",
      role: "CTO",
      scores: { Leadership: 7.8, Execution: 7.7, Adaptability: 7.4, Stability: 7.5 },
    },
    reports: [
      {
        name: "Morgan Chen",
        role: "Engineering Lead",
        scores: { Leadership: 6.8, Execution: 7.1, Adaptability: 6.5, Stability: 6.2 },
      },
      {
        name: "Taylor Brooks",
        role: "Head of Product",
        scores: { Leadership: 7.1, Execution: 7.4, Adaptability: 7.2, Stability: 6.9 },
      },
      {
        name: "Chris Bennett",
        role: "Senior Engineer",
        scores: { Leadership: 5.8, Execution: 6.6, Adaptability: 6.0, Stability: 6.2 },
      },
      {
        name: "Sophia Grant",
        role: "UX Designer",
        scores: { Leadership: 5.2, Execution: 6.2, Adaptability: 6.5, Stability: 5.8 },
      },
    ],
  },
  {
    team: "Customer Success",
    vp: {
      name: "Riley Johnson",
      role: "Customer Success Lead",
      scores: { Leadership: 6.6, Execution: 6.7, Adaptability: 6.4, Stability: 6.5 },
    },
    reports: [
      {
        name: "Lucas Kim",
        role: "Account Executive",
        scores: { Leadership: 5.4, Execution: 6.0, Adaptability: 5.8, Stability: 5.6 },
      },
      {
        name: "Zoe Chambers",
        role: "Onboarding Specialist",
        scores: { Leadership: 5.0, Execution: 5.7, Adaptability: 5.6, Stability: 5.4 },
      },
    ],
  },
  {
    team: "Clinical Operations",
    vp: {
      name: "Casey Miller",
      role: "Head of Operations",
      scores: { Leadership: 6.7, Execution: 6.8, Adaptability: 5.8, Stability: 6.9 },
    },
    reports: [
      {
        name: "Elena Torres",
        role: "Clinical Specialist",
        scores: { Leadership: 3.6, Execution: 4.2, Adaptability: 3.9, Stability: 3.8 },
        atRisk: true,
      },
      {
        name: "Clinical Ops Lead",
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
  const [demoMode, setDemoMode] = useState(false);

  if (demoMode) {
    return <DemoOrgMap onClose={() => setDemoMode(false)} />;
  }

  return <DefaultOrgMap onActivateDemo={() => setDemoMode(true)} />;
}

// ===========================================================================
// DEFAULT (non-demo) ORG MAP — original content + new "View Full Demo" button
// ===========================================================================
function DefaultOrgMap({ onActivateDemo }: { onActivateDemo: () => void }) {
  const router = useRouter();
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
      {/* Header with action buttons */}
      <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
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
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onActivateDemo}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-indigo-600 bg-transparent px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-600/10 hover:text-indigo-200"
          >
            <FileText className="h-4 w-4" />
            View Full Demo Org Analysis
          </button>
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4" />
            Get My Custom OrgLens Analysis
          </a>
        </div>
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
          {/* Engineering & Product */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-emerald-500 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Engineering & Product
              </p>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Strong
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">High execution balance.</strong>{" "}
                Jordan, Morgan, and Taylor maintain strong scores across all
                dimensions. Engineering capacity is well-covered.
              </span>
            </p>
          </div>

          {/* Clinical Operations */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-rose-500 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Clinical Operations
              </p>
              <span className="rounded-full border border-rose-500/30 bg-rose-500/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-rose-300">
                Scaling Risk
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <span>
                Low adaptability + low coping scores in Clinical Operations.{" "}
                <strong className="text-white">Elena Torres</strong> shows
                near-critical gaps across all four dimensions. Dependency on
                Casey Miller is high.
              </span>
            </p>
          </div>

          {/* Customer Success */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] border-l-4 border-l-amber-400 bg-[#111118] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Customer Success
              </p>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Coverage Risk
              </span>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-300">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                Customer load concentrated around{" "}
                <strong className="text-white">Riley Johnson</strong>. Lucas
                and Zoe show moderate profiles. Team resilience is below
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
            Behavioral Signal Map · Competency Heatmap
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
              Unlock the full competency heatmap, every node-level score, and
              team-wide behavioral signal patterns.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => unlockAndGo(router)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
              >
                Get My Custom OrgLens Analysis
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onActivateDemo}
                className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-500/50 bg-transparent px-5 py-2.5 text-sm font-medium text-indigo-300 transition-all hover:bg-indigo-500/10 hover:text-indigo-200"
              >
                <FileText className="h-4 w-4" />
                View Full Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===========================================================================
// DEMO ORG MAP — AtlasFlow Technologies, full-feature unlocked experience
// ===========================================================================

type DemoMode = "Leadership" | "Execution" | "Adaptability" | "Stability" | "Risk";

type DemoTone = "green" | "amber" | "red";

interface DemoNode {
  id: string;
  name: string;
  role: string;
  // 4 dot scores - Leadership, Execution, Adaptability, Stability (constant per person)
  dots: { L: DemoTone; E: DemoTone; A: DemoTone; S: DemoTone };
  // tone of the entire node depending on currently active mode
  modeTone: Record<DemoMode, DemoTone>;
  // optional badge to display for a particular mode (e.g. "AT RISK" on Risk mode)
  modeBadge?: Partial<Record<DemoMode, string>>;
  // persistent badge (always visible regardless of mode)
  alwaysBadge?: string;
}

interface DemoBranch {
  lead: DemoNode;
  reports: DemoNode[];
}

const DEMO_MODES: DemoMode[] = [
  "Leadership",
  "Execution",
  "Adaptability",
  "Stability",
  "Risk",
];

const DEMO_MODE_LABELS: Record<DemoMode, string> = {
  Leadership: "Leadership",
  Execution: "Execution",
  Adaptability: "Adaptability",
  Stability: "Stability",
  Risk: "Org Risk",
};

const DEMO_CEO: DemoNode = {
  id: "alex",
  name: "Alex Morgan",
  role: "Founder & CEO",
  dots: { L: "green", E: "green", A: "green", S: "green" },
  modeTone: {
    Leadership: "green",
    Execution: "green",
    Adaptability: "green",
    Stability: "green",
    Risk: "green",
  },
};

const DEMO_TREE: DemoBranch[] = [
  {
    lead: {
      id: "jordan",
      name: "Jordan Lee",
      role: "CTO · Engineering",
      dots: { L: "green", E: "green", A: "amber", S: "green" },
      modeTone: {
        Leadership: "green",
        Execution: "green",
        Adaptability: "amber",
        Stability: "green",
        Risk: "green",
      },
    },
    reports: [
      {
        id: "morgan",
        name: "Morgan Chen",
        role: "Engineering Lead",
        dots: { L: "amber", E: "green", A: "amber", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "amber",
          Stability: "amber",
          Risk: "amber",
        },
      },
      {
        id: "chris",
        name: "Chris Bennett",
        role: "Senior Engineer",
        dots: { L: "amber", E: "green", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "green",
          Stability: "amber",
          Risk: "green",
        },
      },
      {
        id: "derek",
        name: "Derek Huang",
        role: "Backend Engineer",
        dots: { L: "amber", E: "amber", A: "amber", S: "green" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "amber",
          Stability: "green",
          Risk: "amber",
        },
      },
      {
        id: "priya",
        name: "Priya Nair",
        role: "Data & Analytics Lead",
        dots: { L: "amber", E: "green", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "green",
          Stability: "amber",
          Risk: "green",
        },
      },
      {
        id: "owen",
        name: "Owen Fletcher",
        role: "DevOps Lead",
        dots: { L: "amber", E: "green", A: "amber", S: "green" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "amber",
          Stability: "green",
          Risk: "green",
        },
      },
    ],
  },
  {
    lead: {
      id: "casey",
      name: "Casey Miller",
      role: "Head of Operations",
      dots: { L: "green", E: "amber", A: "amber", S: "green" },
      modeTone: {
        Leadership: "green",
        Execution: "amber",
        Adaptability: "amber",
        Stability: "green",
        Risk: "amber",
      },
    },
    reports: [
      {
        id: "avery",
        name: "Avery Wilson",
        role: "Clinical Operations Lead",
        dots: { L: "amber", E: "amber", A: "amber", S: "red" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "amber",
          Stability: "red",
          Risk: "amber",
        },
        modeBadge: { Risk: "WATCH" },
      },
      {
        id: "elena",
        name: "Elena Torres",
        role: "Clinical Specialist",
        dots: { L: "red", E: "red", A: "red", S: "red" },
        modeTone: {
          Leadership: "red",
          Execution: "red",
          Adaptability: "red",
          Stability: "red",
          Risk: "red",
        },
        modeBadge: { Risk: "HIGH RISK" },
        alwaysBadge: "AT RISK",
      },
      {
        id: "isabella",
        name: "Isabella Park",
        role: "Executive Assistant",
        dots: { L: "amber", E: "amber", A: "amber", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "amber",
          Stability: "amber",
          Risk: "amber",
        },
      },
      {
        id: "sam",
        name: "Sam Parker",
        role: "Finance & Strategy Lead",
        dots: { L: "amber", E: "green", A: "amber", S: "green" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "amber",
          Stability: "green",
          Risk: "amber",
        },
      },
    ],
  },
  {
    lead: {
      id: "taylor",
      name: "Taylor Brooks",
      role: "Head of Product",
      dots: { L: "green", E: "green", A: "green", S: "green" },
      modeTone: {
        Leadership: "green",
        Execution: "green",
        Adaptability: "green",
        Stability: "green",
        Risk: "green",
      },
    },
    reports: [
      {
        id: "natalie",
        name: "Natalie Adams",
        role: "Product Manager",
        dots: { L: "amber", E: "green", A: "green", S: "green" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "green",
          Stability: "green",
          Risk: "green",
        },
      },
      {
        id: "lily",
        name: "Lily Chen",
        role: "Product Analyst",
        dots: { L: "amber", E: "green", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "green",
          Stability: "amber",
          Risk: "green",
        },
      },
      {
        id: "sophia",
        name: "Sophia Grant",
        role: "UX Designer",
        dots: { L: "amber", E: "green", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "green",
          Stability: "amber",
          Risk: "green",
        },
      },
    ],
  },
  {
    lead: {
      id: "riley",
      name: "Riley Johnson",
      role: "Customer Success Lead",
      dots: { L: "amber", E: "green", A: "green", S: "amber" },
      modeTone: {
        Leadership: "amber",
        Execution: "green",
        Adaptability: "green",
        Stability: "amber",
        Risk: "green",
      },
    },
    reports: [
      {
        id: "zoe",
        name: "Zoe Chambers",
        role: "Onboarding Specialist",
        dots: { L: "amber", E: "amber", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "green",
          Stability: "amber",
          Risk: "amber",
        },
      },
      {
        id: "caden",
        name: "Caden Brooks",
        role: "Customer Success Manager",
        dots: { L: "amber", E: "amber", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "green",
          Stability: "amber",
          Risk: "amber",
        },
      },
      {
        id: "ethan",
        name: "Ethan Ross",
        role: "QA Lead",
        dots: { L: "amber", E: "green", A: "amber", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "amber",
          Stability: "amber",
          Risk: "amber",
        },
      },
    ],
  },
  {
    lead: {
      id: "marcus",
      name: "Marcus Wright",
      role: "Sales Lead",
      dots: { L: "amber", E: "amber", A: "amber", S: "green" },
      modeTone: {
        Leadership: "amber",
        Execution: "amber",
        Adaptability: "amber",
        Stability: "green",
        Risk: "amber",
      },
    },
    reports: [
      {
        id: "jamie",
        name: "Jamie Carter",
        role: "Growth Lead",
        dots: { L: "amber", E: "amber", A: "amber", S: "green" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "amber",
          Stability: "green",
          Risk: "amber",
        },
      },
      {
        id: "lucas",
        name: "Lucas Kim",
        role: "Account Executive",
        dots: { L: "amber", E: "green", A: "amber", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "green",
          Adaptability: "amber",
          Stability: "amber",
          Risk: "amber",
        },
      },
      {
        id: "mia",
        name: "Mia Santos",
        role: "Marketing Manager",
        dots: { L: "amber", E: "amber", A: "green", S: "amber" },
        modeTone: {
          Leadership: "amber",
          Execution: "amber",
          Adaptability: "green",
          Stability: "amber",
          Risk: "amber",
        },
      },
    ],
  },
];

// Scenario B redesign overrides applied to the demo tree
const SCENARIO_B_OVERRIDES: Record<
  string,
  { addBadge?: string; modeToneOverride?: Partial<Record<DemoMode, DemoTone>> }
> = {
  jordan: { addBadge: "REDESIGNED" },
  casey: { addBadge: "REDESIGNED" },
  elena: {
    addBadge: "Redeployed",
    modeToneOverride: {
      Leadership: "amber",
      Execution: "amber",
      Adaptability: "amber",
      Stability: "amber",
      Risk: "amber",
    },
  },
  avery: {
    modeToneOverride: {
      Leadership: "green",
      Execution: "green",
      Adaptability: "green",
      Stability: "amber",
      Risk: "green",
    },
  },
};

function DemoOrgMap({ onClose }: { onClose: () => void }) {
  const [activeMode, setActiveMode] = useState<DemoMode>("Leadership");
  const [scenarioB, setScenarioB] = useState(false);

  return (
    <div className="-mx-6 -mt-16 md:-mx-10 md:-mt-10">
      {/* Demo banner — sticky top */}
      <DemoBanner onClose={onClose} />

      <div className="mx-auto mt-6 max-w-[1400px] px-6 pb-12 md:px-10">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Lens 1 — Competency Org Map
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Organizational Capability Analysis
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                <strong className="text-white">AtlasFlow Technologies</strong>
              </span>
              <span className="text-zinc-700">·</span>
              <span>42 employees</span>
              <span className="text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5 text-indigo-400" />
                Fictional B2B SaaS · Software
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-indigo-600 bg-transparent px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-600/10 hover:text-indigo-200"
            >
              <FileText className="h-4 w-4" />
              View Full Demo Org Analysis
            </button>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              Unlock Full Analysis — $49
            </a>
          </div>
        </header>

        {/* Scenario toggle (Current vs Scenario B) */}
        <div className="mb-5">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Scenario
          </p>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
            <button
              type="button"
              onClick={() => setScenarioB(false)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                !scenarioB
                  ? "bg-indigo-500 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${!scenarioB ? "bg-white" : "bg-zinc-500"}`}
              />
              Current Organization
            </button>
            <button
              type="button"
              onClick={() => setScenarioB(true)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                scenarioB
                  ? "bg-emerald-500 text-white shadow-[0_0_24px_-6px_rgba(34,197,94,0.7)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${scenarioB ? "bg-white" : "bg-zinc-500"}`}
              />
              Scenario B — Balanced
            </button>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            View by competency
          </p>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
            {DEMO_MODES.map((m) => {
              const isActive = activeMode === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveMode(m)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]"
                      : "border border-zinc-700/40 text-zinc-400 hover:text-white"
                  }`}
                >
                  {DEMO_MODE_LABELS[m]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Org chart */}
        <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6 md:p-8">
          {/* CEO */}
          <div className="flex flex-col items-center">
            <DemoNodeCard node={DEMO_CEO} mode={activeMode} large />
            <div className="my-3 h-5 w-px bg-[#1E1E24]" />
          </div>

          {/* L1 + L2 columns */}
          <div className="relative">
            <div className="absolute left-[6%] right-[6%] top-0 hidden h-px bg-[#1E1E24] md:block" />
            <div className="grid gap-4 md:grid-cols-5">
              {DEMO_TREE.map((branch) => {
                const leadOverride = SCENARIO_B_OVERRIDES[branch.lead.id];
                const leadHasRedesignedBadge =
                  scenarioB && leadOverride?.addBadge === "REDESIGNED";
                return (
                  <div key={branch.lead.id} className="flex flex-col items-center">
                    <div className="hidden h-3 w-px bg-[#1E1E24] md:block" />
                    <DemoNodeCard
                      node={branch.lead}
                      mode={activeMode}
                      scenarioB={scenarioB}
                    />
                    {leadHasRedesignedBadge && (
                      <p className="mt-1.5 text-[10px] italic text-emerald-300">
                        Role expanded — 2 direct reports added
                      </p>
                    )}
                    <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                    <div className="w-full space-y-2">
                      {branch.reports.map((p) => (
                        <DemoNodeCard
                          key={p.id}
                          node={p}
                          mode={activeMode}
                          scenarioB={scenarioB}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#1E1E24] pt-5 text-xs text-zinc-500">
            <Legend tone="green" label="High" />
            <Legend tone="amber" label="Medium" />
            <Legend tone="red" label="Low" />
            <span className="ml-auto text-[10px] uppercase tracking-widest">
              Showing:{" "}
              <span className="text-indigo-300">
                {DEMO_MODE_LABELS[activeMode]}
              </span>
            </span>
          </div>
        </div>

        {/* Scenario B summary bar */}
        {scenarioB && (
          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4">
            <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-300">
              Scenario B — Balanced · Outcomes
            </p>
            <div className="mt-2 grid gap-3 text-sm text-zinc-200 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>
                  Leadership Coverage{" "}
                  <strong className="text-emerald-300">+18%</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>
                  Execution Stability{" "}
                  <strong className="text-emerald-300">Medium → Strong</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>
                  Risk Level{" "}
                  <strong className="text-emerald-300">High → Moderate</strong>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights panel */}
        <section className="mt-12">
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
            AI Organizational Insights
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            What the data is telling you
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {(scenarioB ? SCENARIO_B_INSIGHTS : DEFAULT_INSIGHTS).map((insight) => (
              <InsightCard key={insight.title} insight={insight} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-14 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-[#111118] to-[#0A0A0B] p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)]">
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-300">
            This is a demo · Real analysis is built from your team
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Run the same analysis on your organization
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
            Get a full organizational capability map, role-fit ranking, and
            scaling scenarios — built from your team&apos;s competency signals
            in under 5 minutes.
          </p>
          <a
            href={CHECKOUT_URL}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4" />
            Get My Custom OrgLens Analysis
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </div>
    </div>
  );
}

// ---------- Demo Banner ----------
function DemoBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="sticky top-0 z-30 w-full bg-indigo-600 text-white shadow-[0_4px_24px_-8px_rgba(79,70,229,0.6)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-white/20 px-2 text-[10px] font-bold uppercase tracking-widest">
            DEMO
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">
              Demo Mode — Organizational Capability Analysis
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-indigo-100/90">
              Fully unlocked preview · AtlasFlow Technologies · 42 employees
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
          >
            Get My Custom OrgLens Analysis
            <ArrowRight className="h-3 w-3" />
          </a>
          <button
            onClick={onClose}
            aria-label="Exit demo mode"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Demo Node Card ----------
function DemoNodeCard({
  node,
  mode,
  large,
  compact,
  scenarioB,
}: {
  node: DemoNode;
  mode: DemoMode;
  large?: boolean;
  compact?: boolean;
  scenarioB?: boolean;
}) {
  const override = SCENARIO_B_OVERRIDES[node.id];
  const effectiveModeTone =
    scenarioB && override?.modeToneOverride?.[mode]
      ? override.modeToneOverride[mode]!
      : node.modeTone[mode];

  const ringClass =
    effectiveModeTone === "green"
      ? "ring-emerald-500/40"
      : effectiveModeTone === "amber"
        ? "ring-amber-400/40"
        : "ring-rose-500/50";

  const bgClass =
    effectiveModeTone === "green"
      ? "bg-emerald-500/[0.06]"
      : effectiveModeTone === "amber"
        ? "bg-amber-400/[0.06]"
        : "bg-rose-500/[0.08]";

  const modeBadge = node.modeBadge?.[mode];
  const persistentBadge = node.alwaysBadge;
  const scenarioAddBadge =
    scenarioB && override?.addBadge ? override.addBadge : null;

  return (
    <div
      className={`relative w-full max-w-[300px] rounded-xl border border-[#1E1E24] ${bgClass} ${ringClass} ring-1 transition-all duration-200 ${
        large ? "px-4 py-3" : compact ? "px-3 py-2.5" : "px-3.5 py-3"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className={`flex flex-wrap items-center gap-1.5 font-semibold text-white ${
              large ? "text-sm" : compact ? "text-[11.5px]" : "text-xs"
            }`}
          >
            <span className="truncate">{node.name}</span>
            {persistentBadge && (
              <span className="rounded-full border border-rose-500/40 bg-rose-500/[0.12] px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-rose-300">
                {persistentBadge}
              </span>
            )}
            {modeBadge && (
              <span className="rounded-full border border-amber-400/40 bg-amber-400/[0.12] px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-amber-300">
                {modeBadge}
              </span>
            )}
            {scenarioAddBadge && (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/[0.12] px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-emerald-300">
                {scenarioAddBadge}
              </span>
            )}
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

      {/* L · E · A · S dots */}
      <div className="mt-2 flex items-center gap-1.5">
        <DotPill letter="L" tone={node.dots.L} highlight={mode === "Leadership"} />
        <DotPill letter="E" tone={node.dots.E} highlight={mode === "Execution"} />
        <DotPill letter="A" tone={node.dots.A} highlight={mode === "Adaptability"} />
        <DotPill letter="S" tone={node.dots.S} highlight={mode === "Stability"} />
      </div>
    </div>
  );
}

function DotPill({
  letter,
  tone,
  highlight,
}: {
  letter: string;
  tone: DemoTone;
  highlight: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest transition-all duration-200 ${
        highlight ? "bg-white/[0.05] ring-1 ring-white/15" : ""
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotBg(tone)}`} />
      <span className="text-zinc-500">{letter}</span>
    </span>
  );
}

// ---------- Insights ----------
type Severity = "red" | "amber" | "green";

interface Insight {
  severity: Severity;
  emoji: string;
  title: string;
  body: string;
}

const DEFAULT_INSIGHTS: Insight[] = [
  {
    severity: "red",
    emoji: "🔴",
    title: "Burnout Risk — Clinical Operations",
    body:
      "Clinical Operations team shows low coping and support capacity → high burnout probability under current workload.",
  },
  {
    severity: "amber",
    emoji: "🟡",
    title: "Founder Dependency",
    body:
      "Leadership capability concentrated in 3 individuals (Alex Morgan, Jordan Lee, Taylor Brooks). Organization is fragile if any single leader is unavailable.",
  },
  {
    severity: "amber",
    emoji: "🟡",
    title: "Structural Weakness — Customer Success",
    body:
      "Customer Success team is highly adaptive but lacks structural execution discipline. Risk of inconsistent onboarding and churn signals.",
  },
  {
    severity: "red",
    emoji: "🔴",
    title: "Execution Bottleneck",
    body:
      "Execution bottleneck detected between Product and Clinical Operations. Cross-functional handoff failure risk is elevated.",
  },
];

const SCENARIO_B_INSIGHTS: Insight[] = [
  {
    severity: "green",
    emoji: "🟢",
    title: "Burnout Risk Resolved",
    body:
      "Clinical Operations workload redistributed across Casey Miller's expanded org. Coping capacity returns to safe range.",
  },
  {
    severity: "green",
    emoji: "🟢",
    title: "Leadership Coverage Strengthened",
    body:
      "Jordan Lee's role expanded with two direct reports. Founder-dependency risk reduced from High to Moderate.",
  },
  {
    severity: "amber",
    emoji: "🟡",
    title: "Customer Success Structure Improving",
    body:
      "Cross-functional pairing with Product adds execution discipline. Onboarding confidence improving — monitor through next quarter.",
  },
  {
    severity: "green",
    emoji: "🟢",
    title: "Execution Bottleneck Eased",
    body:
      "Avery Wilson elevated to Clinical Operations Lead, restoring handoff cadence between Product and Clinical Ops. Risk: Moderate → Low.",
  },
];

function InsightCard({ insight }: { insight: Insight }) {
  const borderColor =
    insight.severity === "red"
      ? "border-l-rose-500"
      : insight.severity === "amber"
        ? "border-l-amber-400"
        : "border-l-emerald-500";
  const tagText =
    insight.severity === "red"
      ? "text-rose-300"
      : insight.severity === "amber"
        ? "text-amber-300"
        : "text-emerald-300";
  const tagBg =
    insight.severity === "red"
      ? "bg-rose-500/[0.08] border-rose-500/30"
      : insight.severity === "amber"
        ? "bg-amber-400/[0.08] border-amber-400/30"
        : "bg-emerald-500/[0.08] border-emerald-500/30";
  return (
    <div
      className={`rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-5 border-l-4 ${borderColor}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{insight.emoji}</span>
          <h4 className="text-sm font-semibold text-white">{insight.title}</h4>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-widest ${tagBg} ${tagText}`}
        >
          {insight.severity === "red"
            ? "High"
            : insight.severity === "amber"
              ? "Watch"
              : "Improved"}
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
        {insight.body}
      </p>
    </div>
  );
}

// ===========================================================================
// SHARED helpers (PersonNode, CompetencyDot, Legend) used by DefaultOrgMap
// ===========================================================================

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
