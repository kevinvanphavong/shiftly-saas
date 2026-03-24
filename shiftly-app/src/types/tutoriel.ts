// ─── Tutoriels screen — types ─────────────────────────────────────────────────

export type TutoZone   = 'Accueil' | 'Bar' | 'Salle' | 'Manager'
export type TutoNiveau = 'debutant' | 'intermediaire' | 'avance'

export type TutoBlock =
  | { type: 'intro'; text: string }
  | { type: 'step';  number: number; title: string; text: string }
  | { type: 'tip';   text: string }

export interface Tutoriel {
  id:           number
  titre:        string
  zone:         TutoZone
  niveau:       TutoNiveau
  dureMin:      number          // minutes
  misEnAvant:   boolean
  /** completionId si déjà lu, null sinon */
  readId:       number | null
  contenu:      TutoBlock[]
}

// ─── Filter state ─────────────────────────────────────────────────────────────
export type ZoneFilter   = TutoZone | 'all'
export type NiveauFilter = TutoNiveau | 'all'
