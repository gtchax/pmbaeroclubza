"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, ReactNode } from "react";
import { Loader2, AlertCircle, Clock, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApprovalCheckProps {
  children: ReactNode;
  fallback?: ReactNode;
  showPendingMessage?: boolean;
}

interface UserApprovalStatus {
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  approvalDate?: string;
  rejectionReason?: string;
  status: "approved" | "pending" | "rejected" | "loading";
}

export default function ApprovalCheck({
  children,
  fallback,
  showPendingMessage = true,
}: ApprovalCheckProps) {
  const { user, isLoaded } = useUser();
  const [approvalStatus, setApprovalStatus] = useState<UserApprovalStatus>({
    isApproved: false,
    isPending: false,
    isRejected: false,
    status: "loading",
  });

  useEffect(() => {
    const checkUserApprovalStatus = async () => {
      try {
        // Get approval status from Clerk metadata
        const metadata = user?.publicMetadata;
        const isApproved = metadata?.isApproved === true;
        const isPending =
          metadata?.isApproved === false || metadata?.isApproved === undefined;
        const isRejected = metadata?.isRejected === true;
        const approvalDate = metadata?.approvalDate as string;
        const rejectionReason = metadata?.rejectionReason as string;

        setApprovalStatus({
          isApproved,
          isPending,
          isRejected,
          approvalDate,
          rejectionReason,
          status: isApproved ? "approved" : isRejected ? "rejected" : "pending",
        });
      } catch (error) {
        console.error("Error checking approval status:", error);
        setApprovalStatus({
          isApproved: false,
          isPending: true,
          isRejected: false,
          status: "pending",
        });
      }
    };

    if (isLoaded && user) {
      checkUserApprovalStatus();
    }
  }, [isLoaded, user]);

  // Show loading state while checking authentication and approval
  if (!isLoaded || approvalStatus.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Checking approval status...</p>
        </div>
      </div>
    );
  }

  // User is approved, render children
  if (approvalStatus.isApproved) {
    return <>{children}</>;
  }

  // User is rejected
  if (approvalStatus.isRejected) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Account Not Approved
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your account application has been reviewed and was not approved.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {approvalStatus.rejectionReason && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Reason:</strong> {approvalStatus.rejectionReason}
                  </AlertDescription>
                </Alert>
              )}
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  If you believe this was an error, please contact support.
                </p>
                <Button
                  onClick={() => (window.location.href = "/contact")}
                  className="w-full"
                  variant="outline"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  // User is pending approval
  if (approvalStatus.isPending && showPendingMessage) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Clock className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl text-yellow-600">
                Account Pending Approval
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your account is currently under review. You&apos;ll receive an
                email notification once the review is complete.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Status:</strong> Your application is being reviewed by
                  our team.
                </AlertDescription>
              </Alert>
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  This process typically takes 1-3 business days.
                </p>
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full"
                  variant="outline"
                >
                  Check Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  // If not showing pending message and user is pending, render children
  if (approvalStatus.isPending && !showPendingMessage) {
    return <>{children}</>;
  }

  // Default fallback
  return (
    fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600">Unable to determine approval status</p>
        </div>
      </div>
    )
  );
}
