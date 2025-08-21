'use client'
import React from "react";
import { Button } from "../ui/button";
import { Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigationItems } from "./sidebar";

const Navbar = () => {
  const pathname = usePathname();

  const currentView = pathname.split("/").pop() as string;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-[#262626]">
            {navigationItems.find((item) => item.id === currentView)?.label}
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {
              navigationItems.find((item) => item.id === currentView)
                ?.description
            }
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-2 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">System Online</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              3
            </span>
          </Button>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-50 hover:bg-gray-100"
          >
            <User className="h-5 w-5 mr-2" />
            Admin
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
