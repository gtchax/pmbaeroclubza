'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  Star
} from 'lucide-react';

export function ResourcesContent() {
  const studyMaterials = [
    {
      title: 'Private Pilot Manual',
      type: 'PDF',
      size: '15.2 MB',
      progress: 75,
      lastAccessed: '2 days ago',
      icon: BookOpen,
      status: 'in-progress'
    },
    {
      title: 'Flight Training Videos',
      type: 'Video Series',
      size: '2.1 GB',
      progress: 60,
      lastAccessed: '1 week ago',
      icon: Video,
      status: 'in-progress'
    },
    {
      title: 'Aviation Weather Guide',
      type: 'PDF',
      size: '8.7 MB',
      progress: 100,
      lastAccessed: '3 days ago',
      icon: FileText,
      status: 'completed'
    },
    {
      title: 'Radio Communications Handbook',
      type: 'PDF',
      size: '5.3 MB',
      progress: 45,
      lastAccessed: '5 days ago',
      icon: BookOpen,
      status: 'in-progress'
    }
  ];

  const externalResources = [
    {
      title: 'FAA Regulations (FAR/AIM)',
      description: 'Official Federal Aviation Regulations',
      url: 'https://faa.gov',
      category: 'Regulations'
    },
    {
      title: 'AOPA Flight Training Resources',
      description: 'Comprehensive flight training materials',
      url: 'https://aopa.org',
      category: 'Training'
    },
    {
      title: 'Aviation Weather Center',
      description: 'Real-time weather data and forecasts',
      url: 'https://aviationweather.gov',
      category: 'Weather'
    },
    {
      title: 'Sporty\'s Study Buddy',
      description: 'Interactive test preparation',
      url: 'https://sportys.com',
      category: 'Test Prep'
    }
  ];

  const examPrep = [
    {
      subject: 'Written Exam Prep',
      questions: 150,
      completed: 120,
      score: 85,
      lastAttempt: '2024-02-15'
    },
    {
      subject: 'Oral Exam Prep',
      questions: 75,
      completed: 45,
      score: 78,
      lastAttempt: '2024-02-10'
    },
    {
      subject: 'Practical Test Prep',
      questions: 50,
      completed: 20,
      score: 82,
      lastAttempt: '2024-02-08'
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
        <h2 className="text-2xl font-bold text-white">Learning Resources</h2>
        <Button className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Study Materials */}
      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-[#f6d57f]" />
            Study Materials
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your downloaded training materials and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyMaterials.map((material, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#f6d57f] bg-opacity-20 rounded-lg flex items-center justify-center">
                      <material.icon className="w-5 h-5 text-[#f6d57f]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{material.title}</h3>
                      <p className="text-sm text-gray-400">{material.type} • {material.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={material.status === 'completed' ? 'default' : 'outline'}
                           className={material.status === 'completed' ? 'bg-green-600' : 'border-[#f6d57f] text-[#f6d57f]'}>
                      {material.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                      Open
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#f6d57f]">{material.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#f6d57f] h-2 rounded-full"
                      style={{ width: `${material.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">Last accessed: {material.lastAccessed}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* External Resources */}
      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-[#f6d57f]" />
            External Resources
          </CardTitle>
          <CardDescription className="text-gray-300">
            Helpful external websites and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalResources.map((resource, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:border-[#f6d57f] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{resource.description}</p>
                    <Badge variant="outline" className="border-[#f6d57f] text-[#f6d57f] text-xs">
                      {resource.category}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exam Preparation */}
      <Card className="bg-[#262626] border-[#f6d57f]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-[#f6d57f]" />
            Exam Preparation
          </CardTitle>
          <CardDescription className="text-gray-300">
            Practice tests and exam readiness tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examPrep.map((exam, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#f6d57f] bg-opacity-20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#f6d57f]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{exam.subject}</h3>
                      <p className="text-sm text-gray-400">
                        {exam.completed}/{exam.questions} questions completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#f6d57f]">{exam.score}%</div>
                    <div className="text-xs text-gray-400">Average Score</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#f6d57f]">{Math.round((exam.completed / exam.questions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-[#f6d57f] h-2 rounded-full"
                      style={{ width: `${(exam.completed / exam.questions) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">Last attempt: {exam.lastAttempt}</p>
                    <Button size="sm" className="bg-[#f6d57f] hover:bg-yellow-500 text-[#262626]">
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
