import { 
  User, Student, Instructor, Admin, Aircraft, FlightLog, 
  Course, Module, Lesson, Enrollment, ProgressRecord, 
  Evaluation, SkillAssessment, Booking, ScheduleSlot,
  Notification, Message, MaintenanceRecord, FuelRecord,
  FlightType, LessonType, EnrollmentStatus, ProgressStatus,
  EvaluationType, BookingType, BookingStatus, NotificationType,
  MessageType, MaintenanceType, UserApprovalStatus, UserPaymentStatus
} from '@prisma/client'

// Extended types with relations
export type UserWithProfile = User & {
  studentProfile?: Student | null
  instructorProfile?: Instructor | null
  adminProfile?: Admin | null
  roles: Array<{
    role: {
      name: string
      permissions: any
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

export type CourseWithModules = Course & {
  modules: Array<Module & {
    lessons: Lesson[]
  }>
  enrollments: Array<Enrollment & {
    student: Student & { user: User }
    instructor: Instructor & { user: User }
  }>
}

export type EvaluationWithDetails = Evaluation & {
  student: Student & { user: User }
  instructor: Instructor & { user: User }
  skillAssessments: SkillAssessment[]
}

export type BookingWithDetails = Booking & {
  student: User
  aircraft: Aircraft
  scheduleSlot?: ScheduleSlot | null
}

export type FlightLogWithDetails = FlightLog & {
  aircraft: Aircraft
  pilot: User
  instructor?: User | null
  student?: Student & { user: User } | null
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
  upcomingBookings: BookingWithDetails[]
  recentFlightLogs: FlightLogWithDetails[]
  currentEnrollments: Array<Enrollment & {
    course: Course
    instructor: Instructor & { user: User }
    progressRecords: ProgressRecord[]
  }>
  notifications: Notification[]
}

export interface InstructorDashboardData {
  profile: InstructorWithDetails
  upcomingBookings: BookingWithDetails[]
  recentFlightLogs: FlightLogWithDetails[]
  students: Array<Student & { 
    user: User
    enrollments: Array<Enrollment & { course: Course }>
  }>
  todaySchedule: Array<ScheduleSlot & {
    bookings: BookingWithDetails[]
  }>
  notifications: Notification[]
}

export interface AdminDashboardData {
  stats: DashboardStats
  recentBookings: BookingWithDetails[]
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

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface CreateBookingData {
  aircraftId: string
  instructorId?: string
  date: string
  startTime: string
  endTime: string
  type: BookingType
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
  type: EvaluationType
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
  FlightType, LessonType, EnrollmentStatus, ProgressStatus,
  EvaluationType, BookingType, BookingStatus, NotificationType,
  MessageType, MaintenanceType, UserApprovalStatus, UserPaymentStatus
}
