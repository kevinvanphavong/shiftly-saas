'use client'

import type { PlanningShift, PlanningWeekData } from '@/types/planning'
import DayHeader from './DayHeader'
import PlanningRow from './PlanningRow'

interface PlanningGridProps {
  data:        PlanningWeekData
  onAddShift:  (date: string) => void
  onEditShift: (shift: PlanningShift) => void
}

/** Grille planning — en-têtes des jours + lignes employés */
export default function PlanningGrid({ data, onAddShift, onEditShift }: PlanningGridProps) {
  const today = new Date().toISOString().split('T')[0]

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(data.weekStart + 'T12:00:00')
    d.setDate(d.getDate() + i)
    return d.toISOString().split('T')[0]
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      {/* En-tête */}
      <div className="flex min-w-[700px] border-b border-[var(--border)] bg-[var(--surface2)]">
        <div className="w-[140px] shrink-0 px-3 py-2 md:w-[180px]" />
        {weekDates.map(date => (
          <div key={date} className="flex-1 border-l border-[var(--border)]">
            <DayHeader date={date} isToday={date === today} />
          </div>
        ))}
        <div className="w-[80px] shrink-0 border-l border-[var(--border)] px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
          Total
        </div>
      </div>

      {/* Corps */}
      <div className="min-w-[700px]">
        {data.employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--muted)]">
            <p className="text-2xl">📋</p>
            <p className="mt-2 text-sm">Aucun employé planifié cette semaine</p>
          </div>
        ) : (
          data.employees.map(emp => (
            <PlanningRow key={emp.id} employee={emp} weekDates={weekDates}
              onAddShift={onAddShift} onEditShift={onEditShift} />
          ))
        )}
      </div>
    </div>
  )
}
