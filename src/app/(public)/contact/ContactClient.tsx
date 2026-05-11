"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { ArrowRight, CheckCircle2, Mail, MessageSquare } from "lucide-react";

const inputClasses =
  "w-full rounded-lg border border-[#1E1E24] bg-[#111116] px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/40";

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const SUPPORT_EMAIL = "team@orglens-ai.madethis.app";

const USE_CASES = [
  "General questions",
  "Data deletion requests",
  "Refund requests",
  "Partnership inquiries",
];

export function ContactClient() {
  const submit = useMutation(api.contact.submitContact);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
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
      setState({
        kind: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!subject.trim()) {
      setState({ kind: "error", message: "Please enter a subject." });
      return;
    }
    if (!message.trim()) {
      setState({ kind: "error", message: "Please enter a message." });
      return;
    }

    setState({ kind: "submitting" });
    try {
      await submit({
        name: name.trim(),
        email: trimmedEmail,
        subject: subject.trim(),
        message: message.trim(),
      });
      setState({ kind: "success" });
    } catch {
      setState({
        kind: "error",
        message: "Something went wrong. Please try again in a moment.",
      });
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact OrgLens AI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            We typically respond within 1–2 business days.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Left column — contact info */}
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Email
                </p>
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-4 block break-words text-base font-medium text-indigo-300 hover:text-indigo-200"
              >
                {SUPPORT_EMAIL}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                We typically respond within 1–2 business days.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                What you can reach us about
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                {USE_CASES.map((u) => (
                  <li key={u} className="flex items-start gap-2.5">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 text-xs leading-relaxed text-zinc-500">
              For data deletion requests, please confirm the email address on
              the account you&rsquo;d like deleted. We will respond within 30
              days.
            </div>
          </aside>

          {/* Right column — form */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-7 md:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/30">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                  Send us a message
                </h2>
              </div>

              {state.kind === "success" ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 text-sm text-emerald-200">
                  <p className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    Your message has been received.
                  </p>
                  <p className="mt-3 text-emerald-200/80">
                    We&rsquo;ll respond within 1–2 business days.
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 hover:text-white"
                  >
                    Back to home
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                >
                  <Field label="Name" htmlFor="contact-name">
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className={inputClasses}
                    />
                  </Field>

                  <Field label="Email" htmlFor="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className={inputClasses}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Subject" htmlFor="contact-subject">
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Data deletion request"
                        className={inputClasses}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="Message" htmlFor="contact-message">
                      <textarea
                        id="contact-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        placeholder="How can we help?"
                        className={`${inputClasses} resize-y`}
                      />
                    </Field>
                  </div>

                  {state.kind === "error" && (
                    <p className="text-sm text-rose-400 sm:col-span-2">
                      {state.message}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={state.kind === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400 disabled:opacity-60 sm:w-auto"
                    >
                      {state.kind === "submitting"
                        ? "Sending…"
                        : "Send Message"}
                      {state.kind !== "submitting" && (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
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
        className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
