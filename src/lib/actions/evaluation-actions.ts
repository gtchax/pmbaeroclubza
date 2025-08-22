'use server'

import { prisma } from '@/lib/prisma'
import { CreateEvaluationData } from '@/lib/types'

export async function createEvaluation(data: CreateEvaluationData & { instructorId: string }) {
  try {
    const evaluation = await prisma.evaluation.create({
      data: {
        studentId: data.studentId,
        instructorId: data.instructorId,
        type: data.type,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        score: data.score,
        maxScore: data.maxScore,
        passed: data.passed,
        notes: data.notes,
        skillAssessments: data.skillAssessments ? {
          create: data.skillAssessments,
        } : undefined,
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        instructor: {
          include: {
            user: true,
          },
        },
        skillAssessments: true,
      },
    })

    return evaluation
  } catch (error) {
    console.error('Error creating evaluation:', error)
    throw new Error('Failed to create evaluation')
  }
}

export async function updateEvaluation(evaluationId: string, data: Partial<CreateEvaluationData>) {
  try {
    const evaluation = await prisma.evaluation.update({
      where: { id: evaluationId },
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : undefined,
        score: data.score,
        maxScore: data.maxScore,
        passed: data.passed,
        notes: data.notes,
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        instructor: {
          include: {
            user: true,
          },
        },
        skillAssessments: true,
      },
    })

    return evaluation
  } catch (error) {
    console.error('Error updating evaluation:', error)
    throw new Error('Failed to update evaluation')
  }
}

export async function getEvaluationsByStudent(studentId: string) {
  try {
    const evaluations = await prisma.evaluation.findMany({
      where: { studentId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        instructor: {
          include: {
            user: true,
          },
        },
        skillAssessments: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return evaluations
  } catch (error) {
    console.error('Error fetching student evaluations:', error)
    throw new Error('Failed to fetch student evaluations')
  }
}

export async function getEvaluationsByInstructor(instructorId: string) {
  try {
    const evaluations = await prisma.evaluation.findMany({
      where: { instructorId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        instructor: {
          include: {
            user: true,
          },
        },
        skillAssessments: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return evaluations
  } catch (error) {
    console.error('Error fetching instructor evaluations:', error)
    throw new Error('Failed to fetch instructor evaluations')
  }
}

export async function addSkillAssessment(evaluationId: string, skillData: {
  skillName: string
  skillArea: string
  score: number
  maxScore: number
  comments?: string
}) {
  try {
    const skillAssessment = await prisma.skillAssessment.create({
      data: {
        evaluationId,
        ...skillData,
      },
    })

    return skillAssessment
  } catch (error) {
    console.error('Error adding skill assessment:', error)
    throw new Error('Failed to add skill assessment')
  }
}
