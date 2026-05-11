import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Receipt } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy — OrgLens AI",
  description:
    "OrgLens AI refund policy. Reports involve custom analysis and are generally non-refundable once started.",
};

const SUPPORT_EMAIL = "team@orglens-ai.madethis.app";

export default function RefundsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Legal · Refunds
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Refund Policy
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Custom analysis, clear policy. Here&rsquo;s how refunds work at
            OrgLens AI.
          </p>
        </div>

        <section className="mt-12 rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <Receipt className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Our Refund Policy
            </h2>
          </div>
          <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-zinc-300 md:text-base">
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span>
                Because OrgLens reports involve custom analysis, completed
                reports are generally non-refundable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span>
                If you purchased by mistake or have not yet submitted intake
                information, contact us within 7 days at{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                and we will review your request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
              <span>
                We are committed to making sure every customer gets value from
                their OrgLens report. If you have concerns about your purchase,
                reach out before submitting your intake — we are happy to help.
              </span>
            </li>
          </ul>
        </section>

        <div className="mt-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-8 text-center md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Questions about a purchase?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            Reach out before submitting your intake form and our team will help
            you decide what&rsquo;s right for your stage.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
          >
            Contact OrgLens AI
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <Link
            href="/legal/terms"
            className="hover:text-indigo-300 transition-colors"
          >
            Terms of Service
          </Link>
          <span>·</span>
          <Link
            href="/legal/privacy"
            className="hover:text-indigo-300 transition-colors"
          >
            Privacy Policy
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
            href="/legal/responsible-ai"
            className="hover:text-indigo-300 transition-colors"
          >
            Responsible AI
          </Link>
        </div>
      </div>
    </div>
  );
}
