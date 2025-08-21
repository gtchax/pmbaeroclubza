'use client';

import { JSX, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  ChevronUp,
  Plane,
  Clock,
  Users,
  FileText,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  GraduationCap,
  Award,
  MapPin,
  AlertCircle
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string | JSX.Element;
  category: string;
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: 'trial-lesson',
      category: 'Getting Started',
      question: "What's a Trial Lesson?",
      answer: (
        <div className="space-y-4">
          <p>If you have never flown before, it is an excellent idea to start with a Trial Lesson.</p>
          <p>The total experience takes about an hour and includes a briefing on how the basic controls work and a short flight where you will handle the flight controls in flight, under the guidance and protection of your Flight Instructor.</p>
          <p>This experience is guaranteed to give you clarity as to whether flying is something that you'd want to pursue or alternatively, a realistic adventure into the world of aviation.</p>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f]">
            <h4 className="text-[#f6d57f] font-semibold mb-2">Pricing:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Sling 2 (two-seater): <span className="text-[#f6d57f]">R1,523.75</span></li>
              <li>• Cessna 172 (larger aircraft): <span className="text-[#f6d57f]">R1,868.75</span></li>
            </ul>
            <p className="text-sm text-gray-400 mt-2">Payment via EFT or card upon arrival. Non-refundable but can be rescheduled due to weather or maintenance.</p>
          </div>
          <p>It's possible to purchase this experience as a gift for a loved one. Contact us during office hours to book at <span className="text-[#f6d57f]">033 386 3952</span> or via WhatsApp on <span className="text-[#f6d57f]">082 854 9124</span>.</p>
        </div>
      )
    },
    {
      id: 'ppl-requirements',
      category: 'Licenses',
      question: "What's in the Private Pilot's License (PPL)?",
      answer: (
        <div className="space-y-4">
          <p>This license is your first and mandatory license in your aviation journey. It allows you to fly your friends and family around in any aircraft that you hold a rating on.</p>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f]">
            <h4 className="text-[#f6d57f] font-semibold mb-3">Minimum Requirements:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>45 hours of Flight Training (30 dual and 15 solo)</span>
              </li>
              <li className="flex items-start space-x-2">
                <FileText className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>8x written SACAA exams (Airlaw, Human Performance, Principles of Flight, Restricted Radio, Meteorology, Aircraft Technical and General, Navigation and Flight Planning)</span>
              </li>
              <li className="flex items-start space-x-2">
                <MessageSquare className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>A Restricted Radio License (1x written exam, online course, in-person oral assessment)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>Class 2 Aviation Medical (from designated aviation medical examiner)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>17 years of age (can begin training at 16)</span>
              </li>
              <li className="flex items-start space-x-2">
                <GraduationCap className="w-4 h-4 text-[#f6d57f] mt-0.5 flex-shrink-0" />
                <span>English proficiency level 6 on National Senior Certificate or completed oral assessment</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#262626] p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Cost & Duration:</h4>
            <p className="text-sm text-gray-300">Most people take between 55-65 hours (though minimum is 45). Course costs range from <span className="text-[#f6d57f]">R180,000 to R230,000</span>.</p>
            <p className="text-sm text-gray-300 mt-2">We recommend flying no less than once every 10 days to maintain currency.</p>
          </div>
        </div>
      )
    },
    {
      id: 'matric-subjects',
      category: 'Requirements',
      question: "What Matric subjects are required?",
      answer: (
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
            <p className="text-green-400 font-semibold">Good news! There are no formal subject requirements to obtain a pilot's license with PMB Aero Club.</p>
          </div>
          <p>We recommend taking geography, physical sciences and core maths as these give you a good foundation to begin your theoretical training. However, we have had many students (including home-schoolers) who have not taken these subjects and handled their PPL ground school and exams with ease.</p>
        </div>
      )
    },
    {
      id: 'age-requirements',
      category: 'Requirements',
      question: "Minimum & Maximum Flying Age",
      answer: (
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f]">
            <h4 className="text-[#f6d57f] font-semibold mb-3">Age Requirements by License:</h4>
            <ul className="space-y-2 text-sm">
              <li>• <span className="text-[#f6d57f]">15 years:</span> Start flight training</li>
              <li>• <span className="text-[#f6d57f]">16 years:</span> Fly solo</li>
              <li>• <span className="text-[#f6d57f]">17 years:</span> PPL flight test (Private Pilot License)</li>
              <li>• <span className="text-[#f6d57f]">18 years:</span> CPL flight test (Commercial Pilot License)</li>
              <li>• <span className="text-[#f6d57f]">21 years:</span> ATPL flight test (Airline Transport Pilot License)</li>
            </ul>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
            <p className="text-green-400">As long as you pass your aviation medical, there is no upper age limit.</p>
          </div>
        </div>
      )
    },
    {
      id: 'cpl-requirements',
      category: 'Licenses',
      question: "CPL & PPL Requirements",
      answer: (
        <div className="space-y-4">
          <p>If you're wanting to work full time in aviation, you will need to complete the following to obtain your CPL:</p>
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f]">
            <h4 className="text-[#f6d57f] font-semibold mb-3">CPL Requirements:</h4>
            <ul className="space-y-2 text-sm">
              <li>• A private pilot's license</li>
              <li>• Class 1 Medical</li>
              <li>• 8x CPL Examinations</li>
              <li>• A General Radio License</li>
              <li>• A Night Rating</li>
              <li>• Various hour requirements depending on the type of CPL</li>
            </ul>
          </div>
          <div className="bg-[#262626] p-4 rounded-lg">
            <p className="text-sm text-gray-300">You can work towards either a VFR (Visual Flight Rules) or IFR (Instrument Flight Rules) CPL. We highly recommend the IFR CPL course as you will be more "hire-able" as a low time commercial pilot with this qualification.</p>
          </div>
        </div>
      )
    },
    {
      id: 'contact-info',
      category: 'Contact',
      question: "What's Next? How do I get started?",
      answer: (
        <div className="space-y-4">
          <p>To begin your flying journey with us or to simply enquire further, please don't hesitate to contact us via:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f] text-center">
              <Mail className="w-6 h-6 text-[#f6d57f] mx-auto mb-2" />
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-[#f6d57f] text-sm">info@pmbaeroclub.co.za</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f] text-center">
              <MessageSquare className="w-6 h-6 text-[#f6d57f] mx-auto mb-2" />
              <p className="text-sm text-gray-400">WhatsApp</p>
              <p className="text-[#f6d57f] text-sm">082 854 9124</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#f6d57f] text-center">
              <Phone className="w-6 h-6 text-[#f6d57f] mx-auto mb-2" />
              <p className="text-sm text-gray-400">Telephone</p>
              <p className="text-[#f6d57f] text-sm">033 386 3952</p>
            </div>
          </div>
          <p className="text-center text-gray-300">Our team will be more than happy to set up a consultation with you to answer any questions you may have or guide you through your application process so that you can hit the skies!</p>
        </div>
      )
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];
  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#262626] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center mr-4">
                <FileText className="w-8 h-8 text-[#262626]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about flight training at PMB Aeroclub
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Useful Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-[#262626] border-[#f6d57f] hover:bg-[#2a2a2a] transition-colors">
                <CardContent className="p-6 text-center">
                  <Download className="w-8 h-8 text-[#f6d57f] mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Flight Plan</h3>
                  <p className="text-sm text-gray-400 mb-3">File your plan online or phone 0860 359 669</p>
                  <Button variant="outline" size="sm" className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    file2fly
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#262626] border-[#f6d57f] hover:bg-[#2a2a2a] transition-colors">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-[#f6d57f] mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Club Events</h3>
                  <p className="text-sm text-gray-400 mb-3">Stay updated with club activities</p>
                  <Button variant="outline" size="sm" className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Calendar
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#262626] border-[#f6d57f] hover:bg-[#2a2a2a] transition-colors">
                <CardContent className="p-6 text-center">
                  <Plane className="w-8 h-8 text-[#f6d57f] mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">RAASA Website</h3>
                  <p className="text-sm text-gray-400 mb-3">Recreational Aviation Administration</p>
                  <Button variant="outline" size="sm" className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#262626] border-[#f6d57f] hover:bg-[#2a2a2a] transition-colors">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-[#f6d57f] mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Safety Corner</h3>
                  <p className="text-sm text-gray-400 mb-3">Aircraft accidents & safety info</p>
                  <Button variant="outline" size="sm" className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-[#f6d57f] text-[#262626]" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }
                >
                  {category === 'all' ? 'All Questions' : category}
                </Button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors">
                    <CardHeader 
                      className="cursor-pointer"
                      onClick={() => toggleItem(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                            {item.category}
                          </Badge>
                          <CardTitle className="text-white text-lg">{item.question}</CardTitle>
                        </div>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-[#f6d57f]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#f6d57f]" />
                        )}
                      </div>
                    </CardHeader>
                    {openItems.includes(item.id) && (
                      <CardContent className="pt-0">
                        <Separator className="mb-4 bg-gray-600" />
                        <div className="text-gray-300">
                          {item.answer}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-[#262626] border-[#f6d57f]">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
                <p className="text-gray-300 mb-6">
                  Our team is here to help you start your aviation journey. Get in touch with us today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us: 033 386 3952
                  </Button>
                  <Button variant="outline" className="border-[#f6d57f] text-[#f6d57f] hover:bg-[#f6d57f] hover:text-[#262626]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp: 082 854 9124
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © Telani Lithgow for Pietermaritzburg Aero Club SACAA/1169/ATO
          </p>
        </div>
      </footer>
    </div>
  );
}