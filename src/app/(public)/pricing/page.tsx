import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

// Marketing-page CTAs route to the demo first. The payment CTA lives on
// /app/report after the user has explored the demo value.
const DEMO_URL = "/app/report";

const features = [
  "Competency org map",
  "Role-fit ranking for all team members",
  "3 AI-generated restructuring scenarios",
  "Organizational risk assessment",
  "Founder decision memo export",
  "Unlimited viewing after purchase",
];

const faqs = [
  {
    question: "Is this a subscription?",
    answer:
      "No. OrgLens AI is a one-time, $49 analysis. You pay per organizational analysis — no recurring fees, no surprise bills.",
  },
  {
    question: "Who is this built for?",
    answer:
      "Founders, COOs, and operating partners at Series A startups and PE-backed SMEs who need to make organizational decisions under pressure — restructuring, hiring, role design, board prep.",
  },
  {
    question: "How long does an analysis take?",
    answer:
      "Most analyses complete in under 10 minutes. Upload your team data, define your roles, and OrgLens AI generates the competency map, role-fit ranking, and three restructuring scenarios.",
  },
  {
    question: "Can I run multiple analyses?",
    answer:
      "Yes. Each analysis is $49. Run one before a board meeting, another after a key hire, another when planning a restructure. Pay only for what you use.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[500px]">
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Pay per analysis. No subscriptions.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            One organizational analysis, one fixed price. No seats, no monthly
            invoices, no upsells.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mx-auto mt-16 max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-10 shadow-[0_0_80px_-15px_rgba(99,102,241,0.5)]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]" />

            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Starter Analysis
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-6xl font-bold tracking-tight text-white">
                $49
              </span>
              <span className="text-sm text-zinc-500">USD</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              One-time. No subscription.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-zinc-300">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={DEMO_URL}
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
            >
              See a Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Trusted by founders at Series A startups and PE-backed SMEs.
          </p>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Pricing questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Run your first analysis today.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            See where your organization stands — before your next board
            meeting.
          </p>
          <div className="mt-8">
            <Link
              href={DEMO_URL}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              See a Live Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
