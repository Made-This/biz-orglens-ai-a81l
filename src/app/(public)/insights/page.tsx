import Link from "next/link";
import type { Metadata } from "next";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_POSTS,
  CATEGORY_STYLES,
} from "@/lib/insights";

export const metadata: Metadata = {
  title: "OrgLens Insights — AI, HR Tech, and Org Design for Founders",
  description:
    "Practical insights on AI, HR tech, team structure, role fit, and organizational intelligence for startup founders.",
};

const FILTERS = ["All", ...INSIGHT_CATEGORIES] as const;

export default function InsightsIndexPage() {
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
            Practical insights on AI, HR tech, team structure, role fit, and
            organizational intelligence for startup founders.
          </p>
        </div>

        {/* Category filter pills (static) */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isAll = filter === "All";
            const style = isAll
              ? null
              : CATEGORY_STYLES[filter as Exclude<typeof filter, "All">];
            return (
              <span
                key={filter}
                className={
                  isAll
                    ? "inline-flex items-center rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-200"
                    : `inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                        style!.badge
                      }`
                }
              >
                {filter}
              </span>
            );
          })}
        </div>

        {/* Post grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHT_POSTS.map((post) => {
            const style = CATEGORY_STYLES[post.category];
            return (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group relative flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#13131A]"
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {post.category}
                </span>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-indigo-200">
                  {post.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {post.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors group-hover:text-indigo-200">
                  Read More
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
