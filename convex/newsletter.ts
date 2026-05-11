import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Subscribe to the newsletter. Idempotent — re-subscribes an existing
// unsubscribed email; no-ops if the email is already subscribed.
export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      if (existing.status === "unsubscribed") {
        await ctx.db.patch(existing._id, {
          status: "subscribed",
          subscribedAt: Date.now(),
        });
        return { success: true, alreadyExisted: true };
      }
      return { success: true, alreadyExisted: true };
    }

    const token = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}-${args.email.replace(/[^a-z0-9]/gi, "")}`;

    await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      name: args.name,
      company: args.company,
      role: args.role,
      source: args.source,
      subscribedAt: Date.now(),
      status: "subscribed",
      unsubscribeToken: token,
    });

    return { success: true, alreadyExisted: false };
  },
});

// Unsubscribe by token (used by the unsubscribe link).
export const unsubscribeByToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_token", (q) => q.eq("unsubscribeToken", args.token))
      .first();

    if (!subscriber) {
      return { success: false, message: "Token not found" };
    }

    await ctx.db.patch(subscriber._id, { status: "unsubscribed" });
    return { success: true };
  },
});

// Public count of active subscribers — useful for social proof.
export const getSubscriberCount = query({
  args: {},
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .filter((q) => q.eq(q.field("status"), "subscribed"))
      .collect();
    return subscribers.length;
  },
});
