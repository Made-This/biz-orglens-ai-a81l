"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Users,
} from "lucide-react";

const FOUNDER_SNAPSHOT_CHECKOUT_URL =
  "https://grandiose-goshawk-617.convex.site/checkout/orglens-ai/md7aftkyt1kn4qx4mgpeg4w2ts86cse5";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function GetAnalysisClient() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Get your analysis
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get your OrgLens analysis.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Tell us about your team and we&rsquo;ll recommend the right report
            for your stage.
          </p>
        </div>

        {/* Three options */}
        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Which report is right for you?
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Founder Snapshot */}
            <OptionCard
              name="Founder Snapshot"
              price="$49"
              tagline="Fast read on team structure + role-fit signals"
              icon={Sparkles}
              features={[
                "Org map + role-fit summary",
                "Team structure risk flags",
                "Founder dependency signals",
              ]}
              tone="filled"
              ctaLabel="Get Founder Snapshot"
              ctaHref={FOUNDER_SNAPSHOT_CHECKOUT_URL}
              ctaExternal
              badge="Most Popular"
            />

            {/* Full OrgLens */}
            <OptionCard
              name="Full OrgLens Report"
              price="$249"
              tagline="Deep analysis with leadership coverage and recommendations"
              icon={ClipboardList}
              features={[
                "Full leadership coverage analysis",
                "Detailed competency pattern summary",
                "Prioritized recommendations",
              ]}
              tone="outline"
              ctaLabel="Run Full Analysis"
              ctaHref="/pricing"
            />

            {/* Founder Advisory */}
            <OptionCard
              name="Founder Advisory Review"
              price="From $999"
              tagline="Full report + 1:1 review session"
              icon={Calendar}
              features={[
                "Everything in Full OrgLens Report",
                "1:1 founder review session (60 min)",
                "30 / 60 / 90 day action plan",
              ]}
              tone="outline"
              anchorHref="#advisory-form"
              ctaLabel="Request Advisory Review"
            />
          </div>
        </section>

        {/* Advisory form */}
        <section id="advisory-form" className="mt-20 scroll-mt-24">
          <div className="rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Request a Founder Advisory Review
              </h2>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Tell us a little about your team and we&rsquo;ll be in touch to
              schedule your review. We typically respond within one business
              day.
            </p>
            <AdvisoryForm />
          </div>
        </section>

        {/* Not sure */}
        <section className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.08] to-[#0F0F12] p-10 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
            Not sure yet?
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start with the free demo report.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-zinc-400">
            No sign-up required.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400"
            >
              View Demo Report
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function OptionCard({
  name,
  price,
  tagline,
  icon: Icon,
  features,
  tone,
  ctaLabel,
  ctaHref,
  anchorHref,
  ctaExternal,
  badge,
}: {
  name: string;
  price: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  tone: "filled" | "outline";
  ctaLabel: string;
  ctaHref?: string;
  anchorHref?: string;
  ctaExternal?: boolean;
  badge?: string;
}) {
  const isFilled = tone === "filled";

  const cardClasses = isFilled
    ? "relative flex flex-col rounded-2xl border border-indigo-400/40 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-7 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]"
    : "relative flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7";

  const ctaClasses = isFilled
    ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
    : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-transparent px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/10 hover:text-white";

  return (
    <div className={cardClasses}>
      {badge && (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {badge}
        </span>
      )}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{name}</h3>
      <p className="mt-1 text-3xl font-bold tracking-tight text-white">{price}</p>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{tagline}</p>

      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-zinc-300">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {anchorHref ? (
        <a href={anchorHref} className={ctaClasses}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : ctaExternal && ctaHref ? (
        <a href={ctaHref} className={ctaClasses}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : ctaHref ? (
        <Link href={ctaHref} className={ctaClasses}>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

function AdvisoryForm() {
  const submit = useMutation(api.advisoryInquiries.submitAdvisoryInquiry);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      setState({ kind: "error", message: "Please enter your name." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState({ kind: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!company.trim()) {
      setState({ kind: "error", message: "Please enter your company." });
      return;
    }
    if (!teamSize) {
      setState({ kind: "error", message: "Please select your team size." });
      return;
    }

    setState({ kind: "submitting" });
    try {
      await submit({
        name: name.trim(),
        email: trimmedEmail,
        company: company.trim(),
        teamSize,
        message: message.trim() || undefined,
      });
      setState({ kind: "success" });
    } catch {
      setState({
        kind: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-sm text-emerald-200">
        <p className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          Thanks — we&rsquo;ll be in touch within 1 business day.
        </p>
        <p className="mt-3 text-emerald-200/80">
          Your request was received. While you wait, you can{" "}
          <Link href="/app" className="underline hover:text-white">
            view the demo report
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
      <Field label="Name" htmlFor="adv-name">
        <input
          id="adv-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Morgan"
          className={inputClasses}
        />
      </Field>

      <Field label="Email" htmlFor="adv-email">
        <input
          id="adv-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClasses}
        />
      </Field>

      <Field label="Company" htmlFor="adv-company">
        <input
          id="adv-company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="NovaCloud Health"
          className={inputClasses}
        />
      </Field>

      <Field label="Team size" htmlFor="adv-teamsize">
        <select
          id="adv-teamsize"
          required
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Select team size
          </option>
          <option value="10-20">10–20</option>
          <option value="20-50">20–50</option>
          <option value="50-100">50–100</option>
          <option value="100+">100+</option>
        </select>
      </Field>

      <div className="sm:col-span-2">
        <Field label="What would you like to focus on? (optional)" htmlFor="adv-message">
          <textarea
            id="adv-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="e.g. Preparing for our Series A, want to stress-test our leadership coverage."
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      {state.kind === "error" && (
        <p className="text-sm text-rose-400 sm:col-span-2">{state.message}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state.kind === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:opacity-60 sm:w-auto"
        >
          {state.kind === "submitting" ? "Sending…" : "Request Advisory Review"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-xs text-zinc-500">
          We&rsquo;ll only use your details to follow up about your OrgLens
          analysis. No sales lists, no spam.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40";
