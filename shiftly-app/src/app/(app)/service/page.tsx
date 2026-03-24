'use client'

/**
 * Service du Jour
 * ─────────────────────────────────────────────────────────────
 * State :
 *  - completions  → Record<missionId, boolean> (optimistic toggle)
 *  - loadingMissions → Set<missionId> en attente d'API
 *  - modalOpen    → bottom sheet incident
 *
 * API calls (mock désactivé via DEV_MOCK=true) :
 *  - POST /api/completions  { poste, mission, user }
 *  - DELETE /api/completions/{id}
 *  - POST /api/incidents    { titre, severite, zone, centre, service }
 */

import { useState, useCallback, useMemo }  from 'react'
import type { Metadata }                    from 'next'
import Topbar           from '@/components/layout/Topbar'
import HeroServiceCard  from '@/components/service/HeroServiceCard'
import ProgressionGlobale from '@/components/service/ProgressionGlobale'
import ZoneCard         from '@/components/service/ZoneCard'
import ModalIncident    from '@/components/service/ModalIncident'
import { mockServiceData } from '@/lib/mock-data'
import api from '@/lib/api'

// ─── Toggle between mock and real API ────────────────────────────────────────
const USE_MOCK = true
// const USE_MOCK = process.env.NODE_ENV === 'development'

// ─── Current user (TODO: from auth context / JWT decode) ─────────────────────
const CURRENT_USER_ID = 1  // Kévin (MANAGER)

// ─── Build initial completions map from mock ──────────────────────────────────
function buildInitialCompletions(postes: typeof mockServiceData.postes) {
  const map: Record<number, boolean> = {}
  for (const poste of postes) {
    for (const mission of poste.missions) {
      map[mission.id] = mission.completionId !== null
    }
  }
  return map
}

// ─── Build initial completionId map (needed for DELETE) ──────────────────────
function buildCompletionIdMap(postes: typeof mockServiceData.postes) {
  const map: Record<number, number> = {}  // missionId → completionId
  for (const poste of postes) {
    for (const mission of poste.missions) {
      if (mission.completionId !== null) {
        map[mission.id] = mission.completionId
      }
    }
  }
  return map
}

