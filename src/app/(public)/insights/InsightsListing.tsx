"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  type BlogPost,
  type InsightCategory,
  CATEGORY_STYLES,
} from "@/lib/insights";

type Props = {
  posts: BlogPost[];
  categories: InsightCategory[];
};

type Filter = "All" | InsightCategory;

function formatDate(iso: string) {
  // iso = "YYYY-MM-DD"
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function InsightsListing({ posts, categories }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((p) => p.category === filter);
  }, [filter, posts]);

  const filters: Filter[] = ["All", ...categories];

  return (
    <>
      {/* Category filter pills */}
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = filter === f;
          const baseClasses =
            "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors";
          if (isActive) {
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`${baseClasses} border-indigo-400/50 bg-indigo-500/15 text-indigo-200`}
              >
                {f}
              </button>
            );
          }
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`${baseClasses} border-[#1E1E24] bg-[#0F0F12] text-zinc-400 hover:border-indigo-400/30 hover:text-indigo-200`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Post grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-sm text-zinc-500">
            No posts in this category yet. Check back soon.
          </p>
        ) : (
          filtered.map((post) => {
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
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                  />
                  {post.category}
                </span>

                <h2 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-indigo-200">
                  {post.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {post.summary}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                  <span>{post.author}</span>
                  <span>{formatDate(post.publishDate)}</span>
                </div>

                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition-colors group-hover:text-indigo-200">
                  Read Article
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
