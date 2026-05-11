"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { ResponsibleAINote } from "@/components/auth-shared";
import {
  ProgressTracker,
  statusToStageIndex,
} from "@/components/app/progress-tracker";

export default function WorkspacePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Redirect to /sign-in if user is browsing in demo mode (not authenticated).
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
  const myUploads = useQuery(
    api.uploads.getMyUploads,
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
  const currentStage = statusToStageIndex(reportStatus);
  const hasWorkspace = !!workspace;
  const hasIntake = !!intake;
  const isReportReady = reportStatus === "report_ready";

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <header className="mb-10">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Customer workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          My OrgLens Workspace
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-zinc-400">
          Manage your purchase, intake form, and final report all in one
          place.
        </p>
      </header>

      {!hasWorkspace ? (
        <NoWorkspaceCard />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {/* 1. Purchased Product */}
          <Card icon={<CreditCard className="h-4 w-4" />} title="Purchased Product">
            <p className="mt-2 text-lg font-semibold text-white">
              {workspace.productName ?? "OrgLens analysis"}
            </p>
            {typeof workspace.amount === "number" && (
              <p className="mt-1 font-mono text-sm text-indigo-300">
                {(workspace.amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            )}
            <p className="mt-3 text-xs text-zinc-500">
              Email: {workspace.email}
            </p>
          </Card>

          {/* 2. Report Status — progress tracker */}
          <Card
            icon={<Sparkles className="h-4 w-4" />}
            title="Report Status"
            className="md:col-span-2"
          >
            <ProgressTracker currentStage={currentStage} />
          </Card>

          {/* 3. Next Step */}
          <Card
            icon={<ArrowRight className="h-4 w-4" />}
            title="Next Step"
            className="md:col-span-2"
            accent="indigo"
          >
            <NextStepBlock
              hasIntake={hasIntake}
              isReportReady={isReportReady}
            />
          </Card>

          {/* 4. Intake Form */}
          <Card icon={<ClipboardList className="h-4 w-4" />} title="Intake Form">
            <div className="mt-3 flex items-center justify-between gap-3">
              <StatusChip
                tone={hasIntake ? "good" : "warn"}
                label={hasIntake ? "Submitted" : "Not started"}
              />
              <Link
                href="/app/intake"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
              >
                {hasIntake ? "View / Edit" : "Start now"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          {/* 5. Uploaded Files */}
          <Card icon={<Upload className="h-4 w-4" />} title="Uploaded Files">
            <div className="mt-3 flex items-center justify-between gap-3">
              <StatusChip
                tone={myUploads && myUploads.length > 0 ? "good" : "warn"}
                label={
                  myUploads === undefined
                    ? "Loading"
                    : myUploads.length > 0
                      ? `${myUploads.length} uploaded`
                      : "None yet"
                }
              />
              <Link
                href="/app/upload"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
              >
                Upload reports
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          {/* 6. Final Report */}
          <Card icon={<FileText className="h-4 w-4" />} title="Final Report" className="md:col-span-2">
            {isReportReady ? (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <StatusChip tone="good" label="Ready" />
                <Link
                  href="/app/report"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400"
                >
                  View Report
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                  <Lock className="h-3 w-3" /> Locked
                </span>
                <p className="text-xs text-zinc-500">
                  Your report will unlock here when it&rsquo;s ready.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Analyses section — always shown when authenticated. */}
      {hasWorkspace && (
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
                Analyses
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
                Your team report analyses
              </h2>
            </div>
            <Link
              href="/app/upload"
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload Reports
            </Link>
          </div>

          <AnalysesList uploads={myUploads} />
        </section>
      )}

      <ResponsibleAINote className="mt-12" />
    </div>
  );
}

function NoWorkspaceCard() {
  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111118] p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          No active purchase found
        </h2>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
        We couldn&rsquo;t find a purchase tied to your account. Get started
        with a Founder Snapshot to unlock your own organizational intelligence
        report.
      </p>
      <Link
        href="/payment/founder-snapshot"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
      >
        Get Founder Snapshot
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function NextStepBlock({
  hasIntake,
  isReportReady,
}: {
  hasIntake: boolean;
  isReportReady: boolean;
}) {
  if (isReportReady) {
    return (
      <div className="mt-2">
        <p className="text-sm leading-relaxed text-zinc-200">
          Your report is ready. View now.
        </p>
        <Link
          href="/app/report"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
        >
          View Report
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (!hasIntake) {
    return (
      <div className="mt-2">
        <p className="text-sm leading-relaxed text-zinc-200">
          Complete your intake form so we can prepare your report.
        </p>
        <Link
          href="/app/intake"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
        >
          Complete Intake Form
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-sm leading-relaxed text-zinc-200">
        We&rsquo;ve received your context. Your report will be ready soon.
      </p>
      <Link
        href="/app/status"
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
      >
        Check Status
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Card({
  icon,
  title,
  children,
  className = "",
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  accent?: "indigo";
}) {
  const accentClass =
    accent === "indigo"
      ? "border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111118]"
      : "border-[#1E1E24] bg-[#111118]";
  return (
    <div className={`rounded-2xl border ${accentClass} p-6 ${className}`}>
      <div className="flex items-center gap-2 text-indigo-300">
        {icon}
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

type UploadRow = {
  _id: string;
  fileName: string;
  uploadedAt: number;
  status: "pending" | "processing" | "complete" | "error";
  analysisId?: string;
  analysisStatus?: string | null;
};

function AnalysesList({
  uploads,
}: {
  uploads: UploadRow[] | undefined;
}) {
  if (uploads === undefined) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-[#1E1E24] bg-[#111118] p-6 text-sm text-zinc-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading your analyses…
      </div>
    );
  }

  if (uploads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#23232A] bg-[#0F0F12] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
          <Upload className="h-5 w-5" />
        </div>
        <p className="mt-4 text-sm font-semibold text-white">
          No analyses yet
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Upload your team reports to get started.
        </p>
        <Link
          href="/app/upload"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
        >
          Upload Reports
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#0F0F12]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1E1E24] bg-[#0A0A0B] text-left text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            <th className="px-5 py-3">File</th>
            <th className="px-5 py-3 hidden sm:table-cell">Uploaded</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {uploads.map((u) => (
            <tr
              key={u._id}
              className="border-b border-[#1E1E24] last:border-b-0 hover:bg-[#13131A]"
            >
              <td className="px-5 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-indigo-300" />
                  <span className="truncate font-medium text-white">
                    {u.fileName}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3 hidden text-xs text-zinc-500 sm:table-cell">
                {formatUploadDate(u.uploadedAt)}
              </td>
              <td className="px-5 py-3">
                <UploadStatusBadge status={u.status} />
              </td>
              <td className="px-5 py-3 text-right">
                {u.status === "complete" && u.analysisId ? (
                  <Link
                    href={`/app/analysis/${u.analysisId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
                  >
                    View Analysis
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : u.status === "processing" || u.status === "pending" ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <span className="text-xs text-zinc-500">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UploadStatusBadge({
  status,
}: {
  status: "pending" | "processing" | "complete" | "error";
}) {
  const map = {
    pending: {
      cls: "border-zinc-700 bg-zinc-800/50 text-zinc-400",
      label: "Pending",
    },
    processing: {
      cls: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
      label: "Processing",
    },
    complete: {
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      label: "Complete",
    },
    error: {
      cls: "border-rose-500/30 bg-rose-500/10 text-rose-300",
      label: "Error",
    },
  } as const;
  const m = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest ${m.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
}

function formatUploadDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusChip({
  tone,
  label,
}: {
  tone: "good" | "warn" | "neutral";
  label: string;
}) {
  const cls =
    tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : tone === "warn"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
        : "border-zinc-700 bg-zinc-800/50 text-zinc-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest ${cls}`}
    >
      {tone === "good" ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {label}
    </span>
  );
}

