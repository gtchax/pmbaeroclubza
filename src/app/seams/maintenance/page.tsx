export default function MaintenancePage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#262626] mb-4">
              Maintenance Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track maintenance, work orders, and compliance requirements
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#262626] mb-6">
              Maintenance Tracking System
            </h2>
            <p className="text-gray-600">
              This page will contain maintenance scheduling, work orders, and
              compliance tracking features.
            </p>
          </div>
        </div>
      </div>
  );
}
