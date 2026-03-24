import type { EditorZone, EditorMission, EditorCompetence } from '@/types/editeur'

export const mockZones: EditorZone[] = [
  { id: 1, nom: 'Accueil',  couleur: '#3b82f6', ordre: 1, missionCount: 8 },
  { id: 2, nom: 'Bar',      couleur: '#a855f7', ordre: 2, missionCount: 6 },
  { id: 3, nom: 'Salle',    couleur: '#22c55e', ordre: 3, missionCount: 9 },
  { id: 4, nom: 'Manager',  couleur: '#f97316', ordre: 4, missionCount: 5 },
]

export const mockMissions: EditorMission[] = [
  // Accueil — Ouverture
  { id: 1,  zoneId: 1, zoneName: 'Accueil', titre: 'Ouvrir les caisses',           type: 'FIXE',      priorite: 'haute',   categorie: 'Ouverture', ordre: 1 },
  { id: 2,  zoneId: 1, zoneName: 'Accueil', titre: 'Vérifier le stock de chaussures', type: 'FIXE',   priorite: 'normale', categorie: 'Ouverture', ordre: 2 },
  { id: 3,  zoneId: 1, zoneName: 'Accueil', titre: 'Calibrer les écrans d\'accueil', type: 'PONCTUELLE', priorite: 'basse', categorie: 'Ouverture', ordre: 3 },
  // Accueil — Service
  { id: 4,  zoneId: 1, zoneName: 'Accueil', titre: 'Accueillir les clients',         type: 'FIXE',    priorite: 'haute',   categorie: 'Service',    ordre: 4 },
  { id: 5,  zoneId: 1, zoneName: 'Accueil', titre: 'Gérer les files d\'attente',     type: 'FIXE',    priorite: 'haute',   categorie: 'Service',    ordre: 5 },
  // Accueil — Fermeture
  { id: 6,  zoneId: 1, zoneName: 'Accueil', titre: 'Clôturer les caisses',           type: 'FIXE',    priorite: 'haute',   categorie: 'Fermeture',  ordre: 6 },
  { id: 7,  zoneId: 1, zoneName: 'Accueil', titre: 'Rangement des chaussures',       type: 'FIXE',    priorite: 'normale', categorie: 'Fermeture',  ordre: 7 },
  { id: 8,  zoneId: 1, zoneName: 'Accueil', titre: 'Nettoyage comptoir',             type: 'PONCTUELLE', priorite: 'basse', categorie: 'Fermeture', ordre: 8 },
  // Bar — Ouverture
  { id: 9,  zoneId: 2, zoneName: 'Bar',     titre: 'Préparer les postes de bar',     type: 'FIXE',    priorite: 'haute',   categorie: 'Ouverture',  ordre: 1 },
  { id: 10, zoneId: 2, zoneName: 'Bar',     titre: 'Vérifier stock boissons',        type: 'FIXE',    priorite: 'normale', categorie: 'Ouverture',  ordre: 2 },
  // Bar — Service
  { id: 11, zoneId: 2, zoneName: 'Bar',     titre: 'Service cocktails & softs',      type: 'FIXE',    priorite: 'haute',   categorie: 'Service',    ordre: 3 },
  { id: 12, zoneId: 2, zoneName: 'Bar',     titre: 'Nettoyage verres',               type: 'FIXE',    priorite: 'normale', categorie: 'Service',    ordre: 4 },
  // Bar — Fermeture
  { id: 13, zoneId: 2, zoneName: 'Bar',     titre: 'Inventaire bar soir',            type: 'FIXE',    priorite: 'haute',   categorie: 'Fermeture',  ordre: 5 },
  { id: 14, zoneId: 2, zoneName: 'Bar',     titre: 'Nettoyage bar',                  type: 'FIXE',    priorite: 'normale', categorie: 'Fermeture',  ordre: 6 },
  // Salle — Ouverture
  { id: 15, zoneId: 3, zoneName: 'Salle',   titre: 'Vérifier les pistes',            type: 'FIXE',    priorite: 'haute',   categorie: 'Ouverture',  ordre: 1 },
  { id: 16, zoneId: 3, zoneName: 'Salle',   titre: 'Calibrer les quilles',           type: 'FIXE',    priorite: 'haute',   categorie: 'Ouverture',  ordre: 2 },
  { id: 17, zoneId: 3, zoneName: 'Salle',   titre: 'Allumer les systèmes de scores', type: 'FIXE',    priorite: 'normale', categorie: 'Ouverture',  ordre: 3 },
  // Salle — Service
  { id: 18, zoneId: 3, zoneName: 'Salle',   titre: 'Surveiller les pistes',          type: 'FIXE',    priorite: 'normale', categorie: 'Service',    ordre: 4 },
  { id: 19, zoneId: 3, zoneName: 'Salle',   titre: 'Maintenance pistes en cours',    type: 'PONCTUELLE', priorite: 'haute', categorie: 'Service',   ordre: 5 },
  { id: 20, zoneId: 3, zoneName: 'Salle',   titre: 'Gérer les scores',               type: 'FIXE',    priorite: 'normale', categorie: 'Service',    ordre: 6 },
  // Salle — Fermeture
  { id: 21, zoneId: 3, zoneName: 'Salle',   titre: 'Nettoyage pistes',               type: 'FIXE',    priorite: 'haute',   categorie: 'Fermeture',  ordre: 7 },
  { id: 22, zoneId: 3, zoneName: 'Salle',   titre: 'Rangement matériel',             type: 'FIXE',    priorite: 'normale', categorie: 'Fermeture',  ordre: 8 },
  { id: 23, zoneId: 3, zoneName: 'Salle',   titre: 'Éteindre les systèmes',          type: 'FIXE',    priorite: 'basse',   categorie: 'Fermeture',  ordre: 9 },
  // Manager
  { id: 24, zoneId: 4, zoneName: 'Manager', titre: 'Briefing équipe ouverture',      type: 'FIXE',    priorite: 'haute',   categorie: 'Ouverture',  ordre: 1 },
  { id: 25, zoneId: 4, zoneName: 'Manager', titre: 'Vérifier présences et plannings', type: 'FIXE',  priorite: 'haute',   categorie: 'Ouverture',  ordre: 2 },
  { id: 26, zoneId: 4, zoneName: 'Manager', titre: 'Suivi incidents',                 type: 'FIXE',  priorite: 'haute',   categorie: 'Service',    ordre: 3 },
  { id: 27, zoneId: 4, zoneName: 'Manager', titre: 'Rapport de clôture',              type: 'FIXE',  priorite: 'haute',   categorie: 'Fermeture',  ordre: 4 },
  { id: 28, zoneId: 4, zoneName: 'Manager', titre: 'Transmission équipe nuit',        type: 'PONCTUELLE', priorite: 'normale', categorie: 'Fermeture', ordre: 5 },
]

