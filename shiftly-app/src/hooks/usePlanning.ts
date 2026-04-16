'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type {
  PlanningAlerte,
  PlanningWeekData,
  EmployeePlanningData,
  CreateShiftPayload,
  UpdateShiftPayload,
  PublishWeekPayload,
  DuplicateWeekPayload,
} from '@/types/planning'

// ─── Planning hebdo (vue Manager) ────────────────────────────────────────────

export function usePlanningWeek(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningWeekData>({
    queryKey: ['planning', 'week', centreId, weekStart],
    queryFn:  () =>
      api.get('/planning/week', { params: { centreId, weekStart } }).then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}

// ─── Alertes planning ────────────────────────────────────────────────────────

export function usePlanningAlerts(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningAlerte[]>({
    queryKey: ['planning', 'alerts', centreId, weekStart],
    queryFn:  () =>
      api.get('/planning/alerts', { params: { centreId, weekStart } }).then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}

// ─── Planning employé (3 semaines publiées) ───────────────────────────────────

export function useEmployeePlanning() {
  return useQuery<EmployeePlanningData>({
    queryKey: ['planning', 'employee'],
    queryFn:  () => api.get('/planning/employee').then(r => r.data),
  })
}

// ─── Créer un shift ───────────────────────────────────────────────────────────

export function useCreateShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateShiftPayload) =>
      api.post('/postes/create', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
      queryClient.invalidateQueries({ queryKey: ['service', 'today', centreId] })
    },
  })
}

// ─── Modifier un shift ────────────────────────────────────────────────────────

export function useUpdateShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ posteId, ...data }: UpdateShiftPayload) =>
      api.patch(`/postes/${posteId}`, data, {
        headers: { 'Content-Type': 'application/merge-patch+json' },
      }).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
    },
  })
}

// ─── Supprimer un shift ───────────────────────────────────────────────────────

export function useDeleteShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (posteId: number) =>
      api.delete(`/postes/${posteId}`).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
      queryClient.invalidateQueries({ queryKey: ['service', 'today', centreId] })
    },
  })
}

// ─── Publier une semaine ──────────────────────────────────────────────────────

export function usePublishWeek() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PublishWeekPayload) =>
      api.post('/planning/publish', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'employee'] })
    },
  })
}

// ─── Dupliquer une semaine ────────────────────────────────────────────────────

export function useDuplicateWeek() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: DuplicateWeekPayload) =>
      api.post('/planning/duplicate', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
    },
  })
}
