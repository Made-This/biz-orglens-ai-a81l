import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Map as MapIcon,
  Network,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import HeroRoiCalculator from "@/components/HeroRoiCalculator";
import BenchmarkStrip from "@/components/BenchmarkStrip";
import HeroOrgChart from "@/components/HeroOrgChart";

const DEMO_URL = "/demo";
const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenchmarkStrip />
      <PainSection />
      <CostOfWaiting />
      <OrgChartSection />
      <ReportOutputCards />
      <PurchaseDriver />
      <ResponsibleAINote />
    </>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 1 — HERO                            */
/* ─────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-[#0A0A0B]"
    >
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[520px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center lg:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Organizational intelligence for growing teams
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Before your next hire, see what team risk could cost.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              OrgLens helps startups and SMEs spot founder bottlenecks, role
              gaps, sales ownership risks, and leadership coverage issues before
              hiring, restructuring, or scaling.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
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

            <p className="mt-6 text-sm text-zinc-500">
              Built for growing teams with 5–150 employees. No AI makes
              employment decisions.
            </p>
          </div>

          {/* RIGHT COLUMN — ROI Calculator */}
          <div>
            <HeroRoiCalculator checkoutUrl={FOUNDER_SNAPSHOT_CHECKOUT_URL} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 3 — PAIN SECTION                    */
/* ─────────────────────────────────────────── */

const PAINS = [
  {
    icon: UserCog,
    title: "Founder Bottleneck",
    short: "Too many decisions still route through you.",
    hover: "Founder dependency slows execution and makes scaling fragile.",
    tone: "red" as const,
  },
  {
    icon: TrendingUp,
    title: "Sales Ownership Gap",
    short: "Pipeline responsibility is split or unclear.",
    hover:
      "Sales risk grows when the founder, growth lead, and sales team do not have clear ownership.",
    tone: "red" as const,
  },
  {
    icon: UserMinus,
    title: "Wrong Person, Wrong Seat",
    short: "Strong employee, poor role fit.",
    hover:
      "Misalignment can create productivity drag, coaching burden, and replacement cost.",
    tone: "amber" as const,
  },
  {
    icon: UserPlus,
    title: "Hiring Before Structure",
    short: "New headcount adds confusion.",
    hover:
      "Adding people before clarifying ownership can multiply the original problem.",
    tone: "amber" as const,
  },
  {
    icon: Network,
    title: "Leadership Coverage Gap",
    short: "No clear leader for a critical function.",
    hover: "Managers strongly influence engagement, productivity, and retention.",
    tone: "red" as const,
  },
  {
    icon: AlertTriangle,
    title: "Hidden Scaling Risk",
    short: "The org chart looks fine — the risk is underneath.",
    hover:
      "Reporting lines can look clean while ownership, decision rights, and role fit remain unclear.",
    tone: "amber" as const,
  },
];

