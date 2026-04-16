'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { PlanningAlerte, PlanningWeekData } from '@/types/planning'

// ─── Planning hebdo (vue Manager) ────────────────────────────────────────────

export function usePlanningWeek(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningWeekData>({
    queryKey: ['planning', 'week', centreId, weekStart],
    queryFn: () =>
      api
        .get('/planning/week', { params: { centreId, weekStart } })
        .then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}

// ─── Alertes planning ─────────────────────────────────────────────────────────

export function usePlanningAlerts(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningAlerte[]>({
    queryKey: ['planning', 'alerts', centreId, weekStart],
    queryFn: () =>
      api
        .get('/planning/alerts', { params: { centreId, weekStart } })
        .then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}
