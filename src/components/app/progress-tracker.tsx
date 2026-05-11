import { CheckCircle2 } from "lucide-react";

export type ReportStatus =
  | "payment_received"
  | "intake_needed"
  | "intake_submitted"
  | "analysis_in_progress"
  | "report_ready";

export const REPORT_STAGES: { key: ReportStatus; label: string }[] = [
  { key: "payment_received", label: "Payment received" },
  { key: "intake_submitted", label: "Intake submitted" },
  { key: "analysis_in_progress", label: "Analysis in progress" },
  { key: "report_ready", label: "Report ready" },
];

export function statusToStageIndex(s: string | undefined): number {
  switch (s) {
    case "payment_received":
    case "intake_needed":
      return 0;
    case "intake_submitted":
      return 1;
    case "analysis_in_progress":
      return 2;
    case "report_ready":
      return 3;
    default:
      return 0;
  }
}

export function ProgressTracker({ currentStage }: { currentStage: number }) {
  return (
    <ol className="mt-5 grid gap-3 md:grid-cols-4">
      {REPORT_STAGES.map((stage, i) => {
        const isComplete = i < currentStage;
        const isCurrent = i === currentStage;
        return (
          <li
            key={stage.key}
            className={`rounded-xl border px-4 py-3 transition-colors ${
              isCurrent
                ? "border-indigo-500/40 bg-indigo-500/[0.08] shadow-[0_0_30px_-15px_rgba(99,102,241,0.6)]"
                : isComplete
                  ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                  : "border-[#1E1E24] bg-[#0A0A0B]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold ${
                  isCurrent
                    ? "border-indigo-400 bg-indigo-500 text-white"
                    : isComplete
                      ? "border-emerald-400 bg-emerald-500 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-500"
                }`}
              >
                {isComplete ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${
                  isCurrent
                    ? "text-white"
                    : isComplete
                      ? "text-emerald-200"
                      : "text-zinc-500"
                }`}
              >
                {stage.label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
