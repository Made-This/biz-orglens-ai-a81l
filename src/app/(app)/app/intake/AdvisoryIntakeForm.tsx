"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@convex/_generated/api";
import { CheckCircle2, ArrowRight, ClipboardList } from "lucide-react";

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30";

const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–500", "500+"];
const STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Bootstrapped",
];

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function AdvisoryIntakeForm({
  sessionId,
}: {
  sessionId: string;
}) {
  const submitAndNotify = useAction(
    api.advisoryIntakesActions.submitAndNotify
  );

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [stage, setStage] = useState("");
  const [primaryChallenge, setPrimaryChallenge] = useState("");
  const [orgStructure, setOrgStructure] = useState("");
  const [successOutcome, setSuccessOutcome] = useState("");
  const [preferredTiming, setPreferredTiming] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [formState, setFormState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!companyName.trim()) {
      setFormState({ kind: "error", message: "Company name is required." });
      return;
    }
    if (!role.trim()) {
      setFormState({ kind: "error", message: "Your role / title is required." });
      return;
    }
    if (!companySize) {
      setFormState({ kind: "error", message: "Please select a company size." });
      return;
    }
    if (!stage) {
      setFormState({ kind: "error", message: "Please select your funding stage." });
      return;
    }
    if (!primaryChallenge.trim()) {
      setFormState({
        kind: "error",
        message: "Please describe the primary challenge for this session.",
      });
      return;
    }
    if (!successOutcome.trim()) {
      setFormState({
        kind: "error",
        message: "Please describe what a successful session looks like.",
      });
      return;
    }

    setFormState({ kind: "submitting" });
    try {
      await submitAndNotify({
        sessionId,
        companyName: companyName.trim(),
        role: role.trim(),
        companySize,
        stage,
        primaryChallenge: primaryChallenge.trim(),
        orgStructure: orgStructure.trim() || undefined,
        successOutcome: successOutcome.trim(),
        preferredTiming: preferredTiming.trim() || undefined,
        additionalNotes: additionalNotes.trim() || undefined,
      });
      setFormState({ kind: "success" });
    } catch (err) {
      setFormState({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  if (formState.kind === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-8 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
            We&apos;ve received your intake.
          </h1>
          <p className="mt-3 max-w-md mx-auto text-sm leading-relaxed text-zinc-300">
            Expect a calendar invite within 24 hours. We look forward to your session.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
            <ClipboardList className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Pre-Session Intake
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Founder Advisory Review — Pre-Session Intake
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
          This helps us prepare a focused, high-value session for you. Takes 5
          minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company + Role */}
        <div className="rounded-2xl border border-[#1E1E24] bg-[#111118] p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company name" htmlFor="companyName" required>
              <input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="NovaCloud Health"
                className={inputClasses}
              />
            </Field>
            <Field label="Your role / title" htmlFor="role" required>
              <input
                id="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="CEO & Co-founder"
                className={inputClasses}
              />
            </Field>
            <Field label="Company size" htmlFor="companySize" required>
              <select
                id="companySize"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select…</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Stage" htmlFor="stage" required>
              <select
                id="stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select…</option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        {/* Session context */}
        <div className="rounded-2xl border border-[#1E1E24] bg-[#111118] p-6 md:p-8 space-y-4">
          <Field
            label="What's the primary challenge you're bringing to this session?"
            htmlFor="primaryChallenge"
            required
          >
            <textarea
              id="primaryChallenge"
              required
              rows={3}
              value={primaryChallenge}
              onChange={(e) => setPrimaryChallenge(e.target.value)}
              placeholder="e.g. We're pre-Series A and unsure how to structure the leadership layer before scaling."
              className={`${inputClasses} resize-y`}
            />
          </Field>

          <Field
            label="What does your current org structure look like?"
            htmlFor="orgStructure"
          >
            <textarea
              id="orgStructure"
              rows={2}
              value={orgStructure}
              onChange={(e) => setOrgStructure(e.target.value)}
              placeholder="e.g. flat, functional, matrix; list key roles if helpful"
              className={`${inputClasses} resize-y`}
            />
          </Field>

          <Field
            label="What outcome would make this session a success for you?"
            htmlFor="successOutcome"
            required
          >
            <textarea
              id="successOutcome"
              required
              rows={2}
              value={successOutcome}
              onChange={(e) => setSuccessOutcome(e.target.value)}
              placeholder="e.g. A clear recommendation on whether to hire a COO now or wait."
              className={`${inputClasses} resize-y`}
            />
          </Field>

          <Field
            label="Preferred session timing"
            htmlFor="preferredTiming"
          >
            <input
              id="preferredTiming"
              type="text"
              value={preferredTiming}
              onChange={(e) => setPreferredTiming(e.target.value)}
              placeholder="e.g. weekdays 9am–12pm PT, or flexible"
              className={inputClasses}
            />
          </Field>

          <Field
            label="Anything else we should know?"
            htmlFor="additionalNotes"
          >
            <textarea
              id="additionalNotes"
              rows={2}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional context, constraints, or goals."
              className={`${inputClasses} resize-y`}
            />
          </Field>
        </div>

        {formState.kind === "error" && (
          <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {formState.message}
          </p>
        )}

        <button
          type="submit"
          disabled={formState.kind === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {formState.kind === "submitting" ? "Submitting…" : "Submit Intake"}
          {formState.kind !== "submitting" && (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
      >
        {label}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
