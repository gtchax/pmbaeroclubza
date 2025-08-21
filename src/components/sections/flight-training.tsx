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
import {
  Plane,
  Clock,
  Award,
  /* Users, BookOpen, */ Target,
} from "lucide-react";
import Link from "next/link";

const trainingPrograms = [
  {
    title: "Private Pilot License (PPL)",
    description:
      "Your first step into aviation. Learn to fly single-engine aircraft safely and confidently.",
    duration: "40-60 hours",
    price: "From R85,000",
    features: [
      "Ground school included",
      "Flight planning",
      "Navigation training",
      "Emergency procedures",
    ],
    icon: Plane,
    href: "/flight-school/ppl",
    popular: true,
  },
  {
    title: "Night Rating",
    description:
      "Extend your flying capabilities with night flying certification.",
    duration: "10-15 hours",
    price: "From R25,000",
    features: [
      "Night navigation",
      "Instrument flying basics",
      "Emergency night procedures",
    ],
    icon: Clock,
    href: "/flight-school/night-rating",
    popular: false,
  },
  {
    title: "Instrument Rating",
    description:
      "Master flying by instruments alone in various weather conditions.",
    duration: "40-50 hours",
    price: "From R95,000",
    features: [
      "Instrument flying",
      "IFR procedures",
      "Advanced navigation",
      "Weather flying",
    ],
    icon: Target,
    href: "/flight-school/instrument-rating",
    popular: false,
  },
  {
    title: "Commercial Pilot License",
    description:
      "Take your flying career to the next level with commercial certification.",
    duration: "200+ hours",
    price: "From R180,000",
    features: [
      "Advanced maneuvers",
      "Commercial operations",
      "Multi-engine training",
      "Career guidance",
    ],
    icon: Award,
    href: "/flight-school/cpl",
    popular: false,
  },
];

export function FlightTraining() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#262626] via-[#1a1a1a] to-[#262626] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r
          from-white via-[#f6d57f] to-white bg-clip-text text-transparent mb-6"
          >
            Flight Training Programs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From your first flight to advanced certifications, our comprehensive
            training programs are designed to make you a confident and skilled
            pilot.
          </p>
        </motion.div>

        {/* Training Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainingPrograms.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card
                className={`h-full relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  program.popular ? "ring-2 ring-[#f6d57f]" : ""
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#f6d57f] text-[#262626] px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f]/20 rounded-full mb-4">
                    <program.icon className="h-8 w-8 text-[#f6d57f]" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-[#262626]">
                      {program.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-[#f6d57f]">
                      {program.price}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Includes:
                    </h4>
                    <ul className="space-y-1">
                      {program.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-[#f6d57f] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full mt-4">
                    <Link href={program.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-[#262626] mb-4">
              Ready to Start Your Aviation Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book a discovery flight and experience the thrill of flying
              firsthand. Our experienced instructors will guide you through
              every step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Book Discovery Flight</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/flight-school">View All Programs</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
