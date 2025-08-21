// Core SEAMS Types and Interfaces

// Flight Operations
export interface Flight {
  id: string;
  flightNumber: string;
  aircraftId: string;
  pilotId: string;
  coPilotId?: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  status: FlightStatus;
  flightType: FlightType;
  purpose: FlightPurpose;
  passengers: number;
  cargo: number;
  fuelRequired: number;
  weatherConditions: WeatherConditions;
  notams: NOTAM[];
  flightLog: FlightLogEntry[];
  maintenanceChecks: MaintenanceCheck[];
  createdAt: Date;
  updatedAt: Date;
}

export enum FlightStatus {
  SCHEDULED = "scheduled",
  BOARDING = "boarding",
  DEPARTED = "departed",
  IN_FLIGHT = "in_flight",
  ARRIVED = "arrived",
  CANCELLED = "cancelled",
  DELAYED = "delayed",
  DIVERTED = "diverted",
}

export enum FlightType {
  TRAINING = "training",
  CHARTER = "charter",
  MAINTENANCE = "maintenance",
  FERRY = "ferry",
  TEST = "test",
}

export enum FlightPurpose {
  STUDENT_TRAINING = "student_training",
  INSTRUMENT_RATING = "instrument_rating",
  NIGHT_RATING = "night_rating",
  COMMERCIAL_TRAINING = "commercial_training",
  RECREATIONAL = "recreational",
  BUSINESS = "business",
}

// Aircraft Management
export interface Aircraft {
  id: string;
  registration: string;
  type: string;
  model: string;
  manufacturer: string;
  yearManufactured: number;
  totalFlightHours: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: AircraftStatus;
  fuelCapacity: number;
  currentFuel: number;
  maintenanceHistory: MaintenanceRecord[];
  flightHistory: Flight[];
  sensors: AircraftSensor[];
  documents: AircraftDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export enum AircraftStatus {
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
  OUT_OF_SERVICE = "out_of_service",
  RETIRED = "retired",
}

// Maintenance System
export interface MaintenanceRecord {
  id: string;
  aircraftId: string;
  type: MaintenanceType;
  description: string;
  technicianId: string;
  startDate: Date;
  completionDate?: Date;
  status: MaintenanceStatus;
  workOrder: WorkOrder;
  partsUsed: PartUsage[];
  laborHours: number;
  cost: number;
  complianceLogs: ComplianceLog[];
  createdAt: Date;
  updatedAt: Date;
}

export enum MaintenanceType {
  PREVENTIVE = "preventive",
  CORRECTIVE = "corrective",
  INSPECTION = "inspection",
  OVERHAUL = "overhaul",
  MODIFICATION = "modification",
}

export enum MaintenanceStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  ON_HOLD = "on_hold",
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignedTo: string;
  dueDate: Date;
  estimatedHours: number;
  actualHours?: number;
  status: WorkOrderStatus;
  checklist: MaintenanceChecklist[];
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum WorkOrderStatus {
  OPEN = "open",
  ASSIGNED = "assigned",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  COMPLETED = "completed",
  CLOSED = "closed",
}

// Fuel Management
export interface FuelRecord {
  id: string;
  aircraftId: string;
  fuelType: FuelType;
  quantity: number;
  cost: number;
  supplier: string;
  date: Date;
  flightId?: string;
  location: string;
  technicianId: string;
  notes?: string;
  createdAt: Date;
}

export enum FuelType {
  AVGAS_100LL = "avgas_100ll",
  JET_A = "jet_a",
  JET_A1 = "jet_a1",
}

// Inventory Management
export interface Part {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: PartCategory;
  manufacturer: string;
  supplier: string;
  unitCost: number;
  currentStock: number;
  minimumStock: number;
  location: string;
  shelfLife?: number;
  lastRestocked: Date;
  nextRestockDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum PartCategory {
  ENGINE = "engine",
  AIRFRAME = "airframe",
  AVIONICS = "avionics",
  LANDING_GEAR = "landing_gear",
  ELECTRICAL = "electrical",
  HYDRAULIC = "hydraulic",
  CONSUMABLES = "consumables",
}

export interface PartUsage {
  partId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  maintenanceRecordId: string;
  dateUsed: Date;
}

// Crew Management
export interface CrewMember {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: CrewRole;
  qualifications: Qualification[];
  certifications: Certification[];
  flightHours: FlightHours;
  schedule: Schedule;
  fatigueStatus: FatigueStatus;
  payrollInfo: PayrollInfo;
  createdAt: Date;
  updatedAt: Date;
}

export enum CrewRole {
  PILOT = "pilot",
  CO_PILOT = "co_pilot",
  FLIGHT_INSTRUCTOR = "flight_instructor",
  MECHANIC = "mechanic",
  DISPATCHER = "dispatcher",
  ADMINISTRATOR = "administrator",
}

export interface Qualification {
  id: string;
  type: string;
  level: string;
  issueDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  certificateNumber: string;
  status: QualificationStatus;
}

export enum QualificationStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  SUSPENDED = "suspended",
  REVOKED = "revoked",
}

export interface FlightHours {
  total: number;
  pic: number;
  crossCountry: number;
  night: number;
  instrument: number;
  lastUpdated: Date;
}

export interface Schedule {
  id: string;
  crewMemberId: string;
  weekStarting: Date;
  shifts: Shift[];
  restPeriods: RestPeriod[];
  overtime: number;
  createdAt: Date;
}

export interface Shift {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: ShiftType;
  flightIds: string[];
  breaks: Break[];
}

export enum ShiftType {
  DAY = "day",
  NIGHT = "night",
  SPLIT = "split",
  ON_CALL = "on_call",
}

export interface Break {
  startTime: string;
  endTime: string;
  duration: number;
}

export interface RestPeriod {
  startTime: string;
  endTime: string;
  duration: number;
  type: RestType;
}

export enum RestType {
  DAILY = "daily",
  WEEKLY = "weekly",
  EXTENDED = "extended",
}

export enum FatigueStatus {
  ALERT = "alert",
  CAUTION = "caution",
  WARNING = "warning",
  CRITICAL = "critical",
}

// Safety & Compliance
export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: Severity;
  aircraftId?: string;
  flightId?: string;
  crewMembers: string[];
  date: Date;
  location: string;
  weatherConditions: WeatherConditions;
  investigationStatus: InvestigationStatus;
  findings: string[];
  recommendations: string[];
  correctiveActions: CorrectiveAction[];
  attachments: string[];
  reportedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum IncidentType {
  ACCIDENT = "accident",
  INCIDENT = "incident",
  NEAR_MISS = "near_miss",
  VIOLATION = "violation",
  SAFETY_REPORT = "safety_report",
}

export enum Severity {
  MINOR = "minor",
  MODERATE = "moderate",
  MAJOR = "major",
  CRITICAL = "critical",
}

export enum InvestigationStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CLOSED = "closed",
}

