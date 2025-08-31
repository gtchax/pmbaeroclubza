"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { sendApprovalEmail } from "@/lib/email/send-approval-email";

export async function getUserApprovalStatus(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isApproved: true,
        approvalStatus: true,
        paymentStatus: true,
        approvedAt: true,
        rejectedAt: true,
        rejectionReason: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user approval status:", error);
    throw new Error("Failed to fetch user approval status");
  }
}

export async function getCurrentUserStatus() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    return await getUserApprovalStatus(userId);
  } catch (error) {
    console.error("Error fetching current user status:", error);
    return null;
  }
}

export async function canAccessDashboard(userId: string): Promise<boolean> {
  try {
    const user = await getUserApprovalStatus(userId);

    if (!user) {
      return false;
    }

    // User must be approved and have paid to access dashboard
    return (
      user.isApproved &&
      user.approvalStatus === "APPROVED" &&
      user.paymentStatus === "PAID"
    );
  } catch (error) {
    console.error("Error checking dashboard access:", error);
    return false;
  }
}

export async function updateUserApprovalStatus(
  userId: string,
  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW",
  approvedBy?: string,
  rejectionReason?: string
) {
  try {
    const updateData: Record<string, unknown> = {
      approvalStatus: status,
      updatedAt: new Date(),
    };

    if (status === "APPROVED") {
      updateData.isApproved = true;
      updateData.approvedAt = new Date();
      updateData.approvedBy = approvedBy;
      updateData.rejectedAt = null;
      updateData.rejectionReason = null;
    } else if (status === "REJECTED") {
      updateData.isApproved = false;
      updateData.rejectedAt = new Date();
      updateData.rejectionReason = rejectionReason;
      updateData.approvedAt = null;
      updateData.approvedBy = null;
    } else {
      updateData.isApproved = false;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        studentProfile: true,
        instructorProfile: true,
      },
    });

    // Update Clerk metadata to sync approval status
    try {
      const client = await clerkClient();
      await client.users.updateUser(userId, {
        publicMetadata: {
          approvalStatus: status,
          isApproved: status === "APPROVED",
        },
      });
    } catch (clerkError) {
      console.error("Error updating Clerk metadata:", clerkError);
      // Don't fail the entire operation if Clerk update fails
    }

    // Send approval email if status is APPROVED
    if (status === "APPROVED" && user.email) {
      try {
        const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/login`;
        await sendApprovalEmail(user.email, user.firstName || "User", loginUrl);
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
        // Don't fail the entire operation if email fails
      }
    }

    return user;
  } catch (error) {
    console.error("Error updating user approval status:", error);
    throw new Error("Failed to update user approval status");
  }
}

export async function updateUserPaymentStatus(
  userId: string,
  status: "UNPAID" | "PARTIAL" | "PAID" | "REFUNDED"
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        paymentStatus: status,
        updatedAt: new Date(),
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user payment status:", error);
    throw new Error("Failed to update user payment status");
  }
}

export async function getPendingApprovalUsers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ approvalStatus: "PENDING" }, { approvalStatus: "UNDER_REVIEW" }],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        approvalStatus: true,
        paymentStatus: true,
        createdAt: true,
        studentProfile: {
          select: {
            studentNumber: true,
            dateOfBirth: true,
          },
        },
        instructorProfile: {
          select: {
            instructorNumber: true,
            licenseNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching pending approval users:", error);
    throw new Error("Failed to fetch pending approval users");
  }
}
