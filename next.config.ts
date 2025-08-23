import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations - remove standalone to fix the error
  // output: "standalone", // This was causing the client-reference-manifest error

  // Server external packages for Prisma
  serverExternalPackages: ["@prisma/client"],

  // Experimental features for better stability
  experimental: {
    // Better error handling
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Handle build artifacts properly
  generateBuildId: async () => {
    return "build-" + Date.now();
  },

  // Ensure proper file handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
