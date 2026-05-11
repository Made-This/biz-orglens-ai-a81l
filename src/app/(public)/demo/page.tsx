import Link from "next/link";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lock,
  Map as MapIcon,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const SIGN_IN_URL = "/sign-in?redirect=/app/demo";

const SECTION_PREVIEWS: {
  title: string;
  icon: typeof MapIcon;
  blurb: string;
}[] = [
  {
    title: "Org Map",
    icon: Network,
    blurb: "Reporting lines, role coverage, and ownership boundaries across the team.",
  },
  {
    title: "Role Fit Analysis",
    icon: Target,
    blurb: "Per-role competency match, top candidates, and gaps for every position.",
  },
  {
    title: "Leadership Coverage",
    icon: ShieldCheck,
    blurb: "Where your senior team is strong, where it's thin, and where it's exposed.",
  },
  {
    title: "Team Risks",
    icon: AlertTriangle,
    blurb: "Founder dependency, key-person risk, accountability gaps, and successor depth.",
  },
  {
    title: "Recommendations",
    icon: CheckCircle2,
    blurb: "Prioritized actions before your next hire, restructure, or scaling milestone.",
  },
  {
    title: "Decision Report",
    icon: FileText,
    blurb: "Founder-ready brief: strengths, risks, and recommended next steps.",
  },
];

const REPORT_INCLUDES = SECTION_PREVIEWS.map((s) => ({
  title: s.title,
  icon: s.icon,
  desc: s.blurb,
}));

