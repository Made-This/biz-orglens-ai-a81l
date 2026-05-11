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
        Sign in to unlock the full OrgLens demo report or access your
        workspace.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
        Free account gives you full demo access. Paid customers can access
        their intake form, report status, and final report.
      </p>

      <div className="mt-6 rounded-xl border border-indigo-400/40 bg-indigo-500/[0.08] p-5 shadow-[0_0_40px_-15px_rgba(99,102,241,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
          New here?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Explore the public preview first — see how OrgLens analyzes{" "}
          <span className="text-white">NovaCloud Health</span>, a fictional
          demo company. Sign in (free) to unlock the full demo report. OrgLens
          is built for startups and SMEs with 10–150 employees.
        </p>
        <Link
          href="/demo"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 sm:w-auto"
        >
          View Public Demo Preview
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <Link
            href="/app/demo"
            className="font-medium text-indigo-200 transition-colors hover:text-white"
          >
            Continue to Full Demo →
          </Link>
          <span className="text-zinc-700">·</span>
          <Link
            href="/pricing"
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
