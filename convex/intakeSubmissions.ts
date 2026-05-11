import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Legacy public intake submission from /intake (no auth required).
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
    if (!mainChallenge)
      throw new Error("Main organizational challenge is required.");

    const id = await ctx.db.insert("intakeSubmissions", {
      founderName,
      email,
      company,
      companyName: company,
      website,
      companyWebsite: website,
      companyType,
      companySize,
      currentRoles,
      mainChallenge,
      teamChallenges: mainChallenge,
      decisionContext: decision || mainChallenge,
      decision,
      fileName,
      status: "submitted",
      submittedAt: Date.now(),
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});

// Authenticated post-purchase intake from /app/intake.
// Creates intakeSubmissions and updates the user's customerWorkspaces record.
export const submitWorkspaceIntake = mutation({
  args: {
    // Company basics
    founderName: v.string(),
    email: v.string(),
    companyName: v.string(),
    companyWebsite: v.optional(v.string()),
    companyType: v.optional(v.string()),
    industry: v.optional(v.string()),
    companySize: v.optional(v.string()),
    fundingStage: v.optional(v.string()),
    // Team structure
    leadershipTeam: v.optional(v.string()),
    currentRoles: v.optional(v.string()),
    reportingStructure: v.optional(v.string()),
    keyDepartments: v.optional(v.string()),
    openRoles: v.optional(v.string()),
    // Decision context
    decisionContext: v.string(),
    restructuringContext: v.optional(v.string()),
    teamChallenges: v.string(),
    founderDependency: v.optional(v.string()),
    // Optional file upload (cosmetic — record filename only)
    fileName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("You must be signed in to submit an intake.");

    const founderName = args.founderName.trim();
    const email = args.email.trim().toLowerCase();
    const companyName = args.companyName.trim();
    const decisionContext = args.decisionContext.trim();
    const teamChallenges = args.teamChallenges.trim();

    if (!founderName) throw new Error("Founder name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    if (!companyName) throw new Error("Company name is required.");
    if (!decisionContext)
      throw new Error("Decision context is required.");
    if (!teamChallenges)
      throw new Error("Team challenges are required.");

    // Look up existing workspace for this user (if any).
    const workspace = await ctx.db
      .query("customerWorkspaces")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    const submissionId = await ctx.db.insert("intakeSubmissions", {
      userId,
      sessionId: workspace?.sessionId,
      productId: workspace?.productId,
      productName: workspace?.productName,
      founderName,
      email,
      company: companyName,
      companyName,
      website: args.companyWebsite?.trim() || undefined,
      companyWebsite: args.companyWebsite?.trim() || undefined,
      companyType: args.companyType?.trim() || undefined,
      industry: args.industry?.trim() || undefined,
      companySize: args.companySize?.trim() || undefined,
      fundingStage: args.fundingStage?.trim() || undefined,
      leadershipTeam: args.leadershipTeam?.trim() || undefined,
      currentRoles: args.currentRoles?.trim() || undefined,
      reportingStructure: args.reportingStructure?.trim() || undefined,
      keyDepartments: args.keyDepartments?.trim() || undefined,
      openRoles: args.openRoles?.trim() || undefined,
      decisionContext,
      restructuringContext: args.restructuringContext?.trim() || undefined,
      teamChallenges,
      mainChallenge: teamChallenges,
      founderDependency: args.founderDependency?.trim() || undefined,
      fileName: args.fileName?.trim() || undefined,
      status: "submitted",
      submittedAt: Date.now(),
      createdAt: Date.now(),
    });

    if (workspace) {
      await ctx.db.patch(workspace._id, {
        reportStatus: "intake_submitted",
        intakeSubmissionId: submissionId,
        updatedAt: Date.now(),
      });
    } else {
      // No workspace yet — create one so the user has somewhere to land.
      await ctx.db.insert("customerWorkspaces", {
        userId,
        email,
        reportStatus: "intake_submitted",
        intakeSubmissionId: submissionId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    return { success: true, id: submissionId };
  },
});

// Returns the intake submission for the current signed-in user (if any).
export const getMyIntake = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db
      .query("intakeSubmissions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .first();
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
