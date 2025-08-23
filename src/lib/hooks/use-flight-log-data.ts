"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFlightLog,
  updateFlightLog,
} from "@/lib/actions/flight-log-actions";
import { UpdateFlightLogData } from "@/lib/types";
import { FlightType } from "@/lib/types";

export function useCreateFlightLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      aircraftId: string;
      pilotId: string;
      instructorId?: string;
      studentId?: string;
      date: string;
      departureTime: string;
      arrivalTime?: string;
      departureAirport: string;
      arrivalAirport?: string;
      flightType: FlightType;
      flightPurpose: string;
      totalTime: number;
      pilotInCommand?: number;
      dualReceived?: number;
      soloTime?: number;
      crossCountry?: number;
      nightTime?: number;
      instrumentTime?: number;
      landings?: number;
      nightLandings?: number;
      approaches?: number;
      holds?: number;
      remarks?: string;
      hobbsStart?: number;
      hobbsEnd?: number;
      tachStart?: number;
      tachEnd?: number;
      fuelStart?: number;
      fuelEnd?: number;
    }) => createFlightLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-flight-logs"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-flight-logs"] });
      queryClient.invalidateQueries({ queryKey: ["student-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["student-flight-hours"] });
    },
  });
}

export function useUpdateFlightLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      flightLogId,
      data,
    }: {
      flightLogId: string;
      data: UpdateFlightLogData;
    }) => updateFlightLog(flightLogId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-flight-logs"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-flight-logs"] });
      queryClient.invalidateQueries({ queryKey: ["student-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-dashboard"] });
    },
  });
}
