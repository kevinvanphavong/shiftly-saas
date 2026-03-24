export interface Centre {
  id: number
  nom: string
  adresse?: string
  typeActivite?: string
  horaireOuverture?: string
  horaireFermeture?: string
}

export interface User {
  id: number
  centre: Centre
  nom: string
  prenom?: string
  email: string
  role: 'MANAGER' | 'EMPLOYE'
  actif: boolean
  pointsTotal: number
  niveau: number
  tailleHaut?: string
  tailleBas?: string
  pointure?: string
}

export interface Zone {
  id: number
  nom: string
  couleur?: string
  ordre: number
  archivee: boolean
}

export interface Mission {
  id: number
  zone: Zone
  titre: string
  categorie: 'OUVERTURE' | 'PENDANT' | 'MENAGE' | 'FERMETURE'
  priorite: 'vitale' | 'important' | 'ne_pas_oublier'
  type: 'FIXE' | 'PONCTUELLE'
  description?: string
  ordre: number
}

export interface Competence {
  id: number
  zone: Zone
  titre: string
  description?: string
  difficulte: 'simple' | 'avancee' | 'experimente'
  priorite: string
  points: number
}

export interface Service {
  id: number
  date: string
  statut: 'PLANIFIE' | 'EN_COURS' | 'TERMINE'
  tauxCompletion: number
  manager?: User
  assignations?: Assignation[]
}

export interface Assignation {
  id: number
  user: User
  zone: Zone
}

export interface Incident {
  id: number
  description: string
  severite: 'haute' | 'moyenne' | 'basse'
  statut: 'OUVERT' | 'EN_COURS' | 'RESOLU'
  zone?: Zone
  creePar?: User
  createdAt: string
}

export interface Tutoriel {
  id: number
  zone?: Zone
  titre: string
  contenu: TutorielBlock[]
  niveau: 'debutant' | 'intermediaire' | 'avance'
  dureeMins?: number
  misEnAvant: boolean
  publie: boolean
}

export type TutorielBlock =
  | { type: 'intro'; text: string }
  | { type: 'step'; number: number; title: string; text: string }
  | { type: 'tip'; text: string }
