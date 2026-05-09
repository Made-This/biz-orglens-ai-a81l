"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { AdminHeader } from "@/components/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default function BlogAdminPage() {
  const posts = useQuery(api.blogPosts.listAll);
  const deletePost = useMutation(api.blogPosts.remove);
  const { toast } = useToast();

  if (posts === undefined) {
    return (
      <div className="space-y-6">
        <AdminHeader title="Blog Posts" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    );
  }

  async function handleDelete(id: string) {
    try {
      await deletePost({ id: id as any });
      toast({ title: "Post deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blog Posts"
        description={`${posts.length} total posts`}
        action={
          <Button asChild size="sm">
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4" />
              New Post
            </Link>
          </Button>
        }
      />

      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No blog posts yet"
          description="Create your first blog post to get started."
          ctaText="New Post"
          ctaLink="/admin/blog/new"
        />
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    /{post.slug}{" "}
                    {post.publishedAt &&
                      ` — ${new Date(post.publishedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                    className="capitalize"
                  >
                    {post.status}
                  </Badge>
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/blog/${post._id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
