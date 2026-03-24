// ─── Service du Jour — types ──────────────────────────────────────────────────

export type MissionType     = 'FIXE' | 'PONCTUELLE'
export type MissionPriorite = 'vitale' | 'important' | 'ne_pas_oublier'
export type ServiceStatut   = 'PLANIFIE' | 'EN_COURS' | 'TERMINE'
export type IncidentSeverite = 'haute' | 'moyenne' | 'basse'

export interface ServiceZone {
  id:      number
  nom:     string
  couleur: string   // hex
  ordre:   number
}

export interface ServiceMission {
  id:        number
  texte:     string
  type:      MissionType
  priorite:  MissionPriorite
  ordre:     number
  /** completionId si déjà cochée, null sinon */
  completionId: number | null
}

export interface ServiceStaffMember {
  id:          number
  nom:         string
  role:        'MANAGER' | 'EMPLOYE'
  avatarColor: string
}

export interface ServicePoste {
  id:       number
  zone:     ServiceZone
  user:     ServiceStaffMember | null
  missions: ServiceMission[]
}

export interface ServicePageData {
  service: {
    id:          number
    date:        string     // 'YYYY-MM-DD'
    heureDebut:  string     // 'HH:mm'
    heureFin:    string     // 'HH:mm'
    statut:      ServiceStatut
    centreName:  string
  }
  postes: ServicePoste[]
  staff:  ServiceStaffMember[]
}

// ─── Incident form payload ────────────────────────────────────────────────────

export interface IncidentPayload {
  titre:      string
  severite:   IncidentSeverite
  zoneId:     number | null
  staffIds:   number[]
  serviceId:  number
}
