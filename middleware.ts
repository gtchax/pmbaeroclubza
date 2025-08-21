import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { canAccessDashboard } from "@/lib/actions/user-status-actions";

const isPublicRoute = createRouteMatcher([
  "/",
  "/search",
  "/property/(.*)",
  "/api/webhooks/(.*)",
  "/api/messaging/webhook",
]);

const isAuthRoute = createRouteMatcher([
  "/login",
  "/signup",
  "/register",
  "/sign-in",
  "/sign-up",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for webhook endpoints
  if (
    req.nextUrl.pathname.startsWith("/api/webhooks") ||
    req.nextUrl.pathname.startsWith("/api/messaging/webhook")
  ) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  // Redirect authenticated users away from auth routes
  if (userId && isAuthRoute(req)) {
    const home = new URL(`/`, req.url);
    return NextResponse.redirect(home);
  }

  // Protect private routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Run for API routes
    "/(api|trpc)(.*)",
  ],
};
