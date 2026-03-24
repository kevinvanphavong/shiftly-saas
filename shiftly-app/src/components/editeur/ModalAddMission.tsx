'use client'

import { useState, useEffect } from 'react'
import type { EditorMission, EditorZone, MissionFormData, MissionPriorite, MissionType } from '@/types/editeur'
import { CATEGORIES } from '@/lib/mock/editeur'

const USE_MOCK = true

const PRIORITES: { id: MissionPriorite; label: string; cls: string }[] = [
  { id: 'haute',   label: 'Haute',   cls: 'border-red text-red bg-red/8' },
  { id: 'normale', label: 'Normale', cls: 'border-accent text-accent bg-accent/10' },
  { id: 'basse',   label: 'Faible',  cls: 'border-border text-muted' },
]

interface Props {
  open:        boolean
  editMission?: EditorMission | null
  zone:         EditorZone
  onClose:     () => void
  onSave:      (data: MissionFormData) => void
}

export default function ModalAddMission({ open, editMission, zone, onClose, onSave }: Props) {
  const [titre,     setTitre]     = useState('')
  const [categorie, setCategorie] = useState(CATEGORIES[0])
  const [priorite,  setPriorite]  = useState<MissionPriorite>('normale')
  const [type,      setType]      = useState<MissionType>('FIXE')

  useEffect(() => {
    if (open) {
      setTitre(editMission?.titre     ?? '')
      setCategorie(editMission?.categorie ?? CATEGORIES[0])
      setPriorite(editMission?.priorite  ?? 'normale')
      setType(editMission?.type      ?? 'FIXE')
    }
  }, [open, editMission])

  function handleSave() {
    if (!titre.trim()) return
    if (!USE_MOCK) {
      const method = editMission ? 'PUT' : 'POST'
      const url    = editMission
        ? `${process.env.NEXT_PUBLIC_API_URL}/missions/${editMission.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/missions`
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre: titre.trim(), categorie, priorite, type, zoneId: zone.id }),
      }).catch(console.error)
    }
    onSave({ titre: titre.trim(), categorie, priorite, type, zoneId: zone.id })
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border border-border rounded-t-[24px] px-4 pt-5 pb-8 animate-fadeUp max-w-[390px] mx-auto">
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-[18px]" />
        <h2 className="font-syne font-extrabold text-[18px] mb-1">
          {editMission ? 'Modifier la mission' : 'Nouvelle mission'}
        </h2>
        <div className="flex items-center gap-1.5 text-[12px] text-muted mb-4">
          <span className="w-[10px] h-[10px] rounded-[3px]" style={{ background: zone.couleur }} />
          Zone {zone.nom}
        </div>

        {/* Titre */}
        <div className="mb-3">
          <label className="block text-[10px] font-bold uppercase tracking-[0.8px] text-muted mb-[5px]">
            Description de la mission
          </label>
          <input
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex : Vérifier les toilettes..."
            className="w-full bg-surface2 border border-border rounded-[10px] px-3 py-[10px] text-[13px] text-text placeholder:text-muted focus:border-accent outline-none transition-colors"
          />
        </div>

        {/* Catégorie */}
        <div className="mb-3">
          <label className="block text-[10px] font-bold uppercase tracking-[0.8px] text-muted mb-[5px]">Catégorie</label>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategorie(c)}
                className={`px-3 py-1.5 rounded-[8px] border text-[12px] font-semibold transition-all ${
                  categorie === c ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Priorité */}
        <div className="mb-3">
          <label className="block text-[10px] font-bold uppercase tracking-[0.8px] text-muted mb-[5px]">Priorité</label>
          <div className="flex gap-1.5">
            {PRIORITES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriorite(p.id)}
                className={`flex-1 px-3 py-1.5 rounded-[8px] border text-[12px] font-semibold transition-all ${
                  priorite === p.id ? p.cls : 'border-border text-muted'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="mb-3">
          <label className="block text-[10px] font-bold uppercase tracking-[0.8px] text-muted mb-[5px]">Type</label>
          <div className="flex gap-1.5">
            {(['FIXE', 'PONCTUELLE'] as MissionType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 px-3 py-1.5 rounded-[8px] border text-[12px] font-semibold transition-all ${
                  type === t ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted'
                }`}
              >
                {t === 'FIXE' ? 'Fixe' : 'Ponctuelle'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-[14px]">
          <button onClick={onClose} className="flex-1 py-3 rounded-[12px] border border-border bg-transparent text-muted text-[13px] font-semibold">
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!titre.trim()}
            className="flex-[2] py-3 rounded-[12px] bg-accent border-none text-white font-syne font-extrabold text-[13px] disabled:opacity-40"
          >
            {editMission ? 'Enregistrer' : 'Ajouter'}
          </button>
        </div>
      </div>
    </>
  )
}
