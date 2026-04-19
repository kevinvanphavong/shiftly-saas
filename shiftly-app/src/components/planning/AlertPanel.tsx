'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { expandVariants, listVariants, listItemVariants } from '@/lib/animations'
import type { PlanningAlerte } from '@/types/planning'

interface AlertPanelProps {
  alertes: PlanningAlerte[]
  show:    boolean
}

const ICONE: Record<string, string> = {
  haute:   '🔴',
  moyenne: '🟡',
}

const LABEL: Record<string, string> = {
  ZONE_NON_COUVERTE:  'Zone non couverte',
  SANS_PAUSE:         'Sans pause',
  DEPASSEMENT_HEURES: 'Dépassement horaire',
  SOUS_PLANIFIE:      'Sous-planifié',
  MAX_JOURNALIER:     'Durée journalière max',
  MAX_HEBDO_ABSOLU:   'Durée hebdo absolue max',
  MAX_HEBDO_MOYENNE:  'Moyenne hebdo sur 12 semaines',
  REPOS_QUOTIDIEN:    'Repos quotidien insuffisant',
  REPOS_HEBDO:        'Repos hebdomadaire insuffisant',
  PAUSE_6H:           'Pause obligatoire (>6h)',
}

function AlerteItem({ alerte }: { alerte: PlanningAlerte }) {
  return (
    <motion.li variants={listItemVariants} className="flex items-start gap-3 px-5 py-3">
      <span className="mt-0.5 text-base leading-none">
        {ICONE[alerte.severite] ?? '⚪'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-[var(--text)]">
          {LABEL[alerte.type] ?? alerte.type}
        </p>
        <p className="mt-0.5 text-xs text-[var(--muted)]">{alerte.message}</p>
        {alerte.baseLegale && (
          <p className="mt-0.5 text-[10px] font-medium text-[var(--muted)] opacity-70">
            {alerte.baseLegale}
          </p>
        )}
      </div>
      {alerte.date && (
        <span className="shrink-0 text-[11px] text-[var(--muted)]">
          {new Date(alerte.date + 'T12:00:00').toLocaleDateString('fr-FR', {
            weekday: 'short', day: 'numeric', month: 'short',
          })}
        </span>
      )}
    </motion.li>
  )
}

/** Panneau d'alertes dépliable — deux sections : métier et légales ⚖️ */
export default function AlertPanel({ alertes, show }: AlertPanelProps) {
  const alertesMetier = alertes.filter(a => !a.categorie || a.categorie === 'metier')
  const alertesLegal  = alertes.filter(a => a.categorie === 'legal')

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="alert-panel"
          variants={expandVariants}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          className="overflow-hidden"
        >
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            {alertes.length === 0 ? (
              <div className="flex items-center gap-2 px-5 py-4 text-sm text-[var(--muted)]">
                <span>✅</span>
                <span>Aucune alerte cette semaine</span>
              </div>
            ) : (
              <>
                {/* Section alertes métier */}
                {alertesMetier.length > 0 && (
                  <div>
                    <div className="border-b border-[var(--border)] px-5 py-2">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
                        Alertes métier
                      </p>
                    </div>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      className="divide-y divide-[var(--border)]"
                    >
                      {alertesMetier.map((a, i) => <AlerteItem key={i} alerte={a} />)}
                    </motion.ul>
                  </div>
                )}

                {/* Section alertes légales */}
                {alertesLegal.length > 0 && (
                  <div className={alertesMetier.length > 0 ? 'border-t border-[var(--border)]' : ''}>
                    <div className="border-b border-[var(--border)] px-5 py-2">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
                        Alertes légales ⚖️
                      </p>
                    </div>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      className="divide-y divide-[var(--border)]"
                    >
                      {alertesLegal.map((a, i) => <AlerteItem key={i} alerte={a} />)}
                    </motion.ul>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
