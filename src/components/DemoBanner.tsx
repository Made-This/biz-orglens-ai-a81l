"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, X, ArrowRight } from "lucide-react";

/**
 * Sticky top banner shown on every (app)/* page when the user is browsing
 * in demo mode (localStorage flag `orglens_demo_mode === "true"`).
 *
 * Renders nothing if demo mode is not active, so it's safe to drop
 * unconditionally into the app layout.
 */
export function DemoBanner() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      setActive(window.localStorage.getItem("orglens_demo_mode") === "true");
    } catch {
      setActive(false);
    }
  }, []);

  if (!active) return null;

  function handleExit() {
    try {
      window.localStorage.removeItem("orglens_demo_mode");
    } catch {
      // ignore
    }
    setActive(false);
    router.push("/sign-in");
  }

  function handleUnlock(e: React.MouseEvent) {
    e.preventDefault();
    try {
      window.localStorage.setItem("orglens_report_unlocked", "true");
    } catch {
      // ignore
    }
    router.push("/app/report");
  }

  return (
    <div
      data-demo-banner
      className="sticky top-0 z-50 w-full border-b border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-indigo-900 to-amber-950/70 text-white"
    >
      <div className="flex items-center gap-3 px-4 py-2 md:px-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-200">
          <Sparkles className="h-3 w-3" />
          Demo Mode
        </span>
        <span className="hidden text-xs text-zinc-200 sm:inline">
          Sample Company Data — Meridian SaaS Co.
        </span>
        <span className="text-xs text-zinc-200 sm:hidden">Sample Data</span>

        <span className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleUnlock}
            className="group inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-indigo-700 shadow-sm transition-colors hover:bg-amber-200 hover:text-indigo-900"
          >
            Unlock Full Analysis — $49
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={handleExit}
            aria-label="Exit demo mode"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
    </div>
  );
}

export default DemoBanner;
