"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Send, User } from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface RequestInfoDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestInfoDialog({
  student,
  open,
  onOpenChange,
}: RequestInfoDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [requestType, setRequestType] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to send information request
      console.log("Sending information request:", {
        studentId: student.id,
        requestType,
        subject,
        message,
        deadline,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setRequestType("general");
      setSubject("");
      setMessage("");
      setDeadline("");

      onOpenChange(false);
    } catch (error) {
      console.error("Error sending information request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultSubject = (type: string) => {
    switch (type) {
      case "medical":
        return "Medical Certificate Required";
      case "license":
        return "License Information Required";
      case "documents":
        return "Additional Documents Required";
      case "training":
        return "Training Progress Update Required";
      default:
        return "Additional Information Required";
    }
  };

  const getDefaultMessage = (type: string) => {
    switch (type) {
      case "medical":
        return `Dear ${student.firstName},\n\nWe require your current medical certificate to proceed with your training. Please upload a valid medical certificate that covers the duration of your training program.\n\nIf you have any questions, please contact us.\n\nBest regards,\nPMB Aero Club Training Team`;
      case "license":
        return `Dear ${student.firstName},\n\nWe need to verify your current license information. Please provide:\n\n- Current license number\n- License expiry date\n- Any restrictions or endorsements\n\nThis information is required for training planning and compliance.\n\nBest regards,\nPMB Aero Club Training Team`;
      case "documents":
        return `Dear ${student.firstName},\n\nWe require additional documentation to complete your registration:\n\n- Proof of address\n- Emergency contact information\n- Previous training certificates (if any)\n\nPlease upload these documents as soon as possible.\n\nBest regards,\nPMB Aero Club Training Team`;
      case "training":
        return `Dear ${student.firstName},\n\nWe need an update on your current training progress:\n\n- Current training module\n- Hours completed\n- Any challenges or concerns\n- Preferred training schedule\n\nThis will help us better plan your training program.\n\nBest regards,\nPMB Aero Club Training Team`;
      default:
        return `Dear ${student.firstName},\n\nWe require additional information to proceed with your application. Please provide the requested details as soon as possible.\n\nIf you have any questions, please contact us.\n\nBest regards,\nPMB Aero Club Training Team`;
    }
  };

  const handleRequestTypeChange = (type: string) => {
    setRequestType(type);
    setSubject(getDefaultSubject(type));
    setMessage(getDefaultMessage(type));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Request Additional Information</span>
          </DialogTitle>
          <DialogDescription>
            Send a request for additional information to {student.firstName}{" "}
            {student.lastName}
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
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Type */}
          <div className="space-y-2">
            <Label htmlFor="requestType">Request Type</Label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => handleRequestTypeChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="general">General Information</option>
              <option value="medical">Medical Certificate</option>
              <option value="license">License Information</option>
              <option value="documents">Additional Documents</option>
              <option value="training">Training Progress</option>
            </select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject line"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={8}
              required
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Response Deadline (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <p className="text-xs text-gray-500">
              Set a deadline for when you need the information by
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

