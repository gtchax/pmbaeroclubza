import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UserApprovalStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, adminLevel } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !adminLevel) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if SUPER_ADMIN already exists (double-check)
    if (adminLevel === "SUPER_ADMIN") {
      const existingSuperAdmin = await prisma.user.findFirst({
        where: {
          roles: {
            some: {
              role: {
                name: "SUPER_ADMIN",
              },
            },
          },
        },
      });

      if (existingSuperAdmin) {
        return NextResponse.json(
          { error: "A SUPER_ADMIN user already exists" },
          { status: 403 }
        );
      }
    }

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }
    // Create user in Clerk
    // const clerkUser = await clerkClient.
    const client = await clerkClient();

    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password,
      firstName,
      lastName,
      publicMetadata: {
        role: adminLevel,
        isAdmin: true,
        // isVerified: false,
      },
      privateMetadata: {
        adminLevel,
        registrationDate: new Date().toISOString(),
      },
    });

    // Get or create the role in the database
    let role = await prisma.role.findUnique({
      where: { name: adminLevel },
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          name: adminLevel,
          description: `${adminLevel} role for PMB Aero Club`,
          permissions: {
            canManageUsers: true,
            canManageAircraft: true,
            canManageBookings: true,
            canViewReports: true,
            canManageSystem: adminLevel === "SUPER_ADMIN",
          },
        },
      });
    }

    // Create user in database
    const dbUser = await prisma.user.create({
      data: {
        id: clerkUser.id,
        email,
        firstName,
        lastName,
        isApproved: true,
        approvalStatus: UserApprovalStatus.APPROVED,
        roles: {
          create: {
            roleId: role.id,
          },
        },
        adminProfile: {
          create: {
            adminLevel,
            permissions: {
              canManageUsers: true,
              canManageAircraft: true,
              canManageBookings: true,
              canViewReports: true,
              canManageSystem: adminLevel === "SUPER_ADMIN",
            },
          },
        },
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

    // Send verification email via Clerk
    // await client.users.createEmailVerification({
    //   userId: clerkUser.id,
    // });

    return NextResponse.json({
      success: true,
      message:
        "Admin account created successfully. Please check your email for verification.",
      user: {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        adminLevel: dbUser.adminProfile?.adminLevel,
      },
    });
  } catch (error) {
    console.error("Admin registration error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to create admin account" },
      { status: 500 }
    );
  }
}
