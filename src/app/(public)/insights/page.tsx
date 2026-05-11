import type { Metadata } from "next";
import { getPublishedPosts, INSIGHT_CATEGORIES } from "@/lib/insights";
import { InsightsListing } from "./InsightsListing";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";

export const metadata: Metadata = {
  title: "OrgLens Insights — Organizational Intelligence for Founders",
  description:
    "Practical ideas on organizational intelligence, team structure, and responsible AI for SaaS and health tech founders.",
};

export default function InsightsIndexPage() {
  const posts = getPublishedPosts();

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow to match the rest of the dark theme */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            OrgLens Insights
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            OrgLens Insights
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Practical ideas on organizational intelligence, team structure,
            and responsible AI for SaaS and health tech founders.
          </p>
        </div>

        {/* Filterable post grid (client component) */}
        <InsightsListing posts={posts} categories={INSIGHT_CATEGORIES} />

        {/* Newsletter signup */}
        <div className="mt-20">
          <NewsletterSignupForm source="blog" />
        </div>
      </div>
    </div>
  );
}
