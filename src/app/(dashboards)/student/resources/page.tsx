"use client";

import { motion } from "framer-motion";
import { ResourcesContent } from "../dashboard/components/ResourcesContent";

export default function ResourcesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-[#f6d57f] rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#262626]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Learning Resources</h1>
          <p className="text-gray-300">
            Access training materials and documentation
          </p>
        </div>
      </div>

      <ResourcesContent />
    </motion.div>
  );
}
