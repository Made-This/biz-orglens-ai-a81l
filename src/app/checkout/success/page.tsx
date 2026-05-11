"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { ResponsibleAINote } from "@/components/auth-shared";

interface OrderInfo {
  productName?: string;
  productId?: string;
  amount?: number;
  currency?: string;
  status?: string;
  email?: string;
  [k: string]: unknown;
}

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const ensureWorkspace = useMutation(api.customerWorkspaces.ensureWorkspace);

  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://grandiose-goshawk-617.convex.site/checkout/order?session_id=${encodeURIComponent(
            sessionId
          )}`
        );
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }
        const data = (await res.json()) as OrderInfo;
        if (!cancelled) setOrder(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  // Once we have order info and the user is signed in, set up their
  // customerWorkspaces record so /app/workspace has something to render.
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;
    if (!sessionId) return;
    ensureWorkspace({
      sessionId,
      productId: typeof order?.productId === "string" ? order.productId : undefined,
      productName: order?.productName,
      amount: typeof order?.amount === "number" ? order.amount : undefined,
      email: order?.email,
    }).catch(() => {
      // non-fatal — workspace will be created on first /app/workspace visit
    });
  }, [authLoading, isAuthenticated, sessionId, order, ensureWorkspace]);

  return (
    <div className="relative overflow-hidden px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Payment confirmed
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Payment confirmed — let&rsquo;s build your OrgLens report.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Thanks for purchasing your OrgLens analysis. The next step is to
            submit your team and company context so OrgLens can prepare your
            organizational intelligence report.
          </p>
        </div>

        {/* Purchase summary card */}
        <div className="mt-10 rounded-2xl border border-[#1E1E24] bg-[#111113] p-6 md:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-400">
            Purchase summary
          </p>
          <div className="mt-4">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading order details…
              </div>
            ) : error ? (
              <p className="text-sm text-zinc-400">
                We couldn&apos;t load order details right now, but your access
                is active.
              </p>
            ) : (
              <dl className="space-y-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Product purchased</dt>
                  <dd className="font-medium text-white">
                    {order?.productName ?? "OrgLens analysis"}
                  </dd>
                </div>
                {typeof order?.amount === "number" && (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1E24] pb-3">
                    <dt className="text-zinc-500">Price</dt>
                    <dd className="font-medium text-white">
                      {(order.amount / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: (order.currency ?? "USD").toUpperCase(),
                      })}
                    </dd>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Status</dt>
                  <dd className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Paid
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <dt className="text-zinc-500">Next step</dt>
                  <dd className="font-medium text-white">
                    Submit intake form
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>

        {/* Auth-aware CTA */}
        {!authLoading && !isAuthenticated && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-5 text-sm text-zinc-300">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
            <div>
              <p className="font-semibold text-white">
                Sign in or create an account using the email you used at
                checkout.
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                This keeps your payment, intake form, and report all tied
                together inside your OrgLens workspace.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] transition-colors hover:bg-indigo-400"
                >
                  Sign in
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
                >
                  Create account
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Upload reports CTA — primary next step */}
        <div className="mt-8 rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-indigo-500/[0.12] to-[#0F0F12] p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)] md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/40 bg-indigo-500/15 text-indigo-200">
              <Upload className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
                Next step
              </p>
              <p className="mt-1 text-base font-semibold text-white md:text-lg">
                You&rsquo;re one step away from your OrgLens analysis.
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                Upload your team&rsquo;s HUCAMA reports to get started.
              </p>
            </div>
            <Link
              href="/app/upload"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.7)] transition-colors hover:bg-indigo-400 md:w-auto"
            >
              Upload Your Team Reports
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/app/intake"
            className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/50 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-200 transition-colors hover:bg-indigo-500/20 hover:text-white"
          >
            Or start with Intake Form
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/app/workspace"
            className="inline-flex items-center gap-2 rounded-lg border border-[#1E1E24] bg-transparent px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:bg-[#16161A] hover:text-white"
          >
            Go to My Workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {sessionId && (
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            Session: {sessionId.slice(0, 18)}…
          </p>
        )}
      </div>

      <ResponsibleAINote />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="dark min-h-screen bg-[#0A0A0B] text-zinc-100">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-sm text-zinc-400">
            Loading…
          </div>
        }
      >
        <SuccessInner />
      </Suspense>
    </div>
  );
}