export interface CorrectiveAction {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  status: ActionStatus;
  completionDate?: Date;
  verification: string;
}

export enum ActionStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  VERIFIED = "verified",
  OVERDUE = "overdue",
}

// Weather & NOTAMs
export interface WeatherConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  ceiling: number;
  precipitation: string;
  conditions: string;
  forecast: WeatherForecast[];
  lastUpdated: Date;
}

export interface WeatherForecast {
  time: Date;
  temperature: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  ceiling: number;
  conditions: string;
}

export interface NOTAM {
  id: string;
  number: string;
  type: NOTAMType;
  title: string;
  description: string;
  affectedAirports: string[];
  startDate: Date;
  endDate: Date;
  priority: NOTAMPriority;
  status: NOTAMStatus;
  source: string;
  createdAt: Date;
}

export enum NOTAMType {
  AIRSPACE = "airspace",
  NAVIGATION = "navigation",
  OBSTACLE = "obstacle",
  RUNWAY = "runway",
  TAXIWAY = "taxiway",
  FACILITY = "facility",
}

export enum NOTAMPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum NOTAMStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

// IoT Sensors
export interface AircraftSensor {
  id: string;
  aircraftId: string;
  type: SensorType;
  location: string;
  currentValue: number;
  unit: string;
  threshold: SensorThreshold;
  status: SensorStatus;
  lastReading: Date;
  calibrationDate: Date;
  nextCalibration: Date;
  createdAt: Date;
}

export enum SensorType {
  ENGINE_TEMP = "engine_temperature",
  OIL_PRESSURE = "oil_pressure",
  FUEL_LEVEL = "fuel_level",
  TIRE_PRESSURE = "tire_pressure",
  BATTERY_VOLTAGE = "battery_voltage",
  ALTITUDE = "altitude",
  AIRSPEED = "airspeed",
}

