import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check if any user with SUPER_ADMIN role exists
    const superAdmin = await prisma.user.findFirst({
      where: {
        roles: {
          some: {
            role: {
              name: "SUPER_ADMIN",
            },
          },
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({
      exists: !!superAdmin,
      user: superAdmin,
    });
  } catch (error) {
    console.error("Error checking super admin:", error);
    return NextResponse.json(
      { error: "Failed to check super admin status" },
      { status: 500 }
    );
  }
}
