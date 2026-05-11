import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts, CATEGORY_STYLES } from "@/lib/insights";
import { NewsletterSignupForm } from "@/components/NewsletterSignupForm";

export const metadata: Metadata = {
  title: "OrgLens Monthly Insights — Newsletter for Growing Teams",
  description:
    "Monthly ideas on AI, HR tech, role clarity, organizational intelligence, and better team decisions for founders, operators, and SME leaders.",
};

const RECEIVE_BULLETS = [
  "Monthly roundup of new OrgLens articles",
  "Practical guides on org design, role fit, leadership coverage, and team structure",
  "AI and HR tech trend updates for founders, operators, and SME leaders",
  "Early access to OrgLens features and tools",
];

const EXAMPLE_TOPICS = [
  "AI trends in HR tech",
  "Org design for growing teams",
  "Role-fit and competency signals",
  "Team structure risks",
  "People analytics for startups and SMEs",
  "How to turn org data into better decisions",
];

function formatDate(iso: string) {
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

export default function NewsletterPage() {
  const latest = getPublishedPosts().slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[420px]">
        <div className="absolute left-1/2 top-0 h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero */}
        <section>
          <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
            Newsletter
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            OrgLens Monthly Insights
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            Monthly ideas on AI, HR tech, role clarity, organizational
            intelligence, and better team decisions for founders, operators,
            and SME leaders.
          </p>

          <div className="mt-10 max-w-2xl">
            <NewsletterSignupForm source="newsletter-page" />
          </div>
        </section>

        {/* What you'll receive */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What subscribers receive
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {RECEIVE_BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-[#1E1E24] bg-[#0F0F12] p-4 text-sm text-zinc-300"
              >
                <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-[10px] font-bold text-indigo-300">
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        {/* Example topics */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Recent topics
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {EXAMPLE_TOPICS.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-full border border-[#1E1E24] bg-[#111116] px-3.5 py-1.5 text-xs font-medium text-zinc-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/* Latest articles */}
        {latest.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Latest articles
              </h2>
              <Link
                href="/insights"
                className="text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
              >
                All insights →
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => {
                const style = CATEGORY_STYLES[post.category];
                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-[#1E1E24] bg-[#0F0F12] p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-[#13131A]"
                  >
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                      />
                      {post.category}
                    </span>
                    <h3 className="mt-4 text-base font-semibold leading-snug text-white transition-colors group-hover:text-indigo-200">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                      {post.summary}
                    </p>
                    <p className="mt-4 text-xs text-zinc-500">
                      {formatDate(post.publishDate)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Privacy note */}
        <p className="mt-20 max-w-2xl text-sm text-zinc-500">
          We&rsquo;ll only use your email to send OrgLens insights and occasional product updates. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
