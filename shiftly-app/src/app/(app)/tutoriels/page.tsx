'use client'

import { useState, useMemo, useCallback }                from 'react'
import { motion }                                        from 'framer-motion'
import { listVariants, listItemVariants, fadeUpVariants } from '@/lib/animations'
import Topbar                                            from '@/components/layout/Topbar'
import ProgressBanner from '@/components/tutoriels/ProgressBanner'
import FeaturedCard   from '@/components/tutoriels/FeaturedCard'
import TutoCard       from '@/components/tutoriels/TutoCard'
import TutoFilters    from '@/components/tutoriels/TutoFilters'
import SearchBar      from '@/components/staff/SearchBar'
import { mockTutoriels, INITIAL_READ_IDS } from '@/lib/mock/tutoriels'
import type { ZoneFilter, NiveauFilter } from '@/types/tutoriel'

export default function TutorielsPage() {
  // ── Read state (optimistic) ───────────────────────────────────────────────
  const [readIds, setReadIds] = useState<Set<number>>(() => new Set(INITIAL_READ_IDS))

  // ── Expand state ──────────────────────────────────────────────────────────
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // ── Filters ───────────────────────────────────────────────────────────────
  const [search,       setSearch]       = useState('')
  const [zoneFilter,   setZoneFilter]   = useState<ZoneFilter>('all')
  const [niveauFilter, setNiveauFilter] = useState<NiveauFilter>('all')

  const handleToggle = useCallback((id: number) =>
    setExpandedId(prev => (prev === id ? null : id)), [])

  const handleReadToggle = useCallback((id: number, isRead: boolean) => {
    setReadIds(prev => {
      const next = new Set(prev)
      isRead ? next.add(id) : next.delete(id)
      return next
    })
  }, [])

  // ── Featured tuto ─────────────────────────────────────────────────────────
  const featured = useMemo(
    () => mockTutoriels.find(t => t.misEnAvant) ?? null,
    []
  )

  // ── Filtered list (excluding featured) ───────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return mockTutoriels
      .filter(t => !t.misEnAvant)
      .filter(t => {
        if (q && !t.titre.toLowerCase().includes(q)) return false
        if (zoneFilter   !== 'all' && t.zone   !== zoneFilter)   return false
        if (niveauFilter !== 'all' && t.niveau !== niveauFilter)  return false
        return true
      })
  }, [search, zoneFilter, niveauFilter])

  const hasActiveFilter = search || zoneFilter !== 'all' || niveauFilter !== 'all'
  const readCount = readIds.size

  return (
    <motion.div className="min-h-full" variants={fadeUpVariants} initial="hidden" animate="show">
      <Topbar />

      <div className="px-4 pb-28 lg:px-7 lg:pb-10 space-y-4 lg:mx-auto">

        {/* ── Progress banner ── */}
        <ProgressBanner readCount={readCount} total={mockTutoriels.length} />

        {/* ── Featured card ── */}
        {featured && (
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 px-1">
              À la une
            </p>
            <FeaturedCard
              tuto={{ ...featured, readId: readIds.has(featured.id) ? 1 : null }}
              isExpanded={expandedId === featured.id}
              onToggle={handleToggle}
              onReadToggle={handleReadToggle}
            />
          </div>
        )}

        {/* ── Search ── */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un tutoriel…"
        />

        {/* ── Filters ── */}
        <TutoFilters
          zoneFilter={zoneFilter}
          niveauFilter={niveauFilter}
          onZoneChange={setZoneFilter}
          onNiveauChange={setNiveauFilter}
        />

        {/* ── Results header ── */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted">
            {filtered.length} tutoriel{filtered.length > 1 ? 's' : ''}
            {hasActiveFilter && (
              <span className="ml-1 text-accent font-semibold">· filtré{filtered.length > 1 ? 's' : ''}</span>
            )}
          </p>
          {hasActiveFilter && (
            <button
              onClick={() => { setSearch(''); setZoneFilter('all'); setNiveauFilter('all') }}
              className="text-[11px] text-muted hover:text-text transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* ── Tuto list ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <span className="text-4xl mb-3">📚</span>
            <p className="text-[14px] font-bold text-text mb-1">Aucun tutoriel trouvé</p>
            <p className="text-[12px] text-muted">Modifie la recherche ou les filtres.</p>
          </div>
        ) : (
          <motion.div
            className="flex flex-col gap-2.5"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {filtered.map(tuto => (
              <motion.div key={tuto.id} variants={listItemVariants}>
                <TutoCard
                  tuto={{ ...tuto, readId: readIds.has(tuto.id) ? 1 : null }}
                  isExpanded={expandedId === tuto.id}
                  onToggle={handleToggle}
                  onReadToggle={handleReadToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
