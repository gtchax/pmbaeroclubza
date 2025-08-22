'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Plane, User, MapPin, Wind, Sun, CloudRain, Plus, Edit, Trash2 } from 'lucide-react';

interface Lesson {
  id: string;
  date: string;
  time: string;
  duration: number;
  student: string;
  studentId: string;
  aircraft: string;
  lessonType: string;
  location: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  weather: 'good' | 'marginal' | 'poor';
  notes?: string;
}

export function ScheduleContent() {
  const [viewMode, setViewMode] = useState('week');

  // Mock lesson data
  const lessons: Lesson[] = [
    {
      id: 'L-001',
      date: '2024-01-22',
      time: '09:00',
      duration: 2,
      student: 'Alex Johnson',
      studentId: 'ST-001',
      aircraft: 'ZS-PMB',
      lessonType: 'Cross Country Navigation',
      location: 'PMB Aeroclub',
      status: 'scheduled',
      weather: 'good',
      notes: 'First cross country solo preparation'
    },
    {
      id: 'L-002',
      date: '2024-01-22',
      time: '11:00',
      duration: 1.5,
      student: 'Maria Garcia',
      studentId: 'ST-002',
      aircraft: 'ZS-FLY',
      lessonType: 'Pattern Work',
      location: 'PMB Aeroclub',
      status: 'confirmed',
      weather: 'marginal',
      notes: 'Focus on crosswind landings'
    },
    {
      id: 'L-003',
      date: '2024-01-22',
      time: '14:00',
      duration: 1,
      student: 'John Smith',
      studentId: 'ST-003',
      aircraft: 'ZS-AVN',
      lessonType: 'First Solo',
      location: 'PMB Aeroclub',
      status: 'scheduled',
      weather: 'good',
      notes: 'Solo endorsement ready'
    },
    {
      id: 'L-004',
      date: '2024-01-22',
      time: '16:00',
      duration: 2,
      student: 'Lisa Chen',
      studentId: 'ST-004',
      aircraft: 'ZS-PMB',
      lessonType: 'Instrument Training',
      location: 'PMB Aeroclub',
      status: 'confirmed',
      weather: 'good',
      notes: 'ILS approach practice'
    },
    {
      id: 'L-005',
      date: '2024-01-23',
      time: '08:00',
      duration: 1.5,
      student: 'Alex Johnson',
      studentId: 'ST-001',
      aircraft: 'ZS-FLY',
      lessonType: 'Checkride Prep',
      location: 'PMB Aeroclub',
      status: 'scheduled',
      weather: 'good',
      notes: 'Final preparation before checkride'
    },
    {
      id: 'L-006',
      date: '2024-01-23',
      time: '10:30',
      duration: 2,
      student: 'Maria Garcia',
      studentId: 'ST-002',
      aircraft: 'ZS-AVN',
      lessonType: 'Emergency Procedures',
      location: 'PMB Aeroclub',
      status: 'scheduled',
      weather: 'good',
      notes: 'Engine failure scenarios'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'good': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'marginal': return <CloudRain className="w-4 h-4 text-gray-400" />;
      case 'poor': return <CloudRain className="w-4 h-4 text-red-400" />;
      default: return <Sun className="w-4 h-4 text-gray-400" />;
    }
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.date]) {
      acc[lesson.date] = [];
    }
    acc[lesson.date].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Schedule Management</h2>
          <p className="text-gray-400">Plan and manage your flight lessons</p>
        </div>
        <div className="flex space-x-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[120px] bg-[#1a1a1a] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
            <Plus className="w-4 h-4 mr-2" />
            New Lesson
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Lessons', value: '4', icon: Calendar, color: 'blue' },
          { label: 'This Week', value: '18', icon: Clock, color: 'green' },
          { label: 'Confirmed', value: '12', icon: User, color: 'purple' },
          { label: 'Available Slots', value: '6', icon: Plus, color: 'orange' }
        ].map((stat, index) => (
          <Card key={index} className="bg-[#262626] border-gray-600">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#f6d57f] bg-opacity-20 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-[#f6d57f]" />
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

      {/* Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Schedule */}
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(groupedLessons).map(([date, dayLessons]) => (
            <Card key={date} className="bg-[#262626] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#f6d57f]" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {dayLessons.length} lessons scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dayLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{lesson.time}</div>
                          <div className="text-xs text-gray-400">{lesson.duration}h</div>
                        </div>
                        
                        <div className="w-px h-12 bg-gray-600" />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-white">{lesson.student}</h4>
                            <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                              {lesson.studentId}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{lesson.lessonType}</p>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Plane className="w-3 h-3" />
                              <span>{lesson.aircraft}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{lesson.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getWeatherIcon(lesson.weather)}
                              <span className="capitalize">{lesson.weather}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(lesson.status)}`} />
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Conditions */}
          <Card className="bg-[#262626] border-[#f6d57f]">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wind className="w-5 h-5 mr-2 text-[#f6d57f]" />
                Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Sun className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">22°C</div>
                <div className="text-sm text-gray-400">Clear Skies</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Wind:</span>
                  <span className="text-white">5 kts from 090°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Visibility:</span>
                  <span className="text-white">10+ km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ceiling:</span>
                  <span className="text-white">Clear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pressure:</span>
                  <span className="text-white">1013 hPa</span>
                </div>
              </div>

              <Badge className="w-full justify-center bg-green-500 text-white">
                Excellent Flying Conditions
              </Badge>
            </CardContent>
          </Card>

          {/* Aircraft Availability */}
          <Card className="bg-[#262626] border-[#f6d57f]">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plane className="w-5 h-5 mr-2 text-[#f6d57f]" />
                Aircraft Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { aircraft: 'ZS-PMB', status: 'available', nextMaintenance: '50h', fuel: '85%' },
                { aircraft: 'ZS-FLY', status: 'in-use', nextMaintenance: '25h', fuel: '92%' },
                { aircraft: 'ZS-AVN', status: 'available', nextMaintenance: '75h', fuel: '78%' },
                { aircraft: 'ZS-SKY', status: 'maintenance', nextMaintenance: 'Due', fuel: '0%' }
              ].map((aircraft, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <div className="font-medium text-white">{aircraft.aircraft}</div>
                    <div className="text-xs text-gray-400">
                      Fuel: {aircraft.fuel} • Maint: {aircraft.nextMaintenance}
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    aircraft.status === 'available' ? 'border-green-500 text-green-400' :
                    aircraft.status === 'in-use' ? 'border-yellow-500 text-yellow-400' :
                    'border-red-500 text-red-400'
                  }>
                    {aircraft.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#262626] border-[#f6d57f]">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Plus className="w-4 h-4 mr-2" />
                Schedule New Lesson
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                <Wind className="w-4 h-4 mr-2" />
                Weather Briefing
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                <Plane className="w-4 h-4 mr-2" />
                Aircraft Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
