'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plane,
  Fuel,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock
} from 'lucide-react';

export function AircraftContent() {
  const aircraftFleet = [
    {
      id: 1,
      registration: 'ZS-PMB',
      type: 'Cessna 172',
      status: 'available',
      fuelLevel: 85,
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-03-10',
      flightHours: 1250,
      availability: 'Available Today'
    },
    {
      id: 2,
      registration: 'ZS-FLY',
      type: 'Cessna 152',
      status: 'in-use',
      fuelLevel: 60,
      lastMaintenance: '2024-02-05',
      nextMaintenance: '2024-03-05',
      flightHours: 980,
      availability: 'In Use - Available 14:00'
    },
    {
      id: 3,
      registration: 'ZS-AVN',
      type: 'Piper PA-28',
      status: 'maintenance',
      fuelLevel: 45,
      lastMaintenance: '2024-02-18',
      nextMaintenance: '2024-03-18',
      flightHours: 1580,
      availability: 'Maintenance - Available Tomorrow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-600';
      case 'in-use': return 'bg-blue-600';
      case 'maintenance': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'in-use': return Clock;
      case 'maintenance': return AlertTriangle;
      default: return Plane;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Aircraft Fleet</h2>
        <Button className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]">
          <Calendar className="w-4 h-4 mr-2" />
          Book Aircraft
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {aircraftFleet.map((aircraft) => {
          const StatusIcon = getStatusIcon(aircraft.status);
          
          return (
            <Card key={aircraft.id} className="bg-[#262626] border-[#f6d57f]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{aircraft.registration}</CardTitle>
                      <CardDescription className="text-gray-300">{aircraft.type}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(aircraft.status)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {aircraft.status.charAt(0).toUpperCase() + aircraft.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-4 h-4 text-[#f6d57f]" />
                      <span className="text-sm text-gray-300">Fuel Level</span>
                    </div>
                    <span className="text-sm font-medium text-white">{aircraft.fuelLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        aircraft.fuelLevel > 70 ? 'bg-green-500' :
                        aircraft.fuelLevel > 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${aircraft.fuelLevel}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Flight Hours:</span>
                    <p className="text-white font-medium">{aircraft.flightHours}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Service:</span>
                    <p className="text-white font-medium">{aircraft.lastMaintenance}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-400">Availability:</span>
                  <p className="text-white font-medium">{aircraft.availability}</p>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]"
                    disabled={aircraft.status !== 'available'}
                  >
                    {aircraft.status === 'available' ? 'Book Now' : 'Unavailable'}
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white">Aircraft Specifications</CardTitle>
          <CardDescription className="text-gray-300">
            Technical details and capabilities of our training aircraft
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                aircraft: 'Cessna 172',
                specs: {
                  'Max Speed': '140 kts',
                  'Service Ceiling': '14,000 ft',
                  'Range': '640 nm',
                  'Fuel Capacity': '56 gallons'
                }
              },
              {
                aircraft: 'Cessna 152',
                specs: {
                  'Max Speed': '110 kts',
                  'Service Ceiling': '14,700 ft',
                  'Range': '415 nm',
                  'Fuel Capacity': '26 gallons'
                }
              },
              {
                aircraft: 'Piper PA-28',
                specs: {
                  'Max Speed': '125 kts',
                  'Service Ceiling': '14,200 ft',
                  'Range': '515 nm',
                  'Fuel Capacity': '50 gallons'
                }
              }
            ].map((aircraft, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg">
                <h3 className="font-medium text-white mb-3">{aircraft.aircraft}</h3>
                <div className="space-y-2">
                  {Object.entries(aircraft.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
