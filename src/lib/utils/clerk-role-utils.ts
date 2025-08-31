import { currentUser } from "@clerk/nextjs/server";

export interface ClerkUserMetadata {
  userRole: string;
  userType: string;
  isApproved: boolean;
  approvalStatus: string;
}

/**
 * Get user metadata from Clerk (server-side)
 */
export async function getClerkUserMetadata(): Promise<ClerkUserMetadata | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const metadata = user.publicMetadata as unknown as ClerkUserMetadata;
    
    return {
      userRole: metadata.userRole || "STUDENT",
      userType: metadata.userType || "private",
      isApproved: metadata.isApproved || false,
      approvalStatus: metadata.approvalStatus || "PENDING",
    };
  } catch (error) {
    console.error("Error getting Clerk user metadata:", error);
    return null;
  }
}

/**
 * Get the appropriate dashboard URL based on user role from Clerk metadata
 */
export async function getClerkDashboardUrl(): Promise<string> {
  const metadata = await getClerkUserMetadata();
  if (!metadata) return "/dashboard";

  switch (metadata.userRole) {
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
 * Check if user has required role for a route (server-side)
 */
export async function hasClerkRequiredRole(requiredRoles: string[]): Promise<boolean> {
  const metadata = await getClerkUserMetadata();
  if (!metadata) return false;
  
  return requiredRoles.includes(metadata.userRole);
}

/**
 * Check if user is approved (server-side)
 */
export async function isClerkUserApproved(): Promise<boolean> {
  const metadata = await getClerkUserMetadata();
  return metadata?.isApproved || false;
}

/**
 * Get user approval status (server-side)
 */
export async function getClerkUserApprovalStatus(): Promise<string> {
  const metadata = await getClerkUserMetadata();
  return metadata?.approvalStatus || "PENDING";
}
