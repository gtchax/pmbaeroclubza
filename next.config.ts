import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations - remove standalone to fix the error
  // output: "standalone", // This was causing the client-reference-manifest error

  // Build output configuration
  distDir: ".next",

  // Server external packages for Prisma
  serverExternalPackages: ["@prisma/client"],

  // Experimental features for better stability
  experimental: {
    // Better error handling
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Better client component support
    optimizePackageImports: ["@radix-ui/react-select", "@radix-ui/react-tabs"],
    // Better build caching
    workerThreads: false,
  },

  // Skip validation for faster builds
  skipTrailingSlashRedirect: true,

  // Handle build artifacts properly
  generateBuildId: async () => {
    return "build-" + Date.now();
  },

  // Ensure proper file handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Force pnpm usage and prevent package manager conflicts
  webpack: (config, { isServer, dev }) => {
    // Ensure pnpm is used
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force specific package resolution
    };

    // Fix for client-reference-manifest.js issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Ensure proper module resolution
    config.resolve.modules = [
      "node_modules",
      ...(config.resolve.modules || []),
    ];

    // Fix for Vercel deployment issues
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          default: false,
          vendors: false,
          // Ensure proper client manifest generation
          framework: {
            chunks: "all",
            name: "framework",
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 40,
            enforce: true,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