export const mockCompetences: EditorCompetence[] = [
  // Accueil
  { id: 1,  zoneId: 1, zoneName: 'Accueil', nom: 'Gestion caisse',          difficulte: 'simple',      points: 10, description: 'Savoir ouvrir, gérer et clôturer une caisse.' },
  { id: 2,  zoneId: 1, zoneName: 'Accueil', nom: 'Accueil client',          difficulte: 'simple',      points: 10, description: 'Accueillir chaleureusement et orienter les clients.' },
  { id: 3,  zoneId: 1, zoneName: 'Accueil', nom: 'Gestion chaussures',      difficulte: 'avancee',     points: 20, description: 'Maîtriser le stock et l\'attribution de chaussures.' },
  { id: 4,  zoneId: 1, zoneName: 'Accueil', nom: 'Réservations & files',    difficulte: 'avancee',     points: 20, description: 'Gérer les réservations et optimiser les files d\'attente.' },
  // Bar
  { id: 5,  zoneId: 2, zoneName: 'Bar',     nom: 'Préparation boissons',    difficulte: 'simple',      points: 10, description: 'Préparer softs, bières et boissons chaudes.' },
  { id: 6,  zoneId: 2, zoneName: 'Bar',     nom: 'Cocktails de base',       difficulte: 'avancee',     points: 20, description: 'Réaliser les cocktails signature du centre.' },
  { id: 7,  zoneId: 2, zoneName: 'Bar',     nom: 'Gestion stock bar',       difficulte: 'avancee',     points: 20, description: 'Inventaire, commandes et rotation des stocks.' },
  { id: 8,  zoneId: 2, zoneName: 'Bar',     nom: 'Mixologie avancée',       difficulte: 'experimente', points: 40, description: 'Créer et adapter des cocktails originaux.' },
  // Salle
  { id: 9,  zoneId: 3, zoneName: 'Salle',   nom: 'Maintenance pistes',      difficulte: 'simple',      points: 10, description: 'Entretien courant des pistes de bowling.' },
  { id: 10, zoneId: 3, zoneName: 'Salle',   nom: 'Calibration quilles',     difficulte: 'avancee',     points: 20, description: 'Calibrer le releveur de quilles et vérifier les alignements.' },
  { id: 11, zoneId: 3, zoneName: 'Salle',   nom: 'Système de scores',       difficulte: 'avancee',     points: 20, description: 'Maîtriser le logiciel d\'affichage des scores.' },
  { id: 12, zoneId: 3, zoneName: 'Salle',   nom: 'Réparation matériel',     difficulte: 'experimente', points: 40, description: 'Diagnostiquer et résoudre les pannes courantes.' },
  // Manager
  { id: 13, zoneId: 4, zoneName: 'Manager', nom: 'Gestion d\'équipe',       difficulte: 'avancee',     points: 20, description: 'Animer, briefer et coordonner les équipes.' },
  { id: 14, zoneId: 4, zoneName: 'Manager', nom: 'Gestion des incidents',   difficulte: 'avancee',     points: 20, description: 'Gérer les situations critiques avec sang-froid.' },
  { id: 15, zoneId: 4, zoneName: 'Manager', nom: 'Reporting & analytics',   difficulte: 'experimente', points: 40, description: 'Analyser les KPIs et produire des rapports de performance.' },
]

/** Catégories disponibles pour les missions */
export const CATEGORIES = ['Ouverture', 'Service', 'Fermeture', 'Entretien', 'Autre']
