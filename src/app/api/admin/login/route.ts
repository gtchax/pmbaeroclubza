import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in Clerk
    const client = await clerkClient();
    const users = await client.users.getUserList({
      emailAddress: [email],
    });

    if (users.data.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = users.data[0];

    // Check if user is an admin
    const isAdmin = user.publicMetadata?.isAdmin === true;
    if (!isAdmin) {
      return NextResponse.json(
        { error: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    // Check if email is verified
    const emailAddress = user.emailAddresses.find(
      (addr) => addr.emailAddress === email
    );
    if (
      !emailAddress?.verification?.status ||
      emailAddress.verification.status !== "verified"
    ) {
      return NextResponse.json(
        { error: "EMAIL_NOT_VERIFIED" },
        { status: 403 }
      );
    }

    // Check if user exists in database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        adminProfile: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // Check if user is approved
    if (!dbUser.isApproved || dbUser.approvalStatus !== "APPROVED") {
      return NextResponse.json(
        { error: "Account not yet approved. Please contact an administrator." },
        { status: 403 }
      );
    }

    // Return success with user info and redirect to Clerk sign-in
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        roles: dbUser.roles.map((ur) => ur.role.name),
        adminLevel: dbUser.adminProfile?.adminLevel,
      },
      // Return the Clerk user ID so the frontend can sign in
      clerkUserId: user.id,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to process login" },
      { status: 500 }
    );
  }
}
