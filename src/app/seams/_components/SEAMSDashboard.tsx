"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plane,
  Users,
  Wrench,
  Fuel,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  // Clock,
  MapPin,
  BarChart3,
} from "lucide-react";

export function SEAMSDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#262626] mb-4">
            SEAMS Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Smart Electronic Aviation Management System - Real-time overview of
            operations
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-gray-600">Active Flights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Flight Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Maintenance Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Fuel className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-gray-600">Fuel Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Recent Flights */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-600">
                <Plane className="h-5 w-5" />
                <span>Recent Flights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "FL001",
                    aircraft: "Cessna 172",
                    pilot: "John Smith",
                    status: "Completed",
                    time: "2h 15m",
                  },
                  {
                    id: "FL002",
                    aircraft: "Piper PA-28",
                    pilot: "Sarah Johnson",
                    status: "In Progress",
                    time: "1h 30m",
                  },
                  {
                    id: "FL003",
                    aircraft: "Cessna 152",
                    pilot: "Mike Davis",
                    status: "Scheduled",
                    time: "2h 00m",
                  },
                ].map((flight) => (
                  <div
                    key={flight.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          flight.status === "Completed"
                            ? "bg-green-500"
                            : flight.status === "In Progress"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{flight.aircraft}</p>
                        <p className="text-xs text-gray-500">{flight.pilot}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{flight.status}</p>
                      <p className="text-xs text-gray-500">{flight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    name: "Schedule Flight",
                    icon: Plane,
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    name: "Check Weather",
                    icon: MapPin,
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    name: "View NOTAMs",
                    icon: AlertTriangle,
                    color: "bg-red-100 text-red-600",
                  },
                  {
                    name: "Generate Report",
                    icon: BarChart3,
                    color: "bg-purple-100 text-purple-600",
                  },
                ].map((action) => (
                  <button
                    key={action.name}
                    className={`p-4 rounded-lg ${action.color} hover:scale-105 transition-transform duration-200`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{action.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status & Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* System Status */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    System Status
                  </h3>
                  <p className="text-sm text-green-600">
                    All systems operational
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Flight Operations</span>
                  <span className="text-green-600">✓ Online</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Maintenance</span>
                  <span className="text-green-600">✓ Online</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Weather Service</span>
                  <span className="text-green-600">✓ Online</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    Current Weather
                  </h3>
                  <p className="text-sm text-blue-600">
                    Pietermaritzburg Airport
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">
                  22°C
                </div>
                <div className="text-sm text-blue-600 mb-2">Partly Cloudy</div>
                <div className="text-xs text-blue-500">
                  Wind: 8 kts, Visibility: 10+ km
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="text-lg font-semibold text-orange-800">
                    Active Alerts
                  </h3>
                  <p className="text-sm text-orange-600">
                    3 items require attention
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700">
                    Maintenance due: Cessna 172
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700">
                    Fuel level low: Piper PA-28
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-700">
                    Weather warning: Thunderstorms
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
