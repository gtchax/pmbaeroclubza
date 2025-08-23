import { prisma } from "./prisma";

export interface ClerkEmailAddress {
  id: string;
  email_address: string;
  verification: { status: string };
}

export interface ClerkPhoneNumber {
  id: string;
  phone_number: string;
  verification: { status: string };
}

// TODO: Define proper permissions type

export interface ClerkUserData {
  id: string;
  email_addresses: Array<ClerkEmailAddress>;
  phone_numbers: Array<ClerkPhoneNumber>;
  first_name: string;
  last_name: string;
  image_url: string | null;
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  public_metadata: {
    userType?: string;
    userRole?: string;
    registrationStep?: string;
    registrationDate?: string;
    isActive?: boolean;
  };
  private_metadata: {
    registrationSource?: string;
    registrationFlow?: string;
  };
}

export interface ClerkEmailData {
  user_id: string;
  email_address: string;
}

export interface ClerkPhoneData {
  user_id: string;
  phone_number: string;
}

/**
 * Extract primary email from Clerk user data
 */
export function getPrimaryEmail(data: ClerkUserData): string | null {
  if (!data.primary_email_address_id) return null;

  const primaryEmail = data.email_addresses?.find(
    (email) => email.id === data.primary_email_address_id
  );
  return primaryEmail?.email_address || null;
}

/**
 * Extract primary phone from Clerk user data
 */
export function getPrimaryPhone(data: ClerkUserData): string | null {
  if (!data.primary_phone_number_id) return null;

  const primaryPhone = data.phone_numbers?.find(
    (phone) => phone.id === data.primary_phone_number_id
  );
  return primaryPhone?.phone_number || null;
}

/**
 * Create or update user in database
 */
export async function syncUserToDatabase(
  data: ClerkUserData,
  isUpdate: boolean = false
) {
  const email = getPrimaryEmail(data);
  const phone = getPrimaryPhone(data);

  if (!email) {
    throw new Error("No primary email found");
  }

  const userData = {
    email,
    firstName: data.first_name || "",
    lastName: data.last_name || "",
    phone,
    avatar: data.image_url || null,
    isActive: data.public_metadata?.isActive ?? true,
  };

  if (isUpdate) {
    return await prisma.user.update({
      where: { id: data.id },
      data: userData,
    });
  } else {
    return await prisma.user.create({
      data: {
        id: data.id,
        ...userData,
      },
    });
  }
}

/**
 * Get or create a role
 */
export async function getOrCreateRole(roleName: string) {
  let role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        name: roleName,
        description: `Default ${roleName.toLowerCase()} role`,
        permissions: {},
      },
    });
  }

  return role;
}

/**
 * Assign a role to a user
 */
export async function assignRoleToUser(userId: string, roleName: string) {
  const role = await getOrCreateRole(roleName);

  // Check if user already has this role
  const existingUserRole = await prisma.userRole.findFirst({
    where: {
      userId: userId,
      roleId: role.id,
    },
  });

  if (!existingUserRole) {
    await prisma.userRole.create({
      data: {
        userId: userId,
        roleId: role.id,
      },
    });
    console.log(`Role ${roleName} assigned to user: ${userId}`);
  }

  return role;
}

/**
 * Update user's role
 */
export async function updateUserRole(userId: string, roleName: string) {
  // Remove all existing roles for the user
  await prisma.userRole.deleteMany({
    where: { userId: userId },
  });

  // Assign the new role
  await assignRoleToUser(userId, roleName);
  console.log(`Role updated to ${roleName} for user: ${userId}`);
}

/**
 * Create a student profile
 */
export async function createStudentProfile(userId: string) {
  // Check if profile already exists
  const existingProfile = await prisma.student.findUnique({
    where: { userId: userId },
  });

  if (!existingProfile) {
    // Generate student number
    const studentCount = await prisma.student.count();
    const studentNumber = `STU${String(studentCount + 1).padStart(4, "0")}`;

    await prisma.student.create({
      data: {
        userId: userId,
        studentNumber: studentNumber,
        dateOfBirth: new Date("1990-01-01"), // Default date
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        totalFlightHours: 0,
        soloHours: 0,
        crossCountryHours: 0,
        nightHours: 0,
        instrumentHours: 0,
        medicalCert: null,
        medicalExpiry: null,
        licenseNumber: null,
        licenseType: null,
        licenseExpiry: null,
      },
    });
    console.log(`Student profile created for user: ${userId}`);
  }
}

/**
 * Create an instructor profile
 */
export async function createInstructorProfile(userId: string) {
  // Check if profile already exists
  const existingProfile = await prisma.instructor.findUnique({
    where: { userId: userId },
  });

  if (!existingProfile) {
    // Generate instructor number
    const instructorCount = await prisma.instructor.count();
    const instructorNumber = `INS${String(instructorCount + 1).padStart(4, "0")}`;

    await prisma.instructor.create({
      data: {
        userId: userId,
        instructorNumber: instructorNumber,
        licenseNumber: "",
        licenseType: "CFI",
        licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        medicalCert: "",
        medicalExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        totalFlightHours: 0,
        instructorHours: 0,
        specializations: [],
        isActive: true,
      },
    });
    console.log(`Instructor profile created for user: ${userId}`);
  }
}

/**
 * Handle user type changes and create appropriate profiles
 */
export async function handleUserTypeChange(
  userId: string,
  userType: string,
  userRole: string
) {
  // First, update the user's role
  await updateUserRole(userId, userRole);

  // Then create appropriate profiles based on user type and role
  switch (userType.toLowerCase()) {
    case "private":
      if (userRole === "STUDENT") {
        await createStudentProfile(userId);
      }
      break;
    case "commercial":
      if (userRole === "INSTRUCTOR") {
        await createInstructorProfile(userId);
      }
      break;
    default:
      // Default to student profile
      if (userRole === "STUDENT") {
        await createStudentProfile(userId);
      }
  }
}

/**
 * Validate webhook signature
 */
export async function validateWebhookSignature(
  body: string,
  headers: Record<string, string>,
  secret: string
): Promise<boolean> {
  try {
    // Dynamic import for svix to avoid require() issues
    const svix = await import("svix");
    const wh = new svix.Webhook(secret);

    wh.verify(body, {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"],
    });

    return true;
  } catch (error) {
    console.error("Webhook signature validation failed:", error);
    return false;
  }
}

/**
 * Log webhook event
 */
export function logWebhookEvent(
  eventType: string,
  userId: string,
  success: boolean,
  error?: unknown
) {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    eventType,
    userId,
    success,
    error: error instanceof Error ? error.message : error,
  };

  if (success) {
    console.log(
      `✅ Webhook ${eventType} successful for user ${userId} at ${timestamp}`
    );
  } else {
    console.error(
      `❌ Webhook ${eventType} failed for user ${userId} at ${timestamp}:`,
      error
    );
  }

  // You could also log to a file or external logging service here
  return logData;
}
