"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApprovalStatus } from "@/lib/actions/user-status-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, User, AlertTriangle, Clock } from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  approvalStatus: string;
  createdAt: Date;
  studentProfile?: {
    licenseNumber?: string;
    licenseExpiry?: Date;
    medicalExpiry?: Date;
    totalFlightHours?: number;
  };
}

interface ApprovalDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ApprovalDialog({
  student,
  open,
  onOpenChange,
  onSuccess,
}: ApprovalDialogProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({
      userId,
      status,
      approvedBy,
      rejectionReason,
    }: {
      userId: string;
      status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";
      approvedBy?: string;
      rejectionReason?: string;
    }) => updateUserApprovalStatus(userId, status, approvedBy, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onSuccess();
    },
    onError: (error) => {
      console.error("Error updating approval status:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision) return;

    setIsLoading(true);

    try {
      const newStatus = decision === "approve" ? "APPROVED" : "REJECTED";

      await updateStatusMutation.mutateAsync({
        userId: student.id,
        status: newStatus,
        approvedBy: undefined, // approvedBy - could be passed from context
        rejectionReason:
          decision === "reject" ? notes.trim() || undefined : undefined,
      });

      // Reset form
      setDecision(null);
      setNotes("");
    } catch (error) {
      console.error("Error updating approval status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setDecision(null);
    setNotes("");
    onOpenChange(false);
  };

  const getStatusConfig = (status: string) => {
    const statusConfig = {
      PENDING: {
        label: "Pending",
        variant: "secondary",
        icon: Clock,
        color: "text-orange-600",
      },
      APPROVED: {
        label: "Approved",
        variant: "default",
        icon: CheckCircle,
        color: "text-green-600",
      },
      REJECTED: {
        label: "Rejected",
        variant: "destructive",
        icon: XCircle,
        color: "text-red-600",
      },
      UNDER_REVIEW: {
        label: "Under Review",
        variant: "outline",
        icon: AlertTriangle,
        color: "text-yellow-600",
      },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    );
  };

  const statusConfig = getStatusConfig(student.approvalStatus);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Review Student Application</span>
          </DialogTitle>
          <DialogDescription>
            Review and make a decision on {student.firstName} {student.lastName}
            &apos;s application
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-lg">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant={
                        statusConfig.variant as
                          | "default"
                          | "secondary"
                          | "destructive"
                          | "outline"
                      }
                    >
                      {statusConfig.label}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Registered:{" "}
                      {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Profile Summary */}
              {student.studentProfile && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-sm font-medium">License</div>
                    <div className="text-sm text-gray-600">
                      {student.studentProfile.licenseNumber || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Flight Hours</div>
                    <div className="text-sm text-gray-600">
                      {student.studentProfile.totalFlightHours || 0} hours
                    </div>
                  </div>
                  {student.studentProfile.medicalExpiry && (
                    <div>
                      <div className="text-sm font-medium">Medical Expiry</div>
                      <div className="text-sm text-gray-600">
                        {new Date(
                          student.studentProfile.medicalExpiry
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  {student.studentProfile.licenseExpiry && (
                    <div>
                      <div className="text-sm font-medium">License Expiry</div>
                      <div className="text-sm text-gray-600">
                        {new Date(
                          student.studentProfile.licenseExpiry
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Decision */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Decision</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={decision === "approve" ? "default" : "outline"}
                className={`h-16 ${
                  decision === "approve"
                    ? "bg-green-600 hover:bg-green-700 border-green-600"
                    : ""
                }`}
                onClick={() => setDecision("approve")}
                disabled={isLoading}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve Application
              </Button>
              <Button
                type="button"
                variant={decision === "reject" ? "destructive" : "outline"}
                className="h-16"
                onClick={() => setDecision("reject")}
                disabled={isLoading}
              >
                <XCircle className="h-5 w-5 mr-2" />
                Reject Application
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              {decision === "approve"
                ? "Approval Notes (Optional)"
                : "Rejection Reason (Required)"}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                decision === "approve"
                  ? "Add any notes about the approval..."
                  : "Please provide a reason for rejection..."
              }
              rows={4}
              required={decision === "reject"}
            />
            {decision === "reject" && (
              <p className="text-xs text-gray-500">
                Providing a clear reason helps the student understand what needs
                to be addressed.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !decision ||
                (decision === "reject" && !notes.trim()) ||
                isLoading
              }
              className={
                decision === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : decision === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : ""
              }
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  {decision === "approve" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Student
                    </>
                  ) : decision === "reject" ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </>
                  ) : (
                    "Make Decision"
                  )}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
