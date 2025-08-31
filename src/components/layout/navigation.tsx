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
  // Calendar,
  Wrench,
  // Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      // {
      //   name: "News & Events",
      //   href: "/news",
      //   description: "Latest updates and events",
      //   icon: Calendar,
      // },
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
  //   name: "About",
  //   href: "/about",
  //   description: "Our history since 1938",
  // },
  // {
  //   name: "Contact",
  //   href: "/contact",
  //   description: "Get in touch with us",
  // },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  const handleDropdownToggle = (groupName: string) => {
    setOpenDropdown(openDropdown === groupName ? null : groupName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
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
            <div className="bg-[#f6d57f] p-2 rounded-lg">
              <Plane className="h-6 w-6 text-[#262626]" />
            </div>
            <span className="text-xl font-bold text-[#262626]">
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
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium text-[#262626] hover:text-[#f6d57f] transition-colors rounded-lg hover:bg-gray-50",
                  openDropdown === group.name && "text-[#f6d57f] bg-gray-50"
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
                    className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeAllDropdowns}
                        className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        {item.icon && (
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#f6d57f] transition-colors">
                            <item.icon className="h-4 w-4 text-gray-600 group-hover:text-[#262626]" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-[#262626] group-hover:text-[#f6d57f] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
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
              className="px-4 py-2 text-sm font-medium text-[#262626] hover:text-[#f6d57f] transition-colors rounded-lg hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
          <Button
            variant="outline"
            asChild
            className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] transition-colors"
          >
            <Link href="/register">Start Flying Today</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-[#262626] hover:text-[#f6d57f] hover:bg-gray-50"
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
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Dropdown Groups */}
              {navigationGroups.map((group) => (
                <div key={group.name} className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-medium text-[#262626] px-2">
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
                        className="block px-2 py-2 text-sm text-gray-600 hover:text-[#f6d57f] transition-colors rounded-lg hover:bg-gray-50"
                        onClick={closeAllDropdowns}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile Standalone Links */}
              <div className="pt-2 border-t border-gray-100">
                {standaloneLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-sm font-medium text-[#262626] hover:text-[#f6d57f] transition-colors rounded-lg hover:bg-gray-50"
                    onClick={closeAllDropdowns}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
                >
                  <Link href="/register">Start Flying Today</Link>
                </Button>
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
