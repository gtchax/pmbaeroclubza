import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Search for existing users with this email in Clerk
    try {
      const client = await clerkClient();
      const users = await client.users.getUserList({
        emailAddress: [email],
        limit: 1,
      });

      const exists = users.data.length > 0;

      return NextResponse.json({
        exists,
        email,
        message: exists
          ? "User with this email already exists"
          : "Email is available",
      });
    } catch (clerkError) {
      console.error("Clerk API error:", clerkError);

      // If there's a Clerk API error, return a safe default
      // This prevents blocking users due to API issues
      return NextResponse.json({
        exists: false,
        email,
        message: "Unable to verify email availability - proceeding with signup",
        warning: "Email availability could not be verified",
      });
    }
  } catch (error) {
    console.error("Email check error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to check email availability",
      },
      { status: 500 }
    );
  }
}
