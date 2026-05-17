"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_STOREFRONT_KEY!, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_STOREFRONT_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false,
    loaded(ph) {
      ph.group("business", process.env.NEXT_PUBLIC_BUSINESS_ID!);
    },
  });
}

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    posthog.capture("$pageview");
  }, [pathname, searchParams]);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  );
}

export function decorateCheckoutUrl(url: string): string {
  if (typeof window === "undefined") return url;
  try {
    const out = new URL(url);
    const distinctId = posthog.get_distinct_id?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionId = (posthog as any).get_session_id?.();
    if (distinctId) out.searchParams.set("ph_distinct_id", distinctId);
    if (sessionId) out.searchParams.set("ph_session_id", sessionId);
    new URL(window.location.href).searchParams.forEach((v, k) => {
      if (k.startsWith("utm_")) out.searchParams.set(k, v);
    });
    return out.toString();
  } catch {
    return url;
  }
}
