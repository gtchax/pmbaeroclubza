'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Clock,
  User,
  MapPin,
  Plane
} from 'lucide-react';

export function LogbookContent({ dashboardData }: { dashboardData?: Record<string, unknown> }) {
  const flightEntries = [
    {
      date: '2024-02-18',
      aircraft: 'Cessna 172',
      registration: 'ZS-PMB',
      duration: '1.5',
      instructor: 'Captain Sarah Mitchell',
      lesson: 'Pattern Work',
      remarks: 'Excellent progress on landings'
    },
    {
      date: '2024-02-15',
      aircraft: 'Cessna 152',
      registration: 'ZS-FLY',
      duration: '2.0',
      instructor: 'Solo',
      lesson: 'First Solo Flight',
      remarks: 'First solo flight completed successfully!'
    },
    {
      date: '2024-02-12',
      aircraft: 'Piper PA-28',
      registration: 'ZS-AVN',
      duration: '1.8',
      instructor: 'Captain Mike Johnson',
      lesson: 'Cross Country',
      remarks: 'Navigation skills improving'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Digital Logbook</h2>
        <Button className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]">
          <FileText className="w-4 h-4 mr-2" />
          Export Logbook
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Hours', value: dashboardData?.profile?.totalFlightHours || 0, icon: Clock },
          { label: 'Solo Hours', value: dashboardData?.profile?.soloHours || 0, icon: User },
          { label: 'Cross Country', value: dashboardData?.profile?.crossCountryHours || 0, icon: MapPin },
        ].map((stat, index) => (
          <Card key={index} className="bg-[#262626] border-gray-600">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#f6d57f] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="text-2xl font-bold text-[#f6d57f]">{stat.value}</div>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white">Recent Flight Entries</CardTitle>
          <CardDescription className="text-gray-300">
            Your latest flight training sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flightEntries.map((entry, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{entry.lesson}</h3>
                      <p className="text-sm text-gray-400">{entry.date} • {entry.duration} hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#f6d57f]">{entry.aircraft}</p>
                    <p className="text-xs text-gray-400">{entry.registration}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">Instructor:</span>
                    <p className="text-white">{entry.instructor}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Flight Time:</span>
                    <p className="text-white">{entry.duration} hours</p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-400">Remarks:</span>
                  <p className="text-gray-300 mt-1">{entry.remarks}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
