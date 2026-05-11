"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

type Status = "loading" | "success" | "invalid" | "error";

function UnsubscribeInner() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const unsubscribe = useMutation(api.newsletter.unsubscribeByToken);

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!token) {
        if (!cancelled) setStatus("invalid");
        return;
      }
      try {
        const result = await unsubscribe({ token });
        if (cancelled) return;
        if (result.success) setStatus("success");
        else setStatus("invalid");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [token, unsubscribe]);

  if (status === "loading") {
    return (
      <p className="text-sm text-zinc-400">
        Processing your unsubscribe request...
      </p>
    );
  }

  if (status === "success") {
    return (
      <>
        <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
          Newsletter
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          You&rsquo;re unsubscribed
        </h1>
        <p className="mt-5 max-w-xl text-lg text-zinc-400">
          You have been removed from the OrgLens newsletter list. You will no longer receive monthly updates.
        </p>
        <Link
          href="/newsletter"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Changed your mind? Subscribe again
          <span aria-hidden="true">→</span>
        </Link>
      </>
    );
  }

  if (status === "invalid") {
    return (
      <>
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          Newsletter
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Unsubscribe link not recognized
        </h1>
        <p className="mt-5 max-w-xl text-base text-zinc-400">
          This unsubscribe link is invalid or has already been used.
        </p>
        <Link
          href="/newsletter"
          className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Back to the newsletter page
          <span aria-hidden="true">→</span>
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-5 max-w-xl text-base text-zinc-400">
        We couldn&rsquo;t process your unsubscribe request. Please try again in a moment, or reply to any newsletter email and we&rsquo;ll remove you manually.
      </p>
    </>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[400px]">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <Suspense
          fallback={
            <p className="text-sm text-zinc-400">
              Processing your unsubscribe request...
            </p>
          }
        >
          <UnsubscribeInner />
        </Suspense>
      </div>
    </div>
  );
}
