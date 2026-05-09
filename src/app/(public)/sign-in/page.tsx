"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleStartDemo() {
    try {
      window.localStorage.setItem("orglens_demo_mode", "true");
    } catch {
      // localStorage might be blocked in rare configurations — push anyway.
    }
    router.push("/app");
  }

  function handleScrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Give the scroll a moment, then focus.
    setTimeout(() => emailRef.current?.focus(), 400);
  }

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Demo / no-login CTA section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-indigo-300">
            <Sparkles className="h-3 w-3" />
            Live demo
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Try OrgLens AI —
            <br />
            <span className="bg-gradient-to-r from-indigo-300 to-indigo-500 bg-clip-text text-transparent">
              No Account Needed
            </span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Explore the full product with sample HUCAMA-backed company data.
            No sign-up, no credit card.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleStartDemo}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_60px_-5px_rgba(99,102,241,0.9)]"
          >
            Try Demo — No Login Required
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={handleScrollToForm}
            className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#1E1E24] bg-transparent px-6 py-2.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            Continue with Sign In
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Visual separator */}
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#1E1E24]" />
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-600">
            or sign in with your account
          </span>
          <span className="h-px flex-1 bg-[#1E1E24]" />
        </div>

        {/* Existing sign-in form */}
        <div
          ref={formRef}
          className="mt-6 scroll-mt-8 rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 shadow-2xl shadow-black/40"
        >
          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              setLoading(true);
              const formData = new FormData(e.currentTarget);
              try {
                await signIn("password", formData);
                router.push("/app");
              } catch {
                setError("Invalid email or password. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email
              </Label>
              <Input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="border-[#1E1E24] bg-[#0A0A0B] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
                className="border-[#1E1E24] bg-[#0A0A0B] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
              />
            </div>
            <input name="flow" type="hidden" value="signIn" />
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
