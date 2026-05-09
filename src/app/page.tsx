"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              OrgLens<span className="text-indigo-600">.</span>AI
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#pain" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              Pain Points
            </a>
            <a href="#included" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              What&rsquo;s Included
            </a>
            <a href="#calculator" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              ROI
            </a>
            <a href="#preview" className="text-sm text-slate-600 transition-colors hover:text-slate-900">
              Sample Report
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden text-sm text-slate-600 transition-colors hover:text-slate-900 md:inline"
            >
              Try Demo
            </Link>
            <a
              href={CHECKOUT_URL}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500"
            >
              Get $49 Analysis
            </a>
          </div>
        </div>
      </header>

      <HeroSection />
      <PainCarouselSection />
      <RecognizeSection />
      <IncludedSection />
      <ROICalculatorSection />
      <ReportPreviewSection />
      <TrustSection />
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 1 — HERO                            */
/* ─────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/3 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[500px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              AI-powered organizational decision intelligence
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              Your org chart shows reporting lines.
              <br />
              <span className="text-indigo-300">It doesn&rsquo;t show execution risk.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              OrgLens AI turns team structure, competency data, and role-fit signals
              into a clear decision report for founders.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={CHECKOUT_URL}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-500"
              >
                Get My $49 OrgLens Analysis
                <ArrowRightIcon />
              </a>
              <Link
                href="/app/report"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-transparent px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                View Demo Report
              </Link>
            </div>

            <p className="mt-8 max-w-xl text-sm text-slate-400">
              Built for founders making hiring, promotion, restructuring, and team-design decisions.
            </p>
          </div>

          <div className="lg:col-span-6">
            <HeroSplitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplitVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-indigo-500/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E293B]/60 p-6 shadow-2xl backdrop-blur-sm md:p-7">
        {/* Header row */}
        <div className="grid grid-cols-2 gap-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Org Chart
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
            OrgLens View
          </p>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-6">
          {/* Vertical divider with vs */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2">
            <div className="relative h-full w-px bg-white/10">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0F172A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                vs
              </span>
            </div>
          </div>

          {/* LEFT: plain org tree */}
          <div className="pr-4">
            <PlainOrgTree />
          </div>

          {/* RIGHT: risk-colored org tree */}
          <div className="pl-4">
            <RiskOrgTree />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlainOrgTree() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <PlainNode label="CEO" />
      <Connector />
      <div className="grid w-full grid-cols-3 gap-1.5">
        <PlainNode label="VP Sales" tiny />
        <PlainNode label="VP Eng" tiny />
        <PlainNode label="Head Ops" tiny />
      </div>
      <div className="flex w-full justify-center">
        <div className="grid w-2/3 grid-cols-2 gap-1.5">
          <PlainNode label="Eng Lead" tiny />
          <PlainNode label="Eng Lead" tiny />
        </div>
      </div>
    </div>
  );
}

function PlainNode({ label, tiny }: { label: string; tiny?: boolean }) {
  return (
    <div
      className={`rounded-md border border-slate-600/40 bg-slate-700/40 text-center font-medium text-slate-300 ${
        tiny ? "px-1.5 py-1.5 text-[10px]" : "px-3 py-2 text-xs"
      }`}
    >
      {label}
    </div>
  );
}

function Connector() {
  return <div className="h-2.5 w-px bg-slate-600/50" />;
}

function RiskOrgTree() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <RiskNode label="CEO" tone="green" />
      <Connector />
      <div className="grid w-full grid-cols-3 gap-1.5">
        <RiskNode label="VP Sales" tone="amber" tiny />
        <RiskNode label="VP Eng" tone="green" tiny />
        <RiskNode label="Head Ops" tone="red" tiny atRisk />
      </div>
      <div className="flex w-full justify-center">
        <div className="grid w-2/3 grid-cols-2 gap-1.5">
          <RiskNode label="Eng Lead" tone="green" tiny />
          <RiskNode label="Eng Lead" tone="amber" tiny />
        </div>
      </div>
    </div>
  );
}

