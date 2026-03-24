import Panel from '@/components/ui/Panel'
import type { DashboardTopStaff } from '@/types/dashboard'

interface StaffRankingProps {
  topStaff: DashboardTopStaff[]
  /** Points du 1er pour calculer les barres relatives */
  maxPoints?: number
}

const RANK_MEDAL: Record<number, string> = { 0: '🥇', 1: '🥈', 2: '🥉' }

/** Panel — classement top staff par points */
export default function StaffRanking({ topStaff, maxPoints }: StaffRankingProps) {
  const max = maxPoints ?? Math.max(...topStaff.map(u => u.points), 1)

  return (
    <Panel title="Top Staff" action={{ label: 'Voir staff →' }}>
      {topStaff.length === 0 ? (
        <p className="text-[12px] text-muted py-3">Aucune donnée.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {topStaff.map((member, idx) => {
            const initials = member.nom
              .split(' ')
              .map(w => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            const pct = (member.points / max) * 100

            return (
              <div key={member.id} className="flex items-center gap-3">
                {/* Rank medal / number */}
                <div className="w-5 text-center flex-shrink-0">
                  {RANK_MEDAL[idx] ? (
                    <span className="text-[14px]">{RANK_MEDAL[idx]}</span>
                  ) : (
                    <span className="text-[11px] font-bold text-muted">{idx + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white font-extrabold text-[10px] flex-shrink-0"
                  style={{
                    background: member.avatarColor
                      ? `linear-gradient(135deg, ${member.avatarColor}, ${member.avatarColor}99)`
                      : 'linear-gradient(135deg, #f97316, #fb923c)',
                  }}
                >
                  {initials}
                </div>

                {/* Name + bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[12px] font-medium text-text truncate">
                      {member.nom}
                    </span>
                    <span className="text-[11px] text-muted ml-2 flex-shrink-0 font-syne font-bold">
                      {member.points} pts
                    </span>
                  </div>
                  <div className="h-[5px] bg-surface2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: member.avatarColor
                          ? `linear-gradient(90deg, ${member.avatarColor}, ${member.avatarColor}99)`
                          : 'linear-gradient(90deg, #f97316, #fb923c)',
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Panel>
  )
}
