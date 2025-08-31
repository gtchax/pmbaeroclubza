import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clerkUserId,
      userType,
      personalDetails,
      verificationData,
      documentsData,
    } = body;

    if (!clerkUserId || !userType || !personalDetails) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: clerkUserId, userType, personalDetails",
        },
        { status: 400 }
      );
    }

    // Create the user record with Clerk ID
    const user = await prisma.user.create({
      data: {
        id: clerkUserId, // Use Clerk user ID as the primary key
        email: personalDetails.email,
        firstName:
          userType === "private"
            ? personalDetails.firstName
            : personalDetails.contactPerson?.firstName || "",
        lastName:
          userType === "private"
            ? personalDetails.lastName
            : personalDetails.contactPerson?.lastName || "",
        phone: personalDetails.phone || null,
        isActive: true,
        isApproved: false,
        approvalStatus: "PENDING",
        paymentStatus: "UNPAID",
      },
    });

    // Create user role based on user type
    let roleId: string;
    if (userType === "private") {
      // Find or create STUDENT role
      const studentRole = await prisma.role.upsert({
        where: { name: "STUDENT" },
        update: {},
        create: {
          name: "STUDENT",
          description: "Student pilot",
          permissions: {},
        },
      });
      roleId = studentRole.id;
    } else {
      // Find or create INSTRUCTOR role
      const instructorRole = await prisma.role.upsert({
        where: { name: "INSTRUCTOR" },
        update: {},
        create: {
          name: "INSTRUCTOR",
          description: "Flight instructor",
          permissions: {},
        },
      });
      roleId = instructorRole.id;
    }

    // Assign role to user
    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: roleId,
      },
    });

    // Create profile based on user type
    if (userType === "private") {
      // Create student profile
      await prisma.student.create({
        data: {
          userId: user.id,
          studentNumber: `STU-${Date.now()}`, // Generate unique student number
          dateOfBirth: verificationData?.dateOfBirth
            ? new Date(verificationData.dateOfBirth)
            : new Date(),
          address: verificationData?.address || "",
          emergencyContactName: verificationData?.emergencyContactName || null,
          emergencyContactPhone:
            verificationData?.emergencyContactPhone || null,
          emergencyContactRelationship:
            verificationData?.emergencyContactRelationship || null,
          medicalCert: verificationData?.medicalCert || null,
          medicalExpiry: verificationData?.medicalExpiry
            ? new Date(verificationData.medicalExpiry)
            : null,
          licenseNumber: verificationData?.licenseNumber || null,
          licenseType: verificationData?.licenseType || null,
          totalFlightHours: 0,
          soloHours: 0,
          crossCountryHours: 0,
          instrumentHours: 0,
          nightHours: 0,
        },
      });
    } else {
      // Create instructor profile
      await prisma.instructor.create({
        data: {
          userId: user.id,
          instructorNumber: `INS-${Date.now()}`, // Generate unique instructor number
          licenseNumber: verificationData?.licenseNumber || "",
          licenseType: verificationData?.licenseType || "CFI",
          licenseExpiry: verificationData?.licenseExpiry
            ? new Date(verificationData.licenseExpiry)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default to 1 year from now
          medicalCert: verificationData?.medicalCert || "",
          medicalExpiry: verificationData?.medicalExpiry
            ? new Date(verificationData.medicalExpiry)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default to 1 year from now
          totalFlightHours: verificationData?.totalFlightHours || 0,
          instructorHours: verificationData?.instructorHours || 0,
          specializations: verificationData?.specializations || [],
          isActive: true,
        },
      });
    }

    // Save documents if provided
    // TODO: Implement document saving after Prisma client is properly generated
    // The documentsData now contains MEGA file information with IDs
    if (
      documentsData &&
      Array.isArray(documentsData) &&
      documentsData.length > 0
    ) {
      console.log(
        `Received ${documentsData.length} MEGA documents to save to database`
      );
      // Document saving logic will be implemented here once Prisma client is working
      // This will save the MEGA file IDs and metadata to the database
    }

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType,
      },
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
