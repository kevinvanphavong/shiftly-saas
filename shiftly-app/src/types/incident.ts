// ─── Incident — types partagés ────────────────────────────────────────────────

export interface IncidentStaffMember {
  id:          number
  nom:         string
  prenom:      string | null
  avatarColor: string
}

export interface IncidentZone {
  id:      number
  nom:     string
  couleur: string
}

/** Incident complet renvoyé par GET /api/incidents/list (réglages manager) */
export interface IncidentFull {
  id:              number
  titre:           string
  severite:        'haute' | 'moyenne' | 'basse'
  statut:          'OUVERT' | 'EN_COURS' | 'RESOLU'
  createdAt:       string        // ISO 8601
  resolvedAt:      string | null // ISO 8601 ou null
  service:         number | null
  zone:            IncidentZone | null
  creePar:         IncidentStaffMember | null
  staffImpliques:  IncidentStaffMember[]
}
