"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Plane,
  BarChart3,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function SEAMSLandingPage() {
  // const features = [
  //   {
  //     icon: Plane,
  //     title: "Flight Operations",
  //     description:
  //       "Real-time flight tracking, scheduling, and operational management",
  //     bgColor: "bg-blue-50",
  //     iconColor: "text-blue-600",
  //   },
  //   {
  //     icon: Users,
  //     title: "Crew Management",
  //     description:
  //       "Pilot and crew scheduling, qualifications, and performance tracking",
  //     bgColor: "bg-green-50",
  //     iconColor: "text-green-600",
  //   },
  //   {
  //     icon: Wrench,
  //     title: "Maintenance Tracking",
  //     description:
  //       "Aircraft maintenance schedules, alerts, and compliance monitoring",
  //     bgColor: "bg-orange-50",
  //     iconColor: "text-orange-600",
  //   },
  //   {
  //     icon: Fuel,
  //     title: "Fuel Management",
  //     description:
  //       "Fuel consumption tracking, cost analysis, and efficiency optimization",
  //     bgColor: "bg-purple-50",
  //     iconColor: "text-purple-600",
  //   },
  //   {
  //     icon: BarChart3,
  //     title: "Analytics & Reporting",
  //     description:
  //       "Comprehensive data insights and regulatory compliance reporting",
  //     bgColor: "bg-indigo-50",
  //     iconColor: "text-indigo-600",
  //   },
  //   {
  //     icon: Shield,
  //     title: "Safety & Compliance",
  //     description:
  //       "FAA, EASA, and ICAO compliance tracking and safety management",
  //     bgColor: "bg-red-50",
  //     iconColor: "text-red-600",
  //   },
  // ];

  // const benefits = [
  //   {
  //     icon: Zap,
  //     title: "Real-time Operations",
  //     description:
  //       "Instant access to flight status, crew availability, and maintenance alerts",
  //   },
  //   {
  //     icon: Database,
  //     title: "Centralized Data",
  //     description:
  //       "Single source of truth for all aviation operations and compliance data",
  //   },
  //   {
  //     icon: Smartphone,
  //     title: "Mobile Access",
  //     description:
  //       "Access SEAMS from anywhere with our responsive mobile application",
  //   },
  //   {
  //     icon: Cloud,
  //     title: "Cloud-based",
  //     description:
  //       "Secure, scalable cloud infrastructure with automatic backups",
  //   },
  //   {
  //     icon: Lock,
  //     title: "Enterprise Security",
  //     description:
  //       "Bank-level security with role-based access control and audit trails",
  //   },
  //   {
  //     icon: Target,
  //     title: "Regulatory Compliance",
  //     description:
  //       "Built-in compliance tracking for all major aviation authorities",
  //   },
  // ];

  // const stats = [
  //   { number: "99.9%", label: "Uptime", icon: CheckCircle },
  //   { number: "24/7", label: "Support", icon: Clock },
  //   { number: "500+", label: "Aircraft", icon: Plane },
  //   { number: "50+", label: "Airports", icon: Globe },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#262626] via-[#1a1a1a] to-[#262626] text-white pt-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pb-12">
        <div className="p">
          <Link href="/">
            <Button
              variant="outline"
              className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <section className="relative h-full overflow-hidden  pb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[#f6d57f] opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <div className="inline-flex items-center bg-[#f6d57f] text-[#262626] mb-6 text-sm font-medium px-4 py-2 rounded-full">
              <Award className="h-4 w-4 mr-2" />
              Industry Leading Solution
            </div> */}

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-[#f6d57f]">SEAMS</span>
              <br />
              <span className="text-4xl md:text-5xl">
                Smart Electronic Aviation
              </span>
              <br />
              <span className="text-4xl md:text-5xl">Management System</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Revolutionize your aviation operations with our comprehensive,
              cloud-based management platform. Streamline flight operations,
              maintenance, crew management, and compliance tracking in one
              integrated system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] px-8 py-4 text-lg font-semibold"
              >
                <Plane className="h-5 w-5 mr-2" />
                Still working on this
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] px-8 py-4 text-lg font-semibold"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Coming Soon
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#f6d57f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-[#262626]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#262626] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
              Comprehensive Aviation Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SEAMS provides everything you need to manage your aviation
              operations efficiently and safely, all in one integrated platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <feature.icon
                        className={`h-8 w-8 ${feature.iconColor}`}
                      />
                    </div>
                    <CardTitle className="text-xl text-[#262626]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
              Why Choose SEAMS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by aviation professionals for aviation professionals, SEAMS
              delivers the tools you need to succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-[#f6d57f] rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-[#262626]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#262626] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-br from-[#262626] to-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Aviation Operations?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join hundreds of aviation organizations already using SEAMS to
              streamline their operations and improve safety and efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] px-8 py-4 text-lg font-semibold"
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                Get Started Today
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] px-8 py-4 text-lg font-semibold"
              >
                <Users className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-[#f6d57f]" />
                <span>Trusted by 500+ aviation organizations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-[#f6d57f]" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-[#f6d57f]" />
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
