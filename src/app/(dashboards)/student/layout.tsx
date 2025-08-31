"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Target,
  Calendar,
  FileText,
  Plane,
  BookOpen,
  Settings,
  Bell,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudentDashboard } from "@/lib/hooks/use-student-data";

const navigation = [
  { name: "Overview", href: "/student/dashboard", icon: GraduationCap },
  { name: "Training", href: "/student/training", icon: Target },
  { name: "Schedule", href: "/student/schedule", icon: Calendar },
  { name: "Logbook", href: "/student/logbook", icon: FileText },
  { name: "Aircraft", href: "/student/aircraft", icon: Plane },
  { name: "Resources", href: "/student/resources", icon: BookOpen },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const mockUserId = "user_123";
  const { data: dashboardData, isLoading } = useStudentDashboard(mockUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a]">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-black/80"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-[#262626] border-r border-[#f6d57f]">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#262626]" />
                </div>
                <span className="text-white font-semibold">Student</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-[#f6d57f] text-[#262626]"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        isActive ? "text-[#262626]" : "text-gray-400"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#262626] border-r border-[#f6d57f] px-6">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#262626]" />
              </div>
              <span className="text-white font-semibold">Student</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
                            isActive
                              ? "bg-[#f6d57f] text-[#262626]"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0",
                              isActive ? "text-[#262626]" : "text-gray-400"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#f6d57f] bg-[#262626] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-300 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {!isLoading &&
                  dashboardData?.notifications &&
                  dashboardData.notifications.length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {dashboardData.notifications.length}
                    </Badge>
                  )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
