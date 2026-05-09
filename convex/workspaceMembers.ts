import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    // Enrich with user data
    const enriched = await Promise.all(
      members.map(async (m) => {
        const user = await ctx.db.get(m.userId);
        return {
          ...m,
          userName: user?.name ?? "Unknown",
          userEmail: user?.email ?? "",
          userImageUrl: user?.image,
        };
      })
    );

    return enriched;
  },
});

export const updateRole = mutation({
  args: {
    memberId: v.id("workspaceMembers"),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const member = await ctx.db.get(args.memberId);
    if (!member) throw new Error("Member not found");

    // Verify requester is owner or admin of this workspace
    const requesterMembership = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!requesterMembership || requesterMembership.role === "member") {
      throw new Error("Insufficient permissions");
    }

    // Cannot change the owner's role
    if (member.role === "owner") {
      throw new Error("Cannot change the owner's role");
    }

    await ctx.db.patch(args.memberId, { role: args.role });
  },
});

export const remove = mutation({
  args: { memberId: v.id("workspaceMembers") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const member = await ctx.db.get(args.memberId);
    if (!member) throw new Error("Member not found");

    // Verify requester is owner or admin of this workspace
    const requesterMembership = await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspaceId_userId", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!requesterMembership || requesterMembership.role === "member") {
      throw new Error("Insufficient permissions");
    }

    // Cannot remove the owner
    if (member.role === "owner") {
      throw new Error("Cannot remove the workspace owner");
    }

    await ctx.db.delete(args.memberId);

    // Update member count
    const workspace = await ctx.db.get(member.workspaceId);
    if (workspace) {
      await ctx.db.patch(member.workspaceId, {
        memberCount: Math.max(0, workspace.memberCount - 1),
        updatedAt: Date.now(),
      });
    }
  },
});
