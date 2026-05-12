"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";

/**
 * /app — entry route for the OrgLens app surface.
 *
 * Behavior:
 *   - Not signed in → redirect to the public demo at /demo
 *   - Signed in → redirect to the workspace at /app/workspace
 *
 * The public demo is accessible without login at /demo.
 */
export default function AppEntryPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/app/workspace");
    } else {
      router.replace("/demo");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
      <span className="text-xs uppercase tracking-widest">Loading…</span>
    </div>
  );
}
