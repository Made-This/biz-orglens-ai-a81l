"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdvisoryIntakeForm from "./AdvisoryIntakeForm";
import WorkspaceIntakeForm from "./WorkspaceIntakeForm";

function IntakeInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  // If a session_id is present, this is a post-purchase Advisory Review intake
  // (no auth required — accessible directly from the checkout success link).
  if (sessionId) {
    return <AdvisoryIntakeForm sessionId={sessionId} />;
  }

  // Otherwise fall through to the existing auth-gated workspace intake form.
  return <WorkspaceIntakeForm />;
}

export default function AppIntakePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
          <span className="text-xs uppercase tracking-widest">Loading…</span>
        </div>
      }
    >
      <IntakeInner />
    </Suspense>
  );
}