export interface SensorThreshold {
  min: number;
  max: number;
  warning: number;
  critical: number;
}

export enum SensorStatus {
  NORMAL = "normal",
  WARNING = "warning",
  CRITICAL = "critical",
  OFFLINE = "offline",
}

// Analytics & Reporting
export interface AnalyticsData {
  id: string;
  type: AnalyticsType;
  data: Record<string, unknown>;
  period: string;
  date: Date;
  createdAt: Date;
}

export enum AnalyticsType {
  FLIGHT_PERFORMANCE = "flight_performance",
  MAINTENANCE_COSTS = "maintenance_costs",
  FUEL_CONSUMPTION = "fuel_consumption",
  SAFETY_METRICS = "safety_metrics",
  CREW_UTILIZATION = "crew_utilization",
  AIRCRAFT_UTILIZATION = "aircraft_utilization",
}

// Payroll Integration
export interface PayrollInfo {
  crewMemberId: string;
  baseSalary: number;
  hourlyRate: number;
  overtimeRate: number;
  flightPay: number;
  deductions: Deduction[];
  benefits: Benefit[];
  lastPayDate: Date;
  nextPayDate: Date;
}

export interface Deduction {
  type: string;
  amount: number;
  description: string;
}

export interface Benefit {
  type: string;
  value: number;
  description: string;
}

// Flight Log
export interface FlightLogEntry {
  id: string;
  flightId: string;
  timestamp: Date;
  event: string;
  details: string;
  location?: string;
  altitude?: number;
  airspeed?: number;
  fuelRemaining?: number;
  weatherConditions?: WeatherConditions;
  notes?: string;
  createdBy: string;
}

// Maintenance Checklist
export interface MaintenanceChecklist {
  id: string;
  title: string;
  items: ChecklistItem[];
  status: ChecklistStatus;
  completedBy?: string;
  completedAt?: Date;
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: Date;
  notes?: string;
}

export enum ChecklistStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  VERIFIED = "verified",
}

// Compliance Logs
export interface ComplianceLog {
  id: string;
  type: ComplianceType;
  description: string;
  regulation: string;
  requirement: string;
  status: ComplianceStatus;
  dueDate: Date;
  completionDate?: Date;
  evidence: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ComplianceType {
  FAA = "faa",
  EASA = "easa",
  ICAO = "icao",
  LOCAL = "local",
}

export enum ComplianceStatus {
  COMPLIANT = "compliant",
  NON_COMPLIANT = "non_compliant",
  PENDING = "pending",
  OVERDUE = "overdue",
}

// Aircraft Documents
export interface AircraftDocument {
  id: string;
  aircraftId: string;
  type: DocumentType;
  title: string;
  description: string;
  fileUrl: string;
  issueDate: Date;
  expiryDate?: Date;
  status: DocumentStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum DocumentType {
  AIRWORTHINESS = "airworthiness",
  REGISTRATION = "registration",
  INSURANCE = "insurance",
  MAINTENANCE_MANUAL = "maintenance_manual",
  FLIGHT_MANUAL = "flight_manual",
  WEIGHT_BALANCE = "weight_balance",
}

export enum DocumentStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PENDING = "pending",
  ARCHIVED = "archived",
}

// Certification
export interface Certification {
  id: string;
  crewMemberId: string;
  type: string;
  level: string;
  issueDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  certificateNumber: string;
  status: CertificationStatus;
  restrictions?: string[];
  endorsements: Endorsement[];
}

export enum CertificationStatus {
  VALID = "valid",
  EXPIRED = "expired",
  SUSPENDED = "suspended",
  REVOKED = "revoked",
}

export interface Endorsement {
  type: string;
  date: Date;
  instructor: string;
  notes?: string;
}

// Maintenance Check
export interface MaintenanceCheck {
  id: string;
  type: MaintenanceCheckType;
  description: string;
  interval: number;
  lastCompleted?: Date;
  nextDue: Date;
  status: MaintenanceCheckStatus;
  checklist: MaintenanceChecklist;
  aircraftId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum MaintenanceCheckType {
  PRE_FLIGHT = "pre_flight",
  POST_FLIGHT = "post_flight",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  ANNUAL = "annual",
  HOUR_BASED = "hour_based",
}

export enum MaintenanceCheckStatus {
  DUE = "due",
  OVERDUE = "overdue",
  COMPLETED = "completed",
  SCHEDULED = "scheduled",
}
