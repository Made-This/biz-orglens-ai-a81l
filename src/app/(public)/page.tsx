import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  FileText,
  Lightbulb,
  Map,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users,
  UserCog,
  UserMinus,
  Workflow,
} from "lucide-react";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";

const DEMO_URL = "/app/report";
const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ReportContents />
      <UseCases />
      <PricingPreview />
      <ResponsibleAI />
      <NewsletterSection />
    </>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 1 — HERO                            */
/* ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B]">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/3 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[520px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Organizational intelligence for growing teams
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            See the hidden team risks before they slow your{" "}
            <span className="text-indigo-300">next stage of growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            OrgLens AI helps startups and SMEs with 10–150 employees turn team
            structure, role-fit signals, competency patterns, and leadership
            coverage into a clear organizational intelligence report — so
            leaders can clarify ownership, identify bottlenecks, and make
            better people decisions before hiring, restructuring, or scaling.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={DEMO_URL}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              View Demo Report
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-400/60 bg-transparent px-6 py-3.5 text-base font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              Get Founder Snapshot
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-500">
            Best fit for growing teams with 20–100 employees. No employment
            decisions made by AI.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 2 — PAIN POINTS                     */
/* ─────────────────────────────────────────── */

function PainPoints() {
  const pains = [
    {
      icon: UserCog,
      title: "Founder still the bottleneck",
      desc: "Decisions route through you because no one else has clear ownership.",
    },
    {
      icon: AlertTriangle,
      title: "Roles without real owners",
      desc: "Responsibilities are assumed, not assigned. Gaps go unnoticed until they hurt.",
    },
    {
      icon: Network,
      title: "Team structure not scaling",
      desc: "What worked at 10 people breaks at 30. The org chart hasn't caught up.",
    },
    {
      icon: Users,
      title: "Hiring without role-fit context",
      desc: "New hires are selected on resume fit, not on whether the role itself is designed correctly.",
    },
    {
      icon: UserMinus,
      title: "Uneven leadership coverage",
      desc: "Some functions are over-resourced. Others have no accountable owner.",
    },
    {
      icon: ShieldCheck,
      title: "People problems arriving early",
      desc: "Conflict, confusion, and retention issues appear before you have a Head of People.",
    },
  ];

  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for growing teams that are becoming too complex for founder
            intuition alone.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            OrgLens is designed for startups and SMEs moving from informal
            founder-led execution to a more structured operating model.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7 transition-all hover:border-indigo-400/40 hover:bg-[#13131A]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 3 — HOW IT WORKS                    */
/* ─────────────────────────────────────────── */

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Share team and role context",
      desc: "Upload your team's report data or share your current org structure, roles, and headcount. OrgLens handles the analysis.",
    },
    {
      num: "02",
      icon: Workflow,
      title: "OrgLens analyzes structure, role-fit, and competency patterns",
      desc: "The platform maps leadership coverage, identifies role-fit mismatches, and surfaces structural risks that aren't visible on an org chart.",
    },
    {
      num: "03",
      icon: Target,
      title: "Receive your founder- and operator-ready decision report",
      desc: "Get a structured report with org map, role-fit signals, team structure risks, leadership coverage, and recommended next steps — ready to support better decisions before your next hire, restructure, or growth stage.",
    },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From team context to founder decision report — in minutes.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7"
              >
                <p className="font-mono text-xs font-semibold tracking-widest text-indigo-400">
                  Step {s.num}
                </p>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={DEMO_URL}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
          >
            View the Demo Report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 4 — REPORT CONTENTS                 */
/* ─────────────────────────────────────────── */

function ReportContents() {
  const items = [
    {
      icon: Map,
      title: "Org Map",
      desc: "Visual structure of your team's reporting lines and role coverage.",
    },
    {
      icon: Target,
      title: "Role-Fit Analysis",
      desc: "Which roles and people are well-matched vs. misaligned.",
    },
    {
      icon: ShieldCheck,
      title: "Leadership Coverage",
      desc: "Where you have strong leaders and where you have gaps.",
    },
    {
      icon: AlertTriangle,
      title: "Team Structure Risks",
      desc: "Specific structural issues that could limit your next growth phase.",
    },
    {
      icon: Sparkles,
      title: "Competency Signal Summary",
      desc: "Patterns across your team's capability profile.",
    },
    {
      icon: UserCog,
      title: "Founder Dependency Risks",
      desc: "Where the company is over-indexed on founder or key-person involvement.",
    },
    {
      icon: CheckCircle2,
      title: "Recommended Next Steps",
      desc: "Prioritized actions you can take before your next hire or restructure.",
    },
  ];

  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            What&rsquo;s in the report
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your organizational intelligence report includes:
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <div
                key={i.title}
                className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {i.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {i.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 5 — USE CASES                       */
/* ─────────────────────────────────────────── */

function UseCases() {
  const cases = [
    {
      icon: Building2,
      title: "Founder-led startup preparing to scale",
      desc: "Understand whether your current team structure, role ownership, and leadership coverage can support the next stage of growth before adding more headcount.",
    },
    {
      icon: Stethoscope,
      title: "Growing SME adding management layers",
      desc: "Clarify accountability, reporting lines, and ownership as the company moves beyond informal team coordination.",
    },
    {
      icon: Users,
      title: "Team with 20–100 employees",
      desc: "For teams that are too complex to manage by intuition alone, but not yet ready for expensive org-design consulting.",
    },
    {
      icon: Briefcase,
      title: "COO or operator improving ownership clarity",
      desc: "Surface where accountability is missing and which roles need redesign before the next hiring cycle.",
    },
    {
      icon: Compass,
      title: "Fractional HR consultant supporting a client",
      desc: "Turn team observation into a structured organizational intelligence report that helps clients understand role clarity, leadership coverage, and team risks.",
    },
    {
      icon: Lightbulb,
      title: "VC advisor or startup operator helping portfolio companies",
      desc: "Run a consistent organizational diagnostic across companies and give leaders a structured view of team health before a board review or scaling decision.",
    },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Use cases
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for the moments that define how a company scales.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
          >
            See use cases in detail
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 6 — PRICING PREVIEW                 */
/* ─────────────────────────────────────────── */

function PricingPreview() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            One report can change how you think about your team.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 — Free Demo */}
          <PricingCard
            label="Demo Report"
            price="Free"
            description="Explore a full sample report for NovaCloud Health — one example of how OrgLens can analyze a growing team."
            ctaLabel="View Demo Report"
            ctaHref={DEMO_URL}
            tone="outline"
          />

          {/* Card 2 — Founder Snapshot */}
          <PricingCard
            label="Founder Snapshot"
            price="$49"
            priceSuffix="early access"
            badge="Most Popular"
            description="A lightweight organizational intelligence report for founders and SME leaders who want a fast read on team structure, role-fit signals, ownership gaps, and scaling risks."
            ctaLabel="Get Founder Snapshot"
            ctaHref={FOUNDER_SNAPSHOT_CHECKOUT_URL}
            ctaExternal
            tone="filled"
          />

          {/* Card 3 — Full OrgLens */}
          <PricingCard
            label="Full OrgLens Report"
            price="$249"
            description="A deeper report covering org structure, leadership coverage, role-fit signals, competency patterns, team risks, and recommended next steps for growing teams."
            ctaLabel="Run Full Analysis"
            ctaHref="/pricing"
            tone="outline"
          />

          {/* Card 4 — Founder Advisory */}
          <PricingCard
            label="Founder Advisory Review"
            price="From $999"
            description="Full report plus a founder/operator review session and action plan for hiring, restructuring, or scaling decisions."
            ctaLabel="Request Advisory Review"
            ctaHref="/get-analysis"
            tone="outline"
          />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          All reports are decision-support tools. No AI system makes employment decisions.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Compare all plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  label,
  price,
  priceSuffix,
  badge,
  description,
  ctaLabel,
  ctaHref,
  ctaExternal,
  tone,
}: {
  label: string;
  price: string;
  priceSuffix?: string;
  badge?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  tone: "filled" | "outline";
}) {
  const isFilled = tone === "filled";

  const cardClasses = isFilled
    ? "relative rounded-2xl border border-indigo-400/40 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
    : "relative rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6";

  const ctaClasses = isFilled
    ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
    : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-2.5 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white";

  return (
    <div className={cardClasses}>
      {badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {badge}
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {price}
        {priceSuffix && (
          <span className="ml-2 text-sm font-medium text-zinc-500">
            {priceSuffix}
          </span>
        )}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
      {ctaExternal ? (
        <a href={ctaHref} className={ctaClasses}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <Link href={ctaHref} className={ctaClasses}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 7 — RESPONSIBLE AI                  */
/* ─────────────────────────────────────────── */

function ResponsibleAI() {
  const pillars = [
    {
      icon: ShieldCheck,
      label: "No automated hiring decisions",
    },
    {
      icon: UserCog,
      label: "Human judgment remains in control",
    },
    {
      icon: Users,
      label: "Designed for growing teams, reviewed by human leaders.",
    },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Responsible AI
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built to support founder judgment, not replace it.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-400">
            <p>
              OrgLens is designed as a decision-support tool for founders,
              operators, and SME leaders. Reports surface patterns, risks, and
              signals — but every decision about hiring, restructuring, or
              role design remains with the human leader.
            </p>
            <p>
              OrgLens reports should not be used as the sole basis for hiring,
              firing, promotion, compensation, or other employment decisions.
              They are analytical inputs to help founders, operators, and SME
              leaders think more clearly about their team — not outputs that
              replace human judgment.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className="flex items-center gap-3 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-zinc-200">{p.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/responsible-ai"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Learn more about our approach
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 8 — NEWSLETTER                      */
/* ─────────────────────────────────────────── */

function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            OrgLens Monthly Insights
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get monthly insights on AI, org design, and team intelligence for
            growing teams.
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <NewsletterSignupForm source="homepage" />
        </div>
      </div>
    </section>
  );
}
