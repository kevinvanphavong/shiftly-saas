import type { StaffMember } from '@/types/staff'

interface StatsRowProps {
  members: StaffMember[]
}

/** Ligne de 3 KPI : total · présents · points moyens */
export default function StatsRow({ members }: StatsRowProps) {
  const total    = members.length
  const presents = members.filter(m => m.status === 'present').length
  const avgPts   = total > 0
    ? Math.round(members.reduce((s, m) => s + m.points, 0) / total)
    : 0

  const stats = [
    { icon: '👥', value: total,    label: 'Membres'   },
    { icon: '🟢', value: presents, label: 'Présents'  },
    { icon: '⭐', value: avgPts,   label: 'Moy. pts'  },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(s => (
        <div
          key={s.label}
          className="bg-surface border border-border rounded-[14px] px-3 py-3 text-center"
        >
          <div className="text-lg mb-0.5">{s.icon}</div>
          <div className="font-syne font-extrabold text-[22px] text-text leading-none">
            {s.value}
          </div>
          <div className="text-[10px] text-muted mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
