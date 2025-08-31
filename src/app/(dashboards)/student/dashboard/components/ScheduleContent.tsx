"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Calendar, Plane, Clock } from "lucide-react";

// Mock data for available pilots
const availablePilots: Pilot[] = [
  {
    id: 1,
    name: "Captain Sarah Mitchell",
    rating: "CFI, CFII, MEI",
    experience: "15+ years",
    specialties: ["PPL", "CPL", "Instrument Rating"],
    availableSlots: ["09:00-11:00", "14:00-16:00", "16:00-18:00"],
    avatar: "SM",
  },
  {
    id: 2,
    name: "Captain Mike Johnson",
    rating: "CFI, CFII",
    experience: "12+ years",
    specialties: ["PPL", "Night Rating", "Cross Country"],
    availableSlots: ["08:00-10:00", "13:00-15:00", "17:00-19:00"],
    avatar: "MJ",
  },
  {
    id: 3,
    name: "Captain Lisa Brown",
    rating: "CFI",
    experience: "8+ years",
    specialties: ["PPL", "Pattern Work", "Emergency Procedures"],
    availableSlots: ["10:00-12:00", "15:00-17:00"],
    avatar: "LB",
  },
  {
    id: 4,
    name: "Captain David Wilson",
    rating: "CFI, CFII, MEI",
    experience: "20+ years",
    specialties: ["PPL", "CPL", "Multi-Engine", "Complex Aircraft"],
    availableSlots: ["07:00-09:00", "12:00-14:00", "18:00-20:00"],
    avatar: "DW",
  },
];

// Types for calendar events and pilots
interface Pilot {
  id: number;
  name: string;
  rating: string;
  experience: string;
  specialties: string[];
  availableSlots: string[];
  avatar: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    instructor: string;
    lesson: string;
    aircraft: string;
    status: string;
  };
}

// Mock events data
const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Flight Lesson - Sarah Mitchell",
    start: "2024-02-20T09:00:00",
    end: "2024-02-20T11:00:00",
    backgroundColor: "#f6d57f",
    borderColor: "#f6d57f",
    textColor: "#262626",
    extendedProps: {
      instructor: "Captain Sarah Mitchell",
      lesson: "Cross Country Navigation",
      aircraft: "Cessna 172",
      status: "confirmed",
    },
  },
  {
    id: "2",
    title: "Flight Lesson - Mike Johnson",
    start: "2024-02-22T14:00:00",
    end: "2024-02-22T16:00:00",
    backgroundColor: "#f6d57f",
    borderColor: "#f6d57f",
    textColor: "#262626",
    extendedProps: {
      instructor: "Captain Mike Johnson",
      lesson: "Pattern Work & Landings",
      aircraft: "Cessna 152",
      status: "confirmed",
    },
  },
];

