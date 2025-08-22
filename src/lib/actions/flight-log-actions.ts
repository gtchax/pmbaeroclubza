'use server'

import { prisma } from '@/lib/prisma'
import { UpdateFlightLogData } from '@/lib/types'
import { FlightType } from '@prisma/client'

export async function createFlightLog(data: {
  aircraftId: string
  pilotId: string
  instructorId?: string
  studentId?: string
  date: string
  departureTime: string
  arrivalTime?: string
  departureAirport: string
  arrivalAirport?: string
  flightType: FlightType
  flightPurpose: string
  totalTime: number
  pilotInCommand?: number
  dualReceived?: number
  soloTime?: number
  crossCountry?: number
  nightTime?: number
  instrumentTime?: number
  landings?: number
  nightLandings?: number
  approaches?: number
  holds?: number
  remarks?: string
  hobbsStart?: number
  hobbsEnd?: number
  tachStart?: number
  tachEnd?: number
  fuelStart?: number
  fuelEnd?: number
}) {
  try {
    const flightLog = await prisma.flightLog.create({
      data: {
        aircraftId: data.aircraftId,
        pilotId: data.pilotId,
        instructorId: data.instructorId,
        studentId: data.studentId,
        date: new Date(data.date),
        departureTime: new Date(`${data.date}T${data.departureTime}`),
        arrivalTime: data.arrivalTime ? new Date(`${data.date}T${data.arrivalTime}`) : null,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        flightType: data.flightType,
        flightPurpose: data.flightPurpose,
        totalTime: data.totalTime,
        pilotInCommand: data.pilotInCommand || 0,
        dualReceived: data.dualReceived || 0,
        soloTime: data.soloTime || 0,
        crossCountry: data.crossCountry || 0,
        nightTime: data.nightTime || 0,
        instrumentTime: data.instrumentTime || 0,
        landings: data.landings || 0,
        nightLandings: data.nightLandings || 0,
        approaches: data.approaches || 0,
        holds: data.holds || 0,
        remarks: data.remarks,
        hobbsStart: data.hobbsStart,
        hobbsEnd: data.hobbsEnd,
        tachStart: data.tachStart,
        tachEnd: data.tachEnd,
        fuelStart: data.fuelStart,
        fuelEnd: data.fuelEnd,
        isCompleted: true,
      },
      include: {
        aircraft: true,
        pilot: true,
        instructor: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    })

    // Update student flight hours if this is a student flight
    if (data.studentId) {
      await prisma.student.update({
        where: { id: data.studentId },
        data: {
          totalFlightHours: {
            increment: data.totalTime,
          },
          soloHours: {
            increment: data.soloTime || 0,
          },
          crossCountryHours: {
            increment: data.crossCountry || 0,
          },
          instrumentHours: {
            increment: data.instrumentTime || 0,
          },
          nightHours: {
            increment: data.nightTime || 0,
          },
        },
      })
    }

    // Update instructor hours if this is an instructional flight
    if (data.instructorId && data.dualReceived) {
      const instructor = await prisma.instructor.findUnique({
        where: { userId: data.instructorId },
      })
      
      if (instructor) {
        await prisma.instructor.update({
          where: { id: instructor.id },
          data: {
            totalFlightHours: {
              increment: data.totalTime,
            },
            instructorHours: {
              increment: data.dualReceived,
            },
          },
        })
      }
    }

    // Update aircraft hours
    await prisma.aircraft.update({
      where: { id: data.aircraftId },
      data: {
        currentHours: {
          increment: data.totalTime,
        },
      },
    })

    return flightLog
  } catch (error) {
    console.error('Error creating flight log:', error)
    throw new Error('Failed to create flight log')
  }
}

export async function updateFlightLog(flightLogId: string, data: UpdateFlightLogData) {
  try {
    const flightLog = await prisma.flightLog.update({
      where: { id: flightLogId },
      data: {
        flightNumber: data.flightNumber,
        departureTime: new Date(data.departureTime),
        arrivalTime: data.arrivalTime ? new Date(data.arrivalTime) : null,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        flightType: data.flightType,
        flightPurpose: data.flightPurpose,
        totalTime: data.totalTime,
        pilotInCommand: data.pilotInCommand || 0,
        dualReceived: data.dualReceived || 0,
        soloTime: data.soloTime || 0,
        crossCountry: data.crossCountry || 0,
        nightTime: data.nightTime || 0,
        instrumentTime: data.instrumentTime || 0,
        landings: data.landings || 0,
        nightLandings: data.nightLandings || 0,
        approaches: data.approaches || 0,
        holds: data.holds || 0,
        remarks: data.remarks,
        hobbsStart: data.hobbsStart,
        hobbsEnd: data.hobbsEnd,
        tachStart: data.tachStart,
        tachEnd: data.tachEnd,
        fuelStart: data.fuelStart,
        fuelEnd: data.fuelEnd,
      },
      include: {
        aircraft: true,
        pilot: true,
        instructor: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    })

    return flightLog
  } catch (error) {
    console.error('Error updating flight log:', error)
    throw new Error('Failed to update flight log')
  }
}

export async function getFlightLogsByPilot(pilotId: string) {
  try {
    const flightLogs = await prisma.flightLog.findMany({
      where: { pilotId },
      include: {
        aircraft: true,
        pilot: true,
        instructor: true,
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return flightLogs
  } catch (error) {
    console.error('Error fetching pilot flight logs:', error)
    throw new Error('Failed to fetch pilot flight logs')
  }
}

export async function getFlightLogsByInstructor(instructorId: string) {
  try {
    const flightLogs = await prisma.flightLog.findMany({
      where: { instructorId },
      include: {
        aircraft: true,
        pilot: true,
        instructor: true,
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return flightLogs
  } catch (error) {
    console.error('Error fetching instructor flight logs:', error)
    throw new Error('Failed to fetch instructor flight logs')
  }
}

export async function getFlightLogsByStudent(studentId: string) {
  try {
    const flightLogs = await prisma.flightLog.findMany({
      where: { studentId },
      include: {
        aircraft: true,
        pilot: true,
        instructor: true,
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return flightLogs
  } catch (error) {
    console.error('Error fetching student flight logs:', error)
    throw new Error('Failed to fetch student flight logs')
  }
}
