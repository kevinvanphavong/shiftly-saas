'use client'

interface DayHeaderProps {
  date:    string   // 'YYYY-MM-DD'
  isToday: boolean
}

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

/** En-tête d'une colonne jour dans la grille planning */
export default function DayHeader({ date, isToday }: DayHeaderProps) {
  const d       = new Date(date + 'T12:00:00')
  const dayName = JOURS[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const dayNum  = d.getDate()

  return (
    <div className={`flex flex-col items-center justify-center py-2 ${isToday ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
      <span className="text-xs font-medium">{dayName}</span>
      <span
        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${
          isToday ? 'bg-[var(--accent)] text-white' : ''
        }`}
      >
        {dayNum}
      </span>
    </div>
  )
}
