'use client'

import { cn } from '@/lib/cn'
import MissionItem from './MissionItem'
import type { ServicePoste } from '@/types/service'

interface ZoneCardProps {
  /** Toutes les postes de la même zone, regroupées */
  postes:           ServicePoste[]
  completions:      Record<number, boolean>   // missionId → completed
  loadingMissions:  Set<number>
  onToggle:         (missionId: number, completed: boolean, posteId: number) => void
}

export default function ZoneCard({
  postes,
  completions,
  loadingMissions,
  onToggle,
}: ZoneCardProps) {
  if (postes.length === 0) return null

  const zone       = postes[0].zone
  const allMissions = postes.flatMap(p => p.missions)
  const totalMissions = allMissions.length
  const doneMissions  = allMissions.filter(m => completions[m.id]).length
  const pct           = totalMissions > 0 ? Math.round((doneMissions / totalMissions) * 100) : 0

  // Staff assigné à cette zone (dedupliqué)
  const assignedStaff = postes
    .map(p => p.user)
    .filter((u): u is NonNullable<typeof u> => u !== null)
    .filter((u, i, arr) => arr.findIndex(x => x.id === u.id) === i)

  return (
    <div className="bg-surface border border-border rounded-[18px] overflow-hidden">
      {/* ── Zone header ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          {/* Color dot */}
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: zone.couleur }}
          />
          <h3
            className="font-syne font-extrabold text-[14px] uppercase tracking-wide"
            style={{ color: zone.couleur }}
          >
            {zone.nom}
          </h3>
        </div>

        {/* Completion badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted">
            {doneMissions}/{totalMissions}
          </span>
          <span
            className={cn(
              'text-[10px] font-extrabold px-2 py-0.5 rounded-[6px]',
              pct === 100
                ? 'text-green bg-green/10'
                : pct >= 50
                ? 'text-yellow bg-yellow/10'
                : 'text-muted bg-surface2'
            )}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Zone progress bar */}
      <div className="px-4 mb-3">
        <div className="h-[4px] bg-surface2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: zone.couleur }}
          />
        </div>
      </div>

      {/* Staff row */}
      {assignedStaff.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 mb-3">
          {assignedStaff.map(member => {
            const initials = member.nom.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
            return (
              <div
                key={member.id}
                className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] border"
                style={{
                  background:   `${member.avatarColor}15`,
                  borderColor:  `${member.avatarColor}30`,
                }}
              >
                <div
                  className="w-5 h-5 rounded-[5px] flex items-center justify-center text-white font-extrabold text-[9px] flex-shrink-0"
                  style={{ background: member.avatarColor }}
                >
                  {initials}
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: member.avatarColor }}
                >
                  {member.nom}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Missions grouped by poste ── */}
      <div className="px-3 pb-3 flex flex-col gap-1">
        {postes.map(poste => (
          <div key={poste.id}>
            {/* Poste divider (only if multiple postes in zone) */}
            {postes.length > 1 && poste.user && (
              <div className="flex items-center gap-2 px-1 mb-1 mt-2 first:mt-0">
                <div
                  className="w-4 h-4 rounded-[4px] flex items-center justify-center text-white font-extrabold text-[8px] flex-shrink-0"
                  style={{ background: poste.user.avatarColor }}
                >
                  {poste.user.nom.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <span className="text-[10px] text-muted font-medium">{poste.user.nom}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {poste.missions
              .slice()
              .sort((a, b) => a.ordre - b.ordre)
              .map(mission => (
                <MissionItem
                  key={mission.id}
                  mission={mission}
                  completed={!!completions[mission.id]}
                  loading={loadingMissions.has(mission.id)}
                  onToggle={(missionId, currentlyCompleted) =>
                    onToggle(missionId, currentlyCompleted, poste.id)
                  }
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
