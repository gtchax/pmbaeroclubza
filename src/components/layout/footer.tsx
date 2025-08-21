"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plane,
  // Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = {
  "Flight Training": [
    { name: "Private Pilot License", href: "/flight-school/ppl" },
    { name: "Night Rating", href: "/flight-school/night-rating" },
    { name: "Instrument Rating", href: "/flight-school/instrument-rating" },
    { name: "Commercial License", href: "/flight-school/cpl" },
    { name: "Discovery Flights", href: "/contact" },
  ],
  "Aero Club": [
    { name: "Membership Benefits", href: "/aero-club" },
    { name: "Club Events", href: "/aero-club/events" },
    { name: "Member Directory", href: "/aero-club/members" },
    { name: "Club Rules", href: "/aero-club/rules" },
    { name: "Join Now", href: "/aero-club/join" },
  ],
  "Aircraft & Services": [
    { name: "Our Fleet", href: "/aircraft" },
    { name: "Aircraft Rental", href: "/aircraft/rental" },
    { name: "Maintenance", href: "/aircraft/maintenance" },
    { name: "Fuel Services", href: "/visiting-aircraft" },
    { name: "Hangar Space", href: "/contact" },
  ],
  Resources: [
    { name: "Weather Information", href: "/pilot-resources/weather" },
    { name: "NOTAMs", href: "/pilot-resources/notams" },
    { name: "Local Procedures", href: "/pilot-resources/procedures" },
    { name: "Training Materials", href: "/pilot-resources/materials" },
    { name: "Useful Links", href: "/pilot-resources/links" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "#",
    color: "hover:text-pink-600",
  },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" },
];

export function Footer() {
  return (
    <footer className="bg-[#262626] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Link href="/" className="inline-flex items-center space-x-2">
                <div className="bg-[#f6d57f] p-2 rounded-lg">
                  <Plane className="h-6 w-6 text-[#262626]" />
                </div>
                <span className="text-xl font-bold">PMB Aero Club</span>
              </Link>

              <p className="text-gray-300 leading-relaxed">
                Established in 1938, PMB Aero Club is one of South Africa&apos;s
                oldest and most respected aviation institutions, dedicated to
                training pilots and fostering a love for aviation.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className="font-semibold text-[#f6d57f] mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-[#f6d57f] transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

        {/* Contact & Location Info */}
        <motion.div
          className="border-t border-gray-700 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[#f6d57f] mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <p className="text-gray-300 text-sm">
                  Pietermaritzburg Airport
                  <br />
                  Oribi, Pietermaritzburg
                  <br />
                  South Africa
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-[#f6d57f] mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Contact</h4>
                <p className="text-gray-300 text-sm">
                  Phone: +27 33 123 4567
                  <br />
                  Email: info@pmbaeroclub.co.za
                  <br />
                  Emergency: +27 33 123 4567
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-[#f6d57f] mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Office Hours</h4>
                <p className="text-gray-300 text-sm">
                  Monday - Friday: 8:00 AM - 5:00 PM
                  <br />
                  Saturday: 8:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 PMB Aero Club. All rights reserved. |
              <Link href="/privacy" className="hover:text-[#f6d57f] ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="/terms" className="hover:text-[#f6d57f] ml-1">
                Terms of Service
              </Link>
            </div>

            <div className="text-gray-400 text-sm">
              <span className="text-[#f6d57f]">Est. 1938</span> - Where Aviation
              Dreams Take Flight
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
