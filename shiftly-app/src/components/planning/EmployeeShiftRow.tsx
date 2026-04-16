'use client'

import type { EmployeeShift } from '@/types/planning'
import { hexAlpha } from '@/lib/colors'

interface EmployeeShiftRowProps {
  date:   string
  shifts: EmployeeShift[]
}

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

/** Ligne d'un jour dans la carte semaine employé */
export default function EmployeeShiftRow({ date, shifts }: EmployeeShiftRowProps) {
  const d       = new Date(date + 'T12:00:00')
  const dayName = JOURS[d.getDay()]
  const dayNum  = d.getDate()
  const today   = new Date().toISOString().split('T')[0]
  const isToday = date === today

  return (
    <div className={`flex items-start gap-3 px-4 py-3 ${isToday ? 'bg-[var(--accent)]/5' : ''}`}>
      {/* Jour */}
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className={`text-[10px] font-semibold uppercase ${isToday ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
          {dayName}
        </span>
        <span className={`text-sm font-bold ${isToday ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
          {dayNum}
        </span>
      </div>

      {/* Shifts ou repos */}
      <div className="flex flex-1 flex-col gap-1.5">
        {shifts.length === 0 ? (
          <span className="text-xs text-[var(--muted)]">Repos</span>
        ) : (
          shifts.map((s, i) => (
            <div key={i}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs"
              style={{ backgroundColor: hexAlpha(s.zoneCouleur, 0.12) }}>
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.zoneCouleur }} />
              <span className="font-semibold" style={{ color: s.zoneCouleur }}>{s.zoneNom}</span>
              {s.heureDebut && s.heureFin && (
                <span className="text-[var(--muted)]">{s.heureDebut} – {s.heureFin}</span>
              )}
              {s.pauseMinutes > 0 && (
                <span className="text-[var(--muted)]">· pause {s.pauseMinutes}min</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
