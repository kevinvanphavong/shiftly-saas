'use client'

import type { PlanningShift } from '@/types/planning'
import { hexAlpha } from '@/lib/colors'

interface ShiftBlockProps {
  shift: PlanningShift
}

/** Bloc coloré représentant un shift dans la grille planning */
export default function ShiftBlock({ shift }: ShiftBlockProps) {
  const couleur = shift.zoneCouleur

  const heures = shift.heureDebut && shift.heureFin
    ? `${shift.heureDebut} – ${shift.heureFin}`
    : '—'

  return (
    <div
      className="mb-1 cursor-pointer rounded-md px-2 py-1 text-xs transition-opacity hover:opacity-80"
      style={{
        backgroundColor: hexAlpha(couleur, 0.15),
        borderLeft:      `3px solid ${couleur}`,
        color:           couleur,
      }}
      title={`${shift.zoneNom} · ${heures}${shift.pauseMinutes ? ` · pause ${shift.pauseMinutes}min` : ''}`}
    >
      <p className="font-semibold leading-tight truncate">{shift.zoneNom}</p>
      <p className="leading-tight opacity-80">{heures}</p>
    </div>
  )
}
