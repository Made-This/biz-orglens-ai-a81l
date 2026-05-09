import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const invitations = await ctx.db
      .query("invitations")
      .withIndex("by_workspaceId", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    // Only return pending (not accepted, not expired)
    const now = Date.now();
    return invitations.filter(
      (inv) => !inv.acceptedAt && inv.expiresAt > now
    );
  },
});

export const create = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Verify requester is owner or admin
    const membership = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!membership || membership.role === "member") {
      throw new Error("Insufficient permissions");
    }

    // Check for existing pending invitation
    const existingInvitations = await ctx.db
      .query("invitations")
      .withIndex("by_workspaceId", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    const pending = existingInvitations.find(
      (inv) =>
        inv.email === args.email && !inv.acceptedAt && inv.expiresAt > Date.now()
    );

    if (pending) {
      throw new Error("An invitation is already pending for this email");
    }

    // Generate a secure token
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const invitationId = await ctx.db.insert("invitations", {
      workspaceId: args.workspaceId,
      email: args.email,
      role: args.role,
      invitedBy: userId,
      token,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return invitationId;
  },
});

export const accept = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    const invitation = await ctx.db
      .query("invitations")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!invitation) throw new Error("Invitation not found");
    if (invitation.acceptedAt) throw new Error("Invitation already accepted");
    if (invitation.expiresAt < Date.now()) throw new Error("Invitation expired");

    // Verify the user's email matches (if they have one)
    if (user.email && user.email !== invitation.email) {
      throw new Error("This invitation was sent to a different email address");
    }

    // Check if already a member
    const existingMember = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", invitation.workspaceId).eq("userId", userId)
      )
      .unique();

    if (existingMember) {
      throw new Error("Already a member of this workspace");
    }

    // Add as member
    await ctx.db.insert("workspaceMembers", {
      workspaceId: invitation.workspaceId,
      userId,
      role: invitation.role,
      invitedAt: invitation.expiresAt - 7 * 24 * 60 * 60 * 1000,
      joinedAt: Date.now(),
    });

    // Mark invitation as accepted
    await ctx.db.patch(invitation._id, { acceptedAt: Date.now() });

    // Update member count
    const workspace = await ctx.db.get(invitation.workspaceId);
    if (workspace) {
      await ctx.db.patch(invitation.workspaceId, {
        memberCount: workspace.memberCount + 1,
        updatedAt: Date.now(),
      });
    }

    return invitation.workspaceId;
  },
});

export const revoke = mutation({
  args: { invitationId: v.id("invitations") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const invitation = await ctx.db.get(args.invitationId);
    if (!invitation) throw new Error("Invitation not found");

    // Verify requester is owner or admin
    const membership = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", invitation.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!membership || membership.role === "member") {
      throw new Error("Insufficient permissions");
    }

    await ctx.db.delete(args.invitationId);
  },
});
