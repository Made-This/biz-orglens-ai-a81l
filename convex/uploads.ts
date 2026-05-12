import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

// Returns a Convex storage upload URL for the signed-in user. The client POSTs
// the file directly to this URL, then calls `saveUpload` with the returned
// storageId.
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be signed in to upload a file.");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

// Records the upload after the file has been POSTed to Convex storage.
// Returns the new analysisUploads row id so the client can call
// triggerAnalysis next.
export const saveUpload = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
  },
  handler: async (ctx, { storageId, fileName }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be signed in to save an upload.");
    }

    const cleanName = fileName.trim() || "upload.pdf";

    const uploadId = await ctx.db.insert("analysisUploads", {
      userId,
      fileName: cleanName,
      storageId,
      uploadedAt: Date.now(),
      status: "pending",
    });

    return { uploadId };
  },
});

// Returns all uploads for the authenticated user, newest first. Each row is
// augmented with `analysisStatus` (the linked analysis status, if any) so the
// workspace UI can render a single row per upload.
export const getMyUploads = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const uploads = await ctx.db
      .query("analysisUploads")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // Enrich with the linked analysis status (if any) for cleaner UI.
    const enriched = await Promise.all(
      uploads.map(async (u) => {
        let analysisStatus: string | null = null;
        if (u.analysisId) {
          const a = await ctx.db.get(u.analysisId);
          analysisStatus = a?.status ?? null;
        }
        return { ...u, analysisStatus };
      })
    );
    return enriched;
  },
});

// Switches the upload to "processing" and schedules the mock analysis action.
// Returns the uploadId so the client can poll status.
export const triggerAnalysis = mutation({
  args: {
    uploadId: v.id("analysisUploads"),
  },
  handler: async (ctx, { uploadId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("You must be signed in to trigger analysis.");
    }
    const upload = await ctx.db.get(uploadId);
    if (!upload || upload.userId !== userId) {
      throw new Error("Upload not found.");
    }

    await ctx.db.patch(uploadId, { status: "processing" });

    // Schedule the PDF analysis action. It will parse the uploaded file and
    // fall back to demo data automatically if parsing fails.
    await ctx.scheduler.runAfter(
      1500,
      internal.analysis.runAnalysis,
      { uploadId }
    );

    return { uploadId };
  },
});

// Internal helpers used by convex/analysis.ts (an action can't write to the
// db directly — it has to call mutations).

export const _getUploadForAction = internalMutation({
  args: { uploadId: v.id("analysisUploads") },
  handler: async (ctx, { uploadId }) => {
    return await ctx.db.get(uploadId);
  },
});

export const _writeAnalysisResult = internalMutation({
  args: {
    uploadId: v.id("analysisUploads"),
    userId: v.id("users"),
    orgMapData: v.string(),
    roleFitData: v.string(),
    riskSummary: v.string(),
    reportMarkdown: v.string(),
    usedMockData: v.optional(v.boolean()),
  },
  handler: async (
    ctx,
    { uploadId, userId, orgMapData, roleFitData, riskSummary, reportMarkdown, usedMockData }
  ) => {
    const analysisId: Id<"analyses"> = await ctx.db.insert("analyses", {
      userId,
      uploadId,
      createdAt: Date.now(),
      status: "complete",
      orgMapData,
      roleFitData,
      riskSummary,
      reportMarkdown,
      usedMockData,
    });
    await ctx.db.patch(uploadId, {
      status: "complete",
      analysisId,
    });
    return { analysisId };
  },
});

export const _markUploadError = internalMutation({
  args: { uploadId: v.id("analysisUploads") },
  handler: async (ctx, { uploadId }) => {
    await ctx.db.patch(uploadId, { status: "error" });
  },
});

// Returns one analysis for the signed-in user (by id). Used by
// /app/analysis/[id].
export const getAnalysis = query({
  args: { analysisId: v.id("analyses") },
  handler: async (ctx, { analysisId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const analysis = await ctx.db.get(analysisId);
    if (!analysis) return null;
    if (analysis.userId !== userId) return null;

    // Fetch the linked upload for filename + uploaded date.
    const upload = await ctx.db.get(analysis.uploadId);
    return {
      ...analysis,
      fileName: upload?.fileName ?? "upload.pdf",
      uploadedAt: upload?.uploadedAt ?? analysis.createdAt,
    };
  },
});

// Returns one upload by id (for the polling on /app/upload during processing).
export const getUpload = query({
  args: { uploadId: v.id("analysisUploads") },
  handler: async (ctx, { uploadId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const upload = await ctx.db.get(uploadId);
    if (!upload || upload.userId !== userId) return null;
    return upload;
  },
});
