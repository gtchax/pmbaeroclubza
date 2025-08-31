"use client";

import { motion } from "framer-motion";
import { ScheduleContent } from "../dashboard/components/ScheduleContent";

export default function SchedulePage() {
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Flight Schedule</h1>
          <p className="text-gray-300">
            Manage your training sessions and bookings
          </p>
        </div>
      </div>

      <ScheduleContent />
    </motion.div>
  );
}
