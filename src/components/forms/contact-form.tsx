"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, Send, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  interest: z.enum([
    "flight-training",
    "club-membership",
    "aircraft-rental",
    "discovery-flight",
    "general",
  ]),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const interestOptions = [
  { value: "flight-training", label: "Flight Training" },
  { value: "club-membership", label: "Club Membership" },
  { value: "aircraft-rental", label: "Aircraft Rental" },
  { value: "discovery-flight", label: "Discovery Flight" },
  { value: "general", label: "General Inquiry" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form data:", data);
    setIsSubmitted(true);
    reset();
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="text-center border-0 bg-white shadow-lg">
        <CardContent className="pt-6">
          <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-[#262626]" />
          </div>
          <h3 className="text-xl font-semibold text-[#262626] mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for contacting PMB Aero Club. We&apos;ll get back to you
            within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-[#262626]">
          <Plane className="h-5 w-5 text-[#f6d57f]" />
          <span>Contact Us</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#262626] mb-2"
              >
                First Name *
              </label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-[#262626] mb-2"
              >
                Last Name *
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#262626] mb-2"
              >
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#262626] mb-2"
              >
                Phone Number *
              </label>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Interest Field */}
          <div>
            <label
              htmlFor="interest"
              className="block text-sm font-medium text-[#262626] mb-2"
            >
              What are you interested in? *
            </label>
            <select
              {...register("interest")}
              id="interest"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
            >
              <option value="">Select an option</option>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.interest && (
              <p className="text-red-600 text-sm mt-1">
                {errors.interest.message}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[#262626] mb-2"
            >
              Subject *
            </label>
            <input
              {...register("subject")}
              type="text"
              id="subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors"
              placeholder="Brief description of your inquiry"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#262626] mb-2"
            >
              Message *
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f6d57f] focus:border-[#f6d57f] transition-colors resize-none"
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#262626] border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
