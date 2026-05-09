import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();

// ─── Convex Auth Routes ─────────────────────────────────────────────────────
auth.addHttpRoutes(http);

// ─── Platform Fulfillment Webhook ───────────────────────────────────────────

http.route({
  path: "/api/fulfillment",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.PLATFORM_FULFILLMENT_SECRET;
    if (!secret) {
      return new Response(
        JSON.stringify({ error: "Fulfillment secret not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify HMAC-SHA256 signature
    const signature = request.headers.get("X-Fulfillment-Signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing signature" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const bodyText = await request.text();

    // Use Web Crypto API for HMAC verification (works in Convex runtime)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBytes = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(bodyText)
    );
    const expectedSignature = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (signature !== expectedSignature) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = JSON.parse(bodyText) as {
      orderId: string;
      productId: string;
      plan: "pro" | "enterprise";
      customerEmail: string;
    };

    // Look up the workspace by platformProductId
    const workspace = await ctx.runQuery(
      internal.workspacesInternal.getByPlatformProductId,
      { platformProductId: body.productId }
    );

    if (!workspace) {
      return new Response(
        JSON.stringify({ error: "Workspace not found for this product" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Upgrade workspace plan
    await ctx.runMutation(internal.workspacesInternal.upgradePlan, {
      workspaceId: workspace._id,
      plan: body.plan,
      subscriptionStatus: "active",
    });

    return new Response(
      JSON.stringify({ success: true, workspaceId: workspace._id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

export default http;
