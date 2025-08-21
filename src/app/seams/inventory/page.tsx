export default function InventoryPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#262626] mb-4">
              Inventory Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track parts, supplies, and automated ordering systems
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#262626] mb-6">
              Parts & Supplies Tracking
            </h2>
            <p className="text-gray-600">
              This page will contain inventory tracking, automated ordering, and
              supply management features.
            </p>
          </div>
        </div>
      </div>
  );
}
