import { ContactForm } from "@/components/forms/contact-form";
// import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Plane,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    details: "+27 33 123 4567",
    description: "Call us during office hours",
    action: "Call Now",
    href: "tel:+27331234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@pmbaeroclub.co.za",
    description: "We&apos;ll respond within 24 hours",
    action: "Send Email",
    href: "mailto:info@pmbaeroclub.co.za",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Pietermaritzburg Airport",
    description: "Oribi, Pietermaritzburg, South Africa",
    action: "Get Directions",
    href: "#",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Mon-Fri: 8:00 AM - 5:00 PM",
    description: "Sat: 8:00 AM - 1:00 PM",
    action: "Book Appointment",
    href: "/contact",
  },
];

const quickActions = [
  {
    title: "Book Discovery Flight",
    description: "Experience flying firsthand with our experienced instructors",
    icon: Plane,
    href: "/contact",
    color: "bg-[#f6d57f] text-[#262626]",
  },
  {
    title: "Schedule Training",
    description: "Book your flight training sessions and ground school",
    icon: Calendar,
    href: "/flight-school",
    color: "bg-[#262626] text-white",
  },
  {
    title: "Join Our Club",
    description: "Become a member of our aviation community",
    icon: Users,
    href: "/aero-club",
    color: "border-[#f6d57f] text-[#f6d57f]",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#262626] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Ready to start your aviation journey? Have questions about our
              programs? We&apos;re here to help you take flight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="#contact-form">Send Message</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-[#262626]"
              >
                <Link href="#quick-actions">Quick Actions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. We&apos;re here to help
              with all your aviation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <div key={method.title}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f]/20 rounded-full mb-4">
                      <method.icon className="h-8 w-8 text-[#f6d57f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#262626] mb-2">
                      {method.title}
                    </h3>
                    <p className="text-lg font-medium text-[#262626] mb-2">
                      {method.details}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {method.description}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={method.href}>{method.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section id="quick-actions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Quick Actions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started quickly with these common actions and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action) => (
              <div key={action.title}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${action.color}`}
                    >
                      <action.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#262626] mb-3">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{action.description}</p>
                    <Button asChild className="w-full">
                      <Link href={action.href}>Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a specific question or want to discuss your aviation goals?
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Visit Our Club
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located at Pietermaritzburg Airport, we&apos;re easily accessible
              and ready to welcome you to our aviation family.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#262626] mb-4">
                  Pietermaritzburg Airport (Oribi)
                </h3>
                <p className="text-gray-600 mb-6">
                  Our club is conveniently located at Pietermaritzburg Airport,
                  providing easy access for students and members from the
                  greater Pietermaritzburg area.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#f6d57f] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#262626]">Address</h4>
                    <p className="text-gray-600">
                      Pietermaritzburg Airport
                      <br />
                      Oribi, Pietermaritzburg
                      <br />
                      KwaZulu-Natal, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[#f6d57f] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#262626]">
                      Operating Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 8:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed (Emergency contacts available)
                    </p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="#contact-form">Book Your Visit</Link>
              </Button>
            </div>

            <div>
              <Card>
                <CardContent className="p-0">
                  <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-medium">
                        Interactive Map Coming Soon
                      </p>
                      <p className="text-sm">
                        Pietermaritzburg Airport, Oribi, South Africa
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
