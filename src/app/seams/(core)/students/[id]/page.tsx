"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getCurrentAdminUser } from "@/lib/actions/admin-actions";
import { updateUserApprovalStatus } from "@/lib/actions/user-status-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Pause,
  Play,
  Edit,
  Download,
  RefreshCw,
  GraduationCap,
  Shield,
  FileText,
  Clock3,
  Award,
  Plane,
  BookOpen,
  BarChart3,
  Eye,
} from "lucide-react";

interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  approvalStatus: string;
  createdAt: Date;
  studentProfile?: {
    studentNumber: string;
    dateOfBirth: Date;
    licenseNumber: string;
    licenseType: string;
    address: string;
    totalFlightHours: number;
    medicalCert: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
    soloHours: number;
    dualHours: number;
    instrumentHours: number;
    nightHours: number;
    crossCountryHours: number;
  };
}

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const studentId = params.id as string;

  const [actionDialog, setActionDialog] = useState<{
    type: "approve" | "reject" | "pause" | null;
    open: boolean;
  }>({ type: null, open: false });
  const [actionNotes, setActionNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch all users to get student data
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });

  // Find the specific student
  const student = users?.find((user) => user.id === studentId) as
    | StudentData
    | undefined;

  // Update approval status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async (data: {
      userId: string;
      status: string;
      approvedBy?: string;
      rejectionReason?: string;
    }) => {
      return updateUserApprovalStatus(
        data.userId,
        data.status as "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW",
        data.approvedBy,
        data.rejectionReason
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setActionDialog({ type: null, open: false });
      setActionNotes("");

      // Show success message based on action
      if (variables.status === "APPROVED") {
        setSuccessMessage(
          "Student account approved successfully! An approval email has been sent."
        );
      } else if (variables.status === "REJECTED") {
        setSuccessMessage("Student account rejected successfully.");
      } else if (variables.status === "UNDER_REVIEW") {
        setSuccessMessage("Student account paused for review.");
      }

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    },
    onError: (error) => {
      console.error("Error updating approval status:", error);
      setSuccessMessage("Error updating approval status. Please try again.");
      setTimeout(() => setSuccessMessage(null), 5000);
    },
  });

  const handleAction = async (actionType: "approve" | "reject" | "pause") => {
    if (!student) return;

    setIsLoading(true);
    try {
      let status: string;
      let reason: string | undefined;

      switch (actionType) {
        case "approve":
          // Check if this is a reactivation (from UNDER_REVIEW to APPROVED)
          const isReactivation = student.approvalStatus === "UNDER_REVIEW";
          status = "APPROVED";
          if (isReactivation) {
            reason = "Account reactivated by admin";
          }
          break;
        case "reject":
          status = "REJECTED";
          reason = actionNotes.trim() || "Admin rejection";
          break;
        case "pause":
          status = "UNDER_REVIEW";
          reason = actionNotes.trim() || "Account paused by admin";
          break;
        default:
          return;
      }

      // Get current admin user for approvedBy data
      const currentAdmin = await getCurrentAdminUser();
      const approvedBy = currentAdmin?.user?.id || currentAdmin?.userId;

      await updateStatusMutation.mutateAsync({
        userId: student.id,
        status,
        approvedBy,
        rejectionReason: reason,
      });
    } catch (error) {
      console.error("Error performing action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      PENDING: {
        label: "Pending",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
      APPROVED: {
        label: "Approved",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      REJECTED: {
        label: "Rejected",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
      },
      UNDER_REVIEW: {
        label: "Under Review",
        variant: "outline" as const,
        icon: AlertTriangle,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
      },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading student details: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>Student not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  const statusConfig = getStatusConfig(student.approvalStatus);

  return (
    <div className="p-6 space-y-6">
      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-gray-600 mt-1">Student Details & Management</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant={statusConfig.variant}
            className={`${statusConfig.bgColor} ${statusConfig.color}`}
          >
            <statusConfig.icon className="h-3 w-3 mr-1" />
            {statusConfig.label}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage student account and approval status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {student.approvalStatus === "PENDING" && (
              <>
                <Button
                  onClick={() =>
                    setActionDialog({ type: "approve", open: true })
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Student
                </Button>
                <Button
                  onClick={() =>
                    setActionDialog({ type: "reject", open: true })
                  }
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </>
            )}
            {student.approvalStatus === "APPROVED" && (
              <Button
                onClick={() => setActionDialog({ type: "pause", open: true })}
                variant="outline"
                className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause Account
              </Button>
            )}
            {student.approvalStatus === "UNDER_REVIEW" && (
              <Button
                onClick={() => setActionDialog({ type: "approve", open: true })}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Reactivate Account
              </Button>
            )}
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      First Name
                    </Label>
                    <p className="text-lg font-medium">{student.firstName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Last Name
                    </Label>
                    <p className="text-lg font-medium">{student.lastName}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Email
                  </Label>
                  <p className="text-lg font-medium flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{student.email}</span>
                  </p>
                </div>
                {student.phone && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p className="text-lg font-medium flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{student.phone}</span>
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Registration Date
                  </Label>
                  <p className="text-lg font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Status & Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Status & Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Approval Status
                  </Label>
                  <Badge
                    variant={statusConfig.variant}
                    className={`${statusConfig.bgColor} ${statusConfig.color} mt-1`}
                  >
                    <statusConfig.icon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </div>
                {student.studentProfile && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Student Number
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.studentNumber}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Total Flight Hours
                      </Label>
                      <p className="text-lg font-medium flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-gray-400" />
                        <span>
                          {student.studentProfile.totalFlightHours || 0} hours
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          {student.studentProfile ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Student Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Student Number
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.studentNumber}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Date of Birth
                      </Label>
                      <p className="text-lg font-medium">
                        {new Date(
                          student.studentProfile.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Address
                      </Label>
                      <p className="text-lg font-medium flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{student.studentProfile.address}</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        License Number
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.licenseNumber ||
                          "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        License Type
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.licenseType || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Medical Certificate
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.medicalCert || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Name
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.emergencyContactName ||
                          "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Phone
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.emergencyContactPhone ||
                          "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        Relationship
                      </Label>
                      <p className="text-lg font-medium">
                        {student.studentProfile.emergencyContactRelationship ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Flight Hours Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Flight Hours</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {student.studentProfile.totalFlightHours || 0}
                      </div>
                      <div className="text-sm text-gray-500">Total Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {student.studentProfile.soloHours || 0}
                      </div>
                      <div className="text-sm text-gray-500">Solo Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {student.studentProfile.crossCountryHours || 0}
                      </div>
                      <div className="text-sm text-gray-500">Cross Country</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {student.studentProfile.instrumentHours || 0}
                      </div>
                      <div className="text-sm text-gray-500">Instrument</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        {student.studentProfile.nightHours || 0}
                      </div>
                      <div className="text-sm text-gray-500">Night Hours</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Profile Data
                </h3>
                <p className="text-gray-500">
                  This student hasn&apos;t completed their profile information
                  yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Documents & Certificates</span>
              </CardTitle>
              <CardDescription>
                View and manage student documents and certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Document Management
                </h3>
                <p className="text-gray-500 mb-4">
                  Documents are managed through the integrated document system.
                </p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Training Progress</span>
              </CardTitle>
              <CardDescription>
                Monitor student training progress and course enrollments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Training Data
                </h3>
                <p className="text-gray-500 mb-4">
                  Training progress and course information will be displayed
                  here.
                </p>
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock3 className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                View recent bookings, flights, and account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Activity Log
                </h3>
                <p className="text-gray-500 mb-4">
                  Recent activity and booking history will be displayed here.
                </p>
                <Button>
                  <Award className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog({ type: null, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.type === "approve" && "Approve Student"}
              {actionDialog.type === "reject" && "Reject Application"}
              {actionDialog.type === "pause" && "Pause Account"}
            </DialogTitle>
            <DialogDescription>
              {actionDialog.type === "approve" &&
                "Are you sure you want to approve this student's application?"}
              {actionDialog.type === "reject" &&
                "Please provide a reason for rejecting this application."}
              {actionDialog.type === "pause" &&
                "Please provide a reason for pausing this account."}
            </DialogDescription>
          </DialogHeader>
          {(actionDialog.type === "reject" ||
            actionDialog.type === "pause") && (
            <div className="space-y-4">
              <Label htmlFor="notes">Reason</Label>
              <Textarea
                id="notes"
                placeholder={
                  actionDialog.type === "reject"
                    ? "Enter rejection reason..."
                    : "Enter pause reason..."
                }
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialog({ type: null, open: false })}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAction(actionDialog.type!)}
              disabled={isLoading}
              className={
                actionDialog.type === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : actionDialog.type === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-600 hover:bg-yellow-700"
              }
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <>
                  {actionDialog.type === "approve" && (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {actionDialog.type === "reject" && (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  {actionDialog.type === "pause" && (
                    <Pause className="h-4 w-4 mr-2" />
                  )}
                </>
              )}
              {actionDialog.type === "approve" && "Approve"}
              {actionDialog.type === "reject" && "Reject"}
              {actionDialog.type === "pause" && "Pause"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
