// ─── Staff screen — types ─────────────────────────────────────────────────────

export type StatusPresence = 'present' | 'pause' | 'absent'
export type DifficulteComp = 'simple' | 'avancee' | 'experimente'
export type ZoneNom        = 'Accueil' | 'Bar' | 'Salle' | 'Manager'
export type StaffRole      = 'MANAGER' | 'EMPLOYE'

export interface StaffCompetence {
  id:         number
  nom:        string
  zone:       ZoneNom
  points:     number
  difficulte: DifficulteComp
}

export interface StaffMember {
  id:              number
  nom:             string           // "Kévin V."
  prenom:          string           // "Kévin"
  role:            StaffRole
  status:          StatusPresence
  points:          number
  niveau:          number           // 1–5
  zones:           ZoneNom[]
  tailleHaut:      string           // XS | S | M | L | XL
  tailleBas:       string           // '36' → '48'
  pointure:        string
  competences:     StaffCompetence[]
  tutorielsLus:    number
  tutorielsTotal:  number
}

// ─── Filter state ─────────────────────────────────────────────────────────────

export type RoleFilter = 'all' | StaffRole
export type ZoneFilter = ZoneNom | 'all'