export default function DemoPreviewPage() {
  return (
    <div className="relative overflow-hidden bg-[#0A0A0B]">
      {/* Top banner */}
      <div className="border-b border-indigo-500/20 bg-indigo-500/[0.06] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2 text-xs sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2.5 py-0.5 font-medium uppercase tracking-widest text-indigo-200">
            <Sparkles className="h-3 w-3" />
            Demo
          </span>
          <span className="text-zinc-300">
            NovaCloud Health — Fictional demo company · OrgLens AI
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[520px]">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/[0.10] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-12 sm:px-6 md:pt-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Public demo preview
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            See what an OrgLens report looks like —{" "}
            <span className="text-indigo-300">without signing up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
            Browse a partial preview of the OrgLens AI report for NovaCloud
            Health, a fictional 28-person health-tech startup. Sign in free to
            unlock the full demo.
          </p>
        </div>

        {/* Company overview card */}
        <section className="mt-12">
          <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
                  Company overview
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  NovaCloud Health
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  NovaCloud Health is a fictional demo company used to show how
                  OrgLens works for a growing team.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 md:min-w-[320px]">
                <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    Employees
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold text-white">
                    28
                  </p>
                </div>
                <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    Industry
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Health Tech
                  </p>
                  <p className="text-[10px] text-zinc-500">SaaS</p>
                </div>
                <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                    Stage
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Series A
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's in the report */}
        <section className="mt-14">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              What the report includes
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Six lenses on your team
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORT_INCLUDES.map((i) => {
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
        </section>

        {/* Unlocked insight cards */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Sample insights
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              A taste of what OrgLens surfaces
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-6 shadow-[0_0_50px_-20px_rgba(99,102,241,0.5)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-indigo-200">
                  Org Structure Signal
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                Overlapping ownership in product leadership
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                3 of 6 leadership roles have unclear ownership boundaries. CTO
                and Head of Product have overlapping accountability in roadmap
                decisions.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.06] to-[#0F0F12] p-6 shadow-[0_0_50px_-20px_rgba(16,185,129,0.4)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-emerald-200">
                  Role Fit Signal
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                Top role-fit match in your senior team
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Top role-fit match: Alex Morgan (CEO) — 91% fit score across
                leading, driving success, and coping with pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Partial Org Map preview */}
        <section className="mt-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
                Partial org map
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                NovaCloud Health — Leadership view
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              Showing 5 of 28 team members
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
            {/* CEO */}
            <div className="flex flex-col items-center">
              <OrgNode
                name="Alex Morgan"
                role="Founder & CEO"
                tone="green"
                large
              />
              <div className="my-3 h-5 w-px bg-[#1E1E24]" />
            </div>

            {/* VP row */}
            <div className="grid gap-5 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <OrgNode
                  name="Jordan Lee"
                  role="CTO"
                  tone="green"
                />
                <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                <OrgNode
                  name="Morgan Chen"
                  role="Engineering Lead"
                  tone="green"
                  compact
                />
              </div>
              <div className="flex flex-col items-center">
                <OrgNode
                  name="Taylor Brooks"
                  role="Head of Product"
                  tone="amber"
                />
                <div className="my-2 h-3 w-px bg-[#1E1E24]" />
                <OrgNode
                  name="Riley Johnson"
                  role="Customer Success Lead"
                  tone="green"
                  compact
                />
              </div>

              {/* Locked column */}
              <div className="relative flex flex-col items-center">
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-[#0F0F12]/85 backdrop-blur-[2px]">
                  <Lock className="h-5 w-5 text-indigo-300" />
                  <p className="mt-2 max-w-[14rem] text-center text-xs text-zinc-300">
                    Sign in to unlock the full org map
                  </p>
                </div>
                <div className="space-y-2 opacity-30 blur-[2px]">
                  <OrgNode name="—" role="Head of Operations" tone="amber" />
                  <OrgNode name="—" role="Clinical Ops Lead" tone="amber" compact />
                  <OrgNode name="—" role="VP Sales" tone="amber" compact />
                  <OrgNode name="—" role="Account Executive" tone="amber" compact />
                </div>
              </div>
            </div>

            {/* Locked footer */}
            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/[0.04] px-4 py-3 text-xs text-zinc-400">
              <Lock className="h-3.5 w-3.5 text-indigo-300" />
              <span>
                23 more team members + full reporting structure available in the
                full demo
              </span>
            </div>
          </div>
        </section>

        {/* Partial Role Fit preview */}
        <section className="mt-16">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
                Partial role fit
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Top role-fit matches
              </h2>
            </div>
            <p className="text-xs text-zinc-500">Showing 3 of 28 members</p>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E24] bg-[#0A0A0B] text-left text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3 text-right">Fit Score</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#1E1E24]">
                  <td className="px-5 py-3.5 font-medium text-white">
                    Alex Morgan
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400">CEO</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-emerald-300">
                    91%
                  </td>
                </tr>
                <tr className="border-b border-[#1E1E24]">
                  <td className="px-5 py-3.5 font-medium text-white">
                    Jordan Lee
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400">CTO</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-emerald-300">
                    84%
                  </td>
                </tr>
                <tr className="border-b border-[#1E1E24]">
                  <td className="px-5 py-3.5 font-medium text-white">
                    Taylor Brooks
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400">Head of Product</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold text-amber-300">
                    79%
                  </td>
                </tr>
                {/* Locked rows */}
                <tr aria-hidden="true">
                  <td colSpan={3} className="relative h-32 px-5">
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0F0F12]/85 backdrop-blur-[2px]">
                      <Lock className="h-5 w-5 text-indigo-300" />
                      <p className="mt-2 text-sm text-zinc-300">
                        25 more team members…
                      </p>
                      <Link
                        href={SIGN_IN_URL}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-indigo-400/50 bg-indigo-500/15 px-3 py-1.5 text-xs font-medium text-indigo-100 transition-colors hover:bg-indigo-500/25 hover:text-white"
                      >
                        Unlock Full Demo
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="opacity-20 blur-[2px]">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-zinc-200">Casey Miller</span>
                        <span className="text-zinc-400">Head of Operations</span>
                        <span className="font-mono text-zinc-200">76%</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-zinc-200">Riley Johnson</span>
                        <span className="text-zinc-400">CS Lead</span>
                        <span className="font-mono text-zinc-200">74%</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Locked sections grid */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Locked sections
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Sign in free to unlock the full demo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              Each section is fully populated in the full demo — no payment
              required.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTION_PREVIEWS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="relative overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6"
                >
                  {/* Blurred placeholder */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-25"
                  >
                    <div className="absolute left-6 right-6 top-6 h-3 rounded bg-zinc-700/40 blur-[2px]" />
                    <div className="absolute left-6 right-12 top-12 h-3 rounded bg-zinc-700/40 blur-[2px]" />
                    <div className="absolute left-6 right-10 top-18 h-3 rounded bg-zinc-700/40 blur-[2px]" />
                    <div className="absolute left-6 right-16 top-24 mt-1 h-3 rounded bg-zinc-700/40 blur-[2px]" />
                    <div className="absolute left-6 right-8 bottom-20 h-3 rounded bg-zinc-700/40 blur-[2px]" />
                  </div>

                  {/* Frosted overlay */}
                  <div className="relative z-10 flex h-full min-h-[200px] flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/40">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {s.title}
                    </h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/[0.12] px-2.5 py-1 text-[11px] font-medium text-indigo-100">
                      <Lock className="h-3 w-3" />
                      Locked
                    </div>
                    <p className="mt-4 max-w-[14rem] text-xs leading-relaxed text-zinc-400">
                      Sign in to unlock the full demo report.
                    </p>
                    <Link
                      href={SIGN_IN_URL}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
                    >
                      Unlock Full Demo
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inline CTA panel */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.10] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-[80px]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
              Full demo · free account
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Unlock all 6 sections of the NovaCloud Health report
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              No payment required to view the full demo. Free account gives you
              full access.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={SIGN_IN_URL}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
              >
                Unlock Full Demo — Sign In Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
              >
                Get Founder Snapshot
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky bottom CTA bar */}
      <div className="sticky bottom-0 z-40 border-t border-[#1E1E24] bg-[#0A0A0B]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:px-6 md:flex-row md:gap-6 md:py-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Users className="h-3.5 w-3.5 text-indigo-300" />
            <span>
              No payment required to view the full demo. Free account gives you
              full access.
            </span>
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/50 px-4 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/10 hover:text-white"
            >
              Get Founder Snapshot
            </Link>
            <Link
              href={SIGN_IN_URL}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
            >
              Unlock Full Demo — Sign In Free
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrgNode({
  name,
  role,
  tone,
  large,
  compact,
}: {
  name: string;
  role: string;
  tone: "green" | "amber" | "red";
  large?: boolean;
  compact?: boolean;
}) {
  const dot =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  return (
    <div
      className={`relative flex w-full max-w-[280px] items-center gap-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] ${
        large ? "px-5 py-3" : compact ? "px-3 py-2" : "px-4 py-2.5"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
      <div className="min-w-0">
        <p
          className={`truncate font-medium text-white ${
            large ? "text-sm" : compact ? "text-[11px]" : "text-xs"
          }`}
        >
          {name}
        </p>
        <p
          className={`truncate text-zinc-500 ${
            large ? "text-[11px]" : "text-[10px]"
          }`}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