function RiskNode({
  label,
  tone,
  tiny,
  atRisk,
}: {
  label: string;
  tone: "green" | "amber" | "red";
  tiny?: boolean;
  atRisk?: boolean;
}) {
  const styles = {
    green: { dot: "bg-[#10B981]", border: "border-emerald-500/40", bg: "bg-emerald-500/10", text: "text-emerald-100" },
    amber: { dot: "bg-[#F59E0B]", border: "border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-100" },
    red: { dot: "bg-[#EF4444]", border: "border-rose-500/60", bg: "bg-rose-500/15", text: "text-rose-100" },
  }[tone];

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-center gap-1.5 rounded-md border ${styles.border} ${styles.bg} ${styles.text} font-medium ${
          tiny ? "px-1.5 py-1.5 text-[10px]" : "px-3 py-2 text-xs"
        }`}
      >
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
        <span className="truncate">{label}</span>
      </div>
      {atRisk && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-rose-400/60 bg-rose-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-widest text-white">
          At Risk
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 2 — PAIN CAROUSEL                   */
/* ─────────────────────────────────────────── */

const painCards = [
  {
    number: "70%",
    stat: "Managers account for about 70% of variance in team engagement.",
    pain: "If the wrong person leads the team, execution slows, morale drops, and the founder becomes the bottleneck.",
    cta: "Find leadership gaps →",
  },
  {
    number: "30%",
    stat: "A bad hire can cost around 30% of first-year earnings.",
    pain: "For a $100K role, one wrong people decision can burn $30K before counting lost time, morale, and missed execution.",
    cta: "Check role fit before hiring or promoting →",
  },
  {
    number: "3×",
    stat: "Top-quartile organizational health is associated with about 3× greater total shareholder returns over time.",
    pain: "Structure is not admin work. It is performance infrastructure.",
    cta: "Map organizational capability →",
  },
  {
    number: "$438B",
    stat: "Gallup reported that declining engagement cost the global economy an estimated $438B in lost productivity.",
    pain: "Disengagement is not soft. It is expensive.",
    cta: "Detect execution risk →",
  },
  {
    number: "5 min",
    stat: "Get a first-pass organizational analysis in minutes.",
    pain: "Founders can track burn and runway instantly, but still make people decisions with gut feeling and spreadsheets.",
    cta: "Unlock my report →",
  },
];

function PainCarouselSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = painCards.length;

  // Auto-advance every 4s, paused on hover
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(t);
  }, [isPaused, total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="pain" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            The hidden people risks founders usually see too late.
          </h2>
        </div>

        <div
          className="relative mt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop: 3-up sliding window. Mobile: native horizontal scroll. */}
          <div className="hidden md:block">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${index * (100 / 3)}%)` }}
              >
                {painCards.map((card, i) => (
                  <div key={i} className="w-1/3 shrink-0 px-3">
                    <PainCard {...card} />
                  </div>
                ))}
                {/* Duplicate the first 2 to allow last 2 to be visible without empty space */}
                {painCards.slice(0, 2).map((card, i) => (
                  <div key={`dup-${i}`} className="w-1/3 shrink-0 px-3">
                    <PainCard {...card} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-md transition-all hover:border-indigo-400 hover:text-indigo-600"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-md transition-all hover:border-indigo-400 hover:text-indigo-600"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
              {painCards.map((card, i) => (
                <div key={i} className="w-[85%] shrink-0 snap-center">
                  <PainCard {...card} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {painCards.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-indigo-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PainCard({
  number,
  stat,
  pain,
  cta,
}: {
  number: string;
  stat: string;
  pain: string;
  cta: string;
}) {
  return (
    <div className="flex h-full min-h-[360px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg">
      <div>
        <p className="text-6xl font-black tracking-tight text-indigo-600">
          {number}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{stat}</p>
        <p className="mt-5 text-base font-medium leading-relaxed text-slate-900">
          {pain}
        </p>
      </div>
      <a
        href={CHECKOUT_URL}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
      >
        {cta}
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 3 — DO YOU RECOGNIZE THIS?          */
/* ─────────────────────────────────────────── */

const founderQuestions = [
  "Who should lead this team?",
  "Are we overstaffed or just poorly structured?",
  "Can we reduce burn without breaking execution?",
  "Why is this team moving slowly?",
  "Who is high-potential but underused?",
  "Which role is the wrong fit?",
];

function RecognizeSection() {
  return (
    <section className="bg-[#F9FAFB] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Built for the moment when founders ask…
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {founderQuestions.map((q, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-3 font-serif text-5xl leading-none text-indigo-200"
              >
                &ldquo;
              </span>
              <p className="relative text-lg font-semibold text-slate-900">
                {q}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-lg text-slate-700">
            If one of these questions is live in your company, OrgLens AI is worth running today.
          </p>
          <a
            href={CHECKOUT_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-500"
          >
            Run My $49 Analysis
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 4 — WHAT'S INCLUDED                 */
/* ─────────────────────────────────────────── */

function IncludedSection() {
  const cards = [
    {
      icon: <HierarchyIcon />,
      title: "Competency Org Map",
      desc: "See leadership, execution, adaptability, and stability across your org.",
    },
    {
      icon: <RankedListIcon />,
      title: "Role–Competency Fit",
      desc: "Rank people against critical roles before hiring, promoting, or restructuring.",
    },
    {
      icon: <BranchesIcon />,
      title: "Scenario Comparison",
      desc: "Compare Lean Cut, Balanced Redesign, and AI-Augmented structure.",
    },
    {
      icon: <DocumentIcon />,
      title: "Founder Memo",
      desc: "Get a clear decision report with risks, trade-offs, and next steps.",
    },
  ];

  return (
    <section id="included" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            What your $49 OrgLens Analysis includes
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  {c.icon}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                  <CheckDotIcon />
                  Included
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-500"
          >
            Get My $49 OrgLens Analysis
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 5 — ROI CALCULATOR                  */
/* ─────────────────────────────────────────── */

function ROICalculatorSection() {
  const [employees, setEmployees] = useState(30);
  const [salary, setSalary] = useState(80000);

  const badHireCost = Math.round(salary * 0.3);
  const ratio = Math.round(badHireCost / 49);

  const formatMoney = (n: number) =>
    `$${n.toLocaleString("en-US")}`;

  return (
    <section id="calculator" className="bg-[#0F172A] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Small org mistakes become expensive fast.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            See what a single wrong people decision could cost you — vs. the price of the analysis.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl shadow-indigo-900/30">
            <div className="grid lg:grid-cols-2">
              {/* INPUTS */}
              <div className="border-b border-slate-200 p-8 md:p-10 lg:border-b-0 lg:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Inputs
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Your team today
                </h3>

                <div className="mt-8 space-y-7">
                  {/* Employees */}
                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="employees" className="text-sm font-semibold text-slate-700">
                        Number of employees
                      </label>
                      <span className="font-mono text-lg font-bold text-indigo-600">
                        {employees}
                      </span>
                    </div>
                    <input
                      id="employees"
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="mt-3 w-full accent-indigo-600"
                    />
                    <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                      <span>5</span>
                      <span>500</span>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <div className="flex items-baseline justify-between">
                      <label htmlFor="salary" className="text-sm font-semibold text-slate-700">
                        Average annual salary
                      </label>
                      <span className="font-mono text-lg font-bold text-indigo-600">
                        {formatMoney(salary)}
                      </span>
                    </div>
                    <input
                      id="salary"
                      type="range"
                      min={30000}
                      max={300000}
                      step={5000}
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="mt-3 w-full accent-indigo-600"
                    />
                    <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                      <span>$30K</span>
                      <span>$300K</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* OUTPUT */}
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
                  Bad role decision estimate
                </p>
                <p className="mt-2 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
                  {formatMoney(badHireCost)}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  ≈ 30% of one annual salary (industry baseline)
                </p>

                <div className="mt-7 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">
                    $49
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      OrgLens analysis
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      One-time. No subscription.
                    </p>
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  That&rsquo;s a {ratio.toLocaleString("en-US")}× ROI on risk reduction
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-700">
                  Spending $49 to reduce the chance of a{" "}
                  <span className="font-semibold text-slate-900">
                    {formatMoney(badHireCost)}
                  </span>{" "}
                  people mistake is a rational founder decision.
                </p>

                <a
                  href={CHECKOUT_URL}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-300/40 transition-all hover:bg-indigo-500"
                >
                  Get My Analysis
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 6 — DEMO REPORT PREVIEW             */
/* ─────────────────────────────────────────── */

function ReportPreviewSection() {
  return (
    <section id="preview" className="bg-[#F9FAFB] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Preview the report founders receive.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* Visible header */}
            <div className="border-b border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    OrgLens AI — Organizational Analysis Report
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    Alpha Investment Group
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    30 employees · Investment / Finance
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Recommended: Balanced Redesign
                </span>
              </div>

              <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 text-sm">
                <span className="font-semibold text-slate-700">Objective:</span>{" "}
                <span className="text-slate-600">
                  Reduce burn without destroying execution
                </span>
              </div>
            </div>

            {/* Visible metrics */}
            <div className="border-b border-slate-200 p-8 md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Key Metrics — Before vs. After
              </p>
              <div className="mt-5 grid gap-3">
                <MetricRow label="Leadership Coverage" before="58%" after="76%" direction="up" />
                <MetricRow label="Execution Stability" before="Medium" after="Strong" direction="up" />
                <MetricRow label="Organizational Risk" before="High" after="Moderate" direction="down" />
                <MetricRow label="Team Balance Score" before="6.1 / 10" after="7.8 / 10" direction="up" />
              </div>
            </div>

            {/* LOCKED rows */}
            <div className="space-y-3 p-6 md:p-8">
              <LockedRow title="Full Role-Fit Ranking" sample="Luke Cai · 94% · VP Product" />
              <LockedRow title="Competency Heatmap" sample="48 cells · L · E · A · S" />
              <LockedRow title="Scenario Detail" sample="A · B · C — full breakdown" />
              <LockedRow title="Founder Memo" sample="Decision · Trade-offs · Next steps" />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-300/50 transition-all hover:bg-indigo-500"
            >
              Unlock Full Report — $49
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({
  label,
  before,
  after,
  direction,
}: {
  label: string;
  before: string;
  after: string;
  direction: "up" | "down";
}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-3">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <span className="font-mono text-sm text-slate-500 line-through decoration-slate-300">
        {before}
      </span>
      <ArrowFlowIcon direction={direction} />
      <span className="font-mono text-sm font-bold text-emerald-600">
        {after}
      </span>
      <span />
    </div>
  );
}

function LockedRow({ title, sample }: { title: string; sample: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div
        aria-hidden="true"
        className="select-none px-5 py-5"
        style={{ filter: "blur(4px)" }}
      >
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{sample}</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-slate-200" />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between gap-3 bg-white/55 px-5 backdrop-blur-[1px]">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
            <LockIcon />
          </div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
        </div>
        <a
          href={CHECKOUT_URL}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Unlock
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* SECTION 7 — TRUST / SCIENCE + FINAL CTA     */
/* ─────────────────────────────────────────── */

function TrustSection() {
  const trust = [
    {
      icon: <FlaskIcon />,
      label: "HUCAMA Framework",
      text: "Built on validated competency assessments used by enterprise HR teams globally.",
    },
    {
      icon: <ChartIcon />,
      label: "Great 8 Competency Model",
      text: "Every person ranked across 8 core business competencies — not personality tests or sentiment scores.",
    },
    {
      icon: <DecisionTreeIcon />,
      label: "Scenario Intelligence",
      text: "Three restructuring scenarios modeled per analysis — with explicit trade-offs and risk forecasts.",
    },
  ];

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Not generic AI advice. Competency-based decision intelligence.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              OrgLens AI uses competency science to translate people data into business decisions:
              leadership gaps, execution risk, role fit, and organizational fragility.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {trust.map((t, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 md:mx-0">
                  {t.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {t.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — full-width indigo */}
      <section className="relative overflow-hidden bg-indigo-600 py-20 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/4 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[140px]" />
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[500px] rounded-full bg-indigo-300/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Your team&rsquo;s capability gaps exist today.
            <br />
            <span className="text-indigo-200">You just can&rsquo;t see them yet.</span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-xl transition-all hover:bg-slate-50"
            >
              Get My $49 OrgLens Analysis
              <ArrowRightIcon />
            </a>
            <Link
              href="/app/report"
              className="inline-flex items-center gap-1 text-base font-semibold text-white underline-offset-4 transition-colors hover:underline"
            >
              View Demo Report →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────── */
/* FOOTER                                      */
/* ─────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">
              OrgLens<span className="text-indigo-600">.</span>AI
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Organizational decision intelligence for founders.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-center">
            <a href="#pain" className="text-sm text-slate-600 hover:text-slate-900">
              Pain Points
            </a>
            <a href="#included" className="text-sm text-slate-600 hover:text-slate-900">
              What&rsquo;s Included
            </a>
            <a href="#calculator" className="text-sm text-slate-600 hover:text-slate-900">
              ROI Calculator
            </a>
            <Link href="/sign-in" className="text-sm text-slate-600 hover:text-slate-900">
              Try Demo
            </Link>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-slate-500">
              Built for founders who make hard decisions.
            </p>
            <a
              href={CHECKOUT_URL}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Get $49 Analysis →
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} OrgLens AI. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Competency science, made accessible.
          </p>
        </div>

        <div className="text-center py-3 pb-2 opacity-50 text-xs">
          <a
            href="https://madethis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-current no-underline inline-flex items-center gap-1 hover:opacity-75 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Built with MadeThis
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────── */
/* INLINE SVG ICONS                            */
/* ─────────────────────────────────────────── */

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CheckDotIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ArrowFlowIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
      {direction === "up" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 7 7 17" />
          <path d="M17 16V7H8" />
        </svg>
      )}
    </span>
  );
}

/* Deliverable card icons */

function HierarchyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <rect x="2" y="14" width="6" height="4" rx="1" />
      <rect x="9" y="14" width="6" height="4" rx="1" />
      <rect x="16" y="14" width="6" height="4" rx="1" />
      <path d="M12 6v3" />
      <path d="M5 14v-2h14v2" />
    </svg>
  );
}

function RankedListIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h2" />
      <path d="M9 6h12" />
      <path d="M3 12h2" />
      <path d="M9 12h9" />
      <path d="M3 18h2" />
      <path d="M9 18h6" />
    </svg>
  );
}

function BranchesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7" />
      <path d="M12 13v4" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

/* Trust section icons */

function FlaskIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v6L4 18a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3L15 8V2" />
      <path d="M8 2h8" />
      <path d="M7 14h10" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <rect x="7" y="13" width="3" height="5" />
      <rect x="12" y="9" width="3" height="9" />
      <rect x="17" y="5" width="3" height="13" />
    </svg>
  );
}

function DecisionTreeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <circle cx="5" cy="14" r="2" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="19" cy="14" r="2" />
      <path d="M12 6v2" />
      <path d="M12 8 5 12" />
      <path d="M12 8v4" />
      <path d="m12 8 7 4" />
    </svg>
  );
}
