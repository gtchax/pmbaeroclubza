import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Plane,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function AeroClubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#262626] via-[#1a1a1a] to-[#262626] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Badge
              variant="outline"
              className="mb-4 text-sm border-[#f6d57f] text-[#f6d57f]"
            >
              Join the Elite Aviation Community
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-[#f6d57f]">PMB Aero Club</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Experience the thrill of aviation, connect with fellow pilots, and
              access exclusive resources in one of South Africa's premier flying
              communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="xl"
                className="text-lg bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f6d57f] mb-2">150+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f6d57f] mb-2">25+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f6d57f] mb-2">
                1000+
              </div>
              <div className="text-gray-300">Flight Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f6d57f] mb-2">50+</div>
              <div className="text-gray-300">Events Yearly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Why Join PMB Aero Club?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the exclusive benefits and opportunities that await you
              as a member
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <Plane className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Exclusive Flight Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Access to our fleet of well-maintained aircraft at competitive
                  rates, with priority booking for members.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Pilot Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Connect with experienced pilots, share knowledge, and build
                  lasting friendships in the aviation community.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <Trophy className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Training & Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Access to advanced training programs, workshops, and
                  certification courses at member rates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Regular Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Participate in fly-ins, air shows, competitions, and social
                  events throughout the year.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Premium Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Access to our clubhouse, briefing rooms, maintenance
                  facilities, and secure aircraft parking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-[#f6d57f] rounded-full flex items-center justify-center mb-4">
                  <Star className="w-10 h-10 text-[#262626]" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Insurance Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Special group insurance rates and coverage options exclusively
                  available to club members.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Choose Your Membership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible membership options designed to fit your aviation needs
              and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Membership */}
            <Card className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#262626]">
                  Student Pilot
                </CardTitle>
                <div className="text-4xl font-bold text-[#f6d57f]">
                  R299<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600">
                  Perfect for aspiring pilots
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Access to training aircraft
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Flight instructor discounts
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Ground school access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Club events participation
                  </span>
                </div>
                <Button className="w-full mt-6 bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  Join Student
                </Button>
              </CardContent>
            </Card>

            {/* Full Membership */}
            <Card className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white ring-2 ring-[#f6d57f] scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#f6d57f] text-[#262626] px-4 py-2">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#262626]">
                  Full Member
                </CardTitle>
                <div className="text-4xl font-bold text-[#f6d57f]">
                  R599<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600">
                  Complete aviation experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">All Student benefits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Unlimited aircraft access
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority booking system</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Maintenance workshops</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Insurance group rates</span>
                </div>
                <Button className="w-full mt-6 bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  Join Full Member
                </Button>
              </CardContent>
            </Card>

            {/* Premium Membership */}
            <Card className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#262626]">
                  Premium Member
                </CardTitle>
                <div className="text-4xl font-bold text-[#f6d57f]">
                  R899<span className="text-lg text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600">
                  Ultimate aviation privileges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    All Full Member benefits
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Exclusive aircraft access
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">
                    Personal flight planning
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">VIP event access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Guest privileges</span>
                </div>
                <Button className="w-full mt-6 bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
                  Join Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our community about their PMB Aero Club experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#f6d57f] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Joining PMB Aero Club was the best decision I made for my
                  aviation career. The community is incredible and the
                  facilities are top-notch."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f6d57f] rounded-full mr-3 flex items-center justify-center">
                    <span className="text-[#262626] font-semibold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Sarah Johnson
                    </div>
                    <div className="text-sm text-gray-600">
                      Commercial Pilot
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#f6d57f] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The training programs and workshops have helped me advance my
                  skills significantly. Great value for money!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f6d57f] rounded-full mr-3 flex items-center justify-center">
                    <span className="text-[#262626] font-semibold">MC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Michael Chen
                    </div>
                    <div className="text-sm text-gray-600">
                      Flight Instructor
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#f6d57f] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "As a student pilot, the support and resources available here
                  are unmatched. I've made friends for life in this club."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#f6d57f] rounded-full mr-3 flex items-center justify-center">
                    <span className="text-[#262626] font-semibold">DT</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      David Thompson
                    </div>
                    <div className="text-sm text-gray-600">Student Pilot</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#262626] via-[#1a1a1a] to-[#262626]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-[#262626] mb-6">
              Ready to Take Flight?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join PMB Aero Club today and become part of an exclusive aviation
              community that will elevate your flying experience to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="text-lg bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                Start Your Application
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="text-lg border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white"
              >
                Contact Us
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No commitment required • Cancel anytime • 30-day money-back
              guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
