'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  createBooking,
  updateBookingStatus,
  getAvailableAircraft
} from '@/lib/actions/booking-actions'
import { CreateBookingData } from '@/lib/types'
import { BookingStatus } from '@/lib/types'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBookingData & { studentId: string }) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['student-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] })
    },
  })
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: BookingStatus }) => 
      updateBookingStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['all-bookings'] })
      queryClient.invalidateQueries({ queryKey: ['student-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
  })
}

export function useAvailableAircraft(startTime: Date, endTime: Date) {
  return useQuery({
    queryKey: ['available-aircraft', startTime.toISOString(), endTime.toISOString()],
    queryFn: () => getAvailableAircraft(startTime, endTime),
    enabled: !!startTime && !!endTime,
  })
}
