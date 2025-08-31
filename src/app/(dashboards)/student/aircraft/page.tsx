"use client";

import { motion } from "framer-motion";
import { AircraftContent } from "../dashboard/components/AircraftContent";

export default function AircraftPage() {
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Aircraft Fleet</h1>
          <p className="text-gray-300">Explore available training aircraft</p>
        </div>
      </div>

      <AircraftContent />
    </motion.div>
  );
}
