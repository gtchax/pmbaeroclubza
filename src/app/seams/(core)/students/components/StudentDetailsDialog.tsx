"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Eye,
} from "lucide-react";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  approvalStatus: string;
  createdAt: Date;
  studentProfile?: {
    licenseNumber?: string;
    licenseExpiry?: Date;
    medicalExpiry?: Date;
    totalFlightHours?: number;
    address?: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
    trainingProgress?: {
      currentModule?: string;
      completedModules?: string[];
      nextEvaluation?: Date;
    };
  };
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    uploadedAt: Date;
  }>;
}

interface StudentDetailsDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsDialog({
  student,
  open,
  onOpenChange,
}: StudentDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview");

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
  const Icon = statusConfig.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Student Details</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive information about {student.firstName}{" "}
            {student.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-600">Student ID: {student.id}</p>
              </div>
            </div>
            <Badge
              variant={statusConfig.variant as "default" | "secondary" | "destructive" | "outline"}
              className="text-sm px-3 py-1"
            >
              <Icon className="h-4 w-4 mr-2" />
              {statusConfig.label}
            </Badge>
          </div>

          <Separator />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{student.email}</span>
                    </div>
                    {student.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{student.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Registered:{" "}
                        {new Date(student.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {student.studentProfile?.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {student.studentProfile.address}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* License & Medical */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>License & Medical</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {student.studentProfile?.licenseNumber ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          License Number
                        </div>
                        <div className="text-sm text-gray-600">
                          {student.studentProfile.licenseNumber}
                        </div>
                        {student.studentProfile.licenseExpiry && (
                          <div className="text-xs text-gray-500">
                            Expires:{" "}
                            {new Date(
                              student.studentProfile.licenseExpiry
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        No license information
                      </div>
                    )}

                    {student.studentProfile?.medicalExpiry && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          Medical Certificate
                        </div>
                        <div className="text-sm text-gray-600">
                          Expires:{" "}
                          {new Date(
                            student.studentProfile.medicalExpiry
                          ).toLocaleDateString()}
                        </div>
                        {new Date(student.studentProfile.medicalExpiry) <
                          new Date() && (
                          <Badge variant="destructive" className="text-xs">
                            Expired
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                {student.studentProfile?.emergencyContact && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Emergency Contact</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm font-medium">
                        {student.studentProfile.emergencyContact.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {student.studentProfile.emergencyContact.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.studentProfile.emergencyContact.relationship}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Flight Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Flight Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {student.studentProfile?.totalFlightHours || 0}
                    </div>
                    <p className="text-sm text-gray-600">Total flight hours</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>
                    Current training status and progress
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {student.studentProfile?.trainingProgress ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium">
                            Current Module
                          </div>
                          <div className="text-sm text-gray-600">
                            {student.studentProfile.trainingProgress
                              .currentModule || "Not started"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            Next Evaluation
                          </div>
                          <div className="text-sm text-gray-600">
                            {student.studentProfile.trainingProgress
                              .nextEvaluation
                              ? new Date(
                                  student.studentProfile.trainingProgress.nextEvaluation
                                ).toLocaleDateString()
                              : "Not scheduled"}
                          </div>
                        </div>
                      </div>

                      {student.studentProfile.trainingProgress
                        .completedModules &&
                        student.studentProfile.trainingProgress.completedModules
                          .length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-2">
                              Completed Modules
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {student.studentProfile.trainingProgress.completedModules.map(
                                (module, index) => (
                                  <Badge key={index} variant="secondary">
                                    {module}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No training progress information available
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Documents</CardTitle>
                  <CardDescription>
                    All documents submitted by the student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {student.documents && student.documents.length > 0 ? (
                    <div className="space-y-3">
                      {student.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-sm text-gray-500">
                                {doc.type} •{" "}
                                {new Date(doc.uploadedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                doc.status === "APPROVED"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No documents uploaded yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account History</CardTitle>
                  <CardDescription>
                    Timeline of account activities and changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Account Created
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(student.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          Registration Completed
                        </div>
                        <div className="text-xs text-gray-500">
                          Student completed registration process
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

