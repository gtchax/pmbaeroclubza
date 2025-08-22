import { 
  User, Student, Instructor, Admin, Aircraft, FlightLog, 
  Course, Module, Lesson, Enrollment, ProgressRecord, 
  Evaluation, SkillAssessment, Booking, ScheduleSlot,
  Notification, Message, MaintenanceRecord, FuelRecord,
  FlightType, BookingStatus, MaintenanceType, UserApprovalStatus, UserPaymentStatus
} from '@prisma/client'

// Extended types with relations
export type UserWithProfile = User & {
  studentProfile?: Student | null
  instructorProfile?: Instructor | null
  adminProfile?: Admin | null
  roles: Array<{
    role: {
      name: string
      permissions: Record<string, unknown>
    }
  }>
}

export type StudentWithDetails = Student & {
  user: User
  enrollments: Array<Enrollment & {
    course: Course
    instructor: Instructor & { user: User }
  }>
  progressRecords: ProgressRecord[]
  evaluationsReceived: Evaluation[]
  flightLogs: Array<FlightLog & {
    aircraft: Aircraft
    instructor?: User | null
  }>
}

export type InstructorWithDetails = Instructor & {
  user: User
  enrollments: Array<Enrollment & {
    student: Student & { user: User }
    course: Course
  }>
  evaluationsGiven: Evaluation[]
  flightLogs: Array<FlightLog & {
    aircraft: Aircraft
    student?: Student & { user: User } | null
  }>
  scheduleSlots: ScheduleSlot[]
  aircraftCertifications: Array<{
    aircraft: Aircraft
  }>
}

export type AircraftWithDetails = Aircraft & {
  maintenanceRecords: MaintenanceRecord[]
  fuelRecords: FuelRecord[]
  flightLogs: Array<FlightLog & {
    pilot: User
    instructor?: User | null
  }>
  bookings: Array<Booking & {
    student: User
  }>
}

// Dashboard specific types
export interface DashboardStats {
  totalStudents: number
  activeStudents: number
  totalInstructors: number
  activeInstructors: number
  totalAircraft: number
  availableAircraft: number
  totalFlightHours: number
  upcomingBookings: number
}

export interface StudentDashboardData {
  profile: StudentWithDetails
  upcomingBookings: Array<Booking & {
    student: User
    aircraft: Aircraft
    scheduleSlot?: ScheduleSlot | null
  }>
  recentFlightLogs: Array<FlightLog & {
    aircraft: Aircraft
    pilot: User
    instructor?: User | null
    student?: Student & { user: User } | null
  }>
  currentEnrollments: Array<Enrollment & {
    course: Course
    instructor: Instructor & { user: User }
    progressRecords: ProgressRecord[]
  }>
  notifications: Notification[]
}

export interface InstructorDashboardData {
  profile: InstructorWithDetails
  upcomingBookings: Array<Booking & {
    student: User
    aircraft: Aircraft
    scheduleSlot?: ScheduleSlot | null
  }>
  recentFlightLogs: Array<FlightLog & {
    aircraft: Aircraft
    pilot: User
    instructor?: User | null
    student?: Student & { user: User } | null
  }>
  students: Array<Student & { 
    user: User
    enrollments: Array<Enrollment & { course: Course }>
  }>
  todaySchedule: Array<ScheduleSlot & {
    bookings: Array<Booking & {
      student: User
      aircraft: Aircraft
      scheduleSlot?: ScheduleSlot | null
    }>
  }>
  notifications: Notification[]
}

export interface AdminDashboardData {
  stats: DashboardStats
  recentBookings: Array<Booking & {
    student: User
    aircraft: Aircraft
    scheduleSlot?: ScheduleSlot | null
  }>
  maintenanceAlerts: Array<Aircraft & {
    maintenanceRecords: MaintenanceRecord[]
  }>
  expiringCertifications: Array<{
    type: 'instructor' | 'student'
    user: User
    expiry: Date
    certificationType: string
  }>
  notifications: Notification[]
}

// Form types
export interface CreateBookingData {
  aircraftId: string
  instructorId?: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  notes?: string
}

export interface UpdateFlightLogData {
  flightNumber?: string
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
}

export interface CreateEvaluationData {
  studentId: string
  title: string
  description?: string
  date: string
  score?: number
  maxScore?: number
  passed?: boolean
  notes?: string
  skillAssessments?: Array<{
    skillName: string
    skillArea: string
    score: number
    maxScore: number
    comments?: string
  }>
}

// Re-export Prisma types
export type {
  User, Student, Instructor, Admin, Aircraft, FlightLog,
  Course, Module, Lesson, Enrollment, ProgressRecord,
  Evaluation, SkillAssessment, Booking, ScheduleSlot,
  Notification, Message, MaintenanceRecord, FuelRecord,
  FlightType, BookingStatus, MaintenanceType, UserApprovalStatus, UserPaymentStatus
}
