import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'STUDENT' },
      update: {},
      create: {
        name: 'STUDENT',
        description: 'Student pilot role',
        permissions: {
          canViewOwnData: true,
          canBookLessons: true,
          canViewLogbook: true,
        },
      },
    }),
    prisma.role.upsert({
      where: { name: 'INSTRUCTOR' },
      update: {},
      create: {
        name: 'INSTRUCTOR',
        description: 'Flight instructor role',
        permissions: {
          canViewStudentData: true,
          canCreateEvaluations: true,
          canManageSchedule: true,
          canViewAllLogbooks: true,
        },
      },
    }),
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        description: 'Administrator role',
        permissions: {
          canManageUsers: true,
          canManageAircraft: true,
          canViewAllData: true,
          canManageSystem: true,
        },
      },
    }),
  ])

  console.log('✅ Roles created')

  // Create users
  const users = await Promise.all([
    // Student user
    prisma.user.upsert({
      where: { email: 'alex.johnson@example.com' },
      update: {},
      create: {
        id: 'user_123',
        email: 'alex.johnson@example.com',
        firstName: 'Alex',
        lastName: 'Johnson',
        phone: '+27123456789',
        isActive: true,
      },
    }),
    // Instructor user
    prisma.user.upsert({
      where: { email: 'sarah.mitchell@pmbaero.com' },
      update: {},
      create: {
        email: 'sarah.mitchell@pmbaero.com',
        firstName: 'Sarah',
        lastName: 'Mitchell',
        phone: '+27987654321',
        isActive: true,
      },
    }),
    // Admin user
    prisma.user.upsert({
      where: { email: 'admin@pmbaero.com' },
      update: {},
      create: {
        email: 'admin@pmbaero.com',
        firstName: 'John',
        lastName: 'Administrator',
        phone: '+27555123456',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Users created')

  // Assign roles to users
  await Promise.all([
    prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: users[0].id,
          roleId: roles[0].id,
        },
      },
      update: {},
      create: {
        userId: users[0].id,
        roleId: roles[0].id,
      },
    }),
    prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: users[1].id,
          roleId: roles[1].id,
        },
      },
      update: {},
      create: {
        userId: users[1].id,
        roleId: roles[1].id,
      },
    }),
    prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: users[2].id,
          roleId: roles[2].id,
        },
      },
      update: {},
      create: {
        userId: users[2].id,
        roleId: roles[2].id,
      },
    }),
  ])

  console.log('✅ User roles assigned')

  // Create aircraft
  const aircraft = await Promise.all([
    prisma.aircraft.upsert({
      where: { registration: 'ZS-PMB' },
      update: {},
      create: {
        registration: 'ZS-PMB',
        make: 'Cessna',
        model: '172',
        year: 2018,
        serialNumber: '17281234',
        category: 'Airplane',
        class: 'Single Engine Land',
        engineType: 'Piston',
        seats: 4,
        maxWeight: 1157,
        fuelCapacity: 212,
        currentHours: 2450.5,
        nextInspection: new Date('2024-06-15'),
        insuranceExpiry: new Date('2024-12-31'),
        registrationExpiry: new Date('2025-03-31'),
        isActive: true,
        isAvailable: true,
        hourlyRate: 1200,
        notes: 'Well-maintained training aircraft',
      },
    }),
    prisma.aircraft.upsert({
      where: { registration: 'ZS-FLY' },
      update: {},
      create: {
        registration: 'ZS-FLY',
        make: 'Piper',
        model: 'Cherokee',
        year: 2020,
        serialNumber: 'PA285678',
        category: 'Airplane',
        class: 'Single Engine Land',
        engineType: 'Piston',
        seats: 4,
        maxWeight: 1150,
        fuelCapacity: 200,
        currentHours: 1850.2,
        nextInspection: new Date('2024-08-20'),
        insuranceExpiry: new Date('2024-11-30'),
        registrationExpiry: new Date('2025-05-15'),
        isActive: true,
        isAvailable: true,
        hourlyRate: 1350,
        notes: 'Advanced training aircraft',
      },
    }),
  ])

  console.log('✅ Aircraft created')

  // Create instructor profile
  const instructor = await prisma.instructor.upsert({
    where: { userId: users[1].id },
    update: {},
    create: {
      userId: users[1].id,
      instructorNumber: 'CFI-001',
      licenseNumber: 'CFI123456',
      licenseType: 'CFI',
      licenseExpiry: new Date('2025-12-31'),
      medicalCert: 'MED789012',
      medicalExpiry: new Date('2025-06-30'),
      totalFlightHours: 3500,
      instructorHours: 1200,
      specializations: ['PPL', 'IFR', 'Complex Aircraft'],
      isActive: true,
      hireDateDate: new Date('2020-01-15'),
    },
  })

  console.log('✅ Instructor profile created')

  // Create admin profile
  await prisma.admin.upsert({
    where: { userId: users[2].id },
    update: {},
    create: {
      userId: users[2].id,
      adminLevel: 'ADMIN',
      permissions: {
        canManageUsers: true,
        canManageAircraft: true,
        canViewReports: true,
      },
    },
  })

  console.log('✅ Admin profile created')

  // Create courses
  const course = await prisma.course.upsert({
    where: { code: 'PPL-001' },
    update: {},
    create: {
      name: 'Private Pilot License',
      code: 'PPL-001',
      description: 'Complete Private Pilot License training program',
      category: 'PPL',
      duration: 45,
      cost: 85000,
      isActive: true,
    },
  })

  console.log('✅ Course created')

  // Create modules
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { courseId_order: { courseId: course.id, order: 1 } },
      update: {},
      create: {
        courseId: course.id,
        name: 'Pre-Flight Procedures',
        description: 'Learn aircraft inspection and pre-flight procedures',
        order: 1,
        duration: 5,
        isRequired: true,
      },
    }),
    prisma.module.upsert({
      where: { courseId_order: { courseId: course.id, order: 2 } },
      update: {},
      create: {
        courseId: course.id,
        name: 'Basic Flight Maneuvers',
        description: 'Master basic flight maneuvers and controls',
        order: 2,
        duration: 15,
        isRequired: true,
      },
    }),
    prisma.module.upsert({
      where: { courseId_order: { courseId: course.id, order: 3 } },
      update: {},
      create: {
        courseId: course.id,
        name: 'Navigation & Cross Country',
        description: 'Learn navigation techniques and cross-country flying',
        order: 3,
        duration: 12,
        isRequired: true,
      },
    }),
  ])

  console.log('✅ Modules created')

  // Create student profile
  const student = await prisma.student.upsert({
    where: { userId: users[0].id },
    update: {},
    create: {
      userId: users[0].id,
      studentNumber: 'ST-2024-001',
      dateOfBirth: new Date('1995-06-15'),
      address: '123 Aviation Street, Cape Town, 8001',
      emergencyContact: {
        name: 'Jane Johnson',
        relationship: 'Spouse',
        phone: '+27123456790',
      },
      medicalCert: 'MED456789',
      medicalExpiry: new Date('2025-06-15'),
      totalFlightHours: 42.5,
      soloHours: 8.2,
      crossCountryHours: 12.5,
      instrumentHours: 5.8,
      nightHours: 3.1,
    },
  })

  console.log('✅ Student profile created')

  // Create enrollment
  const enrollment = await prisma.enrollment.upsert({
    where: {
      studentId_courseId: {
        studentId: student.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      studentId: student.id,
      courseId: course.id,
      instructorId: instructor.id,
      startDate: new Date('2024-01-15'),
      expectedEndDate: new Date('2024-08-15'),
      status: 'ACTIVE',
      totalCost: 85000,
      paidAmount: 45000,
    },
  })

  console.log('✅ Enrollment created')

  // Create progress records
  await Promise.all(
    modules.map((module, index) =>
      prisma.progressRecord.upsert({
        where: {
          enrollmentId_moduleId: {
            enrollmentId: enrollment.id,
            moduleId: module.id,
          },
        },
        update: {},
        create: {
          enrollmentId: enrollment.id,
          studentId: student.id,
          moduleId: module.id,
          status: index === 0 ? 'COMPLETED' : index === 1 ? 'IN_PROGRESS' : 'NOT_STARTED',
          score: index === 0 ? 95 : index === 1 ? 78 : null,
          completedAt: index === 0 ? new Date('2024-02-01') : null,
          notes: index === 0 ? 'Excellent understanding of pre-flight procedures' : null,
        },
      })
    )
  )

  console.log('✅ Progress records created')

  // Create flight logs
  const flightLogs = await Promise.all([
    prisma.flightLog.create({
      data: {
        aircraftId: aircraft[0].id,
        pilotId: users[0].id,
        instructorId: users[1].id,
        studentId: student.id,
        date: new Date('2024-02-18'),
        departureTime: new Date('2024-02-18T09:00:00Z'),
        arrivalTime: new Date('2024-02-18T10:30:00Z'),
        departureAirport: 'FACT',
        arrivalAirport: 'FACT',
        flightType: 'TRAINING',
        flightPurpose: 'Pattern Work',
        totalTime: 1.5,
        dualReceived: 1.5,
        landings: 8,
        remarks: 'Excellent progress on landings',
        isCompleted: true,
      },
    }),
    prisma.flightLog.create({
      data: {
        aircraftId: aircraft[0].id,
        pilotId: users[0].id,
        instructorId: users[1].id,
        studentId: student.id,
        date: new Date('2024-02-15'),
        departureTime: new Date('2024-02-15T14:00:00Z'),
        arrivalTime: new Date('2024-02-15T15:45:00Z'),
        departureAirport: 'FACT',
        arrivalAirport: 'FADN',
        flightType: 'TRAINING',
        flightPurpose: 'Cross Country Navigation',
        totalTime: 1.75,
        dualReceived: 1.75,
        crossCountry: 1.75,
        landings: 2,
        remarks: 'Good navigation skills demonstrated',
        isCompleted: true,
      },
    }),
  ])

  console.log('✅ Flight logs created')

  // Create bookings
  await Promise.all([
    prisma.booking.create({
      data: {
        studentId: users[0].id,
        aircraftId: aircraft[0].id,
        date: new Date('2024-02-20'),
        startTime: new Date('2024-02-20T09:00:00Z'),
        endTime: new Date('2024-02-20T11:00:00Z'),
        type: 'LESSON',
        purpose: 'Cross Country Navigation',
        status: 'CONFIRMED',
        notes: 'Weather permitting',
      },
    }),
    prisma.booking.create({
      data: {
        studentId: users[0].id,
        aircraftId: aircraft[1].id,
        date: new Date('2024-02-22'),
        startTime: new Date('2024-02-22T14:00:00Z'),
        endTime: new Date('2024-02-22T16:00:00Z'),
        type: 'LESSON',
        purpose: 'Emergency Procedures',
        status: 'PENDING',
      },
    }),
  ])

  console.log('✅ Bookings created')

  // Create evaluations
  await prisma.evaluation.create({
    data: {
      studentId: student.id,
      instructorId: instructor.id,
      type: 'PROGRESS_CHECK',
      title: 'Pre-Flight Procedures Assessment',
      description: 'Comprehensive assessment of pre-flight procedures knowledge',
      date: new Date('2024-02-01'),
      score: 95,
      maxScore: 100,
      passed: true,
      notes: 'Excellent understanding and execution of all pre-flight procedures',
      skillAssessments: {
        create: [
          {
            skillName: 'Aircraft Inspection',
            skillArea: 'Pre-Flight',
            score: 95,
            maxScore: 100,
            comments: 'Thorough and systematic inspection',
          },
          {
            skillName: 'Documentation Check',
            skillArea: 'Pre-Flight',
            score: 98,
            maxScore: 100,
            comments: 'Excellent attention to detail',
          },
        ],
      },
    },
  })

  console.log('✅ Evaluations created')

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: users[0].id,
        title: 'Upcoming Lesson Reminder',
        message: 'You have a lesson scheduled for tomorrow at 09:00 with Captain Mitchell',
        type: 'BOOKING_REMINDER',
        isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: users[0].id,
        title: 'Medical Certificate Expiry',
        message: 'Your medical certificate expires in 4 months. Please schedule a renewal.',
        type: 'MEDICAL_EXPIRY',
        isRead: false,
      },
    }),
  ])

  console.log('✅ Notifications created')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
