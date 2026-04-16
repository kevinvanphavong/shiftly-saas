'use client'

import { useAuthStore } from '@/store/authStore'
import PlanningManagerView from '@/components/planning/PlanningManagerView'
import PlanningEmployeeView from '@/components/planning/PlanningEmployeeView'

/** Routeur principal du module Planning — Manager ou Employé */
export default function PlanningPage() {
  const role = useAuthStore(s => s.user?.role)

  if (role === 'MANAGER') {
    return <PlanningManagerView />
  }

  return <PlanningEmployeeView />
}
