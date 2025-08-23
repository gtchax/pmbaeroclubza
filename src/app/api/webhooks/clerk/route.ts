/* eslint-disable @typescript-eslint/no-explicit-any */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

// Using official Clerk types for webhook data

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = payload;

  // Create a new Svix instance with your secret.
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not configured");
    return new Response("Webhook secret not configured", {
      status: 500,
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred during verification", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook ${eventType} received for user ${id}`);

  try {
    switch (eventType) {
      case "user.created":
        await handleUserCreated(evt.data);
        break;
      case "user.updated":
        await handleUserUpdated(evt.data);
        break;
      case "user.deleted":
        await handleUserDeleted(evt.data);
        break;
      case "email.created":
        await handleEmailCreated(evt.data);
        break;
      case "sms.created":
        await handlePhoneCreated(evt.data);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({
      success: true,
      event: eventType,
      userId: evt.data.id,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function handleUserCreated(data: any) {
  try {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      phone_numbers,
      image_url,
      public_metadata,
    } = data;

    // Get primary email
    const primaryEmail = email_addresses?.find(
      (email: any) => email.id === data.primary_email_address_id
    );
    const email = primaryEmail?.email_address;

    if (!email) {
      throw new Error("No primary email found");
    }

    // Get primary phone
    const primaryPhone = phone_numbers?.find(
      (phone: any) => phone.id === data.primary_phone_number_id
    );
    const phone = primaryPhone?.phone_number;

    // Create user in database
    const user = await prisma.user.create({
      data: {
        id: id, // Use Clerk's user ID
        email: email,
        firstName: first_name || "",
        lastName: last_name || "",
        phone: phone || null,
        avatar: image_url || null,
        isActive: true,
      },
    });

    console.log(`User created in database: ${user.id}`);

    // Extract role information from public metadata
    const userRole = public_metadata?.userRole || "STUDENT";
    const userType = public_metadata?.userType || "private";

    // Create default role for new users
    await createDefaultRole(user.id, userRole);

    // Create appropriate profile based on user type and role
    if (userType === "private" || userRole === "STUDENT") {
      await createStudentProfile(user.id);
    }

    if (userType === "commercial" || userRole === "INSTRUCTOR") {
      await createInstructorProfile(user.id);
    }

    // If user has ADMIN role, create admin profile
    if (userRole === "ADMIN") {
      // You can implement admin profile creation here if needed
      console.log(`Admin user created: ${user.id}`);
    }

    console.log(`User ${user.id} setup completed with role: ${userRole}`);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function handleUserUpdated(data: any) {
  try {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      phone_numbers,
      image_url,
      public_metadata,
    } = data;

    // Get primary email
    const primaryEmail = email_addresses?.find(
      (email: any) => email.id === data.primary_email_address_id
    );
    const email = primaryEmail?.email_address;

    if (!email) {
      throw new Error("No primary email found");
    }

    // Get primary phone
    const primaryPhone = phone_numbers?.find(
      (phone: any) => phone.id === data.primary_phone_number_id
    );
    const phone = primaryPhone?.phone_number;

    // Update user in database
    await prisma.user.update({
      where: { id },
      data: {
        email: email,
        firstName: first_name || "",
        lastName: last_name || "",
        phone: phone || null,
        avatar: image_url || null,
        updatedAt: new Date(),
      },
    });

    console.log(`User updated in database: ${id}`);

    // Update user role if it changed
    if (public_metadata?.userRole) {
      await updateUserRole(id, public_metadata.userRole);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function handleUserDeleted(data: any) {
  try {
    const { id } = data;

    // Delete user from database
    await prisma.user.delete({
      where: { id },
    });

    console.log(`User deleted from database: ${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

async function handleEmailCreated(data: any) {
  try {
    const { user_id, email_address } = data;

    // Update user's email if this is the primary email
    await prisma.user.update({
      where: { id: user_id },
      data: { email: email_address },
    });

    console.log(`Email created for user: ${user_id}`);
  } catch (error) {
    console.error("Error handling email created:", error);
  }
}

async function handlePhoneCreated(data: any) {
  try {
    const { user_id, phone_number } = data;

    // Update user's phone
    await prisma.user.update({
      where: { id: user_id },
      data: { phone: phone_number },
    });

    console.log(`Phone created for user: ${user_id}`);
  } catch (error) {
    console.error("Error handling phone created:", error);
  }
}

async function createDefaultRole(userId: string, roleName: string) {
  try {
    // Check if role already exists
    let role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    // Create role if it doesn't exist
    if (!role) {
      role = await prisma.role.create({
        data: {
          name: roleName,
          description: `Default ${roleName.toLowerCase()} role`,
          permissions: {}, // Empty permissions object
        },
      });
      console.log(`Role ${roleName} created`);
    }

    // Check if user already has this role
    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        userId: userId,
        roleId: role.id,
      },
    });

    if (!existingUserRole) {
      // Assign role to user
      await prisma.userRole.create({
        data: {
          userId: userId,
          roleId: role.id,
        },
      });
      console.log(`Default role ${roleName} assigned to user: ${userId}`);
    }
  } catch (error) {
    console.error("Error creating default role:", error);
    throw error;
  }
}

async function updateUserRole(userId: string, roleName: string) {
  try {
    // Find the role
    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      console.error(`Role ${roleName} not found`);
      return;
    }

    // Remove all existing roles for the user
    await prisma.userRole.deleteMany({
      where: { userId: userId },
    });

    // Assign the new role
    await prisma.userRole.create({
      data: {
        userId: userId,
        roleId: role.id,
      },
    });

    console.log(`Role updated to ${roleName} for user: ${userId}`);
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

async function createStudentProfile(userId: string) {
  try {
    // Check if student profile already exists
    const existingProfile = await prisma.student.findUnique({
      where: { userId: userId },
    });

    if (!existingProfile) {
      // Generate student number
      const studentCount = await prisma.student.count();
      const studentNumber = `STU${String(studentCount + 1).padStart(4, "0")}`;

      // Create student profile
      await prisma.student.create({
        data: {
          userId: userId,
          studentNumber: studentNumber,
          dateOfBirth: new Date("1990-01-01"), // Default date, should be updated
          address: "", // Should be filled by user
          emergencyContactName: "", // Should be filled by user
          emergencyContactPhone: "", // Should be filled by user
          emergencyContactRelationship: "", // Should be filled by user
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
  } catch (error) {
    console.error("Error creating student profile:", error);
    throw error;
  }
}

async function createInstructorProfile(userId: string) {
  try {
    // Check if instructor profile already exists
    const existingProfile = await prisma.instructor.findUnique({
      where: { userId: userId },
    });

    if (!existingProfile) {
      // Generate instructor number
      const instructorCount = await prisma.instructor.count();
      const instructorNumber = `INS${String(instructorCount + 1).padStart(4, "0")}`;

      // Create instructor profile
      await prisma.instructor.create({
        data: {
          userId: userId,
          instructorNumber: instructorNumber,
          licenseNumber: "", // Should be filled by user
          licenseType: "CFI", // Default type
          licenseExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          medicalCert: "", // Should be filled by user
          medicalExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          totalFlightHours: 0,
          instructorHours: 0,
          specializations: [], // Empty array, should be filled by user
          isActive: true,
        },
      });
      console.log(`Instructor profile created for user: ${userId}`);
    }
  } catch (error) {
    console.error("Error creating instructor profile:", error);
    throw error;
  }
}
