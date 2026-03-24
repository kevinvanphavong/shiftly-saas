'use client'

import { cn } from '@/lib/cn'
import type { ServiceMission } from '@/types/service'

interface MissionItemProps {
  mission:   ServiceMission
  completed: boolean
  loading?:  boolean
  onToggle:  (missionId: number, currentlyCompleted: boolean) => void
}

const PRIORITE_DOT: Record<string, string> = {
  vitale:           'bg-red',
  important:        'bg-yellow',
  ne_pas_oublier:   'bg-muted',
}

const TYPE_BADGE: Record<string, string> = {
  FIXE:       'text-blue   bg-blue/10   border-blue/20',
  PONCTUELLE: 'text-purple bg-purple/10 border-purple/20',
}

export default function MissionItem({
  mission,
  completed,
  loading = false,
  onToggle,
}: MissionItemProps) {
  return (
    <button
      onClick={() => !loading && onToggle(mission.id, completed)}
      disabled={loading}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-left transition-all duration-200',
        completed
          ? 'bg-green/5   border border-green/15'
          : 'bg-surface2 border border-transparent hover:border-border',
        loading && 'opacity-50 cursor-wait'
      )}
    >
      {/* Custom checkbox */}
      <div
        className={cn(
          'w-[18px] h-[18px] rounded-[5px] flex items-center justify-center flex-shrink-0 transition-all duration-200 border',
          completed
            ? 'bg-green border-green'
            : 'bg-surface border-border'
        )}
      >
        {completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Mission text */}
      <span
        className={cn(
          'flex-1 text-[13px] leading-snug transition-all duration-200',
          completed ? 'text-muted line-through' : 'text-text'
        )}
      >
        {mission.texte}
      </span>

      {/* Right badges */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Priority dot */}
        <span
          className={cn(
            'w-[6px] h-[6px] rounded-full flex-shrink-0',
            PRIORITE_DOT[mission.priorite] ?? 'bg-muted'
          )}
          title={mission.priorite.replace('_', ' ')}
        />
        {/* Type badge */}
        <span
          className={cn(
            'text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded-[4px] border hidden sm:inline-block',
            TYPE_BADGE[mission.type] ?? 'text-muted bg-surface2 border-border'
          )}
        >
          {mission.type === 'FIXE' ? 'Fixe' : 'Ponct.'}
        </span>
      </div>
    </button>
  )
}
