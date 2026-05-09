"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

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
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-7 w-7 text-[#10B981]" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-[#111827] md:text-3xl">
        Your analysis is unlocked.
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Thanks for unlocking the full OrgLens AI analysis. You now have access
        to the complete competency map and role-fit rankings.
      </p>

      <div className="mt-8 w-full rounded-xl border border-[#E5E7EB] bg-white p-6 text-left">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading order details…
          </div>
        ) : error ? (
          <p className="text-sm text-gray-500">
            We couldn&apos;t load order details right now, but your access is
            active.
          </p>
        ) : order ? (
          <dl className="space-y-2 text-sm">
            {order.productName && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Product</dt>
                <dd className="font-medium text-[#111827]">
                  {order.productName}
                </dd>
              </div>
            )}
            {typeof order.amount === "number" && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Amount</dt>
                <dd className="font-medium text-[#111827]">
                  {(order.amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: (order.currency ?? "USD").toUpperCase(),
                  })}
                </dd>
              </div>
            )}
            {order.status && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Status</dt>
                <dd className="font-medium capitalize text-[#111827]">
                  {order.status}
                </dd>
              </div>
            )}
            {order.email && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Receipt sent to</dt>
                <dd className="font-medium text-[#111827]">{order.email}</dd>
              </div>
            )}
            {sessionId && (
              <div className="flex justify-between gap-3">
                <dt className="text-gray-500">Session</dt>
                <dd className="truncate font-mono text-xs text-gray-500">
                  {sessionId}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="text-sm text-gray-500">
            No session id provided — but your access is active.
          </p>
        )}
      </div>

      <Link
        href="/app"
        className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-md bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA]"
      >
        Go to Full Analysis
      </Link>

      <p className="mt-6 text-[11px] uppercase tracking-wider text-gray-400">
        Built with MadeThis
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
