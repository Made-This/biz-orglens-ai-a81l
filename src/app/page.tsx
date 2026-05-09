import Link from "next/link";
import {
  Network,
  Target,
  GitBranch,
  ShieldAlert,
  Check,
  ArrowRight,
} from "lucide-react";

const CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 antialiased">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#1E1E24] bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              OrgLens<span className="text-indigo-400">.</span>AI
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Features
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
              Analyze My Organization
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-700/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1E1E24] bg-[#111113] px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Decision intelligence
              </div>

              <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                Build a company that can execute under pressure.
              </h1>

              <p className="mt-6 max-w-2xl text-xl text-zinc-400">
                AI-powered organizational intelligence using competency science
                and behavioral analytics.
              </p>

              <p className="mt-3 max-w-2xl text-base text-zinc-500">
                Turn org charts into capability maps, role-fit insights, and
                restructuring decisions.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
                >
                  Analyze My Organization
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center rounded-full border border-[#1E1E24] bg-[#111113] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-zinc-700 hover:bg-[#16161A]"
                >
                  View Demo Scenario
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  No credit card required
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  Results in minutes
                </div>
              </div>
            </div>

            {/* Hero Visual — Mock Competency Org Map */}
            <div className="lg:col-span-6">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="relative border-t border-[#1E1E24]">
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
            {/* Card 1 */}
            <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Yesterday
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Traditional HR Systems
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                {[
                  "Store employee data",
                  "Static org charts",
                  "Passive dashboards",
                  "No decision support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-[#1E1E24] bg-[#111113] p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Yesterday
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Consulting Firms
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                {[
                  "Expensive engagements",
                  "Slow turnaround",
                  "Inaccessible for SMEs",
                  "No real-time insights",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 — highlighted */}
            <div className="relative rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.07] to-[#111113] p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]">
              <div className="absolute -top-3 right-6">
                <span className="rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-300 backdrop-blur">
                  Best fit
                </span>
              </div>
              <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
                Today
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                OrgLens AI
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                {[
                  "Competency intelligence",
                  "Instant restructuring scenarios",
                  "Role-fit ranking",
                  "Organizational risk visibility",
                  "Available in minutes, not months",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative border-t border-[#1E1E24]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Capabilities
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Four lenses. One decision.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 transition-colors hover:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <Network className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Competency Org Map
                </h3>
              </div>
              <p className="mt-4 text-sm text-zinc-400">
                Visualize leadership, execution, adaptability, and
                organizational resilience across your entire company.
              </p>
              <div className="mt-6 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-5">
                <FeatureMockOrgGrid />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 transition-colors hover:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Role–Competency Fit Engine
                </h3>
              </div>
              <p className="mt-4 text-sm text-zinc-400">
                Identify the best-fit candidates for critical roles using
                competency-based scoring and behavioral data.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-[#1E1E24] bg-[#0A0A0B]">
                <FeatureMockFitTable />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 transition-colors hover:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  AI Scenario Generator
                </h3>
              </div>
              <p className="mt-4 text-sm text-zinc-400">
                Compare restructuring scenarios before making high-stakes
                decisions. See the capability impact before you act.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {["Lean Efficiency", "Balanced Redesign", "AI-Native"].map(
                  (label, idx) => (
                    <div
                      key={label}
                      className={`rounded-lg border p-3 text-center text-[11px] font-medium ${
                        idx === 1
                          ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                          : "border-[#1E1E24] bg-[#0A0A0B] text-zinc-400"
                      }`}
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 transition-colors hover:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Organizational Risk Intelligence
                </h3>
              </div>
              <p className="mt-4 text-sm text-zinc-400">
                Detect leadership gaps, execution fragility, and team imbalance
                before they become organizational problems.
              </p>
              <div className="mt-6 space-y-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-5">
                <RiskBar label="Leadership" level="HIGH" widthPct={84} tone="red" />
                <RiskBar label="Execution" level="MED" widthPct={55} tone="amber" />
                <RiskBar label="Adaptability" level="LOW" widthPct={28} tone="green" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="relative border-t border-[#1E1E24] bg-[#0A0A0B]">
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

      {/* DEMO SCENARIO */}
      <section id="demo" className="relative border-t border-[#1E1E24]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Live Demo
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              See it in action.
            </h2>
          </div>

          {/* Company context card */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#1E1E24] bg-[#111113] p-6 md:p-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Scenario context
              </p>
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-4">
              <ContextStat label="Headcount" value="45" sub="SaaS startup" />
              <ContextStat label="Burn" value="$450K" sub="per month" />
              <ContextStat label="Runway" value="6 mo" sub="remaining" />
              <ContextStat
                label="Goal"
                value="−30%"
                sub="burn cut, no exec collapse"
              />
            </div>
          </div>

          {/* Scenario cards */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <ScenarioCard
              letter="A"
              name="Lean Efficiency"
              headcountDelta="-12"
              remaining="33 remaining"
              cost="-$180K/mo"
              risk="HIGH"
              riskTone="red"
              speed="Fast"
            />
            <ScenarioCard
              letter="B"
              name="Balanced Redesign"
              headcountDelta="-7"
              remaining="38 remaining"
              cost="-$105K/mo"
              risk="MEDIUM"
              riskTone="amber"
              speed="Moderate"
              recommended
            />
            <ScenarioCard
              letter="C"
              name="AI-Native"
              headcountDelta="-4"
              remaining="41 remaining"
              cost="-$60K/mo"
              risk="LOW"
              riskTone="green"
              speed="Slow"
            />
          </div>

          {/* Competency Impact */}
          <div className="mt-10 rounded-2xl border border-[#1E1E24] bg-[#111113] p-6 md:p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Competency impact — Scenario B
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <ImpactCell
                label="Leadership strength"
                status="Maintained"
                tone="green"
              />
              <ImpactCell
                label="Execution reliability"
                status="Reduced"
                tone="amber"
              />
              <ImpactCell label="Adaptability" status="Maintained" tone="green" />
              <ImpactCell label="Team stability" status="Risk" tone="red" />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
            >
              Run This Analysis on Your Organization
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative border-t border-[#1E1E24]">
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
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] p-10 shadow-[0_0_80px_-15px_rgba(99,102,241,0.5)]">
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

            <p className="mt-8 text-center text-sm text-zinc-500">
              Trusted by founders at Series A startups and PE-backed SMEs.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative border-t border-[#1E1E24] overflow-hidden">
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
              Start Your Analysis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1E1E24] bg-[#0A0A0B]">
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
                href="#features"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Features
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
              <Link
                href="/sign-up"
                className="text-sm text-zinc-400 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-zinc-500">
                Built for founders who make hard decisions.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#1E1E24] pt-6 sm:flex-row">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} OrgLens AI. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
              Competency science, made accessible.
            </p>
          </div>

          {/* Built with MadeThis */}
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

/* ────────────────────────────────────────────────────────────────────── */
/* Hero Visual: org chart + role-fit panel                                */
/* ────────────────────────────────────────────────────────────────────── */

function HeroVisual() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-indigo-500/10 blur-2xl" />

      <div className="relative grid gap-4 rounded-2xl border border-[#1E1E24] bg-[#111113] p-5 shadow-2xl shadow-indigo-900/20 md:p-6">
        {/* Top row meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              Organization · Capability Map
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
            <span className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {/* Org chart */}
          <div className="md:col-span-3 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-5">
            <OrgChartMock />

            {/* Legend */}
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#1E1E24] pt-4 text-[10px] text-zinc-500">
              <LegendDot color="bg-emerald-500" label="Leadership" />
              <LegendDot color="bg-indigo-400" label="Execution" />
              <LegendDot color="bg-amber-400" label="Adaptability" />
            </div>
          </div>

          {/* Role-fit panel */}
          <div className="md:col-span-2 rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">
              Role Fit Ranking
            </p>
            <p className="mt-1 text-xs text-zinc-400">VP of Engineering</p>

            <div className="mt-4 space-y-3">
              <FitRow name="Luke Cai" pct={92} tone="green" />
              <FitRow name="Eric Li" pct={89} tone="green" />
              <FitRow name="Patrick Wang" pct={81} tone="amber" />
            </div>

            <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-500/[0.08] p-3">
              <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-300">
                Insight
              </p>
              <p className="mt-1 text-xs text-zinc-300">
                Luke shows highest execution score under stress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrgChartMock() {
  return (
    <div className="flex flex-col items-center">
      {/* CEO */}
      <Node label="CEO" sub="Founder" tone="green" />

      {/* Connector */}
      <div className="my-2 h-4 w-px bg-[#1E1E24]" />

      {/* VPs */}
      <div className="relative flex w-full justify-around">
        <div className="absolute left-[8%] right-[8%] top-0 h-px bg-[#1E1E24]" />
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="VP Eng" sub="Luke" tone="green" small />
        </div>
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="VP Sales" sub="Eric" tone="amber" small />
        </div>
        <div className="flex flex-col items-center pt-2">
          <div className="-mt-2 h-2 w-px bg-[#1E1E24]" />
          <Node label="VP Ops" sub="Patrick" tone="red" small />
        </div>
      </div>

      {/* Connector to teams */}
      <div className="my-2 h-3 w-full" />
      <div className="grid w-full grid-cols-3 gap-2">
        <TeamPill label="Platform · 6" tone="green" />
        <TeamPill label="GTM · 5" tone="amber" />
        <TeamPill label="Ops · 3" tone="red" />
      </div>
    </div>
  );
}

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
      className={`flex items-center gap-2 rounded-lg border border-[#1E1E24] bg-[#111113] ${small ? "px-2.5 py-1.5" : "px-3 py-2"}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <div className="leading-tight">
        <p className={`font-medium text-white ${small ? "text-[10px]" : "text-xs"}`}>
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

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      <span>{label}</span>
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

/* ────────────────────────────────────────────────────────────────────── */
/* Feature mocks                                                          */
/* ────────────────────────────────────────────────────────────────────── */

function FeatureMockOrgGrid() {
  const grid: Array<"green" | "amber" | "red" | "muted"> = [
    "green",
    "green",
    "amber",
    "muted",
    "amber",
    "green",
    "red",
    "amber",
    "green",
    "amber",
    "red",
    "muted",
    "green",
    "amber",
    "amber",
    "green",
  ];
  const colorMap = {
    green: "bg-emerald-500/80",
    amber: "bg-amber-400/80",
    red: "bg-rose-500/80",
    muted: "bg-[#1E1E24]",
  };
  return (
    <div className="grid grid-cols-4 gap-2">
      {grid.map((tone, i) => (
        <div
          key={i}
          className={`aspect-square rounded ${colorMap[tone]}`}
        />
      ))}
    </div>
  );
}

function FeatureMockFitTable() {
  const rows = [
    { name: "Luke Cai", fit: "92%", strength: "Execution", gap: "—", tone: "green" },
    { name: "Eric Li", fit: "89%", strength: "Leadership", gap: "Adaptability", tone: "green" },
    { name: "Patrick Wang", fit: "81%", strength: "Structure", gap: "Drive", tone: "amber" },
  ] as const;
  return (
    <div className="text-xs">
      <div className="grid grid-cols-[1.2fr_0.6fr_1fr_1fr] gap-3 border-b border-[#1E1E24] px-4 py-2.5 text-[10px] uppercase tracking-widest text-zinc-500">
        <span>Name</span>
        <span>Fit</span>
        <span>Strength</span>
        <span>Gap</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-[1.2fr_0.6fr_1fr_1fr] items-center gap-3 border-b border-[#1E1E24] px-4 py-3 last:border-0"
        >
          <span className="text-zinc-200">{row.name}</span>
          <span
            className={`font-mono ${row.tone === "green" ? "text-emerald-300" : "text-amber-300"}`}
          >
            {row.fit}
          </span>
          <span className="text-zinc-400">{row.strength}</span>
          <span className="text-zinc-500">{row.gap}</span>
        </div>
      ))}
    </div>
  );
}

function RiskBar({
  label,
  level,
  widthPct,
  tone,
}: {
  label: string;
  level: string;
  widthPct: number;
  tone: "green" | "amber" | "red";
}) {
  const barColor =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  const labelColor =
    tone === "green"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : "text-rose-300";
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${labelColor}`}>
          {level}
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#1E1E24]">
        <div className={`h-full ${barColor}`} style={{ width: `${widthPct}%` }} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* Demo Scenario components                                               */
/* ────────────────────────────────────────────────────────────────────── */

function ContextStat({
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
      <p className="mt-1 text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </div>
  );
}

function ScenarioCard({
  letter,
  name,
  headcountDelta,
  remaining,
  cost,
  risk,
  riskTone,
  speed,
  recommended,
}: {
  letter: string;
  name: string;
  headcountDelta: string;
  remaining: string;
  cost: string;
  risk: string;
  riskTone: "green" | "amber" | "red";
  speed: string;
  recommended?: boolean;
}) {
  const riskColors = {
    green: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/30",
    red: "text-rose-300 bg-rose-500/10 border-rose-500/30",
  }[riskTone];

  return (
    <div
      className={`relative rounded-2xl border p-6 transition-colors ${
        recommended
          ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.08] to-[#111113] shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)]"
          : "border-[#1E1E24] bg-[#111113]"
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-indigo-300 backdrop-blur">
            Recommended
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1E1E24] bg-[#0A0A0B] text-xs font-mono text-zinc-400">
          {letter}
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${riskColors}`}
        >
          Risk · {risk}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{name}</h3>

      <div className="mt-6 space-y-3 text-sm">
        <Row label="Headcount" value={`${headcountDelta} (${remaining})`} />
        <Row label="Cost impact" value={cost} valueColor="text-emerald-300" />
        <Row label="Speed" value={speed} />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#1E1E24] pt-3 first:border-0 first:pt-0">
      <span className="text-zinc-500">{label}</span>
      <span className={`font-mono ${valueColor ?? "text-zinc-200"}`}>
        {value}
      </span>
    </div>
  );
}

function ImpactCell({
  label,
  status,
  tone,
}: {
  label: string;
  status: string;
  tone: "green" | "amber" | "red";
}) {
  const dot =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-400"
        : "bg-rose-500";
  const text =
    tone === "green"
      ? "text-emerald-300"
      : tone === "amber"
        ? "text-amber-300"
        : "text-rose-300";
  return (
    <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0B] p-4">
      <p className="text-[11px] uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <span className={`text-sm font-medium ${text}`}>{status}</span>
      </div>
    </div>
  );
}
