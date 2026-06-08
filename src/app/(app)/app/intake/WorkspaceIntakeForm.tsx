"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Upload,
} from "lucide-react";
import { ResponsibleAINote } from "@/components/auth-shared";

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#0A0A0B] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30";

const COMPANY_TYPES = [
  "B2B SaaS",
  "Health Tech",
  "Fintech",
  "Consumer",
  "Other",
];
const COMPANY_SIZES = ["1–10", "11–25", "26–50", "51–100", "100+"];
const FUNDING_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Series B+",
  "Bootstrapped",
];

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function WorkspaceIntakeForm() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isLoading, isAuthenticated, router]);

  const user = useQuery(api.users.getCurrent, isAuthenticated ? {} : "skip");
  const existing = useQuery(
    api.intakeSubmissions.getMyIntake,
    isAuthenticated ? {} : "skip"
  );
  const submitIntake = useMutation(
    api.intakeSubmissions.submitWorkspaceIntake
  );

  const [founderName, setFounderName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [leadershipTeam, setLeadershipTeam] = useState("");
  const [currentRoles, setCurrentRoles] = useState("");
  const [reportingStructure, setReportingStructure] = useState("");
  const [keyDepartments, setKeyDepartments] = useState("");
  const [openRoles, setOpenRoles] = useState("");
  const [decisionContext, setDecisionContext] = useState("");
  const [restructuringContext, setRestructuringContext] = useState("");
  const [teamChallenges, setTeamChallenges] = useState("");
  const [founderDependency, setFounderDependency] = useState("");
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>({ kind: "idle" });

  // Prefill email from authenticated user (one-time, when user loads).
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
    if (user?.name && !founderName) {
      setFounderName(user.name);
    }
  }, [user, email, founderName]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
        <span className="text-xs uppercase tracking-widest">Loading…</span>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!founderName.trim()) {
      setState({ kind: "error", message: "Please enter your name." });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState({ kind: "error", message: "Please enter a valid email." });
      return;
    }
    if (!companyName.trim()) {
      setState({ kind: "error", message: "Please enter your company name." });
      return;
    }
    if (!decisionContext.trim()) {
      setState({
        kind: "error",
        message: "Please describe the decision you're trying to make.",
      });
      return;
    }
    if (!teamChallenges.trim()) {
      setState({
        kind: "error",
        message: "Please describe your biggest team challenges.",
      });
      return;
    }
    if (!consent) {
      setState({
        kind: "error",
        message:
          "Please confirm the consent statement before submitting your intake.",
      });
      return;
    }

    setState({ kind: "submitting" });
    try {
      await submitIntake({
        founderName: founderName.trim(),
        email: trimmedEmail,
        companyName: companyName.trim(),
        companyWebsite: companyWebsite.trim() || undefined,
        companyType: companyType || undefined,
        industry: industry.trim() || undefined,
        companySize: companySize || undefined,
        fundingStage: fundingStage || undefined,
        leadershipTeam: leadershipTeam.trim() || undefined,
        currentRoles: currentRoles.trim() || undefined,
        reportingStructure: reportingStructure.trim() || undefined,
        keyDepartments: keyDepartments.trim() || undefined,
        openRoles: openRoles.trim() || undefined,
        decisionContext: decisionContext.trim(),
        restructuringContext: restructuringContext.trim() || undefined,
        teamChallenges: teamChallenges.trim(),
        founderDependency: founderDependency.trim() || undefined,
        fileName,
      });
      setState({ kind: "success" });
    } catch (err) {
      setState({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f?.name);
  }

  if (state.kind === "success") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-8 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
            Your intake has been submitted.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300">
            We&apos;ll review your company context and prepare your OrgLens
            report.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/app/status"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
            >
              View Report Status
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/app/workspace"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
            >
              Back to Workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ResponsibleAINote className="mt-12" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
            <ClipboardList className="h-5 w-5" />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
            Intake form
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          OrgLens Intake Form
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Share your company and team context so OrgLens can prepare a useful
          organizational intelligence report.
        </p>

        {existing && (
          <div className="mt-5 rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-3 text-xs text-zinc-300">
            You&apos;ve already submitted an intake. Resubmitting will create a
            new submission. Visit{" "}
            <Link
              href="/app/status"
              className="font-medium text-indigo-300 hover:text-indigo-200"
            >
              Report Status
            </Link>{" "}
            to track your existing submission.
          </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1 — Company basics */}
        <FormSection
          number="1"
          title="Company basics"
          description="The essentials about your company — used to anchor the analysis."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Founder name" required htmlFor="founderName">
              <input
                id="founderName"
                type="text"
                required
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Alex Morgan"
                className={inputClasses}
              />
            </Field>
            <Field label="Email" required htmlFor="email">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClasses}
              />
            </Field>
            <Field label="Company name" required htmlFor="companyName">
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
            <Field label="Company website" htmlFor="companyWebsite">
              <input
                id="companyWebsite"
                type="text"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                placeholder="https://yourcompany.com"
                className={inputClasses}
              />
            </Field>
            <Field label="Company type" htmlFor="companyType">
              <select
                id="companyType"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select…</option>
                {COMPANY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Industry" htmlFor="industry">
              <input
                id="industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. clinic workflow software"
                className={inputClasses}
              />
            </Field>
            <Field label="Company size" htmlFor="companySize">
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
            <Field label="Funding stage" htmlFor="fundingStage">
              <select
                id="fundingStage"
                value={fundingStage}
                onChange={(e) => setFundingStage(e.target.value)}
                className={inputClasses}
              >
                <option value="">Select…</option>
                {FUNDING_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FormSection>

        {/* Section 2 — Team structure */}
        <FormSection
          number="2"
          title="Team structure"
          description="Help us understand who's on your team and how they're organized."
        >
          <Field
            label="Leadership team members"
            htmlFor="leadershipTeam"
            hint="Name, role, tenure"
          >
            <textarea
              id="leadershipTeam"
              value={leadershipTeam}
              onChange={(e) => setLeadershipTeam(e.target.value)}
              rows={4}
              placeholder="Jordan Lee — CTO (3y), Casey Miller — Head of Ops (2y)..."
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field label="Current roles" htmlFor="currentRoles">
            <textarea
              id="currentRoles"
              value={currentRoles}
              onChange={(e) => setCurrentRoles(e.target.value)}
              rows={4}
              placeholder="Engineering, Sales, Customer Success, Ops..."
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field
            label="Reporting structure"
            htmlFor="reportingStructure"
          >
            <textarea
              id="reportingStructure"
              value={reportingStructure}
              onChange={(e) => setReportingStructure(e.target.value)}
              rows={3}
              placeholder="Who reports to whom? Any matrixed reporting?"
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field label="Key departments" htmlFor="keyDepartments">
            <input
              id="keyDepartments"
              type="text"
              value={keyDepartments}
              onChange={(e) => setKeyDepartments(e.target.value)}
              placeholder="Engineering · Product · Sales · Ops"
              className={inputClasses}
            />
          </Field>
          <Field
            label="Open roles or planned hires"
            htmlFor="openRoles"
          >
            <textarea
              id="openRoles"
              value={openRoles}
              onChange={(e) => setOpenRoles(e.target.value)}
              rows={3}
              placeholder="VP Engineering, Sr. Product Designer, Head of CS..."
              className={`${inputClasses} resize-y`}
            />
          </Field>
        </FormSection>

        {/* Section 3 — Decision context */}
        <FormSection
          number="3"
          title="Decision context"
          description="The decision you're trying to make and the challenges you're facing."
        >
          <Field
            label="What decision are you trying to make?"
            required
            htmlFor="decisionContext"
          >
            <textarea
              id="decisionContext"
              required
              value={decisionContext}
              onChange={(e) => setDecisionContext(e.target.value)}
              rows={3}
              placeholder="e.g. should we restructure leadership before our next fundraise?"
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field
            label="Are you hiring, restructuring, preparing to scale, or clarifying ownership?"
            htmlFor="restructuringContext"
          >
            <textarea
              id="restructuringContext"
              value={restructuringContext}
              onChange={(e) => setRestructuringContext(e.target.value)}
              rows={3}
              placeholder="Describe the kind of org change you're considering."
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field
            label="What are the biggest team challenges right now?"
            required
            htmlFor="teamChallenges"
          >
            <textarea
              id="teamChallenges"
              required
              value={teamChallenges}
              onChange={(e) => setTeamChallenges(e.target.value)}
              rows={3}
              placeholder="Where execution is slowing down, where decisions get stuck, etc."
              className={`${inputClasses} resize-y`}
            />
          </Field>
          <Field
            label="Where do you feel founder dependency or bottlenecks?"
            htmlFor="founderDependency"
          >
            <textarea
              id="founderDependency"
              value={founderDependency}
              onChange={(e) => setFounderDependency(e.target.value)}
              rows={3}
              placeholder="Which decisions or tasks still route through you?"
              className={`${inputClasses} resize-y`}
            />
          </Field>
        </FormSection>

        {/* Optional uploads */}
        <FormSection
          number="4"
          title="Optional uploads"
          description="Org chart, team list, role descriptions, or notes."
        >
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-[#1E1E24] bg-[#0A0A0B] px-4 py-3 text-sm text-zinc-400">
            <Upload className="h-4 w-4 text-indigo-300" />
            <label
              htmlFor="intake-file"
              className="cursor-pointer font-medium text-indigo-300 hover:text-indigo-200"
            >
              Choose file
            </label>
            <input
              id="intake-file"
              type="file"
              accept=".pdf,.csv,.txt,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="sr-only"
            />
            <span className="truncate text-zinc-500">
              {fileName ?? "PDF, CSV, TXT, DOCX, or image"}
            </span>
          </div>

          <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-500/20 bg-amber-500/[0.06] px-3 py-2 text-xs leading-relaxed text-amber-200/90">
            <span aria-hidden="true" className="mt-0.5 text-amber-300">
              ⚠
            </span>
            <span>
              Please do not upload sensitive personal information unless it is
              necessary for the analysis and you have authorization to share
              it.
            </span>
          </p>
        </FormSection>

        {/* Consent */}
        <div className="rounded-2xl border border-[#1E1E24] bg-[#111118] p-5 md:p-6">
          <label
            htmlFor="intake-consent"
            className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-300"
          >
            <input
              id="intake-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border border-[#2A2A33] bg-[#0A0A0B] text-indigo-500 accent-indigo-500 focus:ring-1 focus:ring-indigo-400/40"
              required
              aria-required="true"
            />
            <span>
              I confirm that I have the right to submit this company and team
              information for analysis, and that I will use the OrgLens report
              as decision support rather than as the sole basis for employment
              decisions.
              <span className="ml-1 text-rose-400">*</span>
            </span>
          </label>
        </div>

        {state.kind === "error" && (
          <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {state.message}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={state.kind === "submitting" || !consent}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state.kind === "submitting" ? "Submitting…" : "Submit Intake"}
            {state.kind !== "submitting" && (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
          <Link
            href="/app/workspace"
            className="text-xs font-medium text-zinc-500 hover:text-indigo-300"
          >
            Cancel
          </Link>
        </div>
      </form>

      <ResponsibleAINote className="mt-16" />
    </div>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#1E1E24] bg-[#111118] p-6 md:p-8">
      <header className="mb-6 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-indigo-500/40 bg-indigo-500/10 text-xs font-mono font-semibold text-indigo-300">
          {number}
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            {description}
          </p>
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
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
        {hint && (
          <span className="ml-2 normal-case tracking-normal text-zinc-600">
            ({hint})
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
