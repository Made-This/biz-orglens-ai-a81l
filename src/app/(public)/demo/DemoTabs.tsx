"use client";

import { useState } from "react";

type TabKey = "founder" | "coo" | "sales" | "hr" | "investor";

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: "founder", label: "Founder / CEO", emoji: "🎯" },
  { key: "coo", label: "COO / Operator", emoji: "⚙️" },
  { key: "sales", label: "Sales / Growth", emoji: "📈" },
  { key: "hr", label: "HR / People", emoji: "👥" },
  { key: "investor", label: "Investor / Advisor", emoji: "💼" },
];

type Finding = { label: string; body: string; tone?: "warn" | "bad" | "neutral" };

const FINDINGS: Record<TabKey, { headline: string; subheading: string; items: Finding[] }> = {
  founder: {
    headline: "What the Founder / CEO sees",
    subheading: "AtlasFlow is growing but the founder is still the de facto decision-maker across too many functions.",
    items: [
      {
        label: "Founder Bottleneck",
        body: "Alex Morgan is the decision node for product, sales, and ops. Most strategic calls still route through the founder.",
        tone: "bad",
      },
      {
        label: "Key-Person Dependency",
        body: "Jordan Lee is a single point of failure for all engineering decisions. No technical deputy exists.",
        tone: "bad",
      },
      {
        label: "Next Hire Decision",
        body: "Sales leadership or Head of Revenue is the recommended next hire before the next growth phase.",
        tone: "warn",
      },
      {
        label: "Leadership Gaps",
        body: "No clear VP-layer between the CEO and functional leads. The founder is also the de facto COO.",
        tone: "warn",
      },
    ],
  },
  coo: {
    headline: "What the COO / Operator sees",
    subheading: "The operating model is founder-led and informal. Execution clarity is low across several critical functions.",
    items: [
      {
        label: "Ownership Clarity",
        body: "Operations and Customer Success reporting lines are unclear. Riley Johnson currently reports to Casey Miller — but CS should align to the revenue function.",
        tone: "bad",
      },
      {
        label: "Reporting Lines",
        body: "Casey Miller spans too wide — finance, people ops, and CS. Each of these functions needs its own clear owner.",
        tone: "warn",
      },
      {
        label: "Execution Bottlenecks",
        body: "Three leads (Growth, Sales, CS) have overlapping pipeline ownership. No single leader owns the full revenue funnel.",
        tone: "bad",
      },
      {
        label: "Operating Model Risks",
        body: "No defined handoff process between Growth → Sales → CS. Pipeline leakage risk is high as AtlasFlow scales.",
        tone: "warn",
      },
    ],
  },
  sales: {
    headline: "What the Sales / Growth lead sees",
    subheading: "Pipeline ownership is fragmented. The founder is still a primary actor in strategic sales — a pattern that won't scale.",
    items: [
      {
        label: "Sales Ownership Gap",
        body: "Pipeline splits across Jamie Carter (Growth Lead) and Avery Wilson (Sales Manager) with no clear revenue leadership layer above them.",
        tone: "bad",
      },
      {
        label: "No Clear Sales Leadership",
        body: "No VP of Sales or Revenue Lead is defined. Neither Growth nor Sales has mandate to own the full pipeline.",
        tone: "bad",
      },
      {
        label: "Founder Still Driving Sales",
        body: "Alex Morgan is involved in strategic deals as a primary decision-maker — creating a founder bottleneck in the sales motion.",
        tone: "warn",
      },
      {
        label: "Handoff Issues",
        body: "Customer Success (Riley Johnson) is isolated from the sales motion, creating churn risk at the onboarding boundary.",
        tone: "warn",
      },
    ],
  },
  hr: {
    headline: "What the HR Consultant / People lead sees",
    subheading: "Role clarity is low, leadership coverage is thin, and the team structure has no redundancy in several critical areas.",
    items: [
      {
        label: "Role Clarity",
        body: "Growth Lead and Sales Manager have overlapping accountabilities. Neither role has a defined ownership boundary for pipeline.",
        tone: "bad",
      },
      {
        label: "Team Structure Risks",
        body: "10-person leadership layer reporting to one CEO with no COO buffer. This creates structural fragility at scale.",
        tone: "bad",
      },
      {
        label: "Leadership Coverage",
        body: "Engineering, Product, and Ops each have single-person coverage. There is no succession depth in any critical function.",
        tone: "warn",
      },
      {
        label: "Competency Signals",
        body: "High delivery capacity in Engineering; low structural redundancy in Sales. People-ops function is present but underscoped.",
        tone: "neutral",
      },
    ],
  },
  investor: {
    headline: "What the Investor / Advisor sees",
    subheading: "AtlasFlow has a credible core team but is not yet ready to scale revenue or raise without structural changes.",
    items: [
      {
        label: "Scaling Readiness",
        body: "AtlasFlow is not ready to scale revenue without founder dependency reduction. The current structure requires the founder in too many execution paths.",
        tone: "bad",
      },
      {
        label: "Leadership Coverage",
        body: "Missing VP-level layer across Sales, Product, and Ops. The company is running a 42-person org on a 10-person leadership team with no middle layer.",
        tone: "bad",
      },
      {
        label: "Organizational Risk",
        body: "Key-person dependency in Engineering and Sales creates Series A execution risk. Jordan Lee leaving would be catastrophic for delivery.",
        tone: "warn",
      },
      {
        label: "Recommendation",
        body: "Resolve founder bottleneck and hire one Sales leader before expanding headcount. Clarify VP-layer structure before the next board conversation.",
        tone: "neutral",
      },
    ],
  },
};

export default function DemoTabs() {
  const [active, setActive] = useState<TabKey>("founder");
  const current = FINDINGS[active];

  return (
    <section className="mt-16">
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Multi-perspective analysis
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How different stakeholders read AtlasFlow
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          The same organizational data surfaces different insights depending on
          who is asking.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="mt-8 overflow-x-auto pb-1">
        <div className="inline-flex min-w-max items-center gap-1 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-all sm:text-sm ${
                active === t.key
                  ? "bg-indigo-500/15 text-indigo-100 ring-1 ring-inset ring-indigo-400/40"
                  : "text-zinc-400 hover:bg-[#16161A] hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            {current.headline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {current.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {current.items.map((item) => {
            const tone =
              item.tone === "bad"
                ? {
                    border: "border-rose-500/30",
                    bg: "bg-rose-500/[0.04]",
                    dot: "bg-rose-500",
                  }
                : item.tone === "warn"
                  ? {
                      border: "border-amber-500/25",
                      bg: "bg-amber-500/[0.04]",
                      dot: "bg-amber-400",
                    }
                  : {
                      border: "border-[#1E1E24]",
                      bg: "bg-[#0A0A0B]",
                      dot: "bg-indigo-400",
                    };
            return (
              <div
                key={item.label}
                className={`rounded-xl border ${tone.border} ${tone.bg} p-4`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${tone.dot}`}
                  />
                  <p className="text-xs font-semibold text-white">
                    {item.label}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
