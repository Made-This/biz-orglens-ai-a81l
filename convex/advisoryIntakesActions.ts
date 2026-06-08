"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Action: save the intake record AND send a notification via the platform proxy.
// Must run in Node.js for crypto (HMAC signing) and fetch.
export const submitAndNotify = action({
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
    // 1. Persist intake record via mutation
    const result = await ctx.runMutation(internal.advisoryIntakes.create, args);

    // 2. Send notification via platform /site/notify proxy
    const authEmailUrl = process.env.PLATFORM_AUTH_EMAIL_URL;
    const fulfillmentSecret = process.env.PLATFORM_FULFILLMENT_SECRET;

    if (authEmailUrl && fulfillmentSecret) {
      try {
        // Derive notify URL: replace /auth/send-email with /site/notify
        const notifyUrl = authEmailUrl.replace(
          "/auth/send-email",
          "/site/notify"
        );

        const messageParts: string[] = [
          `Company: ${args.companyName}`,
          `Role: ${args.role}`,
          `Company Size: ${args.companySize}`,
          `Stage: ${args.stage}`,
          `Session ID: ${args.sessionId}`,
          ``,
          `Primary Challenge:`,
          args.primaryChallenge,
          ``,
          `Desired Outcome:`,
          args.successOutcome,
        ];

        if (args.orgStructure) {
          messageParts.push(``, `Org Structure:`, args.orgStructure);
        }
        if (args.preferredTiming) {
          messageParts.push(``, `Preferred Timing: ${args.preferredTiming}`);
        }
        if (args.additionalNotes) {
          messageParts.push(``, `Additional Notes:`, args.additionalNotes);
        }

        const message = messageParts.join("\n");

        const payload = {
          businessSlug: "orglens-ai",
          type: "contact_inquiry",
          data: {
            name: args.companyName,
            email: "team@orglens-ai.madethis.app",
            subject: "New Founder Advisory Intake",
            message,
          },
        };

        const bodyJson = JSON.stringify(payload);

        // Sign with HMAC-SHA256 using Node.js crypto
        const nodeCrypto = await import("crypto");
        const sig = nodeCrypto
          .createHmac("sha256", fulfillmentSecret)
          .update(bodyJson)
          .digest("hex");

        await fetch(notifyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Site-Notify-Signature": sig,
          },
          body: bodyJson,
        });
      } catch {
        // Non-fatal — intake is already saved; notification failure should not block the user.
      }
    }

    return result;
  },
});
