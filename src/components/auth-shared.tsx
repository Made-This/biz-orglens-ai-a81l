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

      <div className="mt-6 rounded-xl border border-[#1E1E24] bg-[#111113] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          New to OrgLens?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Explore a sample report first with{" "}
          <span className="text-white">NovaCloud Health</span>, a fictional
          demo company showing how OrgLens works for a growing team. OrgLens is
          built for startups and SMEs with 10–150 employees.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
          >
            View Demo Report
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/payment/founder-snapshot"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
          >
            Get Founder Snapshot
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <Link
        href="/app"
        className="mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
      >
        Try Demo — No Login Required
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
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
