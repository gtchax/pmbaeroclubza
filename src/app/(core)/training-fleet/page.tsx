"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plane,
  Download,
  FileText,
  Gauge,
  Radio,
  Navigation,
  Users,
  Calendar,
  MapPin,
  Shield,
  Star,
  Zap,
  Settings,
  Phone,
  Clock,
  Fuel,
  Eye,
  ChevronDown,
  ChevronUp,
  Award,
  Target,
  ExternalLink,
} from "lucide-react";

export default function TrainingFleetPage() {
  const [expandedAircraft, setExpandedAircraft] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const toggleAircraftDetails = (id: string) => {
    setExpandedAircraft(expandedAircraft === id ? null : id);
  };

  const fleet = [
    {
      id: "zu-wes",
      registration: "ZU-WES",
      type: "Sling 2",
      image: "/wes.jpg",
      model: "SLG2 (previously X333)",
      engine: "912ULS twin carb Rotax motor",
      propeller: "Ground Adjustable Propeller",
      avionics: "Dual EFIS system with MGL VHF Radio",
      status: "Most Popular Training Aircraft",
      features: [
        "Dual EFIS",
        "Ground Adjustable Propeller",
        "Modern Glass Cockpit",
        "Twin Carburetors",
        "LSA Category",
      ],
      trainingTypes: ["Ab Initio", "PPL Training", "LSA Training"],
      description:
        "This SLG2, (previously called an X333), has a 912ULS twin carb Rotax motor with a Ground Adjustable Propeller, and dual EFIS system. It is our most popular training aircraft for ab initio, PPL & LSA training.",
      specifications: {
        maxSpeed: "185 km/h",
        cruiseSpeed: "165 km/h",
        range: "1,100 km",
        fuelCapacity: "100L",
        maxWeight: "600 kg",
        seats: "2",
      },
      downloads: [
        {
          name: "Sling2 POH",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_1a58651f491d4515b63a806a88525a67.pdf",
        },
        {
          name: "MGL VHF Radio User's Manual",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_bae04bd4b2d04799b33b77d9c9c38305.pdf",
        },
      ],
    },
    {
      id: "zu-saa",
      registration: "ZU-SAA",
      type: "Sling 2",
      image: "/wu.jpg",
      model: "SLG2",
      engine: "912ULS Rotax motor",
      propeller: "Ground Adjustable Propeller",
      avionics: "Dual EFIS system with Garmin VHF",
      status: "Training Aircraft",
      features: [
        "Dual EFIS",
        "Garmin VHF Radio",
        "Modern Avionics",
        "LSA Category",
        "Fuel Efficient",
      ],
      trainingTypes: ["PPL Training", "LSA Training", "Cross Country"],
      description:
        "Our second Sling 2 aircraft featuring modern avionics and efficient Rotax engine, perfect for advanced training and cross-country flights.",
      specifications: {
        maxSpeed: "185 km/h",
        cruiseSpeed: "165 km/h",
        range: "1,100 km",
        fuelCapacity: "100L",
        maxWeight: "600 kg",
        seats: "2",
      },
      downloads: [
        {
          name: "Sling2 POH",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_1a58651f491d4515b63a806a88525a67.pdf",
        },
        {
          name: "Garmin VHF Radio User's Manual",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_f0476a30557345b09d29f433998ccbab.pdf",
        },
      ],
    },
    {
      id: "zs-kni",
      registration: "ZS-KNI",
      type: "Cessna 172",
      image: "/slin.jpg",
      model: "C172-N with P-model engine",
      engine: "Lycoming O-360 (P-model)",
      propeller: "Fixed Pitch",
      avionics: "Garmin 650 VHF Radio/GPS",
      status: "Proven Training Aircraft",
      features: [
        "Garmin 650 GPS/VHF",
        "Traditional Instruments",
        "Proven Design",
        "High Wing Configuration",
        "Spacious Cabin",
      ],
      trainingTypes: [
        "Foundation Training",
        "PPL Training",
        "Instrument Training",
      ],
      description:
        "ZS-KNI is a C172-N with P-model engine. She is still an N-model. This proven aircraft provides excellent foundation training with modern GPS navigation.",
      specifications: {
        maxSpeed: "230 km/h",
        cruiseSpeed: "200 km/h",
        range: "1,400 km",
        fuelCapacity: "212L",
        maxWeight: "1,157 kg",
        seats: "4",
      },
      downloads: [
        {
          name: "C172 POH",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_cceb6d6661874a64a935ef69223decdf.pdf",
        },
        {
          name: "Garmin 650 VHF Radio/GPS User's Manual",
          type: "pdf",
          url: "https://www.pmbaeroclub.co.za/_files/ugd/c3e860_ce953e89499949f48ca757b867db667d.pdf",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    if (status.includes("Most Popular")) return "bg-[#f6d57f] text-[#262626]";
    if (status.includes("Proven")) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  const filteredFleet =
    selectedFilter === "all"
      ? fleet
      : fleet.filter((aircraft) =>
          selectedFilter === "sling"
            ? aircraft.type === "Sling 2"
            : aircraft.type === "Cessna 172"
        );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#262626] via-gray-900 to-black">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-[#262626] via-[#1a1a1a] to-[#262626] text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f6d57f]/5 to-transparent animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="bg-[#f6d57f] text-[#262626] mb-6 text-sm font-medium px-4 py-2 shadow-lg">
                <Award className="h-4 w-4 mr-2" />
                SACAA/1169/ATO - Part 141 Approved
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#f6d57f] to-white bg-clip-text text-transparent"
            >
              Our Training Fleet
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              The Club boasts THREE training aircraft, including two modern
              Sling 2's, and a proven C172, and specialize in foundation
              training.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { id: "all", label: "All Aircraft", icon: Plane },
                { id: "sling", label: "Sling 2", icon: Zap },
                { id: "cessna", label: "Cessna 172", icon: Shield },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  onClick={() => setSelectedFilter(id)}
                  variant={selectedFilter === id ? "default" : "outline"}
                  className={`${
                    selectedFilter === id
                      ? "bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
                      : "border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]"
                  } transition-all duration-300 shadow-lg`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: Plane,
              value: "3",
              label: "Training Aircraft",
              color: "bg-[#f6d57f]",
              textColor: "text-[#262626]",
            },
            {
              icon: Zap,
              value: "2",
              label: "Modern Sling 2's",
              color: "bg-gradient-to-br from-[#f6d57f] to-[#f4d06a]",
              textColor: "text-[#262626]",
            },
            {
              icon: Shield,
              value: "1",
              label: "Proven C172",
              color: "bg-gradient-to-br from-[#262626] to-gray-800",
              textColor: "text-white",
            },
            {
              icon: Star,
              value: "100%",
              label: "Foundation Training",
              color: "bg-gradient-to-br from-[#f6d57f]/80 to-[#f4d06a]/80",
              textColor: "text-[#262626]",
            },
          ].map(({ icon: Icon, value, label, color, textColor }, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <Icon className={`h-8 w-8 ${textColor}`} />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#f6d57f] transition-colors duration-300">
                    {value}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {filteredFleet.map((aircraft, index) => (
            <motion.div key={aircraft.id} variants={itemVariants}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group hover:scale-[1.02]">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f6d57f]/20 via-transparent to-[#262626]/30 z-10"></div>
                    <Image
                      src={aircraft.image}
                      alt={`${aircraft.registration} - ${aircraft.type}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-6 left-6 bg-gradient-to-r from-[#262626]/90 to-black/70 text-white px-4 py-3 rounded-xl backdrop-blur-sm z-20 shadow-xl"
                    >
                      <p className="text-xl font-bold">
                        {aircraft.registration}
                      </p>
                      <p className="text-sm opacity-90">{aircraft.type}</p>
                    </motion.div>

                    <motion.button
                      onClick={() => toggleAircraftDetails(aircraft.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-6 right-6 bg-[#f6d57f] text-[#262626] px-4 py-2 rounded-xl font-semibold shadow-lg hover:bg-[#f4d06a] transition-colors duration-300 z-20 flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedAircraft === aircraft.id
                        ? "Less Details"
                        : "View Details"}
                      {expandedAircraft === aircraft.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>

                  <div className="p-8">
                    <CardHeader className="px-0 pt-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <CardTitle className="text-3xl text-white mb-2 font-bold">
                            {aircraft.registration}
                          </CardTitle>
                          <CardDescription className="text-lg text-gray-300">
                            {aircraft.model}
                          </CardDescription>
                        </div>
                        <Badge
                          className={`${getStatusColor(aircraft.status)} text-sm px-3 py-1 shadow-lg`}
                        >
                          {aircraft.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-0">
                      <p className="text-gray-300 mb-6 leading-relaxed text-base">
                        {aircraft.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#f6d57f]/20 to-[#f4d06a]/10 rounded-xl border border-[#f6d57f]/20 backdrop-blur-sm"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Settings className="h-5 w-5 text-[#262626]" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm mb-1">
                              Engine
                            </p>
                            <p className="text-sm text-gray-300">
                              {aircraft.engine}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#262626]/20 to-gray-800/10 rounded-xl border border-[#262626]/20 backdrop-blur-sm"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-[#262626] to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Gauge className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm mb-1">
                              Propeller
                            </p>
                            <p className="text-sm text-gray-300">
                              {aircraft.propeller}
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start gap-3 mb-6 p-4 bg-gradient-to-br from-[#f6d57f]/20 to-[#f4d06a]/10 rounded-xl border border-[#f6d57f]/20 backdrop-blur-sm"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#f6d57f] to-[#f4d06a] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Radio className="h-5 w-5 text-[#262626]" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm mb-1">
                            Avionics
                          </p>
                          <p className="text-sm text-gray-300">
                            {aircraft.avionics}
                          </p>
                        </div>
                      </motion.div>

                      <div className="mb-6">
                        <p className="font-semibold text-white mb-3 text-base flex items-center gap-2">
                          <Star className="h-4 w-4 text-[#f6d57f]" />
                          Key Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aircraft.features.slice(0, 4).map((feature, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300"
                              >
                                {feature}
                              </Badge>
                            </motion.div>
                          ))}
                          {aircraft.features.length > 4 && (
                            <Badge
                              variant="outline"
                              className="text-sm px-3 py-1 border-[#f6d57f] text-[#f6d57f]"
                            >
                              +{aircraft.features.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="font-semibold text-white mb-3 text-base flex items-center gap-2">
                          <Target className="h-4 w-4 text-[#f6d57f]" />
                          Training Types
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {aircraft.trainingTypes.map((type, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge className="bg-gradient-to-r from-[#f6d57f] to-[#f4d06a] text-[#262626] text-sm px-3 py-1 shadow-lg font-medium">
                                {type}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedAircraft === aircraft.id ? "auto" : 0,
                          opacity: expandedAircraft === aircraft.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {expandedAircraft === aircraft.id && (
                          <div className="mb-6">
                            <Separator className="my-4 bg-white/20" />
                            <p className="font-semibold text-white mb-4 text-base flex items-center gap-2">
                              <Gauge className="h-4 w-4 text-[#f6d57f]" />
                              Technical Specifications
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {[
                                {
                                  label: "Max Speed",
                                  value: aircraft.specifications.maxSpeed,
                                  icon: Zap,
                                },
                                {
                                  label: "Cruise Speed",
                                  value: aircraft.specifications.cruiseSpeed,
                                  icon: Navigation,
                                },
                                {
                                  label: "Range",
                                  value: aircraft.specifications.range,
                                  icon: MapPin,
                                },
                                {
                                  label: "Fuel Capacity",
                                  value: aircraft.specifications.fuelCapacity,
                                  icon: Fuel,
                                },
                                {
                                  label: "Max Weight",
                                  value: aircraft.specifications.maxWeight,
                                  icon: Settings,
                                },
                                {
                                  label: "Seats",
                                  value: aircraft.specifications.seats,
                                  icon: Users,
                                },
                              ].map(({ label, value, icon: Icon }, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icon className="h-4 w-4 text-[#f6d57f]" />
                                    <span className="text-sm text-gray-300">
                                      {label}
                                    </span>
                                  </div>
                                  <p className="text-white font-semibold">
                                    {value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>

                      <div className="pt-4 border-t border-white/20">
                        <p className="font-semibold text-white mb-3 text-base flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#f6d57f]" />
                          Documentation
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {aircraft.downloads.map((doc, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-sm h-10 border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626] transition-all duration-300"
                                onClick={() => window.open(doc.url, "_blank")}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                {doc.name}
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Button>
                            </motion.div>
                          ))}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-sm h-10 border-white/30 text-white hover:bg-white hover:text-[#262626] transition-all duration-300"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Aircraft Technical
                            </Button>
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Collect your Aircraft Technical from your Flight
                          Instructor
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[#f6d57f] to-[#f4d06a] text-[#262626] border-0 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Start Your Training?
              </h2>
              <p className="text-base mb-6 opacity-90">
                Experience professional flight training with our modern,
                well-maintained fleet
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="default"
                  className="bg-[#262626] text-white hover:bg-[#1a1a1a] shadow-lg"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Training Flight
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call +27 (0)33 386 3952
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
