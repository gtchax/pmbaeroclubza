
import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#262626] mb-4">
              Analytics & Reporting
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Performance metrics, reporting, and data insights
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#262626] mb-6">
              Performance Analytics Dashboard
            </h2>
            <p className="text-gray-600">
              This page will contain performance metrics, reporting tools, and
              data visualization features.
            </p>
          </div>
        </div>
      </div>
    
  );
}
