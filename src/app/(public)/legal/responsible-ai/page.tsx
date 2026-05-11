import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ScrollText,
  ShieldCheck,
  UserCog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible AI & People Decisions — OrgLens AI",
  description:
    "OrgLens AI is a decision-support tool for founders, operators, and SME leaders. No automated hiring or employment decisions are made by OrgLens AI.",
};

export default function LegalResponsibleAIPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Legal · Responsible AI
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Responsible AI &amp; People Decisions
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            OrgLens is designed to support founder and leadership judgment, not
            replace it. Reports should be used as decision-support tools and
            should not be used as the sole basis for hiring, firing, promotion,
            compensation, or other employment decisions.
          </p>
        </div>

        {/* What OrgLens Does */}
        <Section icon={CheckCircle2} title="What OrgLens Does">
          <ul className="space-y-3 text-zinc-300">
            <Bullet>
              OrgLens highlights organizational patterns, role-fit indicators,
              team structure risks, and leadership coverage gaps.
            </Bullet>
            <Bullet>OrgLens does not make final employment decisions.</Bullet>
            <Bullet>
              All outputs are structured insights intended to support — not
              replace — human review and business judgment.
            </Bullet>
          </ul>
        </Section>

        {/* Your Responsibilities */}
        <Section icon={UserCog} title="Your Responsibilities">
          <ul className="space-y-3 text-zinc-300">
            <Bullet>
              Human review, business context, and lawful employment practices
              are required before taking any action based on OrgLens reports.
            </Bullet>
            <Bullet>
              Customers are responsible for complying with applicable
              employment, privacy, and AI-governance laws in their
              jurisdiction.
            </Bullet>
            <Bullet>
              Reports should be reviewed with qualified HR, legal, or
              management professionals where appropriate.
            </Bullet>
          </ul>
        </Section>

        {/* Disclaimer */}
        <Section icon={ScrollText} title="Decision-Support Tool" tone="amber">
          <p>
            OrgLens is designed as a decision-support tool for founders,
            operators, and SME leaders. No automated hiring or employment
            decisions are made by OrgLens AI.
          </p>
        </Section>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
          <ShieldCheck className="mx-auto h-10 w-10 text-indigo-300" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Designed for growing teams. Reviewed by human leaders.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            Have questions about how OrgLens fits into your decision-making
            process? Reach out to our team.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              Contact OrgLens AI
              <ArrowRight className="h-4 w-4" />
            </Link>
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

function Section({
  icon: Icon,
  title,
  children,
  tone = "indigo",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  tone?: "indigo" | "amber";
}) {
  const tones: Record<typeof tone, { ring: string; bg: string; text: string }> =
    {
      indigo: {
        ring: "ring-indigo-400/30",
        bg: "bg-indigo-500/10",
        text: "text-indigo-300",
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
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
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
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" />
      <span>{children}</span>
    </li>
  );
}
