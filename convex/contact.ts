import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a contact form message from /contact.
// Stored in contactSubmissions; the OrgLens team follows up async.
export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const subject = args.subject.trim();
    const message = args.message.trim();

    if (!name) throw new Error("Name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("A valid email address is required.");
    }
    if (!subject) throw new Error("Subject is required.");
    if (!message) throw new Error("Message is required.");

    const id = await ctx.db.insert("contactSubmissions", {
      name,
      email,
      subject,
      message,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});

// Internal helper to list contact submissions.
export const listContactSubmissions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
