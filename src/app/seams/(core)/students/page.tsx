"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  CheckCircle,
  AlertTriangle,
  Download,
  RefreshCw,
  User,
  Clock,
} from "lucide-react";
import { StudentDataTable } from "./components/StudentDataTable";

// Define a simple interface for the student data we need
interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  approvalStatus: string;
  createdAt: Date;
  studentProfile?: any; // We'll handle this with type assertions
}

export default function StudentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch all users (students)
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });

  // Filter students from all users and transform to match Student interface
  const students =
    users
      ?.filter((user) =>
        user.roles.some((role) => role.role.name === "STUDENT")
      )
      .map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || undefined,
        approvalStatus: user.approvalStatus,
        createdAt: user.createdAt,
        studentProfile: user.studentProfile
          ? {
              id: user.studentProfile.id,
              userId: user.studentProfile.userId,
              studentNumber: user.studentProfile.studentNumber,
              dateOfBirth: user.studentProfile.dateOfBirth,
              address: user.studentProfile.address,
              emergencyContactName: user.studentProfile.emergencyContactName,
              emergencyContactPhone: user.studentProfile.emergencyContactPhone,
              emergencyContactRelationship:
                user.studentProfile.emergencyContactRelationship,
              medicalCert: user.studentProfile.medicalCert,
              medicalExpiry: user.studentProfile.medicalExpiry,
              licenseNumber: user.studentProfile.licenseNumber,
              licenseType: user.studentProfile.licenseType,
              licenseExpiry: user.studentProfile.licenseExpiry,
              totalFlightHours: user.studentProfile.totalFlightHours,
              soloHours: user.studentProfile.soloHours,
              crossCountryHours: user.studentProfile.crossCountryHours,
              instrumentHours: user.studentProfile.instrumentHours,
              nightHours: user.studentProfile.nightHours,
              createdAt: user.studentProfile.createdAt,
              updatedAt: user.studentProfile.updatedAt,
            }
          : undefined,
      })) || [];

  // Filter students based on search and status
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || student.approvalStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Group students by status for tabs
  const pendingStudents = filteredStudents.filter(
    (s) => s.approvalStatus === "PENDING"
  );
  const approvedStudents = filteredStudents.filter(
    (s) => s.approvalStatus === "APPROVED"
  );
  const underReviewStudents = filteredStudents.filter(
    (s) => s.approvalStatus === "UNDER_REVIEW"
  );
  const rejectedStudents = filteredStudents.filter(
    (s) => s.approvalStatus === "REJECTED"
  );

  const handleViewDetails = (student: StudentData) => {
    router.push(`/seams/students/${student.id}`);
  };

  const handleRequestInfo = (student: StudentData) => {
    // Navigate to student detail page with request info tab
    router.push(`/seams/students/${student.id}?tab=request-info`);
  };

  const handleApproval = (student: StudentData) => {
    // Navigate to student detail page with approval dialog
    router.push(`/seams/students/${student.id}?tab=approval`);
  };

  const handlePauseAccount = (student: StudentData) => {
    // Navigate to student detail page with pause dialog
    router.push(`/seams/students/${student.id}?tab=pause`);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading students: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all student registrations and accounts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {pendingStudents.length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {approvedStudents.length}
            </div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {underReviewStudents.length}
            </div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>
            Find specific students or filter by status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="PAUSED">Paused</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student Management Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All Students ({filteredStudents.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingStudents.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedStudents.length})
          </TabsTrigger>
          <TabsTrigger value="under-review">
            Under Review ({underReviewStudents.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedStudents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <StudentDataTable
            students={filteredStudents}
            onViewDetails={handleViewDetails}
            onRequestInfo={handleRequestInfo}
            onApproval={handleApproval}
            onPauseAccount={handlePauseAccount}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <StudentDataTable
            students={pendingStudents}
            onViewDetails={handleViewDetails}
            onRequestInfo={handleRequestInfo}
            onApproval={handleApproval}
            onPauseAccount={handlePauseAccount}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <StudentDataTable
            students={approvedStudents}
            onViewDetails={handleViewDetails}
            onRequestInfo={handleRequestInfo}
            onApproval={handleApproval}
            onPauseAccount={handlePauseAccount}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="under-review" className="space-y-4">
          <StudentDataTable
            students={underReviewStudents}
            onViewDetails={handleViewDetails}
            onRequestInfo={handleRequestInfo}
            onApproval={handleApproval}
            onPauseAccount={handlePauseAccount}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <StudentDataTable
            students={rejectedStudents}
            onViewDetails={handleViewDetails}
            onRequestInfo={handleRequestInfo}
            onApproval={handleApproval}
            onPauseAccount={handlePauseAccount}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
