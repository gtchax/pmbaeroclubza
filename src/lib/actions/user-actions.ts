"use server";

import { prisma } from "@/lib/prisma";
import { UserWithProfile } from "@/lib/types";

export async function getCurrentUser(
  userId: string
): Promise<UserWithProfile | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        instructorProfile: true,
        adminProfile: true,
        roles: {
          include: {
            role: {
              select: {
                name: true,
                permissions: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getUserRole(userId: string): Promise<string[]> {
  try {
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return userRoles.map((ur: { role: { name: string } }) => ur.role.name);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    throw new Error("Failed to fetch user roles");
  }
}

export async function updateUserProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatar?: string;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        studentProfile: true,
        instructorProfile: true,
        adminProfile: true,
        roles: {
          include: {
            role: {
              select: {
                name: true,
                permissions: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile");
  }
}
