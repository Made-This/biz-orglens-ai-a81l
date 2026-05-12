import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Gauge,
  Map as MapIcon,
  Network,
  Repeat,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  Award,
  ClipboardCheck,
} from "lucide-react";
import HeroOrgChart from "@/components/HeroOrgChart";
import ROICalculator from "@/components/ROICalculator";

const DEMO_URL = "/demo";
const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";
const FULL_REPORT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md77k46snb81k8f7vgmm46hbzx86gc8y";
const ADVISORY_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7c6ccpy7gdd50t7fw9a7w1fd86gtxy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <MetricsStrip />
      <ROICalculator founderSnapshotUrl={FOUNDER_SNAPSHOT_CHECKOUT_URL} />
      <WhenToUse />
      <ReportContents />
      <PricingCTA />
      <ResponsibleAINote />
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
        <div className="absolute left-1/4 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[520px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN — text */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Organizational intelligence for growing teams
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              See hidden team risks before they slow your{" "}
              <span className="text-indigo-300">next stage of growth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              OrgLens AI helps startups and SMEs with 10–150 employees turn
              team structure, role-fit signals, competency patterns, and
              leadership coverage into a clear organizational intelligence
              report — so leaders can clarify ownership, identify bottlenecks,
              and make better people decisions before hiring, restructuring,
              or scaling.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
              >
                Get Founder Snapshot
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={DEMO_URL}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-400/60 bg-transparent px-6 py-3.5 text-base font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
              >
                Preview Demo Report
              </Link>
            </div>

            <p className="mt-8 max-w-xl text-sm text-zinc-500">
              Best fit for growing teams with 20–100 employees. No employment
              decisions made by AI.
            </p>
          </div>

          {/* RIGHT COLUMN — side-by-side org chart comparison */}
          <div className="lg:col-span-6 xl:col-span-7">
            <HeroOrgChart
              founderSnapshotUrl={FOUNDER_SNAPSHOT_CHECKOUT_URL}
            />
          </div>
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
      title: "Founder Bottleneck",
      desc: "If every important decision still routes through the founder, the company cannot scale cleanly. OrgLens helps identify where ownership, decision rights, or leadership coverage may be missing.",
      hover:
        "When critical decisions remain concentrated in the founder, growth slows and delegation becomes fragile. Research consistently shows that founder dependency is one of the top structural risks in scaling companies.",
    },
    {
      icon: AlertTriangle,
      title: "Unclear Ownership",
      desc: "When roles overlap or no one owns a key function, execution slows down. OrgLens helps reveal where accountability is unclear across the team.",
      hover:
        "Role ambiguity is a leading cause of execution drag as teams grow. When no one clearly owns a function, accountability gaps develop — often invisible until a major hire or restructure fails.",
    },
    {
      icon: UserMinus,
      title: "Wrong Person, Wrong Seat",
      desc: "A strong person in the wrong role can still create drag. OrgLens highlights role-fit signals and competency patterns that may affect execution.",
      hover:
        "A high-performing individual placed in a mismatched role still creates drag. Role-fit misalignment is often discovered only after six months of underperformance — at significant cost.",
    },
    {
      icon: UserPlus,
      title: "Hiring Before Structure",
      desc: "Adding headcount without understanding the current structure can multiply confusion. OrgLens helps founders see what should be clarified before the next hire.",
      hover:
        "Adding headcount without first understanding structural gaps can multiply confusion. McKinsey and Deloitte research consistently links unclear org design to poor ROI on new hires.",
    },
    {
      icon: Network,
      title: "Leadership Coverage Gaps",
      desc: "As teams grow, informal coordination breaks down. OrgLens helps identify where the company may need stronger management, operating, or functional leadership.",
      hover:
        "Gallup research shows that managers account for at least 70% of variance in team engagement. As teams grow past 15–20 people, informal coordination breaks down — leadership coverage gaps become structural risks.",
    },
    {
      icon: ScanSearch,
      title: "Hidden Scaling Risk",
      desc: "The org may look fine on paper, but risk often hides in reporting lines, overloaded people, unclear roles, and founder dependency. OrgLens turns those signals into a clear report.",
      hover:
        "The most costly org risks are often invisible on a standard org chart: overloaded people, founder dependency, role confusion, and unowned functions. OrgLens turns these hidden signals into a readable diagnostic.",
    },
  ];

  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            The pain
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your team may be growing — but your operating model may not be
            keeping up.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            Many startups and SMEs hit people problems before they realize
            they have an org design problem. OrgLens helps surface role gaps,
            ownership confusion, founder dependency, and leadership coverage
            risks before they become expensive.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group rounded-xl border border-[#1E1E24] border-l-2 border-l-indigo-500/70 bg-[#12121A] p-7 transition-all hover:border-indigo-400/60 hover:bg-[#15151F]"
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
                {/* Hover content — always visible on mobile, expands on hover desktop */}
                <div className="mt-4 border-l-2 border-indigo-500/30 pl-3 transition-all duration-300 md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-60 md:group-hover:opacity-100">
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {p.hover}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 3 — METRICS STRIP                   */
/* ─────────────────────────────────────────── */

function MetricsStrip() {
  const stats = [
    {
      value: "31%",
      body: "of U.S. employees were engaged in 2024.",
    },
    {
      value: "46%",
      body: "clearly knew what was expected of them at work.",
    },
    {
      value: "70%",
      body: "of team engagement variance is tied to managers.",
    },
    {
      value: "23%",
      body: "higher profitability is associated with highly engaged teams.",
    },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Why it matters
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300 sm:text-xl">
            Research shows why role clarity, leadership coverage, and team
            structure matter.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-xl border border-[#1E1E24] bg-[#12121A] p-6 transition-all hover:border-indigo-400/40 hover:bg-[#15151F]"
            >
              <p className="text-4xl font-bold tracking-tight text-indigo-300 sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
          Benchmarks from Gallup workplace research. OrgLens uses these
          benchmarks as context, not as guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 5 — WHEN TO USE                     */
/* ─────────────────────────────────────────── */

function WhenToUse() {
  const triggers = [
    {
      icon: UserPlus,
      title: "Before hiring a key role",
      desc: "Use OrgLens to see whether the current team structure actually needs a new hire, or whether ownership and role clarity should be fixed first.",
    },
    {
      icon: Repeat,
      title: "Before restructuring the team",
      desc: "Use OrgLens to identify role overlap, missing leadership coverage, and founder dependency before changing reporting lines.",
    },
    {
      icon: Award,
      title: "Before promoting someone",
      desc: "Use OrgLens to review role-fit signals and leadership coverage needs before expanding someone's responsibilities.",
    },
    {
      icon: ClipboardCheck,
      title: "Before fundraising or board review",
      desc: "Use OrgLens to show that you understand your team structure, scaling risks, and leadership gaps.",
    },
    {
      icon: Gauge,
      title: "When execution feels slower than headcount growth",
      desc: "Use OrgLens to find where coordination, ownership, or role clarity may be slowing the team down.",
    },
    {
      icon: Compass,
      title: "When the founder is still too involved",
      desc: "Use OrgLens to identify where decision-making is stuck with the founder and what roles or systems may need to change.",
    },
  ];

  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            When to use OrgLens
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Use OrgLens before a people decision gets expensive.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {triggers.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                className="rounded-xl border border-[#1E1E24] bg-[#12121A] p-7 transition-all hover:border-indigo-400/40 hover:bg-[#15151F]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {t.desc}
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
/* SECTION 6 — REPORT CONTENTS                 */
/* ─────────────────────────────────────────── */

function ReportContents() {
  const deliverables = [
    { icon: MapIcon, label: "Org Map" },
    { icon: Target, label: "Role-Fit Analysis" },
    { icon: ShieldCheck, label: "Leadership Coverage" },
    { icon: AlertTriangle, label: "Team Structure Risks" },
    { icon: Sparkles, label: "Competency Signal Summary" },
    { icon: UserCog, label: "Founder / Key-Person Dependency Risks" },
    { icon: CheckCircle2, label: "Recommended Next Steps" },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Deliverables
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What&rsquo;s inside the report
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2">
          {deliverables.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex items-center gap-4 rounded-xl border border-[#1E1E24] bg-[#12121A] px-5 py-4 transition-all hover:border-indigo-400/40 hover:bg-[#15151F]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-base font-medium text-zinc-100">
                  {d.label}
                </p>
                <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-indigo-400" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 7 — PRICING / TIER COMPARISON       */
/* ─────────────────────────────────────────── */

const PRICING_TIERS = [
  {
    name: "Quick Scan",
    price: "$49",
    subtitle: "For founders who need clarity fast",
    features: [
      "Competency heatmap across your team",
      "Role-fit rankings (Great 8 model)",
      "3-scenario org comparison",
      "Risk summary with gap identification",
      "Instant delivery — results in minutes",
    ],
    cta: "Get Your Analysis",
    href: FOUNDER_SNAPSHOT_CHECKOUT_URL,
    ribbon: "Most Popular",
    highlighted: false,
  },
  {
    name: "Full Report",
    price: "$249",
    subtitle: "For founders preparing for a raise or restructure",
    features: [
      "Everything in Quick Scan",
      "Human-reviewed analysis and annotations",
      "Founder memo export (board-ready format)",
      "Detailed leadership coverage assessment",
      "Priority delivery — 48 hours",
    ],
    cta: "Get Full Report",
    href: FULL_REPORT_CHECKOUT_URL,
    ribbon: null,
    highlighted: true,
  },
  {
    name: "Advisory Session",
    price: "$999",
    subtitle: "For founders who want expert guidance",
    features: [
      "Everything in Full Report",
      "90-minute 1:1 strategic review session",
      "Restructuring recommendations with rationale",
      "Hiring prioritization framework",
      "30-day follow-up check-in",
    ],
    cta: "Book Advisory",
    href: ADVISORY_CHECKOUT_URL,
    ribbon: null,
    highlighted: false,
  },
] as const;

function PricingCTA() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start with the right level of depth.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            From instant analysis to expert-led advisory — pick the level of
            support that matches your next decision.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.highlighted
                  ? "relative flex flex-col rounded-2xl border border-indigo-400/60 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
                  : "relative flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8"
              }
            >
              {tier.ribbon && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                  {tier.ribbon}
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {tier.name}
              </p>
              <p className="mt-4 text-3xl font-bold tracking-tight text-white">
                {tier.price}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {tier.subtitle}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                className={
                  tier.highlighted
                    ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
                    : "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
                }
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          All reports are decision-support tools. No AI system makes employment
          decisions.{" "}
          <Link
            href={DEMO_URL}
            className="text-indigo-400 underline-offset-2 hover:text-indigo-300 hover:underline"
          >
            Preview the free demo report
          </Link>{" "}
          before buying.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 8 — RESPONSIBLE AI TRUST NOTE       */
/* ─────────────────────────────────────────── */

function ResponsibleAINote() {
  return (
    <section className="bg-[#0A0A0B] py-12 md:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-[#1E1E24] bg-[#0F0F12]/60 p-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
          <p className="text-xs leading-relaxed text-zinc-500">
            OrgLens is designed to support founder and leadership judgment,
            not replace it. It does not make employment decisions and should
            not be used as the sole basis for hiring, firing, promotion,
            compensation, or other employment actions.
          </p>
        </div>
      </div>
    </section>
  );
}