export function ScheduleContent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPilot, setSelectedPilot] = useState<Pilot | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const calendarRef = useRef<FullCalendar | null>(null);

  // Custom CSS for FullCalendar PMB Aero Club theme
  const calendarStyles = `
    .fc {
      font-family: inherit;
      color: #ffffff;
    }
    
    .fc-toolbar {
      background: #262626 !important;
      border-radius: var(--radius) !important;
      padding: 1rem !important;
      margin-bottom: 1rem !important;
      border: 1px solid #404040 !important;
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.5rem !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
    
    .fc-toolbar-title {
      color: #f6d57f !important;
      font-size: 1.5rem !important;
      font-weight: 700 !important;
      line-height: 1.2 !important;
      margin: 0 !important;
    }
    
    .fc-toolbar-chunk {
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
    }
    
    .fc-button {
      background: #404040 !important;
      border: 1px solid #606060 !important;
      color: #ffffff !important;
      border-radius: calc(var(--radius) - 2px) !important;
      padding: 0.5rem 1rem !important;
      font-weight: 500 !important;
      font-size: 0.875rem !important;
      line-height: 1.25rem !important;
      transition: all 0.2s ease !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      white-space: nowrap !important;
      user-select: none !important;
      position: relative !important;
    }
    
    .fc-button:hover {
      background: #f6d57f !important;
      border-color: #f6d57f !important;
      color: #262626 !important;
    }
    
    .fc-button:focus-visible {
      outline: 2px solid rgba(246, 213, 127, 0.3) !important;
      outline-offset: 2px !important;
    }
    
    .fc-button-active {
      background: #f6d57f !important;
      border-color: #f6d57f !important;
      color: #262626 !important;
    }
    
    .fc-button:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
    }
    
    /* Mobile responsive button sizing */
    @media (max-width: 768px) {
      .fc-button {
        padding: 0.375rem 0.75rem !important;
        font-size: 0.75rem !important;
        line-height: 1rem !important;
        min-height: 2.25rem !important;
      }
      
      .fc-toolbar {
        flex-direction: column !important;
        gap: 0.75rem !important;
        padding: 1rem !important;
      }
      
      .fc-toolbar-chunk {
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
      }
      
      .fc-toolbar-chunk:first-child {
        order: 2 !important;
      }
      
      .fc-toolbar-chunk:nth-child(2) {
        order: 1 !important;
      }
      
      .fc-toolbar-chunk:last-child {
        order: 3 !important;
      }
    }
    
    @media (max-width: 480px) {
      .fc-button {
        padding: 0.25rem 0.5rem !important;
        font-size: 0.7rem !important;
        min-height: 2rem !important;
      }
      
      .fc-toolbar-title {
        font-size: 1.25rem !important;
      }
    }
    
    .fc-daygrid-day {
      background: #262626 !important;
      border: 1px solid #404040 !important;
    }
    
    .fc-daygrid-day:hover {
      background: #2a2a2a !important;
    }
    
    .fc-daygrid-day-number {
      color: #ffffff !important;
      font-weight: 500 !important;
    }
    
    .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
      color: #f6d57f !important;
      font-weight: 700 !important;
    }
    
    .fc-daygrid-day.fc-day-past .fc-daygrid-day-number {
      color: #808080 !important;
    }
    
    .fc-daygrid-day.fc-day-future .fc-daygrid-day-number {
      color: #ffffff !important;
    }
    
    .fc-daygrid-day.fc-day-other .fc-daygrid-day-number {
      color: #606060 !important;
    }
    
    /* Disable past dates */
    .fc-daygrid-day.fc-day-past {
      pointer-events: none !important;
      opacity: 0.6 !important;
    }
    
    .fc-daygrid-day.fc-day-past .fc-daygrid-day-number {
      color: #808080 !important;
      font-weight: 500 !important;
      opacity: 1 !important;
    }
    
    .fc-daygrid-day.fc-day-past .fc-daygrid-day-events {
      pointer-events: none !important;
      opacity: 0.4 !important;
    }
    
    /* Today styling */
    .fc-daygrid-day.fc-day-today {
      background: rgba(246, 213, 127, 0.1) !important;
      border-color: #f6d57f !important;
      pointer-events: auto !important;
      opacity: 1 !important;
    }
    
    .fc-col-header-cell {
      background: #1a1a1a !important;
      border: 1px solid #404040 !important;
      padding: 12px 8px !important;
    }
    
    .fc-col-header-cell-cushion {
      color: #f6d57f !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      font-size: 0.875rem !important;
    }
    
    .fc-event {
      background: #f6d57f !important;
      border: 1px solid #f6d57f !important;
      color: #262626 !important;
      border-radius: 6px !important;
      padding: 4px 8px !important;
      font-weight: 500 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }
    
    .fc-event:hover {
      background: #f4d06a !important;
      border-color: #f4d06a !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(246, 213, 127, 0.3) !important;
    }
    
    .fc-event-title {
      font-weight: 600 !important;
    }
    
    .fc-event-time {
      font-weight: 500 !important;
      opacity: 0.9 !important;
    }
    
    .fc-daygrid-event-dot {
      border-color: #f6d57f !important;
    }
    
    .fc-daygrid-day-events {
      margin-top: 4px !important;
    }
    
    .fc-daygrid-day-events .fc-event {
      margin-bottom: 2px !important;
    }
    
    .fc-timegrid-slot {
      background: #262626 !important;
      border: 1px solid #404040 !important;
    }
    
    .fc-timegrid-slot-label {
      color: #808080 !important;
      font-size: 0.75rem !important;
    }
    
    .fc-timegrid-axis {
      background: #1a1a1a !important;
      border: 1px solid #404040 !important;
      color: #f6d57f !important;
      font-weight: 600 !important;
    }
    
    .fc-list-day {
      background: #1a1a1a !important;
      border: 1px solid #404040 !important;
    }
    
    .fc-list-day-text {
      color: #f6d57f !important;
      font-weight: 600 !important;
    }
    
    .fc-list-event {
      background: #262626 !important;
      border: 1px solid #404040 !important;
      color: #ffffff !important;
    }
    
    .fc-list-event:hover {
      background: #2a2a2a !important;
    }
    
    .fc-list-event-dot {
      border-color: #f6d57f !important;
    }
    
    .fc-highlight {
      background: rgba(246, 213, 127, 0.2) !important;
      border: 2px dashed #f6d57f !important;
    }
    
    .fc-more-link {
      color: #f6d57f !important;
      font-weight: 500 !important;
    }
    
    .fc-more-link:hover {
      color: #f4d06a !important;
    }
    
    .fc-popover {
      background: #262626 !important;
      border: 1px solid #404040 !important;
      border-radius: 8px !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
    }
    
    .fc-popover-header {
      background: #1a1a1a !important;
      border-bottom: 1px solid #404040 !important;
      color: #f6d57f !important;
      font-weight: 600 !important;
    }
    
    .fc-popover-close {
      color: #808080 !important;
    }
    
    .fc-popover-close:hover {
      color: #f6d57f !important;
    }
  `;

  const handleDateSelect = (selectInfo: { startStr: string }) => {
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Prevent selection of past dates
    if (selectedDate < today) {
      return; // Don't allow past date selection
    }

    setSelectedDate(selectedDate);
    setIsDrawerOpen(true);
  };

  const handleEventClick = (clickInfo: {
    event: { title: string; start: Date | null; end: Date | null };
  }) => {
    // Handle existing event click - could show details or allow editing
    console.log("Event clicked:", clickInfo.event);
  };

  const handleBooking = () => {
    if (!selectedPilot || !selectedTimeSlot || !selectedDate) return;

    const [startHour] = selectedTimeSlot.split(":");
    const startTime = new Date(selectedDate);
    startTime.setHours(parseInt(startHour), 0, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 2);

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: `Flight Lesson - ${selectedPilot.name}`,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      backgroundColor: "#f6d57f",
      borderColor: "#f6d57f",
      textColor: "#262626",
      extendedProps: {
        instructor: selectedPilot.name,
        lesson: "Flight Training",
        aircraft: "TBD",
        status: "pending",
      },
    };

    setEvents([...events, newEvent]);
    setIsDrawerOpen(false);
    setSelectedPilot(null);
    setSelectedTimeSlot("");
    setSelectedDate(null);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour += 2) {
      const startHour = hour.toString().padStart(2, "0");
      const endHour = (hour + 2).toString().padStart(2, "0");
      slots.push(`${startHour}:00-${endHour}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <>
      <style>{calendarStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Flight Schedule</h2>
            <p className="text-gray-300">
              {" "}
              Click on a date to book a lesson or view existing bookings
            </p>
          </div>

          <Button
            className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book New Lesson
          </Button>
        </div>

        {/* FullCalendar */}
        {/* <Card className="bg-[#262626] border-[#f6d57f] "> */}
        {/* <CardHeader>
            <CardTitle className="text-white">Flight Calendar</CardTitle>
            <CardDescription className="text-gray-300">
              Click on a date to book a lesson or view existing bookings
            </CardDescription>
          </CardHeader> */}
        {/* <CardContent> */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            selectConstraint={{
              start: new Date().toISOString().split("T")[0], // Only allow selection from today onwards
              end: "24:00",
            }}
            validRange={{
              start: new Date().toISOString().split("T")[0], // Disable past dates
            }}
            slotMinTime="07:00:00"
            slotMaxTime="20:00:00"
            slotDuration="02:00:00"
            slotLabelInterval="02:00"
            height="auto"
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
            }}
            // Custom styling for PMB Aero Club theme
            dayHeaderFormat={{ weekday: "short" }}
            titleFormat={{ month: "long", year: "numeric" }}
          />
        </div>
        {/* </CardContent>
        </Card> */}

        {/* Booking Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="bg-[#262626] border-[#f6d57f] max-h-[90vh]">
            <div className="mx-auto w-full max-w-5xl overflow-y-auto">
              <DrawerHeader className="">
                <DrawerTitle className="text-xl font-bold text-white">
                  Book Flight Lesson
                </DrawerTitle>
                {/* <DrawerDescription className="text-gray-300">
                  Select your instructor and time slot for your flight lesson
                </DrawerDescription> */}
              </DrawerHeader>

              <div className="px-6 py-4 space-y-6 overflow-y-auto">
                {/* Selected Date Display */}
                {selectedDate && (
                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">
                      Selected Date
                    </h4>
                    <p className="text-[#f6d57f] text-lg">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}

                {/* Pilot Selection */}
                <div>
                  <h4 className="text-white font-medium mb-3">
                    Select Instructor
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availablePilots.map((pilot) => (
                      <div
                        key={pilot.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPilot?.id === pilot.id
                            ? "border-[#f6d57f] bg-[#f6d57f]/10"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                        onClick={() => setSelectedPilot(pilot)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#f6d57f] rounded-full flex items-center justify-center">
                            <span className="text-[#262626] font-semibold text-sm">
                              {pilot.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-medium">
                              {pilot.name}
                            </h5>
                            <p className="text-sm text-gray-400">
                              {pilot.rating}
                            </p>
                            <p className="text-xs text-[#f6d57f]">
                              {pilot.experience} experience
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-400">Specialties:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pilot.specialties.map((specialty, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-gray-600 text-gray-300"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slot Selection */}
                {selectedPilot && (
                  <div>
                    <h4 className="text-white font-medium mb-3">
                      Select Time Slot (2-hour blocks)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedTimeSlot === slot
                              ? "border-[#f6d57f] bg-[#f6d57f] text-[#262626]"
                              : "border-gray-600 text-gray-300 hover:border-gray-500"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Booking Summary */}
                {selectedPilot && selectedTimeSlot && (
                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">
                      Booking Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Instructor:</span>
                        <span className="text-white">{selectedPilot.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">
                          {selectedDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white">{selectedTimeSlot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">2 hours</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto w-full max-w-5xl">
              <DrawerFooter className="border-t border-gray-700">
                <div className="flex justify-end space-x-3">
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                  <Button
                    onClick={handleBooking}
                    disabled={!selectedPilot || !selectedTimeSlot}
                    className="bg-[#f6d57f] text-[#262626] hover:bg-yellow-500 disabled:opacity-50"
                  >
                    <Plane className="w-4 h-4 mr-2" />
                    Book Lesson
                  </Button>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Upcoming Lessons Summary */}
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Lessons</CardTitle>
            <CardDescription className="text-gray-300">
              Your scheduled flight training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-[#262626]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {event.extendedProps.lesson}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {new Date(event.start).toLocaleDateString()} •{" "}
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(event.end).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      {event.extendedProps.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Instructor:</span>
                      <p className="text-white">
                        {event.extendedProps.instructor}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Aircraft:</span>
                      <p className="text-white">
                        {event.extendedProps.aircraft}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
