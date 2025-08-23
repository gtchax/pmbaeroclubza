"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Calendar,
  Clock,
  MapPin,
  // Users,
  // Fuel,
  AlertTriangle,
  CheckCircle,
  // XCircle,
  Plus,
  Search,
  // Filter,
  Download,
  Upload,
  Eye,
  Edit,
  // Trash2,
  // Phone,
  // Mail,
  FileText,
} from "lucide-react";
import {
  Flight,
  FlightStatus,
  FlightType,
  FlightPurpose,
  WeatherConditions,
  // NOTAM,
} from "@/lib/types";

interface FlightScheduleData {
  flights: Flight[];
  conflicts: FlightConflict[];
  weatherAlerts: WeatherAlert[];
  notamAlerts: NOTAMAlert[];
}

interface FlightConflict {
  id: string;
  type: ConflictType;
  severity: ConflictSeverity;
  description: string;
  affectedFlights: string[];
  resolution: string;
  status: ConflictStatus;
}

enum ConflictType {
  AIRCRAFT_OVERLAP = "aircraft_overlap",
  CREW_OVERLAP = "crew_overlap",
  MAINTENANCE_CONFLICT = "maintenance_conflict",
  WEATHER_IMPACT = "weather_impact",
  NOTAM_IMPACT = "notam_impact",
  FUEL_CONFLICT = "fuel_conflict",
}

enum ConflictSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

enum ConflictStatus {
  OPEN = "open",
  RESOLVED = "resolved",
  IGNORED = "ignored",
}

interface WeatherAlert {
  id: string;
  type: string;
  severity: string;
  description: string;
  affectedFlights: string[];
  validFrom: Date;
  validTo: Date;
}

interface NOTAMAlert {
  id: string;
  notamNumber: string;
  type: string;
  description: string;
  affectedFlights: string[];
  priority: string;
  validFrom: Date;
  validTo: Date;
}

