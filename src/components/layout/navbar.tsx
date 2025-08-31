"use client";
import React from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Bell, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigationItems } from "./sidebar";
import { useClerkRole } from "@/lib/hooks/use-clerk-role";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { metadata, dashboardUrl } = useClerkRole();

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentView = pathname.split("/").pop() as string;

  // Don't render authentication-dependent content until mounted
  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-[#262626]">
              {navigationItems.find((item) => item.id === currentView)?.label ||
                "Loading..."}
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Loading...
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </header>
    );
  }

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
          {mounted && isLoaded && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-50 hover:bg-gray-100"
                >
                  <User className="h-5 w-5 mr-2" />
                  {user.firstName ||
                    user.emailAddresses[0]?.emailAddress ||
                    "User"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border-gray-200 shadow-lg"
              >
                <DropdownMenuLabel className="text-gray-900 font-medium">
                  Welcome back!
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardUrl} className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    {metadata?.userRole === "STUDENT" && "Student Dashboard"}
                    {metadata?.userRole === "INSTRUCTOR" &&
                      "Instructor Dashboard"}
                    {metadata?.userRole === "ADMIN" && "Admin Dashboard"}
                    {metadata?.userRole === "SUPER_ADMIN" &&
                      "Super Admin Dashboard"}
                    {!metadata?.userRole && "Dashboard"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="bg-gray-50 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-2" />
              Guest
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
