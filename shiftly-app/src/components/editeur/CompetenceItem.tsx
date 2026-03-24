'use client'

import type { EditorCompetence } from '@/types/editeur'

const DIFF_CFG = {
  simple:      { label: 'Simple',       cls: 'bg-green/10 text-green' },
  avancee:     { label: 'Avancée',      cls: 'bg-yellow/10 text-yellow' },
  experimente: { label: 'Expérimenté',  cls: 'bg-red/10 text-red' },
}

interface Props {
  competence: EditorCompetence
  onEdit:     () => void
  onDelete:   () => void
}

export default function CompetenceItem({ competence, onEdit, onDelete }: Props) {
  const diff = DIFF_CFG[competence.difficulte]

  return (
    <div className="flex items-center gap-2 px-3 py-[10px] rounded-[12px] bg-surface border border-border mb-1.5">
      {/* points */}
      <span className="font-syne font-extrabold text-[13px] text-accent min-w-[36px]">
        {competence.points}
      </span>

      {/* info */}
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold mb-[2px]">{competence.nom}</div>
        <div className="flex gap-1">
          <span className={`text-[9px] font-bold px-1.5 py-[2px] rounded-[5px] ${diff.cls}`}>
            {diff.label}
          </span>
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={onEdit}
          className="w-7 h-7 rounded-[8px] border border-border bg-transparent flex items-center justify-center text-[13px] text-muted hover:border-accent hover:text-accent transition-all"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="w-7 h-7 rounded-[8px] border border-border bg-transparent flex items-center justify-center text-[13px] text-muted hover:border-red hover:text-red transition-all"
        >
          🗄️
        </button>
      </div>
    </div>
  )
}
