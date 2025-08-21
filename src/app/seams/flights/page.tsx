"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Calendar,
  Clock,
  MapPin,
  Users,
  Fuel,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BarChart3,
  TrendingUp,
  AlertCircle,
  GraduationCap,
} from "lucide-react";

// Type definitions
interface Flight {
  id: string;
  flightNumber: string;
  aircraftId: string;
  pilotId: string;
  coPilotId: string | null;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  status: string;
  flightType: string;
  purpose: string;
  studentId?: string;
  instructorId?: string;
  lessonType?: string;
  passengers: number;
  cargo: number;
  fuelRequired: number;
  weatherConditions: string;
  notams: string[];
  flightLog: Record<string, unknown>[];
  maintenanceChecks: Record<string, unknown>[];
  createdAt: Date;
  updatedAt: Date;
}

interface Aircraft {
  id: string;
  registration: string;
  type: string;
  model: string;
  manufacturer: string;
  yearManufactured: number;
  totalFlightHours: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: string;
  fuelCapacity: number;
  currentFuel: number;
  maintenanceHistory: Record<string, unknown>[];
  flightHistory: Flight[];
  documents: Record<string, unknown>[];
  createdAt: Date;
  updatedAt: Date;
}

interface Pilot {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  qualifications: string[];
  certifications: string[];
  flightHours: number;
  availability: PilotAvailability[];
  createdAt: Date;
  updatedAt: Date;
}

