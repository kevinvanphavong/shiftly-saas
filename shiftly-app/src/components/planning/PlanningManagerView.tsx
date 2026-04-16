'use client'

import { useState } from 'react'
import { usePlanningWeek, usePublishWeek, useDuplicateWeek } from '@/hooks/usePlanning'
import type { PlanningShift } from '@/types/planning'
import WeekNavigator from './WeekNavigator'
import PlanningGrid from './PlanningGrid'
import StatsBar from './StatsBar'
import AlertPanel from './AlertPanel'
import ShiftModal from './ShiftModal'

function getCurrentMonday(): string {
  const d = new Date(); const day = d.getDay()
  d.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  return d.toISOString().split('T')[0]
}

function shiftWeek(ws: string, delta: number): string {
  const d = new Date(ws + 'T12:00:00'); d.setDate(d.getDate() + delta * 7)
  return d.toISOString().split('T')[0]
}

function getWeekNumber(ws: string): number {
  const d = new Date(ws + 'T12:00:00'); const jan = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - jan.getTime()) / 86400000 + jan.getDay() + 1) / 7)
}

/** Vue Manager du module Planning */
export default function PlanningManagerView() {
  const [weekStart, setWeekStart]   = useState<string>(getCurrentMonday)
  const [showAlerts, setShowAlerts] = useState(false)
  const [modalOpen, setModalOpen]   = useState(false)
  const [modalDate, setModalDate]   = useState('')
  const [modalEmpId, setModalEmpId] = useState<number | undefined>()
  const [editShift, setEditShift]   = useState<PlanningShift | null>(null)

  const { data, isLoading, isError } = usePlanningWeek(weekStart)
  const publishWeek   = usePublishWeek()
  const duplicateWeek = useDuplicateWeek()

  const weekEnd = (() => {
    const d = new Date(weekStart + 'T12:00:00'); d.setDate(d.getDate() + 6)
    return d.toISOString().split('T')[0]
  })()

  function openAdd(date: string, employeeId: number) {
    setEditShift(null); setModalDate(date); setModalEmpId(employeeId); setModalOpen(true)
  }
  function openEdit(shift: PlanningShift) {
    setEditShift(shift); setModalDate(shift.date); setModalEmpId(undefined); setModalOpen(true)
  }

  if (isLoading) return (
    <div className="flex h-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
    </div>
  )

  if (isError) return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
      <p className="text-2xl">⚠️</p>
      <p className="text-sm">Impossible de charger le planning</p>
    </div>
  )

  const statut     = data?.statut ?? 'BROUILLON'
  const alertes    = data?.alertes ?? []
  const stats      = data?.stats
  const zones      = data?.zones ?? []

  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">

        {/* ── Header page ── */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="font-syne text-xl font-bold text-[var(--text)]">Planning</h1>
            <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              statut === 'PUBLIE'
                ? 'bg-[rgba(34,197,94,0.12)] text-[var(--green)]'
                : 'bg-[rgba(249,115,22,0.12)] text-[var(--accent)]'
            }`}>
              {statut === 'PUBLIE' ? 'Publié' : 'Brouillon'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => duplicateWeek.mutate({ sourceWeekStart: weekStart, targetWeekStart: shiftWeek(weekStart, 1) })}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-[13px] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:bg-[rgba(249,115,22,0.08)]"
            >
              📋 Dupliquer semaine
            </button>
            <button
              onClick={() => publishWeek.mutate({ weekStart })}
              disabled={publishWeek.isPending || statut === 'PUBLIE'}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {publishWeek.isPending ? '…' : '✓ Publier'}
            </button>
          </div>
        </div>

        {/* ── Navigateur semaine ── */}
        <WeekNavigator
          weekStart={weekStart}
          weekEnd={weekEnd}
          weekNumber={getWeekNumber(weekStart)}
          onPrev={() => setWeekStart(ws => shiftWeek(ws, -1))}
          onNext={() => setWeekStart(ws => shiftWeek(ws, +1))}
          onToday={() => setWeekStart(getCurrentMonday())}
        />

        {/* ── Grille ── */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {data && (
            <PlanningGrid data={data} onAddShift={openAdd} onEditShift={openEdit} />
          )}
        </div>

        {/* ── Stats + Alertes ── */}
        {stats && (
          <StatsBar
            stats={stats}
            zones={zones}
            alertCount={alertes.length}
            showAlerts={showAlerts}
            onToggleAlerts={() => setShowAlerts(v => !v)}
          />
        )}
        <AlertPanel alertes={alertes} show={showAlerts} />
      </div>

      <ShiftModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        zones={zones}
        date={modalDate}
        shift={editShift}
        defaultEmployeeId={modalEmpId}
      />
    </>
  )
}
