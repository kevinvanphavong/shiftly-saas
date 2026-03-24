/**
 * Mock data — Service du Jour (Bowling Central, 19 mars 2026)
 * Aligné sur les fixtures Alice Symfony.
 * Swap par appel API réel dans service/page.tsx quand l'API est disponible.
 */
import type { ServicePageData } from '@/types/service'

// ─── Zones ────────────────────────────────────────────────────────────────────
const ZONE_ACCUEIL = { id: 1, nom: 'Accueil', couleur: '#3b82f6', ordre: 1 }
const ZONE_BAR     = { id: 2, nom: 'Bar',     couleur: '#a855f7', ordre: 2 }
const ZONE_SALLE   = { id: 3, nom: 'Salle',   couleur: '#22c55e', ordre: 3 }

// ─── Staff ────────────────────────────────────────────────────────────────────
const KEVIN  = { id: 1, nom: 'Kévin V.',  role: 'MANAGER' as const, avatarColor: '#f97316' }
const PATOU  = { id: 2, nom: 'Patou M.',  role: 'EMPLOYE' as const, avatarColor: '#3b82f6' }
const AYA    = { id: 3, nom: 'Aya K.',    role: 'EMPLOYE' as const, avatarColor: '#a855f7' }
const GABIN  = { id: 4, nom: 'Gabin R.',  role: 'EMPLOYE' as const, avatarColor: '#22c55e' }
const ERWAN  = { id: 5, nom: 'Erwan L.',  role: 'EMPLOYE' as const, avatarColor: '#14b8a6' }
const HIBA   = { id: 6, nom: 'Hiba B.',   role: 'EMPLOYE' as const, avatarColor: '#f472b6' }

export const mockServiceData: ServicePageData = {
  service: {
    id:         1,
    date:       '2026-03-19',
    heureDebut: '10:00',
    heureFin:   '22:00',
    statut:     'EN_COURS',
    centreName: 'Bowling Central',
  },

  staff: [KEVIN, PATOU, AYA, GABIN, ERWAN, HIBA],

  postes: [
    // ── Accueil (Patou) ───────────────────────────────────────────────────────
    {
      id: 1, zone: ZONE_ACCUEIL, user: PATOU,
      missions: [
        { id: 1,  texte: 'Allumer les écrans d\'accueil',           type: "FIXE",       priorite: "vitale",           ordre: 1, completionId: 10 },
        { id: 2,  texte: 'Vérifier les casiers de chaussures',      type: 'FIXE',       priorite: 'vitale',           ordre: 2, completionId: 11 },
        { id: 3,  texte: 'Préparer le comptoir d\'accueil',          type: 'FIXE',       priorite: 'important',        ordre: 3, completionId: null },
        { id: 4,  texte: 'Ouvrir la caisse et faire le fond',       type: 'FIXE',       priorite: 'vitale',           ordre: 4, completionId: null },
        { id: 5,  texte: 'Réapprovisionner les lacets de secours',  type: 'PONCTUELLE', priorite: 'ne_pas_oublier',   ordre: 5, completionId: null },
      ],
    },

    // ── Accueil (Erwan) ───────────────────────────────────────────────────────
    {
      id: 2, zone: ZONE_ACCUEIL, user: ERWAN,
      missions: [
        { id: 6,  texte: 'Nettoyer la zone d\'attente',              type: 'FIXE',       priorite: 'important',        ordre: 1, completionId: 12 },
        { id: 7,  texte: 'Vérifier la signalétique',                type: 'FIXE',       priorite: 'ne_pas_oublier',   ordre: 2, completionId: null },
        { id: 8,  texte: 'Mettre à jour le tableau des allées',     type: 'PONCTUELLE', priorite: 'ne_pas_oublier',   ordre: 3, completionId: null },
      ],
    },

    // ── Bar (Aya) ─────────────────────────────────────────────────────────────
    {
      id: 3, zone: ZONE_BAR, user: AYA,
      missions: [
        { id: 9,  texte: 'Préparer les machines à café',            type: 'FIXE',       priorite: 'vitale',           ordre: 1, completionId: 13 },
        { id: 10, texte: 'Vérifier les stocks de boissons',         type: 'FIXE',       priorite: 'vitale',           ordre: 2, completionId: null },
        { id: 11, texte: 'Nettoyer le comptoir du bar',             type: 'FIXE',       priorite: 'important',        ordre: 3, completionId: null },
        { id: 12, texte: 'Configurer la caisse du bar',             type: 'FIXE',       priorite: 'vitale',           ordre: 4, completionId: null },
      ],
    },

    // ── Bar (Hiba) ────────────────────────────────────────────────────────────
    {
      id: 4, zone: ZONE_BAR, user: HIBA,
      missions: [
        { id: 13, texte: 'Commander les boissons en rupture',       type: 'PONCTUELLE', priorite: 'important',        ordre: 1, completionId: null },
        { id: 14, texte: 'Préparer la carte du jour',               type: 'FIXE',       priorite: 'ne_pas_oublier',   ordre: 2, completionId: 14 },
        { id: 15, texte: 'Nettoyer le percolateur',                 type: 'FIXE',       priorite: 'important',        ordre: 3, completionId: null },
      ],
    },

    // ── Salle (Gabin) ─────────────────────────────────────────────────────────
    {
      id: 5, zone: ZONE_SALLE, user: GABIN,
      missions: [
        { id: 16, texte: 'Vérifier les pistes 1 à 6',              type: 'FIXE',       priorite: 'vitale',           ordre: 1, completionId: 15 },
        { id: 17, texte: 'Contrôler les machines à boules',         type: 'FIXE',       priorite: 'vitale',           ordre: 2, completionId: 16 },
        { id: 18, texte: 'Allumer les écrans de score',             type: 'FIXE',       priorite: 'vitale',           ordre: 3, completionId: null },
        { id: 19, texte: 'Calibrer les détecteurs de quilles',      type: 'FIXE',       priorite: 'important',        ordre: 4, completionId: null },
        { id: 20, texte: 'Vérifier les pistes 7 à 12',             type: 'FIXE',       priorite: 'vitale',           ordre: 5, completionId: 17 },
      ],
    },

    // ── Salle (Kévin) — Manager supervise ─────────────────────────────────────
    {
      id: 6, zone: ZONE_SALLE, user: KEVIN,
      missions: [
        { id: 21, texte: 'Inspecter la sécurité des pistes',        type: 'FIXE',       priorite: 'vitale',           ordre: 1, completionId: null },
        { id: 22, texte: 'Tester l\'éclairage de la salle',          type: 'FIXE',       priorite: 'important',        ordre: 2, completionId: null },
        { id: 23, texte: 'Vérifier les sorties de secours',         type: 'FIXE',       priorite: 'vitale',           ordre: 3, completionId: 18 },
      ],
    },
  ],
}
