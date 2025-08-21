'use server'

import { prisma } from '@/lib/prisma'
import { InstructorDashboardData, InstructorWithDetails } from '@/lib/types'

export async function getInstructorProfile(userId: string): Promise<InstructorWithDetails | null> {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { userId },
      include: {
        user: true,
        enrollments: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
            course: true,
          },
        },
        evaluationsGiven: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
            skillAssessments: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
        flightLogs: {
          include: {
            aircraft: true,
            student: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            date: 'desc',
          },
        },
        scheduleSlots: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          include: {
            bookings: {
              include: {
                student: true,
                aircraft: true,
              },
            },
          },
          orderBy: {
            startTime: 'asc',
          },
        },
        aircraftCertifications: {
          include: {
            aircraft: true,
          },
          where: {
            isActive: true,
          },
        },
      },
    })

    return instructor
  } catch (error) {
    console.error('Error fetching instructor profile:', error)
    throw new Error('Failed to fetch instructor profile')
  }
}

export async function getInstructorDashboardData(userId: string): Promise<InstructorDashboardData | null> {
  try {
    const instructor = await getInstructorProfile(userId)
    if (!instructor) return null

    const [upcomingBookings, notifications, students] = await Promise.all([
      prisma.booking.findMany({
        where: {
          scheduleSlot: {
            instructorId: instructor.id,
          },
          date: {
            gte: new Date(),
          },
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
        include: {
          student: true,
          aircraft: true,
          scheduleSlot: true,
        },
        orderBy: {
          date: 'asc',
        },
        take: 10,
      }),
      prisma.notification.findMany({
        where: {
          userId,
          isRead: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),
      prisma.student.findMany({
        where: {
          enrollments: {
            some: {
              instructorId: instructor.id,
              status: 'ACTIVE',
            },
          },
        },
        include: {
          user: true,
          enrollments: {
            where: {
              instructorId: instructor.id,
              status: 'ACTIVE',
            },
            include: {
              course: true,
            },
          },
        },
      }),
    ])

    const todaySchedule = await prisma.scheduleSlot.findMany({
      where: {
        instructorId: instructor.id,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      include: {
        bookings: {
          include: {
            student: true,
            aircraft: true,
            scheduleSlot: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    const recentFlightLogs = instructor.flightLogs.slice(0, 10)

    return {
      profile: instructor,
      upcomingBookings,
      recentFlightLogs,
      students,
      todaySchedule,
      notifications,
    }
  } catch (error) {
    console.error('Error fetching instructor dashboard data:', error)
    throw new Error('Failed to fetch instructor dashboard data')
  }
}

export async function getInstructorStudents(instructorId: string) {
  try {
    const students = await prisma.student.findMany({
      where: {
        enrollments: {
          some: {
            instructorId,
            status: 'ACTIVE',
          },
        },
      },
      include: {
        user: true,
        enrollments: {
          where: {
            instructorId,
            status: 'ACTIVE',
          },
          include: {
            course: true,
            progressRecords: {
              include: {
                module: true,
                lesson: true,
              },
            },
          },
        },
        flightLogs: {
          where: {
            instructorId: {
              in: await prisma.instructor
                .findUnique({
                  where: { id: instructorId },
                  select: { userId: true },
                })
                .then(i => i ? [i.userId] : []),
            },
          },
          include: {
            aircraft: true,
          },
          orderBy: {
            date: 'desc',
          },
          take: 5,
        },
      },
    })

    return students
  } catch (error) {
    console.error('Error fetching instructor students:', error)
    throw new Error('Failed to fetch instructor students')
  }
}

export async function getInstructorSchedule(instructorId: string, date?: Date) {
  try {
    const targetDate = date || new Date()
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999))

    const schedule = await prisma.scheduleSlot.findMany({
      where: {
        instructorId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        bookings: {
          include: {
            student: true,
            aircraft: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    return schedule
  } catch (error) {
    console.error('Error fetching instructor schedule:', error)
    throw new Error('Failed to fetch instructor schedule')
  }
}

export async function updateInstructorProfile(
  instructorId: string,
  data: {
    licenseNumber?: string
    licenseType?: string
    licenseExpiry?: Date
    medicalCert?: string
    medicalExpiry?: Date
    specializations?: string[]
    isActive?: boolean
  }
) {
  try {
    const instructor = await prisma.instructor.update({
      where: { id: instructorId },
      data,
      include: {
        user: true,
      },
    })

    return instructor
  } catch (error) {
    console.error('Error updating instructor profile:', error)
    throw new Error('Failed to update instructor profile')
  }
}
