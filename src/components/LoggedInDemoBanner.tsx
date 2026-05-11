"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Non-intrusive info banner shown at the top of the public demo pages
 * (/app, /app/report, /app/org-map, /app/role-fit, /app/risk) when the
 * visitor is signed in. It nudges them toward their own workspace
 * without redirecting them away from the demo.
 *
 * Renders nothing for logged-out visitors.
 */
export function LoggedInDemoBanner() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="sticky top-0 z-40 w-full border-b border-indigo-500/20 bg-indigo-500/[0.07] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-xs md:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2 py-0.5 font-medium uppercase tracking-widest text-indigo-200">
          <Sparkles className="h-3 w-3" />
          Demo
        </span>
        <span className="text-zinc-300">
          You&rsquo;re viewing the public demo.
        </span>
        <Link
          href="/app/workspace"
          className="ml-auto inline-flex items-center gap-1 font-medium text-indigo-200 transition-colors hover:text-white"
        >
          Go to My Workspace
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default LoggedInDemoBanner;