export function FlightOperations() {
  const [scheduleData, setScheduleData] = useState<FlightScheduleData | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [filterStatus, setFilterStatus] = useState<FlightStatus | "all">("all");
  const [filterType, setFilterType] = useState<FlightType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockData: FlightScheduleData = {
      flights: [
        {
          id: "1",
          flightNumber: "PMB001",
          aircraftId: "AC001",
          pilotId: "P001",
          coPilotId: "P002",
          departureAirport: "FAPM",
          arrivalAirport: "FAPM",
          departureTime: new Date("2024-01-15T08:00:00Z"),
          arrivalTime: new Date("2024-01-15T09:30:00Z"),
          status: FlightStatus.SCHEDULED,
          flightType: FlightType.TRAINING,
          purpose: FlightPurpose.STUDENT_TRAINING,
          passengers: 1,
          cargo: 0,
          fuelRequired: 45,
          weatherConditions: {} as WeatherConditions,
          notams: [],
          flightLog: [],
          maintenanceChecks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          flightNumber: "PMB002",
          aircraftId: "AC002",
          pilotId: "P003",
          departureAirport: "FAPM",
          arrivalAirport: "FADN",
          departureTime: new Date("2024-01-15T10:00:00Z"),
          arrivalTime: new Date("2024-01-15T11:30:00Z"),
          status: FlightStatus.SCHEDULED,
          flightType: FlightType.COMMERCIAL,
          purpose: FlightPurpose.BUSINESS,
          passengers: 4,
          cargo: 100,
          fuelRequired: 65,
          weatherConditions: {} as WeatherConditions,
          notams: [],
          flightLog: [],
          maintenanceChecks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          flightNumber: "PMB003",
          aircraftId: "AC001",
          pilotId: "P001",
          departureAirport: "FAPM",
          arrivalAirport: "FAPM",
          departureTime: new Date("2024-01-15T14:00:00Z"),
          arrivalTime: new Date("2024-01-15T15:30:00Z"),
          status: FlightStatus.SCHEDULED,
          flightType: FlightType.TRAINING,
          purpose: FlightPurpose.INSTRUMENT_RATING,
          passengers: 1,
          cargo: 0,
          fuelRequired: 50,
          weatherConditions: {} as WeatherConditions,
          notams: [],
          flightLog: [],
          maintenanceChecks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      conflicts: [
        {
          id: "C1",
          type: ConflictType.AIRCRAFT_OVERLAP,
          severity: ConflictSeverity.HIGH,
          description:
            "Aircraft AC001 scheduled for overlapping flights PMB001 and PMB003",
          affectedFlights: ["PMB001", "PMB003"],
          resolution: "Reschedule PMB003 to 16:00",
          status: ConflictStatus.OPEN,
        },
      ],
      weatherAlerts: [
        {
          id: "W1",
          type: "Low Visibility",
          severity: "medium",
          description: "Reduced visibility expected between 14:00-16:00",
          affectedFlights: ["PMB003"],
          validFrom: new Date("2024-01-15T14:00:00Z"),
          validTo: new Date("2024-01-15T16:00:00Z"),
        },
      ],
      notamAlerts: [],
    };

    setTimeout(() => {
      setScheduleData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f6d57f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Flight Operations...</p>
        </div>
      </div>
    );
  }

  if (!scheduleData) {
    return <div>Error loading flight operations data</div>;
  }

  const { flights, conflicts, weatherAlerts, notamAlerts } = scheduleData;

  const getStatusColor = (status: FlightStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "boarding":
        return "bg-yellow-100 text-yellow-800";
      case "departed":
        return "bg-purple-100 text-purple-800";
      case "in_flight":
        return "bg-green-100 text-green-800";
      case "arrived":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "delayed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getConflictSeverityColor = (severity: ConflictSeverity) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-[#262626] mb-2">
              Flight Operations Management
            </h1>
            <p className="text-gray-600">
              Real-time flight scheduling, conflict detection, and dispatch
              management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Flight
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Controls and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Date Selection */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-transparent"
                />
              </div>

              {/* View Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View
                </label>
                <select
                  value={viewMode}
                  onChange={(e) =>
                    setViewMode(e.target.value as "day" | "week" | "month")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-transparent"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value as FlightStatus | "all")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="boarding">Boarding</option>
                  <option value="departed">Departed</option>
                  <option value="in_flight">In Flight</option>
                  <option value="arrived">Arrived</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(e.target.value as FlightType | "all")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="training">Training</option>
                  <option value="charter">Charter</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="ferry">Ferry</option>
                  <option value="test">Test</option>
                </select>
              </div>

              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search flights, aircraft, or pilots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alerts and Conflicts */}
      {(conflicts.length > 0 ||
        weatherAlerts.length > 0 ||
        notamAlerts.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Conflicts */}
          {conflicts.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Flight Conflicts Detected</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {conflicts.map((conflict) => (
                    <div
                      key={conflict.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getConflictSeverityColor(conflict.severity)}`}
                        >
                          {conflict.severity}
                        </span>
                        <div>
                          <p className="font-semibold text-red-800">
                            {conflict.description}
                          </p>
                          <p className="text-sm text-red-600">
                            Affected: {conflict.affectedFlights.join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weather Alerts */}
          {weatherAlerts.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Weather Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weatherAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200"
                    >
                      <div>
                        <p className="font-semibold text-orange-800">
                          {alert.type}
                        </p>
                        <p className="text-sm text-orange-600">
                          {alert.description}
                        </p>
                        <p className="text-xs text-orange-500">
                          {alert.validFrom.toLocaleTimeString()} -{" "}
                          {alert.validTo.toLocaleTimeString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      {/* Flight Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#f6d57f]" />
              <span>Flight Schedule - {selectedDate.toLocaleDateString()}</span>
            </CardTitle>
            <CardDescription>
              {flights.length} flights scheduled for{" "}
              {selectedDate.toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-semibold text-lg">
                        {flight.flightNumber}
                      </p>
                      <p className="text-sm text-gray-600">Flight</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div className="text-center">
                        <p className="font-medium">{flight.departureAirport}</p>
                        <p className="text-sm text-gray-600">Departure</p>
                      </div>
                      <div className="w-8 h-px bg-gray-300"></div>
                      <div className="text-center">
                        <p className="font-medium">{flight.arrivalAirport}</p>
                        <p className="text-sm text-gray-600">Arrival</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="font-semibold">
                        {flight.departureTime.toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600">Departure</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold">
                        {flight.arrivalTime.toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-600">Arrival</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold">{flight.aircraftId}</p>
                      <p className="text-sm text-gray-600">Aircraft</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold">{flight.pilotId}</p>
                      <p className="text-sm text-gray-600">Pilot</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold">{flight.passengers}</p>
                      <p className="text-sm text-gray-600">Passengers</p>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold">{flight.fuelRequired}L</p>
                      <p className="text-sm text-gray-600">Fuel</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(flight.status)}`}
                    >
                      {flight.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{flights.length}</p>
                <p className="text-sm text-gray-600">Total Flights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {flights.filter((f) => f.status === "scheduled").length}
                </p>
                <p className="text-sm text-gray-600">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{conflicts.length}</p>
                <p className="text-sm text-gray-600">Conflicts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {flights.filter((f) => f.status === "delayed").length}
                </p>
                <p className="text-sm text-gray-600">Delayed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
