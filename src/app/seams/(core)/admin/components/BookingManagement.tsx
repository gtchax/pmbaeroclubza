"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define proper types for the booking data
interface Booking {
  id: string;
  student: {
    firstName: string;
    lastName: string;
    avatar?: string;
    studentProfile?: {
      studentNumber: string;
    };
  };
  scheduleSlot?: {
    instructor?: {
      user?: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
      };
      instructorNumber?: string;
    };
  };
  aircraft: {
    registration: string;
    make: string;
    model: string;
  };
  purpose: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "NO_SHOW";
  type: "LESSON" | "SOLO" | "CHECKRIDE" | "PROFICIENCY" | "RECREATIONAL";
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingManagementProps {
  bookings: Booking[] | undefined;
  isLoading: boolean;
  onRefresh: () => void;
}

export function BookingManagement({
  bookings,
  isLoading,
  onRefresh,
}: BookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter bookings based on search and filters
  const filteredBookings = useMemo(() => {
    if (!bookings) return [];

    return bookings.filter((booking) => {
      // const bookingObj = booking as Booking;

      const matchesSearch =
        booking.student.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.student.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (booking.scheduleSlot?.instructor?.user?.firstName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (booking.scheduleSlot?.instructor?.user?.lastName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.aircraft.registration
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.purpose.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const matchesType = typeFilter === "all" || booking.type === typeFilter;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" &&
          new Date(booking.date).toDateString() ===
            new Date().toDateString()) ||
        (dateFilter === "tomorrow" &&
          new Date(booking.date).toDateString() ===
            new Date(Date.now() + 86400000).toDateString()) ||
        (dateFilter === "week" &&
          (() => {
            const bookingDate = new Date(booking.date);
            const today = new Date();
            const weekFromNow = new Date(
              today.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            return bookingDate >= today && bookingDate <= weekFromNow;
          })());

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, typeFilter, dateFilter]);

  const getStatusBadge = (status: Booking["status"]) => {
    const variants = {
      PENDING: "secondary",
      CONFIRMED: "default",
      IN_PROGRESS: "default",
      COMPLETED: "default",
      CANCELLED: "outline",
      NO_SHOW: "destructive",
    } as const;

    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-green-100 text-green-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-gray-100 text-gray-800",
      NO_SHOW: "bg-red-100 text-red-800",
    };

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.replace("_", " ").charAt(0).toUpperCase() +
          status.replace("_", " ").slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: Booking["type"]) => {
    const colors = {
      LESSON: "bg-blue-100 text-blue-800",
      SOLO: "bg-green-100 text-green-800",
      CHECKRIDE: "bg-purple-100 text-purple-800",
      PROFICIENCY: "bg-orange-100 text-orange-800",
      RECREATIONAL: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge variant="secondary" className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleConfirmBooking = (bookingId: string) => {
    console.log("Confirming booking:", bookingId);
    // TODO: Implement booking confirmation logic
  };

  const handleCancelBooking = (bookingId: string) => {
    console.log("Cancelling booking:", bookingId);
    // TODO: Implement booking cancellation logic
  };

  const handleCompleteBooking = (bookingId: string) => {
    console.log("Completing booking:", bookingId);
    // TODO: Implement booking completion logic
  };

  const handleDeleteBooking = (bookingId: string) => {
    console.log("Deleting booking:", bookingId);
    // TODO: Implement booking deletion logic
  };

  const getUpcomingBookings = () => {
    if (!bookings) return 0;
    const today = new Date();
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= today && booking.status === "CONFIRMED";
    }).length;
  };

  const getPendingBookings = () => {
    return (
      bookings?.filter((booking) => booking.status === "PENDING").length || 0
    );
  };

  const getCompletedBookings = () => {
    return (
      bookings?.filter((booking) => booking.status === "COMPLETED").length || 0
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Flight Booking Management
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage all flight bookings, confirmations, and
            cancellations
          </p>
        </div>
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings?.length || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Bookings
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {getUpcomingBookings()}
            </div>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Bookings
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {getPendingBookings()}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Bookings
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {getCompletedBookings()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="NO_SHOW">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="LESSON">Lesson</SelectItem>
                  <SelectItem value="SOLO">Solo</SelectItem>
                  <SelectItem value="CHECKRIDE">Checkride</SelectItem>
                  <SelectItem value="PROFICIENCY">Proficiency</SelectItem>
                  <SelectItem value="RECREATIONAL">Recreational</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Aircraft</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">#{booking.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.purpose}
                        </p>
                        {booking.notes && (
                          <p className="text-xs text-muted-foreground italic mt-1">
                            {booking.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.student.avatar || ""} />
                          <AvatarFallback className="text-xs">
                            {getInitials(
                              booking.student.firstName +
                                " " +
                                booking.student.lastName
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {booking.student.firstName}{" "}
                            {booking.student.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.student.studentProfile?.studentNumber ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {booking.scheduleSlot?.instructor ? (
                          <>
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  booking.scheduleSlot.instructor.user
                                    ?.avatar || ""
                                }
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(
                                  (booking.scheduleSlot.instructor.user
                                    ?.firstName || "") +
                                    " " +
                                    (booking.scheduleSlot.instructor.user
                                      ?.lastName || "")
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {
                                  booking.scheduleSlot.instructor.user
                                    ?.firstName
                                }{" "}
                                {booking.scheduleSlot.instructor.user?.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {
                                  booking.scheduleSlot.instructor
                                    .instructorNumber
                                }
                              </p>
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No instructor
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">
                          {booking.aircraft.registration}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.aircraft.make} {booking.aircraft.model}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.startTime).toLocaleTimeString()} -{" "}
                          {new Date(booking.endTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(booking.type)}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              console.log("View booking:", booking.id)
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              console.log("Edit booking:", booking.id)
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Booking
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {booking.status === "PENDING" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleConfirmBooking(booking.id)}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm Booking
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            </>
                          )}

                          {booking.status === "CONFIRMED" && (
                            <DropdownMenuItem
                              onClick={() => handleCompleteBooking(booking.id)}
                              className="text-blue-600"
                            >
                              <CheckSquare className="h-4 w-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
