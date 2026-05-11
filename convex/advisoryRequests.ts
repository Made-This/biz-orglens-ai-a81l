import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a Founder Advisory Review request from the /advisory page.
// Stored in advisoryRequests; the OrgLens team follows up async.
export const submitAdvisoryRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.string(),
    roleTitle: v.string(),
    companySize: v.string(),
    teamChallenge: v.string(),
    decision: v.optional(v.string()),
    preferredContact: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const company = args.company.trim();
    const roleTitle = args.roleTitle.trim();
    const companySize = args.companySize.trim();
    const teamChallenge = args.teamChallenge.trim();
    const decision = args.decision?.trim() || undefined;
    const preferredContact = args.preferredContact.trim();

    if (!name) throw new Error("Name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    if (!company) throw new Error("Company name is required.");
    if (!roleTitle) throw new Error("Role / title is required.");
    if (!companySize) throw new Error("Company size is required.");
    if (!teamChallenge) throw new Error("Team challenge is required.");
    if (!preferredContact) throw new Error("Preferred contact method is required.");

    const id = await ctx.db.insert("advisoryRequests", {
      name,
      email,
      company,
      roleTitle,
      companySize,
      teamChallenge,
      decision,
      preferredContact,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});

export const listAdvisoryRequests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("advisoryRequests")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
