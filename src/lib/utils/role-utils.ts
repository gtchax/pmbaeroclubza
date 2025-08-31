import { auth } from "@clerk/nextjs/server";

export interface UserRole {
  userRole: string;
  userType: string;
  isApproved: boolean;
  approvalStatus: string;
}

/**
 * Get user role information from Clerk metadata
 */
export async function getUserRole(): Promise<UserRole | null> {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    // For now, we'll use a simple approach
    // In the future, this could be enhanced with database lookups
    return {
      userRole: "STUDENT", // Default role
      userType: "private",
      isApproved: false,
      approvalStatus: "PENDING",
    };
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

/**
 * Get the appropriate dashboard URL based on user role
 */
export function getDashboardUrl(userRole: string): string {
  switch (userRole) {
    case "STUDENT":
      return "/student/dashboard";
    case "INSTRUCTOR":
      return "/instructor/dashboard";
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/seams/dashboard";
    default:
      return "/dashboard";
  }
}

/**
 * Check if user has required role for a route
 */
export function hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Get user role from Clerk metadata in client components
 */
export function useUserRole() {
  // This would be used in client components with useUser hook
  // For now, returning a placeholder
  return {
    userRole: "STUDENT",
    userType: "private",
    isApproved: false,
    approvalStatus: "PENDING",
  };
}
