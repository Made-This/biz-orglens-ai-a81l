"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
  tone: "green" | "amber" | "red" | "indigo";
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
  const [demoMode, setDemoMode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      setDemoMode(
        window.localStorage.getItem("orglens_demo_mode") === "true"
      );
      setUnlocked(
        window.localStorage.getItem("orglens_report_unlocked") === "true"
      );
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function unlock() {
    try {
      window.localStorage.setItem("orglens_report_unlocked", "true");
    } catch {
      /* ignore */
    }
    window.location.reload();
  }

  return { ready, demoMode, unlocked, unlock };
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
  const { ready, unlocked, unlock } = useReportState();

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  return (
    <>
      <ReportPrintStyles />
      <div className="report-root mx-auto max-w-6xl pb-24">
        <ReportHeader />
        <ExecutiveSummary />
        {unlocked ? <FullReport /> : <LockedTeaser onUnlock={unlock} />}
      </div>
    </>
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
      icon: Crown,
      tone: "indigo" as const,
      text: "Top performers (Chifong Dong, Eric Li, Lili Mao) carry disproportionate execution load — 3 individuals account for 40% of leadership output.",
    },
    {
      icon: ShieldAlert,
      tone: "rose" as const,
      text: "Operations team shows critical adaptability and coping gaps — restructuring risk without intervention.",
    },
    {
      icon: TrendingUp,
      tone: "amber" as const,
      text: "Investment team is analytically strong but structurally fragile — high evaluation, low support orientation.",
    },
    {
      icon: Users,
      tone: "cyan" as const,
      text: "Acting with Consideration is the single largest team-wide competency gap across all departments.",
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
              <dt className="text-xs uppercase tracking-widest text-zinc-500">Industry</dt>
              <dd className="text-sm font-medium text-zinc-200">Financial Services</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-xs uppercase tracking-widest text-zinc-500">Objective</dt>
              <dd className="text-sm leading-relaxed text-zinc-200">
                Reduce burn while preserving execution capability
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
                      Finding {i + 1}
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
      <div className="report-card relative mt-8 overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-600/[0.18] via-indigo-700/[0.10] to-[#0f0f14] p-7 shadow-[0_0_60px_-20px_rgba(99,102,241,0.6)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/20 blur-[80px]" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Primary Recommendation
            </p>
            <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
              Scenario B — Balanced Redesign
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-200">
              Balances cost reduction with organizational resilience. Maintains
              leadership continuity while removing structural redundancy.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-500/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-100 ring-1 ring-inset ring-indigo-400/40">
            <Sparkles className="h-3 w-3" />
            High Confidence
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------- LOCKED TEASER (sections 2–8 placeholder) ----------
function LockedTeaser({ onUnlock }: { onUnlock: () => void }) {
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

            <button
              onClick={onUnlock}
              className="report-cta mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_50px_-5px_rgba(99,102,241,0.9)]"
            >
              <Sparkles className="h-4 w-4" />
              Unlock Full Analysis — $49
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-zinc-500">
              Instant access. One-time payment.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-left text-xs text-zinc-400 sm:grid-cols-4">
              {[
                "Metrics",
                "Scenarios",
                "Competency Impact",
                "Role-Fit",
                "Risk Intelligence",
                "Recommendation",
                "Roadmap",
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
      <Section3Scenarios />
      <Section4CompetencyImpact />
      <Section5RoleFit />
      <Section6RiskIntel />
      <Section7FinalRecommendation />
      <Section8NextSteps />
    </>
  );
}

// ---------- SECTION 2 ----------
function Section2Metrics() {
  const rows = [
    {
      metric: "Leadership Coverage",
      current: "58%",
      after: "76%",
      change: "+18pp",
      tone: "up" as const,
    },
    {
      metric: "Execution Stability",
      current: "Medium",
      after: "Strong",
      change: "↑",
      tone: "up" as const,
    },
    {
      metric: "Organizational Risk",
      current: "High",
      after: "Moderate",
      change: "↓",
      tone: "down-good" as const,
    },
    {
      metric: "Team Balance Score",
      current: "6.1 / 10",
      after: "7.8 / 10",
      change: "+1.7",
      tone: "up" as const,
    },
    {
      metric: "Headcount",
      current: "30",
      after: "26",
      change: "−4",
      tone: "neutral" as const,
    },
    {
      metric: "Monthly Burn Reduction",
      current: "—",
      after: "18%",
      change: "↓",
      tone: "down-good" as const,
    },
  ];

  function changeColor(t: string) {
    if (t === "up" || t === "down-good") return "text-emerald-400";
    if (t === "down-bad") return "text-rose-400";
    return "text-zinc-400";
  }

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="02"
        title="Key Organizational Metrics"
        subtitle="Before vs after Scenario B — net organizational deltas"
      />

      <div className="report-card overflow-hidden rounded-xl border border-white/[0.08] bg-[#111116]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02] text-left text-[10px] uppercase tracking-widest text-zinc-500">
              <th className="px-6 py-4 font-semibold">Metric</th>
              <th className="px-6 py-4 font-semibold">Current</th>
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
                <td className="px-6 py-4 font-mono text-zinc-400">{r.current}</td>
                <td className="px-6 py-4 font-mono font-semibold text-indigo-300">
                  {r.after}
                </td>
                <td
                  className={`px-6 py-4 text-right font-mono font-semibold ${changeColor(
                    r.tone
                  )}`}
                >
                  {r.change} {r.tone === "up" && "↑"}
                  {r.tone === "down-good" && ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ---------- SECTION 3 ----------
function Section3Scenarios() {
  const cards = [
    {
      key: "A",
      name: "Lean Efficiency",
      tone: "amber",
      borderClass: "border-amber-500/40",
      ringClass: "ring-amber-500/20",
      pillClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      pillLabel: "High Risk",
      stats: [
        { label: "Headcount", value: "30 → 22" },
        { label: "Cost Reduction", value: "30%" },
        { label: "Execution Impact", value: "−25%" },
      ],
      tradeoff:
        "Aggressive savings destroy execution bench depth. High fragility risk.",
      recommended: false,
    },
    {
      key: "B",
      name: "Balanced Redesign",
      tone: "indigo",
      borderClass: "border-indigo-500/50",
      ringClass: "ring-indigo-500/30",
      pillClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      pillLabel: "Moderate Risk",
      stats: [
        { label: "Headcount", value: "30 → 26" },
        { label: "Cost Reduction", value: "18%" },
        { label: "Execution Impact", value: "Stable" },
      ],
      tradeoff:
        "Optimal balance of savings and capability retention. Recommended path.",
      recommended: true,
    },
    {
      key: "C",
      name: "AI-Augmented Organization",
      tone: "cyan",
      borderClass: "border-cyan-500/40",
      ringClass: "ring-cyan-500/20",
      pillClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      pillLabel: "Medium Risk",
      stats: [
        { label: "Headcount", value: "30 → 25" },
        { label: "Productivity", value: "+15% projected" },
        { label: "Execution Impact", value: "Transition-dependent" },
      ],
      tradeoff:
        "High upside if AI adoption succeeds; medium transition risk.",
      recommended: false,
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="03"
        title="Scenario Analysis"
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

            <div className="mt-5 space-y-2.5">
              {c.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between border-b border-white/[0.05] pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                    {s.label}
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.05]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Key Trade-off
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

// ---------- SECTION 4 ----------
function Section4CompetencyImpact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const rows = [
    {
      label: "Leadership Coverage",
      before: 58,
      beforeTone: "amber" as const,
      after: 76,
      afterTone: "green" as const,
      change: "+18pp improvement",
    },
    {
      label: "Execution Stability",
      before: 52,
      beforeTone: "amber" as const,
      after: 71,
      afterTone: "green" as const,
      change: "Medium → Strong",
    },
    {
      label: "Adaptability",
      before: 38,
      beforeTone: "red" as const,
      after: 55,
      afterTone: "amber" as const,
      change: "Uneven → Balanced",
    },
    {
      label: "Organizational Stability",
      before: 34,
      beforeTone: "red" as const,
      after: 58,
      afterTone: "amber" as const,
      change: "Low in Ops → Moderate",
    },
    {
      label: "Risk Score",
      before: 85,
      beforeTone: "red" as const,
      after: 48,
      afterTone: "amber" as const,
      change: "−37pp risk reduction",
      invertChange: true,
    },
  ];

  return (
    <section className="report-section mt-16" ref={ref}>
      <SectionTitle
        num="04"
        title="Competency Impact — Scenario B: Before vs After"
        subtitle="Animated competency deltas under the recommended restructuring path"
      />

      <div className="report-card rounded-xl border border-white/[0.08] bg-[#111116] p-6 md:p-8">
        <div className="space-y-7">
          {rows.map((r, i) => (
            <div key={r.label} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <p className="text-sm font-semibold text-white">{r.label}</p>
              </div>

              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-14 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    Before
                  </span>
                  <div className="flex-1">
                    <AnimatedBar
                      value={r.before}
                      tone={r.beforeTone}
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
                      tone={r.afterTone}
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
                  {r.invertChange ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronUp className="h-3 w-3" />
                  )}
                  {r.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION 5 ----------
type Role = "investment" | "operations" | "research";

interface Candidate {
  name: string;
  fit: number;
  strengths: { competency: string; score: number }[];
  gaps: { competency: string; level: string }[];
  insight: string;
}

interface RoleConfig {
  label: string;
  required: { competency: string; level: string }[];
  candidates: Candidate[];
}

const ROLE_DATA: Record<Role, RoleConfig> = {
  investment: {
    label: "Investment Lead",
    required: [
      { competency: "Evaluating Information", level: "High (8+)" },
      { competency: "Driving Success", level: "High (8+)" },
      { competency: "Creating Solutions", level: "High (7+)" },
      { competency: "Interacting with People", level: "Medium (6+)" },
    ],
    candidates: [
      {
        name: "Chifong Dong",
        fit: 95,
        strengths: [
          { competency: "Evaluating Information", score: 9 },
          { competency: "Driving Success", score: 9 },
          { competency: "Creating Solutions", score: 8 },
        ],
        gaps: [{ competency: "Supporting Individuals", level: "moderate" }],
        insight:
          "Dominant analytical and achievement profile. Ideal investment leadership candidate.",
      },
      {
        name: "Eric Li",
        fit: 91,
        strengths: [
          { competency: "Driving Success", score: 8 },
          { competency: "Creating Solutions", score: 8 },
          { competency: "Coping with Pressure", score: 8 },
        ],
        gaps: [{ competency: "Interacting with People", level: "moderate" }],
        insight:
          "Execution-oriented with strong resilience. Solid deputy or co-lead profile.",
      },
      {
        name: "Yijun Sim",
        fit: 90,
        strengths: [
          { competency: "Evaluating Information", score: 8 },
          { competency: "Coping with Pressure", score: 8 },
          { competency: "Structuring Work", score: 8 },
        ],
        gaps: [{ competency: "Exerting Influence", level: "moderate" }],
        insight:
          "Strong analytical and structural capability. Well-suited for senior research or analysis lead.",
      },
      {
        name: "Luke Cai",
        fit: 88,
        strengths: [
          { competency: "Creating Solutions", score: 8 },
          { competency: "Interacting with People", score: 8 },
          { competency: "Driving Success", score: 8 },
        ],
        gaps: [{ competency: "Exerting Influence", level: "developing" }],
        insight:
          "High innovation energy with strong interpersonal skills. Best fit for innovation-led investment roles.",
      },
    ],
  },
  operations: {
    label: "Operations Manager",
    required: [
      { competency: "Structuring Work", level: "High (8+)" },
      { competency: "Supporting Individuals", level: "High (7+)" },
      { competency: "Coping with Pressure", level: "High (8+)" },
      { competency: "Exerting Influence", level: "Medium (6+)" },
    ],
    candidates: [
      {
        name: "Lili Mao",
        fit: 94,
        strengths: [
          { competency: "Supporting Individuals", score: 8.67 },
          { competency: "Coping with Pressure", score: 8.52 },
          { competency: "Structuring Work", score: 8.42 },
        ],
        gaps: [{ competency: "Exerting Influence", level: "moderate" }],
        insight:
          "Highest-fit Operations leader. Balances structure with people-orientation under pressure.",
      },
      {
        name: "Supriya Kumar",
        fit: 89,
        strengths: [
          { competency: "Structuring Work", score: 8.2 },
          { competency: "Supporting Individuals", score: 8.0 },
          { competency: "Coping with Pressure", score: 7.8 },
        ],
        gaps: [{ competency: "Exerting Influence", level: "developing" }],
        insight:
          "Strong cross-functional structural fit. Pairs well as co-lead or operations chief of staff.",
      },
      {
        name: "Luke Cai",
        fit: 82,
        strengths: [
          { competency: "Supporting Individuals", score: 8.1 },
          { competency: "Interacting with People", score: 8.0 },
          { competency: "Creating Solutions", score: 7.5 },
        ],
        gaps: [{ competency: "Structuring Work", level: "developing" }],
        insight:
          "People-strong, structurally developing. Better suited for ops culture or program ownership.",
      },
      {
        name: "Eric Li",
        fit: 79,
        strengths: [
          { competency: "Driving Success", score: 8.0 },
          { competency: "Coping with Pressure", score: 8.0 },
          { competency: "Creating Solutions", score: 8.0 },
        ],
        gaps: [{ competency: "Supporting Individuals", level: "moderate" }],
        insight:
          "Execution-anchored fallback. Less suited for people-leadership but strong contingency.",
      },
    ],
  },
  research: {
    label: "Research Analyst",
    required: [
      { competency: "Evaluating Information", level: "High (8+)" },
      { competency: "Creating Solutions", level: "High (7+)" },
      { competency: "Structuring Work", level: "High (7+)" },
      { competency: "Coping with Pressure", level: "Medium" },
    ],
    candidates: [
      {
        name: "Chifong Dong",
        fit: 97,
        strengths: [
          { competency: "Evaluating Information", score: 9 },
          { competency: "Creating Solutions", score: 8 },
          { competency: "Structuring Work", score: 8 },
        ],
        gaps: [{ competency: "Supporting Individuals", level: "moderate" }],
        insight:
          "Top analytical profile. Ideal research lead candidate.",
      },
      {
        name: "Yijun Sim",
        fit: 93,
        strengths: [
          { competency: "Evaluating Information", score: 8 },
          { competency: "Structuring Work", score: 8 },
          { competency: "Coping with Pressure", score: 8 },
        ],
        gaps: [{ competency: "Exerting Influence", level: "moderate" }],
        insight:
          "Excellent structural-analytical balance. Strong senior analyst.",
      },
      {
        name: "Eric Li",
        fit: 88,
        strengths: [
          { competency: "Creating Solutions", score: 8 },
          { competency: "Driving Success", score: 8 },
          { competency: "Coping with Pressure", score: 8 },
        ],
        gaps: [{ competency: "Structuring Work", level: "moderate" }],
        insight:
          "Pragmatic, solution-oriented analyst. Best suited for applied research.",
      },
      {
        name: "Supriya Kumar",
        fit: 84,
        strengths: [
          { competency: "Structuring Work", score: 8 },
          { competency: "Supporting Individuals", score: 8 },
          { competency: "Coping with Pressure", score: 7.5 },
        ],
        gaps: [{ competency: "Evaluating Information", level: "developing" }],
        insight:
          "Strong organizational fit. Best paired with senior analytical leads.",
      },
    ],
  },
};

function Section5RoleFit() {
  const [role, setRole] = useState<Role>("investment");
  const [expanded, setExpanded] = useState<number | null>(0);
  const data = ROLE_DATA[role];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="05"
        title="Role–Competency Fit Analysis"
        subtitle="Top 4 candidates ranked against role-specific competency requirements"
      />

      {/* Tabs */}
      <div className="mb-6 inline-flex rounded-lg border border-white/[0.08] bg-[#111116] p-1">
        {(Object.keys(ROLE_DATA) as Role[]).map((k) => (
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
            {ROLE_DATA[k].label}
          </button>
        ))}
      </div>

      {/* Required competencies + ranking grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="report-card lg:col-span-4 rounded-xl border border-white/[0.08] bg-[#111116] p-5">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            <Target className="h-3.5 w-3.5" />
            Required Competencies
          </p>
          <h4 className="mt-2 text-base font-bold text-white">{data.label}</h4>
          <ul className="mt-5 space-y-3">
            {data.required.map((r) => (
              <li
                key={r.competency}
                className="flex items-center justify-between border-b border-white/[0.05] pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm text-zinc-200">{r.competency}</span>
                <span className="font-mono text-[11px] font-semibold text-indigo-300">
                  {r.level}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8 space-y-3">
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
                  <div className="flex-1">
                    <p className="text-base font-bold text-white">{c.name}</p>
                    <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                        style={{ width: `${c.fit}%` }}
                      />
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
                            key={s.competency}
                            className="flex items-center justify-between rounded-md bg-emerald-500/[0.06] px-2.5 py-1.5 ring-1 ring-inset ring-emerald-500/20"
                          >
                            <span className="text-xs text-zinc-200">
                              {s.competency}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-emerald-300">
                              {s.score.toFixed(s.score % 1 === 0 ? 0 : 2)}
                            </span>
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
                            key={g.competency}
                            className="flex items-center justify-between rounded-md bg-amber-500/[0.06] px-2.5 py-1.5 ring-1 ring-inset ring-amber-500/20"
                          >
                            <span className="text-xs text-zinc-200">
                              {g.competency}
                            </span>
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                              {g.level}
                            </span>
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
      </div>
    </section>
  );
}

// ---------- SECTION 6 ----------
function Section6RiskIntel() {
  const risks = [
    {
      title: "Leadership Dependency Risk",
      severity: "HIGH",
      severityClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      borderClass: "border-l-rose-500",
      team: "All departments",
      detail:
        "Only 2–3 individuals (Chifong Dong, Lili Mao, Supriya Kumar) carry critical decision-making load across 4 departments. Single points of failure.",
      action:
        "Promote 2 high-fit candidates to distributed leadership roles. Implement leadership succession planning.",
    },
    {
      title: "Operations Fragility",
      severity: "HIGH",
      severityClass: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
      borderClass: "border-l-rose-500",
      team: "Operations",
      detail:
        "Low coping with pressure and low supporting competencies detected in Operations team. Under stress conditions, this team is most likely to degrade first.",
      action:
        "Reassign Lili Mao to Operations oversight. Redesign team structure to reduce single-person dependency.",
    },
    {
      title: "Execution Imbalance",
      severity: "MEDIUM",
      severityClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      borderClass: "border-l-amber-500",
      team: "Investment + Research",
      detail:
        "High creativity scores across Investment and Research teams, but structuring capability is below threshold. Ideas generate without delivery infrastructure.",
      action:
        "Pair creative profiles (Joyce Zhang) with execution-anchored managers. Add structured delivery checkpoints.",
    },
    {
      title: "Team Conflict Risk",
      severity: "MEDIUM",
      severityClass: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
      borderClass: "border-l-amber-500",
      team: "Investment Team",
      detail:
        "High influence concentration in Investment team (Joyce Zhang: Influencer 9.68, Networker 9.66). High-dominance profiles without moderating structure create decision conflict risk.",
      action:
        "Introduce structured decision protocols. Ensure Achiever and Implementer profiles balance the team composition.",
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="06"
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

// ---------- SECTION 7 ----------
function Section7FinalRecommendation() {
  const reasons = [
    {
      icon: TrendingUp,
      title: "Sustainable cost reduction",
      text: "18% burn reduction without destroying execution bench",
    },
    {
      icon: Crown,
      title: "Improved execution capability",
      text: "Leadership coverage from 58% to 76%",
    },
    {
      icon: Users,
      title: "Stronger leadership distribution",
      text: "Reduces single-point-of-failure risk",
    },
    {
      icon: ShieldAlert,
      title: "Reduced organizational fragility",
      text: "Ops risk drops from High to Moderate",
    },
  ];

  return (
    <section className="report-section mt-16">
      <SectionTitle num="07" title="Final Recommendation" />

      <div className="report-card relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-600/[0.18] via-[#0f0f14] to-[#0f0f14] p-8 md:p-12 shadow-[0_0_80px_-30px_rgba(99,102,241,0.7)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
            Primary Decision
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Proceed with Scenario B —<br className="hidden md:block" />{" "}
            <span className="text-indigo-300">Balanced Redesign</span>
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="rounded-xl border border-white/[0.08] bg-[#0a0a0f]/60 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 ring-1 ring-inset ring-indigo-500/30">
                    <Icon className="h-4 w-4 text-indigo-300" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-white">{r.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {r.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex gap-4 rounded-xl border-l-2 border-indigo-400 bg-white/[0.03] p-6">
            <Quote className="h-6 w-6 shrink-0 text-indigo-400" />
            <p className="text-sm leading-relaxed text-zinc-200 md:text-base">
              <span className="font-semibold text-white">OrgLens AI</span>{" "}
              identifies Scenario B as the highest-confidence path for Alpha
              Investment Group — preserving the execution capability needed to
              maintain operations through a restructuring period while
              achieving meaningful cost reduction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- SECTION 8 ----------
function Section8NextSteps() {
  const steps = [
    {
      week: "Week 1",
      title: "Leadership Promotion",
      text: "Identify and confirm top 4 candidates for leadership promotion: Chifong Dong (Investment), Lili Mao (Operations oversight), Supriya Kumar (cross-functional), Eric Li (execution anchor).",
    },
    {
      week: "Week 2",
      title: "Ops Restructure",
      text: "Redesign Operations structure. Reduce single-person dependency. Assign structured role ownership to 2 leads.",
    },
    {
      week: "Week 3",
      title: "Role Reassignment",
      text: "Reassign high-fit individuals to critical roles per Role–Competency Fit rankings. Brief affected employees on new scope.",
    },
    {
      week: "Week 4",
      title: "Monitor + Iterate",
      text: "Deploy monitoring checkpoints for team stability, workload balance, and competency utilization. Run follow-up OrgLens analysis in 90 days.",
    },
  ];

  const checkoutUrl = getCheckoutUrl();

  return (
    <section className="report-section mt-16">
      <SectionTitle
        num="08"
        title="Next Steps"
        subtitle="4-week implementation roadmap for Scenario B"
      />

      <ol className="relative space-y-6 border-l border-white/[0.08] pl-8 md:pl-10">
        {steps.map((s, i) => (
          <li key={s.week} className="report-card relative">
            <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border border-indigo-500/40 bg-[#0f0f14] font-mono text-xs font-bold text-indigo-300 ring-4 ring-[#0a0a0f] md:-left-[50px]">
              {i + 1}
            </span>
            <div className="rounded-xl border border-white/[0.08] bg-[#111116] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
                {s.week}
              </p>
              <h3 className="mt-1.5 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

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
