"use node";

import { action, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

type IntakeArgs = {
  sessionId: string;
  companyName: string;
  role: string;
  companySize: string;
  stage: string;
  primaryChallenge: string;
  orgStructure?: string;
  successOutcome: string;
  preferredTiming?: string;
  additionalNotes?: string;
};

async function runSubmitAndNotify(
  ctx: ActionCtx,
  args: IntakeArgs
): Promise<{ success: boolean; id: unknown }> {
  // 1. Persist intake record via internalMutation in advisoryIntakes.ts
  const result = await ctx.runMutation(
    internal.advisoryIntakes.create,
    args
  );

  // 2. Send notification via platform /site/notify proxy
  const authEmailUrl = process.env.PLATFORM_AUTH_EMAIL_URL;
  const fulfillmentSecret = process.env.PLATFORM_FULFILLMENT_SECRET;

  if (authEmailUrl && fulfillmentSecret) {
    try {
      const notifyUrl = authEmailUrl.replace("/auth/send-email", "/site/notify");

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

      const bodyJson = JSON.stringify({
        businessSlug: "orglens-ai",
        type: "contact_inquiry",
        data: {
          name: args.companyName,
          email: "team@orglens-ai.madethis.app",
          subject: "New Founder Advisory Intake",
          message: messageParts.join("\n"),
        },
      });

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
      // Non-fatal — intake is already saved.
    }
  }

  return result as { success: boolean; id: unknown };
}

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
  handler: (ctx: ActionCtx, args: IntakeArgs) =>
    runSubmitAndNotify(ctx, args),
});
