'use client'

interface DayHeaderProps {
  date:    string   // 'YYYY-MM-DD'
  isToday: boolean
}

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

/** En-tête colonne jour dans la grille planning */
export default function DayHeader({ date, isToday }: DayHeaderProps) {
  const d       = new Date(date + 'T12:00:00')
  const dayName = JOURS[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const dayNum  = d.getDate()

  return (
    <div className="flex flex-col items-center justify-center py-3">
      <span className={`text-[11px] font-semibold uppercase tracking-widest ${
        isToday ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
      }`}>
        {dayName}
      </span>
      <span className={`font-syne mt-1 flex h-8 w-8 items-center justify-center rounded-full text-[17px] font-bold ${
        isToday
          ? 'bg-[rgba(249,115,22,0.12)] text-[var(--accent)]'
          : 'text-[var(--text)]'
      }`}>
        {dayNum}
      </span>
    </div>
  )
}
