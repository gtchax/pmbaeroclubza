'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  GraduationCap,
  Target,
  CheckCircle,
  User,
  FileText,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Star,
  
  AlertCircle
} from 'lucide-react';

interface LessonPlan {
  id: string;
  title: string;
  module: string;
  duration: number;
  objectives: string[];
  prerequisites: string[];
  materials: string[];
  groundInstruction: string;
  flightInstruction: string;
  evaluation: string;
  standards: {
    skill: string;
    standard: string;
    tolerance: string;
  }[];
  status: 'draft' | 'approved' | 'in-use' | 'archived';
  lastUpdated: string;
  createdBy: string;
}

interface CurriculumModule {
  id: string;
  name: string;
  description: string;
  totalLessons: number;
  estimatedHours: number;
  prerequisites: string[];
  objectives: string[];
  lessons: LessonPlan[];
  progress: number;
  status: 'active' | 'completed' | 'pending';
}

export function CurriculumContent() {
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);

  // Mock curriculum data
  const curriculumModules: CurriculumModule[] = [
    {
      id: 'MOD-001',
      name: 'Private Pilot License (PPL)',
      description: 'Complete training program for Private Pilot License certification',
      totalLessons: 25,
      estimatedHours: 45,
      prerequisites: ['Valid Medical Certificate', 'Student Pilot Certificate'],
      objectives: [
        'Demonstrate safe aircraft operation',
        'Navigate using pilotage and dead reckoning',
        'Communicate effectively with ATC',
        'Handle emergency situations'
      ],
      lessons: [
        {
          id: 'LES-001',
          title: 'Aircraft Familiarization',
          module: 'PPL',
          duration: 2,
          objectives: [
            'Identify aircraft components',
            'Perform pre-flight inspection',
            'Understand aircraft systems'
          ],
          prerequisites: ['Ground school completion'],
          materials: ['Aircraft checklist', 'POH', 'Pre-flight inspection guide'],
          groundInstruction: 'Review aircraft systems, performance charts, and emergency procedures.',
          flightInstruction: 'Demonstrate pre-flight inspection, engine start, taxi procedures.',
          evaluation: 'Student must correctly identify all major aircraft components and perform complete pre-flight inspection.',
          standards: [
            { skill: 'Pre-flight Inspection', standard: 'Complete and systematic', tolerance: 'No items missed' },
            { skill: 'Aircraft Knowledge', standard: 'Identify all components', tolerance: '100% accuracy' }
          ],
          status: 'approved',
          lastUpdated: '2024-01-15',
          createdBy: 'Captain Sarah Mitchell'
        },
        {
          id: 'LES-002',
          title: 'Basic Flight Maneuvers',
          module: 'PPL',
          duration: 1.5,
          objectives: [
            'Maintain straight and level flight',
            'Perform coordinated turns',
            'Control altitude and airspeed'
          ],
          prerequisites: ['Aircraft Familiarization'],
          materials: ['Flight training device', 'Reference materials'],
          groundInstruction: 'Review basic aerodynamics, control surfaces, and flight instruments.',
          flightInstruction: 'Practice straight and level flight, turns, climbs, and descents.',
          evaluation: 'Student demonstrates smooth control inputs and maintains desired parameters.',
          standards: [
            { skill: 'Altitude Control', standard: 'Maintain assigned altitude', tolerance: '±100 feet' },
            { skill: 'Heading Control', standard: 'Maintain assigned heading', tolerance: '±10 degrees' }
          ],
          status: 'approved',
          lastUpdated: '2024-01-12',
          createdBy: 'Captain Sarah Mitchell'
        }
      ],
      progress: 65,
      status: 'active'
    },
    {
      id: 'MOD-002',
      name: 'Instrument Rating (IR)',
      description: 'Instrument flight rules training and certification',
      totalLessons: 15,
      estimatedHours: 40,
      prerequisites: ['Private Pilot License', 'Cross Country Experience'],
      objectives: [
        'Fly solely by reference to instruments',
        'Navigate using electronic aids',
        'Perform instrument approaches',
        'Handle IFR emergencies'
      ],
      lessons: [
        {
          id: 'LES-003',
          title: 'Basic Instrument Flight',
          module: 'IR',
          duration: 2,
          objectives: [
            'Maintain aircraft control using instruments',
            'Perform basic instrument maneuvers',
            'Understand instrument scan techniques'
          ],
          prerequisites: ['PPL', 'Instrument ground school'],
          materials: ['View limiting device', 'IFR charts', 'Approach plates'],
          groundInstruction: 'Review instrument scan, attitude instrument flying, and basic IFR procedures.',
          flightInstruction: 'Practice instrument scan, straight and level flight, turns, climbs, descents under the hood.',
          evaluation: 'Student maintains aircraft control solely by reference to instruments.',
          standards: [
            { skill: 'Altitude Control', standard: 'Maintain assigned altitude', tolerance: '±100 feet' },
            { skill: 'Heading Control', standard: 'Maintain assigned heading', tolerance: '±10 degrees' }
          ],
          status: 'approved',
          lastUpdated: '2024-01-10',
          createdBy: 'Captain Sarah Mitchell'
        }
      ],
      progress: 30,
      status: 'active'
    },
    {
      id: 'MOD-003',
      name: 'Commercial Pilot License (CPL)',
      description: 'Advanced training for commercial pilot certification',
      totalLessons: 20,
      estimatedHours: 35,
      prerequisites: ['Instrument Rating', '250 Total Hours'],
      objectives: [
        'Demonstrate commercial pilot proficiency',
        'Perform complex aircraft operations',
        'Execute advanced maneuvers',
        'Understand commercial regulations'
      ],
      lessons: [],
      progress: 0,
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'in-use': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getModuleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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
          <h2 className="text-2xl font-bold text-white">Curriculum Management</h2>
          <p className="text-gray-400">Manage training modules and lesson plans</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
            <Plus className="w-4 h-4 mr-2" />
            New Module
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Modules', value: '3', icon: BookOpen, color: 'blue' },
          { label: 'Active Lessons', value: '60', icon: GraduationCap, color: 'green' },
          { label: 'Completion Rate', value: '85%', icon: Target, color: 'yellow' },
          { label: 'Students Enrolled', value: '24', icon: User, color: 'purple' }
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

      {/* Curriculum Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {curriculumModules.map((module) => (
          <Card key={module.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                onClick={() => setSelectedModule(module)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#f6d57f] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-[#262626]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{module.name}</CardTitle>
                    <CardDescription className="text-gray-400">{module.totalLessons} lessons</CardDescription>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getModuleStatusColor(module.status)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">{module.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-white font-medium">{module.progress}%</span>
              </div>
              <Progress value={module.progress} className="h-2" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Est. Hours:</span>
                  <div className="text-white font-medium">{module.estimatedHours}h</div>
                </div>
                <div>
                  <span className="text-gray-400">Lessons:</span>
                  <div className="text-white font-medium">{module.totalLessons}</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                  {module.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Module View */}
      {selectedModule && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">{selectedModule.name}</CardTitle>
                <CardDescription className="text-gray-400">{selectedModule.description}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedModule(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Module Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Module Information</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Lessons:</span>
                    <span className="text-white">{selectedModule.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Hours:</span>
                    <span className="text-white">{selectedModule.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{selectedModule.progress}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedModule.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Learning Objectives</h4>
                  <div className="space-y-1">
                    {selectedModule.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <Target className="w-3 h-3 text-[#f6d57f]" />
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lesson Plans */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Lesson Plans</h3>
                  <Button size="sm" className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Lesson
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {selectedModule.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-3 bg-[#1a1a1a] rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-colors"
                         onClick={() => setSelectedLesson(lesson)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{lesson.title}</h4>
                          <p className="text-xs text-gray-400">{lesson.duration}h • {lesson.objectives.length} objectives</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(lesson.status)}`} />
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export Module
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Module
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Lesson Plan View */}
      {selectedLesson && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">{selectedLesson.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedLesson.module} • {selectedLesson.duration}h • Updated {selectedLesson.lastUpdated}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedLesson(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lesson Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Lesson Details</h3>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Learning Objectives</h4>
                  <div className="space-y-1">
                    {selectedLesson.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedLesson.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Required Materials</h4>
                  <div className="space-y-1">
                    {selectedLesson.materials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <FileText className="w-3 h-3 text-[#f6d57f]" />
                        <span>{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Standards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Performance Standards</h3>
                
                <div className="space-y-3">
                  {selectedLesson.standards.map((standard, index) => (
                    <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg">
                      <h4 className="font-medium text-white text-sm">{standard.skill}</h4>
                      <p className="text-xs text-gray-400 mt-1">{standard.standard}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <AlertCircle className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">Tolerance: {standard.tolerance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instruction Content */}
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Ground Instruction</h4>
                <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                  {selectedLesson.groundInstruction}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Flight Instruction</h4>
                <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                  {selectedLesson.flightInstruction}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Evaluation Criteria</h4>
                <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                  {selectedLesson.evaluation}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export Lesson
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Lesson
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Star className="w-4 h-4 mr-2" />
                Use in Training
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
