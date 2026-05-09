"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface OrderInfo {
  productName?: string;
  amount?: number;
  currency?: string;
  status?: string;
  email?: string;
  [k: string]: unknown;
}

function SuccessInner() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

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

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-[140px]" />
      </div>

      <div className="relative w-full max-w-xl">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-widest text-indigo-400">
          Payment confirmed
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Analysis Unlocked
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
          Your full OrgLens AI analysis is now available — the complete
          competency org map, role-fit ranking, and founder memo.
        </p>

        <div className="mt-10 rounded-2xl border border-[#1E1E24] bg-[#111113] p-6 text-left">
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
          ) : order ? (
            <dl className="space-y-3 text-sm">
              {order.productName && (
                <div className="flex justify-between border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Product</dt>
                  <dd className="font-medium text-white">
                    {order.productName}
                  </dd>
                </div>
              )}
              {typeof order.amount === "number" && (
                <div className="flex justify-between border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Amount</dt>
                  <dd className="font-medium text-white">
                    {(order.amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: (order.currency ?? "USD").toUpperCase(),
                    })}
                  </dd>
                </div>
              )}
              {order.status && (
                <div className="flex justify-between border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Status</dt>
                  <dd className="font-medium capitalize text-emerald-300">
                    {order.status}
                  </dd>
                </div>
              )}
              {order.email && (
                <div className="flex justify-between border-b border-[#1E1E24] pb-3">
                  <dt className="text-zinc-500">Receipt sent to</dt>
                  <dd className="font-medium text-white">{order.email}</dd>
                </div>
              )}
              {sessionId && (
                <div className="flex justify-between gap-3">
                  <dt className="text-zinc-500">Session</dt>
                  <dd className="truncate font-mono text-xs text-zinc-500">
                    {sessionId}
                  </dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="text-sm text-zinc-400">
              No session id provided — but your access is active.
            </p>
          )}
        </div>

        <Link
          href="/app"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.9)]"
        >
          Open Full Analysis
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-8 text-[10px] uppercase tracking-widest text-zinc-600">
          Built with MadeThis
        </p>
      </div>
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
