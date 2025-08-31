"use client";

import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export interface ClerkUserMetadata {
  userRole: string;
  userType: string;
  isApproved: boolean;
  approvalStatus: string;
}

/**
 * Hook to get user role information from Clerk metadata (client-side)
 */
export function useClerkRole() {
  const { user, isLoaded } = useUser();

  const metadata = useMemo(() => {
    if (!user || !isLoaded) return null;

    const publicMetadata = user.publicMetadata as ClerkUserMetadata;
    
    return {
      userRole: publicMetadata.userRole || "STUDENT",
      userType: publicMetadata.userType || "private",
      isApproved: publicMetadata.isApproved || false,
      approvalStatus: publicMetadata.approvalStatus || "PENDING",
    };
  }, [user, isLoaded]);

  const dashboardUrl = useMemo(() => {
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
  }, [metadata]);

  const hasRequiredRole = useMemo(() => {
    return (requiredRoles: string[]) => {
      if (!metadata) return false;
      return requiredRoles.includes(metadata.userRole);
    };
  }, [metadata]);

  return {
    metadata,
    dashboardUrl,
    hasRequiredRole,
    isLoaded,
    isLoading: !isLoaded,
  };
}

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(requiredRole: string) {
  const { metadata, isLoaded } = useClerkRole();
  
  return {
    hasRole: metadata?.userRole === requiredRole,
    isLoaded,
    isLoading: !isLoaded,
  };
}

/**
 * Hook to check if user is approved
 */
export function useIsApproved() {
  const { metadata, isLoaded } = useClerkRole();
  
  return {
    isApproved: metadata?.isApproved || false,
    approvalStatus: metadata?.approvalStatus || "PENDING",
    isLoaded,
    isLoading: !isLoaded,
  };
}
