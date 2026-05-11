"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowRight, CheckCircle2, ClipboardList, Upload } from "lucide-react";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const companyTypes = [
  "SaaS",
  "Health Tech",
  "Fintech",
  "E-commerce",
  "Other",
];
const companySizes = ["1–10", "11–25", "26–50", "51–80", "81–150", "150+"];

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40";

export function IntakeClient() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Post-purchase intake
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Submit Your Team Context
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Help us understand your team so we can deliver your OrgLens
            report.
          </p>
        </div>

        {/* Form panel */}
        <section className="mt-12">
          <div className="rounded-3xl border border-[#1E1E24] bg-[#0F0F12] p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Team context
              </h2>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
              The more context you share, the more useful your report will be.
              All fields except website and file upload are required.
            </p>
            <IntakeForm />
          </div>
        </section>
      </div>
    </div>
  );
}

function IntakeForm() {
  const submit = useMutation(api.intakeSubmissions.submitIntake);

  const [founderName, setFounderName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [currentRoles, setCurrentRoles] = useState("");
  const [mainChallenge, setMainChallenge] = useState("");
  const [decision, setDecision] = useState("");
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!founderName.trim()) {
      setState({ kind: "error", message: "Please enter the founder name." });
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
    if (!companyType) {
      setState({ kind: "error", message: "Please select your company type." });
      return;
    }
    if (!companySize) {
      setState({ kind: "error", message: "Please select your company size." });
      return;
    }
    if (!currentRoles.trim()) {
      setState({
        kind: "error",
        message: "Please describe your current team roles.",
      });
      return;
    }
    if (!mainChallenge.trim()) {
      setState({
        kind: "error",
        message: "Please describe the main organizational challenge.",
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      await submit({
        founderName: founderName.trim(),
        email: trimmedEmail,
        company: company.trim(),
        website: website.trim() || undefined,
        companyType,
        companySize,
        currentRoles: currentRoles.trim(),
        mainChallenge: mainChallenge.trim(),
        decision: decision.trim() || undefined,
        fileName,
      });
      setState({ kind: "success" });
    } catch {
      setState({
        kind: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f?.name);
  }

  if (state.kind === "success") {
    return (
      <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-sm text-emerald-200">
        <p className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          Received. We&rsquo;ll begin your analysis and follow up by email.
        </p>
        <p className="mt-3 text-emerald-200/80">
          While you wait, you can{" "}
          <Link href="/app" className="underline hover:text-white">
            view the demo report
          </Link>{" "}
          for a preview of what your final report will look like.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
      <Field label="Founder name" htmlFor="intake-name">
        <input
          id="intake-name"
          type="text"
          required
          value={founderName}
          onChange={(e) => setFounderName(e.target.value)}
          placeholder="Alex Morgan"
          className={inputClasses}
        />
      </Field>

      <Field label="Email" htmlFor="intake-email">
        <input
          id="intake-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClasses}
        />
      </Field>

      <Field label="Company name" htmlFor="intake-company">
        <input
          id="intake-company"
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="NovaCloud Health"
          className={inputClasses}
        />
      </Field>

      <Field label="Company website (optional)" htmlFor="intake-website">
        <input
          id="intake-website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourcompany.com"
          className={inputClasses}
        />
      </Field>

      <Field label="Company type" htmlFor="intake-type">
        <select
          id="intake-type"
          required
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          className={inputClasses}
        >
          <option value="" disabled>
            Select company type
          </option>
          {companyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Company size" htmlFor="intake-size">
        <select
          id="intake-size"
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

      <div className="sm:col-span-2">
        <Field label="Current team roles" htmlFor="intake-roles">
          <textarea
            id="intake-roles"
            required
            value={currentRoles}
            onChange={(e) => setCurrentRoles(e.target.value)}
            rows={4}
            placeholder="List your key team members and their roles, e.g. CEO, CTO, Head of Sales..."
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Main organizational challenge" htmlFor="intake-challenge">
          <textarea
            id="intake-challenge"
            required
            value={mainChallenge}
            onChange={(e) => setMainChallenge(e.target.value)}
            rows={4}
            placeholder="What is the main team or org structure issue you're dealing with?"
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field
          label="What decision are you trying to make?"
          htmlFor="intake-decision"
        >
          <textarea
            id="intake-decision"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            rows={3}
            placeholder="e.g. restructuring, hiring, role clarity, leadership coverage..."
            className={`${inputClasses} resize-y`}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="intake-file"
          className="block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
        >
          Upload org chart, team list, or role descriptions (optional)
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-[#1E1E24] bg-[#111116] px-4 py-3 text-sm text-zinc-400">
          <Upload className="h-4 w-4 text-indigo-300" />
          <label
            htmlFor="intake-file"
            className="cursor-pointer text-indigo-300 hover:text-indigo-200"
          >
            Choose file
          </label>
          <input
            id="intake-file"
            type="file"
            accept=".pdf,.csv,application/pdf,text/csv"
            onChange={handleFileChange}
            className="sr-only"
          />
          <span className="truncate text-zinc-500">
            {fileName ?? "PDF or CSV accepted"}
          </span>
        </div>
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
          {state.kind === "submitting" ? "Submitting…" : "Submit Team Context"}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-xs text-zinc-500">
          Your context is only used to deliver your OrgLens report. We never
          share submission data with third parties.
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
