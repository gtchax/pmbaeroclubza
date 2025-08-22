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
import {
  Calendar,
  Clock,
  CheckCircle,
  Settings,
  Bell,
  GraduationCap,
  Star,
  Target,
  User,
  TrendingUp,
} from "lucide-react";

// Import component modules
import { StudentsContent } from "./components/StudentsContent";
import { ScheduleContent } from "./components/ScheduleContent";
import { EvaluationsContent } from "./components/EvaluationsContent";
import { AircraftContent } from "./components/AircraftContent";
import { CurriculumContent } from "./components/CurriculumContent";
import { LogbookContent } from "./components/LogbookContent";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock instructor data
  const instructorData = {
    name: "Captain Sarah Mitchell",
    instructorId: "CFI-2024-001",
    certifications: ["CFI", "CFII", "MEI"],
    totalFlightHours: 3250,
    instructionalHours: 1850,
    activeStudents: 12,
    completedStudents: 45,
    averagePassRate: 92,
    nextRecurrency: "2024-08-15",
    specializations: ["PPL", "Instrument Rating", "Commercial"],
  };

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
                Instructor Dashboard
              </h1>
              <p className="text-gray-300">
                Welcome back, {instructorData.name}
              </p>
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
          <TabsList className="grid w-full grid-cols-7 bg-[#262626] border-[#f6d57f]">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Students
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="evaluations"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Evaluations
            </TabsTrigger>
            <TabsTrigger
              value="aircraft"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Aircraft
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="logbook"
              className="data-[state=active]:bg-[#f6d57f] data-[state=active]:text-[#262626]"
            >
              Logbook
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewContent instructorData={instructorData} />
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <StudentsContent instructorData={instructorData} />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <ScheduleContent />
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-6">
            <EvaluationsContent />
          </TabsContent>

          {/* Aircraft Tab */}
          <TabsContent value="aircraft" className="space-y-6">
            <AircraftContent />
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            <CurriculumContent />
          </TabsContent>

          {/* Logbook Tab */}
          <TabsContent value="logbook" className="space-y-6">
            <LogbookContent instructorData={instructorData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OverviewContent({
  instructorData,
}: {
  instructorData: Record<string, unknown>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Instructor Profile & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Instructor Performance
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your teaching metrics and student success rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">
                  {instructorData.activeStudents}
                </div>
                <div className="text-sm text-gray-400">Active Students</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">
                  {instructorData.completedStudents}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center p-4 bg-[#1a1a1a] rounded-lg">
                <div className="text-2xl font-bold text-[#f6d57f]">
                  {instructorData.averagePassRate}%
                </div>
                <div className="text-sm text-gray-400">Pass Rate</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Student Success Rate</span>
                <span className="text-[#f6d57f] font-medium">
                  {instructorData.averagePassRate}%
                </span>
              </div>
              <Progress
                value={instructorData.averagePassRate}
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Instructor Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-[#262626]" />
              </div>
              <h3 className="font-semibold text-white">
                {instructorData.name}
              </h3>
              <p className="text-sm text-gray-400">
                {instructorData.instructorId}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Hours:</span>
                <span className="text-white">
                  {instructorData.totalFlightHours}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Instructional:</span>
                <span className="text-white">
                  {instructorData.instructionalHours}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Recurrency:</span>
                <span className="text-white">
                  {instructorData.nextRecurrency}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {instructorData.certifications.map(
                (cert: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#f6d57f] text-[#f6d57f] text-xs"
                  >
                    {cert}
                  </Badge>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Today's Lessons",
            value: "6",
            icon: Calendar,
            color: "blue",
          },
          { label: "This Week", value: "28", icon: Clock, color: "green" },
          {
            label: "Pending Evaluations",
            value: "4",
            icon: ClipboardList,
            color: "orange",
          },
          { label: "Achievements", value: "15", icon: Trophy, color: "yellow" },
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

      {/* Today's Schedule & Student Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  time: "09:00",
                  student: "Alex Johnson",
                  lesson: "Cross Country Navigation",
                  aircraft: "ZS-PMB",
                },
                {
                  time: "11:00",
                  student: "Maria Garcia",
                  lesson: "Pattern Work",
                  aircraft: "ZS-FLY",
                },
                {
                  time: "14:00",
                  student: "John Smith",
                  lesson: "First Solo",
                  aircraft: "ZS-AVN",
                },
                {
                  time: "16:00",
                  student: "Lisa Chen",
                  lesson: "Instrument Training",
                  aircraft: "ZS-PMB",
                },
              ].map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {lesson.time} - {lesson.student}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lesson.lesson} • {lesson.aircraft}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
                  >
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Student Progress Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  student: "Alex Johnson",
                  alert: "Ready for checkride",
                  type: "success",
                  action: "Schedule",
                },
                {
                  student: "Maria Garcia",
                  alert: "Struggling with landings",
                  type: "warning",
                  action: "Review",
                },
                {
                  student: "John Smith",
                  alert: "Solo requirements met",
                  type: "info",
                  action: "Approve",
                },
                {
                  student: "Lisa Chen",
                  alert: "Medical expires soon",
                  type: "urgent",
                  action: "Remind",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        alert.type === "success"
                          ? "bg-green-500"
                          : alert.type === "warning"
                            ? "bg-yellow-500"
                            : alert.type === "info"
                              ? "bg-blue-500"
                              : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {alert.student}
                      </p>
                      <p className="text-xs text-gray-400">{alert.alert}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
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
                activity: "Completed lesson with Alex Johnson",
                time: "2 hours ago",
                icon: CheckCircle,
              },
              {
                activity: "Updated curriculum for PPL course",
                time: "4 hours ago",
                icon: BookOpen,
              },
              {
                activity: "Approved John Smith for solo flight",
                time: "1 day ago",
                icon: Star,
              },
              {
                activity: "Submitted monthly flight report",
                time: "2 days ago",
                icon: FileText,
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
    </motion.div>
  );
}
