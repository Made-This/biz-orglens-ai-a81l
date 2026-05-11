import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  badge?: string;
  tone: "filled" | "outline";
};

const tiers: Tier[] = [
  {
    name: "Demo Report",
    price: "Free",
    description:
      "Explore a complete OrgLens analysis for NovaCloud Health — a fictional US health tech startup.",
    features: [
      "Full sample report for NovaCloud Health",
      "Org map, role-fit rankings, team structure risks",
      "No sign-up required",
    ],
    ctaLabel: "View Demo Report",
    ctaHref: "/app/report",
    tone: "outline",
  },
  {
    name: "Founder Snapshot",
    price: "$49",
    priceSuffix: "early access",
    badge: "Most Popular",
    description:
      "A lightweight organizational intelligence report for founders who want a fast read on team structure and scaling risks.",
    features: [
      "Lightweight organizational intelligence report",
      "Org map + role-fit summary",
      "Team structure risk flags",
      "Founder dependency signals",
      "Delivered as a PDF-ready report",
    ],
    ctaLabel: "Get Founder Snapshot",
    ctaHref: FOUNDER_SNAPSHOT_CHECKOUT_URL,
    ctaExternal: true,
    tone: "filled",
  },
  {
    name: "Full OrgLens Report",
    price: "$249",
    description:
      "A deeper report covering org structure, leadership coverage, role-fit signals, risks, and recommendations.",
    features: [
      "Everything in Founder Snapshot",
      "Full leadership coverage analysis",
      "Detailed competency pattern summary",
      "Role-fit deep dive for each team member",
      "Structural risk assessment with prioritized recommendations",
    ],
    ctaLabel: "Run Full Analysis",
    ctaHref: "/get-analysis",
    tone: "outline",
  },
  {
    name: "Founder Advisory Review",
    price: "From $999",
    description:
      "Full OrgLens report plus a founder review session and a structured action plan.",
    features: [
      "Everything in Full OrgLens Report",
      "1:1 founder review session (60 min)",
      "Structured action plan with 30 / 60 / 90 day recommendations",
      "Follow-up async support",
    ],
    ctaLabel: "Request Advisory Review",
    ctaHref: "/get-analysis",
    tone: "outline",
  },
];

const faqs = [
  {
    q: "What do I need to get started?",
    a: "Either a team report you've already generated, or your current org structure with roles and headcount. OrgLens handles the analysis from there — you don't need to prepare anything else.",
  },
  {
    q: "How long does the analysis take?",
    a: "Founder Snapshot and Full OrgLens reports are typically generated in a single sitting. Founder Advisory Review includes a structured review session scheduled within a few business days.",
  },
  {
    q: "Who is OrgLens designed for?",
    a: "Founders, COOs, Heads of People, Chiefs of Staff, fractional HR consultants, and VC platform teams supporting Seed to Series B SaaS and health tech companies (10–80 employees).",
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
            Start with the free demo. Upgrade when you&rsquo;re ready for your
            own analysis.
          </p>
        </div>

        {/* Tier grid */}
        <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          All reports are decision-support tools. See our{" "}
          <Link href="/responsible-ai" className="text-indigo-300 hover:text-indigo-200">
            Responsible AI page
          </Link>{" "}
          for details.
        </p>

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
            Tell us about your team and we&rsquo;ll recommend the right report.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-analysis"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              Get My Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/app/report"
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
  const isFilled = tier.tone === "filled";

  const cardClasses = isFilled
    ? "relative flex flex-col rounded-2xl border border-indigo-400/40 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-7 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
    : "relative flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7";

  const ctaClasses = isFilled
    ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
    : "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white";

  return (
    <div className={cardClasses}>
      {tier.badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {tier.badge}
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {tier.name}
      </p>
      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {tier.price}
        {tier.priceSuffix && (
          <span className="ml-2 text-sm font-medium text-zinc-500">
            {tier.priceSuffix}
          </span>
        )}
      </p>
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
    </div>
  );
}
