import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  FileText,
  Globe,
  Wind,
  Calendar,
  BookOpen,
  Download,
  ExternalLink,
  MapPin,
  Clock,
  Users,
  Shield,
  Plane,
  Calculator,
  Award,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const weatherResources = [
  {
    title: "Official Aviation Weather",
    description:
      "The official weather site you will use for all your flight planning.",
    icon: Cloud,
    link: "https://www.weathersa.co.za/",
    external: true,
    featured: true,
    note: "Sign up free with your SPL Number",
  },
  {
    title: "FAPM Webcam",
    description: "Real-time weather camera feed for Pietermaritzburg Airport.",
    icon: MapPin,
    link: "#",
    external: false,
    featured: false,
  },
  {
    title: "WindGuru",
    description:
      "Hour-by-hour indicator of wind, temperature and rain (low cloud).",
    icon: Wind,
    link: "https://www.windguru.cz/",
    external: true,
    featured: false,
  },
  {
    title: "Windy.com",
    description: "Accurate and comprehensive weather information.",
    icon: Globe,
    link: "https://www.windy.com/",
    external: true,
    featured: false,
  },
];

const documentsAndForms = [
  {
    title: "Navigation Log",
    description: "Standard navigation log form for flight planning.",
    icon: FileText,
    link: "#",
    type: "form",
  },
  {
    title: "Navigation Checklist",
    description: "Pre-flight and in-flight navigation checklist.",
    icon: FileText,
    link: "#",
    type: "checklist",
  },
  {
    title: "Flight Plan Form",
    description: "Official flight plan submission form.",
    icon: FileText,
    link: "#",
    type: "form",
  },
  {
    title: "Online Flight Planning",
    description: "File your flight plan online through ATNS.",
    icon: Globe,
    link: "https://www.file2fly.co.za/",
    external: true,
    type: "online",
  },
];

const examResources = [
  {
    title: "Aeroversity Mock Exams",
    description: "Most popular mock exam platform for CAA exam preparation.",
    icon: BookOpen,
    link: "https://www.aeroversity.com/",
    external: true,
    requirement: "80% or more required before CAA exam",
  },
  {
    title: "Question Bank Mock Exams",
    description: "Alternative mock exam platform for practice.",
    icon: BookOpen,
    link: "#",
    external: false,
    requirement: "80% or more required before CAA exam",
  },
];

const calculators = [
  {
    title: "PPL to IFR CPL Calculator",
    description: "Calculate hours needed from PPL to IFR CPL.",
    icon: Calculator,
    link: "#",
    type: "IFR",
  },
  {
    title: "PPL to VFR CPL Calculator",
    description: "Calculate hours needed from PPL to VFR CPL.",
    icon: Calculator,
    link: "#",
    type: "VFR",
  },
];

const officialResources = [
  {
    title: "SACAA Website",
    description: "South African Civil Aviation Authority official website.",
    icon: Shield,
    link: "https://www.caa.co.za/",
    external: true,
    features: [
      "Pilot licensing forms",
      "CATs and CARs access",
      "AIPs, AIP Sups and AICs",
      "Address change notifications",
    ],
  },
  {
    title: "ATNS NOTAMs",
    description: "Source site for up-to-date NOTAM information.",
    icon: AlertTriangle,
    link: "https://www.atns.co.za/",
    external: true,
    note: "More efficient than SACAA site for NOTAMs",
  },
];

const safetyResources = [
  {
    title: "Safety Corner",
    description: "Important safety information and guidelines.",
    icon: Shield,
    link: "#",
    type: "safety",
  },
  {
    title: "Aircraft Accidents",
    description: "Safety reports and accident prevention information.",
    icon: AlertTriangle,
    link: "#",
    type: "safety",
  },
];

