"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Plane } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+27 33 123 4567",
    description: "Call us during office hours",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@pmbaeroclub.co.za",
    description: "We&apos;ll respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: "Pietermaritzburg Airport",
    description: "Oribi, Pietermaritzburg, South Africa",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Mon-Fri: 8:00 AM - 5:00 PM",
    description: "Sat: 8:00 AM - 1:00 PM",
  },
];

const quickLinks = [
  {
    title: "Book Discovery Flight",
    href: "/contact",
    description: "Experience flying firsthand",
  },
  {
    title: "Training Programs",
    href: "/flight-school",
    description: "View our course offerings",
  },
  {
    title: "Club Membership",
    href: "/aero-club",
    description: "Join our aviation community",
  },
  {
    title: "Aircraft Rental",
    href: "/aircraft",
    description: "Rent our well-maintained aircraft",
  },
];

export function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your aviation journey? Have questions about our
            programs? We&apos;re here to help you take flight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-[#262626] mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-6">
                Located at Pietermaritzburg Airport, we&apos;re easily
                accessible and ready to welcome you to our aviation family.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#f6d57f]/20 rounded-lg flex items-center justify-center">
                            <info.icon className="h-6 w-6 text-[#f6d57f]" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#262626] mb-1">
                            {info.title}
                          </h4>
                          <p className="text-lg font-medium text-[#262626] mb-1">
                            {info.details}
                          </p>
                          <p className="text-sm text-gray-600">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">
                      Emergency Contact
                    </h4>
                    <p className="text-lg font-medium text-red-700">
                      +27 33 123 4567
                    </p>
                    <p className="text-sm text-red-600">
                      Available 24/7 for urgent matters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Quick Actions & Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div>
              <h3 className="text-2xl font-bold text-[#262626] mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-[#262626] mb-2 group-hover:text-[#f6d57f] transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {link.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto text-[#f6d57f] hover:text-[#f4d06a]"
                        >
                          Learn More →
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form CTA */}
            <Card className="bg-gradient-to-br from-[#f6d57f]/10 to-[#f6d57f]/5 border-[#f6d57f]/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto">
                    <Plane className="h-8 w-8 text-[#262626]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#262626]">
                    Ready to Take Flight?
                  </h4>
                  <p className="text-gray-600">
                    Fill out our contact form and we&apos;ll get back to you
                    within 24 hours to discuss your aviation goals.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <a href="/contact">Send Us a Message</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#262626]">
                Our Location
              </CardTitle>
              <CardDescription>
                Pietermaritzburg Airport (Oribi) - Easy to find and accessible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map Coming Soon</p>
                  <p className="text-sm">
                    Pietermaritzburg Airport, Oribi, South Africa
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
