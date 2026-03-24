import type { StaffMember } from '@/types/staff'

export const mockStaff: StaffMember[] = [
  // ── 1 · Kévin — Manager ───────────────────────────────────────────────────
  {
    id: 1, nom: 'Kévin V.', prenom: 'Kévin',
    role: 'MANAGER', status: 'present',
    points: 340, niveau: 5,
    zones: ['Manager', 'Salle'],
    tailleHaut: 'L', tailleBas: '42', pointure: '44',
    tutorielsLus: 5, tutorielsTotal: 5,
    competences: [
      { id: 1,  nom: 'Accueil clients',       zone: 'Accueil', points: 15, difficulte: 'simple'      },
      { id: 4,  nom: 'Gestion caisse',        zone: 'Accueil', points: 25, difficulte: 'avancee'     },
      { id: 7,  nom: 'Préparation cocktails', zone: 'Bar',     points: 30, difficulte: 'avancee'     },
      { id: 16, nom: 'Sécurité des pistes',   zone: 'Salle',   points: 40, difficulte: 'experimente' },
    ],
  },

  // ── 2 · Patou ─────────────────────────────────────────────────────────────
  {
    id: 2, nom: 'Patou M.', prenom: 'Patou',
    role: 'EMPLOYE', status: 'present',
    points: 220, niveau: 4,
    zones: ['Accueil'],
    tailleHaut: 'M', tailleBas: '40', pointure: '41',
    tutorielsLus: 4, tutorielsTotal: 5,
    competences: [
      { id: 1,  nom: 'Accueil clients',    zone: 'Accueil', points: 15, difficulte: 'simple'  },
      { id: 2,  nom: 'Gestion chaussures', zone: 'Accueil', points: 10, difficulte: 'simple'  },
      { id: 4,  nom: 'Gestion caisse',     zone: 'Accueil', points: 25, difficulte: 'avancee' },
    ],
  },

  // ── 3 · Aya ───────────────────────────────────────────────────────────────
  {
    id: 3, nom: 'Aya K.', prenom: 'Aya',
    role: 'EMPLOYE', status: 'present',
    points: 180, niveau: 3,
    zones: ['Bar'],
    tailleHaut: 'XS', tailleBas: '36', pointure: '37',
    tutorielsLus: 3, tutorielsTotal: 5,
    competences: [
      { id: 7,  nom: 'Préparation cocktails', zone: 'Bar', points: 30, difficulte: 'avancee'  },
      { id: 8,  nom: 'Gestion stock boissons',zone: 'Bar', points: 20, difficulte: 'simple'   },
      { id: 9,  nom: 'Encaissement bar',      zone: 'Bar', points: 15, difficulte: 'simple'   },
    ],
  },

  // ── 4 · Gabin ─────────────────────────────────────────────────────────────
  {
    id: 4, nom: 'Gabin R.', prenom: 'Gabin',
    role: 'EMPLOYE', status: 'pause',
    points: 150, niveau: 3,
    zones: ['Salle'],
    tailleHaut: 'XL', tailleBas: '46', pointure: '46',
    tutorielsLus: 2, tutorielsTotal: 5,
    competences: [
      { id: 13, nom: 'Vérification pistes',    zone: 'Salle', points: 20, difficulte: 'simple'      },
      { id: 14, nom: 'Calibrage détecteurs',   zone: 'Salle', points: 35, difficulte: 'avancee'     },
      { id: 15, nom: 'Maintenance machines',   zone: 'Salle', points: 45, difficulte: 'experimente' },
    ],
  },

  // ── 5 · Erwan ─────────────────────────────────────────────────────────────
  {
    id: 5, nom: 'Erwan L.', prenom: 'Erwan',
    role: 'EMPLOYE', status: 'present',
    points: 95, niveau: 2,
    zones: ['Accueil'],
    tailleHaut: 'L', tailleBas: '42', pointure: '43',
    tutorielsLus: 2, tutorielsTotal: 5,
    competences: [
      { id: 1, nom: 'Accueil clients',    zone: 'Accueil', points: 15, difficulte: 'simple' },
      { id: 2, nom: 'Gestion chaussures', zone: 'Accueil', points: 10, difficulte: 'simple' },
    ],
  },

  // ── 6 · Hiba ──────────────────────────────────────────────────────────────
  {
    id: 6, nom: 'Hiba B.', prenom: 'Hiba',
    role: 'EMPLOYE', status: 'present',
    points: 75, niveau: 2,
    zones: ['Bar'],
    tailleHaut: 'S', tailleBas: '38', pointure: '38',
    tutorielsLus: 1, tutorielsTotal: 5,
    competences: [
      { id: 8, nom: 'Gestion stock boissons', zone: 'Bar', points: 20, difficulte: 'simple' },
    ],
  },

  // ── 7 · Dina ──────────────────────────────────────────────────────────────
  {
    id: 7, nom: 'Dina M.', prenom: 'Dina',
    role: 'EMPLOYE', status: 'absent',
    points: 130, niveau: 3,
    zones: ['Salle', 'Accueil'],
    tailleHaut: 'S', tailleBas: '38', pointure: '39',
    tutorielsLus: 3, tutorielsTotal: 5,
    competences: [
      { id: 1,  nom: 'Accueil clients',    zone: 'Accueil', points: 15, difficulte: 'simple'  },
      { id: 13, nom: 'Vérification pistes',zone: 'Salle',   points: 20, difficulte: 'simple'  },
    ],
  },

  // ── 8 · Cynthia ───────────────────────────────────────────────────────────
  {
    id: 8, nom: 'Cynthia R.', prenom: 'Cynthia',
    role: 'EMPLOYE', status: 'present',
    points: 200, niveau: 4,
    zones: ['Accueil', 'Bar'],
    tailleHaut: 'M', tailleBas: '40', pointure: '40',
    tutorielsLus: 4, tutorielsTotal: 5,
    competences: [
      { id: 1, nom: 'Accueil clients',        zone: 'Accueil', points: 15, difficulte: 'simple'  },
      { id: 4, nom: 'Gestion caisse',         zone: 'Accueil', points: 25, difficulte: 'avancee' },
      { id: 7, nom: 'Préparation cocktails',  zone: 'Bar',     points: 30, difficulte: 'avancee' },
    ],
  },

  // ── 9 · Lucas ─────────────────────────────────────────────────────────────
  {
    id: 9, nom: 'Lucas B.', prenom: 'Lucas',
    role: 'EMPLOYE', status: 'absent',
    points: 60, niveau: 1,
    zones: ['Salle'],
    tailleHaut: 'M', tailleBas: '40', pointure: '42',
    tutorielsLus: 1, tutorielsTotal: 5,
    competences: [
      { id: 13, nom: 'Vérification pistes', zone: 'Salle', points: 20, difficulte: 'simple' },
    ],
  },

  // ── 10 · Théo ─────────────────────────────────────────────────────────────
  {
    id: 10, nom: 'Théo G.', prenom: 'Théo',
    role: 'EMPLOYE', status: 'pause',
    points: 110, niveau: 2,
    zones: ['Bar', 'Salle'],
    tailleHaut: 'L', tailleBas: '44', pointure: '44',
    tutorielsLus: 2, tutorielsTotal: 5,
    competences: [
      { id: 8,  nom: 'Gestion stock boissons', zone: 'Bar',   points: 20, difficulte: 'simple'  },
      { id: 13, nom: 'Vérification pistes',    zone: 'Salle', points: 20, difficulte: 'simple'  },
    ],
  },

  // ── 11 · Amina ────────────────────────────────────────────────────────────
  {
    id: 11, nom: 'Amina S.', prenom: 'Amina',
    role: 'EMPLOYE', status: 'present',
    points: 165, niveau: 3,
    zones: ['Accueil'],
    tailleHaut: 'XS', tailleBas: '36', pointure: '37',
    tutorielsLus: 3, tutorielsTotal: 5,
    competences: [
      { id: 1, nom: 'Accueil clients',    zone: 'Accueil', points: 15, difficulte: 'simple'  },
      { id: 2, nom: 'Gestion chaussures', zone: 'Accueil', points: 10, difficulte: 'simple'  },
      { id: 3, nom: 'Animation bowling',  zone: 'Accueil', points: 20, difficulte: 'avancee' },
    ],
  },

  // ── 12 · Yanis ────────────────────────────────────────────────────────────
  {
    id: 12, nom: 'Yanis T.', prenom: 'Yanis',
    role: 'EMPLOYE', status: 'present',
    points: 85, niveau: 2,
    zones: ['Bar'],
    tailleHaut: 'M', tailleBas: '40', pointure: '42',
    tutorielsLus: 2, tutorielsTotal: 5,
    competences: [
      { id: 8, nom: 'Gestion stock boissons', zone: 'Bar', points: 20, difficulte: 'simple' },
      { id: 9, nom: 'Encaissement bar',       zone: 'Bar', points: 15, difficulte: 'simple' },
    ],
  },
]
