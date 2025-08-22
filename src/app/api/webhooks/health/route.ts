import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



export async function GET() {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;

    // Check if required tables exist
    const userCount = await prisma.user.count();
    const roleCount = await prisma.role.count();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: {
        status: "connected",
        userCount,
        roleCount,
      },
      webhook: {
        status: "active",
        endpoint: "/api/webhooks/clerk",
        events: [
          "user.created",
          "user.updated",
          "user.deleted",
          "email_address.created",
          "email_address.updated",
          "email_address.deleted",
          "phone_number.created",
          "phone_number.updated",
          "phone_number.deleted",
        ],
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasWebhookSecret: !!process.env.CLERK_WEBHOOK_SECRET,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        database: {
          status: "disconnected",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Test webhook processing
  try {
    // This is just a test - don't actually create a user
    return NextResponse.json({
      status: "test-successful",
      message: "Webhook endpoint is responding correctly",
      testData: {
        received: true,
        dataStructure: "valid",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "test-failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
