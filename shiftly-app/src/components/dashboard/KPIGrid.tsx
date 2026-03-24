import StatCard from '@/components/ui/StatCard'
import type { DashboardData } from '@/types/dashboard'

interface KPIGridProps {
  data: Pick<DashboardData, 'service' | 'staff' | 'incidents' | 'tutoriels'>
}

/**
 * Grille des 4 KPI principaux :
 *  • Taux d'avancement  • Staff présent  • Incidents ouverts  • Taux lecture tutos
 */
export default function KPIGrid({ data }: KPIGridProps) {
  const { service, staff, incidents, tutoriels } = data

  const staffActif   = staff.length
  const taux         = service.tauxOccupation
  const nbIncidents  = incidents.total
  const tauxLecture  = tutoriels.tauxLecture

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        icon="📋"
        value={`${taux.toFixed(0)}%`}
        label="Avancement missions"
        trend={{ value: '+8%', up: true }}
      />
      <StatCard
        icon="👥"
        value={staffActif}
        label="Employés actifs"
      />
      <StatCard
        icon="⚠️"
        value={nbIncidents}
        label="Incidents ouverts"
        trend={
          incidents.haute > 0
            ? { value: `${incidents.haute} haute`, up: false }
            : undefined
        }
      />
      <StatCard
        icon="📖"
        value={`${tauxLecture.toFixed(0)}%`}
        label="Taux lecture tutos"
        trend={{ value: '+5%', up: true }}
      />
    </div>
  )
}
