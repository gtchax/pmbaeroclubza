// import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Clock, Award, Target } from "lucide-react";
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
      "Flight planning and navigation",
      "Emergency procedures training",
      "Cross-country flying",
      "Weather theory and practical application",
      "Aircraft systems knowledge",
    ],
    requirements: [
      "Minimum age: 17 years",
      "Medical certificate (Class 2)",
      "English language proficiency",
      "No criminal record",
    ],
    icon: Plane,
    href: "/flight-school/ppl",
    popular: true,
    color: "bg-[#f6d57f] text-[#262626]",
  },
  {
    title: "Night Rating",
    description:
      "Extend your flying capabilities with night flying certification.",
    duration: "10-15 hours",
    price: "From R25,000",
    features: [
      "Night navigation techniques",
      "Instrument flying basics",
      "Emergency night procedures",
      "Night takeoff and landing",
      "Night cross-country flying",
    ],
    requirements: [
      "Valid PPL",
      "Minimum 20 hours total flight time",
      "Medical certificate (Class 2)",
    ],
    icon: Clock,
    href: "/flight-school/night-rating",
    popular: false,
    color: "bg-[#262626] text-white",
  },
  {
    title: "Instrument Rating",
    description:
      "Master flying by instruments alone in various weather conditions.",
    duration: "40-50 hours",
    price: "From R95,000",
    features: [
      "Advanced instrument flying",
      "IFR procedures and regulations",
      "Advanced navigation systems",
      "Weather flying and decision making",
      "Emergency instrument procedures",
    ],
    requirements: [
      "Valid PPL",
      "Minimum 50 hours cross-country time",
      "Medical certificate (Class 1)",
      "Night rating recommended",
    ],
    icon: Target,
    href: "/flight-school/instrument-rating",
    popular: false,
    color: "border-[#f6d57f] text-[#f6d57f]",
  },
  {
    title: "Commercial Pilot License",
    description:
      "Take your flying career to the next level with commercial certification.",
    duration: "200+ hours",
    price: "From R180,000",
    features: [
      "Advanced flight maneuvers",
      "Commercial operations training",
      "Multi-engine aircraft experience",
      "Career guidance and preparation",
      "Advanced aerodynamics",
      "Professional pilot standards",
    ],
    requirements: [
      "Valid PPL",
      "Minimum 200 hours total time",
      "Medical certificate (Class 1)",
      "Instrument rating recommended",
    ],
    icon: Award,
    href: "/flight-school/cpl",
    popular: false,
    color: "bg-[#262626] text-white",
  },
];

const instructors = [
  {
    name: "Captain Sarah Johnson",
    role: "Chief Flight Instructor",
    experience: "15+ years",
    specializations: ["PPL", "CPL", "Multi-engine"],
    image: "/instructors/sarah.jpg",
  },
  {
    name: "Captain Michael Chen",
    role: "Senior Flight Instructor",
    experience: "12+ years",
    specializations: ["PPL", "Night Rating", "Instrument Rating"],
    image: "/instructors/michael.jpg",
  },
  {
    name: "Captain Emma Thompson",
    role: "Flight Instructor",
    experience: "8+ years",
    specializations: ["PPL", "Night Rating"],
    image: "/instructors/emma.jpg",
  },
];

const aircraftFleet = [
  {
    name: "Cessna 152",
    type: "Single Engine",
    seats: "2",
    use: "Primary training",
    features: ["Ideal for beginners", "Fuel efficient", "Easy to fly"],
  },
  {
    name: "Cessna 172",
    type: "Single Engine",
    seats: "4",
    use: "Advanced training",
    features: [
      "Spacious cockpit",
      "Excellent visibility",
      "Reliable performance",
    ],
  },
  {
    name: "Piper PA-28",
    type: "Single Engine",
    seats: "4",
    use: "Cross-country training",
    features: [
      "High wing design",
      "Good crosswind handling",
      "Comfortable for long flights",
    ],
  },
];

export default function FlightSchoolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#262626] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Flight Training Programs
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              From your first flight to advanced certifications, our
              comprehensive training programs are designed to make you a
              confident and skilled pilot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="#programs">View Programs</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-[#262626]"
              >
                <Link href="/contact">Book Discovery Flight</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Our Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the program that fits your aviation goals. Each course is
              designed to provide comprehensive training with experienced
              instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {trainingPrograms.map((program) => (
              <div key={program.title}>
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
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${program.color}`}
                    >
                      <program.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl text-[#262626]">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      {program.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-[#262626]">
                          {program.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-semibold text-[#f6d57f]">
                          {program.price}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#262626] mb-3">
                        What&apos;s Included:
                      </h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <div className="w-1.5 h-1.5 bg-[#f6d57f] rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#262626] mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {program.requirements.map((requirement, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <div className="w-1.5 h-1.5 bg-[#262626] rounded-full mr-2" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={program.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="text-center mb-16"
            // initial={{ opacity: 0, y: 30 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Meet Our Instructors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from experienced, certified flight instructors who are
              passionate about aviation and committed to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.name}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-semibold text-gray-600">
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#262626] mb-2">
                      {instructor.name}
                    </h3>
                    <p className="text-[#f6d57f] font-medium mb-2">
                      {instructor.role}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {instructor.experience} experience
                    </p>
                    <div>
                      <h4 className="font-semibold text-[#262626] mb-2">
                        Specializations:
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {instructor.specializations.map((spec, specIndex) => (
                          <span
                            key={specIndex}
                            className="bg-[#f6d57f]/20 text-[#262626] px-2 py-1 rounded text-sm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft Fleet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Our Training Aircraft
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Train on well-maintained, modern aircraft that provide the perfect
              platform for learning to fly safely and confidently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aircraftFleet.map((aircraft) => (
              <div key={aircraft.name}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-[#262626] mb-3">
                      {aircraft.name}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{aircraft.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">{aircraft.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primary Use:</span>
                        <span className="font-medium">{aircraft.use}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#262626] mb-2">
                        Features:
                      </h4>
                      <ul className="space-y-1">
                        {aircraft.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <div className="w-1.5 h-1.5 bg-[#f6d57f] rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-[#262626] mb-4">
              Ready to Start Your Aviation Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book a discovery flight and experience the thrill of flying
              firsthand. Our experienced instructors will guide you through
              every step of your training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="/contact">Book Discovery Flight</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
