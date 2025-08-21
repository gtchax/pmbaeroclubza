"use client";
import { useState } from "react";
import Hero from "@/components/layout/Hero";
import { TransparentNavigation } from "@/components/layout/TransparentNavigation";
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
  Plane,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Shield,
  Zap,
} from "lucide-react";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FlightTraining } from "@/components/sections/flight-training";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollChange = (scrolled: boolean) => {
    setIsScrolled(scrolled);
  };

  return (
    <div className="min-h-screen">
      {/* Transparent Navigation */}
      <TransparentNavigation isScrolled={isScrolled} />

      {/* Hero Section with Video Background */}
      <Hero onScrollChange={handleScrollChange} />

      {/* Content Sections */}
      <div className="bg-white">
        {/* About Section */}
        {/* <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-[#f6d57f] text-[#262626] mb-4 text-sm font-medium px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                Since 1938
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
                Your Aviation Journey Starts Here
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                For over 85 years, PMB Aero Club has been South Africa's premier
                destination for flight training, aircraft operations, and
                aviation excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[#f6d57f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Plane className="h-8 w-8 text-[#262626]" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    Flight Training
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Professional PPL, CPL, and advanced rating courses with
                    experienced instructors and modern training aircraft.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    Aero Club
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Join our vibrant community of aviation enthusiasts with
                    social events, fly-ins, and networking opportunities.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#262626]">
                    Safety First
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    SACAA Part 141 approved training organization with the
                    highest safety standards and maintenance protocols.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
        <About />
        <FlightTraining />
        {/* Stats Section */}
        {/* <section className="py-20 bg-gradient-to-br from-[#262626] to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Excellence in Numbers
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our track record speaks for itself
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Award, value: "85+", label: "Years of Excellence" },
                { icon: Users, value: "1000+", label: "Pilots Trained" },
                { icon: Plane, value: "3", label: "Training Aircraft" },
                { icon: Star, value: "100%", label: "Safety Record" },
              ].map(({ icon: Icon, value, label }, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#f6d57f] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#262626]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#f6d57f] mb-2">
                    {value}
                  </div>
                  <div className="text-gray-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <Contact />
        {/* <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#262626] mb-6">
                Ready to Take Flight?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Contact us today to start your aviation journey or learn more
                about our services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f6d57f] rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#262626]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#262626] mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">+27 (0)33 386 3952</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#262626] mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">info@pmbaeroclub.co.za</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#262626] mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      Pietermaritzburg Airport, KwaZulu-Natal
                    </p>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] text-[#262626] border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Start Your Aviation Journey
                  </h3>
                  <p className="text-base mb-6 opacity-90">
                    Book a trial lesson or get more information about our
                    training programs.
                  </p>
                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-[#262626] text-white hover:bg-gray-800 shadow-lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Trial Lesson
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}
      </div>
      <Footer />
    </div>
  );
}
