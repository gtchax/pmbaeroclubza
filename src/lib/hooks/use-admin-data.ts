'use client'

import { useQuery } from '@tanstack/react-query'
import { 
  getAdminProfile, 
  getAdminDashboardData, 
  getDashboardStats,
  getAllUsers,
  getAllAircraft,
  getAllBookings
} from '@/lib/actions/admin-actions'

export function useAdminProfile(userId: string) {
  return useQuery({
    queryKey: ['admin-profile', userId],
    queryFn: () => getAdminProfile(userId),
    enabled: !!userId,
  })
}

export function useAdminDashboard(userId: string) {
  return useQuery({
    queryKey: ['admin-dashboard', userId],
    queryFn: () => getAdminDashboardData(userId),
    enabled: !!userId,
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for admin dashboard
  })
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export function useAllUsers() {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: getAllUsers,
  })
}

export function useAllAircraft() {
  return useQuery({
    queryKey: ['all-aircraft'],
    queryFn: getAllAircraft,
  })
}

export function useAllBookings() {
  return useQuery({
    queryKey: ['all-bookings'],
    queryFn: getAllBookings,
  })
}
