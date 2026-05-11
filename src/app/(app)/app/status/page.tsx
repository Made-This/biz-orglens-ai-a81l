"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowRight, Sparkles } from "lucide-react";
import { ResponsibleAINote } from "@/components/auth-shared";
import {
  ProgressTracker,
  statusToStageIndex,
} from "@/components/app/progress-tracker";

export default function ReportStatusPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  const workspace = useQuery(
    api.customerWorkspaces.getMyWorkspace,
    isAuthenticated ? {} : "skip"
  );
  const intake = useQuery(
    api.intakeSubmissions.getMyIntake,
    isAuthenticated ? {} : "skip"
  );

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  const reportStatus = workspace?.reportStatus;
  const hasIntake = !!intake;
  const isReportReady = reportStatus === "report_ready";
  const currentStage = statusToStageIndex(reportStatus);

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Report status
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Your OrgLens Report Status
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Track your analysis as it moves from intake through delivery.
        </p>
      </header>

      {/* Progress tracker */}
      <div className="rounded-2xl border border-[#1E1E24] bg-[#111118] p-6 md:p-8">
        <div className="flex items-center gap-2 text-indigo-300">
          <Sparkles className="h-4 w-4" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            Progress
          </p>
        </div>
        <ProgressTracker currentStage={currentStage} />
      </div>

      {/* Status message */}
      <div className="mt-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111118] p-6 md:p-8 shadow-[0_0_60px_-20px_rgba(99,102,241,0.4)]">
        {isReportReady ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Report ready
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
              Your report is ready.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Your custom OrgLens organizational intelligence report is ready
              to view.
            </p>
            <Link
              href="/app/report"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
            >
              View Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : !hasIntake ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Intake needed
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
              Complete your intake form to begin your analysis.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              We need a bit of context about your team and the decision
              you&rsquo;re working through before we can prepare your report.
            </p>
            <Link
              href="/app/intake"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
            >
              Start Intake Form
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Analysis underway
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
              We&rsquo;ve received your company context.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Your OrgLens report will be prepared based on the information
              you submitted. We&rsquo;ll notify you by email as soon as
              it&rsquo;s ready.
            </p>
          </>
        )}
      </div>

      {/* Secondary nav */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/app/workspace"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E1E24] bg-[#111116] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-white"
        >
          Back to Workspace
        </Link>
        {hasIntake && (
          <Link
            href="/app/intake"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E1E24] bg-[#111116] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-white"
          >
            View Intake Submission
          </Link>
        )}
      </div>

      <ResponsibleAINote className="mt-12" />
    </div>
  );
}
