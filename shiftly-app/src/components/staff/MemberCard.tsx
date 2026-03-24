'use client'

import { cn } from '@/lib/cn'
import { getStaffGradient } from '@/lib/colors'
import ZoneChips           from './ZoneChips'
import LevelDots           from './LevelDots'
import MemberCardExpanded  from './MemberCardExpanded'
import type { StaffMember, StatusPresence } from '@/types/staff'

// ─── Status dot ──────────────────────────────────────────────────────────────
const STATUS_DOT: Record<StatusPresence, { cls: string; label: string }> = {
  present: { cls: 'bg-green',  label: 'Présent' },
  pause:   { cls: 'bg-yellow', label: 'Pause'   },
  absent:  { cls: 'bg-red',    label: 'Absent'  },
}

interface MemberCardProps {
  member:     StaffMember
  isExpanded: boolean
  onToggle:   (id: number) => void
}

export default function MemberCard({ member, isExpanded, onToggle }: MemberCardProps) {
  const initials = member.prenom[0] + (member.nom.split(' ')[0]?.[0] ?? '')
  const dot      = STATUS_DOT[member.status]
  const gradient = getStaffGradient(member.id)

  return (
    <div
      className={cn(
        'bg-surface border rounded-[18px] p-4 transition-all duration-200 cursor-pointer select-none',
        isExpanded ? 'border-border/80 shadow-sm' : 'border-border hover:border-border/80'
      )}
      onClick={() => onToggle(member.id)}
    >
      {/* ── Collapsed row ── */}
      <div className="flex items-center gap-3">

        {/* Avatar + status dot */}
        <div className="relative flex-shrink-0">
          <div
            className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center
                       text-white font-extrabold text-[14px] shadow-sm"
            style={{ background: gradient }}
          >
            {initials.toUpperCase()}
          </div>
          <span
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface',
              dot.cls
            )}
            title={dot.label}
          />
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[14px] font-bold text-text leading-tight">{member.nom}</span>
            {member.role === 'MANAGER' && (
              <span className="text-[9px] font-extrabold bg-accent/12 text-accent border border-accent/25 px-1.5 py-0.5 rounded-[5px]">
                MGR
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-muted font-syne font-bold">
              {member.points} pts
            </span>
            <span className="text-[10px] text-muted">·</span>
            <LevelDots niveau={member.niveau} />
            <span className="text-[10px] text-muted">Niv. {member.niveau}</span>
          </div>
        </div>

        {/* Right: zone chips + chevron */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <ZoneChips zones={member.zones} size="xs" />
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={cn(
              'text-muted transition-transform duration-200',
              isExpanded ? 'rotate-180' : 'rotate-0'
            )}
          >
            <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* ── Expanded content ── */}
      {isExpanded && <MemberCardExpanded member={member} />}
    </div>
  )
}
