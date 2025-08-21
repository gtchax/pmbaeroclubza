'use server'

import { prisma } from '@/lib/prisma'
import { AdminDashboardData, DashboardStats } from '@/lib/types'

export async function getAdminProfile(userId: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    })

    return admin
  } catch (error) {
    console.error('Error fetching admin profile:', error)
    throw new Error('Failed to fetch admin profile')
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [
      totalStudents,
      activeStudents,
      totalInstructors,
      activeInstructors,
      totalAircraft,
      availableAircraft,
      totalFlightHours,
      upcomingBookings,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.student.count({
        where: {
          enrollments: {
            some: {
              status: 'ACTIVE',
            },
          },
        },
      }),
      prisma.instructor.count(),
      prisma.instructor.count({
        where: { isActive: true },
      }),
      prisma.aircraft.count(),
      prisma.aircraft.count({
        where: { isAvailable: true },
      }),
      prisma.flightLog.aggregate({
        _sum: {
          totalTime: true,
        },
      }),
      prisma.booking.count({
        where: {
          date: {
            gte: new Date(),
          },
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
      }),
    ])

    return {
      totalStudents,
      activeStudents,
      totalInstructors,
      activeInstructors,
      totalAircraft,
      availableAircraft,
      totalFlightHours: totalFlightHours._sum.totalTime || 0,
      upcomingBookings,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('Failed to fetch dashboard stats')
  }
}

export async function getAdminDashboardData(userId: string): Promise<AdminDashboardData | null> {
  try {
    const admin = await getAdminProfile(userId)
    if (!admin) return null

    const [stats, recentBookings, maintenanceAlerts, notifications] = await Promise.all([
      getDashboardStats(),
      prisma.booking.findMany({
        include: {
          student: true,
          aircraft: true,
          scheduleSlot: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),
      prisma.aircraft.findMany({
        where: {
          OR: [
            {
              nextInspection: {
                lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
              },
            },
            {
              insuranceExpiry: {
                lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              },
            },
            {
              registrationExpiry: {
                lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
        include: {
          maintenanceRecords: {
            where: {
              isCompleted: false,
            },
            orderBy: {
              startDate: 'desc',
            },
          },
        },
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

    // Get expiring certifications
    const expiringCertifications = await Promise.all([
      // Instructor certifications
      prisma.instructor.findMany({
        where: {
          OR: [
            {
              licenseExpiry: {
                lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
              },
            },
            {
              medicalExpiry: {
                lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
        include: {
          user: true,
        },
      }),
      // Student certifications
      prisma.student.findMany({
        where: {
          OR: [
            {
              licenseExpiry: {
                lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              },
            },
            {
              medicalExpiry: {
                lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              },
            },
          ],
        },
        include: {
          user: true,
        },
      }),
    ])

    const formattedExpiringCertifications = [
      ...expiringCertifications[0]
        .map(instructor => {
          const expiry = instructor.licenseExpiry || instructor.medicalExpiry
          if (!expiry) return null
          return {
            type: 'instructor' as const,
            user: instructor.user,
            expiry,
            certificationType: instructor.licenseExpiry && instructor.licenseExpiry <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) 
              ? 'License' 
              : 'Medical',
          }
        })
        .filter((cert): cert is NonNullable<typeof cert> => cert !== null),
      ...expiringCertifications[1]
        .map(student => {
          const expiry = student.licenseExpiry || student.medicalExpiry
          if (!expiry) return null
          return {
            type: 'student' as const,
            user: student.user,
            expiry,
            certificationType: student.licenseExpiry && student.licenseExpiry <= new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) 
              ? 'License' 
              : 'Medical',
          }
        })
        .filter((cert): cert is NonNullable<typeof cert> => cert !== null),
    ]

    return {
      stats,
      recentBookings,
      maintenanceAlerts,
      expiringCertifications: formattedExpiringCertifications,
      notifications,
    }
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    throw new Error('Failed to fetch admin dashboard data')
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        studentProfile: true,
        instructorProfile: true,
        adminProfile: true,
        roles: {
          include: {
            role: {
              select: {
                name: true,
                permissions: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return users
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw new Error('Failed to fetch users')
  }
}

export async function getAllAircraft() {
  try {
    const aircraft = await prisma.aircraft.findMany({
      include: {
        maintenanceRecords: {
          orderBy: {
            startDate: 'desc',
          },
          take: 5,
        },
        fuelRecords: {
          orderBy: {
            date: 'desc',
          },
          take: 5,
        },
        flightLogs: {
          orderBy: {
            date: 'desc',
          },
          take: 5,
          include: {
            pilot: true,
            instructor: true,
          },
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
    console.error('Error fetching all aircraft:', error)
    throw new Error('Failed to fetch aircraft')
  }
}

export async function getAllBookings() {
  try {
    const bookings = await prisma.booking.findMany({
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
    console.error('Error fetching all bookings:', error)
    throw new Error('Failed to fetch bookings')
  }
}
