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
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Star,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseType: string;
  enrollmentDate: string;
  totalHours: number;
  soloHours: number;
  progress: number;
  status: 'active' | 'solo-ready' | 'checkride-ready' | 'on-hold' | 'completed';
  lastLesson: string;
  nextLesson: string;
  performance: 'excellent' | 'good' | 'needs-improvement' | 'struggling';
  medicalExpiry: string;
  endorsements: string[];
  weakAreas: string[];
  strongAreas: string[];
}

export function StudentsContent({ instructorData }: { instructorData: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock student data
  const students: Student[] = [
    {
      id: 'ST-001',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+27 82 123 4567',
      licenseType: 'Private Pilot License',
      enrollmentDate: '2024-01-15',
      totalHours: 35.5,
      soloHours: 8.2,
      progress: 75,
      status: 'checkride-ready',
      lastLesson: '2024-01-20',
      nextLesson: '2024-01-22',
      performance: 'excellent',
      medicalExpiry: '2025-03-15',
      endorsements: ['Solo', 'Cross Country'],
      weakAreas: ['Radio Communications'],
      strongAreas: ['Navigation', 'Emergency Procedures']
    },
    {
      id: 'ST-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+27 83 234 5678',
      licenseType: 'Private Pilot License',
      enrollmentDate: '2024-02-01',
      totalHours: 28.3,
      soloHours: 0,
      progress: 60,
      status: 'active',
      lastLesson: '2024-01-19',
      nextLesson: '2024-01-21',
      performance: 'needs-improvement',
      medicalExpiry: '2025-01-20',
      endorsements: [],
      weakAreas: ['Landings', 'Traffic Pattern'],
      strongAreas: ['Pre-flight', 'Straight and Level']
    },
    {
      id: 'ST-003',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+27 84 345 6789',
      licenseType: 'Private Pilot License',
      enrollmentDate: '2024-01-08',
      totalHours: 25.7,
      soloHours: 0,
      progress: 55,
      status: 'solo-ready',
      lastLesson: '2024-01-18',
      nextLesson: '2024-01-20',
      performance: 'good',
      medicalExpiry: '2025-02-10',
      endorsements: [],
      weakAreas: ['Crosswind Landings'],
      strongAreas: ['Takeoffs', 'Airspace Knowledge']
    },
    {
      id: 'ST-004',
      name: 'Lisa Chen',
      email: 'lisa.chen@email.com',
      phone: '+27 85 456 7890',
      licenseType: 'Instrument Rating',
      enrollmentDate: '2023-11-15',
      totalHours: 45.2,
      soloHours: 15.5,
      progress: 85,
      status: 'active',
      lastLesson: '2024-01-21',
      nextLesson: '2024-01-23',
      performance: 'excellent',
      medicalExpiry: '2024-12-05',
      endorsements: ['Solo', 'Cross Country', 'Complex Aircraft'],
      weakAreas: ['ILS Approaches'],
      strongAreas: ['VOR Navigation', 'Holds']
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checkride-ready': return 'bg-green-500';
      case 'solo-ready': return 'bg-blue-500';
      case 'active': return 'bg-yellow-500';
      case 'on-hold': return 'bg-red-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'struggling': return 'text-red-400';
      default: return 'text-gray-400';
    }
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
          <h2 className="text-2xl font-bold text-white">Student Management</h2>
          <p className="text-gray-400">Track and manage your students' progress</p>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-gray-600 text-white"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-gray-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="solo-ready">Solo Ready</SelectItem>
              <SelectItem value="checkride-ready">Checkride Ready</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedStudents.map((student) => (
          <Card key={student.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                onClick={() => setSelectedStudent(student)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f6d57f] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#262626]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{student.name}</CardTitle>
                    <CardDescription className="text-gray-400">{student.id}</CardDescription>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-white font-medium">{student.progress}%</span>
              </div>
              <Progress value={student.progress} className="h-2" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Hours:</span>
                  <div className="text-white font-medium">{student.totalHours}</div>
                </div>
                <div>
                  <span className="text-gray-400">Solo Hours:</span>
                  <div className="text-white font-medium">{student.soloHours}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Performance:</span>
                <span className={`text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                  {student.performance.replace('-', ' ')}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                  {student.licenseType.split(' ')[0]}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <MessageSquare className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Calendar className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedStudents.map((student) => (
            <Card key={student.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(student)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <p className="font-semibold text-white">{student.name}</p>
                        <p className="text-sm text-gray-400">{student.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">License Type</p>
                        <p className="text-white">{student.licenseType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Progress</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.progress} className="h-2 flex-1" />
                          <span className="text-white text-sm">{student.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Hours</p>
                        <p className="text-white">{student.totalHours}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Performance</p>
                        <p className={`font-medium ${getPerformanceColor(student.performance)}`}>
                          {student.performance.replace('-', ' ')}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                          {student.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Calendar className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
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

      {/* Student Detail Modal/Panel */}
      {selectedStudent && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#f6d57f] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[#262626]" />
                </div>
                <div>
                  <CardTitle className="text-white text-xl">{selectedStudent.name}</CardTitle>
                  <CardDescription className="text-gray-400">{selectedStudent.email}</CardDescription>
                </div>
              </div>
              <Button variant="outline" onClick={() => setSelectedStudent(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Student ID:</span>
                    <span className="text-white">{selectedStudent.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white">{selectedStudent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">License Type:</span>
                    <span className="text-white">{selectedStudent.licenseType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Enrolled:</span>
                    <span className="text-white">{selectedStudent.enrollmentDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Medical Expiry:</span>
                    <span className="text-white">{selectedStudent.medicalExpiry}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Performance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Progress & Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-white">{selectedStudent.progress}%</span>
                    </div>
                    <Progress value={selectedStudent.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-[#1a1a1a] p-3 rounded-lg">
                      <div className="text-gray-400">Total Hours</div>
                      <div className="text-xl font-bold text-white">{selectedStudent.totalHours}</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 rounded-lg">
                      <div className="text-gray-400">Solo Hours</div>
                      <div className="text-xl font-bold text-white">{selectedStudent.soloHours}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Performance:</span>
                    <span className={`font-medium ${getPerformanceColor(selectedStudent.performance)}`}>
                      {selectedStudent.performance.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Endorsements & Areas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Training Details</h3>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Endorsements</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStudent.endorsements.length > 0 ? (
                      selectedStudent.endorsements.map((endorsement, index) => (
                        <Badge key={index} variant="outline" className="border-green-500 text-green-400 text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          {endorsement}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">No endorsements yet</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Strong Areas</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStudent.strongAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Areas for Improvement</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedStudent.weakAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="border-yellow-500 text-yellow-400 text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <FileText className="w-4 h-4 mr-2" />
                View Logbook
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Lesson
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Star className="w-4 h-4 mr-2" />
                Add Evaluation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
