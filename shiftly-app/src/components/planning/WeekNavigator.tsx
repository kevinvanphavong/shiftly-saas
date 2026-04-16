'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface WeekNavigatorProps {
  weekStart:      string
  weekEnd:        string
  weekNumber:     number
  statut:         'BROUILLON' | 'PUBLIE'
  isPublishing:   boolean
  onPrev:         () => void
  onNext:         () => void
  onPublish:      () => void
  onDuplicate:    () => void
}

/** Barre de navigation hebdomadaire — semaine, statut et actions */
export default function WeekNavigator({
  weekStart, weekEnd, weekNumber, statut,
  isPublishing, onPrev, onNext, onPublish, onDuplicate,
}: WeekNavigatorProps) {
  const fmt = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const fmtShort = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })

  return (
    <motion.div variants={fadeUpVariants} initial="hidden" animate="show"
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      {/* Navigation semaine */}
      <div className="flex items-center gap-3">
        <button onClick={onPrev}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Semaine précédente">←</button>

        <div className="text-center">
          <p className="text-xs text-[var(--muted)]">Semaine {weekNumber}</p>
          <p className="text-sm font-semibold text-[var(--text)]">
            {fmtShort(weekStart)} — {fmt(weekEnd)}
          </p>
        </div>

        <button onClick={onNext}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Semaine suivante">→</button>
      </div>

      {/* Statut + actions */}
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
          statut === 'PUBLIE'
            ? 'bg-[var(--green)]/20 text-[var(--green)]'
            : 'bg-[var(--accent)]/20 text-[var(--accent)]'
        }`}>
          {statut === 'PUBLIE' ? 'Publié' : 'Brouillon'}
        </span>

        <button onClick={onPublish} disabled={isPublishing || statut === 'PUBLIE'}
          className="rounded-lg border border-[var(--green)]/40 px-3 py-1.5 text-xs font-semibold text-[var(--green)] transition-colors hover:bg-[var(--green)]/10 disabled:cursor-not-allowed disabled:opacity-40">
          {isPublishing ? '…' : 'Publier'}
        </button>

        <button onClick={onDuplicate}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
          Dupliquer →
        </button>
      </div>
    </motion.div>
  )
}
