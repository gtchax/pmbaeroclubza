"use client";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Plane,
  Wrench,
  Fuel,
  Users,
  AlertTriangle,
  TrendingUp,
  Settings,
  // Bell,
  User,
  Shield,
  Database,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SEAMSNavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  href: string;
}

export const navigationItems: SEAMSNavigationItem[] = [
  {
    id: "seams",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview and key metrics",
    color: "text-blue-600",
    href: "/seams",
  },
  {
    id: "flights",
    label: "Flight Operations",
    icon: Plane,
    description: "Scheduling, dispatch, and management",
    color: "text-[#f6d57f]",
    href: "/seams/flights",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: Wrench,
    description: "Work orders, tracking, and compliance",
    color: "text-orange-600",
    href: "/seams/maintenance",
  },
  {
    id: "crew",
    label: "Crew Management",
    icon: Users,
    description: "Scheduling, qualifications, and payroll",
    color: "text-purple-600",
    href: "/seams/crew",
  },
  {
    id: "safety",
    label: "Safety & Compliance",
    icon: Shield,
    description: "Incidents, audits, and regulatory compliance",
    color: "text-red-600",
    href: "/seams/safety",
  },
  {
    id: "fuel",
    label: "Fuel Management",
    icon: Fuel,
    description: "Consumption, analytics, and optimization",
    color: "text-green-600",
    href: "/seams/fuel",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Database,
    description: "Parts, supplies, and automated ordering",
    color: "text-indigo-600",
    href: "/seams/inventory",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    description: "Performance metrics and reporting",
    color: "text-emerald-600",
    href: "/seams/analytics",
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: AlertTriangle,
    description: "FAA, EASA, and ICAO compliance tracking",
    color: "text-amber-600",
    href: "/seams/compliance",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "System configuration and preferences",
    color: "text-gray-600",
    href: "/seams/settings",
  },
];

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const currentView = pathname.split("/").pop() as string;

  return (
    <div className="flex flex-col shadow-2xl z-50 bg-[#1a1a1a] text-white ">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-[#1a1a1a] text-white ">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="h-7 w-7 text-[#262626]" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="font-bold text-xl text-white">SEAMS</h1>
              <p className="text-xs text-gray-300">PMB Aero Club</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <div key={item.id}>
            <Link href={item.href}>
              <div
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  currentView === item.id
                    ? "bg-gradient-to-r from-[#f6d57f] to-[#f4d06a] text-[#262626] shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentView === item.id ? "bg-[#262626]/20" : "bg-gray-800"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 ${currentView === item.id ? "text-[#262626]" : item.color}`}
                  />
                </div>
                {!sidebarCollapsed && (
                  <div className="text-left flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@pmbaeroclub.co.za</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
