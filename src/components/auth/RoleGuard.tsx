"use client";

import { useClerkRole } from "@/lib/hooks/use-clerk-role";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRoles: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component to protect routes based on user roles from Clerk metadata
 */
export function RoleGuard({
  children,
  requiredRoles,
  fallback,
  redirectTo,
}: RoleGuardProps) {
  const { metadata, hasRequiredRole, isLoaded, isLoading } = useClerkRole();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && metadata && !hasRequiredRole(requiredRoles)) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        // Redirect to appropriate dashboard based on user's actual role
        switch (metadata.userRole) {
          case "STUDENT":
            router.push("/student/dashboard");
            break;
          case "INSTRUCTOR":
            router.push("/instructor/dashboard");
            break;
          case "ADMIN":
          case "SUPER_ADMIN":
            router.push("/seams/dashboard");
            break;
          default:
            router.push("/dashboard");
        }
      }
    }
  }, [isLoaded, metadata, hasRequiredRole, requiredRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isLoaded || !metadata) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>You must be logged in to access this page.</p>
          </div>
        </div>
      )
    );
  }

  if (!hasRequiredRole(requiredRoles)) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p>You don&apos;t have permission to access this page.</p>
            <p className="text-sm text-gray-600 mt-2">
              Required roles: {requiredRoles.join(", ")}
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

/**
 * Higher-order component for role-based protection
 */
export function withRoleGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles: string[],
  fallback?: React.ReactNode,
  redirectTo?: string
) {
  return function ProtectedComponent(props: P) {
    return (
      <RoleGuard
        requiredRoles={requiredRoles}
        fallback={fallback}
        redirectTo={redirectTo}
      >
        <Component {...props} />
      </RoleGuard>
    );
  };
}
