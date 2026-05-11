"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
  Upload as UploadIcon,
  X,
} from "lucide-react";

type UiPhase = "idle" | "uploading" | "processing" | "complete" | "error";

export default function UploadPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();

  // Guard: send unauth users to sign-in.
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/sign-in?redirect=/app/upload");
    }
  }, [authLoading, isAuthenticated, router]);

  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const saveUpload = useMutation(api.uploads.saveUpload);
  const triggerAnalysis = useMutation(api.uploads.triggerAnalysis);

  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<UiPhase>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeUploadId, setActiveUploadId] = useState<
    Id<"analysisUploads"> | null
  >(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeUpload = useQuery(
    api.uploads.getUpload,
    activeUploadId ? { uploadId: activeUploadId } : "skip"
  );

  // When the upload's status flips to "complete", route to the analysis page.
  useEffect(() => {
    if (
      activeUpload?.status === "complete" &&
      activeUpload.analysisId
    ) {
      setPhase("complete");
      router.replace(`/app/analysis/${activeUpload.analysisId}`);
    } else if (activeUpload?.status === "error") {
      setPhase("error");
      setErrorMsg(
        "Something went wrong analyzing your file. Please try uploading again."
      );
    }
  }, [activeUpload, router]);

  const handlePickFile = useCallback((f: File | null) => {
    setErrorMsg(null);
    if (!f) {
      setFile(null);
      return;
    }
    const isPdf =
      f.type === "application/pdf" ||
      f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setErrorMsg("Only PDF files are supported.");
      setFile(null);
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setErrorMsg("File is larger than 25MB. Please upload a smaller PDF.");
      setFile(null);
      return;
    }
    setFile(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0] ?? null;
      handlePickFile(f);
    },
    [handlePickFile]
  );

  async function handleUpload() {
    if (!file) return;
    setErrorMsg(null);
    setPhase("uploading");
    try {
      const url = await generateUploadUrl();
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type || "application/pdf" },
        body: file,
      });
      if (!res.ok) {
        throw new Error("Upload failed.");
      }
      const { storageId } = (await res.json()) as {
        storageId: Id<"_storage">;
      };

      const { uploadId } = await saveUpload({
        storageId,
        fileName: file.name,
      });

      await triggerAnalysis({ uploadId });
      setActiveUploadId(uploadId);
      setPhase("processing");
    } catch (e) {
      setPhase("error");
      setErrorMsg(
        e instanceof Error ? e.message : "Upload failed. Please try again."
      );
    }
  }

  function resetForm() {
    setFile(null);
    setPhase("idle");
    setErrorMsg(null);
    setActiveUploadId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/app/workspace"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to workspace
      </Link>

      <header className="mt-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          OrgLens AI · Upload
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Upload Your Team Reports
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Upload your team&rsquo;s HUCAMA psychometric reports. OrgLens will
          analyze role fit, competency patterns, and organizational risks.
        </p>
        <p className="mt-3 text-xs text-zinc-500">
          Supported: PDF files (HUCAMA CF48-360, PF48 Personality, PF48
          Leadership reports)
        </p>
      </header>

      {/* Main card */}
      <section className="mt-8 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
        {phase === "processing" ? (
          <ProcessingState fileName={file?.name ?? "your report"} />
        ) : (
          <>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all ${
                dragOver
                  ? "border-indigo-400 bg-indigo-500/[0.08]"
                  : "border-[#23232A] bg-[#0A0A0B] hover:border-indigo-500/40 hover:bg-indigo-500/[0.04]"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 transition-colors group-hover:bg-indigo-500/15">
                <UploadIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Drop your PDF here, or{" "}
                  <span className="text-indigo-300">click to browse</span>
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  PDF up to 25MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => handlePickFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {file && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-[#1E1E24] bg-[#0A0A0B] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-[#16161A] hover:text-white"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] px-4 py-3 text-sm text-rose-200">
                {errorMsg}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!file || phase === "uploading"}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
              >
                {phase === "uploading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    Analyze Team
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </section>

      {/* What you'll get */}
      <section className="mt-8 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          What you&rsquo;ll get
        </p>
        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          {[
            "An org map highlighting role fit, ownership, and risk areas",
            "Role-fit scoring for every team member on the Great 8 model",
            "A risk summary covering founder dependency, key-person risk, and coverage gaps",
            "Three prioritized recommendations for your next 30 days",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProcessingState({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
        <Sparkles className="h-6 w-6 animate-pulse" />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Analyzing your team reports…
        </h2>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          OrgLens is parsing <span className="font-medium text-zinc-200">{fileName}</span>{" "}
          and building your org analysis. This usually takes a few seconds.
        </p>
      </div>
      <div className="w-full max-w-md">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/3 animate-[progress_1.6s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500/40 via-indigo-400 to-indigo-500/40" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
            width: 33%;
          }
          50% {
            width: 60%;
          }
          100% {
            transform: translateX(220%);
            width: 33%;
          }
        }
      `}</style>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