function PainSection() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            The problem
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Small org gaps become expensive people decisions.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p) => {
            const Icon = p.icon;
            const iconBg =
              p.tone === "red"
                ? "bg-red-500/10 text-red-400 ring-red-400/30"
                : "bg-amber-500/10 text-amber-400 ring-amber-400/30";
            return (
              <div
                key={p.title}
                className="group rounded-xl border border-[#1E1E24] bg-[#12121A] p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#15151F]"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-inset ${iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-400">{p.short}</p>
                {/* Hover reveal */}
                <div className="mt-3 max-h-0 overflow-hidden border-l-2 border-indigo-500/30 pl-3 opacity-0 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100">
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
/* SECTION 4 — COST OF WAITING                 */
/* ─────────────────────────────────────────── */

function CostOfWaiting() {
  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            The cost of waiting
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Waiting usually shows up as expensive people decisions.
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-red-500/30 bg-[#12121A] p-6 transition-all hover:-translate-y-0.5 hover:border-red-400/50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
              Wrong hire
            </p>
            <p className="mt-3 text-3xl font-bold text-red-300">$24K–$75K+</p>
            <p className="mt-1 text-sm font-medium text-zinc-300">
              potential exposure
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Based on salary and role type.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-amber-500/30 bg-[#12121A] p-6 transition-all hover:-translate-y-0.5 hover:border-amber-400/50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Founder bottleneck
            </p>
            <p className="mt-3 text-3xl font-bold text-amber-300">
              Decisions delayed
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Critical calls stay trapped with the founder.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-amber-500/30 bg-[#12121A] p-6 transition-all hover:-translate-y-0.5 hover:border-amber-400/50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Sales gap
            </p>
            <p className="mt-3 text-3xl font-bold text-amber-300">
              Pipeline confusion
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Unclear ownership between founder, growth, sales, and customer
              success.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-400/60 bg-transparent px-6 py-3.5 text-base font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
          >
            Estimate My Team Risk
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 5 — ORG CHART COMPARISON            */
/* ─────────────────────────────────────────── */

function OrgChartSection() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            See the difference
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Same team. Hidden risks exposed.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Traditional org charts show reporting lines. OrgLens shows
            what&rsquo;s underneath.
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <HeroOrgChart founderSnapshotUrl={FOUNDER_SNAPSHOT_CHECKOUT_URL} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 6 — REPORT OUTPUT CARDS             */
/* ─────────────────────────────────────────── */

const REPORT_ITEMS = [
  {
    icon: MapIcon,
    label: "Org Map",
    desc: "Visual org structure with reporting lines",
    badge: null,
  },
  {
    icon: Target,
    label: "Role-Fit Signals",
    desc: "Competency alignment by role",
    badge: "warn",
  },
  {
    icon: BarChart3,
    label: "Sales Ownership Risk",
    desc: "Pipeline ownership and leadership coverage",
    badge: "risk",
  },
  {
    icon: Users,
    label: "Leadership Coverage",
    desc: "Function-level manager analysis",
    badge: null,
  },
  {
    icon: UserCog,
    label: "Founder Dependency",
    desc: "Decision routing and key-person risk",
    badge: "risk",
  },
  {
    icon: CheckCircle2,
    label: "Next-Step Recommendations",
    desc: "Prioritized actions before next hire",
    badge: null,
  },
] as const;

function ReportOutputCards() {
  return (
    <section className="border-y border-[#1E1E24] bg-[#0B0B0F] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Deliverables
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What&rsquo;s in your Founder Snapshot
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-[#1E1E24] bg-[#12121A] px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#15151F]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-white">
                      {item.label}
                    </p>
                    {item.badge === "risk" && (
                      <span className="inline-flex items-center rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-300 ring-1 ring-inset ring-red-400/40">
                        Risk
                      </span>
                    )}
                    {item.badge === "warn" && (
                      <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-inset ring-amber-400/40">
                        Flagged
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
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
/* SECTION 7 — PURCHASE DRIVER                 */
/* ─────────────────────────────────────────── */

function PurchaseDriver() {
  return (
    <section className="bg-[#0A0A0B] py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start before the next hire makes the problem harder to fix.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Founder Snapshot gives you a fast organizational risk read before
            hiring, restructuring, or adding management layers.
          </p>
        </div>

        {/* Visual $49 vs $24K+ comparison */}
        <div className="flex flex-col items-center gap-0 sm:flex-row sm:items-stretch sm:justify-center">
          {/* $49 side */}
          <div className="flex min-w-[200px] flex-col items-center justify-center rounded-2xl border border-indigo-400/50 bg-gradient-to-b from-indigo-500/[0.15] to-[#0F0F12] px-8 py-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)] sm:rounded-r-none sm:border-r-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              Founder Snapshot
            </p>
            <p className="mt-3 text-6xl font-bold text-white">$49</p>
            <p className="mt-2 text-xs text-indigo-300">early-access price</p>
          </div>

          {/* VS separator */}
          <div className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1E1E24] bg-[#0F0F12] sm:h-full sm:w-12 sm:rounded-none sm:border-y sm:border-x-0">
              <span className="text-xs font-bold text-zinc-500">vs</span>
            </div>
          </div>

          {/* $24K+ side */}
          <div className="flex min-w-[200px] flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-[#12121A] px-8 py-8 sm:rounded-l-none sm:border-l-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
              Possible wrong-hire cost
            </p>
            <p className="mt-3 text-6xl font-bold text-red-300">$24K+</p>
            <p className="mt-2 text-xs text-zinc-500">based on salary × 30–50%</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={FOUNDER_SNAPSHOT_CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
          >
            Get Founder Snapshot
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href={DEMO_URL}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-400/60 bg-transparent px-8 py-3.5 text-base font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
          >
            Preview Demo Report
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 8 — RESPONSIBLE AI NOTE             */
/* ─────────────────────────────────────────── */

function ResponsibleAINote() {
  return (
    <section className="bg-[#0A0A0B] py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-[#1E1E24] bg-[#0F0F12]/60 p-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
          <p className="text-xs leading-relaxed text-zinc-500">
            OrgLens is a decision-support tool. It does not make hiring, firing,
            promotion, compensation, or other employment decisions.{" "}
            <Link
              href="/responsible-ai"
              className="text-zinc-400 underline-offset-2 hover:text-zinc-300 hover:underline"
            >
              Learn more about Responsible AI
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
