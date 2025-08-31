import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, userType } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: email, password, firstName, lastName, userType",
        },
        { status: 400 }
      );
    }

    const client = await clerkClient();
    // Create user with Clerk on the backend
    const user = await client.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
      publicMetadata: {
        userRole: userType === "private" ? "STUDENT" : "INSTRUCTOR",
        userType: userType,
        isApproved: false,
        approvalStatus: "PENDING",
      },
    });

    // Return success with user ID
    return NextResponse.json({
      success: true,
      userId: user.id,
      message: "User created successfully",
    });
  } catch (error: unknown) {
    console.error("Backend Clerk signup error:", error);

    // Handle specific Clerk errors
    const clerkError = error as { errors?: Array<{ code: string; meta?: { param_name?: string } }> };
    if (clerkError.errors && Array.isArray(clerkError.errors)) {
      const firstError = clerkError.errors[0];

      if (firstError.code === "form_identifier_exists") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      if (firstError.code === "form_param_unknown") {
        return NextResponse.json(
          {
            error: `Invalid parameter: ${firstError.meta?.param_name || "unknown"}`,
          },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to create user account" },
      { status: 500 }
    );
  }
}
