import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  Lightbulb,
  Stethoscope,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases — OrgLens AI",
  description:
    "OrgLens AI use cases for founders, operators, SME leaders, COOs, fractional HR consultants, and VC advisors supporting startups and SMEs with 10–150 employees.",
};

type UseCase = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  paragraphs: string[];
  painBefore: string[];
  whatWeDeliver: string[];
};

const USE_CASES: UseCase[] = [
  {
    icon: Building2,
    title: "Founder-led startup preparing to scale",
    paragraphs: [
      "You're approaching a funding round or a new growth phase. Understand whether your current team structure, role ownership, and leadership coverage can support the next stage of growth before adding more headcount.",
      "Most founders make this call from intuition. OrgLens gives you a structured view of where your team is strong, where leadership coverage is thin, and where role-fit mismatches will compound under pressure.",
    ],
    painBefore: [
      "Hiring plans built on resume fit, not role design",
      "Founder still owning critical decisions across multiple functions",
      "No structured view of leadership coverage before the next raise",
    ],
    whatWeDeliver: [
      "Org map showing leadership coverage and gaps",
      "Role-fit signals across every team member",
      "Recommended next steps for hires, redesigns, and ownership transfers",
    ],
  },
  {
    icon: Stethoscope,
    title: "Growing SME adding management layers",
    paragraphs: [
      "Your company is transitioning from informal founder-led execution to a more structured operating model. Clarify accountability, reporting lines, and ownership as the company moves beyond informal team coordination.",
      "OrgLens helps you map role coverage, identify leadership gaps, and design a team structure that matches how your business actually operates today.",
    ],
    painBefore: [
      "Informal team coordination breaking down as headcount grows",
      "No clear ownership of operating-model decisions",
      "Key-person dependency across multiple functions",
    ],
    whatWeDeliver: [
      "Operating model snapshot for a growing team",
      "Leadership coverage view across functions",
      "Team structure risks that will surface as you scale",
    ],
  },
  {
    icon: Users,
    title: "Team with 20–100 employees",
    paragraphs: [
      "Your team is too complex to manage by intuition alone, but not yet ready for expensive org-design consulting. You need a clearer view of role clarity, leadership coverage, and structural risks before the next stage of growth.",
      "OrgLens gives founders, operators, and SME leaders a structured organizational intelligence report at a fraction of the cost of traditional consulting — built specifically for growing teams.",
    ],
    painBefore: [
      "Team complexity has outpaced founder intuition",
      "Org-design consulting feels premature or too expensive",
      "Decisions about hires and structure rely on gut feel",
    ],
    whatWeDeliver: [
      "Structured organizational intelligence report",
      "Role clarity and leadership coverage view",
      "Practical next steps before the next hiring or restructure decision",
    ],
  },
  {
    icon: Briefcase,
    title: "COO or operator improving ownership clarity",
    paragraphs: [
      "You're responsible for execution, but roles and ownership are unclear across functions. Things get done because individuals lean in — not because the structure assigns responsibility.",
      "OrgLens surfaces where accountability is missing and which roles need redesign before the next hiring cycle, so the execution layer can scale without depending on heroics.",
    ],
    painBefore: [
      "Cross-functional work routinely escalates to the COO or operator",
      "Role descriptions don't match how work actually flows",
      "New hires absorbed without clarifying ownership lines",
    ],
    whatWeDeliver: [
      "Clear map of where accountability is undefined",
      "Role-fit signals for each function lead",
      "Prioritized list of roles to redesign before the next hire",
    ],
  },
  {
    icon: Compass,
    title: "Fractional HR consultant supporting a client",
    paragraphs: [
      "You support startups and SMEs without a dedicated People team. Your value is judgment — but you need a structured analytical layer to present to clients.",
      "OrgLens turns team observation into a structured organizational intelligence report that helps clients understand role clarity, leadership coverage, and team risks.",
    ],
    painBefore: [
      "Founder conversations move faster than written documentation",
      "Recommendations rely on consultant credibility alone",
      "No reusable artifact to leave with the client after a session",
    ],
    whatWeDeliver: [
      "Structured decision report you can share with the client",
      "Org map and role-fit signals to anchor your recommendations",
      "Repeatable diagnostic you can run across multiple clients",
    ],
  },
  {
    icon: Lightbulb,
    title: "VC advisor or startup operator helping portfolio companies",
    paragraphs: [
      "You work with a portfolio of growing companies at inflection points. Every founder hits the same team-design questions, but at different times — and you don't have a structured way to compare across companies.",
      "OrgLens lets you run a consistent organizational diagnostic across companies and give leaders a structured view of team health before a board review or scaling decision.",
    ],
    painBefore: [
      "Each portfolio diagnostic done from scratch",
      "Board prep conversations rely on subjective signal",
      "No standard artifact founders can act on after a portfolio review",
    ],
    whatWeDeliver: [
      "Consistent organizational intelligence report across portfolio",
      "Board-ready summary of team risks and leadership coverage",
      "Repeatable structure you can offer as a platform service",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Use cases
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built for the moments that define how a company scales.
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OrgLens turns team structure, role-fit signals, competency
            patterns, and leadership coverage into a founder- and
            operator-ready decision report for startups and SMEs with 10–150
            employees — for the people making the call.
          </p>
        </div>

        <div className="mt-20 space-y-20">
          {USE_CASES.map((uc) => {
            const Icon = uc.icon;
            return (
              <article
                key={uc.title}
                className="rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {uc.title}
                  </h2>
                </div>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
                  {uc.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
                      Pain before OrgLens
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                      {uc.painBefore.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      What OrgLens delivers
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                      {uc.whatWeDeliver.map((b, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex justify-start">
                  <Link
                    href="/app/report"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
                  >
                    View Demo Report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to see what OrgLens produces for your team?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Start with the free demo report. No sign-up required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/app/report"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              View Demo Report
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/get-analysis"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 px-6 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white"
            >
              Get My Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
