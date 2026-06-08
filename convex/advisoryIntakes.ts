import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Internal mutation: write an advisory intake record to the DB.
// Called from advisoryIntakesActions.submitAndNotify (Node.js action).
export const create = internalMutation({
  args: {
    sessionId: v.string(),
    companyName: v.string(),
    role: v.string(),
    companySize: v.string(),
    stage: v.string(),
    primaryChallenge: v.string(),
    orgStructure: v.optional(v.string()),
    successOutcome: v.string(),
    preferredTiming: v.optional(v.string()),
    additionalNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("advisoryIntakes", {
      sessionId: args.sessionId.trim(),
      companyName: args.companyName.trim(),
      role: args.role.trim(),
      companySize: args.companySize.trim(),
      stage: args.stage.trim(),
      primaryChallenge: args.primaryChallenge.trim(),
      orgStructure: args.orgStructure?.trim() || undefined,
      successOutcome: args.successOutcome.trim(),
      preferredTiming: args.preferredTiming?.trim() || undefined,
      additionalNotes: args.additionalNotes?.trim() || undefined,
      submittedAt: Date.now(),
    });
    return { success: true, id };
  },
});

// Query: list all advisory intakes (admin use).
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("advisoryIntakes")
      .order("desc")
      .collect();
  },
});

// Query: get intake by session ID.
export const getBySessionId = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("advisoryIntakes")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});
