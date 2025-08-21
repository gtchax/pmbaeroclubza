"use client";

import { AuthGuard, RoleGuard, useApprovalStatus } from "@/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, User, Shield, Plane } from "lucide-react";

export default function DashboardPage() {
  return (
    <AuthGuard requireApproval={true} showPendingMessage={true}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* User Status Section */}
          <UserStatusSection />

          {/* Role-Based Content */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Student Content */}
            <RoleGuard requiredRoles={["STUDENT"]}>
              <StudentDashboard />
            </RoleGuard>

            {/* Instructor Content */}
            <RoleGuard requiredRoles={["INSTRUCTOR"]}>
              <InstructorDashboard />
            </RoleGuard>

            {/* Admin Content */}
            <RoleGuard requiredRoles={["ADMIN"]}>
              <AdminDashboard />
            </RoleGuard>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function UserStatusSection() {
  const {
    isApproved,
    isPending,
    isRejected,
    userRole,
    userType,
    approvalDate,
    rejectionReason,
    refreshApprovalStatus,
  } = useApprovalStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Status
        </CardTitle>
        <CardDescription>
          Your current account status and role information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          {isApproved && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved
            </Badge>
          )}
          {isPending && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Clock className="h-3 w-3 mr-1" />
              Pending Approval
            </Badge>
          )}
          {isRejected && (
            <Badge className="bg-red-100 text-red-800">
              <XCircle className="h-3 w-3 mr-1" />
              Rejected
            </Badge>
          )}
        </div>

        {/* User Information */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Role:</span>
            <Badge variant="outline" className="ml-2">
              {userRole || "Not assigned"}
            </Badge>
          </div>
          <div>
            <span className="font-medium">Type:</span>
            <Badge variant="outline" className="ml-2 capitalize">
              {userType || "Unknown"}
            </Badge>
          </div>
        </div>

        {/* Approval Details */}
        {isApproved && approvalDate && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Approved on:</span>{" "}
            {new Date(approvalDate).toLocaleDateString()}
          </div>
        )}

        {isRejected && rejectionReason && (
          <div className="text-sm">
            <span className="font-medium text-red-600">Rejection Reason:</span>
            <p className="text-red-600 mt-1">{rejectionReason}</p>
          </div>
        )}

        {/* Refresh Button */}
        <Button onClick={refreshApprovalStatus} variant="outline" size="sm">
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
}

function StudentDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Student Dashboard
        </CardTitle>
        <CardDescription>
          Access your flight training progress and resources
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-blue-600">Flight Hours</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-green-600">Solo Hours</div>
          </div>
        </div>
        <Button className="w-full">View Training Progress</Button>
      </CardContent>
    </Card>
  );
}

function InstructorDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Instructor Dashboard
        </CardTitle>
        <CardDescription>
          Manage your students and flight operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-purple-600">Active Students</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-orange-600">Instruction Hours</div>
          </div>
        </div>
        <Button className="w-full">Manage Students</Button>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Admin Dashboard
        </CardTitle>
        <CardDescription>
          Administrative tools and system management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-red-600">Pending Approvals</div>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">0</div>
            <div className="text-indigo-600">Total Users</div>
          </div>
        </div>
        <Button className="w-full">Manage Users</Button>
      </CardContent>
    </Card>
  );
}
