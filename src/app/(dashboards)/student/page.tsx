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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  CheckCircle,
  Settings,
  Bell,
  GraduationCap,
  Target,
  User,
  Clock,
  FileText,
  Trophy,
  Plane,
  MapPin,
  MoreHorizontal,
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
import { SageConnectionStatus } from "@/components/sage/SageConnectionStatus";
import { SageFinancialData } from "@/components/sage/SageFinancialData";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // For now, using a mock user ID - in real app this would come from auth
  const mockUserId = "user_123";

  // Fetch real data using React Query hooks
  const { isLoading: userLoading } = useCurrentUser(mockUserId);
  const { data: dashboardData, isLoading: dashboardLoading } =
    useStudentDashboard(mockUserId);

  const isLoading = userLoading || dashboardLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a] p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-[#f6d57f] rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 md:w-8 h-6 md:h-8 text-[#262626]" />
            </div>
            <div>
              <h1 className="text-lg md:text-3xl font-bold text-white">
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
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
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

          {/* Mobile Actions Dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-[#f6d57f] transition-colors"
                  aria-label="Open menu"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#262626] border-gray-600 text-gray-300 w-48 shadow-xl"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuItem
                  className="focus:bg-gray-700 focus:text-white cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => console.log("Notifications clicked")}
                >
                  <Bell className="w-4 h-4 mr-2 text-[#f6d57f]" />
                  <span className="flex-1">Notifications</span>
                  {dashboardData?.notifications &&
                    dashboardData.notifications.length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        {dashboardData.notifications.length}
                      </Badge>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:bg-gray-700 focus:text-white cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => console.log("Settings clicked")}
                >
                  <Settings className="w-4 h-4 mr-2 text-[#f6d57f]" />
                  <span className="flex-1">Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-[#262626] border-[#f6d57f] gap-1 md:gap-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="training"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Training
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="logbook"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Logbook
            </TabsTrigger>
            <TabsTrigger
              value="aircraft"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Aircraft
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626] text-xs md:text-sm px-2 md:px-3"
            >
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewContent />

            {/* SAGE Financial Integration */}
            <div className="space-y-6">
              <SageConnectionStatus />
              <SageFinancialData />
            </div>
          </TabsContent>

          {/* Training Progress Tab */}
          <TabsContent value="training" className="space-y-6">
            <TrainingContent />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <ScheduleContent />
          </TabsContent>

          {/* Logbook Tab */}
          <TabsContent value="logbook" className="space-y-6">
            <LogbookContent />
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

function OverviewContent() {
  // Hardcoded dummy data for the overview
  const studentName = "Alex Johnson";
  const studentId = "ST-2024-001";
  const instructor = "Capt. Sarah Mitchell";
  const enrollmentDate = "January 15, 2024";
  const lastFlight = "2 days ago";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2 bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Training Progress
            </CardTitle>
            <CardDescription className="text-gray-300">
              Private Pilot License (PPL) - Progress Tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Overall Progress</span>
                <span className="text-[#f6d57f] font-medium">78%</span>
              </div>
              <Progress value={78} className="h-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-6">
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">42.5</div>
                <div className="text-sm text-gray-400">Total Hours</div>
                <div className="text-xs text-gray-500 mt-1">Required: 40</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">8.5</div>
                <div className="text-sm text-gray-400">Solo Hours</div>
                <div className="text-xs text-gray-500 mt-1">Required: 10</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">5</div>
                <div className="text-sm text-gray-400">Cross Country</div>
                <div className="text-xs text-gray-500 mt-1">Required: 5</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Next Milestone</span>
                <Badge
                  variant="outline"
                  className="border-[#f6d57f] text-[#f6d57f]"
                >
                  Solo Cross Country
                </Badge>
              </div>
              <p className="text-xs text-gray-400">
                Complete 1.5 more solo hours and 1 cross country flight
              </p>
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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 md:w-10 md:h-10 text-[#262626]" />
              </div>
              <h3 className="font-semibold text-white">{studentName}</h3>
              <p className="text-sm text-gray-400">Student ID: {studentId}</p>
              <Badge className="mt-2 bg-green-600">Active Student</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Instructor:</span>
                <span className="text-white">{instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Enrolled:</span>
                <span className="text-white">{enrollmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">License Type:</span>
                <span className="text-white">PPL (In Progress)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Medical Class:</span>
                <span className="text-white">Class 2 (Valid)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Flight:</span>
                <span className="text-white">{lastFlight}</span>
              </div>
            </div>

            {/* Balance Section */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#f6d57f] mb-2">
                  $2,450.00
                </div>
                <div className="text-sm text-gray-400 mb-3">
                  Remaining Balance
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Total Paid: $5,550.00</span>
                  <span>Total Cost: $8,000.00</span>
                </div>
                <div className="mt-3">
                  <Progress value={69} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">
                    69% of course paid
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: "Cross Country",
            value: "5.0",
            subtitle: "Required: 5.0",
            icon: MapPin,
            status: "complete",
          },
          {
            label: "Night Hours",
            value: "2.5",
            subtitle: "Required: 3.0",
            icon: Clock,
            status: "in-progress",
          },
          {
            label: "Instrument",
            value: "1.5",
            subtitle: "Required: 3.0",
            icon: Plane,
            status: "in-progress",
          },
          {
            label: "Achievements",
            value: "8",
            subtitle: "Milestones",
            icon: Trophy,
            status: "complete",
          },
        ].map((stat, index) => (
          <Card key={index} className="bg-[#262626] border-gray-600">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.status === "complete"
                      ? "bg-green-500 bg-opacity-20"
                      : "bg-[#f6d57f] bg-opacity-20"
                  }`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${
                      stat.status === "complete"
                        ? "text-green-500"
                        : "text-[#f6d57f]"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                  activity: "Completed Pattern Work & Landings",
                  time: "2 hours ago",
                  icon: CheckCircle,
                  details: "1.2 hours logged, instructor: Capt. Mitchell",
                  status: "completed",
                },
                {
                  activity: "Scheduled Cross Country Navigation",
                  time: "1 day ago",
                  icon: Calendar,
                  details: "Feb 20, 09:00-11:00, aircraft: Cessna 172",
                  status: "scheduled",
                },
                {
                  activity: "Updated Logbook Entry",
                  time: "2 days ago",
                  icon: FileText,
                  details: "Added emergency procedures training session",
                  status: "completed",
                },
                {
                  activity: "Achieved 40 Flight Hours Milestone",
                  time: "3 days ago",
                  icon: Trophy,
                  details: "Major progress toward PPL requirements",
                  status: "milestone",
                },
                {
                  activity: "Completed Ground School Module",
                  time: "1 week ago",
                  icon: GraduationCap,
                  details: "Weather Theory & Navigation completed",
                  status: "completed",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.status === "completed"
                        ? "bg-green-500 bg-opacity-20"
                        : item.status === "milestone"
                          ? "bg-[#f6d57f] bg-opacity-20"
                          : "bg-blue-500 bg-opacity-20"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        item.status === "completed"
                          ? "text-green-500"
                          : item.status === "milestone"
                            ? "text-[#f6d57f]"
                            : "text-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">
                      {item.activity}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{item.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
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
                  time: "09:00-11:00",
                  instructor: "Capt. Mitchell",
                  aircraft: "Cessna 172",
                  status: "confirmed",
                  type: "Navigation",
                },
                {
                  lesson: "Pattern Work & Landings",
                  date: "Feb 22",
                  time: "14:00-16:00",
                  instructor: "Capt. Johnson",
                  aircraft: "Cessna 152",
                  status: "confirmed",
                  type: "Maneuvers",
                },
                {
                  lesson: "Emergency Procedures",
                  date: "Feb 25",
                  time: "10:00-12:00",
                  instructor: "Capt. Mitchell",
                  aircraft: "Cessna 172",
                  status: "pending",
                  type: "Safety",
                },
                {
                  lesson: "Night Flying Introduction",
                  date: "Feb 28",
                  time: "19:00-21:00",
                  instructor: "Capt. Brown",
                  aircraft: "Cessna 172",
                  status: "tentative",
                  type: "Night Rating",
                },
              ].map((lesson, index) => (
                <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">
                        {lesson.lesson}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {lesson.type} • {lesson.aircraft}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          lesson.status === "confirmed"
                            ? "border-green-500 text-green-400"
                            : lesson.status === "pending"
                              ? "border-yellow-500 text-yellow-400"
                              : "border-gray-500 text-gray-400"
                        }`}
                      >
                        {lesson.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[#f6d57f] text-[#f6d57f] text-xs"
                      >
                        {lesson.date}
                      </Badge>
                    </div>
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
