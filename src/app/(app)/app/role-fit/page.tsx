"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  TrendingUp,
  FileText,
  X,
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

type Role =
  | "CTO"
  | "VP Sales"
  | "VP Product"
  | "Head of Operations"
  | "Engineering Lead";

type Level = "high" | "medium";

interface Requirement {
  label: string;
  level: Level;
  threshold: number;
}

interface CompetencyScore {
  label: string;
  score: number;
  meets: boolean;
}

interface Candidate {
  rank: number;
  name: string;
  currentRole: string;
  fit: number;
  strengths: string[]; // pills
  gaps: string[]; // pills
  competencies: CompetencyScore[]; // 4–5 small bars
  expand?: {
    strengths: { label: string; score: number; threshold: number; meets: boolean }[];
    gaps: { label: string; score: number; threshold: number }[];
    benchmarking: { teamAvgDelta: string; benchmarkDelta: string };
    insight: string;
  };
}

interface RoleProfile {
  role: Role;
  required: Requirement[];
  candidates: Candidate[];
  benchmarkPercentile: string;
  topCandidateLabel: string;
  topCandidateScore: number;
  teamAvgScore: number;
}

const roleProfiles: Record<Role, RoleProfile> = {
  CTO: {
    role: "CTO",
    required: [
      { label: "Structuring Work", level: "high", threshold: 8.5 },
      { label: "Evaluating Info", level: "high", threshold: 8.0 },
      { label: "Coping with Pressure", level: "high", threshold: 8.0 },
      { label: "Driving Success", level: "high", threshold: 8.5 },
      { label: "Exerting Influence", level: "medium", threshold: 7.0 },
    ],
    benchmarkPercentile: "Top 8% of CTO profiles",
    topCandidateLabel: "Chifong Dong",
    topCandidateScore: 8.9,
    teamAvgScore: 7.2,
    candidates: [
      {
        rank: 1,
        name: "Chifong Dong",
        currentRole: "CTO",
        fit: 96,
        strengths: ["Structuring 9.0", "Driving 8.9", "Evaluating 8.7"],
        gaps: [],
        competencies: [
          { label: "Struct", score: 9.0, meets: true },
          { label: "Eval", score: 8.7, meets: true },
          { label: "Cope", score: 8.5, meets: true },
          { label: "Drive", score: 8.9, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Structuring Work", score: 9.0, threshold: 8.5, meets: true },
            { label: "Evaluating Info", score: 8.7, threshold: 8.0, meets: true },
            { label: "Driving Success", score: 8.9, threshold: 8.5, meets: true },
            { label: "Coping with Pressure", score: 8.5, threshold: 8.0, meets: true },
          ],
          gaps: [],
          benchmarking: {
            teamAvgDelta: "▲ +24% above team mean",
            benchmarkDelta: "▲ +6% above CTO benchmark",
          },
          insight:
            "Chifong is an archetype CTO profile: high structuring, evaluation, and driving. Already in role — strong succession resilience.",
        },
      },
      {
        rank: 2,
        name: "Eric Li",
        currentRole: "Engineering Lead",
        fit: 87,
        strengths: ["Execution 9.1", "Structuring 8.2"],
        gaps: ["Influence moderate"],
        competencies: [
          { label: "Struct", score: 8.2, meets: false },
          { label: "Eval", score: 8.1, meets: true },
          { label: "Cope", score: 8.0, meets: true },
          { label: "Drive", score: 8.4, meets: false },
        ],
        expand: {
          strengths: [
            { label: "Execution", score: 9.1, threshold: 8.0, meets: true },
            { label: "Evaluating Info", score: 8.1, threshold: 8.0, meets: true },
            { label: "Coping with Pressure", score: 8.0, threshold: 8.0, meets: true },
          ],
          gaps: [
            { label: "Structuring Work", score: 8.2, threshold: 8.5 },
            { label: "Driving Success", score: 8.4, threshold: 8.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +13% above team mean",
            benchmarkDelta: "▼ −2% below CTO benchmark",
          },
          insight:
            "Eric is a strong successor candidate but lacks the strategic structuring depth typical of CTO archetypes. 12-month development plan recommended.",
        },
      },
      {
        rank: 3,
        name: "Yijun Sim",
        currentRole: "Sr Engineer",
        fit: 76,
        strengths: ["Execution 8.6"],
        gaps: ["Driving moderate", "Influence low"],
        competencies: [
          { label: "Struct", score: 7.8, meets: false },
          { label: "Eval", score: 8.0, meets: true },
          { label: "Cope", score: 7.5, meets: false },
          { label: "Drive", score: 7.2, meets: false },
        ],
      },
      {
        rank: 4,
        name: "Luke Cai",
        currentRole: "Product Manager",
        fit: 71,
        strengths: ["Driving 8.5"],
        gaps: ["Structuring lower than required"],
        competencies: [
          { label: "Struct", score: 7.9, meets: false },
          { label: "Eval", score: 7.5, meets: false },
          { label: "Cope", score: 7.4, meets: false },
          { label: "Drive", score: 8.5, meets: true },
        ],
      },
      {
        rank: 5,
        name: "Jun Park",
        currentRole: "Designer",
        fit: 54,
        strengths: [],
        gaps: ["Below threshold across competencies"],
        competencies: [
          { label: "Struct", score: 6.2, meets: false },
          { label: "Eval", score: 6.5, meets: false },
          { label: "Cope", score: 6.5, meets: false },
          { label: "Drive", score: 6.8, meets: false },
        ],
      },
    ],
  },
  "VP Sales": {
    role: "VP Sales",
    required: [
      { label: "Exerting Influence", level: "high", threshold: 8.5 },
      { label: "Driving Success", level: "high", threshold: 8.5 },
      { label: "Interacting", level: "high", threshold: 8.0 },
      { label: "Supporting", level: "medium", threshold: 6.5 },
      { label: "Creating Momentum", level: "high", threshold: 7.5 },
    ],
    benchmarkPercentile: "Top 9% of VP Sales profiles",
    topCandidateLabel: "Supriya Kumar",
    topCandidateScore: 8.4,
    teamAvgScore: 7.0,
    candidates: [
      {
        rank: 1,
        name: "Supriya Kumar",
        currentRole: "VP Sales",
        fit: 95,
        strengths: ["Influence 8.6", "Driving 8.7", "Interacting 8.4"],
        gaps: ["Supporting moderate"],
        competencies: [
          { label: "Infl", score: 8.6, meets: true },
          { label: "Drive", score: 8.7, meets: true },
          { label: "Interact", score: 8.4, meets: true },
          { label: "Momentum", score: 8.0, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Exerting Influence", score: 8.6, threshold: 8.5, meets: true },
            { label: "Driving Success", score: 8.7, threshold: 8.5, meets: true },
            { label: "Interacting", score: 8.4, threshold: 8.0, meets: true },
            { label: "Creating Momentum", score: 8.0, threshold: 7.5, meets: true },
          ],
          gaps: [
            { label: "Supporting", score: 6.4, threshold: 6.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +20% above team mean",
            benchmarkDelta: "▲ +5% above VP Sales benchmark",
          },
          insight:
            "Supriya is the natural successor to GTM leadership. Strong influence and momentum — closes succession gap if elevated to VP Sales.",
        },
      },
      {
        rank: 2,
        name: "Patrick Wang",
        currentRole: "Account Executive",
        fit: 78,
        strengths: ["Interacting 7.8"],
        gaps: ["Influence below threshold"],
        competencies: [
          { label: "Infl", score: 7.2, meets: false },
          { label: "Drive", score: 7.5, meets: false },
          { label: "Interact", score: 7.8, meets: false },
          { label: "Momentum", score: 7.4, meets: false },
        ],
        expand: {
          strengths: [
            { label: "Interacting", score: 7.8, threshold: 8.0, meets: false },
            { label: "Driving Success", score: 7.5, threshold: 8.5, meets: false },
          ],
          gaps: [
            { label: "Exerting Influence", score: 7.2, threshold: 8.5 },
            { label: "Creating Momentum", score: 7.4, threshold: 7.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +6% above team mean",
            benchmarkDelta: "▼ −10% below VP Sales benchmark",
          },
          insight:
            "Patrick is a competent IC closer, but a step below VP-readiness. Development gap on strategic influence.",
        },
      },
      {
        rank: 3,
        name: "Mei Tanaka",
        currentRole: "SDR",
        fit: 64,
        strengths: ["Interacting 7.0"],
        gaps: ["Influence low", "Driving low"],
        competencies: [
          { label: "Infl", score: 6.5, meets: false },
          { label: "Drive", score: 6.8, meets: false },
          { label: "Interact", score: 7.0, meets: false },
          { label: "Momentum", score: 6.6, meets: false },
        ],
      },
      {
        rank: 4,
        name: "Luke Cai",
        currentRole: "Product Manager",
        fit: 60,
        strengths: ["Driving 8.5"],
        gaps: ["Sales motion not core competency"],
        competencies: [
          { label: "Infl", score: 7.0, meets: false },
          { label: "Drive", score: 8.5, meets: true },
          { label: "Interact", score: 7.2, meets: false },
          { label: "Momentum", score: 7.0, meets: false },
        ],
      },
      {
        rank: 5,
        name: "Jun Park",
        currentRole: "Designer",
        fit: 48,
        strengths: [],
        gaps: ["Misaligned competency profile"],
        competencies: [
          { label: "Infl", score: 5.8, meets: false },
          { label: "Drive", score: 6.0, meets: false },
          { label: "Interact", score: 6.5, meets: false },
          { label: "Momentum", score: 6.2, meets: false },
        ],
      },
    ],
  },
  "VP Product": {
    role: "VP Product",
    required: [
      { label: "Achieving Goals", level: "high", threshold: 8.0 },
      { label: "Creating Solutions", level: "high", threshold: 7.5 },
      { label: "Structuring Work", level: "high", threshold: 7.5 },
      { label: "Interacting", level: "medium", threshold: 6.5 },
      { label: "Driving Success", level: "high", threshold: 7.5 },
    ],
    benchmarkPercentile: "Top 12% of VP Product profiles",
    topCandidateLabel: "Luke Cai",
    topCandidateScore: 8.7,
    teamAvgScore: 7.3,
    candidates: [
      {
        rank: 1,
        name: "Luke Cai",
        currentRole: "Product Manager",
        fit: 94,
        strengths: ["Achieving 8.7", "Creating 8.1", "Structuring 7.9"],
        gaps: ["Supporting moderate"],
        competencies: [
          { label: "Achieve", score: 8.7, meets: true },
          { label: "Create", score: 8.1, meets: true },
          { label: "Struct", score: 7.9, meets: true },
          { label: "Drive", score: 8.5, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Achieving Goals", score: 8.7, threshold: 8.0, meets: true },
            { label: "Creating Solutions", score: 8.1, threshold: 7.5, meets: true },
            { label: "Structuring Work", score: 7.9, threshold: 7.5, meets: true },
            { label: "Driving Success", score: 8.5, threshold: 7.5, meets: true },
          ],
          gaps: [
            { label: "Supporting", score: 6.2, threshold: 6.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +18% above team mean",
            benchmarkDelta: "▲ +4% above VP Product benchmark",
          },
          insight:
            "Strong innovation and execution profile for growth-stage product leadership. Luke's competency pattern closely matches a Series B product leader archetype. Primary development need: building empathetic stakeholder management alongside delivery drive.",
        },
      },
      {
        rank: 2,
        name: "Eric Li",
        currentRole: "Engineering Lead",
        fit: 89,
        strengths: ["Execution 9.1", "Structuring 8.2"],
        gaps: ["Interacting moderate"],
        competencies: [
          { label: "Achieve", score: 8.4, meets: true },
          { label: "Create", score: 8.0, meets: true },
          { label: "Struct", score: 8.2, meets: true },
          { label: "Drive", score: 8.6, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Achieving Goals", score: 8.4, threshold: 8.0, meets: true },
            { label: "Structuring Work", score: 8.2, threshold: 7.5, meets: true },
            { label: "Driving Success", score: 8.6, threshold: 7.5, meets: true },
          ],
          gaps: [
            { label: "Interacting", score: 6.4, threshold: 6.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +11% above team mean",
            benchmarkDelta: "▼ −1% below VP Product benchmark",
          },
          insight:
            "Eric is a credible product successor — execution depth is exceptional. Coaching support recommended on stakeholder interaction.",
        },
      },
      {
        rank: 3,
        name: "Yijun Sim",
        currentRole: "Sr Engineer",
        fit: 81,
        strengths: ["Execution 8.6"],
        gaps: ["Creating moderate"],
        competencies: [
          { label: "Achieve", score: 8.0, meets: true },
          { label: "Create", score: 7.0, meets: false },
          { label: "Struct", score: 7.6, meets: true },
          { label: "Drive", score: 7.4, meets: false },
        ],
      },
      {
        rank: 4,
        name: "Chifong Dong",
        currentRole: "CTO",
        fit: 78,
        strengths: ["Across the board"],
        gaps: ["Over-qualified — CTO profile better suited"],
        competencies: [
          { label: "Achieve", score: 8.5, meets: true },
          { label: "Create", score: 8.0, meets: true },
          { label: "Struct", score: 9.0, meets: true },
          { label: "Drive", score: 8.9, meets: true },
        ],
      },
      {
        rank: 5,
        name: "Jun Park",
        currentRole: "Designer",
        fit: 61,
        strengths: ["Creating 7.6"],
        gaps: ["Structuring low", "Driving moderate"],
        competencies: [
          { label: "Achieve", score: 6.8, meets: false },
          { label: "Create", score: 7.6, meets: true },
          { label: "Struct", score: 6.2, meets: false },
          { label: "Drive", score: 6.6, meets: false },
        ],
      },
    ],
  },
  "Head of Operations": {
    role: "Head of Operations",
    required: [
      { label: "Structuring Work", level: "high", threshold: 8.5 },
      { label: "Supporting", level: "high", threshold: 8.0 },
      { label: "Coping", level: "high", threshold: 8.0 },
      { label: "Evaluating Info", level: "medium", threshold: 7.0 },
      { label: "Driving Success", level: "medium", threshold: 7.0 },
    ],
    benchmarkPercentile: "Top 14% of Ops Lead profiles",
    topCandidateLabel: "Lili Mao",
    topCandidateScore: 8.4,
    teamAvgScore: 7.1,
    candidates: [
      {
        rank: 1,
        name: "Lili Mao",
        currentRole: "Head of Ops",
        fit: 92,
        strengths: ["Structuring 8.7", "Supporting 8.4", "Coping 8.2"],
        gaps: ["Driving moderate"],
        competencies: [
          { label: "Struct", score: 8.7, meets: true },
          { label: "Support", score: 8.4, meets: true },
          { label: "Cope", score: 8.2, meets: true },
          { label: "Eval", score: 7.6, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Structuring Work", score: 8.7, threshold: 8.5, meets: true },
            { label: "Supporting", score: 8.4, threshold: 8.0, meets: true },
            { label: "Coping", score: 8.2, threshold: 8.0, meets: true },
            { label: "Evaluating Info", score: 7.6, threshold: 7.0, meets: true },
          ],
          gaps: [
            { label: "Driving Success", score: 7.0, threshold: 7.0 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +18% above team mean",
            benchmarkDelta: "▲ +3% above Ops Lead benchmark",
          },
          insight:
            "Lili anchors operational stability. Single-point-of-failure risk if she leaves — succession plan strongly recommended.",
        },
      },
      {
        rank: 2,
        name: "Eric Li",
        currentRole: "Engineering Lead",
        fit: 86,
        strengths: ["Structuring 8.2", "Coping 8.0"],
        gaps: ["Supporting moderate"],
        competencies: [
          { label: "Struct", score: 8.2, meets: false },
          { label: "Support", score: 7.4, meets: false },
          { label: "Cope", score: 8.0, meets: true },
          { label: "Eval", score: 8.1, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Coping", score: 8.0, threshold: 8.0, meets: true },
            { label: "Evaluating Info", score: 8.1, threshold: 7.0, meets: true },
          ],
          gaps: [
            { label: "Structuring Work", score: 8.2, threshold: 8.5 },
            { label: "Supporting", score: 7.4, threshold: 8.0 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +12% above team mean",
            benchmarkDelta: "▼ −4% below Ops Lead benchmark",
          },
          insight:
            "Eric could absorb Ops temporarily but is best deployed in product/engineering roles long-term.",
        },
      },
      {
        rank: 3,
        name: "Yijun Sim",
        currentRole: "Sr Engineer",
        fit: 73,
        strengths: ["Coping 7.5"],
        gaps: ["Structuring below threshold"],
        competencies: [
          { label: "Struct", score: 7.8, meets: false },
          { label: "Support", score: 7.0, meets: false },
          { label: "Cope", score: 7.5, meets: false },
          { label: "Eval", score: 7.4, meets: true },
        ],
      },
      {
        rank: 4,
        name: "Patrick Wang",
        currentRole: "Account Executive",
        fit: 64,
        strengths: ["Supporting 7.0"],
        gaps: ["Structuring low"],
        competencies: [
          { label: "Struct", score: 6.6, meets: false },
          { label: "Support", score: 7.0, meets: false },
          { label: "Cope", score: 6.8, meets: false },
          { label: "Eval", score: 6.5, meets: false },
        ],
      },
      {
        rank: 5,
        name: "Yuzhe Zhao",
        currentRole: "Ops Specialist",
        fit: 32,
        strengths: [],
        gaps: ["Multi-dimensional gap — at risk"],
        competencies: [
          { label: "Struct", score: 4.5, meets: false },
          { label: "Support", score: 4.6, meets: false },
          { label: "Cope", score: 4.5, meets: false },
          { label: "Eval", score: 4.8, meets: false },
        ],
      },
    ],
  },
  "Engineering Lead": {
    role: "Engineering Lead",
    required: [
      { label: "Structuring Work", level: "high", threshold: 8.5 },
      { label: "Coping", level: "high", threshold: 8.0 },
      { label: "Evaluating Info", level: "high", threshold: 8.0 },
      { label: "Driving Success", level: "high", threshold: 7.5 },
      { label: "Exerting Influence", level: "medium", threshold: 6.0 },
    ],
    benchmarkPercentile: "Top 10% of Engineering Lead profiles",
    topCandidateLabel: "Eric Li",
    topCandidateScore: 9.1,
    teamAvgScore: 7.5,
    candidates: [
      {
        rank: 1,
        name: "Eric Li",
        currentRole: "Engineering Lead",
        fit: 95,
        strengths: ["Execution 9.1", "Structuring 8.6"],
        gaps: [],
        competencies: [
          { label: "Struct", score: 8.6, meets: true },
          { label: "Cope", score: 8.2, meets: true },
          { label: "Eval", score: 8.4, meets: true },
          { label: "Drive", score: 8.7, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Structuring Work", score: 8.6, threshold: 8.5, meets: true },
            { label: "Coping", score: 8.2, threshold: 8.0, meets: true },
            { label: "Evaluating Info", score: 8.4, threshold: 8.0, meets: true },
            { label: "Driving Success", score: 8.7, threshold: 7.5, meets: true },
          ],
          gaps: [],
          benchmarking: {
            teamAvgDelta: "▲ +21% above team mean",
            benchmarkDelta: "▲ +6% above Eng Lead benchmark",
          },
          insight:
            "Eric is the archetype Engineering Lead — high execution, high structuring, high resilience. Already in role; strong continuity.",
        },
      },
      {
        rank: 2,
        name: "Yijun Sim",
        currentRole: "Sr Engineer",
        fit: 86,
        strengths: ["Execution 8.6", "Structuring 7.9"],
        gaps: ["Influence moderate"],
        competencies: [
          { label: "Struct", score: 7.9, meets: false },
          { label: "Cope", score: 8.0, meets: true },
          { label: "Eval", score: 8.0, meets: true },
          { label: "Drive", score: 7.6, meets: true },
        ],
        expand: {
          strengths: [
            { label: "Coping", score: 8.0, threshold: 8.0, meets: true },
            { label: "Evaluating Info", score: 8.0, threshold: 8.0, meets: true },
            { label: "Driving Success", score: 7.6, threshold: 7.5, meets: true },
          ],
          gaps: [
            { label: "Structuring Work", score: 7.9, threshold: 8.5 },
          ],
          benchmarking: {
            teamAvgDelta: "▲ +10% above team mean",
            benchmarkDelta: "▼ −2% below Eng Lead benchmark",
          },
          insight:
            "Yijun is the strongest internal successor for Engineering Lead. Coaching on architectural structuring closes the remaining gap.",
        },
      },
      {
        rank: 3,
        name: "Chifong Dong",
        currentRole: "CTO",
        fit: 79,
        strengths: ["Across the board"],
        gaps: ["Over-qualified for line role"],
        competencies: [
          { label: "Struct", score: 9.0, meets: true },
          { label: "Cope", score: 8.5, meets: true },
          { label: "Eval", score: 8.7, meets: true },
          { label: "Drive", score: 8.9, meets: true },
        ],
      },
      {
        rank: 4,
        name: "Luke Cai",
        currentRole: "Product Manager",
        fit: 68,
        strengths: ["Driving 8.5"],
        gaps: ["Coping moderate", "Eval moderate"],
        competencies: [
          { label: "Struct", score: 7.6, meets: false },
          { label: "Cope", score: 7.4, meets: false },
          { label: "Eval", score: 7.5, meets: false },
          { label: "Drive", score: 8.5, meets: true },
        ],
      },
      {
        rank: 5,
        name: "Jun Park",
        currentRole: "Designer",
        fit: 50,
        strengths: [],
        gaps: ["Misaligned competency profile"],
        competencies: [
          { label: "Struct", score: 6.0, meets: false },
          { label: "Cope", score: 6.4, meets: false },
          { label: "Eval", score: 6.4, meets: false },
          { label: "Drive", score: 6.5, meets: false },
        ],
      },
    ],
  },
};

const roleOrder: Role[] = [
  "CTO",
  "VP Sales",
  "VP Product",
  "Head of Operations",
  "Engineering Lead",
];

function fitTone(fit: number): "green" | "amber" | "red" {
  if (fit >= 85) return "green";
  if (fit >= 70) return "amber";
  return "red";
}

function toneText(t: "green" | "amber" | "red") {
  if (t === "green") return "text-emerald-300";
  if (t === "amber") return "text-amber-300";
  return "text-rose-300";
}

export default function RoleFitPage() {
  const [demoMode, setDemoMode] = useState(false);

  if (demoMode) {
    return <DemoRoleFit onClose={() => setDemoMode(false)} />;
  }
  return <DefaultRoleFit onActivateDemo={() => setDemoMode(true)} />;
}

// ===========================================================================
// DEFAULT (non-demo) ROLE FIT — original content + new "View Full Demo" button
// ===========================================================================
function DefaultRoleFit({ onActivateDemo }: { onActivateDemo: () => void }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Role>("VP Product");
  const [expandedRank, setExpandedRank] = useState<number | null>(1);
  const [animate, setAnimate] = useState(false);

  const profile = roleProfiles[selected];

  useEffect(() => {
    setAnimate(false);
    setExpandedRank(1);
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header with action buttons */}
      <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Lens 2 — Role–Competency Fit Engine
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Role–Competency Fit Engine
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Identify who best fits critical roles using competency intelligence.
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
            View Full Demo Role Fit
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

      {/* Role tabs */}
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          Select role
        </p>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
          {roleOrder.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelected(r)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                selected === r
                  ? "bg-indigo-500 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Rankings */}
        <section className="relative">
          <div className="overflow-hidden rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118]">
            <div className="grid grid-cols-[40px_1.5fr_1fr_1.5fr] gap-4 border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              <span>#</span>
              <span>Candidate</span>
              <span>Fit</span>
              <span>Strengths · Gaps</span>
            </div>

            {profile.candidates.map((c, idx) => {
              const t = fitTone(c.fit);
              const locked = idx >= 2;
              const isExpanded = expandedRank === c.rank && !locked;
              const isClickable = !locked && c.expand;
              return (
                <div key={c.name} className="border-b border-[#1E1E24] last:border-0">
                  <div
                    onClick={() => {
                      if (!isClickable) return;
                      setExpandedRank(isExpanded ? null : c.rank);
                    }}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (!isClickable) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedRank(isExpanded ? null : c.rank);
                      }
                    }}
                    className={`relative grid grid-cols-[40px_1.5fr_1fr_1.5fr] items-center gap-4 px-5 py-4 transition-colors ${
                      isClickable
                        ? "cursor-pointer hover:bg-white/[0.02]"
                        : ""
                    } ${
                      locked ? "select-none" : ""
                    } ${isExpanded ? "bg-indigo-500/[0.04]" : ""}`}
                  >
                    <div className={locked ? "pointer-events-none blur-sm" : ""}>
                      <span className="font-mono text-xs text-zinc-500">
                        #{c.rank}
                      </span>
                    </div>
                    <div className={locked ? "pointer-events-none blur-sm" : ""}>
                      <p className="text-sm font-semibold text-white">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {c.currentRole}
                      </p>
                    </div>
                    <div className={locked ? "pointer-events-none blur-sm" : ""}>
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-2xl font-bold leading-none ${toneText(t)}`}
                        >
                          {c.fit}%
                        </span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {c.competencies.map((cm, i) => (
                          <div
                            key={i}
                            title={`${cm.label}: ${cm.score.toFixed(1)}`}
                            className={`h-1.5 flex-1 rounded-full ${
                              cm.meets
                                ? "bg-emerald-500/80"
                                : "bg-rose-500/60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      className={`min-w-0 ${locked ? "pointer-events-none blur-sm" : ""}`}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {c.strengths.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300"
                          >
                            {s}
                          </span>
                        ))}
                        {c.gaps.slice(0, 2).map((g) => (
                          <span
                            key={g}
                            className="rounded-full border border-rose-500/30 bg-rose-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-rose-300"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                      {isClickable && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-zinc-500">
                          <ChevronDown
                            className={`h-3 w-3 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          {isExpanded ? "Collapse" : "Expand details"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expandable detail */}
                  {!locked && c.expand && (
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <CandidateDetail
                          candidate={c}
                          role={profile.role}
                          animate={animate && isExpanded}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Paywall overlay anchored to locked rows */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px]">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8">
              <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#111118] to-[#0A0A0B] p-6 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
                <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">
                  Unlock Full Rankings
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  See every candidate, fit score, and gap analysis.
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => unlockAndGo(router)}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
                  >
                    Unlock Full Rankings — $49
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onActivateDemo}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-indigo-500/50 bg-transparent px-4 py-2 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/10 hover:text-indigo-200"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View Full Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right panel: requirements + benchmarking */}
        <aside className="space-y-5 lg:sticky lg:top-10 lg:self-start">
          {/* Requirements */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Required Competencies
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {profile.role}
            </h3>

            <div className="mt-4 space-y-3 border-t border-[#1E1E24] pt-4">
              {profile.required.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-2 text-sm text-zinc-300">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        r.level === "high"
                          ? "bg-indigo-400"
                          : "bg-amber-400"
                      }`}
                    />
                    {r.label}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${
                      r.level === "high"
                        ? "border-indigo-500/30 bg-indigo-500/[0.08] text-indigo-300"
                        : "border-amber-400/30 bg-amber-400/[0.08] text-amber-300"
                    }`}
                  >
                    {r.level === "high" ? "High" : "Medium"} ≥ {r.threshold}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarking */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Benchmarking
            </p>
            <h3 className="mt-2 text-sm font-semibold text-white">
              {profile.topCandidateLabel} vs Team Avg
            </h3>
            <div className="mt-4 space-y-3">
              <BenchmarkBar
                label={profile.topCandidateLabel}
                score={profile.topCandidateScore}
                max={10}
                color="bg-emerald-500"
                animate={animate}
              />
              <BenchmarkBar
                label="Team Average"
                score={profile.teamAvgScore}
                max={10}
                color="bg-zinc-500"
                animate={animate}
              />
            </div>

            <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.06] p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
                <TrendingUp className="h-3 w-3" />
                Percentile
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {profile.benchmarkPercentile}
              </p>
            </div>
          </div>

          {/* Methodology */}
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
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

function BenchmarkBar({
  label,
  score,
  max,
  color,
  animate,
}: {
  label: string;
  score: number;
  max: number;
  color: string;
  animate: boolean;
}) {
  const pct = (score / max) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono text-zinc-200">{score.toFixed(1)}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`h-full ${color} transition-[width] duration-[1100ms] ease-out`}
          style={{ width: animate ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function CandidateDetail({
  candidate,
  role,
  animate,
}: {
  candidate: Candidate;
  role: Role;
  animate: boolean;
}) {
  if (!candidate.expand) return null;
  const ex = candidate.expand;
  const t = fitTone(candidate.fit);

  return (
    <div className="border-t border-[#1E1E24] bg-[#0A0A0B] px-5 py-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
            Detailed Fit Breakdown
          </p>
          <h4 className="mt-1 text-base font-semibold text-white">
            {candidate.name} — {role} Fit:{" "}
            <span className={toneText(t)}>{candidate.fit}%</span>
          </h4>
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-300">
            Strengths
          </p>
          <div className="mt-3 space-y-2.5">
            {ex.strengths.map((s) => (
              <DetailBar
                key={s.label}
                label={s.label}
                score={s.score}
                threshold={s.threshold}
                meets
                animate={animate}
              />
            ))}
            {ex.strengths.length === 0 && (
              <p className="text-xs italic text-zinc-500">
                No standout strengths above threshold.
              </p>
            )}
          </div>
        </div>

        {/* Gaps */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-rose-300">
            Gaps
          </p>
          <div className="mt-3 space-y-2.5">
            {ex.gaps.map((g) => (
              <DetailBar
                key={g.label}
                label={g.label}
                score={g.score}
                threshold={g.threshold}
                meets={false}
                animate={animate}
              />
            ))}
            {ex.gaps.length === 0 && (
              <p className="text-xs italic text-zinc-500">
                No critical gaps identified.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Benchmarking */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#1E1E24] bg-[#111118] p-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            vs Team Average
          </p>
          <p className="mt-1 text-sm font-semibold text-emerald-300">
            {ex.benchmarking.teamAvgDelta}
          </p>
        </div>
        <div className="rounded-lg border border-[#1E1E24] bg-[#111118] p-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            vs Role Benchmark
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${
              ex.benchmarking.benchmarkDelta.startsWith("▲")
                ? "text-emerald-300"
                : "text-amber-300"
            }`}
          >
            {ex.benchmarking.benchmarkDelta}
          </p>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.06] p-4">
        <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
          <Sparkles className="h-3 w-3" />
          AI Insight
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-200">
          {ex.insight}
        </p>
      </div>
    </div>
  );
}

function DetailBar({
  label,
  score,
  threshold,
  meets,
  animate,
}: {
  label: string;
  score: number;
  threshold: number;
  meets: boolean;
  animate: boolean;
}) {
  const pct = (score / 10) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="text-zinc-300">{label}</span>
        <span className="flex items-center gap-2">
          <span
            className={`font-mono ${
              meets ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {score.toFixed(1)}
          </span>
          <span className="text-zinc-600">/ {threshold.toFixed(1)}</span>
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`h-full transition-[width] duration-[1100ms] ease-out ${
            meets
              ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
              : "bg-gradient-to-r from-rose-500 to-rose-300"
          }`}
          style={{ width: animate ? `${pct}%` : "0%" }}
        />
      </div>
      <p className="mt-1 text-[10px] text-zinc-500">
        {meets ? (
          <span className="text-emerald-400">✓ Meets requirement</span>
        ) : (
          <span className="text-amber-400">↗ Development area</span>
        )}
      </p>
    </div>
  );
}

// ===========================================================================
// DEMO ROLE FIT — Alpha Investment Group · 4 roles · full ranking unlocked
// ===========================================================================

type DemoRole =
  | "Investment Lead"
  | "Operations Manager"
  | "Product Manager"
  | "Research Lead";

const DEMO_ROLE_ORDER: DemoRole[] = [
  "Investment Lead",
  "Operations Manager",
  "Product Manager",
  "Research Lead",
];

interface DemoRequirement {
  label: string;
  weight: number; // 0-100
}

interface DemoBreakdown {
  leadership: number;
  execution: number;
  adaptability: number;
  stability: number;
  risk: number; // lower = better
}

interface DemoCandidate {
  rank: number;
  name: string;
  fit: number;
  strengths: string[];
  gaps: string[];
  breakdown: DemoBreakdown;
  insight: string;
  benchmarkNote: string;
}

interface DemoRoleProfile {
  role: DemoRole;
  description: string;
  requirements: DemoRequirement[];
  candidates: DemoCandidate[];
}

// Reusable per-person breakdowns + insights (the spec calls these out by name)
const PERSON_BREAKDOWNS: Record<
  string,
  { breakdown: DemoBreakdown; insight: string }
> = {
  "Chifong Dong": {
    breakdown: { leadership: 92, execution: 96, adaptability: 78, stability: 85, risk: 12 },
    insight:
      "Strong strategic and execution profile. Suitable for scaling-stage investment leadership. Monitor adaptability in ambiguous environments.",
  },
  "Eric Li": {
    breakdown: { leadership: 88, execution: 93, adaptability: 84, stability: 86, risk: 14 },
    insight:
      "Analytical depth and execution discipline at the top of the org. Best deployed in technical leadership where structured judgment is critical.",
  },
  "Yijun Sim": {
    breakdown: { leadership: 78, execution: 88, adaptability: 80, stability: 78, risk: 22 },
    insight:
      "Strong evaluator with high goal achievement. Develops well into mid-level leadership; coaching needed on composure under sustained pressure.",
  },
  "Luke Cai": {
    breakdown: { leadership: 82, execution: 85, adaptability: 92, stability: 74, risk: 24 },
    insight:
      "High innovation and interpersonal energy. Best suited for product or commercial leadership; pair with a strong operator for delivery discipline.",
  },
  "Supriya Kumar": {
    breakdown: { leadership: 84, execution: 80, adaptability: 78, stability: 82, risk: 20 },
    insight:
      "People-first leader with strong achievement orientation. Ideal for cross-functional people-leadership roles requiring trust-building at scale.",
  },
  "Lili Mao": {
    breakdown: { leadership: 88, execution: 92, adaptability: 74, stability: 90, risk: 15 },
    insight:
      "Exceptional delivery and team support orientation. Strong operational leader. Consider for cross-functional execution roles.",
  },
  "Joyce Zhang": {
    breakdown: { leadership: 72, execution: 58, adaptability: 84, stability: 42, risk: 68 },
    insight:
      "High social energy and network orientation. Significant risk under operational pressure. Best suited for stakeholder-facing or BD roles.",
  },
};

const PERSON_TITLE: Record<string, string> = {
  "Chifong Dong": "Head of Investment",
  "Eric Li": "Head of Research",
  "Yijun Sim": "Senior Analyst",
  "Luke Cai": "Head of Product",
  "Supriya Kumar": "Head of People",
  "Lili Mao": "Head of Operations",
  "Joyce Zhang": "Operations Lead",
};

const DEMO_ROLE_PROFILES: Record<DemoRole, DemoRoleProfile> = {
  "Investment Lead": {
    role: "Investment Lead",
    description:
      "Leads investment strategy, sourcing and execution. Requires high goal-orientation and analytical judgment.",
    requirements: [
      { label: "Achieving Goals", weight: 95 },
      { label: "Evaluating Information", weight: 90 },
      { label: "Driving Success", weight: 88 },
      { label: "Exerting Influence", weight: 85 },
      { label: "Coping with Pressure", weight: 80 },
    ],
    candidates: [
      {
        rank: 1,
        name: "Chifong Dong",
        fit: 95,
        strengths: ["Strategic drive", "Goal achievement"],
        gaps: ["Creative solutions"],
        breakdown: PERSON_BREAKDOWNS["Chifong Dong"].breakdown,
        insight: PERSON_BREAKDOWNS["Chifong Dong"].insight,
        benchmarkNote:
          "Chifong Dong scores 8% above benchmark for Investment Lead requirements.",
      },
      {
        rank: 2,
        name: "Eric Li",
        fit: 91,
        strengths: ["Analytical", "Execution"],
        gaps: ["Influence"],
        breakdown: PERSON_BREAKDOWNS["Eric Li"].breakdown,
        insight: PERSON_BREAKDOWNS["Eric Li"].insight,
        benchmarkNote:
          "Eric Li scores 4% above benchmark for Investment Lead requirements.",
      },
      {
        rank: 3,
        name: "Yijun Sim",
        fit: 90,
        strengths: ["Goals", "Evaluation"],
        gaps: ["Pressure coping"],
        breakdown: PERSON_BREAKDOWNS["Yijun Sim"].breakdown,
        insight: PERSON_BREAKDOWNS["Yijun Sim"].insight,
        benchmarkNote:
          "Yijun Sim scores 3% above benchmark for Investment Lead requirements.",
      },
      {
        rank: 4,
        name: "Luke Cai",
        fit: 88,
        strengths: ["Innovation", "Interaction"],
        gaps: ["Structure"],
        breakdown: PERSON_BREAKDOWNS["Luke Cai"].breakdown,
        insight: PERSON_BREAKDOWNS["Luke Cai"].insight,
        benchmarkNote:
          "Luke Cai scores 1% above benchmark for Investment Lead requirements.",
      },
      {
        rank: 5,
        name: "Supriya Kumar",
        fit: 85,
        strengths: ["People support", "Goals"],
        gaps: ["Influence"],
        breakdown: PERSON_BREAKDOWNS["Supriya Kumar"].breakdown,
        insight: PERSON_BREAKDOWNS["Supriya Kumar"].insight,
        benchmarkNote:
          "Supriya Kumar scores 2% below benchmark for Investment Lead requirements.",
      },
      {
        rank: 6,
        name: "Lili Mao",
        fit: 82,
        strengths: ["Delivery", "People support"],
        gaps: ["Analytical depth"],
        breakdown: PERSON_BREAKDOWNS["Lili Mao"].breakdown,
        insight: PERSON_BREAKDOWNS["Lili Mao"].insight,
        benchmarkNote:
          "Lili Mao scores 5% below benchmark for Investment Lead requirements.",
      },
    ],
  },
  "Operations Manager": {
    role: "Operations Manager",
    description:
      "Owns operational delivery, process discipline, and people support across the organization.",
    requirements: [
      { label: "Structuring Work", weight: 95 },
      { label: "Coping with Pressure", weight: 90 },
      { label: "Supporting Individuals", weight: 88 },
      { label: "Driving Success", weight: 85 },
      { label: "Achieving Goals", weight: 80 },
    ],
    candidates: [
      {
        rank: 1,
        name: "Lili Mao",
        fit: 94,
        strengths: ["Structuring", "Supporting", "Delivery"],
        gaps: ["Analytical rigor"],
        breakdown: PERSON_BREAKDOWNS["Lili Mao"].breakdown,
        insight: PERSON_BREAKDOWNS["Lili Mao"].insight,
        benchmarkNote:
          "Lili Mao scores 9% above benchmark for Operations Manager requirements.",
      },
      {
        rank: 2,
        name: "Supriya Kumar",
        fit: 89,
        strengths: ["Support", "Goals"],
        gaps: ["Coping under pressure"],
        breakdown: PERSON_BREAKDOWNS["Supriya Kumar"].breakdown,
        insight: PERSON_BREAKDOWNS["Supriya Kumar"].insight,
        benchmarkNote:
          "Supriya Kumar scores 5% above benchmark for Operations Manager requirements.",
      },
      {
        rank: 3,
        name: "Chifong Dong",
        fit: 85,
        strengths: ["Goals", "Drive"],
        gaps: ["People development"],
        breakdown: PERSON_BREAKDOWNS["Chifong Dong"].breakdown,
        insight: PERSON_BREAKDOWNS["Chifong Dong"].insight,
        benchmarkNote:
          "Chifong Dong scores 1% above benchmark for Operations Manager requirements.",
      },
      {
        rank: 4,
        name: "Yijun Sim",
        fit: 80,
        strengths: ["Evaluation"],
        gaps: ["Structure", "Support"],
        breakdown: PERSON_BREAKDOWNS["Yijun Sim"].breakdown,
        insight: PERSON_BREAKDOWNS["Yijun Sim"].insight,
        benchmarkNote:
          "Yijun Sim scores 3% below benchmark for Operations Manager requirements.",
      },
      {
        rank: 5,
        name: "Joyce Zhang",
        fit: 72,
        strengths: ["Interaction", "Influence"],
        gaps: ["Structure", "Composure"],
        breakdown: PERSON_BREAKDOWNS["Joyce Zhang"].breakdown,
        insight: PERSON_BREAKDOWNS["Joyce Zhang"].insight,
        benchmarkNote:
          "Joyce Zhang scores 14% below benchmark for Operations Manager requirements.",
      },
      {
        rank: 6,
        name: "Luke Cai",
        fit: 70,
        strengths: ["Innovation"],
        gaps: ["Structure", "Coping"],
        breakdown: PERSON_BREAKDOWNS["Luke Cai"].breakdown,
        insight: PERSON_BREAKDOWNS["Luke Cai"].insight,
        benchmarkNote:
          "Luke Cai scores 16% below benchmark for Operations Manager requirements.",
      },
    ],
  },
  "Product Manager": {
    role: "Product Manager",
    description:
      "Drives product strategy, customer empathy, and execution velocity across cross-functional teams.",
    requirements: [
      { label: "Creating Solutions", weight: 92 },
      { label: "Interacting with People", weight: 88 },
      { label: "Achieving Goals", weight: 85 },
      { label: "Driving Success", weight: 82 },
      { label: "Exerting Influence", weight: 78 },
    ],
    candidates: [
      {
        rank: 1,
        name: "Luke Cai",
        fit: 93,
        strengths: ["Innovation", "Interaction", "Goals"],
        gaps: ["Structural discipline"],
        breakdown: PERSON_BREAKDOWNS["Luke Cai"].breakdown,
        insight: PERSON_BREAKDOWNS["Luke Cai"].insight,
        benchmarkNote:
          "Luke Cai scores 9% above benchmark for Product Manager requirements.",
      },
      {
        rank: 2,
        name: "Joyce Zhang",
        fit: 85,
        strengths: ["Interaction", "Influence"],
        gaps: ["Completing tasks", "Composure"],
        breakdown: PERSON_BREAKDOWNS["Joyce Zhang"].breakdown,
        insight: PERSON_BREAKDOWNS["Joyce Zhang"].insight,
        benchmarkNote:
          "Joyce Zhang scores 1% above benchmark for Product Manager requirements.",
      },
      {
        rank: 3,
        name: "Yijun Sim",
        fit: 82,
        strengths: ["Goals", "Evaluation"],
        gaps: ["Creative output"],
        breakdown: PERSON_BREAKDOWNS["Yijun Sim"].breakdown,
        insight: PERSON_BREAKDOWNS["Yijun Sim"].insight,
        benchmarkNote:
          "Yijun Sim scores 2% below benchmark for Product Manager requirements.",
      },
      {
        rank: 4,
        name: "Eric Li",
        fit: 79,
        strengths: ["Analytical"],
        gaps: ["Social interaction", "Influence"],
        breakdown: PERSON_BREAKDOWNS["Eric Li"].breakdown,
        insight: PERSON_BREAKDOWNS["Eric Li"].insight,
        benchmarkNote:
          "Eric Li scores 5% below benchmark for Product Manager requirements.",
      },
      {
        rank: 5,
        name: "Chifong Dong",
        fit: 75,
        strengths: ["Drive"],
        gaps: ["Innovation", "Interaction"],
        breakdown: PERSON_BREAKDOWNS["Chifong Dong"].breakdown,
        insight: PERSON_BREAKDOWNS["Chifong Dong"].insight,
        benchmarkNote:
          "Chifong Dong scores 9% below benchmark for Product Manager requirements.",
      },
      {
        rank: 6,
        name: "Lili Mao",
        fit: 72,
        strengths: ["Support", "Delivery"],
        gaps: ["Innovation"],
        breakdown: PERSON_BREAKDOWNS["Lili Mao"].breakdown,
        insight: PERSON_BREAKDOWNS["Lili Mao"].insight,
        benchmarkNote:
          "Lili Mao scores 12% below benchmark for Product Manager requirements.",
      },
    ],
  },
  "Research Lead": {
    role: "Research Lead",
    description:
      "Leads investment research, sets analytical standards, and translates data into insight at the leadership level.",
    requirements: [
      { label: "Evaluating Information", weight: 95 },
      { label: "Creating Solutions", weight: 90 },
      { label: "Achieving Goals", weight: 85 },
      { label: "Structuring Work", weight: 82 },
      { label: "Driving Success", weight: 78 },
    ],
    candidates: [
      {
        rank: 1,
        name: "Eric Li",
        fit: 96,
        strengths: ["Analytical depth", "Evaluation", "Goal drive"],
        gaps: ["Interpersonal influence"],
        breakdown: PERSON_BREAKDOWNS["Eric Li"].breakdown,
        insight: PERSON_BREAKDOWNS["Eric Li"].insight,
        benchmarkNote:
          "Eric Li scores 12% above benchmark for Research Lead requirements.",
      },
      {
        rank: 2,
        name: "Chifong Dong",
        fit: 88,
        strengths: ["Goal achievement", "Drive"],
        gaps: ["Creative depth"],
        breakdown: PERSON_BREAKDOWNS["Chifong Dong"].breakdown,
        insight: PERSON_BREAKDOWNS["Chifong Dong"].insight,
        benchmarkNote:
          "Chifong Dong scores 4% above benchmark for Research Lead requirements.",
      },
      {
        rank: 3,
        name: "Yijun Sim",
        fit: 85,
        strengths: ["Evaluation", "Goals"],
        gaps: ["Innovation"],
        breakdown: PERSON_BREAKDOWNS["Yijun Sim"].breakdown,
        insight: PERSON_BREAKDOWNS["Yijun Sim"].insight,
        benchmarkNote:
          "Yijun Sim scores 1% above benchmark for Research Lead requirements.",
      },
      {
        rank: 4,
        name: "Luke Cai",
        fit: 78,
        strengths: ["Innovation"],
        gaps: ["Analytical rigor", "Structure"],
        breakdown: PERSON_BREAKDOWNS["Luke Cai"].breakdown,
        insight: PERSON_BREAKDOWNS["Luke Cai"].insight,
        benchmarkNote:
          "Luke Cai scores 6% below benchmark for Research Lead requirements.",
      },
      {
        rank: 5,
        name: "Lili Mao",
        fit: 72,
        strengths: ["Structuring", "Delivery"],
        gaps: ["Analytical depth"],
        breakdown: PERSON_BREAKDOWNS["Lili Mao"].breakdown,
        insight: PERSON_BREAKDOWNS["Lili Mao"].insight,
        benchmarkNote:
          "Lili Mao scores 12% below benchmark for Research Lead requirements.",
      },
      {
        rank: 6,
        name: "Joyce Zhang",
        fit: 60,
        strengths: ["Influence"],
        gaps: ["Evaluation", "Structure", "Composure"],
        breakdown: PERSON_BREAKDOWNS["Joyce Zhang"].breakdown,
        insight: PERSON_BREAKDOWNS["Joyce Zhang"].insight,
        benchmarkNote:
          "Joyce Zhang scores 24% below benchmark for Research Lead requirements.",
      },
    ],
  },
};

function DemoRoleFit({ onClose }: { onClose: () => void }) {
  const [activeRole, setActiveRole] = useState<DemoRole>("Investment Lead");
  const [expandedRank, setExpandedRank] = useState<number | null>(1);

  const profile = DEMO_ROLE_PROFILES[activeRole];

  // Reset expand to top candidate when role changes
  useEffect(() => {
    setExpandedRank(1);
  }, [activeRole]);

  const expandedCandidate = useMemo(
    () => profile.candidates.find((c) => c.rank === expandedRank) ?? null,
    [profile, expandedRank]
  );

  return (
    <div className="-mx-6 -mt-16 md:-mx-10 md:-mt-10">
      <DemoBanner onClose={onClose} />

      <div className="mx-auto mt-6 max-w-[1400px] px-6 pb-12 md:px-10">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Lens 2 — Role Competency Intelligence
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Role–Competency Fit Engine
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                <strong className="text-white">Alpha Investment Group</strong>
              </span>
              <span className="text-zinc-700">·</span>
              <span>30 employees</span>
              <span className="text-zinc-700">·</span>
              <span>Great 8 competency model · HUCAMA</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-indigo-600 bg-transparent px-5 py-2.5 text-sm font-semibold text-indigo-300 transition-all hover:bg-indigo-600/10 hover:text-indigo-200"
            >
              <FileText className="h-4 w-4" />
              View Full Demo Role Fit
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

        {/* Role tabs */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Select role
          </p>
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
            {DEMO_ROLE_ORDER.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRole(r)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeRole === r
                    ? "bg-indigo-600 text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* LEFT: Ranking table */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118]">
              <div className="grid grid-cols-[40px_1.4fr_1.5fr_1.4fr_70px] gap-4 border-b border-[#1E1E24] bg-[#0A0A0B] px-5 py-3 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                <span>#</span>
                <span>Candidate</span>
                <span>Fit Score</span>
                <span>Strengths · Gaps</span>
                <span className="text-right">Detail</span>
              </div>

              {profile.candidates.map((c) => {
                const t = fitTone(c.fit);
                const isExpanded = expandedRank === c.rank;
                return (
                  <div
                    key={c.name}
                    className="border-b border-[#1E1E24] last:border-0"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        setExpandedRank(isExpanded ? null : c.rank)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setExpandedRank(isExpanded ? null : c.rank);
                        }
                      }}
                      className={`grid cursor-pointer grid-cols-[40px_1.4fr_1.5fr_1.4fr_70px] items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] ${
                        isExpanded ? "bg-indigo-500/[0.05]" : ""
                      }`}
                    >
                      {/* Rank pill */}
                      <div>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] font-bold text-indigo-200 ring-1 ring-indigo-500/40">
                          {c.rank}
                        </span>
                      </div>
                      {/* Name */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {c.name}
                        </p>
                        <p className="truncate text-[11px] text-zinc-500">
                          {PERSON_TITLE[c.name] ?? "Team Member"}
                        </p>
                      </div>
                      {/* Fit bar */}
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                t === "green"
                                  ? "bg-gradient-to-r from-indigo-600 to-indigo-400"
                                  : t === "amber"
                                    ? "bg-gradient-to-r from-indigo-500 to-amber-300"
                                    : "bg-gradient-to-r from-indigo-500 to-rose-300"
                              }`}
                              style={{ width: `${c.fit}%` }}
                            />
                          </div>
                          <span
                            className={`shrink-0 rounded-full border border-indigo-500/30 bg-indigo-500/[0.1] px-2 py-0.5 font-mono text-xs font-bold ${toneText(t)}`}
                          >
                            {c.fit}%
                          </span>
                        </div>
                      </div>
                      {/* Pills */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap gap-1.5">
                          {c.strengths.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300"
                            >
                              {s}
                            </span>
                          ))}
                          {c.gaps.slice(0, 3).map((g) => (
                            <span
                              key={g}
                              className="rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-2 py-0.5 text-[10px] font-medium text-amber-300"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Expand toggle */}
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                          <ChevronDown
                            className={`h-3 w-3 text-indigo-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          {isExpanded ? "Hide" : "View"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <DemoCandidateDetail
                          candidate={c}
                          isOpen={isExpanded}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* RIGHT: Role requirements + benchmark */}
          <aside className="space-y-5 lg:sticky lg:top-10 lg:self-start">
            <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
              <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
                Role Requirements
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {profile.role}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                {profile.description}
              </p>

              <div className="mt-4 space-y-3.5 border-t border-[#1E1E24] pt-4">
                {profile.requirements.map((req) => (
                  <div key={req.label}>
                    <div className="flex items-baseline justify-between text-[11.5px]">
                      <span className="text-zinc-300">{req.label}</span>
                      <span className="font-mono text-zinc-200">
                        {req.weight}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-700 ease-out"
                        style={{ width: `${req.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
              <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
                Top Match
              </p>
              {profile.candidates[0] && (
                <>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    {profile.candidates[0].name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-zinc-500">
                    {PERSON_TITLE[profile.candidates[0].name] ?? "Team Member"}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-mono text-3xl font-bold text-emerald-300">
                      {profile.candidates[0].fit}%
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                      role fit
                    </span>
                  </div>
                  <div className="mt-4 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.06] p-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
                      <TrendingUp className="h-3 w-3" />
                      Benchmark
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-200">
                      {profile.candidates[0].benchmarkNote}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
              <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                Methodology
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Fit scores combine HUCAMA psychometric inputs and Great 8
                behavioral signals weighted by role-specific competency
                requirements.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <section className="mt-14 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-[#111118] to-[#0A0A0B] p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)]">
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-300">
            This is a demo · Real analysis is built from your team
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
            Run role-fit on every role in your organization
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
            Upload your team&apos;s HUCAMA reports, get back fit-scored
            candidate rankings for every key role — strengths, gaps, and
            development paths included.
          </p>
          <a
            href={CHECKOUT_URL}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-500"
          >
            <Sparkles className="h-4 w-4" />
            Unlock Full Analysis — $49
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
              Demo Mode — Role Competency Intelligence
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-indigo-100/90">
              Fully unlocked preview · Alpha Investment Group · 30 employees
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
          >
            Unlock Full Analysis — $49
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

// ---------- Demo Candidate Detail (5-dimension breakdown) ----------
function DemoCandidateDetail({
  candidate,
  isOpen,
}: {
  candidate: DemoCandidate;
  isOpen: boolean;
}) {
  const dims: { label: string; value: number; lowerBetter?: boolean }[] = [
    { label: "Leadership Readiness", value: candidate.breakdown.leadership },
    { label: "Execution Reliability", value: candidate.breakdown.execution },
    { label: "Adaptability", value: candidate.breakdown.adaptability },
    {
      label: "Stability Under Pressure",
      value: candidate.breakdown.stability,
    },
    {
      label: "Organizational Risk",
      value: candidate.breakdown.risk,
      lowerBetter: true,
    },
  ];

  return (
    <div className="border-t border-[#1E1E24] bg-[#0A0A0B] px-5 py-5">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
            5-Dimension Breakdown
          </p>
          <div className="mt-3 space-y-3">
            {dims.map((d) => (
              <DemoDimensionBar
                key={d.label}
                label={d.label}
                value={d.value}
                lowerBetter={d.lowerBetter}
                animate={isOpen}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {/* AI Insight */}
          <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/[0.06] p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
              <Sparkles className="h-3 w-3" />
              AI Insight
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {candidate.insight}
            </p>
          </div>

          {/* Strengths pills */}
          {candidate.strengths.length > 0 && (
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
              <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-300">
                Strengths
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {candidate.strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.1] px-2 py-0.5 text-[11px] font-medium text-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gaps pills */}
          {candidate.gaps.length > 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-3">
              <p className="text-[10px] font-medium uppercase tracking-widest text-amber-300">
                Gaps
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {candidate.gaps.map((g) => (
                  <span
                    key={g}
                    className="rounded-full border border-amber-400/30 bg-amber-400/[0.1] px-2 py-0.5 text-[11px] font-medium text-amber-200"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Benchmark note */}
      <div className="mt-5 rounded-lg border border-[#1E1E24] bg-[#111118] p-3.5">
        <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
          <TrendingUp className="h-3 w-3" />
          vs. Role Benchmark
        </p>
        <p className="mt-1 text-sm font-medium text-zinc-200">
          {candidate.benchmarkNote}
        </p>
      </div>
    </div>
  );
}

function DemoDimensionBar({
  label,
  value,
  lowerBetter,
  animate,
}: {
  label: string;
  value: number;
  lowerBetter?: boolean;
  animate: boolean;
}) {
  const isGood = lowerBetter ? value <= 25 : value >= 80;
  const isWarn = lowerBetter
    ? value > 25 && value <= 50
    : value >= 65 && value < 80;

  const barColor = isGood
    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
    : isWarn
      ? "bg-gradient-to-r from-amber-500 to-amber-300"
      : lowerBetter
        ? "bg-gradient-to-r from-rose-500 to-rose-300"
        : "bg-gradient-to-r from-rose-500 to-rose-300";
  const valueColor = isGood
    ? "text-emerald-300"
    : isWarn
      ? "text-amber-300"
      : "text-rose-300";

  return (
    <div>
      <div className="flex items-baseline justify-between text-[11.5px]">
        <span className="text-zinc-300">
          {label}
          {lowerBetter && (
            <span className="ml-1 text-[9px] uppercase tracking-widest text-zinc-600">
              lower = better
            </span>
          )}
        </span>
        <span className={`font-mono font-semibold ${valueColor}`}>
          {value}%
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className={`h-full rounded-full transition-[width] duration-[1100ms] ease-out ${barColor}`}
          style={{ width: animate ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}
