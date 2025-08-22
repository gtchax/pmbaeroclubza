"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvaluation,
  updateEvaluation,
  addSkillAssessment,
} from "@/lib/actions/evaluation-actions";
import { CreateEvaluationData } from "@/lib/types";

export function useCreateEvaluation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEvaluationData & { instructorId: string }) =>
      createEvaluation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["student-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-dashboard"] });
    },
  });
}

export function useUpdateEvaluation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      evaluationId,
      data,
    }: {
      evaluationId: string;
      data: Partial<CreateEvaluationData>;
    }) => updateEvaluation(evaluationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-evaluations"] });
    },
  });
}

export function useAddSkillAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      evaluationId,
      skillData,
    }: {
      evaluationId: string;
      skillData: {
        skillName: string;
        skillArea: string;
        score: number;
        maxScore: number;
        comments?: string;
      };
    }) => addSkillAssessment(evaluationId, skillData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-evaluations"] });
    },
  });
}
