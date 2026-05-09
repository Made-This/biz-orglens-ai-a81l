import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Sort by publishedAt descending
    return posts.sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogPosts").collect();
  },
});

export const getById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const postId = await ctx.db.insert("blogPosts", {
      title: args.title,
      slug: args.slug,
      content: args.content,
      excerpt: args.excerpt,
      status: args.status,
      publishedAt: args.status === "published" ? now : undefined,
      createdAt: now,
      updatedAt: now,
    });

    return postId;
  },
});

export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Blog post not found");

    const update: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.title !== undefined) update.title = args.title;
    if (args.slug !== undefined) update.slug = args.slug;
    if (args.content !== undefined) update.content = args.content;
    if (args.excerpt !== undefined) update.excerpt = args.excerpt;
    if (args.status !== undefined) {
      update.status = args.status;
      if (args.status === "published" && !existing.publishedAt) {
        update.publishedAt = Date.now();
      }
    }

    await ctx.db.patch(args.id, update);
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