export default function PilotResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-[#262626] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Pilot Resources</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Essential tools, forms, and resources for student pilots and
              licensed aviators. Everything you need for safe and successful
              flying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="#weather">Weather Resources</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="#documents">Documents & Forms</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Resources */}
      <section id="weather" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Weather Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access official aviation weather, real-time webcams, and
              comprehensive weather forecasting tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherResources.map((resource) => (
              <Card
                key={resource.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                    <resource.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg text-[#262626]">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {resource.description}
                  </CardDescription>
                  {resource.featured && (
                    <Badge className="bg-[#f6d57f] text-[#262626] mt-2">
                      Official Site
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  {resource.note && (
                    <p className="text-sm text-[#f6d57f] mb-3 font-medium">
                      {resource.note}
                    </p>
                  )}
                  <Button asChild size="sm" className="w-full">
                    <Link href={resource.link}>
                      {resource.external ? (
                        <>
                          Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Access"
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Forms */}
      <section id="documents" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Documents & Forms
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential forms and checklists for flight planning and operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentsAndForms.map((doc) => (
              <Card
                key={doc.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#262626] text-white mb-4">
                    <doc.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg text-[#262626]">
                    {doc.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild size="sm" className="w-full">
                    <Link href={doc.link}>
                      {doc.external ? (
                        <>
                          Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 inline-block">
              <p className="text-gray-600 mb-2">
                <strong>Phone Filing:</strong> Call 0860 359 669 to file your
                flight plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Preparation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Exam Preparation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mock exams and study resources to prepare for your CAA
              examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {examResources.map((resource) => (
              <Card
                key={resource.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                    <resource.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 font-medium">
                      {resource.requirement}
                    </p>
                  </div>
                  <Button asChild size="lg" className="w-full">
                    <Link href={resource.link}>
                      {resource.external ? (
                        <>
                          Visit Platform{" "}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Access Platform"
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-[#f6d57f]/20 border border-[#f6d57f]/30 rounded-lg p-6 inline-block">
              <p className="text-[#262626]">
                <strong>Need Help?</strong> Ask our instructors for assistance
                with exam preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Flight Time Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Free tools to calculate the hours needed for your next license or
              rating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {calculators.map((calc) => (
              <Card
                key={calc.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#262626] text-white mb-4">
                    <calc.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    {calc.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {calc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild size="lg" className="w-full">
                    <Link href={calc.link}>
                      <Calculator className="mr-2 h-4 w-4" />
                      Use Calculator
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Official Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Official Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access official aviation authorities and regulatory information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {officialResources.map((resource) => (
              <Card
                key={resource.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626]">
                      <resource.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-[#262626]">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {resource.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resource.features && (
                    <div>
                      <h4 className="font-semibold text-[#262626] mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {resource.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <div className="w-1.5 h-1.5 bg-[#f6d57f] rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {resource.note && (
                    <div className="bg-[#f6d57f]/20 border border-[#f6d57f]/30 rounded-lg p-3">
                      <p className="text-sm text-[#262626]">{resource.note}</p>
                    </div>
                  )}
                  <Button asChild size="lg" className="w-full">
                    <Link href={resource.link}>
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Safety & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important safety information and compliance resources for pilots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyResources.map((resource) => (
              <Card
                key={resource.title}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-4">
                    <resource.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild size="lg" className="w-full">
                    <Link href={resource.link}>Access Resource</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEAMS Access */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-[#262626] to-gray-800 rounded-2xl p-8 text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-6">
              <Plane className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Access SEAMS</h3>
            <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
              Log in to SEAMS (Smart Electronic Aviation Management System) to
              reserve club aircraft for your next flight lesson or hire & fly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/seams">Open SEAMS</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Club Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#262626] mb-2">
                  Club Office Hours
                </h3>
                <p className="text-gray-600">
                  <strong>Mon to Fri:</strong> 8am to 4pm
                  <br />
                  <strong>Public holidays:</strong> Closed
                  <br />
                  <strong>Instructors:</strong> Always available
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#262626] mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600">
                  <strong>Phone:</strong> +27 (0)33 386 3952
                  <br />
                  <strong>Email:</strong> info@pmbaeroclub.co.za
                  <br />
                  <strong>ATO:</strong> SACAA/1169/ATO
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#262626] mb-2">
                  Club Events
                </h3>
                <p className="text-gray-600">
                  Stay updated with our club events calendar and social
                  activities for members.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link href="#events">View Calendar</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
