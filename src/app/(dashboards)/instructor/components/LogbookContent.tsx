'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  Plane,
  Clock,
  Calendar,
  User,
  MapPin,
  FileText,
  Download,
  Plus,
  Edit,
  Eye,
  Filter,
  TrendingUp,
  Award
} from 'lucide-react';

interface LogbookEntry {
  id: string;
  date: string;
  aircraft: string;
  student: string;
  studentId: string;
  departure: string;
  arrival: string;
  route: string;
  flightTime: number;
  instructionalTime: number;
  lessonType: string;
  dayTime: number;
  nightTime: number;
  instrumentTime: number;
  crossCountryTime: number;
  soloTime: number;
  dualTime: number;
  landings: {
    day: number;
    night: number;
  };
  approaches: number;
  holds: number;
  remarks: string;
  endorsements?: string[];
  weather: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export function LogbookContent({ instructorData }: { instructorData: any }) {
  const [selectedEntry, setSelectedEntry] = useState<LogbookEntry | null>(null);
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock logbook data
  const logbookEntries: LogbookEntry[] = [
    {
      id: 'LOG-001',
      date: '2024-01-20',
      aircraft: 'ZS-PMB',
      student: 'Alex Johnson',
      studentId: 'ST-001',
      departure: 'FAPN',
      arrival: 'FAPN',
      route: 'FAPN-FABL-FAPN',
      flightTime: 2.0,
      instructionalTime: 2.0,
      lessonType: 'Cross Country Navigation',
      dayTime: 2.0,
      nightTime: 0,
      instrumentTime: 0,
      crossCountryTime: 2.0,
      soloTime: 0,
      dualTime: 2.0,
      landings: { day: 4, night: 0 },
      approaches: 0,
      holds: 0,
      remarks: 'Excellent navigation skills demonstrated. Student ready for checkride.',
      endorsements: ['Cross Country'],
      weather: 'CAVOK',
      status: 'completed'
    },
    {
      id: 'LOG-002',
      date: '2024-01-19',
      aircraft: 'ZS-FLY',
      student: 'Maria Garcia',
      studentId: 'ST-002',
      departure: 'FAPN',
      arrival: 'FAPN',
      route: 'Local Pattern',
      flightTime: 1.5,
      instructionalTime: 1.5,
      lessonType: 'Pattern Work',
      dayTime: 1.5,
      nightTime: 0,
      instrumentTime: 0,
      crossCountryTime: 0,
      soloTime: 0,
      dualTime: 1.5,
      landings: { day: 8, night: 0 },
      approaches: 0,
      holds: 0,
      remarks: 'Improved landing consistency. Continue crosswind practice.',
      weather: 'Wind 090/12G18',
      status: 'completed'
    },
    {
      id: 'LOG-003',
      date: '2024-01-18',
      aircraft: 'ZS-AVN',
      student: 'John Smith',
      studentId: 'ST-003',
      departure: 'FAPN',
      arrival: 'FAPN',
      route: 'Local Pattern',
      flightTime: 1.0,
      instructionalTime: 1.0,
      lessonType: 'Solo Preparation',
      dayTime: 1.0,
      nightTime: 0,
      instrumentTime: 0,
      crossCountryTime: 0,
      soloTime: 0,
      dualTime: 1.0,
      landings: { day: 6, night: 0 },
      approaches: 0,
      holds: 0,
      remarks: 'Student demonstrates competency for solo flight. Endorsed for solo.',
      endorsements: ['Solo'],
      weather: 'CAVOK',
      status: 'completed'
    },
    {
      id: 'LOG-004',
      date: '2024-01-17',
      aircraft: 'ZS-PMB',
      student: 'Lisa Chen',
      studentId: 'ST-004',
      departure: 'FAPN',
      arrival: 'FAPN',
      route: 'FAPN-FABL-FAPN',
      flightTime: 2.0,
      instructionalTime: 2.0,
      lessonType: 'Instrument Training',
      dayTime: 0,
      nightTime: 2.0,
      instrumentTime: 1.5,
      crossCountryTime: 2.0,
      soloTime: 0,
      dualTime: 2.0,
      landings: { day: 0, night: 2 },
      approaches: 4,
      holds: 2,
      remarks: 'ILS approaches improving. Continue instrument practice.',
      weather: 'IMC conditions',
      status: 'completed'
    },
    {
      id: 'LOG-005',
      date: '2024-01-16',
      aircraft: 'ZS-FLY',
      student: 'Alex Johnson',
      studentId: 'ST-001',
      departure: 'FAPN',
      arrival: 'FAPN',
      route: 'Local Area',
      flightTime: 1.5,
      instructionalTime: 1.5,
      lessonType: 'Emergency Procedures',
      dayTime: 1.5,
      nightTime: 0,
      instrumentTime: 0,
      crossCountryTime: 0,
      soloTime: 0,
      dualTime: 1.5,
      landings: { day: 3, night: 0 },
      approaches: 0,
      holds: 0,
      remarks: 'Excellent handling of simulated emergencies. Confident responses.',
      weather: 'CAVOK',
      status: 'completed'
    }
  ];

  const filteredEntries = logbookEntries.filter(entry => {
    const matchesSearch = entry.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.lessonType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate totals
  const totals = logbookEntries.reduce((acc, entry) => ({
    totalTime: acc.totalTime + entry.flightTime,
    instructionalTime: acc.instructionalTime + entry.instructionalTime,
    dayTime: acc.dayTime + entry.dayTime,
    nightTime: acc.nightTime + entry.nightTime,
    instrumentTime: acc.instrumentTime + entry.instrumentTime,
    crossCountryTime: acc.crossCountryTime + entry.crossCountryTime,
    totalLandings: acc.totalLandings + entry.landings.day + entry.landings.night,
    totalApproaches: acc.totalApproaches + entry.approaches
  }), {
    totalTime: 0,
    instructionalTime: 0,
    dayTime: 0,
    nightTime: 0,
    instrumentTime: 0,
    crossCountryTime: 0,
    totalLandings: 0,
    totalApproaches: 0
  });

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
          <h2 className="text-2xl font-bold text-white">Instructor Logbook</h2>
          <p className="text-gray-400">Track your instructional flight hours and experience</p>
        </div>
        <div className="flex space-x-3">
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1a1a1a] border-gray-600 text-white"
          />
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-[150px] bg-[#1a1a1a] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Flight Hours Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Time', value: `${totals.totalTime.toFixed(1)}h`, icon: Clock },
          { label: 'Instructional', value: `${totals.instructionalTime.toFixed(1)}h`, icon: User },
          { label: 'Day Time', value: `${totals.dayTime.toFixed(1)}h`, icon: Calendar },
          { label: 'Night Time', value: `${totals.nightTime.toFixed(1)}h`, icon: BookOpen },
          { label: 'Cross Country', value: `${totals.crossCountryTime.toFixed(1)}h`, icon: MapPin },
          { label: 'Instrument', value: `${totals.instrumentTime.toFixed(1)}h`, icon: Plane }
        ].map((stat, index) => (
          <Card key={index} className="bg-[#262626] border-gray-600">
            <CardContent className="pt-4 pb-4">
              <div className="text-center">
                <stat.icon className="h-5 w-5 text-[#f6d57f] mx-auto mb-2" />
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Entries */}
      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-[#f6d57f]" />
              Recent Flight Entries
            </CardTitle>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                   onClick={() => setSelectedEntry(entry)}>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{entry.date}</div>
                    <div className="text-xs text-gray-400">{entry.flightTime}h</div>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-600" />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white">{entry.student}</h4>
                      <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                        {entry.aircraft}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{entry.lessonType}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{entry.route}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Plane className="w-3 h-3" />
                        <span>{entry.landings.day + entry.landings.night} ldgs</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {entry.endorsements && entry.endorsements.length > 0 && (
                    <Award className="w-4 h-4 text-[#f6d57f]" />
                  )}
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Entry View */}
      {selectedEntry && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">
                  Flight Entry: {selectedEntry.date}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedEntry.student} • {selectedEntry.aircraft} • {selectedEntry.flightTime}h
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedEntry(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Flight Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Flight Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">{selectedEntry.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aircraft:</span>
                    <span className="text-white">{selectedEntry.aircraft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Student:</span>
                    <span className="text-white">{selectedEntry.student}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lesson Type:</span>
                    <span className="text-white">{selectedEntry.lessonType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Route:</span>
                    <span className="text-white">{selectedEntry.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weather:</span>
                    <span className="text-white">{selectedEntry.weather}</span>
                  </div>
                </div>
              </div>

              {/* Flight Times */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Flight Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Time:</span>
                    <span className="text-white">{selectedEntry.flightTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instructional:</span>
                    <span className="text-white">{selectedEntry.instructionalTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Day Time:</span>
                    <span className="text-white">{selectedEntry.dayTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Night Time:</span>
                    <span className="text-white">{selectedEntry.nightTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instrument:</span>
                    <span className="text-white">{selectedEntry.instrumentTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cross Country:</span>
                    <span className="text-white">{selectedEntry.crossCountryTime}h</span>
                  </div>
                </div>
              </div>

              {/* Operations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Operations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Day Landings:</span>
                    <span className="text-white">{selectedEntry.landings.day}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Night Landings:</span>
                    <span className="text-white">{selectedEntry.landings.night}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Approaches:</span>
                    <span className="text-white">{selectedEntry.approaches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Holds:</span>
                    <span className="text-white">{selectedEntry.holds}</span>
                  </div>
                </div>

                {selectedEntry.endorsements && selectedEntry.endorsements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Endorsements Given</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedEntry.endorsements.map((endorsement, index) => (
                        <Badge key={index} variant="outline" className="border-green-500 text-green-400 text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {endorsement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Remarks */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Remarks</h4>
              <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                {selectedEntry.remarks}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <FileText className="w-4 h-4 mr-2" />
                Print Entry
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Entry
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Plus className="w-4 h-4 mr-2" />
                Duplicate Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