interface PilotAvailability {
  id: string;
  pilotId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  notes?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseType: string;
  currentProgress: string;
  totalFlightHours: number;
  instructorId: string;
  medicalExpiry: Date;
  licenseExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface FlightBooking {
  id: string;
  studentId: string;
  aircraftId: string;
  instructorId: string;
  requestedDate: Date;
  requestedTime: string;
  duration: number;
  lessonType: string;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FlightStatus {
  value: string;
  label: string;
  color: string;
}

interface FlightType {
  value: string;
  label: string;
}

// Mock data for demonstration
const mockFlights: Flight[] = [
  {
    id: "FL001",
    flightNumber: "PMB001",
    aircraftId: "AC001",
    pilotId: "P001",
    coPilotId: null,
    departureAirport: "FAPM",
    arrivalAirport: "FAPM",
    departureTime: new Date("2024-01-15T08:00:00Z"),
    arrivalTime: new Date("2024-01-15T09:30:00Z"),
    status: "scheduled",
    flightType: "training",
    purpose: "student_training",
    studentId: "S001",
    instructorId: "P001",
    lessonType: "Basic Flight Maneuvers",
    passengers: 1,
    cargo: 0,
    fuelRequired: 45,
    weatherConditions: "VFR",
    notams: [],
    flightLog: [],
    maintenanceChecks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "FL002",
    flightNumber: "PMB002",
    aircraftId: "AC002",
    pilotId: "P003",
    coPilotId: null,
    departureAirport: "FAPM",
    arrivalAirport: "FAPM",
    departureTime: new Date("2024-01-15T10:00:00Z"),
    arrivalTime: new Date("2024-01-15T11:30:00Z"),
    status: "in_flight",
    flightType: "training",
    purpose: "instrument_rating",
    studentId: "S002",
    instructorId: "P003",
    lessonType: "IFR Procedures",
    passengers: 1,
    cargo: 0,
    fuelRequired: 65,
    weatherConditions: "IFR",
    notams: ["NOTAM 001/24"],
    flightLog: [],
    maintenanceChecks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "FL003",
    flightNumber: "PMB003",
    aircraftId: "AC001",
    pilotId: "P001",
    coPilotId: null,
    departureAirport: "FAPM",
    arrivalAirport: "FAPM",
    departureTime: new Date("2024-01-15T14:00:00Z"),
    arrivalTime: new Date("2024-01-15T15:30:00Z"),
    status: "completed",
    flightType: "training",
    purpose: "night_rating",
    studentId: "S003",
    instructorId: "P001",
    lessonType: "Night Flying",
    passengers: 1,
    cargo: 0,
    fuelRequired: 50,
    weatherConditions: "VFR",
    notams: [],
    flightLog: [],
    maintenanceChecks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockAircraft: Aircraft[] = [
  {
    id: "AC001",
    registration: "ZS-ABC",
    type: "Cessna 172",
    model: "C172S Skyhawk",
    manufacturer: "Cessna",
    yearManufactured: 2018,
    totalFlightHours: 1250,
    lastMaintenance: new Date("2024-01-01"),
    nextMaintenance: new Date("2024-02-01"),
    status: "active",
    fuelCapacity: 212,
    currentFuel: 180,
    maintenanceHistory: [],
    flightHistory: [],
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "AC002",
    registration: "ZS-DEF",
    type: "Piper PA-28",
    model: "PA-28-161 Warrior",
    manufacturer: "Piper",
    yearManufactured: 2019,
    totalFlightHours: 980,
    lastMaintenance: new Date("2024-01-10"),
    nextMaintenance: new Date("2024-02-10"),
    status: "active",
    fuelCapacity: 192,
    currentFuel: 150,
    maintenanceHistory: [],
    flightHistory: [],
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "AC003",
    registration: "ZS-GHI",
    type: "Cessna 152",
    model: "C152",
    manufacturer: "Cessna",
    yearManufactured: 2017,
    totalFlightHours: 2100,
    lastMaintenance: new Date("2024-01-05"),
    nextMaintenance: new Date("2024-02-05"),
    status: "maintenance",
    fuelCapacity: 170,
    currentFuel: 0,
    maintenanceHistory: [],
    flightHistory: [],
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPilots: Pilot[] = [
  {
    id: "P001",
    name: "Captain John Smith",
    email: "john.smith@pmbaeroclub.co.za",
    phone: "+27 82 123 4567",
    role: "Chief Flight Instructor",
    qualifications: ["CFI", "MEI", "CFII"],
    certifications: [
      "Commercial Pilot",
      "Flight Instructor",
      "Instrument Instructor",
    ],
    flightHours: 3500,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "P002",
    name: "Captain Sarah Johnson",
    email: "sarah.johnson@pmbaeroclub.co.za",
    phone: "+27 82 234 5678",
    role: "Senior Flight Instructor",
    qualifications: ["CFI", "CFII"],
    certifications: ["Commercial Pilot", "Flight Instructor"],
    flightHours: 2800,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "P003",
    name: "Captain Mike Brown",
    email: "mike.brown@pmbaeroclub.co.za",
    phone: "+27 82 345 6789",
    role: "Flight Instructor",
    qualifications: ["CFI"],
    certifications: ["Commercial Pilot", "Flight Instructor"],
    flightHours: 2200,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockStudents: Student[] = [
  {
    id: "S001",
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+27 82 456 7890",
    licenseType: "Student Pilot",
    currentProgress: "Basic Flight Maneuvers",
    totalFlightHours: 15,
    instructorId: "P001",
    medicalExpiry: new Date("2025-06-15"),
    licenseExpiry: new Date("2024-12-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "S002",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+27 82 567 8901",
    licenseType: "Private Pilot",
    currentProgress: "Instrument Rating",
    totalFlightHours: 85,
    instructorId: "P003",
    medicalExpiry: new Date("2025-08-20"),
    licenseExpiry: new Date("2026-03-20"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "S003",
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+27 82 678 9012",
    licenseType: "Private Pilot",
    currentProgress: "Night Rating",
    totalFlightHours: 120,
    instructorId: "P001",
    medicalExpiry: new Date("2025-05-10"),
    licenseExpiry: new Date("2026-01-10"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockBookings: FlightBooking[] = [
  {
    id: "BK001",
    studentId: "S001",
    aircraftId: "AC001",
    instructorId: "P001",
    requestedDate: new Date("2024-01-16"),
    requestedTime: "09:00",
    duration: 1.5,
    lessonType: "Basic Flight Maneuvers",
    status: "confirmed",
    notes: "First solo flight preparation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "BK002",
    studentId: "S002",
    aircraftId: "AC002",
    instructorId: "P003",
    requestedDate: new Date("2024-01-16"),
    requestedTime: "14:00",
    duration: 2.0,
    lessonType: "IFR Procedures",
    status: "pending",
    notes: "Instrument approach practice",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const flightStatuses: FlightStatus[] = [
  {
    value: "scheduled",
    label: "Scheduled",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "boarding",
    label: "Boarding",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "departed",
    label: "Departed",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "in_flight",
    label: "In Flight",
    color: "bg-green-100 text-green-800",
  },
  { value: "arrived", label: "Arrived", color: "bg-gray-100 text-gray-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
  {
    value: "delayed",
    label: "Delayed",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "diverted",
    label: "Diverted",
    color: "bg-indigo-100 text-indigo-800",
  },
];

const flightTypes: FlightType[] = [
  { value: "training", label: "Training" },
  { value: "solo", label: "Solo Flight" },
  { value: "cross_country", label: "Cross Country" },
  { value: "night_flying", label: "Night Flying" },
  { value: "instrument", label: "Instrument Training" },
  { value: "maintenance", label: "Maintenance" },
  { value: "test", label: "Test Flight" },
];

const lessonTypes = [
  "Basic Flight Maneuvers",
  "Takeoff and Landing",
  "Navigation",
  "Emergency Procedures",
  "IFR Procedures",
  "Night Flying",
  "Cross Country Planning",
  "Advanced Maneuvers",
  "Solo Flight",
  "Checkride Preparation",
];

export default function FlightOperationsPage() {
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(mockFlights);
  const [aircraft, setAircraft] = useState<Aircraft[]>(mockAircraft);
  const [pilots, setPilots] = useState<Pilot[]>(mockPilots);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [bookings, setBookings] = useState<FlightBooking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [activeTab, setActiveTab] = useState("flights"); // flights, aircraft, pilots, students, bookings
  const [viewMode, setViewMode] = useState("list"); // list, calendar, analytics

  // Filter flights based on search and filters
  useEffect(() => {
    let filtered = flights;

    if (searchTerm) {
      filtered = filtered.filter(
        (flight) =>
          flight.flightNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          flight.departureAirport
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          flight.arrivalAirport
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          flight.pilotId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((flight) => flight.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((flight) => flight.flightType === typeFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(
        (flight) =>
          flight.departureTime.toDateString() === filterDate.toDateString()
      );
    }

    setFilteredFlights(filtered);
  }, [flights, searchTerm, statusFilter, typeFilter, dateFilter]);

  const getStatusBadge = (status: string) => {
    const statusInfo = flightStatuses.find((s) => s.value === status);
    return (
      <Badge className={statusInfo?.color || "bg-gray-100 text-gray-800"}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const getFlightDuration = (departure: Date, arrival: Date) => {
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleStatusChange = (flightId: string, newStatus: string) => {
    setFlights(
      flights.map((flight) =>
        flight.id === flightId
          ? { ...flight, status: newStatus, updatedAt: new Date() }
          : flight
      )
    );
  };

  const handleDeleteFlight = (flightId: string) => {
    setFlights(flights.filter((flight) => flight.id !== flightId));
  };

  const getFlightStats = () => {
    const total = flights.length;
    const scheduled = flights.filter((f) => f.status === "scheduled").length;
    const inFlight = flights.filter((f) => f.status === "in_flight").length;
    const completed = flights.filter((f) => f.status === "arrived").length;
    const delayed = flights.filter((f) => f.status === "delayed").length;

    return { total, scheduled, inFlight, completed, delayed };
  };

  const getFleetStats = () => {
    const total = aircraft.length;
    const active = aircraft.filter((a) => a.status === "active").length;
    const maintenance = aircraft.filter(
      (a) => a.status === "maintenance"
    ).length;
    const available = aircraft.filter(
      (a) => a.status === "active" && a.currentFuel > 50
    ).length;

    return { total, active, maintenance, available };
  };

  const getStudentStats = () => {
    const total = students.length;
    const studentPilots = students.filter(
      (s) => s.licenseType === "Student Pilot"
    ).length;
    const privatePilots = students.filter(
      (s) => s.licenseType === "Private Pilot"
    ).length;
    const activeStudents = students.filter(
      (s) => new Date(s.medicalExpiry) > new Date()
    ).length;

    return { total, studentPilots, privatePilots, activeStudents };
  };

  const getBookingStats = () => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const completed = bookings.filter((b) => b.status === "completed").length;

    return { total, confirmed, pending, completed };
  };

  const stats = getFlightStats();
  const fleetStats = getFleetStats();
  const studentStats = getStudentStats();
  const bookingStats = getBookingStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#262626] mb-2">
              Flight Operations Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage and monitor all flight operations in real-time
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button
              onClick={() =>
                setViewMode(viewMode === "list" ? "calendar" : "list")
              }
              variant="outline"
              className="flex items-center gap-2"
            >
              {viewMode === "list" ? (
                <Calendar className="h-4 w-4" />
              ) : (
                <BarChart3 className="h-4 w-4" />
              )}
              {viewMode === "list" ? "Calendar View" : "List View"}
            </Button>
            <Button
              onClick={() => console.log("Add Flight clicked")}
              className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Flight
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-lg rounded-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                {
                  id: "flights",
                  label: "Flights",
                  icon: Plane,
                  stats: stats.total,
                },
                {
                  id: "aircraft",
                  label: "Fleet",
                  icon: BarChart3,
                  stats: fleetStats.total,
                },
                {
                  id: "pilots",
                  label: "Instructors",
                  icon: Users,
                  stats: pilots.length,
                },
                {
                  id: "students",
                  label: "Students",
                  icon: GraduationCap,
                  stats: students.length,
                },
                {
                  id: "bookings",
                  label: "Bookings",
                  icon: Calendar,
                  stats: bookings.length,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-[#f6d57f] text-[#f6d57f]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                  <span className="bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {tab.stats}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {activeTab === "flights" && (
            <>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Flights
                      </p>
                      <p className="text-3xl font-bold text-[#262626]">
                        {stats.total}
                      </p>
                    </div>
                    <Plane className="h-8 w-8 text-[#f6d57f]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Scheduled
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats.scheduled}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        In Flight
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {stats.inFlight}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-gray-600">
                        {stats.completed}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-gray-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Delayed
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {stats.delayed}
                      </p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "aircraft" && (
            <>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Aircraft
                      </p>
                      <p className="text-3xl font-bold text-[#262626]">
                        {fleetStats.total}
                      </p>
                    </div>
                    <Plane className="h-8 w-8 text-[#f6d57f]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {fleetStats.active}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Available
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {fleetStats.available}
                      </p>
                    </div>
                    <Fuel className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Maintenance
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {fleetStats.maintenance}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Fuel Status
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        {Math.round(
                          (aircraft.reduce((sum, a) => sum + a.currentFuel, 0) /
                            aircraft.reduce(
                              (sum, a) => sum + a.fuelCapacity,
                              0
                            )) *
                            100
                        )}
                        %
                      </p>
                    </div>
                    <Fuel className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "students" && (
            <>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Students
                      </p>
                      <p className="text-3xl font-bold text-[#262626]">
                        {studentStats.total}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-[#f6d57f]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Student Pilots
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {studentStats.studentPilots}
                      </p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Private Pilots
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {studentStats.privatePilots}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Active Students
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        {studentStats.activeStudents}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Avg Flight Hours
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {Math.round(
                          students.reduce(
                            (sum, s) => sum + s.totalFlightHours,
                            0
                          ) / students.length
                        )}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "bookings" && (
            <>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Bookings
                      </p>
                      <p className="text-3xl font-bold text-[#262626]">
                        {bookingStats.total}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-[#f6d57f]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Confirmed
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {bookingStats.confirmed}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Pending
                      </p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {bookingStats.pending}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {bookingStats.completed}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Success Rate
                      </p>
                      <p className="text-3xl font-bold text-purple-600">
                        {Math.round(
                          (bookingStats.confirmed /
                            Math.max(bookingStats.total, 1)) *
                            100
                        )}
                        %
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === "flights" && (
          <>
            {/* Filters and Search */}
            <Card className="bg-white shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <Input
                      placeholder="Flight number, airport, pilot..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {flightStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flight Type
                    </label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {flightTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setTypeFilter("all");
                        setDateFilter("");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flights Table */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-[#262626]">
                      Flight Schedule
                    </CardTitle>
                    <CardDescription>
                      {filteredFlights.length} flights found
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Flight
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Route
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Time
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Crew
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlights.map((flight) => (
                        <tr
                          key={flight.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-semibold text-[#262626]">
                                {flight.flightNumber}
                              </p>
                              <p className="text-sm text-gray-500">
                                A/C: {flight.aircraftId}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="text-center">
                                <p className="font-medium text-[#262626]">
                                  {flight.departureAirport}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {flight.departureTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-16 h-px bg-gray-300"></div>
                                <Plane className="h-3 w-3 text-[#f6d57f] transform rotate-90" />
                                <div className="w-16 h-px bg-gray-300"></div>
                              </div>
                              <div className="text-center">
                                <p className="font-medium text-[#262626]">
                                  {flight.arrivalAirport}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {flight.arrivalTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Duration:{" "}
                              {getFlightDuration(
                                flight.departureTime,
                                flight.arrivalTime
                              )}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                {flight.departureTime.toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {flight.departureTime.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                -{" "}
                                {flight.arrivalTime.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(flight.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm font-medium text-[#262626] capitalize">
                                {flight.flightType}
                              </p>
                              <p className="text-xs text-gray-500">
                                {flight.purpose.replace(/_/g, " ")}
                              </p>
                              {flight.lessonType && (
                                <p className="text-xs text-[#f6d57f] font-medium">
                                  {flight.lessonType}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-[#262626]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[#262626]">
                                  {flight.pilotId}
                                </p>
                                {flight.coPilotId && (
                                  <p className="text-xs text-gray-500">
                                    + {flight.coPilotId}
                                  </p>
                                )}
                                {flight.studentId && (
                                  <p className="text-xs text-blue-600 font-medium">
                                    Student:{" "}
                                    {students.find(
                                      (s) => s.id === flight.studentId
                                    )?.name || flight.studentId}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Select
                                value={flight.status}
                                onValueChange={(value) =>
                                  handleStatusChange(flight.id, value)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {flightStatuses.map((status) => (
                                    <SelectItem
                                      key={status.value}
                                      value={status.value}
                                    >
                                      {status.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  console.log("View flight:", flight.id)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  console.log("Edit flight:", flight.id)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteFlight(flight.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "aircraft" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-[#262626]">
                    Fleet Management
                  </CardTitle>
                  <CardDescription>
                    Manage aircraft availability and maintenance
                  </CardDescription>
                </div>
                <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Aircraft
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aircraft.map((aircraftItem) => (
                  <Card
                    key={aircraftItem.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-[#262626]">
                            {aircraftItem.registration}
                          </CardTitle>
                          <CardDescription>
                            {aircraftItem.manufacturer} {aircraftItem.model}
                          </CardDescription>
                        </div>
                        <Badge
                          className={
                            aircraftItem.status === "active"
                              ? "bg-green-100 text-green-800"
                              : aircraftItem.status === "maintenance"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {aircraftItem.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Year</p>
                          <p className="font-medium">
                            {aircraftItem.yearManufactured}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Flight Hours</p>
                          <p className="font-medium">
                            {aircraftItem.totalFlightHours}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fuel</p>
                          <p className="font-medium">
                            {aircraftItem.currentFuel}/
                            {aircraftItem.fuelCapacity}L
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Next Maintenance</p>
                          <p className="font-medium">
                            {aircraftItem.nextMaintenance.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "pilots" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-[#262626]">
                    Flight Instructors
                  </CardTitle>
                  <CardDescription>
                    Manage instructor availability and qualifications
                  </CardDescription>
                </div>
                <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instructor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pilots.map((pilot) => (
                  <Card
                    key={pilot.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-[#262626]">
                            {pilot.name}
                          </CardTitle>
                          <CardDescription>{pilot.role}</CardDescription>
                        </div>
                        <div className="w-12 h-12 bg-[#f6d57f] rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-[#262626]" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">Flight Hours</p>
                          <p className="font-medium">
                            {pilot.flightHours.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Qualifications</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pilot.qualifications.map((qual, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Contact</p>
                          <p className="font-medium text-sm">{pilot.email}</p>
                          <p className="text-sm text-gray-500">{pilot.phone}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Availability
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "students" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-[#262626]">
                    Student Management
                  </CardTitle>
                  <CardDescription>
                    Track student progress and flight hours
                  </CardDescription>
                </div>
                <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student) => (
                  <Card
                    key={student.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-[#262626]">
                            {student.name}
                          </CardTitle>
                          <CardDescription>
                            {student.licenseType}
                          </CardDescription>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">Current Progress</p>
                          <p className="font-medium">
                            {student.currentProgress}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Flight Hours</p>
                          <p className="font-medium">
                            {student.totalFlightHours}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Instructor</p>
                          <p className="font-medium">
                            {pilots.find((p) => p.id === student.instructorId)
                              ?.name || student.instructorId}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Medical Expiry</p>
                          <p className="font-medium">
                            {student.medicalExpiry.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Progress
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Flight
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "bookings" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-[#262626]">
                    Flight Bookings
                  </CardTitle>
                  <CardDescription>
                    Manage student flight bookings and scheduling
                  </CardDescription>
                </div>
                <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Student
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Aircraft
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Instructor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Lesson Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-[#262626]">
                              {students.find((s) => s.id === booking.studentId)
                                ?.name || booking.studentId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {students.find((s) => s.id === booking.studentId)
                                ?.licenseType || "Student"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-[#262626]">
                              {aircraft.find((a) => a.id === booking.aircraftId)
                                ?.registration || booking.aircraftId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {aircraft.find((a) => a.id === booking.aircraftId)
                                ?.type || "Aircraft"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-[#262626]">
                              {pilots.find((p) => p.id === booking.instructorId)
                                ?.name || booking.instructorId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {pilots.find((p) => p.id === booking.instructorId)
                                ?.role || "Instructor"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              {booking.requestedDate.toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.requestedTime} ({booking.duration}h)
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-sm font-medium text-[#262626]">
                              {booking.lessonType}
                            </p>
                            {booking.notes && (
                              <p className="text-xs text-gray-500">
                                {booking.notes}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flights Table */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl text-[#262626]">
                  Flight Schedule
                </CardTitle>
                <CardDescription>
                  {filteredFlights.length} flights found
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Flight
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Route
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Crew
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFlights.map((flight) => (
                    <tr
                      key={flight.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-[#262626]">
                            {flight.flightNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            A/C: {flight.aircraftId}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="text-center">
                            <p className="font-medium text-[#262626]">
                              {flight.departureAirport}
                            </p>
                            <p className="text-xs text-gray-500">
                              {flight.departureTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-px bg-gray-300"></div>
                            <Plane className="h-3 w-3 text-[#f6d57f] transform rotate-90" />
                            <div className="w-16 h-px bg-gray-300"></div>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-[#262626]">
                              {flight.arrivalAirport}
                            </p>
                            <p className="text-xs text-gray-500">
                              {flight.arrivalTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Duration:{" "}
                          {getFlightDuration(
                            flight.departureTime,
                            flight.arrivalTime
                          )}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            {flight.departureTime.toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.departureTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {flight.arrivalTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(flight.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-[#262626] capitalize">
                            {flight.flightType}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.purpose.replace(/_/g, " ")}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-[#262626]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#262626]">
                              {flight.pilotId}
                            </p>
                            {flight.coPilotId && (
                              <p className="text-xs text-gray-500">
                                + {flight.coPilotId}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Select
                            value={flight.status}
                            onValueChange={(value) =>
                              handleStatusChange(flight.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {flightStatuses.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              console.log("View flight:", flight.id)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              console.log("Edit flight:", flight.id)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFlight(flight.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#262626]">Book Flight</h3>
                  <p className="text-sm text-gray-600">
                    Schedule student training flights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#262626]">
                    Instructor Availability
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage pilot schedules
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#262626]">
                    Student Progress
                  </h3>
                  <p className="text-sm text-gray-600">
                    Track training milestones
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
