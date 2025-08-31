"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApprovalStatus } from "@/lib/actions/user-status-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pause, User, AlertCircle } from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  approvalStatus: string;
  createdAt: Date;
}

interface PauseAccountDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function PauseAccountDialog({
  student,
  open,
  onOpenChange,
  onSuccess,
}: PauseAccountDialogProps) {
  const [pauseReason, setPauseReason] = useState("");
  const [pauseDuration, setPauseDuration] = useState("30");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: updateUserApprovalStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onSuccess();
    },
    onError: (error) => {
      console.error("Error pausing account:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pauseReason.trim()) return;

    setIsLoading(true);

    try {
      await updateStatusMutation.mutateAsync(
        student.id,
        "UNDER_REVIEW", // Using UNDER_REVIEW as a pause status
        undefined, // approvedBy
        `Account paused: ${pauseReason}. Duration: ${pauseDuration} days.`
      );

      // Reset form
      setPauseReason("");
      setPauseDuration("30");
    } catch (error) {
      console.error("Error pausing account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPauseReason("");
    setPauseDuration("30");
    onOpenChange(false);
  };

  const getPauseReasonSuggestions = () => [
    "Documentation incomplete or expired",
    "Payment issues",
    "Training progress concerns",
    "Medical certificate expired",
    "License issues",
    "Disciplinary action",
    "Temporary suspension",
    "Other administrative reasons",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Pause className="h-5 w-5 text-yellow-500" />
            <span>Pause Student Account</span>
          </DialogTitle>
          <DialogDescription>
            Temporarily suspend {student.firstName} {student.lastName}&apos;s account
            access
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                    <Badge variant="default">Currently Active</Badge>
                    <span className="text-xs text-gray-500">
                      Registered:{" "}
                      {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                <span>Important Notice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700">
                Pausing this account will:
              </p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Prevent the student from accessing training materials</li>
                <li>• Suspend booking capabilities</li>
                <li>• Send a notification to the student</li>
                <li>• Require manual reactivation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Pause Duration */}
          <div className="space-y-2">
            <Label htmlFor="pauseDuration">Pause Duration</Label>
            <select
              id="pauseDuration"
              value={pauseDuration}
              onChange={(e) => setPauseDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="indefinite">Indefinite</option>
            </select>
            <p className="text-xs text-gray-500">
              Select how long the account should remain paused
            </p>
          </div>

          {/* Pause Reason */}
          <div className="space-y-2">
            <Label htmlFor="pauseReason">Reason for Pausing Account *</Label>
            <Textarea
              id="pauseReason"
              value={pauseReason}
              onChange={(e) => setPauseReason(e.target.value)}
              placeholder="Provide a clear reason for pausing this account..."
              rows={4}
              required
            />

            {/* Quick Reason Suggestions */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">
                Quick Reason Suggestions:
              </Label>
              <div className="flex flex-wrap gap-2">
                {getPauseReasonSuggestions().map((reason, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPauseReason(reason)}
                    className="text-xs"
                  >
                    {reason}
                  </Button>
                ))}
              </div>
            </div>
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
              variant="destructive"
              disabled={!pauseReason.trim() || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Pausing...</span>
                </div>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Account
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

