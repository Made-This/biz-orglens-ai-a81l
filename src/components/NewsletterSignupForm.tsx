"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

type Props = {
  source: string;
  headline?: string;
  description?: string;
  /** compact=true → single row (email + button), no optional fields, no headline block. */
  compact?: boolean;
  className?: string;
};

const DEFAULT_HEADLINE =
  "Get monthly insights on AI, HR tech, and startup team design.";
const DEFAULT_DESCRIPTION =
  "Join the OrgLens newsletter for practical articles on organizational intelligence, role fit, team structure, and AI-powered people decisions for SaaS founders.";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "subscribed" }
  | { kind: "already" }
  | { kind: "error"; message: string };

export function NewsletterSignupForm({
  source,
  headline,
  description,
  compact = false,
  className,
}: Props) {
  const subscribe = useMutation(api.newsletter.subscribe);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState({ kind: "error", message: "Please enter a valid email address." });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const result = await subscribe({
        email: trimmedEmail,
        name: name.trim() || undefined,
        company: company.trim() || undefined,
        role: role.trim() || undefined,
        source,
      });
      if (result.alreadyExisted) {
        setState({ kind: "already" });
      } else {
        setState({ kind: "subscribed" });
      }
    } catch {
      setState({
        kind: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    }
  }

  // Success / already-subscribed states render a confirmation banner in place
  // of the form so the experience feels conclusive.
  if (state.kind === "subscribed" || state.kind === "already") {
    return (
      <div
        className={
          "rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5 text-sm text-emerald-200 " +
          (className ?? "")
        }
      >
        <p className="flex items-center gap-2 font-medium">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            ✓
          </span>
          {state.kind === "subscribed"
            ? "Thanks for subscribing. You'll receive monthly OrgLens insights and occasional product updates."
            : "You're already subscribed."}
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={className}>
        {headline && (
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
            {headline}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40"
          />
          <button
            type="submit"
            disabled={state.kind === "submitting"}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:opacity-60"
          >
            {state.kind === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {state.kind === "error" && (
          <p className="mt-2 text-xs text-rose-400">{state.message}</p>
        )}
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
          We&rsquo;ll only use your email to send OrgLens insights and occasional product updates. You can unsubscribe at any time.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        "rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 sm:p-8 " +
        (className ?? "")
      }
    >
      <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {headline ?? DEFAULT_HEADLINE}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {description ?? DEFAULT_DESCRIPTION}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label
            htmlFor={`newsletter-email-${source}`}
            className="sr-only"
          >
            Email address
          </label>
          <input
            id={`newsletter-email-${source}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            className="w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40"
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            aria-label="Company"
            className="w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your role / title"
            aria-label="Your role or title"
            className="w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40"
          />
        </div>
        <button
          type="submit"
          disabled={state.kind === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:opacity-60 sm:w-auto"
        >
          {state.kind === "submitting"
            ? "Subscribing…"
            : "Subscribe to Monthly Insights"}
        </button>
      </form>

      {state.kind === "error" && (
        <p className="mt-3 text-sm text-rose-400">{state.message}</p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        We&rsquo;ll only use your email to send OrgLens insights and occasional product updates. You can unsubscribe at any time.
      </p>
    </div>
  );
}

export default NewsletterSignupForm;
