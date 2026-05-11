import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a Founder Advisory Review inquiry from /get-analysis.
// Stored in advisoryInquiries; the OrgLens team follows up async.
export const submitAdvisoryInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.string(),
    teamSize: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const company = args.company.trim();
    const teamSize = args.teamSize.trim();
    const message = args.message?.trim() || undefined;

    if (!name) throw new Error("Name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    if (!company) throw new Error("Company is required.");
    if (!teamSize) throw new Error("Team size is required.");

    const id = await ctx.db.insert("advisoryInquiries", {
      name,
      email,
      company,
      teamSize,
      message,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});

// Admin-only-ish helper to list inquiries (no auth gate yet — internal use).
export const listAdvisoryInquiries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("advisoryInquiries")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
