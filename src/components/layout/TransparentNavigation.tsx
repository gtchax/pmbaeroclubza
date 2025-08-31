"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Users,
  Info,
  PlaneTakeoff,
  MapPin,
  FileText,
  Wrench,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
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

interface NavigationGroup {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: {
    name: string;
    href: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

interface NavigationItem {
  name: string;
  href: string;
  description: string;
}

interface TransparentNavigationProps {
  isScrolled: boolean;
}

const navigationGroups: NavigationGroup[] = [
  {
    name: "Flight Training",
    icon: GraduationCap,
    items: [
      {
        name: "Flight School",
        href: "/flight-school",
        description: "PPL, CPL, and advanced ratings",
        icon: GraduationCap,
      },
      {
        name: "Training Programs",
        href: "/flight-school#programs",
        description: "Course details and requirements",
        icon: FileText,
      },
      {
        name: "Flight Instructors",
        href: "/flight-instructors",
        description: "Meet our certified instructors",
        icon: Users,
      },
    ],
  },
  {
    name: "Club & Operations",
    icon: Users,
    items: [
      {
        name: "Aero Club",
        href: "/aero-club",
        description: "Membership and social events",
        icon: Users,
      },
      {
        name: "Training Fleet",
        href: "/training-fleet",
        description: "Our training aircrafts",
        icon: PlaneTakeoff,
      },
      {
        name: "SEAMS",
        href: "/seams",
        description: "Smart Electronic Aviation Management System",
        icon: Wrench,
      },
    ],
  },
  {
    name: "Resources",
    icon: FileText,
    items: [
      {
        name: "Pilot Resources",
        href: "/pilot-resources",
        description: "Weather, NOTAMs, and procedures",
        icon: FileText,
      },
      {
        name: "Visiting Aircraft",
        href: "/visiting-aircraft",
        description: "Information for visiting pilots",
        icon: MapPin,
      },
      {
        name: "FAQ",
        href: "/faq",
        description: "Frequently asked questions",
        icon: Info,
      },
    ],
  },
];

const standaloneLinks: NavigationItem[] = [
  // {
  //   name: "Contact",
  //   href: "/contact",
  //   description: "Get in touch with us",
  // },
];

export function TransparentNavigation({
  isScrolled,
}: TransparentNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { metadata, dashboardUrl } = useClerkRole();

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render authentication-dependent content until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <div className="p-2 rounded-lg bg-[#f6d57f]">
              <Plane className="h-6 w-6 text-[#262626]" />
            </div>
            <span className="text-xl font-bold text-[#262626] ml-2">
              PMB Aero Club
            </span>
          </div>
          <div className="flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
        </nav>
      </header>
    );
  }

