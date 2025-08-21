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
import { History, Award, Users, Plane, MapPin, Shield } from "lucide-react";
import Link from "next/link";

const achievements = [
  {
    icon: History,
    title: "85+ Years",
    description:
      "Established in 1938, we&apos;re one of South Africa&apos;s oldest aviation clubs",
  },
  {
    icon: Users,
    title: "1000+ Pilots",
    description: "Successfully trained pilots who now fly around the world",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Consistently recognized for safety and training quality",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Zero fatal accidents in our 85+ year history",
  },
];

const values = [
  {
    title: "Heritage",
    description:
      "Honoring our rich aviation history while embracing modern training methods",
  },
  {
    title: "Excellence",
    description:
      "Maintaining the highest standards in flight training and safety",
  },
  {
    title: "Community",
    description:
      "Building lasting friendships and a supportive aviation family",
  },
  {
    title: "Innovation",
    description: "Continuously improving our training programs and facilities",
  },
];

export function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
                About PMB Aero Club
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Since 1938, PMB Aero Club has been at the heart of aviation in
                Pietermaritzburg, training generations of pilots and fostering a
                love for flight in our community.
              </p>
              <p className="text-lg text-gray-600">
                What started as a small group of aviation enthusiasts has grown
                into one of South Africa&apos;s most respected flight training
                institutions, combining traditional values with modern aviation
                technology.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-semibold text-[#262626] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Visit Our Club</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Achievements & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Achievement Card */}
            <Card className="bg-gradient-to-br from-[#f6d57f] to-[#f6d57f] border-[#f6d57f]/20">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f6d57f] border-4 border-[#262626] rounded-full mb-4">
                  <Plane className="h-10 w-10 text-[#262626]" />
                </div>
                <CardTitle className="text-2xl text-[#262626]">
                  Established 1938
                </CardTitle>
                <CardDescription className="text-lg">
                  Over 85 years of aviation excellence in Pietermaritzburg
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="pt-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f6d57f]/20 rounded-full mb-3">
                        <achievement.icon className="h-6 w-6 text-[#f6d57f]" />
                      </div>
                      <h4 className="font-bold text-[#262626] mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Location Info */}
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-[#f6d57f]" />
                  <div>
                    <h4 className="font-semibold text-[#262626]">
                      Pietermaritzburg Airport
                    </h4>
                    <p className="text-sm text-gray-600">
                      Conveniently located with easy access
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
