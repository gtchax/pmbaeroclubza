'use server'

import { prisma } from '@/lib/prisma'
import { BookingStatus, CreateBookingData } from '@/lib/types'
// import { BookingStatus } from '@prisma/client'

export async function createBooking(data: CreateBookingData & { studentId: string }) {
  try {
    const booking = await prisma.booking.create({
      data: {
        studentId: data.studentId,
        aircraftId: data.aircraftId,
        scheduleSlotId: data.instructorId ? undefined : null,
        date: new Date(data.date),
        startTime: new Date(`${data.date}T${data.startTime}`),
        endTime: new Date(`${data.date}T${data.endTime}`),
        type: data.type,
        purpose: data.purpose,
        notes: data.notes,
        status: 'PENDING',
      },
      include: {
        student: true,
        aircraft: true,
        scheduleSlot: true,
      },
    })

    return booking
  } catch (error) {
    console.error('Error creating booking:', error)
    throw new Error('Failed to create booking')
  }
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        student: true,
        aircraft: true,
        scheduleSlot: true,
      },
    })

    return booking
  } catch (error) {
    console.error('Error updating booking status:', error)
    throw new Error('Failed to update booking status')
  }
}

export async function getBookingsByStudent(studentId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { studentId },
      include: {
        student: true,
        aircraft: true,
        scheduleSlot: {
          include: {
            instructor: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return bookings
  } catch (error) {
    console.error('Error fetching student bookings:', error)
    throw new Error('Failed to fetch student bookings')
  }
}

export async function getBookingsByInstructor(instructorId: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        scheduleSlot: {
          instructorId,
        },
      },
      include: {
        student: true,
        aircraft: true,
        scheduleSlot: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return bookings
  } catch (error) {
    console.error('Error fetching instructor bookings:', error)
    throw new Error('Failed to fetch instructor bookings')
  }
}

export async function getAvailableAircraft(startTime: Date, endTime: Date) {
  try {
    const bookedAircraftIds = await prisma.booking.findMany({
      where: {
        OR: [
          {
            startTime: {
              lte: endTime,
            },
            endTime: {
              gte: startTime,
            },
          },
        ],
        status: {
          in: ['CONFIRMED', 'IN_PROGRESS'],
        },
      },
      select: {
        aircraftId: true,
      },
    })

    const aircraft = await prisma.aircraft.findMany({
      where: {
        isActive: true,
        isAvailable: true,
        id: {
          notIn: bookedAircraftIds.map(b => b.aircraftId),
        },
      },
      orderBy: {
        registration: 'asc',
      },
    })

    return aircraft
  } catch (error) {
    console.error('Error fetching available aircraft:', error)
    throw new Error('Failed to fetch available aircraft')
  }
}
