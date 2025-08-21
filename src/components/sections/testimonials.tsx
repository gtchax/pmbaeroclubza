"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Private Pilot",
    image: "/testimonials/sarah.jpg",
    content:
      "PMB Aero Club made my dream of flying a reality. The instructors are incredibly patient and knowledgeable. I felt safe and confident throughout my entire training journey.",
    rating: 5,
    program: "Private Pilot License",
    year: "2023",
  },
  {
    name: "Michael Chen",
    role: "Commercial Pilot",
    image: "/testimonials/michael.jpg",
    content:
      "From my first discovery flight to earning my commercial license, the team at PMB Aero Club has been exceptional. The quality of training and the supportive community is unmatched.",
    rating: 5,
    program: "Commercial Pilot License",
    year: "2022",
  },
  {
    name: "Emma Thompson",
    role: "Student Pilot",
    image: "/testimonials/emma.jpg",
    content:
      "As a complete beginner, I was nervous about learning to fly. But the instructors here are amazing - they break down complex concepts into simple terms and make learning fun.",
    rating: 5,
    program: "Private Pilot License",
    year: "2024",
  },
  {
    name: "David Rodriguez",
    role: "Instrument Rated Pilot",
    image: "/testimonials/david.jpg",
    content:
      "The instrument rating course was challenging but incredibly rewarding. The instructors&apos; expertise and the club&apos;s commitment to safety gave me confidence in all weather conditions.",
    rating: 5,
    program: "Instrument Rating",
    year: "2023",
  },
  {
    name: "Lisa Park",
    role: "Night Rated Pilot",
    image: "/testimonials/lisa.jpg",
    content:
      "Getting my night rating was a fantastic experience. The instructors are thorough and ensure you&apos;re completely comfortable before solo night flights. Highly recommended!",
    rating: 5,
    program: "Night Rating",
    year: "2024",
  },
  {
    name: "James Wilson",
    role: "Club Member",
    image: "/testimonials/james.jpg",
    content:
      "I&apos;ve been a club member for over 10 years and it&apos;s like a second family. The social events, fly-ins, and the sense of community make this place special.",
    rating: 5,
    program: "Club Membership",
    year: "2014",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
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
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from the pilots we&apos;ve trained and the community we&apos;ve built
            over 85+ years of aviation excellence.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full relative group hover:shadow-lg transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#f6d57f] rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-[#262626]" />
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[#262626]">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {testimonial.role} • {testimonial.program} •{" "}
                        {testimonial.year}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {testimonial.content}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#f6d57f] text-[#f6d57f]"
                      />
                    ))}
                  </div>
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
              Join Our Success Stories
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to start your aviation journey? Book a discovery flight and
              experience the PMB Aero Club difference firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#f6d57f] text-[#262626] font-semibold rounded-lg hover:bg-[#f4d06a] transition-colors"
              >
                Book Discovery Flight
              </a>
              <a
                href="/flight-school"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#f6d57f] text-[#f6d57f] font-semibold rounded-lg hover:bg-[#f6d57f] hover:text-[#262626] transition-colors"
              >
                View Training Programs
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
