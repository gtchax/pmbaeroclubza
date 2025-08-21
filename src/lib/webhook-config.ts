export const WEBHOOK_CONFIG = {
  // Clerk webhook events to handle
  EVENTS: {
    USER_CREATED: "user.created",
    USER_UPDATED: "user.updated",
    USER_DELETED: "user.deleted",
    EMAIL_CREATED: "email_address.created",
    EMAIL_UPDATED: "email_address.updated",
    EMAIL_DELETED: "email_address.deleted",
    PHONE_CREATED: "phone_number.created",
    PHONE_UPDATED: "phone_number.updated",
    PHONE_DELETED: "phone_number.deleted",
  },

  // Default roles for new users
  DEFAULT_ROLES: {
    STUDENT: "STUDENT",
    INSTRUCTOR: "INSTRUCTOR",
    ADMIN: "ADMIN",
  },

  // User types from Clerk metadata
  USER_TYPES: {
    STUDENT: "student",
    INSTRUCTOR: "instructor",
    ADMIN: "admin",
  },

  // Profile creation settings
  PROFILES: {
    STUDENT: {
      DEFAULT_DATE_OF_BIRTH: "1990-01-01",
      DEFAULT_FLIGHT_HOURS: 0,
    },
    INSTRUCTOR: {
      DEFAULT_LICENSE_TYPE: "CFI",
      DEFAULT_LICENSE_EXPIRY_DAYS: 365,
      DEFAULT_MEDICAL_EXPIRY_DAYS: 365,
    },
  },

  // Number generation patterns
  NUMBER_PATTERNS: {
    STUDENT: "STU",
    INSTRUCTOR: "INS",
    ADMIN: "ADM",
  },

  // Webhook response messages
  MESSAGES: {
    SUCCESS: "Webhook processed successfully",
    INVALID_SIGNATURE: "Invalid webhook signature",
    MISSING_HEADERS: "Missing required webhook headers",
    USER_NOT_FOUND: "User not found in database",
    ROLE_ASSIGNED: "Role assigned successfully",
    PROFILE_CREATED: "Profile created successfully",
  },

  // Error codes
  ERROR_CODES: {
    INVALID_SIGNATURE: "INVALID_SIGNATURE",
    MISSING_HEADERS: "MISSING_HEADERS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    DATABASE_ERROR: "DATABASE_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
  },
};

export const ENV_VARS = {
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
  CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export const WEBHOOK_ENDPOINTS = {
  CLERK: "/api/webhooks/clerk",
  HEALTH: "/api/webhooks/health",
};

export const VALIDATION_RULES = {
  // Minimum required fields for user creation
  USER_CREATION: {
    REQUIRED_FIELDS: ["id", "email_addresses", "first_name", "last_name"],
    EMAIL_VERIFICATION: "verified",
    PHONE_VERIFICATION: "verified",
  },

  // Maximum lengths for various fields
  MAX_LENGTHS: {
    FIRST_NAME: 50,
    LAST_NAME: 50,
    PHONE: 20,
    ADDRESS: 200,
    LICENSE_NUMBER: 50,
    MEDICAL_CERT: 50,
  },

  // Date validation rules
  DATES: {
    MIN_AGE: 16, // Minimum age for student pilots
    MAX_AGE: 80, // Maximum age for pilots
    LICENSE_EXPIRY_WARNING_DAYS: 90, // Days before expiry to warn
    MEDICAL_EXPIRY_WARNING_DAYS: 90,
  },
};

export const LOGGING_CONFIG = {
  // Log levels
  LEVELS: {
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
  },

  // Log formats
  FORMATS: {
    TIMESTAMP: "YYYY-MM-DD HH:mm:ss",
    LOG_ENTRY: "[{timestamp}] {level}: {message}",
  },

  // Log destinations
  DESTINATIONS: {
    CONSOLE: "console",
    FILE: "file",
    EXTERNAL: "external",
  },
};

export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMITING: {
    MAX_REQUESTS_PER_MINUTE: 100,
    WINDOW_MS: 60000, // 1 minute
  },

  // Webhook verification
  VERIFICATION: {
    TIMESTAMP_TOLERANCE_MS: 300000, // 5 minutes
    REQUIRED_HEADERS: ["svix-id", "svix-timestamp", "svix-signature"],
  },

  // Database security
  DATABASE: {
    MAX_CONNECTIONS: 10,
    CONNECTION_TIMEOUT_MS: 30000,
    QUERY_TIMEOUT_MS: 10000,
  },
};
