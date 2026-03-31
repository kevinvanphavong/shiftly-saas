'use client'

import { formatDistanceToNow, format } from 'date-fns'
import { fr }                          from 'date-fns/locale'
import { cn }                          from '@/lib/cn'
import { ty }                          from '@/lib/typography'
import { inc }                         from '@/lib/incidentStyles'
import { getInitials, getDisplayName } from '@/lib/userDisplay'
import IncidentModalShell              from './IncidentModalShell'
import type { DashboardAlerte }        from '@/types/dashboard'
import type { IncidentFull }           from '@/types/incident'

type IncidentItem = DashboardAlerte | IncidentFull

interface Props {
  open:      boolean
  incident:  IncidentItem | null
  onClose:   () => void
  onEdit?:   () => void
}

function Avatar({ nom, prenom, avatarColor }: { nom: string; prenom?: string | null; avatarColor: string }) {
  return (
    <div className={inc.avatar} style={{ background: avatarColor }}>
      {getInitials(nom, prenom)}
    </div>
  )
}

export default function ModalIncidentDetail({ open, incident, onClose, onEdit }: Props) {
  if (!incident) return null

  const timeAgo = (() => {
    try { return formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true, locale: fr }) }
    catch { return '' }
  })()

  const resolvedAt  = 'resolvedAt' in incident ? incident.resolvedAt : null
  const resolvedStr = resolvedAt
    ? format(new Date(resolvedAt), "d MMM yyyy 'à' HH:mm", { locale: fr })
    : null

  const footer = (
    <>
      {onEdit && (
        <button onClick={onEdit} className={inc.btnCancel}>
          ✏️ Modifier
        </button>
      )}
      <button onClick={onClose} className={inc.btnPrimary}>
        Fermer
      </button>
    </>
  )

  return (
    <IncidentModalShell
      open={open}
      onClose={onClose}
      title="Détail de l'incident"
      footer={footer}
      maxH="max-h-[88dvh]"
    >
      {/* Titre */}
      <p className="text-[15px] font-semibold text-text leading-snug">{incident.titre}</p>

      {/* Badges sévérité + statut */}
      <div className="flex flex-wrap gap-2">
        <span className={cn(inc.badge, 'border', inc.sevBadgeBorder[incident.severite])}>
          {inc.sevLabel[incident.severite] ?? incident.severite}
        </span>
        <span className={cn(inc.badge, inc.statutBadge[incident.statut] ?? 'text-muted bg-surface2')}>
          {inc.statutLabel[incident.statut] ?? incident.statut}
        </span>
      </div>

      {/* Zone */}
      {incident.zone && (
        <div>
          <p className={`${ty.sectionLabel} mb-1.5`}>Zone</p>
          <span
            className="text-[12px] font-semibold px-2.5 py-1 rounded-[8px]"
            style={{ color: incident.zone.couleur, background: `${incident.zone.couleur}18` }}
          >
            {incident.zone.nom}
          </span>
        </div>
      )}

      {/* Signalé par */}
      {incident.creePar && (
        <div>
          <p className={`${ty.sectionLabel} mb-1.5`}>Signalé par</p>
          <div className="flex items-center gap-2.5">
            <Avatar nom={incident.creePar.nom} prenom={incident.creePar.prenom} avatarColor={incident.creePar.avatarColor} />
            <span className={ty.bodyLg}>{getDisplayName(incident.creePar.nom, incident.creePar.prenom)}</span>
            {timeAgo && <span className={ty.meta}>{timeAgo}</span>}
          </div>
        </div>
      )}

      {/* Staff impliqués */}
      {incident.staffImpliques.length > 0 && (
        <div>
          <p className={`${ty.sectionLabel} mb-1.5`}>Personnes impliquées</p>
          <div className="flex flex-col gap-2">
            {incident.staffImpliques.map(m => (
              <div key={m.id} className="flex items-center gap-2.5">
                <Avatar nom={m.nom} prenom={m.prenom} avatarColor={m.avatarColor} />
                <span className={ty.bodyLg}>{getDisplayName(m.nom, m.prenom)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="bg-surface2 rounded-[12px] p-3 space-y-1">
        <p className={ty.meta}>
          Signalé {timeAgo}
          {' '}— {format(new Date(incident.createdAt), "d MMM yyyy 'à' HH:mm", { locale: fr })}
        </p>
        {resolvedStr && (
          <p className="text-[11px] text-green">Résolu le {resolvedStr}</p>
        )}
      </div>
    </IncidentModalShell>
  )
}
