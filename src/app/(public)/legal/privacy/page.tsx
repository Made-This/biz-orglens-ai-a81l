import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — OrgLens AI",
  description:
    "Plain-language summary of how OrgLens AI handles your data, including newsletter, payment, intake, and uploaded files.",
};

const LAST_UPDATED = "May 2026";
const SUPPORT_EMAIL = "team@orglens-ai.madethis.app";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Legal · Privacy
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Plain-language summary of how we handle your data. Last updated:{" "}
            {LAST_UPDATED}.
          </p>
        </div>

        <PolicySection title="1. What We Collect">
          <ul className="space-y-2.5">
            <Bullet>Email address (newsletter signup, account creation).</Bullet>
            <Bullet>
              Payment confirmation data (processed via Stripe — we do not store
              card numbers).
            </Bullet>
            <Bullet>
              Company and team information submitted through intake forms.
            </Bullet>
            <Bullet>
              Uploaded files such as org charts, team lists, or role
              descriptions.
            </Bullet>
            <Bullet>
              Basic usage data (pages visited, session information).
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="2. How We Use Your Data">
          <ul className="space-y-2.5">
            <Bullet>
              To prepare and deliver your OrgLens organizational intelligence
              report.
            </Bullet>
            <Bullet>
              To send OrgLens insights and product updates (newsletter
              subscribers only).
            </Bullet>
            <Bullet>To improve the OrgLens service.</Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="3. Who We Share Data With">
          <ul className="space-y-2.5">
            <Bullet>Stripe (payment processing).</Bullet>
            <Bullet>Convex (cloud database and backend infrastructure).</Bullet>
            <Bullet>We do not sell your data to third parties.</Bullet>
            <Bullet>
              We do not use customer-uploaded confidential company data to
              train public AI models.
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="4. Data Deletion">
          <ul className="space-y-2.5">
            <Bullet>
              You may request deletion of your account and submitted data by
              emailing{" "}
              <a
                className="text-indigo-300 hover:text-indigo-200"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </Bullet>
            <Bullet>We will respond within 30 days.</Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="5. Newsletter Unsubscribe">
          <ul className="space-y-2.5">
            <Bullet>Every newsletter email includes an unsubscribe link.</Bullet>
            <Bullet>
              You may also unsubscribe by emailing{" "}
              <a
                className="text-indigo-300 hover:text-indigo-200"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="6. Security">
          <ul className="space-y-2.5">
            <Bullet>Data is stored in Convex with encryption at rest.</Bullet>
            <Bullet>
              Access to submitted information is limited to providing the
              requested service.
            </Bullet>
            <Bullet>We do not sell customer-submitted report data.</Bullet>
          </ul>
        </PolicySection>

        <PolicySection title="7. Contact">
          <p>
            For privacy questions:{" "}
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
            href="/legal/terms"
            className="hover:text-indigo-300 transition-colors"
          >
            Terms of Service
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
