"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Phone, 
  Mail, 
  Award, 
  ChevronDown 
} from "lucide-react";

interface HeroProps {
  onScrollChange?: (isScrolled: boolean) => void;
}

export default function Hero({ onScrollChange }: HeroProps) {
  const [, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      onScrollChange?.(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollChange]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/demo.webp"
      >
        <source src="/file.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#262626] to-black" />
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/logo.webp"
              alt="PMB Aero Club"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Certification Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <Badge className="bg-[#f6d57f]/90 text-[#262626] text-sm font-semibold px-4 py-2 shadow-xl backdrop-blur-sm">
            <Award className="h-4 w-4 mr-2" />
            SACAA/1169/ATO - Part 141 Approved
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-[#f6d57f] to-white bg-clip-text text-transparent">
            Pietermaritzburg
          </span>
          <br />
          <span className="text-white drop-shadow-lg">
            Aero Club
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-3xl leading-relaxed text-gray-100 drop-shadow-lg"
        >
          Your gateway to the skies. Professional flight training, aircraft hire, 
          and aviation excellence since our founding.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Button
            size="lg"
            className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a] font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Training Flight
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-[#262626] font-semibold px-8 py-4 text-lg shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <Phone className="h-5 w-5 mr-2" />
            Contact Us
          </Button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-6 text-gray-200 mb-8"
        >
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+27 (0)33 386 3952</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>info@pmbaeroclub.co.za</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-[#f6d57f] transition-colors duration-300 group"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Discover More</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}