export default function ServicePage() {
  const data = mockServiceData  // TODO: await fetchService(serviceId)

  const [completions,     setCompletions]    = useState<Record<number, boolean>>(
    () => buildInitialCompletions(data.postes)
  )
  const [completionIds,   setCompletionIds]  = useState<Record<number, number>>(
    () => buildCompletionIdMap(data.postes)
  )
  const [loadingMissions, setLoadingMissions] = useState<Set<number>>(new Set())
  const [modalOpen,       setModalOpen]       = useState(false)

  // ── Computed zone stats ───────────────────────────────────────────────────
  const zoneMap = useMemo(() => {
    const map: Record<number, {
      nom:     string
      couleur: string
      done:    number
      total:   number
    }> = {}

    for (const poste of data.postes) {
      const z = poste.zone
      if (!map[z.id]) map[z.id] = { nom: z.nom, couleur: z.couleur, done: 0, total: 0 }
      for (const m of poste.missions) {
        map[z.id].total++
        if (completions[m.id]) map[z.id].done++
      }
    }
    return map
  }, [data.postes, completions])

  const zoneStats  = useMemo(() => Object.values(zoneMap), [zoneMap])
  const totalDone  = useMemo(() => zoneStats.reduce((s, z) => s + z.done,  0), [zoneStats])
  const totalAll   = useMemo(() => zoneStats.reduce((s, z) => s + z.total, 0), [zoneStats])
  const globalPct  = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0

  const zonePcts = useMemo(
    () => zoneStats.map(z => ({
      nom:     z.nom,
      couleur: z.couleur,
      pct:     z.total > 0 ? Math.round((z.done / z.total) * 100) : 0,
    })),
    [zoneStats]
  )

  // ── Postes grouped by zone ────────────────────────────────────────────────
  const postesByZone = useMemo(() => {
    const map: Record<number, typeof data.postes> = {}
    for (const poste of data.postes) {
      if (!map[poste.zone.id]) map[poste.zone.id] = []
      map[poste.zone.id].push(poste)
    }
    // Sort zones by ordre
    return Object.values(map).sort((a, b) => a[0].zone.ordre - b[0].zone.ordre)
  }, [data.postes])

  // ── Toggle completion ─────────────────────────────────────────────────────
  const handleToggle = useCallback(async (
    missionId:         number,
    currentlyCompleted: boolean,
    posteId:           number
  ) => {
    // Optimistic update
    setCompletions(prev => ({ ...prev, [missionId]: !currentlyCompleted }))
    setLoadingMissions(prev => new Set(prev).add(missionId))

    try {
      if (!USE_MOCK) {
        if (currentlyCompleted) {
          // Uncheck → DELETE completion
          const cid = completionIds[missionId]
          if (cid) {
            await api.delete(`/completions/${cid}`)
            setCompletionIds(prev => { const n = { ...prev }; delete n[missionId]; return n })
          }
        } else {
          // Check → POST completion
          const res = await api.post('/completions', {
            poste:   `/api/postes/${posteId}`,
            mission: `/api/missions/${missionId}`,
            user:    `/api/users/${CURRENT_USER_ID}`,
          })
          setCompletionIds(prev => ({ ...prev, [missionId]: res.data.id }))
        }
      } else {
        // Mock: simulate network delay
        await new Promise(r => setTimeout(r, 200))
        if (!currentlyCompleted) {
          // Assign a fake completionId
          setCompletionIds(prev => ({ ...prev, [missionId]: Math.floor(Math.random() * 1000) + 100 }))
        } else {
          setCompletionIds(prev => { const n = { ...prev }; delete n[missionId]; return n })
        }
      }
    } catch (err) {
      // Rollback on error
      console.error('Toggle completion failed', err)
      setCompletions(prev => ({ ...prev, [missionId]: currentlyCompleted }))
    } finally {
      setLoadingMissions(prev => {
        const n = new Set(prev); n.delete(missionId); return n
      })
    }
  }, [completionIds])

  // ── Submit incident ───────────────────────────────────────────────────────
  const handleIncidentSubmit = useCallback(async (payload: {
    titre:    string
    severite: 'haute' | 'moyenne' | 'basse'
    zoneId:   number | null
    staffIds: number[]
  }) => {
    if (!USE_MOCK) {
      await api.post('/incidents', {
        titre:    payload.titre,
        severite: payload.severite.toUpperCase(),
        statut:   'OUVERT',
        service:  `/api/services/${data.service.id}`,
        centre:   `/api/centres/1`,  // TODO: from auth context
        ...(payload.zoneId ? { zone: `/api/zones/${payload.zoneId}` } : {}),
      })
    } else {
      // Mock: just simulate
      await new Promise(r => setTimeout(r, 400))
      console.log('[mock] Incident créé :', payload)
    }
  }, [data.service.id])

  // ── All unique zones (for modal) ─────────────────────────────────────────
  const allZones = useMemo(() => {
    const seen = new Set<number>()
    return data.postes.map(p => p.zone).filter(z => {
      if (seen.has(z.id)) return false
      seen.add(z.id); return true
    })
  }, [data.postes])

  return (
    <div className="min-h-full animate-fadeUp">
      {/* Topbar */}
      <Topbar />

      <div className="px-4 pb-28 lg:px-7 lg:pb-12 space-y-3 lg:mx-auto">

        {/* ── Hero card ── */}
        <HeroServiceCard
          service={data.service}
          globalPct={globalPct}
          zonePcts={zonePcts}
        />

        {/* ── Progression détaillée ── */}
        <ProgressionGlobale
          stats={zoneStats}
          totalDone={totalDone}
          totalAll={totalAll}
        />

        {/* ── Zone cards ── */}
        {postesByZone.map(postes => (
          <ZoneCard
            key={postes[0].zone.id}
            postes={postes}
            completions={completions}
            loadingMissions={loadingMissions}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* ── FAB — Signaler un incident ── */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-8 z-30">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-[14px] bg-red text-white
                     font-extrabold text-[13px] shadow-lg shadow-red/30
                     hover:opacity-90 active:scale-95 transition-all duration-150"
        >
          <span className="text-base">⚠️</span>
          Incident
        </button>
      </div>

      {/* ── Incident modal ── */}
      <ModalIncident
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleIncidentSubmit}
        zones={allZones}
        staff={data.staff}
      />
    </div>
  )
}
