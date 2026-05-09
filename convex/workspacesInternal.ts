import { internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const getByPlatformProductId = internalQuery({
  args: { platformProductId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workspaces")
      .withIndex("by_platformProductId", (q) =>
        q.eq("platformProductId", args.platformProductId)
      )
      .unique();
  },
});

export const upgradePlan = internalMutation({
  args: {
    workspaceId: v.id("workspaces"),
    plan: v.union(
      v.literal("free"),
      v.literal("pro"),
      v.literal("enterprise")
    ),
    subscriptionStatus: v.union(
      v.literal("active"),
      v.literal("trialing"),
      v.literal("past_due"),
      v.literal("canceled"),
      v.literal("inactive")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      plan: args.plan,
      subscriptionStatus: args.subscriptionStatus,
      updatedAt: Date.now(),
    });
  },
});
