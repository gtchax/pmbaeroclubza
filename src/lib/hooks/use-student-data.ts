'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getStudentProfile, 
  getStudentDashboardData, 
  getStudentFlightHours,
  getStudentProgress,
  updateStudentProfile
} from '@/lib/actions/student-actions'
import { getBookingsByStudent } from '@/lib/actions/booking-actions'
import { getFlightLogsByStudent } from '@/lib/actions/flight-log-actions'
import { getEvaluationsByStudent } from '@/lib/actions/evaluation-actions'

export function useStudentProfile(userId: string) {
  return useQuery({
    queryKey: ['student-profile', userId],
    queryFn: () => getStudentProfile(userId),
    enabled: !!userId,
  })
}

export function useStudentDashboard(userId: string) {
  return useQuery({
    queryKey: ['student-dashboard', userId],
    queryFn: () => getStudentDashboardData(userId),
    enabled: !!userId,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export function useStudentFlightHours(studentId: string) {
  return useQuery({
    queryKey: ['student-flight-hours', studentId],
    queryFn: () => getStudentFlightHours(studentId),
    enabled: !!studentId,
  })
}

export function useStudentProgress(studentId: string) {
  return useQuery({
    queryKey: ['student-progress', studentId],
    queryFn: () => getStudentProgress(studentId),
    enabled: !!studentId,
  })
}

export function useStudentBookings(studentId: string) {
  return useQuery({
    queryKey: ['student-bookings', studentId],
    queryFn: () => getBookingsByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useStudentFlightLogs(studentId: string) {
  return useQuery({
    queryKey: ['student-flight-logs', studentId],
    queryFn: () => getFlightLogsByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useStudentEvaluations(studentId: string) {
  return useQuery({
    queryKey: ['student-evaluations', studentId],
    queryFn: () => getEvaluationsByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ studentId, data }: { 
      studentId: string
      data: Parameters<typeof updateStudentProfile>[1]
    }) => updateStudentProfile(studentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] })
      queryClient.invalidateQueries({ queryKey: ['student-dashboard'] })
    },
  })
}
