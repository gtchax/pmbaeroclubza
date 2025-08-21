'use server'

import { prisma } from '@/lib/prisma'
import { StudentDashboardData, StudentWithDetails } from '@/lib/types'

export async function getStudentProfile(userId: string): Promise<StudentWithDetails | null> {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: {
        user: true,
        enrollments: {
          include: {
            course: true,
            instructor: {
              include: {
                user: true,
              },
            },
          },
        },
        progressRecords: {
          include: {
            module: true,
            lesson: true,
          },
        },
        evaluationsReceived: {
          include: {
            instructor: {
              include: {
                user: true,
              },
            },
            skillAssessments: true,
          },
        },
        flightLogs: {
          include: {
            aircraft: true,
            instructor: true,
          },
          orderBy: {
            date: 'desc',
          },
        },
      },
    })

    return student
  } catch (error) {
    console.error('Error fetching student profile:', error)
    throw new Error('Failed to fetch student profile')
  }
}

export async function getStudentDashboardData(userId: string): Promise<StudentDashboardData | null> {
  try {
    const student = await getStudentProfile(userId)
    if (!student) return null

    const [upcomingBookings, notifications] = await Promise.all([
      prisma.booking.findMany({
        where: {
          studentId: userId,
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
    ])

    const currentEnrollments = await prisma.enrollment.findMany({
      where: {
        studentId: student.id,
        status: 'ACTIVE',
      },
      include: {
        course: true,
        instructor: {
          include: {
            user: true,
          },
        },
        progressRecords: {
          include: {
            module: true,
            lesson: true,
          },
        },
      },
    })

    const recentFlightLogs = student.flightLogs.slice(0, 10)

    return {
      profile: student,
      upcomingBookings,
      recentFlightLogs,
      currentEnrollments,
      notifications,
    }
  } catch (error) {
    console.error('Error fetching student dashboard data:', error)
    throw new Error('Failed to fetch student dashboard data')
  }
}

export async function getStudentFlightHours(studentId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        totalFlightHours: true,
        soloHours: true,
        crossCountryHours: true,
        instrumentHours: true,
        nightHours: true,
      },
    })

    return student
  } catch (error) {
    console.error('Error fetching student flight hours:', error)
    throw new Error('Failed to fetch student flight hours')
  }
}

export async function getStudentProgress(studentId: string) {
  try {
    const progressRecords = await prisma.progressRecord.findMany({
      where: { studentId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
        lesson: true,
        enrollment: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return progressRecords
  } catch (error) {
    console.error('Error fetching student progress:', error)
    throw new Error('Failed to fetch student progress')
  }
}

export async function updateStudentProfile(
  studentId: string,
  data: {
    address?: string
    emergencyContact?: any
    medicalCert?: string
    medicalExpiry?: Date
    licenseNumber?: string
    licenseType?: string
    licenseExpiry?: Date
  }
) {
  try {
    const student = await prisma.student.update({
      where: { id: studentId },
      data,
      include: {
        user: true,
      },
    })

    return student
  } catch (error) {
    console.error('Error updating student profile:', error)
    throw new Error('Failed to update student profile')
  }
}
