"use client";

import { ReactNode } from "react";
import ProtectedRoute from "./ProtectedRoute";
import ApprovalCheck from "./ApprovalCheck";

interface AuthGuardProps {
  children: ReactNode;
  requireApproval?: boolean;
  showPendingMessage?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  requireApproval = true,
  showPendingMessage = true,
  fallback,
  redirectTo = "/login",
}: AuthGuardProps) {
  // If approval is not required, just check authentication
  if (!requireApproval) {
    return (
      <ProtectedRoute fallback={fallback} redirectTo={redirectTo}>
        {children}
      </ProtectedRoute>
    );
  }

  // If approval is required, check both authentication and approval
  return (
    <ProtectedRoute fallback={fallback} redirectTo={redirectTo}>
      <ApprovalCheck
        fallback={fallback}
        showPendingMessage={showPendingMessage}
      >
        {children}
      </ApprovalCheck>
    </ProtectedRoute>
  );
}
