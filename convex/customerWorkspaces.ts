import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Returns the customer workspace for the signed-in user (or null).
export const getMyWorkspace = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("customerWorkspaces")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

// Ensure a customerWorkspaces record exists for the signed-in user.
// Called from /checkout/success after a paid order so the user has a
// workspace to land in.
export const ensureWorkspace = mutation({
  args: {
    sessionId: v.optional(v.string()),
    productId: v.optional(v.string()),
    productName: v.optional(v.string()),
    amount: v.optional(v.number()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be signed in to set up a workspace.");
    }

    const user = await ctx.db.get(userId);
    const email = (args.email ?? user?.email ?? "").trim().toLowerCase();

    // If a workspace already exists for this user, patch product info if we
    // have fresher data — but never downgrade reportStatus.
    const existing = await ctx.db
      .query("customerWorkspaces")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      const patch: {
        sessionId?: string;
        productId?: string;
        productName?: string;
        amount?: number;
        email?: string;
        updatedAt: number;
      } = { updatedAt: Date.now() };

      if (args.sessionId && !existing.sessionId)
        patch.sessionId = args.sessionId;
      if (args.productId && !existing.productId)
        patch.productId = args.productId;
      if (args.productName && !existing.productName)
        patch.productName = args.productName;
      if (typeof args.amount === "number" && existing.amount === undefined)
        patch.amount = args.amount;
      if (email && !existing.email) patch.email = email;

      await ctx.db.patch(existing._id, patch);
      return { id: existing._id, created: false };
    }

    // No workspace yet — create one. If the customer paid, mark intake_needed;
    // otherwise just payment_received (for first-time visitors without a
    // purchase — this state is mostly a placeholder).
    const reportStatus = args.sessionId ? "intake_needed" : "payment_received";

    const id = await ctx.db.insert("customerWorkspaces", {
      userId,
      email,
      sessionId: args.sessionId,
      productId: args.productId,
      productName: args.productName,
      amount: args.amount,
      reportStatus,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { id, created: true };
  },
});
