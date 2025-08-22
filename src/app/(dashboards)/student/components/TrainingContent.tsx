"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Star,
  Plane,
  MapPin,
  Clock,
  Trophy,
} from "lucide-react";

export function TrainingContent() {
  const trainingModules = [
    {
      name: "Pre-Flight Procedures",
      progress: 100,
      status: "completed",
      lessons: 8,
    },
    {
      name: "Basic Flight Maneuvers",
      progress: 90,
      status: "in-progress",
      lessons: 12,
    },
    {
      name: "Navigation & Cross Country",
      progress: 75,
      status: "in-progress",
      lessons: 10,
    },
    {
      name: "Emergency Procedures",
      progress: 60,
      status: "in-progress",
      lessons: 6,
    },
    { name: "Night Flying", progress: 30, status: "pending", lessons: 5 },
    { name: "Instrument Flying", progress: 0, status: "locked", lessons: 8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-[#f6d57f]" />
            Training Modules
          </CardTitle>
          <CardDescription className="text-gray-300">
            Track your progress through each training module
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map((module, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        module.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : module.status === "in-progress"
                            ? "bg-blue-100 text-blue-600"
                            : module.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {module.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : module.status === "locked" ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{module.name}</h3>
                      <p className="text-sm text-gray-400">
                        {module.lessons} lessons
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      module.status === "completed" ? "default" : "outline"
                    }
                    className={
                      module.status === "completed"
                        ? "bg-green-600"
                        : "border-[#f6d57f] text-[#f6d57f]"
                    }
                  >
                    {module.status === "completed"
                      ? "Completed"
                      : module.status === "in-progress"
                        ? "In Progress"
                        : module.status === "pending"
                          ? "Pending"
                          : "Locked"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#f6d57f]">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { skill: "Takeoffs & Landings", score: 85, trend: "up" },
                { skill: "Radio Communications", score: 92, trend: "up" },
                { skill: "Navigation", score: 78, trend: "stable" },
                { skill: "Emergency Procedures", score: 88, trend: "up" },
              ].map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">
                        {skill.skill}
                      </span>
                      <span className="text-sm text-[#f6d57f]">
                        {skill.score}%
                      </span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                  <TrendingUp
                    className={`w-4 h-4 ml-3 ${
                      skill.trend === "up" ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "First Solo Flight", date: "2024-02-15", icon: Plane },
                {
                  title: "Cross Country Navigation",
                  date: "2024-02-10",
                  icon: MapPin,
                },
                {
                  title: "Night Flying Endorsement",
                  date: "2024-02-05",
                  icon: Clock,
                },
                { title: "25 Flight Hours", date: "2024-01-28", icon: Trophy },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                    <achievement.icon className="w-4 h-4 text-[#262626]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-400">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
