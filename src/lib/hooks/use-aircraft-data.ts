'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getAllAircraftWithDetails,
  getAircraftById,
  updateAircraftStatus,
  addMaintenanceRecord,
  completeMaintenanceRecord,
  addFuelRecord
} from '@/lib/actions/aircraft-actions'
import { MaintenanceType } from '@prisma/client'

export function useAllAircraftWithDetails() {
  return useQuery({
    queryKey: ['all-aircraft-details'],
    queryFn: getAllAircraftWithDetails,
  })
}

export function useAircraftById(aircraftId: string) {
  return useQuery({
    queryKey: ['aircraft', aircraftId],
    queryFn: () => getAircraftById(aircraftId),
    enabled: !!aircraftId,
  })
}

export function useUpdateAircraftStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ aircraftId, isAvailable }: { aircraftId: string; isAvailable: boolean }) => 
      updateAircraftStatus(aircraftId, isAvailable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aircraft-details'] })
      queryClient.invalidateQueries({ queryKey: ['all-aircraft'] })
      queryClient.invalidateQueries({ queryKey: ['available-aircraft'] })
    },
  })
}

export function useAddMaintenanceRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      aircraftId: string
      type: MaintenanceType
      description: string
      hoursAtMaintenance: number
      cost?: number
      vendor?: string
      startDate: string
      nextDueHours?: number
      nextDueDate?: string
      documents?: string[]
    }) => addMaintenanceRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aircraft-details'] })
      queryClient.invalidateQueries({ queryKey: ['aircraft'] })
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
  })
}

export function useCompleteMaintenanceRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ maintenanceId, completedDate, cost }: { 
      maintenanceId: string
      completedDate: string
      cost?: number
    }) => completeMaintenanceRecord(maintenanceId, completedDate, cost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aircraft-details'] })
      queryClient.invalidateQueries({ queryKey: ['aircraft'] })
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
  })
}

export function useAddFuelRecord() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {
      aircraftId: string
      quantity: number
      cost: number
      fuelType: string
      vendor?: string
      date: string
      notes?: string
    }) => addFuelRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-aircraft-details'] })
      queryClient.invalidateQueries({ queryKey: ['aircraft'] })
    },
  })
}
