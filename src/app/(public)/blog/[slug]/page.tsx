"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = useQuery(api.blogPosts.getBySlug, { slug });

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-4 h-10 w-3/4" />
        <Skeleton className="mb-8 h-4 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post || post.status !== "published") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={FileText}
          title="Post not found"
          description="This blog post does not exist or has been removed."
          ctaText="Back to Blog"
          ctaLink="/blog"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <article>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        {post.publishedAt && (
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
