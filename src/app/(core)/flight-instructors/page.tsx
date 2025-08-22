"use client";

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
  Users,
  Award,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Star,
  Shield,
  BookOpen,
  Plane,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function FlightInstructorsPage() {
  const instructors = [
    {
      id: "telani-lithgow",
      name: "TELANI LITHGOW",
      image: "/instructors/telani1.png",
      role: "Chief Flight Instructor - GII",
      grade: "GII",
      gradeLabel: "Grade II",
      description:
        'Telani is a Career Flight Instructor with a passion for ab-initio flight training. She is the author of the "Flight Training Made Simple" series.',
      website: "www.flight-training-made-simple.com",
      websiteUrl: "https://www.flight-training-made-simple.com",
      specializations: [
        "Ab-initio Training",
        "Career Flight Instruction",
        "Flight Training Author",
      ],
      availability: "Full Time",
      experience: "Career Flight Instructor",
      achievements: [
        "Author of Flight Training Made Simple series",
        "Chief Flight Instructor",
      ],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
    },
    {
      id: "john-campbell",
      name: "JOHN CAMPBELL",
      image: "/instructors/john_edited.png",
      role: "DFE - I",
      grade: "DFE",
      gradeLabel: "Designated Flight Examiner",
      description:
        "John is a Designated Flight Examiner and a Captain for South African Airways. He began his journey at Pmb Aero Club, and regularly does CPL and ATPL initial licenses and renewals, Instructor Ratings, and conversions.",
      specializations: [
        "Designated Flight Examiner",
        "CPL Training",
        "ATPL Training",
        "Instructor Ratings",
        "License Conversions",
      ],
      availability: "By Appointment",
      experience: "Captain - South African Airways",
      achievements: [
        "Designated Flight Examiner",
        "Commercial Airline Captain",
        "Pmb Aero Club Alumni",
      ],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
    },
    {
      id: "kevin-donnellan",
      name: "KEVIN DONNELLAN",
      image: "/instructors/kevin-donnellan.jpeg",
      role: "Flight Instructor - GII",
      grade: "GII",
      gradeLabel: "Grade II",
      description:
        "Kevin Donnellan is a helicopter and fixed wing pilot. He flies for the police and is available every second week on Tuesdays and Wednesdays for Flight Instruction.",
      specializations: [
        "Helicopter Training",
        "Fixed Wing Training",
        "Police Aviation",
      ],
      availability: "Every Second Week - Tuesdays & Wednesdays",
      experience: "Police Aviation Pilot",
      achievements: [
        "Helicopter & Fixed Wing Pilot",
        "Police Aviation Experience",
      ],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
    },
    {
      id: "sanele-ndlovu",
      name: "SANELE NDLOVU",
      image: "/instructors/sanele.jpg",
      role: "Flight Instructor - GIII",
      grade: "GIII",
      gradeLabel: "Grade III",
      description:
        "Sanele is available Sunday to Thursdays 8am to 5pm, earlier by arrangement. He trained at 43 Air School in Port Alfred. He is a charismatic young instructor always willing to go the extra mile for his students.",
      specializations: [
        "Student Training",
        "Flexible Scheduling",
        "Student Support",
      ],
      availability: "Sunday to Thursday, 8am to 5pm (Earlier by arrangement)",
      experience: "43 Air School Graduate",
      achievements: [
        "Trained at 43 Air School Port Alfred",
        "Student-focused Instruction",
      ],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
    },
    {
      id: "jason-everard",
      name: "JASON EVERARD",
      image: "/instructors/img_1027_edited_edited.jpg",
      role: "Flight Instructor - GII",
      grade: "GII",
      gradeLabel: "Grade II",
      description:
        "Jason Everard is a part time Grade II Flight Instructor for the Club. He recently joined Safair and occasionally flies Charter. Jason specialises in instrument and twin training. Lessons booked with Jason are by prior arrangement.",
      specializations: [
        "Instrument Training",
        "Twin Training",
        "Part-time Instruction",
      ],
      availability: "By Prior Arrangement",
      experience: "Safair Pilot, Charter Operations",
      achievements: [
        "Grade II Flight Instructor",
        "Commercial Aviation Experience",
      ],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
    },
    {
      id: "position-vacant",
      name: "POSITION VACANT",
      image: "/instructors/tom-cruise-flying.jpg",
      role: "Flight Instructor - GIII",
      grade: "GIII",
      gradeLabel: "Grade III",
      description: "This position is presently vacant",
      specializations: ["Position Available", "Grade III Level"],
      availability: "Not Available",
      experience: "Position Open",
      achievements: ["Opportunity for New Instructor"],
      contact: {
        email: "info@pmbaeroclub.co.za",
        phone: "+27 (0)33 386 3952",
      },
      isVacant: true,
    },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "GII":
        return "bg-[#f6d57f] text-[#262626]";
      case "GIII":
        return "bg-blue-100 text-blue-800";
      case "DFE":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case "GII":
        return <Star className="h-5 w-5" />;
      case "GIII":
        return <GraduationCap className="h-5 w-5" />;
      case "DFE":
        return <Award className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#262626] to-[#1a1a1a] text-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <Badge className="bg-[#f6d57f] text-[#262626] mb-4 text-sm font-medium">
              SACAA/1169/ATO - Part 141 Approved
            </Badge>
            <h1 className="text-5xl font-bold mb-6">Our Flight Instructors</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet our experienced team of certified flight instructors, each
              bringing unique expertise and a passion for aviation to help you
              achieve your flying dreams.
            </p>
          </div>
        </div>
      </div>

      {/* Instructor Statistics */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">5</h3>
              <p className="text-white/90 text-sm">Active Instructors</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">1</h3>
              <p className="text-white/90 text-sm">
                Designated Flight Examiner
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">3</h3>
              <p className="text-white/90 text-sm">Grade II Instructors</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">1</h3>
              <p className="text-white/90 text-sm">Grade III Instructor</p>
            </CardContent>
          </Card>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <Card
              key={instructor.id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-0"
            >
              {/* Instructor Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                {instructor.isVacant ? (
                  <div className="text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg font-semibold text-gray-500">
                      Position Available
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      Instructor Photo
                    </p>
                  </div>
                )}

                {/* Grade Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`${getGradeColor(instructor.grade)} text-xs px-2 py-1`}
                  >
                    <div className="flex items-center gap-1">
                      {getGradeIcon(instructor.grade)}
                      {instructor.gradeLabel}
                    </div>
                  </Badge>
                </div>
              </div>

              {/* Instructor Details */}
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[#262626] mb-1">
                  {instructor.name}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-[#f6d57f]">
                  {instructor.role}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Description */}
                <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">
                  {instructor.description}
                </p>

                {/* Specializations */}
                <div>
                  <p className="font-semibold text-[#262626] mb-2 text-xs">
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.specializations.slice(0, 3).map((spec, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {spec}
                      </Badge>
                    ))}
                    {instructor.specializations.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{instructor.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Availability */}
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#262626] text-xs">
                        Availability
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {instructor.availability}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#262626] text-xs">
                        Experience
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {instructor.experience}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Website Link for Telani */}
                {instructor.website && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-8"
                      onClick={() =>
                        window.open(instructor.websiteUrl, "_blank")
                      }
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Website
                    </Button>
                  </div>
                )}

                {/* Contact Information */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{instructor.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{instructor.contact.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-[#262626] flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                Instructor Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Grade II (GII)
                    </h4>
                    <p className="text-xs text-gray-600">
                      Senior instructors with extensive experience in flight
                      training and advanced instruction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Grade III (GIII)
                    </h4>
                    <p className="text-xs text-gray-600">
                      Qualified instructors for basic flight training and
                      student pilot instruction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Designated Flight Examiner (DFE)
                    </h4>
                    <p className="text-xs text-gray-600">
                      Authorized to conduct flight tests and issue licenses for
                      various pilot categories.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-[#262626] flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                Training Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-[#f6d57f] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Ab-initio Training
                    </h4>
                    <p className="text-xs text-gray-600">
                      Complete beginner training from first flight to solo and
                      beyond.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      Advanced Training
                    </h4>
                    <p className="text-xs text-gray-600">
                      Instrument rating, twin-engine, and commercial pilot
                      training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-[#262626] text-sm">
                      License Renewals
                    </h4>
                    <p className="text-xs text-gray-600">
                      CPL, ATPL renewals and instructor rating conversions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-[#f6d57f] to-[#f4d06a] text-[#262626] border-0 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Start Learning?
              </h2>
              <p className="text-base mb-6 opacity-90">
                Book a lesson with one of our experienced instructors and begin
                your aviation journey
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="default"
                  className="bg-[#262626] text-white hover:bg-[#1a1a1a] shadow-lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Lesson
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white shadow-lg"
                >
                  <Plane className="h-4 w-4 mr-2" />
                  View Training Fleet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
