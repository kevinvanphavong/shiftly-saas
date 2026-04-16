'use client'

import type { PlanningShift } from '@/types/planning'
import { hexAlpha } from '@/lib/colors'

interface ShiftBlockProps {
  shift:   PlanningShift
  onClick: (shift: PlanningShift) => void
}

/** Bloc coloré représentant un shift dans la grille planning */
export default function ShiftBlock({ shift, onClick }: ShiftBlockProps) {
  const couleur = shift.zoneCouleur

  const heures = shift.heureDebut && shift.heureFin
    ? `${shift.heureDebut} – ${shift.heureFin}`
    : '—'

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(shift)}
      onKeyDown={e => e.key === 'Enter' && onClick(shift)}
      className="mb-1 cursor-pointer rounded-md px-2 py-1 text-xs transition-opacity hover:opacity-80 focus:outline-none focus:ring-1"
      style={{
        backgroundColor: hexAlpha(couleur, 0.15),
        borderLeft:      `3px solid ${couleur}`,
        color:           couleur,
      }}
      title={`${shift.zoneNom} · ${heures}${shift.pauseMinutes ? ` · pause ${shift.pauseMinutes}min` : ''}`}
    >
      <p className="truncate font-semibold leading-tight">{shift.zoneNom}</p>
      <p className="leading-tight opacity-80">{heures}</p>
    </div>
  )
}
