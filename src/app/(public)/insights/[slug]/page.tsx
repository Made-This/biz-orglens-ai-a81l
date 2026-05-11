import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  blogPosts,
  CATEGORY_STYLES,
  getInsightBySlug,
  getPublishedPosts,
} from "@/lib/insights";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
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
    title: `${post.seoTitle ?? post.title} — OrgLens Insights`,
    description: post.seoDescription ?? post.summary,
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const style = CATEGORY_STYLES[post.category];
  const paragraphs = post.content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const related = getPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

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

        {/* Byline */}
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
          <span className="text-zinc-400">{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishDate)}</span>
        </p>

        {/* Summary */}
        <p className="mt-6 text-xl leading-relaxed text-zinc-300">
          {post.summary}
        </p>

        {/* Featured image or category placeholder */}
        {post.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt=""
            className="mt-10 w-full rounded-2xl border border-[#1E1E24] object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`mt-10 flex h-44 w-full items-center justify-center rounded-2xl border bg-gradient-to-br ${style.placeholder}`}
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full border bg-[#0F0F12]/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur ${style.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {post.category}
            </span>
          </div>
        )}

        {/* Separator */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#1E1E24] to-transparent" />

        {/* Body */}
        <div className="prose-invert mt-10 max-w-[65ch] space-y-6 text-[17px] leading-[1.75] text-zinc-300">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#1E1E24] bg-[#111116] px-2.5 py-1 text-[11px] font-medium text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Primary CTA — demo */}
        <div className="mt-16 rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-8 text-center sm:p-10">
          <p className="mx-auto max-w-xl text-base text-zinc-300 sm:text-lg">
            Want to see organizational intelligence in practice? Explore the OrgLens demo report.
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] transition-all hover:bg-indigo-400 sm:w-auto"
          >
            View Demo Report
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Secondary CTA — newsletter */}
        <div className="mt-8">
          <NewsletterSignupForm
            source="article"
            headline="Want monthly insights like this?"
            description="Subscribe to OrgLens Monthly Insights for practical articles on AI, HR tech, team structure, role fit, and organizational intelligence."
          />
        </div>

        {/* More posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              More from OrgLens Insights
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((rel) => {
                const relatedStyle = CATEGORY_STYLES[rel.category];
                return (
                  <Link
                    key={rel.slug}
                    href={`/insights/${rel.slug}`}
                    className="group rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#13131A]"
                  >
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${relatedStyle.badge}`}
                    >
                      {rel.category}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-white transition-colors group-hover:text-indigo-200">
                      {rel.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
