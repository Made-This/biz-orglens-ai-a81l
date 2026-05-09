"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = useQuery(api.blogPosts.listPublished);

  if (posts === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-12 h-10 w-48" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Blog
      </h1>

      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No posts yet"
          description="Check back soon for updates and articles."
        />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="transition-colors hover:bg-muted/30">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
