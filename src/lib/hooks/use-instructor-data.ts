'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getInstructorProfile, 
  getInstructorDashboardData, 
  getInstructorStudents,
  getInstructorSchedule,
  updateInstructorProfile
} from '@/lib/actions/instructor-actions'
import { getBookingsByInstructor } from '@/lib/actions/booking-actions'
import { getFlightLogsByInstructor } from '@/lib/actions/flight-log-actions'
import { getEvaluationsByInstructor } from '@/lib/actions/evaluation-actions'

export function useInstructorProfile(userId: string) {
  return useQuery({
    queryKey: ['instructor-profile', userId],
    queryFn: () => getInstructorProfile(userId),
    enabled: !!userId,
  })
}

export function useInstructorDashboard(userId: string) {
  return useQuery({
    queryKey: ['instructor-dashboard', userId],
    queryFn: () => getInstructorDashboardData(userId),
    enabled: !!userId,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export function useInstructorStudents(instructorId: string) {
  return useQuery({
    queryKey: ['instructor-students', instructorId],
    queryFn: () => getInstructorStudents(instructorId),
    enabled: !!instructorId,
  })
}

export function useInstructorSchedule(instructorId: string, date?: Date) {
  return useQuery({
    queryKey: ['instructor-schedule', instructorId, date?.toISOString()],
    queryFn: () => getInstructorSchedule(instructorId, date),
    enabled: !!instructorId,
  })
}

export function useInstructorBookings(instructorId: string) {
  return useQuery({
    queryKey: ['instructor-bookings', instructorId],
    queryFn: () => getBookingsByInstructor(instructorId),
    enabled: !!instructorId,
  })
}

export function useInstructorFlightLogs(instructorId: string) {
  return useQuery({
    queryKey: ['instructor-flight-logs', instructorId],
    queryFn: () => getFlightLogsByInstructor(instructorId),
    enabled: !!instructorId,
  })
}

export function useInstructorEvaluations(instructorId: string) {
  return useQuery({
    queryKey: ['instructor-evaluations', instructorId],
    queryFn: () => getEvaluationsByInstructor(instructorId),
    enabled: !!instructorId,
  })
}

export function useUpdateInstructorProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ instructorId, data }: { 
      instructorId: string
      data: Parameters<typeof updateInstructorProfile>[1]
    }) => updateInstructorProfile(instructorId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] })
    },
  })
}
