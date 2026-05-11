import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Confidentiality — OrgLens AI",
  description:
    "How OrgLens AI handles customer-submitted information, encryption at rest, access controls, and our policy on training public AI models.",
};

const SUPPORT_EMAIL = "team@orglens-ai.madethis.app";

const COMMITMENTS = [
  "Customer-submitted company and team information is used solely to generate the requested OrgLens report.",
  "We do not sell customer-submitted report data.",
  "Access to submitted information is limited to providing and improving the requested service.",
  "We do not use customer-uploaded confidential company data to train public AI models.",
  "Data is stored in Convex, a cloud database platform with encryption at rest and secure access controls.",
];

export default function SecurityPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Legal · Security
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Security &amp; Confidentiality
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Our commitments to keeping your team and company information
            confidential.
          </p>
        </div>

        <section className="mt-12 rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Our Commitments
            </h2>
          </div>
          <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-zinc-300 md:text-base">
            {COMMITMENTS.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                <span>{c}</span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span>
                Customers may request deletion of submitted data by emailing{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Responsible Data Handling
            </h2>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-zinc-300 md:text-base">
            Uploaded files — including org charts, team lists, and role
            descriptions — are stored only for the purpose of generating the
            requested report and are not shared externally.
          </p>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <Link
            href="/legal/privacy"
            className="hover:text-indigo-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>·</span>
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
