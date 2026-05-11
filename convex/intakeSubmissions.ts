import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a post-purchase intake form from /intake.
export const submitIntake = mutation({
  args: {
    founderName: v.string(),
    email: v.string(),
    company: v.string(),
    website: v.optional(v.string()),
    companyType: v.string(),
    companySize: v.string(),
    currentRoles: v.string(),
    mainChallenge: v.string(),
    decision: v.optional(v.string()),
    fileName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const founderName = args.founderName.trim();
    const email = args.email.trim().toLowerCase();
    const company = args.company.trim();
    const website = args.website?.trim() || undefined;
    const companyType = args.companyType.trim();
    const companySize = args.companySize.trim();
    const currentRoles = args.currentRoles.trim();
    const mainChallenge = args.mainChallenge.trim();
    const decision = args.decision?.trim() || undefined;
    const fileName = args.fileName?.trim() || undefined;

    if (!founderName) throw new Error("Founder name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    if (!company) throw new Error("Company name is required.");
    if (!companyType) throw new Error("Company type is required.");
    if (!companySize) throw new Error("Company size is required.");
    if (!currentRoles) throw new Error("Current team roles are required.");
    if (!mainChallenge) throw new Error("Main organizational challenge is required.");

    const id = await ctx.db.insert("intakeSubmissions", {
      founderName,
      email,
      company,
      website,
      companyType,
      companySize,
      currentRoles,
      mainChallenge,
      decision,
      fileName,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});

export const listIntakeSubmissions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("intakeSubmissions")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
