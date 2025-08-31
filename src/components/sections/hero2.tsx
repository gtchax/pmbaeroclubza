"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plane, Award, Users, MapPin } from "lucide-react"
import Link from "next/link"

const trustIndicators = [
  { icon: Award, text: "Est. 1938", value: "85+ Years" },
  { icon: Users, text: "Certified Instructors", value: "Expert Team" },
  { icon: MapPin, text: "Pietermaritzburg Airport", value: "Prime Location" },
]

export function Hero2() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-[#262626]/90">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#f6d57f]">Established in 1938</span>
              <br />
              Where Aviation Dreams Take Flight
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional flight training in a relaxed environment. From dream to license - we&apos;ll get you there.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" asChild className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]">
              <Link href="/flight-school" className="flex items-center space-x-2">
                <Plane className="h-5 w-5" />
                <span>Start Flying Today</span>
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-[#262626]">
              <Link href="/aero-club">Join Our Club</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f6d57f]/20 rounded-full">
                  <indicator.icon className="h-8 w-8 text-[#f6d57f]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#f6d57f]">{indicator.value}</p>
                  <p className="text-gray-300">{indicator.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
