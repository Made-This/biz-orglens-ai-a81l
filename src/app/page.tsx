"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Network,
  Target,
  GitBranch,
  ShieldAlert,
  Check,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type ScenarioKey = "A" | "B" | "C";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 antialiased">
      <PageStyles />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[rgba(99,102,241,0.15)] bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              OrgLens<span className="text-indigo-400">.</span>AI
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#lenses"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Four Lenses
            </a>
            <a
              href="#demo"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white md:inline"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.9)]"
            >
              Start Free Analysis
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-700/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Organizational Intelligence Platform
              </div>

              <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                X-Ray Vision for Your Organization.
              </h1>

              <p className="mt-6 max-w-2xl text-xl text-zinc-300">
                OrgLens AI transforms HUCAMA psychometric data into
                restructuring decisions, role-fit rankings, and organizational
                risk intelligence.
              </p>

              <p className="mt-3 max-w-2xl text-base text-zinc-500">
                Built for founders making difficult people decisions under
                pressure.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
                >
                  Start Free Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-indigo-500/40 hover:bg-[#16161f]"
                >
                  See Live Demo
                </a>
              </div>

              {/* Stats bar */}
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-4 sm:grid-cols-4">
                <HeroStat label="Team" value="45" sub="SaaS startup" />
                <HeroStat label="Burn" value="$450K" sub="per month" />
                <HeroStat label="Runway" value="6 mo" sub="remaining" />
                <HeroStat
                  label="Decision in"
                  value="<5 min"
                  sub="vs weeks of HR"
                />
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="relative border-t border-[rgba(99,102,241,0.15)]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Why OrgLens AI
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Most companies manage structure.
              <br />
              <span className="text-zinc-500">Few understand capability.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <PositionCard
              tag="Yesterday"
              title="Traditional HR Systems"
              items={[
                "Store employee data",
                "Static org charts",
                "Passive dashboards",
                "No decision support",
              ]}
            />
            <PositionCard
              tag="Yesterday"
              title="Consulting Firms"
              items={[
                "Expensive engagements",
                "Slow turnaround",
                "Inaccessible for SMEs",
                "No real-time insights",
              ]}
            />
            <PositionCard
              tag="Today"
              title="OrgLens AI"
              items={[
                "Competency intelligence",
                "Instant restructuring scenarios",
                "Role-fit ranking",
                "Organizational risk visibility",
                "Available in minutes, not months",
              ]}
              highlighted
            />
          </div>
        </div>
      </section>

      {/* FOUR LENSES */}
      <section
        id="lenses"
        className="relative border-t border-[rgba(99,102,241,0.15)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              The Platform
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Four Lenses. One Decision.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
              How founders understand organizational capability before making
              high-stakes decisions.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <LensCard
              lens="Lens 1"
              icon={<Network className="h-5 w-5" />}
              title="Competency Org Map"
              desc="Visualize how leadership, execution, adaptability, and stability flow across your organization. Every employee. Every gap. One view."
              stat="45 employees mapped · 48 competencies scored"
              preview={<MiniOrgTree />}
            />
            <LensCard
              lens="Lens 2"
              icon={<Target className="h-5 w-5" />}
              title="Role–Competency Fit Engine"
              desc="Rank every employee against every critical role. See fit scores, competency gaps, and AI-generated placement insights in seconds."
              stat="5 critical roles · 12 employees ranked"
              preview={<MiniRankList />}
            />
            <LensCard
              lens="Lens 3"
              icon={<GitBranch className="h-5 w-5" />}
              title="AI Scenario Generator"
              desc="Model Lean, Balanced, or AI-Native restructuring scenarios before you act. Compare burn reduction, execution risk, and leadership continuity."
              stat="3 scenarios · Scenario B recommended"
              preview={<MiniScenarioCards />}
            />
            <LensCard
              lens="Lens 4"
              icon={<ShieldAlert className="h-5 w-5" />}
              title="Organizational Risk Intelligence"
              desc="Detect dependency risks, burnout signals, leadership gaps, and execution fragility before they become failures."
              stat="3 high risks detected · 2 succession gaps"
              preview={<MiniRiskGrid />}
            />
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="relative border-t border-[rgba(99,102,241,0.15)] bg-[#0A0A0B]">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-36">
          <p className="text-3xl font-semibold tracking-tight text-zinc-300 md:text-4xl">
            &ldquo;Founders don&rsquo;t fail because they lack data.
          </p>
          <p className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            They fail because they lack{" "}
            <span className="text-indigo-400">clarity under pressure</span>.
            &rdquo;
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-base text-zinc-400 md:text-lg">
            You scaled fast. Revenue dropped. The board wants answers. Now you
            need to restructure — but which roles matter most? Which people
            carry the execution load? Which teams collapse under pressure?
            Spreadsheets and gut instinct aren&rsquo;t enough for decisions at
            this level.
          </p>
          <p className="mt-10 text-xl font-bold tracking-tight text-white md:text-2xl">
            OrgLens AI transforms human complexity into decision clarity.
          </p>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section
        id="demo"
        className="relative border-t border-[rgba(99,102,241,0.15)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Live Demo
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              45-Person SaaS Startup
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
              Burn $450K/mo. Runway 6 months. Three restructuring paths.
            </p>
          </div>

          <LiveDemo />

          <div className="mt-12 flex justify-center">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-base font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
            >
              Run This Analysis on Your Team — $49
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="relative border-t border-[rgba(99,102,241,0.15)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Pricing
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Pay per analysis. No subscriptions.
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111118] p-10 shadow-[0_0_80px_-15px_rgba(99,102,241,0.5)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px]" />

              <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
                Starter Analysis
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-6xl font-bold tracking-tight text-white">
                  $49
                </span>
                <span className="text-sm text-zinc-500">USD</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                One-time. No subscription.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-zinc-300">
                {[
                  "Competency org map",
                  "Role-fit ranking for all team members",
                  "3 AI-generated restructuring scenarios",
                  "Organizational risk assessment",
                  "Founder decision memo export",
                  "Unlimited viewing after purchase",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={CHECKOUT_URL}
                className="mt-10 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
              >
                Analyze My Organization — $49
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-[rgba(99,102,241,0.15)]">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.12] blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your organization is capable
            <br />
            of more than it shows.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Find out where the gaps are — before your next board meeting.
          </p>
          <div className="mt-10">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-base font-medium text-white shadow-[0_0_50px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_50px_-5px_rgba(99,102,241,1)]"
            >
              Start Free Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(99,102,241,0.15)] bg-[#0A0A0B]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-lg font-bold tracking-tight text-white">
                OrgLens<span className="text-indigo-400">.</span>AI
              </p>
              <p className="mt-2 text-sm text-zinc-500">
                Organizational intelligence for founders.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:items-center">
              <a
                href="#lenses"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Four Lenses
              </a>
              <a
                href="#demo"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Demo
              </a>
              <a
                href="#pricing"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Pricing
              </a>
              <Link
                href="/sign-in"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Sign In
              </Link>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-zinc-500">
                Built for founders who make hard decisions.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[rgba(99,102,241,0.15)] pt-6 sm:flex-row">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} OrgLens AI. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
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
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Hero                                        */
/* ─────────────────────────────────────────── */

function HeroStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold tracking-tight text-white">
        {value}
      </p>
      <p className="text-[10px] text-zinc-500">{sub}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-indigo-500/10 blur-2xl" />

      <div className="relative grid gap-4 rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-5 shadow-2xl shadow-indigo-900/20 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Organization · Capability X-Ray
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-xl border border-[rgba(99,102,241,0.15)] bg-[#0A0A0B] p-5">
            <MiniOrgTree large />
          </div>

          <div className="md:col-span-2 rounded-xl border border-[rgba(99,102,241,0.15)] bg-[#0A0A0B] p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              Role Fit Ranking
            </p>
            <p className="mt-1 text-xs text-zinc-400">VP Product</p>

            <div className="mt-4 space-y-3">
              <FitRow name="Luke Cai" pct={94} tone="green" />
              <FitRow name="Eric Li" pct={89} tone="green" />
              <FitRow name="Yijun Sim" pct={81} tone="amber" />
            </div>

            <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.08] p-3">
              <p className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
                <Sparkles className="h-3 w-3" />
                AI Insight
              </p>
              <p className="mt-1 text-xs text-zinc-300">
                Luke matches Series B product leader archetype.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Position cards                              */
/* ─────────────────────────────────────────── */

function PositionCard({
  tag,
  title,
  items,
  highlighted,
}: {
  tag: string;
  title: string;
  items: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-8 ${
        highlighted
          ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.07] to-[#111118] shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]"
          : "border-[rgba(99,102,241,0.15)] bg-[#111118]"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 right-6">
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-300 backdrop-blur">
            Best fit
          </span>
        </div>
      )}
      <p
        className={`text-xs font-medium uppercase tracking-widest ${
          highlighted ? "text-indigo-400" : "text-zinc-500"
        }`}
      >
        {tag}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <ul
        className={`mt-6 space-y-3 text-sm ${
          highlighted ? "text-zinc-300" : "text-zinc-400"
        }`}
      >
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            {highlighted ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            ) : (
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Lens cards                                  */
/* ─────────────────────────────────────────── */

function LensCard({
  lens,
  icon,
  title,
  desc,
  stat,
  preview,
}: {
  lens: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  stat: string;
  preview: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_0_50px_-15px_rgba(99,102,241,0.5)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              {lens}
            </p>
            <h3 className="mt-0.5 text-lg font-semibold text-white">
              {title}
            </h3>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{desc}</p>

      <div className="mt-6 rounded-xl border border-[rgba(99,102,241,0.15)] bg-[#0A0A0B] p-5">
        {preview}
      </div>

      <p className="mt-4 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
        {stat}
      </p>
    </div>
  );
}

/* Mini previews for each lens */
function MiniOrgTree({ large }: { large?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <Node label="Wenjing Li" sub="CEO" tone="green" small={!large} />
      <div className="my-2 h-3 w-px bg-[#1E1E24]" />
      <div className="relative flex w-full justify-around gap-2">
        <div className="absolute left-[12%] right-[12%] top-0 h-px bg-[#1E1E24]" />
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="Chifong" sub="CTO" tone="green" small />
        </div>
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="Supriya" sub="VP Sales" tone="green" small />
        </div>
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="Lili Mao" sub="Head of Ops" tone="amber" small />
        </div>
      </div>
      <div className="my-2 h-2 w-full" />
      <div className="grid w-full grid-cols-3 gap-2">
        <TeamPill label="Eric · Strong" tone="green" />
        <TeamPill label="Patrick · Med" tone="amber" />
        <TeamPill label="Yuzhe · At risk" tone="red" />
      </div>
    </div>
  );
}

function MiniRankList() {
  const rows: Array<{
    name: string;
    pct: number;
    tone: "green" | "amber" | "red";
    role: string;
  }> = [
    { name: "Luke Cai", pct: 94, tone: "green", role: "Product Manager" },
    { name: "Eric Li", pct: 89, tone: "green", role: "Engineering Lead" },
    { name: "Yijun Sim", pct: 81, tone: "amber", role: "Sr Engineer" },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div
          key={r.name}
          className="flex items-center gap-3 rounded-lg border border-[#1E1E24] bg-[#111118] px-3 py-2.5"
        >
          <span className="font-mono text-[10px] text-zinc-500">#{i + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">{r.name}</p>
            <p className="truncate text-[10px] text-zinc-500">{r.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#1E1E24]">
              <div
                className={`h-full ${
                  r.tone === "green"
                    ? "bg-emerald-500"
                    : r.tone === "amber"
                      ? "bg-amber-400"
                      : "bg-rose-500"
                }`}
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <span
              className={`font-mono text-xs ${
                r.tone === "green"
                  ? "text-emerald-300"
                  : r.tone === "amber"
                    ? "text-amber-300"
                    : "text-rose-300"
              }`}
            >
              {r.pct}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniScenarioCards() {
  const cards = [
    {
      letter: "A",
      label: "Lean",
      tone: "amber" as const,
      stat: "−31%",
    },
    {
      letter: "B",
      label: "Balanced",
      tone: "indigo" as const,
      stat: "−20%",
      recommended: true,
    },
    {
      letter: "C",
      label: "AI-Native",
      tone: "cyan" as const,
      stat: "−16%",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cards.map((c) => {
        const colors = {
          amber: "border-amber-500/40 bg-amber-500/[0.08] text-amber-300",
          indigo: "border-indigo-500/40 bg-indigo-500/[0.08] text-indigo-300",
          cyan: "border-cyan-500/40 bg-cyan-500/[0.08] text-cyan-300",
        }[c.tone];
        return (
          <div
            key={c.letter}
            className={`relative rounded-lg border p-3 text-center ${colors} ${
              c.recommended ? "shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]" : ""
            }`}
          >
            {c.recommended && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/50 bg-indigo-500/20 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-indigo-200">
                Rec
              </span>
            )}
            <p className="font-mono text-base font-bold">{c.letter}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest">
              {c.label}
            </p>
            <p className="mt-1 text-xs font-mono">{c.stat}</p>
          </div>
        );
      })}
    </div>
  );
}

function MiniRiskGrid() {
  const risks = [
    { label: "Leadership Coverage Gap", sev: "HIGH", tone: "red" as const },
    { label: "Single-Point-of-Failure", sev: "HIGH", tone: "red" as const },
    { label: "Management Burnout", sev: "MED", tone: "amber" as const },
  ];
  return (
    <div className="space-y-2">
      {risks.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-3 rounded-lg border border-[#1E1E24] bg-[#111118] px-3 py-2.5"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              r.tone === "red" ? "bg-rose-500" : "bg-amber-400"
            }`}
          />
          <span className="flex-1 truncate text-xs text-zinc-200">
            {r.label}
          </span>
          <span
            className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${
              r.tone === "red"
                ? "border-rose-500/40 bg-rose-500/[0.08] text-rose-300"
                : "border-amber-500/40 bg-amber-500/[0.08] text-amber-300"
            }`}
          >
            {r.sev}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Helpers */
function Node({
  label,
  sub,
  tone,
  small,
}: {
  label: string;
  sub: string;
  tone: "green" | "amber" | "red";
  small?: boolean;
}) {
  const dotColor =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-[#1E1E24] bg-[#111118] ${
        small ? "px-2.5 py-1.5" : "px-3 py-2"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <div className="leading-tight">
        <p
          className={`font-medium text-white ${
            small ? "text-[10px]" : "text-xs"
          }`}
        >
          {label}
        </p>
        <p className="text-[9px] text-zinc-500">{sub}</p>
      </div>
    </div>
  );
}

function TeamPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "amber" | "red";
}) {
  const colors = {
    green: "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300",
    amber: "border-amber-400/30 bg-amber-400/[0.08] text-amber-300",
    red: "border-rose-500/30 bg-rose-500/[0.08] text-rose-300",
  }[tone];
  return (
    <div
      className={`rounded-md border px-2 py-1.5 text-center text-[10px] font-medium ${colors}`}
    >
      {label}
    </div>
  );
}

function FitRow({
  name,
  pct,
  tone,
}: {
  name: string;
  pct: number;
  tone: "green" | "amber" | "red";
}) {
  const barColor =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  const pctColor =
    tone === "green"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : "text-rose-300";
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-300">{name}</span>
        <span className={`font-mono ${pctColor}`}>{pct}%</span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#1E1E24]">
        <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Live Demo (interactive)                     */
/* ─────────────────────────────────────────── */

interface DemoData {
  letter: ScenarioKey;
  name: string;
  tag: string;
  headcount: string;
  burn: string;
  risk: string;
  riskTone: "red" | "amber" | "green";
  accent: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  bars: Array<{
    label: string;
    value: number;
    after: string;
    tone: "green" | "amber" | "red";
  }>;
  insights: Array<{ tone: "good" | "warn" | "bad"; text: string }>;
  why: string;
}

const demos: Record<ScenarioKey, DemoData> = {
  A: {
    letter: "A",
    name: "Lean Efficiency",
    tag: "Aggressive cost reduction",
    headcount: "45 → 31 (−31%)",
    burn: "↓ 35%",
    risk: "HIGH",
    riskTone: "red",
    accent: "#f59e0b",
    accentText: "text-amber-300",
    accentBorder: "border-amber-500/40",
    accentBg: "bg-amber-500/[0.06]",
    bars: [
      { label: "Leadership Coverage", value: 41, after: "41%", tone: "red" },
      { label: "Execution Stability", value: 38, after: "Weak", tone: "red" },
      { label: "Adaptability", value: 44, after: "Reduced", tone: "amber" },
      { label: "Org Fragility", value: 30, after: "Severe", tone: "red" },
    ],
    insights: [
      { tone: "warn", text: "High execution risk — 3 critical roles lost" },
      { tone: "bad", text: "Leadership coverage drops to 41%" },
      { tone: "bad", text: "Operations fragility increases significantly" },
    ],
    why: "Lean Efficiency hits the burn target fast but at the cost of execution depth. Three critical product/ops roles are removed, and leadership coverage falls below the safe threshold.",
  },
  B: {
    letter: "B",
    name: "Balanced Redesign",
    tag: "Recommended path",
    headcount: "45 → 36 (−20%)",
    burn: "↓ 22%",
    risk: "LOW",
    riskTone: "green",
    accent: "#6366f1",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-500/40",
    accentBg: "bg-indigo-500/[0.06]",
    bars: [
      { label: "Leadership Coverage", value: 74, after: "74%", tone: "green" },
      { label: "Execution Stability", value: 82, after: "Strong", tone: "green" },
      { label: "Adaptability", value: 70, after: "Balanced", tone: "green" },
      { label: "Org Fragility", value: 68, after: "Reduced", tone: "green" },
    ],
    insights: [
      {
        tone: "good",
        text: "Leadership continuity maintained — Supriya Kumar elevated to VP Sales",
      },
      {
        tone: "good",
        text: "Execution reliability improved — Core product team preserved",
      },
      {
        tone: "warn",
        text: "Moderate adaptability gaps remain in Operations",
      },
    ],
    why: "Balanced Redesign preserves high-performing execution teams (Chifong, Eric, Luke, Lili Mao) while reducing structural redundancy and improving leadership coverage. Supriya Kumar's promotion closes a key succession gap.",
  },
  C: {
    letter: "C",
    name: "AI-Native",
    tag: "AI-augmented workflows",
    headcount: "45 → 38 (−16%)",
    burn: "Productivity ↑ 40%",
    risk: "MEDIUM",
    riskTone: "amber",
    accent: "#06b6d4",
    accentText: "text-cyan-300",
    accentBorder: "border-cyan-500/40",
    accentBg: "bg-cyan-500/[0.06]",
    bars: [
      { label: "Leadership Coverage", value: 62, after: "62%", tone: "amber" },
      { label: "Execution Stability", value: 58, after: "Medium", tone: "amber" },
      { label: "Adaptability", value: 88, after: "High (AI)", tone: "green" },
      { label: "Org Fragility", value: 50, after: "Transition", tone: "amber" },
    ],
    insights: [
      { tone: "good", text: "Highest productivity potential at 90-day mark" },
      {
        tone: "warn",
        text: "Highest transition risk — requires AI tooling adoption",
      },
      { tone: "warn", text: "4 roles restructured with AI augmentation" },
    ],
    why: "AI-Augmented bets on tooling-led leverage. Productivity peaks at +40% post-transition, but the org carries the highest change-management risk during the 90-day adoption window.",
  },
};

function LiveDemo() {
  const [active, setActive] = useState<ScenarioKey>("B");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  const d = demos[active];

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-[rgba(99,102,241,0.15)] bg-[#111118] p-1">
          {(["A", "B", "C"] as const).map((k) => {
            const isActive = active === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setActive(k)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
                style={
                  isActive
                    ? {
                        background: demos[k].accent,
                        boxShadow: `0 0 24px -6px ${demos[k].accent}`,
                      }
                    : undefined
                }
              >
                {k === "B" && (
                  <span className="recommended-badge absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/50 bg-indigo-500/25 px-2 py-0.5 text-[8.5px] font-semibold uppercase tracking-widest text-indigo-100">
                    Rec
                  </span>
                )}
                Scenario {k} — {demos[k].name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario header */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: org chart preview */}
        <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-[10px] font-medium uppercase tracking-widest ${d.accentText}`}>
                Scenario {d.letter}
              </p>
              <h3 className="mt-1 text-base font-semibold text-white">
                {d.name}
              </h3>
            </div>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                d.riskTone === "red"
                  ? "border-rose-500/40 bg-rose-500/[0.08] text-rose-300"
                  : d.riskTone === "amber"
                    ? "border-amber-500/40 bg-amber-500/[0.08] text-amber-300"
                    : "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300"
              }`}
            >
              Risk · {d.risk}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 border-y border-[#1E1E24] py-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Headcount
              </p>
              <p className="mt-1 font-mono text-sm text-zinc-200">
                {d.headcount}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Burn / Productivity
              </p>
              <p className="mt-1 font-mono text-sm text-emerald-300">
                {d.burn}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Tagline
              </p>
              <p className={`mt-1 text-xs ${d.accentText}`}>{d.tag}</p>
            </div>
          </div>

          {/* Mini org chart — 8 nodes */}
          <div className="mt-5 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-5">
            <DemoOrgChart scenario={active} />
          </div>
        </div>

        {/* Right: AI insights + why */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              AI Insights
            </p>
            <ul className="mt-3 space-y-3">
              {d.insights.map((it, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  {it.tone === "good" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  ) : it.tone === "warn" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  )}
                  <span className="text-sm text-zinc-200">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-2xl border ${d.accentBorder} ${d.accentBg} p-6`}
          >
            <p
              className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest ${d.accentText}`}
            >
              <Sparkles className="h-3 w-3" />
              Why Scenario {d.letter}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">
              {d.why}
            </p>
          </div>
        </div>
      </div>

      {/* Competency impact bars */}
      <div className="mt-5 rounded-2xl border border-[rgba(99,102,241,0.15)] bg-[#111118] p-6">
        <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
          Competency Impact — Scenario {d.letter}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {d.bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-zinc-300">{b.label}</span>
                <span
                  className={
                    b.tone === "green"
                      ? "text-emerald-300"
                      : b.tone === "amber"
                        ? "text-amber-300"
                        : "text-rose-300"
                  }
                >
                  {b.after}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className="h-full transition-[width] duration-[1100ms] ease-out"
                  style={{
                    width: animate ? `${b.value}%` : "0%",
                    background:
                      b.tone === "green"
                        ? "linear-gradient(90deg,#22c55e,#86efac)"
                        : b.tone === "amber"
                          ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                          : "linear-gradient(90deg,#ef4444,#fca5a5)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoOrgChart({ scenario }: { scenario: ScenarioKey }) {
  // 8 nodes per scenario
  type Mini = { name: string; role: string; tone: "green" | "amber" | "red" };
  const charts: Record<ScenarioKey, { ceo: Mini; row: Mini[]; leaves: Mini[] }> =
    {
      A: {
        ceo: { name: "Wenjing", role: "CEO", tone: "green" },
        row: [
          { name: "Chifong", role: "CTO", tone: "green" },
          { name: "Supriya", role: "Sales Lead", tone: "amber" },
          { name: "Lili", role: "Ops Lead", tone: "amber" },
        ],
        leaves: [
          { name: "Eric", role: "Eng Lead", tone: "green" },
          { name: "Luke", role: "PM", tone: "green" },
          { name: "Patrick", role: "AE", tone: "amber" },
          { name: "Support", role: "Solo", tone: "amber" },
        ],
      },
      B: {
        ceo: { name: "Wenjing", role: "CEO", tone: "green" },
        row: [
          { name: "Chifong", role: "CTO", tone: "green" },
          { name: "Supriya", role: "VP Sales", tone: "green" },
          { name: "Lili", role: "Head of Ops", tone: "green" },
        ],
        leaves: [
          { name: "Eric", role: "Eng Lead", tone: "green" },
          { name: "Luke", role: "PM", tone: "green" },
          { name: "Patrick", role: "AE", tone: "amber" },
          { name: "Mei", role: "SDR", tone: "amber" },
        ],
      },
      C: {
        ceo: { name: "Wenjing", role: "CEO", tone: "green" },
        row: [
          { name: "Chifong", role: "CTO · AI", tone: "green" },
          { name: "Supriya", role: "VP Sales · AI", tone: "green" },
          { name: "Lili", role: "Ops · AI", tone: "green" },
        ],
        leaves: [
          { name: "Eric", role: "Eng · AI", tone: "green" },
          { name: "Luke", role: "PM", tone: "green" },
          { name: "Patrick", role: "AE", tone: "amber" },
          { name: "AI Layer", role: "Automation", tone: "green" },
        ],
      },
    };
  const c = charts[scenario];
  return (
    <div className="flex flex-col items-center">
      <Node label={c.ceo.name} sub={c.ceo.role} tone={c.ceo.tone} small />
      <div className="my-2 h-3 w-px bg-[#1E1E24]" />
      <div className="grid w-full grid-cols-3 gap-3">
        {c.row.map((p) => (
          <div key={p.name} className="flex flex-col items-center">
            <Node label={p.name} sub={p.role} tone={p.tone} small />
          </div>
        ))}
      </div>
      <div className="my-2 h-3 w-px bg-[#1E1E24]" />
      <div className="grid w-full grid-cols-4 gap-2">
        {c.leaves.map((p) => (
          <Node key={p.name} label={p.name} sub={p.role} tone={p.tone} small />
        ))}
      </div>
    </div>
  );
}

function PageStyles() {
  return (
    <style>{`
      @keyframes recommendedPulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.6),
            0 0 20px -2px rgba(99, 102, 241, 0.5);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(99, 102, 241, 0),
            0 0 24px -2px rgba(99, 102, 241, 0.7);
        }
      }
      .recommended-badge {
        animation: recommendedPulse 2.2s ease-in-out infinite;
      }
    `}</style>
  );
}
