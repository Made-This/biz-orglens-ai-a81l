"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowRight, Calendar, CheckCircle2, Users } from "lucide-react";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const included = [
  "Full OrgLens Report",
  "60-minute founder review session",
  "Structured action plan",
  "Hiring, restructuring, and leadership coverage recommendations",
  "Optional follow-up session",
];

const companySizes = ["1–10", "11–25", "26–50", "51–80", "81–150", "150+"];
const contactMethods = ["Email", "Video call", "Phone"];

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40";

export function AdvisoryRequestClient() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Founder Advisory
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Founder Advisory Review
          </h1>
          <p className="mt-3 text-base font-medium text-indigo-300">
            Starting at $999
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Work directly with the OrgLens team on a full organizational
            intelligence review, a live founder session, and a structured
            action plan.
          </p>
        </div>

        {/* What's included */}
        <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
              <Calendar className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              What&rsquo;s included
            </h2>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Request form */}
        <section className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Request your review
              </h2>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Tell us about your team and the decision you&rsquo;re working
              through. We&rsquo;ll be in touch within 2 business days to
              schedule next steps.
            </p>
            <AdvisoryForm />
          </div>
        </section>

        {/* Trust copy */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 text-center">
          <p className="text-sm leading-relaxed text-zinc-400">
            OrgLens reports are designed to support founder judgment, not
            replace it. Reports should be used as decision-support tools, not
            as the sole basis for hiring, firing, promotion, compensation, or
            other employment decisions.
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Read our full{" "}
            <Link
              href="/responsible-ai"
              className="text-indigo-300 hover:text-indigo-200"
            >
              Responsible AI commitment
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function AdvisoryForm() {
  const submit = useMutation(api.advisoryRequests.submitAdvisoryRequest);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [teamChallenge, setTeamChallenge] = useState("");
  const [decision, setDecision] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      setState({ kind: "error", message: "Please enter your name." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState({
        kind: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!company.trim()) {
      setState({ kind: "error", message: "Please enter your company name." });
      return;
    }
    if (!roleTitle.trim()) {
      setState({ kind: "error", message: "Please enter your role / title." });
      return;
    }
    if (!companySize) {
      setState({ kind: "error", message: "Please select a company size." });
      return;
    }
    if (!teamChallenge.trim()) {
      setState({
        kind: "error",
        message: "Please describe your team challenge.",
      });
      return;
    }
    if (!preferredContact) {
      setState({
        kind: "error",
        message: "Please select a preferred contact method.",
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      await submit({
        name: name.trim(),
        email: trimmedEmail,
        company: company.trim(),
        roleTitle: roleTitle.trim(),
        companySize,
        teamChallenge: teamChallenge.trim(),
        decision: decision.trim() || undefined,
        preferredContact,
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
      <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-sm text-emerald-200">
        <p className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          We&rsquo;ll be in touch within 2 business days.
        </p>
        <p className="mt-3 text-emerald-200/80">
          Your advisory review request was received. While you wait, you can{" "}
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

      <Field label="Company name" htmlFor="adv-company">
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

      <Field label="Role / title" htmlFor="adv-role">
        <input
          id="adv-role"
          type="text"
          required
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder="Co-founder & CEO"
          className={inputClasses}
        />
      </Field>

      <Field label="Company size" htmlFor="adv-size">
        <select
          id="adv-size"
          required
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Select company size
          </option>
          {companySizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Preferred contact method" htmlFor="adv-contact">
        <select
          id="adv-contact"
          required
          value={preferredContact}
          onChange={(e) => setPreferredContact(e.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Select contact method
          </option>
          {contactMethods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      <div className="sm:col-span-2">
        <Field
          label="Brief description of team challenge"
          htmlFor="adv-challenge"
        >
          <textarea
            id="adv-challenge"
            required
            value={teamChallenge}
            onChange={(e) => setTeamChallenge(e.target.value)}
            rows={4}
            placeholder="e.g. We're scaling from 25 to 60 in 9 months and the founding team is stretched across too many roles."
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          label="What decision are you trying to make? (optional)"
          htmlFor="adv-decision"
        >
          <textarea
            id="adv-decision"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            rows={3}
            placeholder="e.g. Whether to hire a Head of Engineering or restructure the existing team."
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
          {state.kind === "submitting"
            ? "Sending…"
            : "Request Advisory Review"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-xs text-zinc-500">
          We&rsquo;ll only use your details to follow up about your advisory
          review. No sales lists, no spam.
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
