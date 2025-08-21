'use server'

import { prisma } from '@/lib/prisma'
import { AircraftWithDetails } from '@/lib/types'
import { MaintenanceType } from '@prisma/client'

export async function getAllAircraftWithDetails(): Promise<AircraftWithDetails[]> {
  try {
    const aircraft = await prisma.aircraft.findMany({
      include: {
        maintenanceRecords: {
          orderBy: {
            startDate: 'desc',
          },
        },
        fuelRecords: {
          orderBy: {
            date: 'desc',
          },
          take: 10,
        },
        flightLogs: {
          include: {
            pilot: true,
            instructor: true,
          },
          orderBy: {
            date: 'desc',
          },
          take: 10,
        },
        bookings: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          include: {
            student: true,
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
      orderBy: {
        registration: 'asc',
      },
    })

    return aircraft
  } catch (error) {
    console.error('Error fetching aircraft with details:', error)
    throw new Error('Failed to fetch aircraft with details')
  }
}

export async function getAircraftById(aircraftId: string): Promise<AircraftWithDetails | null> {
  try {
    const aircraft = await prisma.aircraft.findUnique({
      where: { id: aircraftId },
      include: {
        maintenanceRecords: {
          orderBy: {
            startDate: 'desc',
          },
        },
        fuelRecords: {
          orderBy: {
            date: 'desc',
          },
        },
        flightLogs: {
          include: {
            pilot: true,
            instructor: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
        bookings: {
          include: {
            student: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })

    return aircraft
  } catch (error) {
    console.error('Error fetching aircraft by ID:', error)
    throw new Error('Failed to fetch aircraft')
  }
}

export async function updateAircraftStatus(aircraftId: string, isAvailable: boolean) {
  try {
    const aircraft = await prisma.aircraft.update({
      where: { id: aircraftId },
      data: { isAvailable },
    })

    return aircraft
  } catch (error) {
    console.error('Error updating aircraft status:', error)
    throw new Error('Failed to update aircraft status')
  }
}

export async function addMaintenanceRecord(data: {
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
}) {
  try {
    const maintenanceRecord = await prisma.maintenanceRecord.create({
      data: {
        aircraftId: data.aircraftId,
        type: data.type,
        description: data.description,
        hoursAtMaintenance: data.hoursAtMaintenance,
        cost: data.cost,
        vendor: data.vendor,
        startDate: new Date(data.startDate),
        nextDueHours: data.nextDueHours,
        nextDueDate: data.nextDueDate ? new Date(data.nextDueDate) : null,
        documents: data.documents || [],
      },
    })

    return maintenanceRecord
  } catch (error) {
    console.error('Error adding maintenance record:', error)
    throw new Error('Failed to add maintenance record')
  }
}

export async function completeMaintenanceRecord(maintenanceId: string, completedDate: string, cost?: number) {
  try {
    const maintenanceRecord = await prisma.maintenanceRecord.update({
      where: { id: maintenanceId },
      data: {
        isCompleted: true,
        completedDate: new Date(completedDate),
        cost,
      },
    })

    return maintenanceRecord
  } catch (error) {
    console.error('Error completing maintenance record:', error)
    throw new Error('Failed to complete maintenance record')
  }
}

export async function addFuelRecord(data: {
  aircraftId: string
  quantity: number
  cost: number
  fuelType: string
  vendor?: string
  date: string
  notes?: string
}) {
  try {
    const fuelRecord = await prisma.fuelRecord.create({
      data: {
        aircraftId: data.aircraftId,
        quantity: data.quantity,
        cost: data.cost,
        fuelType: data.fuelType,
        vendor: data.vendor,
        date: new Date(data.date),
        notes: data.notes,
      },
    })

    return fuelRecord
  } catch (error) {
    console.error('Error adding fuel record:', error)
    throw new Error('Failed to add fuel record')
  }
}
