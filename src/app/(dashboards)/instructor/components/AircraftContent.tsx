'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plane,
  Plus,
  Fuel,
  Wrench,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Aircraft {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  totalHours: number;
  hoursSinceLastMaintenance: number;
  nextMaintenanceHours: number;
  fuelLevel: number;
  fuelCapacity: number;
  status: 'available' | 'in-use' | 'maintenance' | 'grounded';
  currentLocation: string;
  assignedInstructor?: string;
  currentStudent?: string;
  nextScheduledFlight?: string;
  lastInspection: string;
  certifications: string[];
  equipment: string[];
  limitations: string[];
  hourlyRate: number;
}

export function AircraftContent() {
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock aircraft data
  const aircraft: Aircraft[] = [
    {
      id: 'AC-001',
      registration: 'ZS-PMB',
      make: 'Cessna',
      model: '172',
      year: 2018,
      totalHours: 2450.5,
      hoursSinceLastMaintenance: 45.2,
      nextMaintenanceHours: 54.8,
      fuelLevel: 85,
      fuelCapacity: 212,
      status: 'available',
      currentLocation: 'PMB Aeroclub - Hangar A',
      lastInspection: '2024-01-15',
      certifications: ['VFR', 'Night Flying'],
      equipment: ['GPS', 'Autopilot', 'Transponder'],
      limitations: ['Day VFR only until next inspection'],
      hourlyRate: 1200
    },
    {
      id: 'AC-002',
      registration: 'ZS-FLY',
      make: 'Piper',
      model: 'Cherokee',
      year: 2020,
      totalHours: 1850.3,
      hoursSinceLastMaintenance: 25.7,
      nextMaintenanceHours: 74.3,
      fuelLevel: 92,
      fuelCapacity: 200,
      status: 'in-use',
      currentLocation: 'In Flight',
      assignedInstructor: 'Captain Sarah Mitchell',
      currentStudent: 'Maria Garcia',
      nextScheduledFlight: '2024-01-22 14:00',
      lastInspection: '2024-01-10',
      certifications: ['VFR', 'IFR', 'Night Flying'],
      equipment: ['GPS', 'IFR Equipment', 'Autopilot'],
      limitations: [],
      hourlyRate: 1350
    },
    {
      id: 'AC-003',
      registration: 'ZS-AVN',
      make: 'Cessna',
      model: '152',
      year: 2016,
      totalHours: 3200.8,
      hoursSinceLastMaintenance: 75.5,
      nextMaintenanceHours: 24.5,
      fuelLevel: 78,
      fuelCapacity: 95,
      status: 'available',
      currentLocation: 'PMB Aeroclub - Ramp',
      nextScheduledFlight: '2024-01-22 16:00',
      lastInspection: '2024-01-12',
      certifications: ['VFR', 'Training'],
      equipment: ['Basic VFR', 'Radio'],
      limitations: ['Training flights only', 'Max 2 POB'],
      hourlyRate: 950
    },
    {
      id: 'AC-004',
      registration: 'ZS-SKY',
      make: 'Beechcraft',
      model: 'Bonanza',
      year: 2019,
      totalHours: 1650.2,
      hoursSinceLastMaintenance: 95.8,
      nextMaintenanceHours: 4.2,
      fuelLevel: 0,
      fuelCapacity: 284,
      status: 'maintenance',
      currentLocation: 'Maintenance Hangar',
      lastInspection: '2024-01-08',
      certifications: ['VFR', 'IFR', 'Complex Aircraft'],
      equipment: ['GPS', 'IFR Equipment', 'Autopilot', 'Retractable Gear'],
      limitations: ['Complex aircraft endorsement required'],
      hourlyRate: 2100
    }
  ];

  const filteredAircraft = aircraft.filter(ac => {
    const matchesSearch = ac.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ac.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ac.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ac.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAircraft.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAircraft = filteredAircraft.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'in-use': return 'bg-blue-500';
      case 'maintenance': return 'bg-red-500';
      case 'grounded': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getMaintenanceStatus = (hoursSince: number, nextMaintenance: number) => {
    const percentage = (hoursSince / (hoursSince + nextMaintenance)) * 100;
    if (percentage >= 90) return { color: 'text-red-400', status: 'Due Soon' };
    if (percentage >= 75) return { color: 'text-yellow-400', status: 'Monitor' };
    return { color: 'text-green-400', status: 'Good' };
  };

  const getFuelStatus = (level: number) => {
    if (level >= 75) return { color: 'text-green-400', status: 'Full' };
    if (level >= 50) return { color: 'text-yellow-400', status: 'Good' };
    if (level >= 25) return { color: 'text-orange-400', status: 'Low' };
    return { color: 'text-red-400', status: 'Critical' };
  };

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
          <h2 className="text-2xl font-bold text-white">Aircraft Management</h2>
          <p className="text-gray-400">Monitor and manage fleet availability</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-[#1a1a1a] border border-gray-600 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`${viewMode === 'grid' ? 'bg-[#f6d57f] text-[#262626]' : 'text-gray-300 hover:bg-gray-800'} rounded-r-none`}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`${viewMode === 'list' ? 'bg-[#f6d57f] text-[#262626]' : 'text-gray-300 hover:bg-gray-800'} rounded-l-none`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Search aircraft..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#1a1a1a] border-gray-600 text-white"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] bg-[#1a1a1a] border-gray-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Aircraft</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in-use">In Use</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="grounded">Grounded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Aircraft', value: '4', icon: Plane, color: 'blue' },
          { label: 'Available', value: '2', icon: CheckCircle, color: 'green' },
          { label: 'In Use', value: '1', icon: Clock, color: 'yellow' },
          { label: 'Maintenance', value: '1', icon: Wrench, color: 'red' }
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

      {/* Aircraft Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedAircraft.map((ac) => {
          const maintenanceStatus = getMaintenanceStatus(ac.hoursSinceLastMaintenance, ac.nextMaintenanceHours);
          const fuelStatus = getFuelStatus(ac.fuelLevel);
          
          return (
            <Card key={ac.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                  onClick={() => setSelectedAircraft(ac)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{ac.registration}</CardTitle>
                      <CardDescription className="text-gray-400">{ac.make} {ac.model}</CardDescription>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(ac.status)}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Fuel Level */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 flex items-center">
                      <Fuel className="w-4 h-4 mr-1" />
                      Fuel Level
                    </span>
                    <span className={`text-sm font-medium ${fuelStatus.color}`}>
                      {ac.fuelLevel}%
                    </span>
                  </div>
                  <Progress value={ac.fuelLevel} className="h-2" />
                </div>

                {/* Maintenance Status */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 flex items-center">
                      <Wrench className="w-4 h-4 mr-1" />
                      Next Maintenance
                    </span>
                    <span className={`text-sm font-medium ${maintenanceStatus.color}`}>
                      {ac.nextMaintenanceHours.toFixed(1)}h
                    </span>
                  </div>
                  <Progress 
                    value={(ac.hoursSinceLastMaintenance / (ac.hoursSinceLastMaintenance + ac.nextMaintenanceHours)) * 100} 
                    className="h-2" 
                  />
                </div>

                {/* Aircraft Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Total Hours:</span>
                    <div className="text-white font-medium">{ac.totalHours}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Year:</span>
                    <div className="text-white font-medium">{ac.year}</div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="text-sm">
                  <span className="text-gray-400">Location:</span>
                  <div className="text-white">{ac.currentLocation}</div>
                  {ac.currentStudent && (
                    <div className="text-gray-400 mt-1">
                      Student: <span className="text-white">{ac.currentStudent}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                    R{ac.hourlyRate}/hr
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Calendar className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Settings className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedAircraft.map((ac) => {
            const maintenanceStatus = getMaintenanceStatus(ac.hoursSinceLastMaintenance, ac.nextMaintenanceHours);
            const fuelStatus = getFuelStatus(ac.fuelLevel);
            
            return (
              <Card key={ac.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                    onClick={() => setSelectedAircraft(ac)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-[#262626]" />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div>
                          <p className="font-semibold text-white">{ac.registration}</p>
                          <p className="text-sm text-gray-400">{ac.make} {ac.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(ac.status)}`} />
                            <p className="text-white capitalize">{ac.status}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Fuel Level</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={ac.fuelLevel} className="h-2 flex-1" />
                            <span className={`text-sm ${fuelStatus.color}`}>{ac.fuelLevel}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total Hours</p>
                          <p className="text-white">{ac.totalHours}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Maintenance</p>
                          <p className={`text-sm ${maintenanceStatus.color}`}>{maintenanceStatus.status}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                            R{ac.hourlyRate}/hr
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                              <Calendar className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                              <Settings className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAircraft.length)} of {filteredAircraft.length} aircraft
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={currentPage === page 
                  ? "bg-[#f6d57f] text-[#262626]" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detailed Aircraft View */}
      {selectedAircraft && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                  <Plane className="w-8 h-8 text-[#262626]" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">{selectedAircraft.registration}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {selectedAircraft.make} {selectedAircraft.model} ({selectedAircraft.year})
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedAircraft(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Aircraft Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Registration:</span>
                    <span className="text-white">{selectedAircraft.registration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Make/Model:</span>
                    <span className="text-white">{selectedAircraft.make} {selectedAircraft.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white">{selectedAircraft.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Hours:</span>
                    <span className="text-white">{selectedAircraft.totalHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hourly Rate:</span>
                    <span className="text-white">R{selectedAircraft.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fuel Capacity:</span>
                    <span className="text-white">{selectedAircraft.fuelCapacity}L</span>
                  </div>
                </div>
              </div>

              {/* Status & Maintenance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Status & Maintenance</h3>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Current Status</span>
                    <Badge className={getStatusColor(selectedAircraft.status)}>
                      {selectedAircraft.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Fuel Level</span>
                    <span className="text-white">{selectedAircraft.fuelLevel}%</span>
                  </div>
                  <Progress value={selectedAircraft.fuelLevel} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Next Maintenance</span>
                    <span className="text-white">{selectedAircraft.nextMaintenanceHours}h</span>
                  </div>
                  <Progress 
                    value={(selectedAircraft.hoursSinceLastMaintenance / 
                           (selectedAircraft.hoursSinceLastMaintenance + selectedAircraft.nextMaintenanceHours)) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="text-sm">
                  <span className="text-gray-400">Last Inspection:</span>
                  <div className="text-white">{selectedAircraft.lastInspection}</div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-400">Location:</span>
                  <div className="text-white">{selectedAircraft.currentLocation}</div>
                </div>
              </div>

              {/* Equipment & Certifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Equipment & Certifications</h3>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAircraft.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="border-green-500 text-green-400 text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Equipment</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAircraft.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedAircraft.limitations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Limitations</h4>
                    <div className="space-y-1">
                      {selectedAircraft.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-yellow-400">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Assignment */}
            {(selectedAircraft.assignedInstructor || selectedAircraft.currentStudent) && (
              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Current Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {selectedAircraft.assignedInstructor && (
                    <div>
                      <span className="text-gray-400">Instructor:</span>
                      <div className="text-white">{selectedAircraft.assignedInstructor}</div>
                    </div>
                  )}
                  {selectedAircraft.currentStudent && (
                    <div>
                      <span className="text-gray-400">Student:</span>
                      <div className="text-white">{selectedAircraft.currentStudent}</div>
                    </div>
                  )}
                  {selectedAircraft.nextScheduledFlight && (
                    <div>
                      <span className="text-gray-400">Next Flight:</span>
                      <div className="text-white">{selectedAircraft.nextScheduledFlight}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Flight
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Wrench className="w-4 h-4 mr-2" />
                Maintenance Log
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Settings className="w-4 h-4 mr-2" />
                Aircraft Settings
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Plus className="w-4 h-4 mr-2" />
                Book Aircraft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
