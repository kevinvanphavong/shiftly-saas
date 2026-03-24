import type { DashboardData } from '@/types/dashboard'

/**
 * Mock data alignée sur les fixtures Alice (Bowling Central).
 * Remplacer l'import par un appel API réel dans fetchDashboard().
 */
export const mockDashboard: DashboardData = {
  service: {
    today: {
      id: 1,
      date: '2026-03-19',
      heureDebut: '10:00',
      heureFin: '22:00',
      statut: 'EN_COURS',
      nbPostes: 6,
    },
    tauxOccupation: 62.5,
  },

  staff: [
    { id: 1, nom: 'Kévin V.',  role: 'MANAGER', avatarColor: '#f97316', points: 340 },
    { id: 2, nom: 'Patou M.',  role: 'EMPLOYE', avatarColor: '#3b82f6', points: 220 },
    { id: 3, nom: 'Aya K.',    role: 'EMPLOYE', avatarColor: '#a855f7', points: 180 },
    { id: 4, nom: 'Gabin R.',  role: 'EMPLOYE', avatarColor: '#22c55e', points: 150 },
    { id: 5, nom: 'Erwan L.',  role: 'EMPLOYE', avatarColor: '#14b8a6', points: 95  },
    { id: 6, nom: 'Hiba B.',   role: 'EMPLOYE', avatarColor: '#f472b6', points: 75  },
  ],

  incidents: {
    total:   3,
    haute:   1,
    moyenne: 1,
    basse:   1,
    alertes: [
      {
        id:        1,
        titre:     'Piste 7 — machine à boules bloquée',
        severite:  'haute',
        statut:    'OUVERT',
        service:   1,
        createdAt: '2026-03-19T08:30:00+00:00',
      },
    ],
  },

  topStaff: [
    { id: 1, nom: 'Kévin V.',  avatarColor: '#f97316', points: 340 },
    { id: 2, nom: 'Patou M.',  avatarColor: '#3b82f6', points: 220 },
    { id: 3, nom: 'Aya K.',    avatarColor: '#a855f7', points: 180 },
    { id: 4, nom: 'Gabin R.',  avatarColor: '#22c55e', points: 150 },
    { id: 5, nom: 'Erwan L.',  avatarColor: '#14b8a6', points: 95  },
  ],

  tutoriels: {
    total:       5,
    lectures:    18,
    tauxLecture: 60.0,
  },
}
