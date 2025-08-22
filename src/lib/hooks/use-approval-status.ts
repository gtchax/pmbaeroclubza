import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";

export interface UserApprovalStatus {
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  approvalDate?: string;
  rejectionReason?: string;
  status: "approved" | "pending" | "rejected" | "loading";
  userRole?: string;
  userType?: string;
}

export function useApprovalStatus() {
  const { user, isLoaded } = useUser();
  const [approvalStatus, setApprovalStatus] = useState<UserApprovalStatus>({
    isApproved: false,
    isPending: false,
    isRejected: false,
    status: "loading",
  });

  const checkUserApprovalStatus = useCallback(async () => {
    try {
      if (!user) return;

      // Get approval status from Clerk metadata
      const metadata = user.publicMetadata;
      const isApproved = metadata?.isApproved === true;
      const isRejected = metadata?.isRejected === true;
      const isPending = !isApproved && !isRejected;
      const approvalDate = metadata?.approvalDate as string;
      const rejectionReason = metadata?.rejectionReason as string;
      const userRole = metadata?.userRole as string;
      const userType = metadata?.userType as string;

      setApprovalStatus({
        isApproved,
        isPending,
        isRejected,
        approvalDate,
        rejectionReason,
        userRole,
        userType,
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
  }, [user]);

  useEffect(() => {
    if (isLoaded && user) {
      checkUserApprovalStatus();
    } else if (isLoaded && !user) {
      setApprovalStatus({
        isApproved: false,
        isPending: false,
        isRejected: false,
        status: "loading",
      });
    }
  }, [isLoaded, user, checkUserApprovalStatus]);

  const refreshApprovalStatus = () => {
    if (isLoaded && user) {
      checkUserApprovalStatus();
    }
  };

  return {
    ...approvalStatus,
    refreshApprovalStatus,
    isLoading: !isLoaded || approvalStatus.status === "loading",
  };
}
