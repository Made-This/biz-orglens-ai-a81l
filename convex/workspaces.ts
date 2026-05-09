import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const listForUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const memberships = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const workspaces = await Promise.all(
      memberships.map(async (m) => {
        const workspace = await ctx.db.get(m.workspaceId);
        return workspace ? { ...workspace, memberRole: m.role } : null;
      })
    );

    return workspaces.filter(Boolean);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check slug uniqueness
    const existing = await ctx.db
      .query("workspaces")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) throw new Error("Workspace slug already taken");

    const now = Date.now();
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      slug: args.slug,
      ownerId: userId,
      plan: "free",
      trialEndsAt: now + 14 * 24 * 60 * 60 * 1000, // 14-day trial
      subscriptionStatus: "trialing",
      memberCount: 1,
      createdAt: now,
      updatedAt: now,
    });

    // Add owner as workspace member
    await ctx.db.insert("workspaceMembers", {
      workspaceId,
      userId,
      role: "owner",
      joinedAt: now,
    });

    return workspaceId;
  },
});

export const update = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Verify membership with admin or owner role
    const membership = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!membership || membership.role === "member") {
      throw new Error("Insufficient permissions");
    }

    const update: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.name !== undefined) update.name = args.name;

    await ctx.db.patch(args.workspaceId, update);
    return args.workspaceId;
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const workspaces = await ctx.db.query("workspaces").collect();
    const users = await ctx.db.query("users").collect();

    const totalWorkspaces = workspaces.length;
    const totalUsers = users.length;
    const activeWorkspaces = workspaces.filter(
      (w) => w.subscriptionStatus === "active" || w.subscriptionStatus === "trialing"
    ).length;
    const proWorkspaces = workspaces.filter((w) => w.plan === "pro").length;
    const enterpriseWorkspaces = workspaces.filter(
      (w) => w.plan === "enterprise"
    ).length;

    return {
      totalWorkspaces,
      totalUsers,
      activeWorkspaces,
      proWorkspaces,
      enterpriseWorkspaces,
    };
  },
});
