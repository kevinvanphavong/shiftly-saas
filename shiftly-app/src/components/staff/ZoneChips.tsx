import { getZoneColor, hexAlpha } from '@/lib/colors'
import type { ZoneNom } from '@/types/staff'

interface ZoneChipsProps {
  zones:  ZoneNom[]
  size?:  'xs' | 'sm'
}

/** Chips colorés par zone — Accueil / Bar / Salle / Manager */
export default function ZoneChips({ zones, size = 'sm' }: ZoneChipsProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {zones.map(zone => {
        const color = getZoneColor(zone)
        return (
          <span
            key={zone}
            className={
              size === 'xs'
                ? 'text-[9px]  font-extrabold px-1.5 py-0.5 rounded-[4px] border'
                : 'text-[10px] font-extrabold px-2   py-0.5 rounded-[6px] border'
            }
            style={{
              color,
              background:  hexAlpha(color, 0.09),
              borderColor: hexAlpha(color, 0.21),
            }}
          >
            {zone}
          </span>
        )
      })}
    </div>
  )
}
