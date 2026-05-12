import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";
const FULL_REPORT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md77k46snb81k8f7vgmm46hbzx86gc8y";
const ADVISORY_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7c6ccpy7gdd50t7fw9a7w1fd86gtxy";

type Tier = {
  name: string;
  badge?: string;
  badgeOriginal?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  ctaSubtext?: string;
  tone: "ghost" | "highlighted" | "standard" | "premium";
  ribbon?: string;
};

const tiers: Tier[] = [
  {
    name: "Quick Scan",
    badge: "$49",
    badgeOriginal: "Normally $149",
    ribbon: "Most Popular",
    description:
      "For founders who need clarity fast. Get a fast read on team structure, role-fit signals, ownership gaps, and scaling risks — delivered in minutes.",
    features: [
      "Competency heatmap across your team",
      "Role-fit rankings (Great 8 model)",
      "3-scenario org comparison",
      "Risk summary with gap identification",
      "Instant delivery — results in minutes",
    ],
    ctaLabel: "Get Your Analysis",
    ctaHref: FOUNDER_SNAPSHOT_CHECKOUT_URL,
    ctaExternal: true,
    tone: "standard",
  },
  {
    name: "Full Report",
    badge: "$249",
    ribbon: undefined,
    description:
      "For founders preparing for a raise or restructure. Human-reviewed analysis with detailed coverage, a board-ready founder memo, and 48-hour delivery.",
    features: [
      "Everything in Quick Scan",
      "Human-reviewed analysis and annotations",
      "Founder memo export (board-ready format)",
      "Detailed leadership coverage assessment",
      "Priority delivery — 48 hours",
    ],
    ctaLabel: "Get Full Report",
    ctaHref: FULL_REPORT_CHECKOUT_URL,
    ctaExternal: true,
    tone: "highlighted",
  },
  {
    name: "Advisory Session",
    badge: "$999",
    description:
      "For founders who want expert guidance. Everything in Full Report plus a 90-minute 1:1 strategic review, restructuring recommendations, and a 30-day follow-up.",
    features: [
      "Everything in Full Report",
      "90-minute 1:1 strategic review session",
      "Restructuring recommendations with rationale",
      "Hiring prioritization framework",
      "30-day follow-up check-in",
    ],
    ctaLabel: "Book Advisory",
    ctaHref: ADVISORY_CHECKOUT_URL,
    ctaExternal: true,
    tone: "premium",
  },
];

const faqs = [
  {
    q: "What do I need to get started?",
    a: "Either a team report you've already generated, or your current org structure with roles and headcount. OrgLens handles the analysis from there — you don't need to prepare anything else.",
  },
  {
    q: "How long does the analysis take?",
    a: "Founder Snapshot reports are delivered within 5–7 business days. Full OrgLens reports are delivered within 7–10 business days. Founder Advisory Review includes a structured live review session scheduled within a few business days.",
  },
  {
    q: "Who is OrgLens designed for?",
    a: "Founders, COOs, Heads of People, Chiefs of Staff, operators, SME leaders, fractional HR consultants, and VC advisors supporting startups and SMEs with 10–150 employees. Best fit for growing teams with 20–100 employees.",
  },
  {
    q: "Is my team's data secure?",
    a: "Yes. Data uploaded to OrgLens is used only to generate your report and is not shared with third parties. Reports are private to your account. See our Responsible AI page for details.",
  },
  {
    q: "Can I share the report with my board or investors?",
    a: "Yes. The report is designed to be shared with co-founders, executives, your board, or investors. It's structured to support — not replace — your judgment in those conversations.",
  },
  {
    q: "Does OrgLens make hiring or firing decisions?",
    a: "No. OrgLens is a decision-support tool. Reports surface signals and patterns, but every decision about hiring, firing, promotion, or compensation remains with the human leader.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[500px]">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple, founder-friendly pricing.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Three tiers for founders at different stages — from instant AI
            analysis to expert-led 1:1 advisory. Pick the depth that matches
            your next decision.
          </p>
        </div>

        {/* Tier grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>

        {/* Trust copy */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 text-center">
          <p className="text-sm italic leading-relaxed text-zinc-400">
            OrgLens reports are designed to support founder and leadership
            judgment, not replace it. They should not be used as the sole
            basis for employment decisions.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Read our full{" "}
            <Link
              href="/legal/responsible-ai"
              className="text-indigo-300 hover:text-indigo-200"
            >
              Responsible AI commitment
            </Link>
            .
          </p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6"
              >
                <h3 className="text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Not sure which one fits?
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Preview the free demo report to see exactly what OrgLens delivers
            before you buy.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              Start with Quick Scan — $49
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              View Demo Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const isHighlighted = tier.tone === "highlighted";

  const cardClasses = isHighlighted
    ? "relative flex flex-col rounded-2xl border border-indigo-400/60 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-7 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
    : "relative flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7";

  const ctaClasses = isHighlighted
    ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
    : "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white";

  return (
    <div className={cardClasses}>
      {tier.ribbon && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {tier.ribbon}
        </span>
      )}

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {tier.name}
      </p>

      <div className="mt-4 flex flex-wrap items-baseline gap-2">
        <p className="text-2xl font-bold tracking-tight text-white">
          {tier.badge}
        </p>
        {tier.badgeOriginal && (
          <span className="text-sm font-medium text-zinc-500 line-through">
            {tier.badgeOriginal}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        {tier.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-300">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {tier.ctaExternal ? (
        <a href={tier.ctaHref} className={ctaClasses}>
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <Link href={tier.ctaHref} className={ctaClasses}>
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      {tier.ctaSubtext && (
        <p className="mt-3 text-center text-xs text-zinc-500">
          {tier.ctaSubtext}
        </p>
      )}
    </div>
  );
}
