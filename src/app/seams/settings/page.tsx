export default function SettingsPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#262626] mb-4">
              System Settings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Configure system preferences and user settings
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#262626] mb-6">
              Configuration & Preferences
            </h2>
            <p className="text-gray-600">
              This page will contain system configuration, user preferences, and
              administrative settings.
            </p>
          </div>
        </div>
      </div>
  );
}
