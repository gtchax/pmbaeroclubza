import { Plane, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Plane */}
        <div className="relative mb-8">
          <div className="animate-bounce">
            <Plane className="h-20 w-20 text-blue-600 mx-auto transform rotate-45" />
          </div>
          <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Preparing for Takeoff
        </h2>
        <p className="text-gray-600 mb-8">
          Loading your aviation experience...
        </p>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
