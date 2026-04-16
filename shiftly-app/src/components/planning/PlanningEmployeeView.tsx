'use client'

import { motion } from 'framer-motion'
import { listVariants } from '@/lib/animations'
import { useEmployeePlanning } from '@/hooks/usePlanning'
import WeekCard from './WeekCard'

/** Vue employé — 3 semaines publiées glissantes (IDCC 1790 : 7j de prévenance) */
export default function PlanningEmployeeView() {
  const { data, isLoading, isError } = useEmployeePlanning()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
        <p className="text-2xl">⚠️</p>
        <p className="text-sm">Impossible de charger ton planning</p>
      </div>
    )
  }

  const weeks = data?.weeks ?? []

  if (weeks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-3xl">📅</p>
        <p className="text-base font-semibold text-[var(--text)]">Aucun planning publié</p>
        <p className="text-sm text-[var(--muted)]">
          Ton manager n'a pas encore publié de planning pour les prochaines semaines.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 overflow-auto p-4 md:p-6"
    >
      <div>
        <h1 className="font-syne text-xl font-extrabold text-[var(--text)]">Mon planning</h1>
        <p className="text-xs text-[var(--muted)]">{weeks.length} semaine{weeks.length > 1 ? 's' : ''} publiée{weeks.length > 1 ? 's' : ''}</p>
      </div>

      {weeks.map(week => (
        <WeekCard key={week.weekStart} week={week} />
      ))}
    </motion.div>
  )
}
