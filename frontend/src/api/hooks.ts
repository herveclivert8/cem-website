import { useQuery } from '@tanstack/react-query'

import { apiClient } from './client'
import type { CallForParticipation, IdeaPost, Project, Publication } from './types'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => (await apiClient.get<Project[]>('/projects')).data,
  })
}

export function usePublications() {
  return useQuery({
    queryKey: ['publications'],
    queryFn: async () => (await apiClient.get<Publication[]>('/publications')).data,
  })
}

export function useCalls() {
  return useQuery({
    queryKey: ['calls'],
    queryFn: async () => (await apiClient.get<CallForParticipation[]>('/calls-for-participation')).data,
  })
}

export function useIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: async () => (await apiClient.get<IdeaPost[]>('/ideas')).data,
  })
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () =>
      (
        await apiClient.get<{ projects: Project[]; publications: Publication[] }>('/search', {
          params: { q: query },
        })
      ).data,
    enabled: query.trim().length > 0,
  })
}
