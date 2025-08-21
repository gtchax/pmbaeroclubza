"use client";

import { ReactNode } from "react";
import { useApprovalStatus } from "@/lib/hooks/use-approval-status";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Shield } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  requiredRoles: string[];
  fallback?: ReactNode;
  showAccessDenied?: boolean;
}

export default function RoleGuard({
  children,
  requiredRoles,
  fallback,
  showAccessDenied = true,
}: RoleGuardProps) {
  const { userRole, isApproved, isLoading } = useApprovalStatus();

  // Show loading state while checking role
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Check if user is approved
  if (!isApproved) {
    return (
      fallback || (
        <div className="p-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your account needs to be approved before you can access this
              content.
            </AlertDescription>
          </Alert>
        </div>
      )
    );
  }

  // Check if user has required role
  const hasRequiredRole = userRole && requiredRoles.includes(userRole);

  if (!hasRequiredRole) {
    if (!showAccessDenied) {
      return null;
    }

    return (
      fallback || (
        <div className="p-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to access this content. Required roles:{" "}
              {requiredRoles.join(", ")}
            </AlertDescription>
          </Alert>
        </div>
      )
    );
  }

  // User has required role, render children
  return <>{children}</>;
}
