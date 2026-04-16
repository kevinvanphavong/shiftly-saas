'use client'

import type { PlanningEmployee, PlanningShift } from '@/types/planning'
import ShiftBlock from './ShiftBlock'

interface PlanningRowProps {
  employee:  PlanningEmployee
  weekDates: string[]         // 7 dates 'YYYY-MM-DD' lundi → dimanche
}

/** Ligne d'un employé dans la grille planning — avatar + 7 cases + total heures */
export default function PlanningRow({ employee, weekDates }: PlanningRowProps) {
  // Indexe les shifts par date pour accès O(1)
  const shiftsByDate = employee.shifts.reduce<Record<string, PlanningShift[]>>(
    (acc, s) => {
      acc[s.date] = acc[s.date] ? [...acc[s.date], s] : [s]
      return acc
    },
    {}
  )

  const ecartColor =
    employee.ecartContrat > 2
      ? 'text-[var(--red)]'
      : employee.ecartContrat < -4
      ? 'text-[var(--yellow)]'
      : 'text-[var(--green)]'

  return (
    <div className="flex border-b border-[var(--border)] hover:bg-[var(--surface2)]/30">
      {/* Colonne nom employé */}
      <div className="flex w-[140px] shrink-0 items-center gap-2 px-3 py-2 md:w-[180px]">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: employee.avatarColor ?? '#6b7280' }}
        >
          {employee.nom.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-[var(--text)]">
            {employee.prenom ?? employee.nom}
          </p>
          {employee.typeContrat && (
            <p className="truncate text-[10px] text-[var(--muted)]">
              {employee.typeContrat}
            </p>
          )}
        </div>
      </div>

      {/* 7 colonnes jours */}
      {weekDates.map(date => (
        <div
          key={date}
          className="min-h-[60px] flex-1 border-l border-[var(--border)] px-1 py-1"
        >
          {shiftsByDate[date]?.map(shift => (
            <ShiftBlock key={shift.posteId} shift={shift} />
          ))}
        </div>
      ))}

      {/* Total heures + barre de progression */}
      <div className="flex w-[80px] shrink-0 flex-col items-center justify-center gap-1 border-l border-[var(--border)] px-2 py-2">
        <p className="text-sm font-bold text-[var(--text)]">
          {employee.totalHeures}h
        </p>
        {employee.heuresHebdo !== null && employee.heuresHebdo > 0 ? (
          <>
            {/* Barre de progression */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface2)]">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (employee.totalHeures / employee.heuresHebdo) * 100)}%`,
                  backgroundColor:
                    employee.ecartContrat > 2
                      ? 'var(--red)'
                      : employee.ecartContrat < -4
                      ? 'var(--yellow)'
                      : 'var(--green)',
                }}
              />
            </div>
            <p className={`text-[10px] font-medium ${ecartColor}`}>
              {employee.ecartContrat >= 0 ? '+' : ''}{employee.ecartContrat}h
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}
