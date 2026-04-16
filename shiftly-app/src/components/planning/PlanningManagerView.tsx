'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { listVariants } from '@/lib/animations'
import { usePlanningWeek } from '@/hooks/usePlanning'
import { useAuthStore } from '@/store/authStore'
import WeekNavigator from './WeekNavigator'
import PlanningGrid from './PlanningGrid'
import StatsBar from './StatsBar'
import AlertPanel from './AlertPanel'

/** Retourne le lundi de la semaine courante au format YYYY-MM-DD */
function getCurrentMonday(): string {
  const d      = new Date()
  const day    = d.getDay()
  const offset = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + offset)
  return d.toISOString().split('T')[0]
}

/** Décale weekStart de N semaines */
function shiftWeek(weekStart: string, delta: number): string {
  const d = new Date(weekStart + 'T12:00:00')
  d.setDate(d.getDate() + delta * 7)
  return d.toISOString().split('T')[0]
}

/** Numéro de semaine ISO */
function getWeekNumber(weekStart: string): number {
  const d   = new Date(weekStart + 'T12:00:00')
  const jan = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - jan.getTime()) / 86400000 + jan.getDay() + 1) / 7)
}

/** Vue complète planning Manager — navigation + grille + stats + alertes */
export default function PlanningManagerView() {
  const [weekStart, setWeekStart]   = useState<string>(getCurrentMonday)
  const [showAlerts, setShowAlerts] = useState(false)
  const centreId = useAuthStore(s => s.centreId)

  const { data, isLoading, isError } = usePlanningWeek(weekStart)

  const weekEnd = (() => {
    const d = new Date(weekStart + 'T12:00:00')
    d.setDate(d.getDate() + 6)
    return d.toISOString().split('T')[0]
  })()

  // ── Loading ──
  if (!centreId || isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      </div>
    )
  }

  // ── Erreur ──
  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
        <p className="text-2xl">⚠️</p>
        <p className="text-sm">Impossible de charger le planning</p>
      </div>
    )
  }

  const alertes    = data?.alertes    ?? []
  const stats      = data?.stats
  const alertCount = alertes.length

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col gap-4 overflow-auto p-4 md:p-6"
    >
      <WeekNavigator
        weekStart={weekStart}
        weekEnd={weekEnd}
        weekNumber={getWeekNumber(weekStart)}
        statut={data?.statut ?? 'BROUILLON'}
        onPrev={() => setWeekStart(ws => shiftWeek(ws, -1))}
        onNext={() => setWeekStart(ws => shiftWeek(ws, +1))}
      />

      {data && <PlanningGrid data={data} />}

      {stats && (
        <StatsBar
          stats={stats}
          alertCount={alertCount}
          showAlerts={showAlerts}
          onToggleAlerts={() => setShowAlerts(v => !v)}
        />
      )}

      <AlertPanel alertes={alertes} show={showAlerts} />
    </motion.div>
  )
}
