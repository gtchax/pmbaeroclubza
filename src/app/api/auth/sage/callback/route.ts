import { NextRequest, NextResponse } from "next/server";
import { sageOAuthManager } from "@/lib/sage-auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Handle OAuth errors
    if (error) {
      console.error("SAGE OAuth error:", error);
      return NextResponse.redirect(
        new URL(
          "/auth/sage/error?error=" + encodeURIComponent(error),
          request.url
        )
      );
    }

    // Validate required parameters
    if (!code || !state) {
      console.error("Missing OAuth parameters:", { code, state });
      return NextResponse.redirect(
        new URL("/auth/sage/error?error=missing_parameters", request.url)
      );
    }

    // Handle OAuth callback
    try {
      const authState = await sageOAuthManager.handleCallback(code, state);

      // Redirect to success page or dashboard
      return NextResponse.redirect(new URL("/auth/sage/success", request.url));
    } catch (callbackError) {
      console.error("Error handling OAuth callback:", callbackError);
      return NextResponse.redirect(
        new URL("/auth/sage/error?error=callback_failed", request.url)
      );
    }
  } catch (error) {
    console.error("Unexpected error in SAGE OAuth callback:", error);
    return NextResponse.redirect(
      new URL("/auth/sage/error?error=unexpected_error", request.url)
    );
  }
}
