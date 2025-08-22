"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle,
  Settings,
  Bell,
  GraduationCap,
  AlertCircle,
  Loader2,
  Target,
  User,
  Clock,
} from "lucide-react";

// Import component modules
import { TrainingContent } from "./components/TrainingContent";
import { ScheduleContent } from "./components/ScheduleContent";
import { LogbookContent } from "./components/LogbookContent";
import { AircraftContent } from "./components/AircraftContent";
import { ResourcesContent } from "./components/ResourcesContent";

// Import hooks
import { useStudentDashboard } from "@/lib/hooks/use-student-data";
import { useCurrentUser } from "@/lib/hooks/use-user-data";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // For now, using a mock user ID - in real app this would come from auth
  const mockUserId = "user_123";

  // Fetch real data using React Query hooks
  const { isLoading: userLoading } = useCurrentUser(mockUserId);
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    error,
  } = useStudentDashboard(mockUserId);

  const isLoading = userLoading || dashboardLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-[#262626]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Student Dashboard
              </h1>
              {isLoading ? (
                <Skeleton className="h-5 w-48 mt-1" />
              ) : (
                <p className="text-gray-300">
                  Welcome back, {dashboardData?.profile?.user?.firstName}{" "}
                  {dashboardData?.profile?.user?.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {dashboardData?.notifications &&
                dashboardData.notifications.length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {dashboardData.notifications.length}
                  </Badge>
                )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-[#262626] border-[#f6d57f]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="training"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Training
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="logbook"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Logbook
            </TabsTrigger>
            <TabsTrigger
              value="aircraft"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Aircraft
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              </div>
            ) : error ? (
              <Card className="bg-[#262626] border-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>
                      Failed to load dashboard data. Please try again.
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <OverviewContent dashboardData={dashboardData ?? {}} />
            )}
          </TabsContent>

          {/* Training Progress Tab */}
          <TabsContent value="training" className="space-y-6">
            <TrainingContent
              dashboardData={dashboardData}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <ScheduleContent
              dashboardData={dashboardData}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* Logbook Tab */}
          <TabsContent value="logbook" className="space-y-6">
            <LogbookContent
              dashboardData={dashboardData}
              isLoading={isLoading}
            />
          </TabsContent>

          {/* Aircraft Tab */}
          <TabsContent value="aircraft" className="space-y-6">
            <AircraftContent />
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <ResourcesContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OverviewContent({
  dashboardData,
}: {
  dashboardData: Record<string, unknown>;
}) {
  if (!dashboardData?.profile) {
    return (
      <Card className="bg-[#262626] border-gray-600">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading student data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const studentProfile = dashboardData.profile;
  const user = studentProfile.user;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Training Progress
            </CardTitle>
            <CardDescription className="text-gray-300">
              {studentProfile.enrollments?.[0]?.course?.name ||
                "Training Program"}{" "}
              - Progress Tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall Progress</span>
                <span className="text-[#f6d57f] font-medium">85%</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">
                  {studentProfile.totalFlightHours || 0}
                </div>
                <div className="text-sm text-gray-400">Total Hours</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">
                  {studentProfile.soloHours || 0}
                </div>
                <div className="text-sm text-gray-400">Solo Hours</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Next Milestone</span>
                <Badge
                  variant="outline"
                  className="border-[#f6d57f] text-[#f6d57f]"
                >
                  Next Milestone
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-[#262626]" />
              </div>
              <h3 className="font-semibold text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-400">
                {studentProfile.studentNumber}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Instructor:</span>
                <span className="text-white">
                  {studentProfile.enrollments?.[0]?.instructor?.user?.firstName}{" "}
                  {studentProfile.enrollments?.[0]?.instructor?.user?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Enrolled:</span>
                <span className="text-white">
                  {new Date(studentProfile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">License Type:</span>
                <span className="text-white">PPL</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Cross Country",
            value: studentProfile.crossCountryHours || 0,
            icon: MapPin,
            color: "blue",
          },
          {
            label: "Night Hours",
            value: studentProfile.nightHours || 0,
            icon: Clock,
            color: "purple",
          },
          {
            label: "Instrument",
            value: studentProfile.instrumentHours || 0,
            icon: Plane,
            color: "green",
          },
          { label: "Achievements", value: "12", icon: Trophy, color: "yellow" },
        ].map((stat, index) => (
          <Card key={index} className="bg-[#262626] border-gray-600">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#f6d57f] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-[#f6d57f]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  activity: "Completed Pattern Work lesson",
                  time: "2 hours ago",
                  icon: CheckCircle,
                },
                {
                  activity: "Scheduled next lesson",
                  time: "1 day ago",
                  icon: Calendar,
                },
                {
                  activity: "Updated logbook entry",
                  time: "2 days ago",
                  icon: FileText,
                },
                {
                  activity: "Achieved 40 flight hours",
                  time: "3 days ago",
                  icon: Trophy,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <item.icon className="w-4 h-4 text-[#f6d57f]" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.activity}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Upcoming Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  lesson: "Cross Country Navigation",
                  date: "Feb 20",
                  time: "09:00",
                  instructor: "Capt. Mitchell",
                },
                {
                  lesson: "Pattern Work",
                  date: "Feb 22",
                  time: "14:00",
                  instructor: "Capt. Johnson",
                },
                {
                  lesson: "Emergency Procedures",
                  date: "Feb 25",
                  time: "10:00",
                  instructor: "Capt. Mitchell",
                },
              ].map((lesson, index) => (
                <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-white">
                      {lesson.lesson}
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-[#f6d57f] text-[#f6d57f] text-xs"
                    >
                      {lesson.date}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">
                    {lesson.time} • {lesson.instructor}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