  const handleDropdownToggle = (groupName: string) => {
    setOpenDropdown(openDropdown === groupName ? null : groupName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // Dynamic classes based on scroll state
  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-500",
    isScrolled
      ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      : "bg-transparent"
  );

  const textClasses = cn(
    "transition-colors duration-500",
    isScrolled ? "text-[#262626]" : "text-white"
  );

  const hoverTextClasses = cn(
    "transition-colors duration-300",
    isScrolled
      ? "hover:text-[#f6d57f] hover:bg-gray-50"
      : "hover:text-[#f6d57f] hover:bg-white/10"
  );

  const logoBackgroundClasses = cn(
    "p-2 rounded-lg transition-colors duration-500",
    isScrolled ? "bg-[#f6d57f]" : "bg-white/20 backdrop-blur-sm"
  );

  const logoIconClasses = cn(
    "h-6 w-6 transition-colors duration-500",
    isScrolled ? "text-[#262626]" : "text-white"
  );

  const buttonClasses = cn(
    "transition-all duration-500",
    isScrolled
      ? "bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
  );

  const mobileButtonClasses = cn(
    "transition-colors duration-500",
    isScrolled
      ? "text-[#262626] hover:text-[#f6d57f] hover:bg-gray-50"
      : "text-white hover:text-[#f6d57f] hover:bg-white/10"
  );

  const dropdownClasses = cn(
    "absolute top-full left-0 mt-1 w-80 rounded-xl shadow-lg border py-2 z-50 transition-colors duration-500",
    isScrolled
      ? "bg-white border-gray-200"
      : "bg-black/80 backdrop-blur-md border-white/20"
  );

  const dropdownItemTextClasses = cn(
    "transition-colors duration-300",
    isScrolled ? "text-[#262626]" : "text-white"
  );

  const dropdownItemHoverClasses = cn(
    "transition-colors duration-300",
    isScrolled
      ? "hover:bg-gray-50 group-hover:text-[#f6d57f]"
      : "hover:bg-white/10 group-hover:text-[#f6d57f]"
  );

  return (
    <header className={headerClasses}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 flex items-center space-x-2"
            onClick={closeAllDropdowns}
          >
            <div className={logoBackgroundClasses}>
              <Plane className={logoIconClasses} />
            </div>
            <span className={cn("text-xl font-bold", textClasses)}>
              PMB Aero Club
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-1">
          {/* Dropdown Groups */}
          {navigationGroups.map((group) => (
            <div key={group.name} className="relative">
              <button
                onClick={() => handleDropdownToggle(group.name)}
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg",
                  textClasses,
                  hoverTextClasses,
                  openDropdown === group.name &&
                    (isScrolled
                      ? "text-[#f6d57f] bg-gray-50"
                      : "text-[#f6d57f] bg-white/10")
                )}
              >
                {group.icon && <group.icon className="h-4 w-4" />}
                <span>{group.name}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    openDropdown === group.name && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {openDropdown === group.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={dropdownClasses}
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className={cn(
                          "flex items-start space-x-3 px-4 py-3 transition-colors group",
                          dropdownItemHoverClasses
                        )}
                      >
                        {item.icon && (
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                              isScrolled
                                ? "bg-gray-100 group-hover:bg-[#f6d57f]"
                                : "bg-white/10 group-hover:bg-[#f6d57f]"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "h-4 w-4 transition-colors",
                                isScrolled
                                  ? "text-gray-600 group-hover:text-[#262626]"
                                  : "text-white group-hover:text-[#262626]"
                              )}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p
                            className={cn(
                              "font-medium transition-colors",
                              dropdownItemTextClasses,
                              "group-hover:text-[#f6d57f]"
                            )}
                          >
                            {item.name}
                          </p>
                          <p
                            className={cn(
                              "text-sm mt-0.5 transition-colors",
                              isScrolled ? "text-gray-500" : "text-gray-300"
                            )}
                          >
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Standalone Links */}
          {standaloneLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg",
                textClasses,
                hoverTextClasses
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons or User Dropdown */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
          {mounted && isLoaded && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "border-white/20 text-white hover:bg-white/10",
                    buttonClasses
                  )}
                >
                  <User className="h-4 w-4 mr-2" />
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
            <>
              <Button
                variant="outline"
                asChild
                className={cn(
                  "border-white/20 text-white hover:bg-white/10",
                  buttonClasses
                )}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className={buttonClasses}>
                <Link href="/register">Start Flying Today</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={mobileButtonClasses}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "lg:hidden border-t overflow-hidden transition-colors duration-500",
              isScrolled
                ? "border-gray-200 bg-white"
                : "border-white/20 bg-black/80 backdrop-blur-md"
            )}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Dropdown Groups */}
              {navigationGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <div
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium px-2",
                      textClasses
                    )}
                  >
                    {group.icon && (
                      <group.icon className="h-4 w-4 text-[#f6d57f]" />
                    )}
                    <span>{group.name}</span>
                  </div>
                  <div className="ml-6 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block px-2 py-2 text-sm transition-colors rounded-lg",
                          isScrolled
                            ? "text-gray-600 hover:text-[#f6d57f] hover:bg-gray-50"
                            : "text-gray-300 hover:text-[#f6d57f] hover:bg-white/10"
                        )}
                        onClick={closeAllDropdowns}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile Standalone Links */}
              <div
                className={cn(
                  "pt-2 border-t",
                  isScrolled ? "border-gray-100" : "border-white/20"
                )}
              >
                {standaloneLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-2 py-2 text-sm font-medium transition-colors rounded-lg",
                      textClasses,
                      hoverTextClasses
                    )}
                    onClick={closeAllDropdowns}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA or User Info */}
              <div className="pt-4 space-y-3">
                {mounted && isLoaded && user ? (
                  <>
                    <div className="px-2 py-3 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-[#262626]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.firstName ||
                              user.emailAddresses[0]?.emailAddress ||
                              "User"}
                          </p>
                          <p className="text-xs text-gray-300">
                            {metadata?.userRole === "STUDENT" && "Student"}
                            {metadata?.userRole === "INSTRUCTOR" &&
                              "Instructor"}
                            {metadata?.userRole === "ADMIN" && "Admin"}
                            {metadata?.userRole === "SUPER_ADMIN" &&
                              "Super Admin"}
                            {!metadata?.userRole && "User"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button asChild className={cn("w-full", buttonClasses)}>
                      <Link href={dashboardUrl}>Go to Dashboard</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => signOut()}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      asChild
                      className={cn(
                        "w-full border-white/20 text-white hover:bg-white/10",
                        buttonClasses
                      )}
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className={cn("w-full", buttonClasses)}>
                      <Link href="/register">Start Flying Today</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </header>
  );
}
