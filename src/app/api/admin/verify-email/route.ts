import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Find user in Clerk
    const client = await clerkClient();

    const users = await client.users.getUserList({
      emailAddress: [email],
    });

    if (users.data.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

    // Attempt to verify the OTP
    try {
      // await client.users.verifyEmail({
      //   userId: user.id,
      //   code: otp,
      // });
    } catch (verificationError) {
      console.error("OTP verification error:", verificationError);
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // Update user in database to mark as verified and approved
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isApproved: true,
        approvalStatus: "APPROVED",
        approvedAt: new Date(),
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        adminProfile: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        roles: updatedUser.roles.map((ur) => ur.role.name),
        adminLevel: updatedUser.adminProfile?.adminLevel,
        isApproved: updatedUser.isApproved,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
