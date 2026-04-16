'use client'

import type { PlanningZone } from '@/types/planning'
import { hexAlpha } from '@/lib/colors'

interface ZoneSelectorProps {
  zones:    PlanningZone[]
  value:    number | null
  onChange: (zoneId: number) => void
}

/** Grille de boutons zones pour sélectionner une zone dans ShiftModal */
export default function ZoneSelector({ zones, value, onChange }: ZoneSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {zones.map(zone => {
        const selected = value === zone.id
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onChange(zone.id)}
            className="rounded-[10px] border px-3 py-2 text-xs font-semibold transition-all"
            style={{
              borderColor:     selected ? zone.couleur : 'var(--border)',
              backgroundColor: selected ? hexAlpha(zone.couleur, 0.15) : 'transparent',
              color:           selected ? zone.couleur : 'var(--muted)',
            }}
          >
            {zone.nom}
          </button>
        )
      })}
    </div>
  )
}
