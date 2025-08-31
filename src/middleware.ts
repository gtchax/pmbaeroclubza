import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/search",
  "/property/(.*)",
  "/api/webhooks/(.*)",
  "/api/auth/(.*)",
  "/api/clerk/(.*)",
  "/api/user/(.*)",
  "/api/admin/check-super-admin",
  "/api/admin/register",
  "/api/admin/login",
  "/api/messaging/webhook",
  "/register",
  "/registration-success",
  "/login",
  "/login/verify",
  "/pending-approval",
  "/signup",
  "/sign-in",
  "/sign-up",
  "/dashboard",
  "/seams/(.*)",
  // Core folder pages - all public
  "/aero-club",
  "/training-fleet",
  "/faq",
  "/visiting-aircraft",
  "/pilot-resources",
  "/flight-instructors",
  "/flight-school",
  "/contact",
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

  // Redirect authenticated users away from auth pages to their dashboard
  if (userId) {
    const authPages = [
      "/register",
      "/login",
      "/login/verify",
      "/registration-success",
      "/signup",
      "/sign-in",
      "/sign-up",
    ];
    if (authPages.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
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
