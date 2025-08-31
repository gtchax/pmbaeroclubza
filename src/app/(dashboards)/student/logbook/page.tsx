"use client";

import { motion } from "framer-motion";
import { LogbookContent } from "../dashboard/components/LogbookContent";

export default function LogbookPage() {
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Flight Logbook</h1>
          <p className="text-gray-300">Record and track your flight hours</p>
        </div>
      </div>

      <LogbookContent />
    </motion.div>
  );
}
