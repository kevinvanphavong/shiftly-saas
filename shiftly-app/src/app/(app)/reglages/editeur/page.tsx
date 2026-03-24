'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type {
  EditorTab,
  EditorZone,
  EditorMission,
  EditorCompetence,
  ZoneFormData,
  MissionFormData,
  CompetenceFormData,
} from '@/types/editeur'
import { mockZones, mockMissions, mockCompetences } from '@/lib/mock/editeur'

import EditorTabs        from '@/components/editeur/EditorTabs'
import ZoneList          from '@/components/editeur/ZoneList'
import MissionList       from '@/components/editeur/MissionList'
import CompetenceList    from '@/components/editeur/CompetenceList'
import ModalAddZone      from '@/components/editeur/ModalAddZone'
import ModalAddMission   from '@/components/editeur/ModalAddMission'
import ModalAddCompetence from '@/components/editeur/ModalAddCompetence'
import ModalConfirmDelete from '@/components/editeur/ModalConfirmDelete'
import ModalMoveZone     from '@/components/editeur/ModalMoveZone'

let nextId = 100

export default function EditeurPage() {
  const router = useRouter()

  // ── Data state ──────────────────────────────────────────────────────────────
  const [zones,       setZones]       = useState<EditorZone[]>(mockZones)
  const [missions,    setMissions]    = useState<EditorMission[]>(mockMissions)
  const [competences, setCompetences] = useState<EditorCompetence[]>(mockCompetences)

  // ── Navigation state ────────────────────────────────────────────────────────
  const [activeTab,      setActiveTab]      = useState<EditorTab>('zones')
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null)

  // ── Modal state ──────────────────────────────────────────────────────────────
  const [showAddZone,      setShowAddZone]      = useState(false)
  const [editZone,         setEditZone]         = useState<EditorZone | null>(null)

  const [showAddMission,   setShowAddMission]   = useState(false)
  const [editMission,      setEditMission]      = useState<EditorMission | null>(null)

  const [showAddComp,      setShowAddComp]      = useState(false)
  const [editComp,         setEditComp]         = useState<EditorCompetence | null>(null)

  const [confirmDelete,    setConfirmDelete]    = useState<{
    type: 'zone' | 'mission' | 'competence'
    item: EditorZone | EditorMission | EditorCompetence
  } | null>(null)

  const [moveMission,      setMoveMission]      = useState<EditorMission | null>(null)

  // ── Derived ──────────────────────────────────────────────────────────────────
  const selectedZone = useMemo(
    () => zones.find((z) => z.id === selectedZoneId) ?? null,
    [zones, selectedZoneId]
  )

  const zoneMissions = useMemo(
    () => selectedZoneId ? missions.filter((m) => m.zoneId === selectedZoneId) : missions,
    [missions, selectedZoneId]
  )

  // ── Tab change ───────────────────────────────────────────────────────────────
  function handleTabChange(tab: EditorTab) {
    setActiveTab(tab)
    // When switching to missions/competences tab from zones list, keep selectedZoneId if set
  }

  // ── Zone select → switch to missions ────────────────────────────────────────
  function handleZoneSelect(id: number) {
    setSelectedZoneId(id)
    setActiveTab('missions')
  }

  // ── Zone CRUD ────────────────────────────────────────────────────────────────
  function handleSaveZone(data: ZoneFormData) {
    if (editZone) {
      setZones((prev) =>
        prev.map((z) => z.id === editZone.id ? { ...z, ...data } : z)
      )
    } else {
      const newZone: EditorZone = {
        id: nextId++,
        nom: data.nom,
        couleur: data.couleur,
        ordre: zones.length + 1,
        missionCount: 0,
      }
      setZones((prev) => [...prev, newZone])
    }
    setShowAddZone(false)
    setEditZone(null)
  }

  // ── Mission CRUD ─────────────────────────────────────────────────────────────
  function handleSaveMission(data: MissionFormData) {
    if (editMission) {
      setMissions((prev) =>
        prev.map((m) => m.id === editMission.id ? { ...m, ...data } : m)
      )
    } else {
      const zone = zones.find((z) => z.id === data.zoneId)
      const newM: EditorMission = {
        id: nextId++,
        zoneId: data.zoneId,
        zoneName: zone?.nom,
        titre: data.titre,
        type: data.type,
        priorite: data.priorite,
        categorie: data.categorie,
        ordre: missions.filter((m) => m.zoneId === data.zoneId).length + 1,
      }
      setMissions((prev) => [...prev, newM])
    }
    setShowAddMission(false)
    setEditMission(null)
  }

  function handleMoveMission(targetZoneId: number) {
    if (!moveMission) return
    const zone = zones.find((z) => z.id === targetZoneId)
    setMissions((prev) =>
      prev.map((m) =>
        m.id === moveMission.id
          ? { ...m, zoneId: targetZoneId, zoneName: zone?.nom }
          : m
      )
    )
    setMoveMission(null)
  }

  // ── Competence CRUD ──────────────────────────────────────────────────────────
  function handleSaveCompetence(data: CompetenceFormData) {
    if (editComp) {
      setCompetences((prev) =>
        prev.map((c) => c.id === editComp.id ? { ...c, ...data } : c)
      )
    } else {
      const zone = zones.find((z) => z.id === data.zoneId)
      const newC: EditorCompetence = {
        id: nextId++,
        zoneId: data.zoneId,
        zoneName: zone?.nom,
        nom: data.nom,
        difficulte: data.difficulte,
        points: data.points,
        description: data.description,
      }
      setCompetences((prev) => [...prev, newC])
    }
    setShowAddComp(false)
    setEditComp(null)
  }

  // ── Delete/Archive ───────────────────────────────────────────────────────────
  function handleConfirmDelete() {
    if (!confirmDelete) return
    const { type, item } = confirmDelete
    if (type === 'zone') {
      setZones((prev) => prev.filter((z) => z.id !== item.id))
      if (selectedZoneId === item.id) setSelectedZoneId(null)
    } else if (type === 'mission') {
      setMissions((prev) => prev.filter((m) => m.id !== item.id))
    } else {
      setCompetences((prev) => prev.filter((c) => c.id !== item.id))
    }
    setConfirmDelete(null)
  }

  // ── Render helpers ────────────────────────────────────────────────────────────
  const confirmItem = confirmDelete?.item as (EditorZone & EditorMission & EditorCompetence) | undefined

  return (
    <div className="max-w-[390px] mx-auto px-4 pb-24 lg:max-w-2xl">
      {/* Header */}
      <div className="py-4 flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-accent text-[13px] font-semibold"
        >
          ← Réglages
        </button>
        <button
          onClick={() => {
            if (activeTab === 'zones')       { setEditZone(null);  setShowAddZone(true)    }
            if (activeTab === 'missions')    { setEditMission(null); setShowAddMission(true) }
            if (activeTab === 'competences') { setEditComp(null);   setShowAddComp(true)    }
          }}
          className="w-7 h-7 rounded-[8px] border border-border bg-transparent flex items-center justify-center text-[13px] text-muted hover:border-accent hover:text-accent transition-all"
        >
          ＋
        </button>
      </div>

      <h1 className="font-syne font-extrabold text-[20px] text-text mb-0.5">Éditeur de contenu</h1>
      <p className="text-[12px] text-muted mb-4">Gérez vos zones, missions et compétences</p>

      {/* ── Zones tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'zones' && (
        <>
          <EditorTabs active="zones" onChange={handleTabChange} />
          <ZoneList
            zones={zones}
            missions={missions}
            competences={competences}
            selectedId={selectedZoneId}
            onSelect={handleZoneSelect}
            onEdit={(z) => { setEditZone(z); setShowAddZone(true) }}
            onDelete={(z) => setConfirmDelete({ type: 'zone', item: z })}
            onReorder={setZones}
            onAdd={() => { setEditZone(null); setShowAddZone(true) }}
          />
        </>
      )}

      {/* ── Missions tab ──────────────────────────────────────────────────── */}
      {activeTab === 'missions' && selectedZone && (
        <MissionList
          missions={zoneMissions}
          zoneName={selectedZone.nom}
          zoneColor={selectedZone.couleur}
          onEdit={(m) => { setEditMission(m); setShowAddMission(true) }}
          onMove={(m) => setMoveMission(m)}
          onReorder={(reordered) =>
            setMissions((prev) => {
              const others = prev.filter((m) => m.zoneId !== selectedZoneId)
              return [...others, ...reordered]
            })
          }
          onAdd={() => { setEditMission(null); setShowAddMission(true) }}
          onBack={() => { setActiveTab('zones'); setSelectedZoneId(null) }}
        />
      )}

      {activeTab === 'missions' && !selectedZone && (
        <>
          <EditorTabs active="missions" onChange={handleTabChange} />
          <div className="text-center py-12 text-muted">
            <div className="text-[36px] mb-3">📋</div>
            <div className="font-syne font-extrabold text-[15px] text-text mb-1">Sélectionnez une zone</div>
            <div className="text-[12px]">Allez dans l'onglet Zones pour choisir une zone</div>
            <button
              onClick={() => setActiveTab('zones')}
              className="mt-4 px-4 py-2 rounded-[10px] bg-accent/10 border border-accent/20 text-accent text-[12px] font-semibold"
            >
              Voir les zones →
            </button>
          </div>
        </>
      )}

      {/* ── Compétences tab ───────────────────────────────────────────────── */}
      {activeTab === 'competences' && (
        <CompetenceList
          competences={competences}
          zones={zones}
          activeZoneId={selectedZoneId}
          onTabChange={handleTabChange}
          onEdit={(c) => { setEditComp(c); setShowAddComp(true) }}
          onDelete={(c) => setConfirmDelete({ type: 'competence', item: c })}
          onAdd={() => { setEditComp(null); setShowAddComp(true) }}
        />
      )}

      {/* ── Modals ──────────────────────────────────────────────────────────── */}
      <ModalAddZone
        open={showAddZone}
        editZone={editZone}
        zones={zones}
        onClose={() => { setShowAddZone(false); setEditZone(null) }}
        onSave={handleSaveZone}
      />

      <ModalAddMission
        open={showAddMission}
        editMission={editMission}
        zone={selectedZone ?? zones[0]}
        onClose={() => { setShowAddMission(false); setEditMission(null) }}
        onSave={handleSaveMission}
      />

      <ModalAddCompetence
        open={showAddComp}
        editCompetence={editComp}
        zone={selectedZone ?? zones[0]}
        onClose={() => { setShowAddComp(false); setEditComp(null) }}
        onSave={handleSaveCompetence}
      />

      <ModalConfirmDelete
        open={confirmDelete !== null}
        type={confirmDelete?.type ?? 'zone'}
        nom={confirmItem?.nom ?? ''}
        missionCount={
          confirmDelete?.type === 'zone'
            ? missions.filter((m) => m.zoneId === confirmItem?.id).length
            : undefined
        }
        competenceCount={
          confirmDelete?.type === 'zone'
            ? competences.filter((c) => c.zoneId === confirmItem?.id).length
            : undefined
        }
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <ModalMoveZone
        open={moveMission !== null}
        mission={moveMission}
        zones={zones}
        onClose={() => setMoveMission(null)}
        onMove={handleMoveMission}
      />
    </div>
  )
}
