import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  Mail,
} from "lucide-react";

const FULL_REPORT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md77k46snb81k8f7vgmm46hbzx86gc8y";

const included = [
  "Org map review",
  "Role-fit analysis",
  "Leadership coverage",
  "Competency signal summary",
  "Team structure risks",
  "Scaling readiness observations",
  "Prioritized recommendations",
  "Downloadable/shareable report",
];

export default function FullReportPaymentPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to pricing
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Left column: product detail */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                <ClipboardList className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
                Full OrgLens Report
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Full OrgLens Report
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              A comprehensive organizational intelligence report for founders,
              operators, and SME leaders making high-stakes team decisions.
            </p>

            <div className="mt-8 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                What&rsquo;s included
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-300" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  What happens after payment
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  After purchase, you&rsquo;ll receive a detailed intake form
                  by email.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  Share team roles, reporting lines, key decisions in
                  progress, and any relevant org context.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  Your report will be delivered within 7&ndash;10 business
                  days.
                </li>
              </ul>
            </div>
          </div>

          {/* Right column: checkout panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Full Analysis
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <p className="text-4xl font-bold tracking-tight text-white">
                  $249
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                One-time payment. Report delivered within 7&ndash;10 business
                days.
              </p>

              <a
                href={FULL_REPORT_CHECKOUT_URL}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
              >
                Run Full Analysis &mdash; $249
                <ArrowRight className="h-4 w-4" />
              </a>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                Questions? Contact us at{" "}
                <a
                  className="text-indigo-300 hover:text-indigo-200"
                  href="mailto:team@orglens-ai.madethis.app"
                >
                  team@orglens-ai.madethis.app
                </a>
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-5 text-xs leading-relaxed text-zinc-500">
              OrgLens reports are designed to support founder judgment, not
              replace it. They should be used as decision-support tools, not
              as the sole basis for employment decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
