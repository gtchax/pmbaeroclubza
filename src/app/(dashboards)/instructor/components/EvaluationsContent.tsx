'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ClipboardList,
  Star,
  TrendingUp,
  TrendingDown,
  User,
  Calendar,
  FileText,
  Plus,
  Edit,
  Eye,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Evaluation {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  lessonType: string;
  aircraft: string;
  duration: number;
  overallScore: number;
  skills: {
    name: string;
    score: number;
    notes?: string;
  }[];
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string;
  instructorNotes: string;
  status: 'draft' | 'completed' | 'reviewed';
  nextSteps: string[];
}

export function EvaluationsContent() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Mock evaluation data
  const evaluations: Evaluation[] = [
    {
      id: 'EVAL-001',
      studentId: 'ST-001',
      studentName: 'Alex Johnson',
      date: '2024-01-20',
      lessonType: 'Cross Country Navigation',
      aircraft: 'ZS-PMB',
      duration: 2.0,
      overallScore: 85,
      skills: [
        { name: 'Navigation', score: 90, notes: 'Excellent use of GPS and pilotage' },
        { name: 'Radio Communications', score: 75, notes: 'Needs improvement in clarity' },
        { name: 'Flight Planning', score: 88, notes: 'Thorough preparation' },
        { name: 'Weather Assessment', score: 82, notes: 'Good understanding of conditions' },
        { name: 'Emergency Procedures', score: 85, notes: 'Confident responses' }
      ],
      strengths: ['Navigation skills', 'Flight planning', 'Situational awareness'],
      areasForImprovement: ['Radio communications', 'Crosswind techniques'],
      recommendations: 'Ready for checkride preparation. Focus on radio work.',
      instructorNotes: 'Alex shows excellent progress and is demonstrating commercial-level skills. Recommend scheduling checkride within 2 weeks.',
      status: 'completed',
      nextSteps: ['Schedule checkride', 'Practice radio communications', 'Review emergency procedures']
    },
    {
      id: 'EVAL-002',
      studentId: 'ST-002',
      studentName: 'Maria Garcia',
      date: '2024-01-19',
      lessonType: 'Pattern Work',
      aircraft: 'ZS-FLY',
      duration: 1.5,
      overallScore: 72,
      skills: [
        { name: 'Takeoffs', score: 80, notes: 'Consistent and smooth' },
        { name: 'Traffic Pattern', score: 75, notes: 'Good spacing and altitude control' },
        { name: 'Landings', score: 65, notes: 'Inconsistent flare timing' },
        { name: 'Crosswind Handling', score: 60, notes: 'Needs significant practice' },
        { name: 'Go-Around Procedures', score: 85, notes: 'Decisive and safe' }
      ],
      strengths: ['Takeoff technique', 'Decision making', 'Safety awareness'],
      areasForImprovement: ['Landing consistency', 'Crosswind techniques', 'Rudder control'],
      recommendations: 'Continue pattern work with focus on crosswind landings.',
      instructorNotes: 'Maria is progressing well but needs more practice with landings, especially in crosswind conditions.',
      status: 'completed',
      nextSteps: ['Additional crosswind practice', 'Landing consistency drills', 'Rudder control exercises']
    },
    {
      id: 'EVAL-003',
      studentId: 'ST-003',
      studentName: 'John Smith',
      date: '2024-01-18',
      lessonType: 'Solo Preparation',
      aircraft: 'ZS-AVN',
      duration: 1.0,
      overallScore: 78,
      skills: [
        { name: 'Aircraft Control', score: 82, notes: 'Smooth and confident' },
        { name: 'Traffic Pattern', score: 80, notes: 'Good pattern discipline' },
        { name: 'Landings', score: 75, notes: 'Consistent approach and landing' },
        { name: 'Emergency Procedures', score: 78, notes: 'Good knowledge and execution' },
        { name: 'Decision Making', score: 80, notes: 'Shows good judgment' }
      ],
      strengths: ['Aircraft handling', 'Pattern work', 'Safety mindset'],
      areasForImprovement: ['Radio confidence', 'Wind correction'],
      recommendations: 'Ready for first solo flight with instructor endorsement.',
      instructorNotes: 'John demonstrates the skills and judgment necessary for solo flight. Recommend solo endorsement.',
      status: 'completed',
      nextSteps: ['Solo endorsement', 'First solo flight', 'Build solo hours']
    }
  ];

  const filteredEvaluations = evaluations.filter(ev => 
    filterStatus === 'all' || ev.status === filterStatus
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvaluations = filteredEvaluations.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 65) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'reviewed': return 'bg-blue-500';
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
          <h2 className="text-2xl font-bold text-white">Flight Evaluations</h2>
          <p className="text-gray-400">Track student progress and performance</p>
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
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] bg-[#1a1a1a] border-gray-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Evaluations</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreating(true)} className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
            <Plus className="w-4 h-4 mr-2" />
            New Evaluation
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Evaluations', value: '24', icon: ClipboardList, color: 'blue' },
          { label: 'This Month', value: '8', icon: Calendar, color: 'green' },
          { label: 'Average Score', value: '78%', icon: Star, color: 'yellow' },
          { label: 'Pending Review', value: '3', icon: Clock, color: 'orange' }
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

      {/* Evaluations Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedEvaluations.map((evaluation) => (
          <Card key={evaluation.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                onClick={() => setSelectedEvaluation(evaluation)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#f6d57f] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#262626]" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{evaluation.studentName}</CardTitle>
                    <CardDescription className="text-gray-400">{evaluation.date}</CardDescription>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(evaluation.status)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Overall Score</span>
                <span className={`text-lg font-bold ${getScoreColor(evaluation.overallScore)}`}>
                  {evaluation.overallScore}%
                </span>
              </div>
              <Progress value={evaluation.overallScore} className="h-2" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Lesson Type:</span>
                  <span className="text-white">{evaluation.lessonType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Aircraft:</span>
                  <span className="text-white">{evaluation.aircraft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{evaluation.duration}h</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                  {evaluation.status}
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
      ) : (
        <div className="space-y-4">
          {paginatedEvaluations.map((evaluation) => (
            <Card key={evaluation.id} className="bg-[#262626] border-gray-600 hover:border-[#f6d57f] transition-colors cursor-pointer"
                  onClick={() => setSelectedEvaluation(evaluation)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-[#f6d57f] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#262626]" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="font-semibold text-white">{evaluation.studentName}</p>
                        <p className="text-sm text-gray-400">{evaluation.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Lesson Type</p>
                        <p className="text-white">{evaluation.lessonType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Aircraft</p>
                        <p className="text-white">{evaluation.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Score</p>
                        <p className={`font-bold ${getScoreColor(evaluation.overallScore)}`}>
                          {evaluation.overallScore}%
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                          {evaluation.status}
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEvaluations.length)} of {filteredEvaluations.length} evaluations
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

      {/* Detailed Evaluation View */}
      {selectedEvaluation && (
        <Card className="bg-[#262626] border-[#f6d57f]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">
                  Evaluation: {selectedEvaluation.studentName}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedEvaluation.lessonType} • {selectedEvaluation.date}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedEvaluation(null)} 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills Assessment */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Skills Assessment</h3>
                <div className="space-y-3">
                  {selectedEvaluation.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className={`text-sm font-medium ${getScoreColor(skill.score)}`}>
                          {skill.score}%
                        </span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                      {skill.notes && (
                        <p className="text-xs text-gray-400 italic">{skill.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Performance Summary</h3>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvaluation.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="border-green-500 text-green-400 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Areas for Improvement</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedEvaluation.areasForImprovement.map((area, index) => (
                      <Badge key={index} variant="outline" className="border-yellow-500 text-yellow-400 text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Next Steps</h4>
                  <div className="space-y-1">
                    {selectedEvaluation.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-[#f6d57f] rounded-full" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Recommendations */}
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Recommendations</h4>
                <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                  {selectedEvaluation.recommendations}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Instructor Notes</h4>
                <p className="text-sm text-gray-300 bg-[#1a1a1a] p-3 rounded-lg">
                  {selectedEvaluation.instructorNotes}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-600">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Edit className="w-4 h-4 mr-2" />
                Edit Evaluation
              </Button>
              <Button className="bg-[#f6d57f] text-[#262626] hover:bg-[#f6d57f]/90">
                <Award className="w-4 h-4 mr-2" />
                Mark as Reviewed
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
