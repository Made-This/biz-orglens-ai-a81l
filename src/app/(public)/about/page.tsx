import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[400px]">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          About OrgLens AI
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Competency science, made accessible.
        </h1>

        <div className="mt-10 space-y-6 text-lg text-zinc-400">
          <p>
            We built OrgLens AI for founders who face organizational decisions
            without the right intelligence. Restructuring under burn pressure.
            Filling a critical role with imperfect data. Reading a board memo
            you don&rsquo;t fully trust.
          </p>
          <p>
            For decades, the analytical tools that could answer those questions
            lived inside top consulting firms — six-figure engagements,
            multi-month timelines, and decks instead of decisions. That
            asymmetry is no longer acceptable.
          </p>
          <p>
            OrgLens AI brings competency science, organizational intelligence,
            and AI-generated restructuring scenarios to every founder and SME
            executive. Pay per analysis. Run it in minutes. Walk into your next
            board meeting with clarity instead of guesswork.
          </p>
          <p className="text-xl font-semibold text-white">
            We turn human complexity into decision clarity.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <Principle
            label="Scientific"
            text="Grounded in competency frameworks and behavioral signal analysis."
          />
          <Principle
            label="Decision-first"
            text="Every output is built to support a real organizational decision."
          />
          <Principle
            label="Founder-native"
            text="Designed for the operator who has to act, not the consultant who has time to study."
          />
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-8 text-center shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)]">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Ready to see your organization clearly?
          </h2>
          <p className="mt-2 text-zinc-400">
            Run your first analysis in under 10 minutes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              Start Your Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-[#1E1E24] bg-[#111113] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-zinc-700 hover:bg-[#16161A]"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Principle({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-6">
      <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
        {label}
      </p>
      <p className="mt-3 text-sm text-zinc-400">{text}</p>
    </div>
  );
}
