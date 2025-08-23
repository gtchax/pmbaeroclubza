import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  output: "standalone",

  // Experimental features for better stability
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: ["@prisma/client"],
    // Better error handling
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Build optimizations
  swcMinify: true,

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
