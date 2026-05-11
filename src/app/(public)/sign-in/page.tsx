"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import {
  SignInValuePanel,
  ResponsibleAINote,
} from "@/components/auth-shared";

function isSafeRedirect(target: string | null): target is string {
  if (!target) return false;
  // Only allow relative same-origin paths
  return target.startsWith("/") && !target.startsWith("//");
}

function SignInInner() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const redirectParam = searchParams.get("redirect");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const safeRedirect = isSafeRedirect(redirectParam)
    ? redirectParam
    : "/app/demo";

  // After a successful sign-in, when auth state propagates, navigate to the
  // redirect target. This guards against the case where the form submit
  // resolves before useConvexAuth reflects the new session.
  useEffect(() => {
    if (submitted && !authLoading && isAuthenticated) {
      router.push(safeRedirect);
    }
  }, [submitted, authLoading, isAuthenticated, router, safeRedirect]);

  return (
    <div className="relative overflow-hidden px-4 py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — Value panel */}
        <SignInValuePanel />

        {/* Right — Sign-in card */}
        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-[#1E1E24] bg-[#111113] p-8 shadow-2xl shadow-black/40 md:p-10">
            <p className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
              Sign in
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Sign in to OrgLens
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Welcome back. Pick up where you left off on your organizational
              intelligence report.
            </p>

            <form
              className="mt-7 space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setLoading(true);
                const formData = new FormData(e.currentTarget);
                try {
                  await signIn("password", formData);
                  setSubmitted(true);
                  router.push(safeRedirect);
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-[#1E1E24] bg-[#0A0A0B] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/30"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <Link
                    href="/sign-up"
                    className="text-xs text-zinc-500 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
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
              {error && (
                <p className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-indigo-500/15 bg-indigo-500/[0.05] px-4 py-3 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-300" />
              <p>
                Use the same email you used at checkout so your payment, intake
                form, and report stay connected.
              </p>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-widest text-zinc-600">
              <span className="h-px flex-1 bg-[#1E1E24]" />
              Or
              <span className="h-px flex-1 bg-[#1E1E24]" />
            </div>

            {/* Continue to Full Demo */}
            <Link
              href="/app/demo"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-200 transition-all hover:bg-indigo-500/20 hover:text-white"
            >
              Continue to Full Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-2 text-center text-[11px] text-zinc-500">
              <Link
                href="/demo"
                className="text-zinc-500 underline-offset-2 hover:text-indigo-300 hover:underline"
              >
                Or browse the public demo preview
              </Link>{" "}
              · No login required
            </p>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link
                href={`/sign-up${
                  isSafeRedirect(redirectParam)
                    ? `?redirect=${encodeURIComponent(redirectParam)}`
                    : ""
                }`}
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Get started
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ResponsibleAINote />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-zinc-500">
          <span className="text-xs uppercase tracking-widest">Loading…</span>
        </div>
      }
    >
      <SignInInner />
    </Suspense>
  );
}
