'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getCurrentUser,
  getUserRole,
  updateUserProfile
} from '@/lib/actions/user-actions'

export function useCurrentUser(userId: string) {
  return useQuery({
    queryKey: ['current-user', userId],
    queryFn: () => getCurrentUser(userId),
    enabled: !!userId,
  })
}

export function useUserRole(userId: string) {
  return useQuery({
    queryKey: ['user-role', userId],
    queryFn: () => getUserRole(userId),
    enabled: !!userId,
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { 
      userId: string
      data: {
        firstName?: string
        lastName?: string
        phone?: string
        avatar?: string
      }
    }) => updateUserProfile(userId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['current-user', variables.userId] })
      queryClient.invalidateQueries({ queryKey: ['student-profile'] })
      queryClient.invalidateQueries({ queryKey: ['instructor-profile'] })
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] })
    },
  })
}
