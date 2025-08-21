#!/usr/bin/env node

/**
 * Test script for Clerk webhook integration
 * Run with: node scripts/test-webhook.js
 */

const https = require("https");
const http = require("http");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith("https://");
    const client = isHttps ? https : http;

    const req = client.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function testHealthEndpoint() {
  console.log("🏥 Testing health endpoint...");

  try {
    const response = await makeRequest(`${BASE_URL}/api/webhooks/health`);

    if (response.status === 200) {
      console.log("✅ Health check passed");
      console.log("📊 Status:", response.data.status);
      console.log("🗄️  Database:", response.data.database.status);
      console.log("👥 Users:", response.data.database.userCount);
      console.log("🎭 Roles:", response.data.database.roleCount);
    } else {
      console.log("❌ Health check failed");
      console.log("📊 Status:", response.status);
      console.log("📝 Response:", response.data);
    }
  } catch (error) {
    console.log("❌ Health check error:", error.message);
  }
}

async function testWebhookTestEndpoint() {
  console.log("\n🧪 Testing webhook test endpoint...");

  try {
    const response = await makeRequest(`${BASE_URL}/api/webhooks/health`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.status === 200) {
      console.log("✅ Webhook test passed");
      console.log("📝 Message:", response.data.message);
    } else {
      console.log("❌ Webhook test failed");
      console.log("📊 Status:", response.status);
      console.log("📝 Response:", response.data);
    }
  } catch (error) {
    console.log("❌ Webhook test error:", error.message);
  }
}

async function testClerkWebhookEndpoint() {
  console.log("\n🔗 Testing Clerk webhook endpoint...");

  try {
    // Test with invalid signature (should fail)
    const response = await makeRequest(`${BASE_URL}/api/webhooks/clerk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "svix-id": "test-id",
        "svix-timestamp": new Date().toISOString(),
        "svix-signature": "invalid-signature",
      },
      body: JSON.stringify({
        type: "user.created",
        data: {
          id: "test-user-id",
          email_addresses: [],
          first_name: "Test",
          last_name: "User",
        },
      }),
    });

    if (response.status === 400) {
      console.log(
        "✅ Webhook signature validation working (rejected invalid signature)"
      );
    } else {
      console.log("⚠️  Unexpected response from webhook endpoint");
      console.log("📊 Status:", response.status);
      console.log("📝 Response:", response.data);
    }
  } catch (error) {
    console.log("❌ Webhook endpoint test error:", error.message);
  }
}

async function checkEnvironmentVariables() {
  console.log("\n🔐 Checking environment variables...");

  const requiredVars = [
    "CLERK_WEBHOOK_SECRET",
    "DATABASE_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  ];

  const missingVars = [];

  for (const varName of requiredVars) {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Set`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.log(
      "\n⚠️  Missing environment variables. Please check your .env.local file."
    );
    console.log("Required variables:", missingVars.join(", "));
  } else {
    console.log("\n✅ All required environment variables are set");
  }
}

async function runTests() {
  console.log("🚀 Starting webhook integration tests...\n");

  await checkEnvironmentVariables();
  await testHealthEndpoint();
  await testWebhookTestEndpoint();
  await testClerkWebhookEndpoint();

  console.log("\n✨ Tests completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Set up your Clerk webhook endpoint in the dashboard");
  console.log("2. Configure the webhook secret in your environment");
  console.log("3. Test with real webhook events from Clerk");
  console.log("4. Monitor the logs for successful user synchronization");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthEndpoint,
  testWebhookTestEndpoint,
  testClerkWebhookEndpoint,
  checkEnvironmentVariables,
  runTests,
};
