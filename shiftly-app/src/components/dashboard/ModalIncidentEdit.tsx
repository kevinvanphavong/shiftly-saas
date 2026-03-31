'use client'

import { useState, useEffect }              from 'react'
import { cn }                               from '@/lib/cn'
import { hexAlpha }                         from '@/lib/colors'
import { ty }                               from '@/lib/typography'
import { inc }                              from '@/lib/incidentStyles'
import { getInitials, getDisplayName }      from '@/lib/userDisplay'
import IncidentModalShell                   from './IncidentModalShell'
import type { IncidentSeverite, ServiceZone } from '@/types/service'
import type { DashboardAlerte }             from '@/types/dashboard'
import type { IncidentFull }                from '@/types/incident'

type IncidentItem = DashboardAlerte | IncidentFull

interface StaffSimple { id: number; nom: string; prenom?: string | null; avatarColor: string }

interface Props {
  open:      boolean
  incident:  IncidentItem | null
  zones:     ServiceZone[]
  staff:     StaffSimple[]
  onClose:   () => void
  onSubmit:  (payload: {
    titre:    string
    severite: IncidentSeverite
    statut:   'OUVERT' | 'EN_COURS' | 'RESOLU'
    zoneId:   number | null
    staffIds: number[]
  }) => Promise<void>
}

export default function ModalIncidentEdit({ open, incident, zones, staff, onClose, onSubmit }: Props) {
  const [titre,      setTitre]      = useState('')
  const [severite,   setSeverite]   = useState<IncidentSeverite>('moyenne')
  const [statut,     setStatut]     = useState<'OUVERT' | 'EN_COURS' | 'RESOLU'>('OUVERT')
  const [zoneId,     setZoneId]     = useState<number | null>(null)
  const [staffIds,   setStaffIds]   = useState<number[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  useEffect(() => {
    if (incident && open) {
      setTitre(incident.titre)
      setSeverite(incident.severite)
      setStatut((incident.statut as 'OUVERT' | 'EN_COURS' | 'RESOLU') ?? 'OUVERT')
      setZoneId(incident.zone?.id ?? null)
      setStaffIds(incident.staffImpliques.map(s => s.id))
      setError(null)
    }
  }, [incident, open])

  const toggleStaff = (id: number) =>
    setStaffIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleSubmit = async () => {
    if (!titre.trim()) { setError('La description est obligatoire.'); return }
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({ titre: titre.trim(), severite, statut, zoneId, staffIds })
      onClose()
    } catch {
      setError('Erreur lors de la sauvegarde — réessaie.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!incident) return null

  const footer = (
    <>
      <button onClick={onClose} className={inc.btnCancel}>Annuler</button>
      <button
        onClick={handleSubmit}
        disabled={submitting || !titre.trim()}
        className={cn(inc.btnSubmit, !submitting && titre.trim() && 'hover:opacity-90 active:scale-[0.98]')}
      >
        {submitting ? '⏳ Sauvegarde…' : '💾 Enregistrer'}
      </button>
    </>
  )

  return (
    <IncidentModalShell open={open} onClose={onClose} title="Modifier l'incident" footer={footer}>

      {/* Description */}
      <div>
        <label className={inc.fieldLabel}>
          Description <span className="text-red">*</span>
        </label>
        <textarea
          value={titre}
          onChange={e => setTitre(e.target.value)}
          rows={3}
          className={cn(inc.textarea, error && !titre.trim() ? 'border-red/60' : 'border-border focus:border-accent/60')}
        />
        {error && !titre.trim() && <p className="text-[11px] text-red mt-1">{error}</p>}
      </div>

      {/* Sévérité */}
      <div>
        <label className={inc.fieldLabel}>Sévérité</label>
        <div className="flex gap-2">
          {inc.severiteOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setSeverite(s.value)}
              className={cn('flex-1 py-2 rounded-[10px] border text-[12px] font-bold transition-all',
                severite === s.value ? s.activeCls : inc.chipInactive
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statut */}
      <div>
        <label className={inc.fieldLabel}>Statut</label>
        <div className="flex gap-2">
          {inc.statutOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setStatut(s.value)}
              className={cn('flex-1 py-2 rounded-[10px] border text-[12px] font-bold transition-all',
                statut === s.value ? `${s.activeCls} border-current` : inc.chipInactive
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Zone */}
      {zones.length > 0 && (
        <div>
          <label className={inc.fieldLabel}>Zone concernée</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setZoneId(null)}
              className={cn('px-3 py-1.5 rounded-[8px] border text-[12px] font-semibold transition-all',
                zoneId === null ? 'border-accent/50 bg-accent/10 text-accent' : inc.chipInactive
              )}
            >
              Aucune
            </button>
            {zones.map(z => (
              <button
                key={z.id}
                onClick={() => setZoneId(z.id)}
                className={cn('px-3 py-1.5 rounded-[8px] border text-[12px] font-semibold transition-all',
                  zoneId === z.id ? 'border-current' : inc.chipInactive
                )}
                style={zoneId === z.id
                  ? { color: z.couleur, background: hexAlpha(z.couleur, 0.08), borderColor: hexAlpha(z.couleur, 0.31) }
                  : {}}
              >
                {z.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Staff impliqués */}
      {staff.length > 0 && (
        <div>
          <label className={inc.fieldLabel}>
            Personnes impliquées
            <span className="text-muted font-normal normal-case ml-1">(optionnel)</span>
          </label>
          <div className="flex flex-col gap-1.5">
            {staff.map(member => {
              const checked  = staffIds.includes(member.id)
              const initials = getInitials(member.nom, member.prenom)
              return (
                <button
                  key={member.id}
                  onClick={() => toggleStaff(member.id)}
                  className={cn('flex items-center gap-3 px-3 py-2.5 rounded-[10px] border text-left transition-all',
                    checked ? 'border-border bg-surface2' : 'border-transparent bg-surface2/60 hover:bg-surface2'
                  )}
                >
                  <div className={inc.avatar} style={{ background: member.avatarColor }}>
                    {initials}
                  </div>
                  <span className={`flex-1 ${ty.bodyLg} font-medium`}>{getDisplayName(member.nom, member.prenom)}</span>
                  <div className={cn('w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-all',
                    checked ? 'bg-accent border-accent' : 'bg-surface border-border'
                  )}>
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {error && titre.trim() && (
        <p className="text-[12px] text-red bg-red/5 border border-red/20 rounded-[8px] px-3 py-2">{error}</p>
      )}

    </IncidentModalShell>
  )
}
