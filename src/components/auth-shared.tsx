import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function SignInValuePanel() {
  return (
    <div className="flex flex-col justify-center">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
        <Sparkles className="h-3 w-3" />
        OrgLens workspace
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
        Access your OrgLens workspace
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
        Sign in to manage your organizational intelligence report, submit team
        context, track your analysis status, and view completed
        recommendations.
      </p>

      <div className="mt-6 rounded-xl border border-indigo-400/40 bg-indigo-500/[0.08] p-5 shadow-[0_0_40px_-15px_rgba(99,102,241,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          No account yet?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Explore a sample report first with{" "}
          <span className="text-white">NovaCloud Health</span>, a fictional
          demo company showing how OrgLens works for a growing team. OrgLens
          is built for startups and SMEs with 10–150 employees.
        </p>
        <Link
          href="/app"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 sm:w-auto"
        >
          Try Demo — No Login Required
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <Link
            href="/app"
            className="font-medium text-indigo-200 transition-colors hover:text-white"
          >
            View Demo Report →
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/payment/founder-snapshot"
            className="font-medium text-indigo-200 transition-colors hover:text-white"
          >
            Get Founder Snapshot →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ResponsibleAINote({ className }: { className?: string }) {
  return (
    <div className={className ?? "relative mx-auto mt-16 max-w-3xl px-4"}>
      <div className="rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          Responsible AI
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          OrgLens is designed to support founder judgment, not replace it.
          Reports should be used as decision-support tools, not as the sole
          basis for hiring, firing, promotion, compensation, or other
          employment decisions.
        </p>
      </div>
    </div>
  );
}
