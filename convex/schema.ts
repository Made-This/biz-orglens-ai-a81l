import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(
      v.union(v.literal("owner"), v.literal("admin"), v.literal("member"))
    ),
    onboardingComplete: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
  }).index("email", ["email"]),

  workspaces: defineTable({
    name: v.string(),
    slug: v.string(),
    ownerId: v.id("users"),
    plan: v.union(
      v.literal("free"),
      v.literal("pro"),
      v.literal("enterprise")
    ),
    trialEndsAt: v.optional(v.number()),
    platformProductId: v.optional(v.string()),
    checkoutUrl: v.optional(v.string()),
    subscriptionStatus: v.optional(
      v.union(
        v.literal("active"),
        v.literal("trialing"),
        v.literal("past_due"),
        v.literal("canceled"),
        v.literal("inactive")
      )
    ),
    memberCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_ownerId", ["ownerId"])
    .index("by_platformProductId", ["platformProductId"]),

  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member")
    ),
    invitedAt: v.optional(v.number()),
    joinedAt: v.number(),
  })
    .index("by_workspaceId", ["workspaceId"])
    .index("by_userId", ["userId"])
    .index("by_workspaceId_userId", ["workspaceId", "userId"]),

  invitations: defineTable({
    workspaceId: v.id("workspaces"),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("member")
    ),
    invitedBy: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    acceptedAt: v.optional(v.number()),
  })
    .index("by_workspaceId", ["workspaceId"])
    .index("by_email", ["email"])
    .index("by_token", ["token"]),

  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    authorId: v.optional(v.id("users")),
    status: v.union(v.literal("draft"), v.literal("published")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_publishedAt", ["publishedAt"]),

  newsletterSubscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    // page they signed up from: "homepage", "blog", "article", "demo", "footer", "newsletter-page"
    source: v.string(),
    subscribedAt: v.number(),
    status: v.union(v.literal("subscribed"), v.literal("unsubscribed")),
    unsubscribeToken: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_token", ["unsubscribeToken"]),

  advisoryInquiries: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.string(),
    teamSize: v.string(),
    message: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  // Founder Advisory Review request form submissions from /advisory.
  advisoryRequests: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.string(),
    roleTitle: v.string(),
    companySize: v.string(),
    teamChallenge: v.string(),
    decision: v.optional(v.string()),
    preferredContact: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  // Post-purchase intake form submissions from /intake and /app/intake.
  intakeSubmissions: defineTable({
    // Auth + payment linkage
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.string()),
    productId: v.optional(v.string()),
    productName: v.optional(v.string()),
    // Company basics
    founderName: v.string(),
    email: v.string(),
    // Legacy field name (kept optional for backward compat with old rows)
    company: v.optional(v.string()),
    companyName: v.optional(v.string()),
    // Legacy field name (kept optional for backward compat with old rows)
    website: v.optional(v.string()),
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
    decisionContext: v.optional(v.string()),
    // Legacy field name (kept optional for backward compat with old rows)
    mainChallenge: v.optional(v.string()),
    restructuringContext: v.optional(v.string()),
    teamChallenges: v.optional(v.string()),
    founderDependency: v.optional(v.string()),
    // Legacy/free-text decision field
    decision: v.optional(v.string()),
    // Cosmetic file upload — record only the filename if provided.
    fileName: v.optional(v.string()),
    // Status: "submitted" | "in_review" | "report_ready"
    status: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_userId", ["userId"])
    .index("by_sessionId", ["sessionId"]),

  // Contact form submissions from /contact.
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  // HUCAMA PDF uploads from /app/upload. Each row tracks a single uploaded
  // file in Convex storage and (after analysis) links to its analyses row.
  analysisUploads: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("complete"),
      v.literal("error")
    ),
    analysisId: v.optional(v.id("analyses")),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_uploadedAt", ["userId", "uploadedAt"]),

  // Org analysis results produced from a HUCAMA upload.
  analyses: defineTable({
    userId: v.id("users"),
    uploadId: v.id("analysisUploads"),
    createdAt: v.number(),
    status: v.union(
      v.literal("processing"),
      v.literal("complete"),
      v.literal("error")
    ),
    orgMapData: v.optional(v.string()), // JSON string
    roleFitData: v.optional(v.string()), // JSON string
    riskSummary: v.optional(v.string()), // JSON string
    reportMarkdown: v.optional(v.string()),
    // true  → scores came from mock NovaCloud demo data (PDF parse failed or unknown format)
    // false → scores extracted from the actual uploaded PDF
    // undefined → legacy row created before this field was added (treated as mock)
    usedMockData: v.optional(v.boolean()),
  })
    .index("by_userId", ["userId"])
    .index("by_uploadId", ["uploadId"]),

  // Per-customer workspace record — one per paid purchase.
  customerWorkspaces: defineTable({
    userId: v.id("users"),
    email: v.string(),
    sessionId: v.optional(v.string()),
    productId: v.optional(v.string()),
    productName: v.optional(v.string()),
    amount: v.optional(v.number()),
    // "payment_received" | "intake_needed" | "intake_submitted" |
    // "analysis_in_progress" | "report_ready"
    reportStatus: v.string(),
    intakeSubmissionId: v.optional(v.id("intakeSubmissions")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"])
    .index("by_sessionId", ["sessionId"]),
});
