export type EditorTab = 'zones' | 'missions' | 'competences'

export type MissionType     = 'FIXE' | 'PONCTUELLE'
export type MissionPriorite = 'haute' | 'normale' | 'basse'
export type DifficulteComp  = 'simple' | 'avancee' | 'experimente'

export interface EditorZone {
  id:      number
  nom:     string
  couleur: string
  ordre:   number
  /** nb de missions dans cette zone */
  missionCount?: number
}

export interface EditorMission {
  id:        number
  zoneId:    number
  zoneName?: string
  titre:     string
  type:      MissionType
  priorite:  MissionPriorite
  ordre:     number
  categorie: string   // e.g. "Ouverture", "Service", "Fermeture"
}

export interface EditorCompetence {
  id:          number
  zoneId:      number
  zoneName?:   string
  nom:         string
  difficulte:  DifficulteComp
  points:      number
  description: string
}

// ── Modal payloads ────────────────────────────────────────────────────────────

export interface ZoneFormData {
  nom:     string
  couleur: string
}

export interface MissionFormData {
  titre:     string
  type:      MissionType
  priorite:  MissionPriorite
  categorie: string
  zoneId:    number
}

export interface CompetenceFormData {
  nom:         string
  difficulte:  DifficulteComp
  points:      number
  description: string
  zoneId:      number
}
