// ─── Dashboard API response types ────────────────────────────────────────────
// Matches GET /api/dashboard/{centreId} from DashboardController

export interface DashboardServiceToday {
  id: number
  date: string        // 'YYYY-MM-DD'
  heureDebut: string  // 'HH:mm'
  heureFin: string    // 'HH:mm'
  statut: 'PLANIFIE' | 'EN_COURS' | 'TERMINE'
  nbPostes: number
}

export interface DashboardService {
  today: DashboardServiceToday | null
  tauxOccupation: number  // 0–100
}

export interface DashboardStaffMember {
  id: number
  nom: string
  role: 'MANAGER' | 'EMPLOYE'
  avatarColor: string | null
  points: number
}

export interface DashboardAlerte {
  id: number
  titre: string
  severite: 'haute' | 'moyenne' | 'basse'
  statut: string
  service: number | null
  createdAt: string  // ISO 8601
}

export interface DashboardIncidents {
  total: number
  haute: number
  moyenne: number
  basse: number
  alertes: DashboardAlerte[]
}

export interface DashboardTopStaff {
  id: number
  nom: string
  avatarColor: string | null
  points: number
}

export interface DashboardTutoriels {
  total: number
  lectures: number
  tauxLecture: number  // 0–100
}

export interface DashboardData {
  service:   DashboardService
  staff:     DashboardStaffMember[]
  incidents: DashboardIncidents
  topStaff:  DashboardTopStaff[]
  tutoriels: DashboardTutoriels
}
