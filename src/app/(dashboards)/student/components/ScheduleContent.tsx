"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plane, Wind, MapPin } from "lucide-react";

export function ScheduleContent() {
  const upcomingLessons = [
    {
      id: 1,
      date: "2024-02-20",
      time: "09:00 - 11:00",
      instructor: "Captain Sarah Mitchell",
      aircraft: "Cessna 172 (ZS-PMB)",
      lesson: "Cross Country Navigation",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2024-02-22",
      time: "14:00 - 16:00",
      instructor: "Captain Mike Johnson",
      aircraft: "Cessna 152 (ZS-FLY)",
      lesson: "Pattern Work & Landings",
      status: "pending",
    },
    {
      id: 3,
      date: "2024-02-25",
      time: "10:00 - 12:00",
      instructor: "Captain Sarah Mitchell",
      aircraft: "Piper PA-28 (ZS-AVN)",
      lesson: "Emergency Procedures",
      status: "confirmed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Flight Schedule</h2>
        <Button className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]">
          <Calendar className="w-4 h-4 mr-2" />
          Book New Lesson
        </Button>
      </div>

      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Lessons</CardTitle>
          <CardDescription className="text-gray-300">
            Your scheduled flight training sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {lesson.lesson}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {lesson.date} • {lesson.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      lesson.status === "confirmed" ? "default" : "outline"
                    }
                    className={
                      lesson.status === "confirmed"
                        ? "bg-green-600"
                        : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {lesson.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Instructor:</span>
                    <p className="text-white">{lesson.instructor}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Aircraft:</span>
                    <p className="text-white">{lesson.aircraft}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Reschedule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white">
              Instructor Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Captain Sarah Mitchell",
                  availability: "Available Today",
                  status: "available",
                },
                {
                  name: "Captain Mike Johnson",
                  availability: "Next Available: Tomorrow",
                  status: "busy",
                },
                {
                  name: "Captain Lisa Brown",
                  availability: "Available This Week",
                  status: "available",
                },
              ].map((instructor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        instructor.status === "available"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {instructor.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {instructor.availability}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
                  >
                    Book
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white">Weather Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-white mb-2">22°C</div>
              <div className="text-sm text-gray-300 mb-2">Partly Cloudy</div>
              <div className="text-xs text-gray-400">
                Perfect conditions for flight training
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-[#f6d57f]" />
                <div>
                  <p className="text-gray-400">Wind</p>
                  <p className="text-white">8 kts</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#f6d57f]" />
                <div>
                  <p className="text-gray-400">Visibility</p>
                  <p className="text-white">10+ km</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
