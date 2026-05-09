import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { jwtVerify } from "jose";

const isSignInPage = createRouteMatcher(["/sign-in", "/sign-up"]);
const isProtectedRoute = createRouteMatcher(["/app(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

async function handleAdminAuth(request: NextRequest): Promise<NextResponse | null> {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) {
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const encodedSecret = new TextEncoder().encode(secret);

  // Check for token in query param (initial redirect from platform)
  const tokenParam = request.nextUrl.searchParams.get("token");
  if (tokenParam) {
    try {
      await jwtVerify(tokenParam, encodedSecret);
      // Valid token -- set cookie and redirect without token in URL
      const url = request.nextUrl.clone();
      url.searchParams.delete("token");
      const response = NextResponse.redirect(url);
      response.cookies.set("admin_token", tokenParam, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/admin",
        maxAge: 3600, // 1 hour
      });
      return response;
    } catch {
      return new NextResponse("Invalid token", { status: 401 });
    }
  }

  // Check for token in cookie
  const cookieToken = request.cookies.get("admin_token")?.value;
  if (cookieToken) {
    try {
      await jwtVerify(cookieToken, encodedSecret);
      return null; // Allow through
    } catch {
      // Expired or invalid cookie -- clear it
      const response = new NextResponse("Session expired. Please re-open this page from the MadeThis platform.", {
        status: 401,
      });
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return new NextResponse(
    "Unauthorized -- access this page from the MadeThis platform.",
    { status: 401 }
  );
}

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // Admin routes use separate JWT auth
  if (isAdminRoute(request)) {
    return await handleAdminAuth(request);
  }

  // Redirect authenticated users away from sign-in/sign-up pages
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/app");
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/sign-in");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
