'use client'

import { useState, useMemo }             from 'react'
import { motion }                        from 'framer-motion'
import Topbar                            from '@/components/layout/Topbar'
import StatsRow                          from '@/components/staff/StatsRow'
import SearchBar                         from '@/components/staff/SearchBar'
import FilterTabs                        from '@/components/staff/FilterTabs'
import MemberCard                        from '@/components/staff/MemberCard'
import { mockStaff }                     from '@/lib/mock/staff'
import { listVariants, listItemVariants, fadeUpVariants } from '@/lib/animations'
import type { RoleFilter, ZoneFilter }   from '@/types/staff'

export default function StaffPage() {
  const [search,      setSearch]      = useState('')
  const [roleFilter,  setRoleFilter]  = useState<RoleFilter>('all')
  const [zoneFilter,  setZoneFilter]  = useState<ZoneFilter>('all')
  const [expandedId,  setExpandedId]  = useState<number | null>(null)

  const handleToggle = (id: number) =>
    setExpandedId(prev => (prev === id ? null : id))

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return mockStaff.filter(m => {
      if (q && !m.nom.toLowerCase().includes(q) && !m.prenom.toLowerCase().includes(q)) return false
      if (roleFilter !== 'all' && m.role !== roleFilter) return false
      if (zoneFilter !== 'all' && !m.zones.includes(zoneFilter as never)) return false
      return true
    })
  }, [search, roleFilter, zoneFilter])

  // Manager is always first in the list
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => {
      if (a.role === 'MANAGER' && b.role !== 'MANAGER') return -1
      if (b.role === 'MANAGER' && a.role !== 'MANAGER') return 1
      return b.points - a.points
    }),
    [filtered]
  )

  return (
    <motion.div className="min-h-full" variants={fadeUpVariants} initial="hidden" animate="show">
      {/* Topbar */}
      <Topbar />

      <div className="px-4 pb-28 lg:px-7 lg:pb-10 space-y-4 lg:mx-auto">

        {/* ── KPIs ── */}
        <StatsRow members={mockStaff} />

        {/* ── Search ── */}
        <SearchBar value={search} onChange={setSearch} />

        {/* ── Filters ── */}
        <FilterTabs
          roleFilter={roleFilter}
          zoneFilter={zoneFilter}
          onRoleChange={setRoleFilter}
          onZoneChange={setZoneFilter}
        />

        {/* ── Results count ── */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted">
            {sorted.length} membre{sorted.length > 1 ? 's' : ''}
            {(search || roleFilter !== 'all' || zoneFilter !== 'all') && (
              <span className="ml-1 text-accent font-semibold">· filtré{sorted.length > 1 ? 's' : ''}</span>
            )}
          </p>
          {(search || roleFilter !== 'all' || zoneFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setRoleFilter('all'); setZoneFilter('all') }}
              className="text-[11px] text-muted hover:text-text transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* ── Member list ── */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-[14px] font-bold text-text mb-1">Aucun membre trouvé</p>
            <p className="text-[12px] text-muted">Modifie la recherche ou les filtres.</p>
          </div>
        ) : (
          <motion.div
            className="flex flex-col gap-2.5"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {sorted.map(member => (
              <motion.div key={member.id} variants={listItemVariants}>
                <MemberCard
                  member={member}
                  isExpanded={expandedId === member.id}
                  onToggle={handleToggle}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
