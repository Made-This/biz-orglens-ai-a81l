import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  ScrollText,
  ShieldCheck,
  UserCog,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible AI — OrgLens AI",
  description:
    "OrgLens AI is a decision-support tool for founders, operators, and SME leaders. We do not make employment decisions. See our Responsible AI commitment.",
};

export default function ResponsibleAIPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Responsible AI
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Responsible AI in organizational intelligence.
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OrgLens is built to support founder, operator, and SME-leader
            judgment — not replace it.
          </p>
        </div>

        {/* Our commitment */}
        <Section
          icon={ShieldCheck}
          title="Our Commitment"
        >
          <p>
            OrgLens is built to support human judgment, not to replace it.
            Every report we generate is a decision-support tool — a structured
            way to see your team&rsquo;s patterns more clearly before you make
            a decision.
          </p>
        </Section>

        {/* What OrgLens Does */}
        <Section
          icon={CheckCircle2}
          title="What OrgLens Does"
        >
          <ul className="space-y-3 text-zinc-300">
            <Bullet>Analyzes team structure, role coverage, and competency patterns.</Bullet>
            <Bullet>Surfaces risks and gaps that are hard to see from inside the org.</Bullet>
            <Bullet>Generates structured reports founders can review, share, and act on.</Bullet>
            <Bullet>Helps founders ask better questions about their team.</Bullet>
          </ul>
        </Section>

        {/* What OrgLens Does Not Do */}
        <Section
          icon={XCircle}
          title="What OrgLens Does Not Do"
          tone="rose"
        >
          <ul className="space-y-3 text-zinc-300">
            <BulletRose>OrgLens does not make hiring, firing, or promotion decisions.</BulletRose>
            <BulletRose>OrgLens does not assess individual employees for termination.</BulletRose>
            <BulletRose>OrgLens does not produce verdicts — only signals and patterns.</BulletRose>
            <BulletRose>
              OrgLens is not a replacement for HR professionals, employment
              lawyers, or organizational development specialists.
            </BulletRose>
          </ul>
        </Section>

        {/* How to use */}
        <Section icon={UserCog} title="How to Use OrgLens Reports">
          <p>
            OrgLens reports should be used as one input among many — alongside
            your own judgment, team feedback, and professional HR advice where
            appropriate. Reports are designed to help founders think more
            clearly, not to automate people decisions.
          </p>
        </Section>

        {/* Data and Privacy */}
        <Section icon={Lock} title="Data and Privacy">
          <ul className="space-y-3 text-zinc-300">
            <Bullet>
              Data uploaded to OrgLens is used only to generate your report.
            </Bullet>
            <Bullet>We do not share your team data with third parties.</Bullet>
            <Bullet>Reports are private to your account.</Bullet>
          </ul>
        </Section>

        {/* Disclaimer */}
        <Section icon={ScrollText} title="Disclaimer" tone="amber">
          <p>
            OrgLens AI reports are analytical decision-support tools. They do
            not constitute professional HR, legal, or organizational
            development advice. OrgLens AI is not liable for employment
            decisions made on the basis of report outputs.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designed for growing teams. Reviewed by human leaders.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Try the free demo report and see exactly what OrgLens produces —
            and where human judgment stays in the loop.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/app"
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

function Section({
  icon: Icon,
  title,
  children,
  tone = "indigo",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  tone?: "indigo" | "rose" | "amber";
}) {
  const tones: Record<typeof tone, { ring: string; bg: string; text: string }> = {
    indigo: {
      ring: "ring-indigo-400/30",
      bg: "bg-indigo-500/10",
      text: "text-indigo-300",
    },
    rose: {
      ring: "ring-rose-400/30",
      bg: "bg-rose-500/10",
      text: "text-rose-300",
    },
    amber: {
      ring: "ring-amber-400/30",
      bg: "bg-amber-500/10",
      text: "text-amber-300",
    },
  };
  const s = tones[tone];

  return (
    <section className="mt-12 rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} ${s.text} ring-1 ring-inset ${s.ring}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
      </div>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      <span>{children}</span>
    </li>
  );
}

function BulletRose({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
      <span>{children}</span>
    </li>
  );
}
