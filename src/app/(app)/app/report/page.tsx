"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Crown,
  Download,
  FileText,
  Lock,
  Quote,
  Share2,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PRODUCT_ID = "md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

function getCheckoutUrl() {
  // Prefer the platform proxy (cleaner & survives Convex deployment renames).
  return `https://madethis.com/checkout/orglens-ai/${PRODUCT_ID}`;
}

// ---------- ANIMATED BAR ----------
function AnimatedBar({
  value,
  tone,
  delay = 0,
  active,
}: {
  value: number;
  tone: "green" | "amber" | "red" | "indigo" | "gray";
  delay?: number;
  active: boolean;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!active) {
      setWidth(0);
      return;
    }
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [active, value, delay]);

  const colors: Record<typeof tone, string> = {
    green: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    amber: "bg-gradient-to-r from-amber-500 to-amber-400",
    red: "bg-gradient-to-r from-rose-500 to-rose-400",
    indigo: "bg-gradient-to-r from-indigo-500 to-indigo-400",
    gray: "bg-gradient-to-r from-zinc-500 to-zinc-400",
  };

  return (
    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
      <div
        className={`h-full ${colors[tone]} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// ---------- PAYWALL / UNLOCK STATE HOOK ----------
function useReportState() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(
        window.localStorage.getItem("orglens_report_unlocked") === "true"
      );
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  return { ready, unlocked };
}

// ---------- IN-VIEW HOOK ----------
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.25, ...opts }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, opts]);

  return { ref, inView };
}

// ---------- PAGE ----------
export default function ReportPage() {
  const { ready, unlocked } = useReportState();
  const [isDemoMode, setIsDemoMode] = useState(false);

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  const showFull = unlocked || isDemoMode;

  return (
    <>
      <ReportPrintStyles />
      {isDemoMode && (
        <DemoBanner onClose={() => setIsDemoMode(false)} />
      )}
      <div className="report-root mx-auto max-w-6xl pb-24">
        <ReportHeader />
        <ExecutiveSummary />
        {showFull ? (
          <FullReport />
        ) : (
          <LockedTeaser onDemo={() => setIsDemoMode(true)} />
        )}
      </div>
    </>
  );
}

// ---------- DEMO BANNER ----------
function DemoBanner({ onClose }: { onClose: () => void }) {
  const checkoutUrl = getCheckoutUrl();
  return (
    <div
      data-demo-banner
      className="w-full bg-indigo-900 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3.5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg">
            📊
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">
              Demo Mode — Sample Organizational Analysis
            </p>
            <p className="mt-0.5 text-xs leading-snug opacity-80">
              This is a fully unlocked preview. Real analysis costs $49.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={checkoutUrl}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Unlock Real Analysis — $49
          </a>
          <button
            onClick={onClose}
            aria-label="Close demo mode"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- HEADER ----------
function ReportHeader() {
  const router = useRouter();
  const { toast } = useToast();

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  function handleDownload() {
    if (typeof window !== "undefined") window.print();
  }

  function handleShare() {
    try {
      if (typeof window !== "undefined") {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: "Link copied", description: "Report URL copied to clipboard." });
      }
    } catch {
      toast({ title: "Could not copy", description: "Copy the URL manually from your address bar." });
    }
  }

  return (
    <header className="report-header mb-12 flex flex-col gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
          OrgLens<span className="text-indigo-300">.</span>AI
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Organizational Analysis Report
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Alpha Investment Group
          <span className="mx-2 text-zinc-700">·</span>
          Confidential
          <span className="mx-2 text-zinc-700">·</span>
          Generated {today}
        </p>
      </div>
      <div className="report-actions flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#111116] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-white"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#111116] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/[0.08] hover:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share Report
        </button>
        <button
          onClick={() => router.push("/app")}
          className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Run Another Scenario
        </button>
      </div>
    </header>
  );
}

// ---------- SECTION SHELL ----------
function SectionTitle({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
        Section {num}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
}

// ---------- SECTION 1: EXECUTIVE SUMMARY ----------
function ExecutiveSummary() {
  const findings = [
    {
      icon: ShieldAlert,
      tone: "rose" as const,
      label: "Leadership Gap",
      text: "Leadership coverage gap in Operations (58% → target 76%).",
    },
    {
      icon: AlertTriangle,
      tone: "amber" as const,
      label: "Execution Risk",
      text: "Execution stability: Medium risk under current structure.",
    },
    {
      icon: Users,
      tone: "rose" as const,
      label: "Role Misalignment",
      text: "Yuzhe Zhao: role misalignment flagged — below threshold on 6/8 competencies.",
    },
    {
      icon: Crown,
      tone: "indigo" as const,
      label: "Talent Concentration",
      text: "Top 3 performers (Chifong Dong, Eric Li, Lili Mao) covering 40% of critical delivery.",
    },
  ];

  const toneStyles: Record<
    "indigo" | "rose" | "amber" | "cyan",
    { ring: string; bg: string; iconBg: string; iconText: string }
  > = {
    indigo: {
      ring: "ring-indigo-500/20",
      bg: "bg-indigo-500/[0.05]",
      iconBg: "bg-indigo-500/15",
      iconText: "text-indigo-300",
    },
    rose: {
      ring: "ring-rose-500/20",
      bg: "bg-rose-500/[0.05]",
      iconBg: "bg-rose-500/15",
      iconText: "text-rose-300",
    },
    amber: {
      ring: "ring-amber-500/20",
      bg: "bg-amber-500/[0.05]",
      iconBg: "bg-amber-500/15",
      iconText: "text-amber-300",
    },
    cyan: {
      ring: "ring-cyan-500/20",
      bg: "bg-cyan-500/[0.05]",
      iconBg: "bg-cyan-500/15",
      iconText: "text-cyan-300",
    },
  };

  return (
    <section className="report-section mb-16">
      <SectionTitle num="01" title="Executive Summary" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Company card */}
        <div className="report-card lg:col-span-4 rounded-xl border border-white/[0.08] bg-[#111116] p-6">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            <Building2 className="h-3.5 w-3.5" />
            Company Profile
          </div>
          <h3 className="mt-3 text-xl font-bold text-white">
            Alpha Investment Group
          </h3>
          <dl className="mt-6 space-y-4">
            <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
              <dt className="text-xs uppercase tracking-widest text-zinc-500">Headcount</dt>
              <dd className="font-mono text-sm font-semibold text-white">30</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/[0.06] pb-3">
              <dt className="text-xs uppercase tracking-widest text-zinc-500">Sector</dt>
              <dd className="text-sm font-medium text-zinc-200">Investment / Finance</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-xs uppercase tracking-widest text-zinc-500">Objective</dt>
              <dd className="text-sm leading-relaxed text-zinc-200">
                Reduce burn without destroying execution capability
              </dd>
            </div>
          </dl>
        </div>

        {/* Findings */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {findings.map((f, i) => {
            const Icon = f.icon;
            const s = toneStyles[f.tone];
            return (
              <div
                key={i}
                className={`report-card rounded-xl border border-white/[0.08] ${s.bg} p-5 ring-1 ring-inset ${s.ring}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${s.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${s.iconText}`} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                      Finding {i + 1} · {f.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-200">
                      {f.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation banner */}
      <div className="report-card relative mt-8 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-600/[0.18] via-indigo-700/[0.10] to-[#0f0f14] p-7 shadow-[0_0_60px_-20px_rgba(16,185,129,0.6)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-[80px]" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Recommended Scenario
            </p>
            <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
              Scenario B — Balanced Redesign
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-200">
              Balances cost reduction with organizational resilience. Maintains
              leadership continuity while removing structural redundancy.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-100 ring-1 ring-inset ring-emerald-400/40">
            <CheckCircle2 className="h-3 w-3" />
            High Confidence
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------- LOCKED TEASER (sections 2–8 placeholder) ----------
function LockedTeaser({ onDemo }: { onDemo: () => void }) {
  const checkoutUrl = getCheckoutUrl();
  return (
    <section className="report-section relative mt-12">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0f14]">
        {/* Blurred placeholder content */}
        <div className="select-none p-10 blur-[6px]" aria-hidden>
          <div className="space-y-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-32 rounded-full bg-white/10" />
                <div className="mt-3 h-6 w-2/3 rounded-md bg-white/10" />
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="h-32 rounded-xl bg-white/5" />
                  <div className="h-32 rounded-xl bg-white/5" />
                  <div className="h-32 rounded-xl bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/85 to-[#0a0a0f]/95">
          <div className="mx-auto max-w-xl px-6 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/15 ring-1 ring-inset ring-indigo-500/40">
              <Lock className="h-5 w-5 text-indigo-300" />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl">
              7 more sections ready to unlock
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-300">
              Unlock the complete 8-section organizational analysis —
              competency impact, role-fit rankings, risk intelligence, and your
              restructuring roadmap.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={checkoutUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.9)]"
              >
                <Sparkles className="h-4 w-4" />
                Unlock Full Report — $49
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-indigo-600 bg-transparent px-5 py-3 font-medium text-indigo-300 transition-all hover:bg-indigo-600/10 hover:text-indigo-200"
              >
                <FileText className="h-4 w-4" />
                View Full Demo Report
              </button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Instant access. One-time payment. Or preview with the demo report.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-left text-xs text-zinc-400 sm:grid-cols-4">
              {[
                "Metrics",
                "Org Map",
                "Role Fit",
                "Scenarios",
                "Competency Impact",
                "Risk Intel",
                "Founder Memo",
              ].map((t, i) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1"
                >
                  <span className="text-zinc-600">0{i + 2}</span>
                  <span className="truncate">{t}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FULL REPORT (sections 2–8) ----------
function FullReport() {
  return (
    <>
      <Section2Metrics />
      <Section3OrgMap />
      <Section4RoleFit />
      <Section5Scenarios />
      <Section6CompetencyImpact />
      <Section7RiskIntel />
      <Section8FounderMemo />
    </>
  );
}

// ---------- SECTION 2: ORGANIZATIONAL METRICS ----------
function Section2Metrics() {
  const rows = [
    {
      metric: "Leadership Coverage",
      before: "58%",
      after: "76%",
      change: "+18%",
      direction: "up" as const,
    },
    {
      metric: "Execution Stability",
      before: "Medium",
      after: "Strong",
      change: "Improved",
      direction: "up" as const,
    },
    {
      metric: "Adaptability Score",
      before: "6.2 / 10",
      after: "7.8 / 10",
      change: "+1.6",
      direction: "up" as const,
    },
    {
      metric: "Organizational Risk",
      before: "High",
      after: "Moderate",
      change: "Reduced",
      direction: "down-good" as const,
    },
    {
      metric: "Team Balance Score",
      before: "54%",
      after: "71%",
      change: "+17%",
      direction: "up" as const,
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="02"
        title="Organizational Metrics"
        subtitle="Before vs After — net deltas under Scenario B (Balanced Redesign)"
      />

      <div className="report-card overflow-hidden rounded-xl border border-white/[0.08] bg-[#111116]">
        {/* Scenario badge */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-emerald-500/[0.06] px-6 py-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" />
            Scenario B Applied
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            5 metrics tracked
          </span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02] text-left text-[10px] uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-4 font-semibold">Metric</th>
              <th className="px-6 py-4 font-semibold">Before</th>
              <th className="px-6 py-4 font-semibold">After Scenario B</th>
              <th className="px-6 py-4 text-right font-semibold">Change</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.metric}
                className={`${
                  i !== rows.length - 1 ? "border-b border-white/[0.05]" : ""
                } transition-colors hover:bg-white/[0.02]`}
              >
                <td className="px-6 py-4 font-medium text-white">{r.metric}</td>
                <td className="px-6 py-4 font-mono text-zinc-400">{r.before}</td>
                <td className="px-6 py-4 font-mono font-semibold text-indigo-300">
                  {r.after}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                    {r.direction === "up" ? "↑" : "↓"} {r.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ---------- SECTION 3: COMPETENCY ORG MAP ----------
type DotTone = "green" | "amber" | "red";

function CompetencyDots({ dots }: { dots: { label: string; tone: DotTone }[] }) {
  const toneClass: Record<DotTone, string> = {
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-rose-500",
  };
  return (
    <div className="flex items-center gap-1.5">
      {dots.map((d) => (
        <span
          key={d.label}
          className="flex items-center gap-0.5 text-[10px] font-mono font-semibold text-zinc-400"
          title={`${d.label}: ${d.tone}`}
        >
          <span className={`h-2 w-2 rounded-full ${toneClass[d.tone]}`} />
          {d.label}
        </span>
      ))}
    </div>
  );
}

function OrgNode({
  name,
  role,
  dots,
  score,
  atRisk,
  isCEO,
}: {
  name: string;
  role: string;
  dots: { label: string; tone: DotTone }[];
  score?: string;
  atRisk?: boolean;
  isCEO?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border bg-[#111116] p-3.5 transition-colors hover:border-indigo-500/30 sm:flex-row sm:items-center sm:justify-between ${
        atRisk
          ? "border-rose-500/40 bg-rose-500/[0.05]"
          : isCEO
          ? "border-indigo-500/40 bg-indigo-500/[0.06]"
          : "border-white/[0.08]"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-bold text-white">{name}</p>
          {isCEO && (
            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-indigo-200 ring-1 ring-inset ring-indigo-500/40">
              CEO
            </span>
          )}
          {atRisk && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-rose-200 ring-1 ring-inset ring-rose-500/40">
              <AlertTriangle className="h-2.5 w-2.5" />
              At Risk
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[11px] text-zinc-500">{role}</p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        <CompetencyDots dots={dots} />
        {score && (
          <span
            className={`shrink-0 rounded-md px-2 py-1 font-mono text-[11px] font-bold ${
              atRisk
                ? "bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-500/30"
                : "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
            }`}
          >
            {score}
          </span>
        )}
      </div>
    </div>
  );
}

function HeatBar({ value, label }: { value: number; label: string }) {
  const tone = value >= 75 ? "emerald" : value >= 65 ? "amber" : "rose";
  const toneClasses: Record<string, { bar: string; text: string }> = {
    emerald: {
      bar: "bg-gradient-to-r from-emerald-500 to-emerald-400",
      text: "text-emerald-300",
    },
    amber: {
      bar: "bg-gradient-to-r from-amber-500 to-amber-400",
      text: "text-amber-300",
    },
    rose: {
      bar: "bg-gradient-to-r from-rose-500 to-rose-400",
      text: "text-rose-300",
    },
  };
  const t = toneClasses[tone];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          {label}
        </span>
        <span className={`font-mono text-[11px] font-bold ${t.text}`}>
          {value}%
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
        <div className={`h-full ${t.bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Section3OrgMap() {
  const baseDots = (l: DotTone, e: DotTone, a: DotTone, s: DotTone) => [
    { label: "L", tone: l },
    { label: "E", tone: e },
    { label: "A", tone: a },
    { label: "S", tone: s },
  ];

  const teams = [
    {
      name: "Investment Team",
      stats: [
        { label: "Leadership", value: 89 },
        { label: "Execution", value: 91 },
        { label: "Adaptability", value: 87 },
        { label: "Stability", value: 83 },
      ],
      summary: "Strong across all dimensions",
      tone: "emerald" as const,
    },
    {
      name: "Operations Team",
      stats: [
        { label: "Leadership", value: 58 },
        { label: "Execution", value: 76 },
        { label: "Adaptability", value: 72 },
        { label: "Stability", value: 69 },
      ],
      summary: "Leadership gap; risk concentration",
      tone: "rose" as const,
    },
    {
      name: "Research Team",
      stats: [
        { label: "Leadership", value: 78 },
        { label: "Execution", value: 82 },
        { label: "Adaptability", value: 85 },
        { label: "Stability", value: 71 },
      ],
      summary: "Balanced; mild stability gap",
      tone: "amber" as const,
    },
  ];

  const teamToneClass: Record<"emerald" | "amber" | "rose", string> = {
    emerald: "border-emerald-500/30 bg-emerald-500/[0.05]",
    amber: "border-amber-500/30 bg-amber-500/[0.05]",
    rose: "border-rose-500/30 bg-rose-500/[0.05]",
  };

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="03"
        title="Competency Org Map"
        subtitle="Leadership · Execution · Adaptability · Stability — visualized across the org"
      />

      {/* Legend */}
      <div className="report-card mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-white/[0.08] bg-[#111116] px-5 py-3 text-xs text-zinc-400">
        <span className="font-semibold uppercase tracking-widest text-zinc-500">
          Legend
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Strong
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Watch
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          At Risk
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-wider text-zinc-500">
          L = Leadership · E = Execution · A = Adaptability · S = Stability
        </span>
      </div>

      {/* Org tree */}
      <div className="report-card rounded-xl border border-white/[0.08] bg-[#111116] p-5 md:p-7">
        <div className="space-y-3">
          {/* CEO */}
          <OrgNode
            isCEO
            name="Wenjing Li"
            role="Chief Executive Officer"
            dots={baseDots("green", "green", "green", "green")}
          />

          {/* Direct reports */}
          <div className="ml-4 space-y-3 border-l border-white/[0.08] pl-5 md:ml-6 md:pl-7">
            <OrgNode
              name="Chifong Dong"
              role="Investment Director"
              dots={baseDots("green", "green", "green", "green")}
              score="9.5/10"
            />

            <div>
              <OrgNode
                name="Lili Mao"
                role="Operations Lead"
                dots={baseDots("green", "green", "amber", "green")}
                score="8.4/10"
              />
              <div className="ml-4 mt-3 space-y-3 border-l border-white/[0.08] pl-5 md:ml-6 md:pl-7">
                <OrgNode
                  name="Eric Li"
                  role="Senior Analyst"
                  dots={baseDots("green", "green", "green", "amber")}
                  score="9.2/10"
                />
                <OrgNode
                  name="Yijun Sim"
                  role="Senior Analyst"
                  dots={baseDots("amber", "green", "green", "green")}
                  score="9.2/10"
                />
                <OrgNode
                  atRisk
                  name="Yuzhe Zhao"
                  role="Analyst"
                  dots={baseDots("red", "red", "amber", "amber")}
                  score="4.1/10"
                />
              </div>
            </div>

            <div>
              <OrgNode
                name="Supriya Kumar"
                role="Research Director"
                dots={baseDots("green", "green", "green", "amber")}
                score="9.4/10"
              />
              <div className="ml-4 mt-3 space-y-3 border-l border-white/[0.08] pl-5 md:ml-6 md:pl-7">
                <OrgNode
                  name="Joyce Zhang"
                  role="Business Development"
                  dots={baseDots("amber", "amber", "green", "red")}
                  score="7.2/10"
                />
              </div>
            </div>

            <OrgNode
              name="Luke Cai"
              role="Strategy Lead"
              dots={baseDots("green", "green", "amber", "green")}
              score="9.0/10"
            />
          </div>
        </div>
      </div>

      {/* Team heatmap summary */}
      <div className="mt-6">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Team Heatmap Summary
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {teams.map((t) => (
            <div
              key={t.name}
              className={`report-card rounded-xl border p-5 ${teamToneClass[t.tone]}`}
            >
              <h4 className="text-sm font-bold text-white">{t.name}</h4>
              <p className="mt-1 text-[11px] text-zinc-400">{t.summary}</p>
              <div className="mt-4 space-y-3">
                {t.stats.map((s) => (
                  <HeatBar key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION 4: ROLE-COMPETENCY FIT RANKING ----------
type RoleKey = "investment" | "operations" | "research";

interface DemoCandidate {
  name: string;
  fit: number;
  strengths: string[];
  gaps: string[];
  insight: string;
}

const DEMO_ROLES: Record<RoleKey, { label: string; candidates: DemoCandidate[] }> = {
  investment: {
    label: "Investment Lead",
    candidates: [
      {
        name: "Chifong Dong",
        fit: 95,
        strengths: ["Strategic Thinking", "Stakeholder Influence"],
        gaps: ["Acting with Consideration"],
        insight: "Top investment leadership profile. Dominant analytical and stakeholder posture.",
      },
      {
        name: "Eric Li",
        fit: 91,
        strengths: ["Analytical Rigor", "Drive"],
        gaps: ["Team Leadership"],
        insight: "Execution-strong deputy candidate. Develop people-leadership for next step.",
      },
      {
        name: "Yijun Sim",
        fit: 90,
        strengths: ["Execution Focus", "Structure"],
        gaps: ["Innovation"],
        insight: "Highly structured; pair with creative profiles for portfolio breadth.",
      },
      {
        name: "Luke Cai",
        fit: 84,
        strengths: ["Strategy", "Communication"],
        gaps: ["Detail Orientation"],
        insight: "Strong strategic communicator; better suited to thematic investment lead.",
      },
      {
        name: "Supriya Kumar",
        fit: 81,
        strengths: ["Research Depth", "Delivery"],
        gaps: ["Influence"],
        insight: "Strong analytical anchor; better aligned to research direction.",
      },
    ],
  },
  operations: {
    label: "Operations Lead",
    candidates: [
      {
        name: "Lili Mao",
        fit: 94,
        strengths: ["People Leadership", "Delivery", "Standards"],
        gaps: ["Analytical Depth"],
        insight: "Highest operational fit. Add analytical support to relieve cognitive load.",
      },
      {
        name: "Supriya Kumar",
        fit: 88,
        strengths: ["Planning", "Research"],
        gaps: ["Team Motivation"],
        insight: "Strong process leader; pair with energetic culture-builder.",
      },
      {
        name: "Eric Li",
        fit: 79,
        strengths: ["Execution", "Drive"],
        gaps: ["People Development"],
        insight: "Execution-anchored fallback; better as ops contingency than primary lead.",
      },
    ],
  },
  research: {
    label: "Research Director",
    candidates: [
      {
        name: "Supriya Kumar",
        fit: 96,
        strengths: ["Depth", "Precision", "Innovation"],
        gaps: ["Speed"],
        insight: "Ideal research director. Manage scope to mitigate speed risk.",
      },
      {
        name: "Yijun Sim",
        fit: 85,
        strengths: ["Analysis", "Structure"],
        gaps: ["Research Breadth"],
        insight: "Strong methodological fit; broaden research scope progressively.",
      },
      {
        name: "Luke Cai",
        fit: 77,
        strengths: ["Strategy"],
        gaps: ["Research Methodology"],
        insight: "Better suited to thematic research strategy than research operations.",
      },
    ],
  },
};

function Section4RoleFit() {
  const [role, setRole] = useState<RoleKey>("investment");
  const [expanded, setExpanded] = useState<number | null>(0);
  const data = DEMO_ROLES[role];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="04"
        title="Role–Competency Fit Ranking"
        subtitle="Top candidates ranked against role-specific competency requirements"
      />

      {/* Tabs */}
      <div className="mb-6 inline-flex flex-wrap gap-1 rounded-lg border border-white/[0.08] bg-[#111116] p-1">
        {(Object.keys(DEMO_ROLES) as RoleKey[]).map((k) => (
          <button
            key={k}
            onClick={() => {
              setRole(k);
              setExpanded(0);
            }}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
              role === k
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {DEMO_ROLES[k].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {data.candidates.map((c, i) => {
          const open = expanded === i;
          return (
            <div
              key={c.name}
              className="report-card overflow-hidden rounded-xl border border-white/[0.08] bg-[#111116] transition-colors hover:border-indigo-500/30"
            >
              <button
                onClick={() => setExpanded(open ? null : i)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] font-mono text-sm font-bold text-zinc-300 ring-1 ring-inset ring-white/[0.06]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold text-white">{c.name}</p>
                  <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                      style={{ width: `${c.fit}%` }}
                    />
                  </div>
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.strengths.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        {s}
                      </span>
                    ))}
                    {c.gaps.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-inset ring-amber-500/30"
                      >
                        <ShieldAlert className="h-2.5 w-2.5" />
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    c.fit >= 90
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                      : "bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                  }`}
                >
                  {c.fit}% Fit
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="grid grid-cols-1 gap-5 border-t border-white/[0.06] bg-white/[0.02] p-5 md:grid-cols-3">
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Strengths
                    </p>
                    <ul className="mt-3 space-y-2">
                      {c.strengths.map((s) => (
                        <li
                          key={s}
                          className="rounded-md bg-emerald-500/[0.06] px-2.5 py-1.5 text-xs text-zinc-200 ring-1 ring-inset ring-emerald-500/20"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Gaps
                    </p>
                    <ul className="mt-3 space-y-2">
                      {c.gaps.map((g) => (
                        <li
                          key={g}
                          className="rounded-md bg-amber-500/[0.06] px-2.5 py-1.5 text-xs text-zinc-200 ring-1 ring-inset ring-amber-500/20"
                        >
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Insight
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-200">
                      {c.insight}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------- SECTION 5: SCENARIO COMPARISON ----------
function Section5Scenarios() {
  const cards = [
    {
      key: "A",
      name: "Lean Efficiency",
      borderClass: "border-amber-500/40",
      ringClass: "ring-amber-500/20",
      pillClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      pillLabel: "High Risk ⚠",
      stats: [
        { label: "Headcount Impact", value: "−4 roles (13% reduction)" },
        { label: "Cost Reduction", value: "$320K / year" },
        { label: "Execution Effect", value: "Moderate decline (−15%)" },
      ],
      tradeoff:
        "Removes buffer capacity; increases dependency on top performers.",
      recommended: false,
    },
    {
      key: "B",
      name: "Balanced Redesign",
      borderClass: "border-indigo-500/50",
      ringClass: "ring-indigo-500/30",
      pillClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      pillLabel: "Moderate Risk ✓",
      stats: [
        { label: "Headcount Impact", value: "−2 roles + 1 redesign" },
        { label: "Cost Reduction", value: "$180K / year" },
        { label: "Execution Effect", value: "Stable → Strong (+18%)" },
      ],
      tradeoff:
        "Minor short-term adjustment cost; sustainable long-term capability.",
      recommended: true,
    },
    {
      key: "C",
      name: "AI-Augmented Organization",
      borderClass: "border-cyan-500/40",
      ringClass: "ring-cyan-500/20",
      pillClass: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
      pillLabel: "Low Risk ✓",
      stats: [
        { label: "Headcount Impact", value: "−1 role + 2 AI-enhanced roles" },
        { label: "Cost Reduction", value: "$90K / year" },
        { label: "Execution Effect", value: "Strong improvement (+32%)" },
      ],
      tradeoff:
        "Requires 60-day tooling transition; high upside if executed.",
      recommended: false,
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="05"
        title="Scenario Comparison"
        subtitle="Three restructuring paths evaluated for cost, risk, and execution impact"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.key}
            className={`report-card relative rounded-xl border ${c.borderClass} bg-[#111116] p-6 ring-1 ring-inset ${c.ringClass} ${
              c.recommended
                ? "shadow-[0_0_40px_-15px_rgba(99,102,241,0.6)]"
                : ""
            }`}
          >
            {c.recommended && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                <Sparkles className="h-3 w-3" />
                Recommended
              </span>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Scenario {c.key}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset ${c.pillClass}`}
              >
                {c.pillLabel}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">{c.name}</h3>

            <div className="mt-5 space-y-3">
              {c.stats.map((s) => (
                <div
                  key={s.label}
                  className="border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.05]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Trade-off
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                {c.tradeoff}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- SECTION 6: COMPETENCY IMPACT ----------
function Section6CompetencyImpact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const rows = [
    {
      label: "Leadership Coverage",
      before: 58,
      after: 76,
      insight: "Eric Li promoted to Operations deputy closes the leadership gap.",
    },
    {
      label: "Execution Strength",
      before: 71,
      after: 84,
      insight: "Role redesign frees top performers from low-fit allocation.",
    },
    {
      label: "Stability Index",
      before: 65,
      after: 72,
      insight: "Workload redistribution reduces burnout risk in Operations.",
    },
    {
      label: "Adaptability Score",
      before: 62,
      after: 78,
      insight: "BD repositioning unlocks Joyce Zhang's flexible profile.",
    },
  ];

  return (
    <section className="report-section mt-16" ref={ref}>
      <SectionTitle
        num="06"
        title="Competency Impact"
        subtitle="Animated competency deltas under Scenario B (Balanced Redesign)"
      />

      <div className="report-card rounded-xl border border-white/[0.08] bg-[#111116] p-6 md:p-8">
        <div className="space-y-7">
          {rows.map((r, i) => (
            <div key={r.label} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <p className="text-sm font-semibold text-white">{r.label}</p>
                <p className="mt-1 hidden text-[11px] leading-relaxed text-zinc-500 lg:block">
                  {r.insight}
                </p>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-14 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    Before
                  </span>
                  <div className="flex-1">
                    <AnimatedBar
                      value={r.before}
                      tone="gray"
                      delay={i * 80}
                      active={inView}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-xs font-semibold text-zinc-400">
                    {r.before}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                    After
                  </span>
                  <div className="flex-1">
                    <AnimatedBar
                      value={r.after}
                      tone="indigo"
                      delay={i * 80 + 200}
                      active={inView}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-xs font-semibold text-white">
                    {r.after}%
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 lg:text-right">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                  ↑ +{r.after - r.before}pp
                </span>
              </div>

              <p className="text-[11px] leading-relaxed text-zinc-500 lg:hidden">
                {r.insight}
              </p>
            </div>
          ))}

          {/* Organizational Fragility — categorical row */}
          <div className="grid grid-cols-1 gap-4 border-t border-white/[0.05] pt-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <p className="text-sm font-semibold text-white">
                Organizational Fragility
              </p>
              <p className="mt-1 hidden text-[11px] leading-relaxed text-zinc-500 lg:block">
                Risk concentration drops as leadership distributes.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/[0.06] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Before
                </p>
                <p className="mt-1 font-mono text-base font-bold text-rose-300">
                  HIGH
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.06] p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  After
                </p>
                <p className="mt-1 font-mono text-base font-bold text-amber-300">
                  MODERATE
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                ↓ Reduced
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION 7: ORGANIZATIONAL RISK INTELLIGENCE ----------
function Section7RiskIntel() {
  const risks = [
    {
      title: "Leadership Dependency",
      severity: "HIGH",
      severityClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      borderClass: "border-l-rose-500",
      team: "Operations",
      detail:
        "40% of delivery capability concentrated in 2 people (Chifong Dong, Lili Mao). No succession depth.",
      action:
        "Develop Eric Li as Operations deputy. Cross-train Yijun Sim on stakeholder management.",
    },
    {
      title: "Burnout Risk",
      severity: "MEDIUM",
      severityClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      borderClass: "border-l-amber-500",
      team: "Operations, Research",
      detail:
        "Lili Mao's 360 feedback shows impatience signals and urgency pressure passed to team. Sustained high load for 12+ months.",
      action:
        "Redistribute 2 direct reports. Add structured recovery protocols.",
    },
    {
      title: "Execution Imbalance",
      severity: "MEDIUM",
      severityClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      borderClass: "border-l-amber-500",
      team: "Business Development",
      detail:
        "Joyce Zhang (Influencer/Networker type) in delivery-heavy role. Low Implementer score creates execution gaps.",
      action:
        "Redesign role toward BD/partnerships. Pair with execution-strong Analyst.",
    },
    {
      title: "Role Misalignment",
      severity: "HIGH",
      severityClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      borderClass: "border-l-rose-500",
      team: "Operations",
      detail:
        "Yuzhe Zhao scoring below threshold on 6/8 Great 8 competencies. Role fit score: 34%. Exit or reassignment risk.",
      action:
        "Performance review with structured support plan. Consider role redesign or transition plan.",
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="07"
        title="Organizational Risk Intelligence"
        subtitle="Critical risks identified through behavioral and structural signals"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {risks.map((r) => (
          <div
            key={r.title}
            className={`report-card rounded-xl border border-white/[0.08] border-l-4 ${r.borderClass} bg-[#111116] p-5`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-white">{r.title}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ring-1 ring-inset ${r.severityClass}`}
              >
                {r.severity}
              </span>
            </div>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 ring-1 ring-inset ring-white/[0.06]">
              <Briefcase className="h-3 w-3" />
              {r.team}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {r.detail}
            </p>
            <div className="mt-4 rounded-lg bg-white/[0.03] p-3.5 ring-1 ring-inset ring-white/[0.05]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300">
                Recommended Action
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-200">
                {r.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- SECTION 8: FOUNDER MEMO ----------
function Section8FounderMemo() {
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, []);

  const checkoutUrl = getCheckoutUrl();

  const findings = [
    {
      title: "LEADERSHIP GAP IN OPERATIONS",
      body: "Current leadership coverage in Operations stands at 58% — below the 70% threshold required for sustainable execution at your growth stage. The primary risk is over-reliance on Lili Mao as a single point of leadership with insufficient succession depth.",
    },
    {
      title: "ROLE MISALIGNMENT — YUZHE ZHAO",
      body: "Yuzhe Zhao's competency profile scores below role requirements on 6 of 8 Great 8 dimensions. Continuation in the current role creates drag on the Operations team. Immediate intervention recommended.",
    },
    {
      title: "TALENT CONCENTRATION RISK",
      body: "Chifong Dong and Eric Li together account for approximately 40% of the firm's high-execution delivery capacity. Loss of either would materially impact client delivery timelines.",
    },
    {
      title: "JOYCE ZHANG — MISAPPLIED TALENT",
      body: "Zhang's psychometric profile (Influencer 9.7, Networker 9.7, Pioneer 7.6) positions her as an exceptional relationship and alignment driver. The current role under-utilizes this profile. Redesigning toward business development or strategic partnerships would deliver higher returns.",
    },
  ];

  const priorities = [
    {
      label: "Priority 1",
      window: "Immediate — 0–30 days",
      items: [
        "Initiate Yuzhe Zhao performance review with structured support plan",
        "Begin Eric Li leadership development track",
        "Redistribute 1–2 direct reports from Lili Mao",
      ],
    },
    {
      label: "Priority 2",
      window: "Short-term — 30–60 days",
      items: [
        "Redesign Joyce Zhang's role toward BD/Partnerships",
        "Implement cross-training: Yijun Sim on stakeholder management",
        "Document Chifong Dong's institutional knowledge (succession risk mitigation)",
      ],
    },
    {
      label: "Priority 3",
      window: "Structural — 60–90 days",
      items: [
        "Implement Scenario B: Balanced Redesign",
        "Introduce 2 new role definitions aligned to AI-augmented workflow",
        "Re-run OrgLens analysis post-restructuring to measure improvement",
      ],
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle num="08" title="Founder Memo" />

      <article className="report-card overflow-hidden rounded-2xl border border-white/[0.08] bg-white text-zinc-900 shadow-[0_0_60px_-20px_rgba(99,102,241,0.4)]">
        {/* Memo Header — dark navy */}
        <header className="bg-[#0a0e27] px-7 py-6 text-white md:px-10 md:py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500/20 ring-1 ring-inset ring-indigo-500/40">
                <FileText className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-300">
                  Confidential — Founder Memo
                </p>
                <p className="mt-1 text-sm font-semibold tracking-wide text-white">
                  Alpha Investment Group
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-zinc-400">
              <span>OrgLens AI</span>
              <span className="text-zinc-700">·</span>
              <span>{today}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                To
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Wenjing Li, CEO
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                From
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                OrgLens AI Organizational Intelligence
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Re
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Organizational Restructuring Assessment
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Classification
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Confidential
              </p>
            </div>
          </div>
        </header>

        {/* Memo Body */}
        <div className="space-y-10 px-7 py-10 md:px-12 md:py-12">
          {/* Executive Summary */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Executive Summary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              Alpha Investment Group presents a strong competency foundation
              with identifiable execution risk concentrated in the Operations
              function. This memo outlines our findings, recommended
              restructuring path, and priority actions for Q2 2025.
            </p>
          </section>

          {/* Key Findings */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Key Findings
            </h3>
            <ol className="mt-4 space-y-5">
              {findings.map((f, i) => (
                <li key={f.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-mono text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                      {f.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Recommended Actions */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Recommended Actions (Priority Order)
            </h3>
            <div className="mt-4 space-y-4">
              {priorities.map((p, i) => (
                <div
                  key={p.label}
                  className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-5"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                      {p.label}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {p.window}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-800"
                      >
                        <span className="mt-1 text-indigo-600">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Restructuring Guidance */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Restructuring Guidance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              Scenario B (Balanced Redesign) is recommended as the
              risk-adjusted optimal path. It achieves $180K in annual cost
              reduction while improving leadership coverage from 58% to 76% and
              execution stability from Medium to Strong. Unlike Scenario A
              (Lean Efficiency), it does not create execution fragility. Unlike
              Scenario C (AI-Augmented), it does not require a 60-day tooling
              transition.
            </p>
          </section>

          {/* Conclusion */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-600">
              Conclusion
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 md:text-base">
              The organization has strong talent at the senior layer. The
              priority is structural — not performance. Addressing role
              misalignment, leadership succession depth, and talent
              misapplication will unlock execution capacity without additional
              headcount cost.
            </p>
            <p className="mt-3 text-sm italic leading-relaxed text-zinc-600 md:text-base">
              OrgLens AI recommends re-analysis in 90 days to measure
              competency movement post-restructuring.
            </p>
          </section>

          {/* Signature line */}
          <div className="flex items-center gap-4 border-t border-zinc-200 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">OrgLens AI</p>
              <p className="text-xs text-zinc-500">
                Organizational Decision Intelligence
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="report-card report-cta mt-12 overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0f0f14] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
        <div className="mx-auto max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Your turn
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Ready to run this analysis on your own team?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            Upload your team's HUCAMA reports. Get a McKinsey-quality
            organizational analysis report in minutes.
          </p>
          <a
            href={checkoutUrl}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.9)]"
          >
            <Sparkles className="h-4 w-4" />
            Analyze My Organization — $49
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-xs text-zinc-500">
            One-time payment. Instant access. No subscription.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- PRINT STYLES ----------
function ReportPrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        @page {
          margin: 0.6in;
          size: letter;
        }

        html,
        body {
          background: #ffffff !important;
          color: #0a0a0f !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Hide chrome */
        aside,
        nav,
        header.report-header .report-actions,
        .report-cta,
        [data-demo-banner],
        .sticky {
          display: none !important;
        }

        /* Force light background through known dark surfaces */
        main,
        .report-root,
        .report-section,
        .report-card {
          background: #ffffff !important;
          color: #111116 !important;
          box-shadow: none !important;
          border-color: rgba(15, 15, 20, 0.12) !important;
        }

        /* Text color overrides */
        .report-root h1,
        .report-root h2,
        .report-root h3,
        .report-root h4,
        .report-root p,
        .report-root span,
        .report-root li,
        .report-root td,
        .report-root th,
        .report-root dt,
        .report-root dd {
          color: #0a0a0f !important;
        }

        .report-root .text-zinc-400,
        .report-root .text-zinc-500,
        .report-root .text-zinc-600 {
          color: #4b5563 !important;
        }

        .report-card {
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .report-section {
          page-break-inside: avoid;
          break-inside: avoid;
        }

        a {
          color: #4338ca !important;
          text-decoration: none;
        }
      }
    `}</style>
  );
}
