'use client'

import { formatDistanceToNow } from 'date-fns'
import { fr }                  from 'date-fns/locale'
import { cn }                  from '@/lib/cn'
import { ty }                  from '@/lib/typography'
import Panel                   from '@/components/ui/Panel'
import type { DashboardAlerte, DashboardIncidents } from '@/types/dashboard'

interface IncidentsListProps {
  data:      DashboardIncidents
  userRole?: 'MANAGER' | 'EMPLOYE'
  onView:    (inc: DashboardAlerte) => void
  onEdit:    (inc: DashboardAlerte) => void
  onClose:   (id: number) => void
}

const SEV_DOT: Record<string, string> = {
  haute:   'bg-red',
  moyenne: 'bg-yellow',
  basse:   'bg-muted',
}
const SEV_BADGE: Record<string, string> = {
  haute:   'text-red    bg-red/10',
  moyenne: 'text-yellow bg-yellow/10',
  basse:   'text-muted  bg-surface2',
}
const SEV_LABEL: Record<string, string> = { haute: 'Haute', moyenne: 'Moyenne', basse: 'Basse' }

export default function IncidentsList({ data, userRole, onView, onEdit, onClose }: IncidentsListProps) {
  const { alertes, total, haute } = data
  const isManager = userRole === 'MANAGER'

  return (
    <Panel title="Incidents ouverts">
      <div className="flex items-center gap-2 mb-3">
        <span className={ty.meta}>{total} ouvert{total > 1 ? 's' : ''}</span>
        {haute > 0 && (
          <span className={`${ty.badge} text-red bg-red/10 px-1.5 py-0.5 rounded-[5px]`}>
            {haute} haute
          </span>
        )}
      </div>

      {total === 0 ? (
        <div className={`${ty.metaLg} flex items-center gap-2 py-3`}>
          <span className="text-xl">✅</span>
          Aucun incident en cours
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {alertes.map((inc, i) => {
            const timeAgo = (() => {
              try { return formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true, locale: fr }) }
              catch { return '' }
            })()

            return (
              <div
                key={inc.id ?? i}
                className="flex items-start gap-2.5 p-2.5 bg-surface2 rounded-[12px] border border-border/50"
              >
                <span className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', SEV_DOT[inc.severite] ?? 'bg-muted')} />

                <div className="flex-1 min-w-0">
                  <div className={`${ty.body} leading-snug`}>{inc.titre}</div>
                  <div className="flex items-center flex-wrap gap-1.5 mt-1">
                    <span className={cn(`${ty.badge} uppercase px-1.5 py-0.5 rounded-[4px]`, SEV_BADGE[inc.severite] ?? 'text-muted bg-surface2')}>
                      {SEV_LABEL[inc.severite]}
                    </span>
                    {inc.zone && (
                      <span
                        className={`${ty.badge} font-semibold px-1.5 py-0.5 rounded-[4px]`}
                        style={{ color: inc.zone.couleur, backgroundColor: `${inc.zone.couleur}18` }}
                      >
                        {inc.zone.nom}
                      </span>
                    )}
                    {timeAgo && <span className={ty.metaSm}>{timeAgo}</span>}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    {/* Voir — discret, texte seul */}
                    <button
                      onClick={() => onView(inc)}
                      className="text-[10px] font-semibold text-muted hover:text-text transition-colors underline-offset-2 hover:underline"
                    >
                      Voir le détail
                    </button>

                    {/* Séparateur */}
                    {isManager && <span className="text-border text-[10px]">·</span>}

                    {/* Modifier (manager) — fond accent */}
                    {isManager && (
                      <button
                        onClick={() => onEdit(inc)}
                        className="px-2 py-0.5 rounded-[6px] bg-accent/15 text-[10px] font-bold text-accent hover:bg-accent/25 transition-colors"
                      >
                        ✏️ Modifier
                      </button>
                    )}

                    {/* Clôturer (manager) — fond vert */}
                    {isManager && (
                      <button
                        onClick={() => onClose(inc.id)}
                        className="px-2 py-0.5 rounded-[6px] bg-green/15 text-[10px] font-bold text-green hover:bg-green/25 transition-colors"
                      >
                        ✓ Clôturer
                      </button>
                    )}
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
