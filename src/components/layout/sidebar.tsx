"use client";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Plane,
  Users,
  Settings,
  // Bell,
  User,
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useCurrentUser } from "@/lib/hooks/use-user-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    href: "/seams/admin",
  },
  {
    id: "student",
    label: "Student Management",
    icon: Users,
    description: "Registration, accounts, and management",
    color: "text-purple-600",
    href: "/seams/students",
  },
  {
    id: "flights",
    label: "Flight Operations",
    icon: Plane,
    description: "Scheduling, dispatch, and management",
    color: "text-[#f6d57f]",
    href: "/seams/flights",
  },

  // {
  //   id: "maintenance",
  //   label: "Maintenance",
  //   icon: Wrench,
  //   description: "Work orders, tracking, and compliance",
  //   color: "text-orange-600",
  //   href: "/seams/maintenance",
  // },
  // {
  //   id: "crew",
  //   label: "Crew Management",
  //   icon: Users,
  //   description: "Scheduling, qualifications, and payroll",
  //   color: "text-purple-600",
  //   href: "/seams/crew",
  // },
  // {
  //   id: "safety",
  //   label: "Safety & Compliance",
  //   icon: Shield,
  //   description: "Incidents, audits, and regulatory compliance",
  //   color: "text-red-600",
  //   href: "/seams/safety",
  // },
  // {
  //   id: "fuel",
  //   label: "Fuel Management",
  //   icon: Fuel,
  //   description: "Consumption, analytics, and optimization",
  //   color: "text-green-600",
  //   href: "/seams/fuel",
  // },
  // {
  //   id: "inventory",
  //   label: "Inventory",
  //   icon: Database,
  //   description: "Parts, supplies, and automated ordering",
  //   color: "text-indigo-600",
  //   href: "/seams/inventory",
  // },
  // {
  //   id: "analytics",
  //   label: "Analytics",
  //   icon: TrendingUp,
  //   description: "Performance metrics and reporting",
  //   color: "text-emerald-600",
  //   href: "/seams/analytics",
  // },
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
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { data: userData, isLoading: isLoadingUserData } = useCurrentUser(
    user?.id || ""
  );

  const currentView = pathname.split("/").pop() as string;

  // Get user display information
  const getUserDisplayInfo = () => {
    if (!isLoaded || !user) {
      return {
        name: "Loading...",
        email: "Loading...",
        role: "User",
        initials: "L",
      };
    }

    if (isLoadingUserData || !userData) {
      const firstName = user.firstName || "User";
      const lastName = user.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim() || "Admin User";
      const initials =
        `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "A";

      return {
        name: fullName,
        email: user.primaryEmailAddress?.emailAddress || "No email",
        role: "Admin",
        initials,
      };
    }

    // Use database user data if available
    const roles = userData.roles?.map((ur) => ur.role.name) || [];
    const role = roles.includes("SUPER_ADMIN")
      ? "Super Admin"
      : roles.includes("ADMIN")
        ? "Admin"
        : roles.includes("MANAGER")
          ? "Manager"
          : "User";

    const fullName =
      `${userData.firstName} ${userData.lastName}`.trim() || "Admin User";
    const initials =
      `${userData.firstName?.charAt(0) || "A"}${userData.lastName?.charAt(0) || ""}`.toUpperCase();

    return {
      name: fullName,
      email:
        userData.email || user.primaryEmailAddress?.emailAddress || "No email",
      role: role,
      initials,
    };
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/seams/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userInfo = getUserDisplayInfo();

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
        {navigationItems.map((item) => (
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
          {!sidebarCollapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-2 h-auto hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.imageUrl} alt={userInfo.name} />
                      <AvatarFallback className="bg-[#f6d57f] text-[#262626] text-xs font-medium">
                        {userInfo.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {userInfo.name}
                      </p>
                      <p className="text-xs text-[#f6d57f] font-medium truncate">
                        {userInfo.role}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#262626] border-[#f6d57f] text-white"
                align="end"
                alignOffset={11}
                forceMount
              >
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userInfo.name}
                    </p>
                    <p className="text-xs leading-none text-gray-400">
                      {userInfo.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem
                  className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-gray-800"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.imageUrl} alt={userInfo.name} />
                    <AvatarFallback className="bg-[#f6d57f] text-[#262626] text-xs font-medium">
                      {userInfo.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#262626] border-[#f6d57f] text-white"
                align="end"
                alignOffset={11}
                forceMount
              >
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userInfo.name}
                    </p>
                    <p className="text-xs leading-none text-gray-400">
                      {userInfo.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem
                  className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
