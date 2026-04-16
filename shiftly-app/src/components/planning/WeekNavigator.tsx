'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'

interface WeekNavigatorProps {
  weekStart:  string          // 'YYYY-MM-DD'
  weekEnd:    string          // 'YYYY-MM-DD'
  weekNumber: number
  statut:     'BROUILLON' | 'PUBLIE'
  onPrev:     () => void
  onNext:     () => void
}

/** Barre de navigation hebdomadaire — semaine, statut et actions */
export default function WeekNavigator({
  weekStart,
  weekEnd,
  weekNumber,
  statut,
  onPrev,
  onNext,
}: WeekNavigatorProps) {
  const fmt = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
    })

  const fmtShort = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long',
    })

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      {/* Navigation semaine */}
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Semaine précédente"
        >
          ←
        </button>

        <div className="text-center">
          <p className="text-xs text-[var(--muted)]">Semaine {weekNumber}</p>
          <p className="text-sm font-semibold text-[var(--text)]">
            {fmtShort(weekStart)} — {fmt(weekEnd)}
          </p>
        </div>

        <button
          onClick={onNext}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          aria-label="Semaine suivante"
        >
          →
        </button>
      </div>

      {/* Statut + actions (désactivées en Phase A) */}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statut === 'PUBLIE'
              ? 'bg-[var(--green)]/20 text-[var(--green)]'
              : 'bg-[var(--accent)]/20 text-[var(--accent)]'
          }`}
        >
          {statut === 'PUBLIE' ? 'Publié' : 'Brouillon'}
        </span>

        <button
          disabled
          title="Disponible en Phase C"
          className="cursor-not-allowed rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] opacity-50"
        >
          Publier
        </button>

        <button
          disabled
          title="Disponible en Phase C"
          className="cursor-not-allowed rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] opacity-50"
        >
          Dupliquer
        </button>
      </div>
    </motion.div>
  )
}
