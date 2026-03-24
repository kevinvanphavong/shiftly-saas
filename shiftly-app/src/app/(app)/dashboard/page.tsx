import type { Metadata } from 'next'
import Topbar        from '@/components/layout/Topbar'
import HeroService   from '@/components/dashboard/HeroService'
import KPIGrid       from '@/components/dashboard/KPIGrid'
import IncidentsList from '@/components/dashboard/IncidentsList'
import StaffRanking  from '@/components/dashboard/StaffRanking'
import AlertsFeed    from '@/components/dashboard/AlertsFeed'
import { mockDashboard } from '@/lib/mock/dashboard'
// ↑ TODO: remplacer par fetchDashboard(centreId) quand l'API est dispo
// import api from '@/lib/api'
// async function fetchDashboard(centreId: number) {
//   const { data } = await api.get(`/dashboard/${centreId}`)
//   return data
// }

export const metadata: Metadata = { title: 'Dashboard — Shiftly' }

export default async function DashboardPage() {
  // const dashboard = await fetchDashboard(1) // TODO: lire centreId depuis la session
  const dashboard = mockDashboard

  return (
    <div className="min-h-full animate-fadeUp">
      {/* ── Topbar ── */}
      <Topbar />

      <div className="px-5 pb-8 lg:px-7 space-y-4">
        {/* ── Hero — service du jour ── */}
        <HeroService data={dashboard.service} />

        {/* ── KPI cards 2×2 / 4 colonnes ── */}
        <KPIGrid
          data={{
            service:   dashboard.service,
            staff:     dashboard.staff,
            incidents: dashboard.incidents,
            tutoriels: dashboard.tutoriels,
          }}
        />

        {/* ── Bottom grid — 1 col mobile / 3 cols desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <IncidentsList data={dashboard.incidents} />
          <StaffRanking topStaff={dashboard.topStaff} />
          <AlertsFeed alertes={dashboard.incidents.alertes} />
        </div>
      </div>
    </div>
  )
}
