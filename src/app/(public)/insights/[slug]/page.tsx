import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  INSIGHT_POSTS,
  CATEGORY_STYLES,
  getInsightBySlug,
} from "@/lib/insights";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INSIGHT_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) {
    return { title: "Insight not found — OrgLens AI" };
  }
  return {
    title: `${post.title} — OrgLens Insights`,
    description: post.summary,
  };
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);

  if (!post) {
    notFound();
  }

  const style = CATEGORY_STYLES[post.category];

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[400px]">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <article className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Back link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-indigo-300"
        >
          <span aria-hidden="true">←</span>
          Back to Insights
        </Link>

        {/* Category badge */}
        <div className="mt-8">
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {post.title}
        </h1>

        {/* Summary */}
        <p className="mt-6 text-xl leading-relaxed text-zinc-300">
          {post.summary}
        </p>

        {/* Separator */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#1E1E24] to-transparent" />

        {/* Body */}
        <div className="prose-invert mt-10 max-w-[65ch] space-y-6 text-[17px] leading-[1.75] text-zinc-300">
          {post.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-16 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8 text-center sm:p-10">
          <p className="mx-auto max-w-xl text-base text-zinc-300 sm:text-lg">
            Want to see what organizational intelligence looks like in practice?
            Explore the OrgLens demo report.
          </p>
          <Link
            href="/app/report"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400"
          >
            View Demo Report
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* More posts */}
        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            More from OrgLens Insights
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {INSIGHT_POSTS.filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => {
                const relatedStyle = CATEGORY_STYLES[related.category];
                return (
                  <Link
                    key={related.slug}
                    href={`/insights/${related.slug}`}
                    className="group rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#13131A]"
                  >
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${relatedStyle.badge}`}
                    >
                      {related.category}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-white transition-colors group-hover:text-indigo-200">
                      {related.title}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </article>
    </div>
  );
}
