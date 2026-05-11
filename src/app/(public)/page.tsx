import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Gauge,
  Map as MapIcon,
  Network,
  PieChart,
  Repeat,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  Zap,
} from "lucide-react";

const DEMO_URL = "/demo";
const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <ROISection />
      <UrgencyBand />
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
        <div className="absolute left-1/3 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[520px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Organizational intelligence for growing teams
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            See hidden team risks before they slow your{" "}
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
      title: "Founder Bottleneck",
      desc: "If every important decision still routes through the founder, the company cannot scale cleanly. OrgLens helps identify where ownership, decision rights, or leadership coverage may be missing.",
    },
    {
      icon: AlertTriangle,
      title: "Unclear Ownership",
      desc: "When roles overlap or no one owns a key function, execution slows down. OrgLens helps reveal where accountability is unclear across the team.",
    },
    {
      icon: UserMinus,
      title: "Wrong Person, Wrong Seat",
      desc: "A strong person in the wrong role can still create drag. OrgLens highlights role-fit signals and competency patterns that may affect execution.",
    },
    {
      icon: UserPlus,
      title: "Hiring Before Structure",
      desc: "Adding headcount without understanding the current structure can multiply confusion. OrgLens helps founders see what should be clarified before the next hire.",
    },
    {
      icon: Network,
      title: "Leadership Coverage Gaps",
      desc: "As teams grow, informal coordination breaks down. OrgLens helps identify where the company may need stronger management, operating, or functional leadership.",
    },
    {
      icon: ScanSearch,
      title: "Hidden Scaling Risk",
      desc: "The org may look fine on paper, but risk often hides in reporting lines, overloaded people, unclear roles, and founder dependency. OrgLens turns those signals into a clear report.",
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
                className="rounded-xl border border-[#1E1E24] border-l-2 border-l-indigo-500/70 bg-[#12121A] p-7 transition-all hover:border-indigo-400/60 hover:bg-[#15151F]"
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
/* SECTION 3 — ROI                             */
/* ─────────────────────────────────────────── */

function ROISection() {
  const items = [
    {
      icon: UserPlus,
      title: "Avoid hiring into confusion",
      desc: "Before adding a new role, understand whether the real problem is headcount, ownership, leadership coverage, or process clarity.",
    },
    {
      icon: TrendingDown,
      title: "Reduce founder bottlenecks",
      desc: "See where the company still depends too much on the founder and where decision-making needs to move into the team.",
    },
    {
      icon: Target,
      title: "Improve role clarity",
      desc: "Turn vague people concerns into a structured view of roles, responsibilities, gaps, and risks.",
    },
    {
      icon: UserCheck,
      title: "Make better use of current talent",
      desc: "Before replacing or hiring, understand whether existing team members are in roles that match the company's current needs.",
    },
    {
      icon: PieChart,
      title: "Save consulting cost",
      desc: "Get a fast organizational intelligence snapshot before paying for expensive org-design consulting or fractional HR advisory.",
    },
    {
      icon: Zap,
      title: "Move faster with confidence",
      desc: "Use the report to support hiring, restructuring, promotion, or leadership planning conversations.",
    },
  ];

  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            The ROI
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The cost of unclear roles is bigger than the cost of the report.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
            One unclear hire, one overloaded founder, or one unresolved
            ownership gap can cost far more than a lightweight organizational
            review.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <div
                key={i.title}
                className="rounded-xl border border-[#1E1E24] bg-[#12121A] p-7 transition-all hover:border-indigo-400/40 hover:bg-[#15151F]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {i.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
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
/* SECTION 4 — URGENCY BAND                    */
/* ─────────────────────────────────────────── */

function UrgencyBand() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.12] blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/[0.10] to-[#0E0E14] p-10 shadow-[0_0_80px_-25px_rgba(99,102,241,0.5)] md:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Why now
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The best time to review your team structure is before the next
              hire.
            </h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-300">
              <p>
                Most teams wait until the pain is obvious: missed handoffs,
                unclear ownership, slow decisions, founder burnout, or a key
                hire that does not work out. By then, the cost is already
                higher.
              </p>
              <p>
                OrgLens gives founders and operators a faster way to see where
                the team may be misaligned before making the next people
                decision.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          </div>
        </div>
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
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
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
    <section className="bg-[#0A0A0B] py-20 md:py-24">
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
/* SECTION 7 — PRICING / PURCHASE URGENCY      */
/* ─────────────────────────────────────────── */

function PricingCTA() {
  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start with a snapshot before your next people decision.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
          {/* Card 1 — Paid */}
          <div className="relative rounded-2xl border border-indigo-400/40 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]">
            <span className="absolute -top-3 left-8 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              Recommended
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Founder Snapshot
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-white">
              $49
              <span className="ml-2 text-sm font-medium text-zinc-500">
                early-access price
              </span>
            </p>
            <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
              Start with a $49 Founder Snapshot before your next hire,
              restructure, or leadership decision.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Early-access price. Designed for startups and SMEs with 10–150
              employees.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Org map and reporting-line view",
                "Role-fit and leadership coverage signals",
                "Founder dependency and team risks",
                "Recommended next steps",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <a
              href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              Get Founder Snapshot
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Card 2 — Free demo */}
          <div className="relative rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Free Demo Report
            </p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-white">
              Free
              <span className="ml-2 text-sm font-medium text-zinc-500">
                no signup
              </span>
            </p>
            <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
              Preview the demo first.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              See exactly what the report looks like using NovaCloud Health,
              our fictional demo company.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "Full sample report walkthrough",
                "Org map, role-fit, and risk views",
                "Founder-style recommendations",
                "No login or payment required",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link
              href={DEMO_URL}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              Preview Demo Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-zinc-500">
          All reports are decision-support tools. No AI system makes
          employment decisions.
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

