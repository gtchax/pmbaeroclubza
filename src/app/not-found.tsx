import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plane,
  Home,
  Search,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main 404 Content */}
        <div className="mb-12">
          {/* Animated Plane Icon */}
          <div className="relative mb-8">
            <div className="animate-bounce">
              <Plane className="h-24 w-24 text-[#f6d57f] mx-auto transform rotate-45 drop-shadow-2xl" />
            </div>
            <div className="absolute inset-0 bg-[#f6d57f]/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
          </div>

          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            4<span className="text-[#f6d57f] drop-shadow-2xl">0</span>4
          </h1>

          {/* Main Message */}
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Looks like this page has flown off course! Don't worry, we'll help
            you navigate back to familiar skies.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button
            asChild
            size="lg"
            className=" bg-[#f6d57f] hover:bg-[#f4d06a] text-[#262626] font-semibold px-10 py-4 text-lg shadow-2xl hover:shadow-[#f6d57f]/25 transform hover:scale-105 transition-all duration-200 border-2 border-[#f6d57f] hover:border-[#f4d06a]"
          >
            <Link href="/" className="flex items-center justify-center">
              <Home className="mr-3 h-6 w-6" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex items-center justify-center border-2 border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] font-semibold px-10 py-4 text-lg shadow-2xl hover:shadow-[#f6d57f]/25 transform hover:scale-105 transition-all duration-200 bg-transparent backdrop-blur-sm"
          >
            <Link href="/flight-school" className="flex items-center justify-center">
              <Plane className="mr-3 h-6 w-6" />
              Flight School
            </Link>
          </Button>
        </div>

        {/* Helpful Navigation Cards */}
        {/* <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-2xl hover:shadow-[#f6d57f]/10 transition-all duration-300 border-[#f6d57f]/30 hover:border-[#f6d57f]/50 bg-gray-800/80 backdrop-blur-sm group border-gray-700">
            <CardHeader className="pb-3">
              <div className="w-14 h-14 bg-[#f6d57f]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#f6d57f]/30 transition-colors duration-200">
                <Plane className="h-7 w-7 text-[#f6d57f]" />
              </div>
              <CardTitle className="text-lg text-white">
                Flight Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4 text-gray-300">
                Start your aviation journey with our professional flight
                training programs
              </CardDescription>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#f6d57f] hover:text-[#f4d06a] hover:bg-[#f6d57f]/10 font-medium"
              >
                <Link href="/flight-school">
                  Learn More
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:shadow-[#f6d57f]/10 transition-all duration-300 border-[#f6d57f]/30 hover:border-[#f6d57f]/50 bg-gray-800/80 backdrop-blur-sm group border-gray-700">
            <CardHeader className="pb-3">
              <div className="w-14 h-14 bg-[#f6d57f]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#f6d57f]/30 transition-colors duration-200">
                <Search className="h-7 w-7 text-[#f6d57f]" />
              </div>
              <CardTitle className="text-lg text-white">
                Pilot Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4 text-gray-300">
                Access comprehensive training materials and student pilot
                resources
              </CardDescription>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#f6d57f] hover:text-[#f4d06a] hover:bg-[#f6d57f]/10 font-medium"
              >
                <Link href="/pilot-resources">
                  Explore Resources
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:shadow-[#f6d57f]/10 transition-all duration-300 border-[#f6d57f]/30 hover:border-[#f6d57f]/50 bg-gray-800/80 backdrop-blur-sm group border-gray-700">
            <CardHeader className="pb-3">
              <div className="w-14 h-14 bg-[#f6d57f]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#f6d57f]/30 transition-colors duration-200">
                <MapPin className="h-7 w-7 text-[#f6d57f]" />
              </div>
              <CardTitle className="text-lg text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4 text-gray-300">
                Get in touch with our team for any questions or assistance
              </CardDescription>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#f6d57f] hover:text-[#f4d06a] hover:bg-[#f6d57f]/10 font-medium"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div> */}

        {/* Contact Information */}
        {/* <Card className="bg-gray-800/90 backdrop-blur-sm border-[#f6d57f]/40 shadow-2xl shadow-[#f6d57f]/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Need Help?</CardTitle>
            <CardDescription className="text-gray-300">
              Our team is here to assist you with any questions about flight
              training or our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f6d57f]/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#f6d57f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Location</p>
                    <p className="text-sm text-gray-300">
                      Pietermaritzburg Airport
                    </p>
                    <p className="text-sm text-gray-300">
                      KwaZulu-Natal, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f6d57f]/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#f6d57f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-300">+27-33-123-4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f6d57f]/20 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#f6d57f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-300">
                      info@pmbaeroclub.co.za
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f6d57f]/20 rounded-full flex items-center justify-center">
                    <Plane className="h-6 w-6 text-[#f6d57f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Hours</p>
                    <p className="text-sm text-gray-300">
                      Mon-Fri: 8:00 AM - 5:00 PM
                    </p>
                    <p className="text-sm text-gray-300">
                      Sat: 8:00 AM - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Footer Note */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 PMB Aero Club. All rights reserved. |
            <Link
              href="/privacy-policy"
              className="text-[#f6d57f] hover:text-[#f4d06a] hover:underline ml-1 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            {" | "}
            <Link
              href="/terms-of-service"
              className="text-[#f6d57f] hover:text-[#f4d06a] hover:underline transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
