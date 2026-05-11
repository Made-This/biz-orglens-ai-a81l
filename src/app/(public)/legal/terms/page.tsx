import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — OrgLens AI",
  description:
    "Terms of Service for OrgLens AI. OrgLens provides decision-support organizational intelligence reports for founders, operators, and SME leaders.",
};

const SUPPORT_EMAIL = "team@orglens-ai.madethis.app";

export default function TermsOfServicePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Legal · Terms
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            By using OrgLens AI, you agree to these terms.
          </p>
        </div>

        <PolicySection title="1. What OrgLens Provides">
          <ul className="space-y-2.5">
            <Bullet>
              OrgLens provides decision-support organizational intelligence
              reports.
            </Bullet>
            <Bullet>
              OrgLens does not provide legal, HR, employment, psychological, or
              medical advice.
            </Bullet>
            <Bullet>
              Reports are structured insights to support founder and leadership
              judgment.
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="2. Your Responsibilities">
          <ul className="space-y-2.5">
            <Bullet>
              You are responsible for reviewing all outputs before taking
              action.
            </Bullet>
            <Bullet>
              You must have the right to submit any company or team
              information you upload.
            </Bullet>
            <Bullet>
              You are responsible for the lawful use of OrgLens reports in your
              jurisdiction.
            </Bullet>
            <Bullet>
              Reports must not be used as the sole basis for hiring, firing,
              promotion, compensation, or other employment decisions.
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="3. No Guarantees">
          <ul className="space-y-2.5">
            <Bullet>
              OrgLens does not guarantee business, hiring, retention,
              promotion, or performance outcomes.
            </Bullet>
            <Bullet>
              Organizational intelligence reports reflect patterns in submitted
              data — they are not predictions or guarantees.
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="4. Intellectual Property">
          <ul className="space-y-2.5">
            <Bullet>
              OrgLens reports generated for you are for your internal business
              use.
            </Bullet>
            <Bullet>You may not resell or redistribute OrgLens reports.</Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="5. Limitation of Liability">
          <p>
            OrgLens AI is a decision-support tool. Customers assume
            responsibility for decisions made based on reports.
          </p>
        </PolicySection>

        <PolicySection title="6. Contact">
          <p>
            Questions:{" "}
            <a
              className="text-indigo-300 hover:text-indigo-200"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </PolicySection>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <Link
            href="/legal/privacy"
            className="hover:text-indigo-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>·</span>
          <Link
            href="/legal/responsible-ai"
            className="hover:text-indigo-300 transition-colors"
          >
            Responsible AI
          </Link>
          <span>·</span>
          <Link
            href="/legal/security"
            className="hover:text-indigo-300 transition-colors"
          >
            Security
          </Link>
          <span>·</span>
          <Link
            href="/contact"
            className="hover:text-indigo-300 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7 md:p-9">
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300 md:text-base">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
      <span>{children}</span>
    </li>
  );
}
