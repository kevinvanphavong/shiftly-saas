# PLANNING_MODULE.md — Module Planning Shiftly

> Conception technique complète du module Planning hebdomadaire.
> Ce document est la référence pour l'implémentation.
> Dernière mise à jour : Avril 2026

---

## 1. Vue d'ensemble

Le module Planning permet au **Manager** de planifier les shifts hebdomadaires du staff
sur les différentes zones du centre, et à l'**Employé** de consulter son planning
sur 3 semaines glissantes (obligation légale — Convention Collective IDCC 1790,
espaces de loisirs : 7 jours calendaires minimum de prévenance).

### Périmètre — Socle (Phase A–C)

- Vue hebdomadaire par employé (grille 7 jours × N employés)
- Création / modification / suppression de shifts (heure début, fin, zone, pause)
- Workflow brouillon → publié par semaine
- Indicateurs temps réel (heures hebdo vs contrat, zones couvertes, alertes)
- Duplication de semaine
- Vue employé : 3 semaines glissantes (semaine en cours + 2 prochaines publiées)

### Périmètre — Avancé (Phase D, différé)

- Templates de semaine type
- Drag & drop des shifts
- Export PDF du planning
- Indisponibilités employé
- Compteurs mensuels / annuels
- Calcul automatique des coûts (taux horaire × heures)

---

## 2. Schéma de données

### 2.1 Extension de l'entité `Poste` (existante)

Le Poste représente déjà l'affectation d'un User à une Zone pour un Service donné.
On l'**étend** avec les horaires individuels du shift plutôt que de créer une entité séparée.

**Nouveaux champs :**

| Champ | Type | Nullable | Défaut | Notes |
|---|---|---|---|---|
| `heureDebut` | time_immutable | oui | null | Heure de début du shift |
| `heureFin` | time_immutable | oui | null | Heure de fin du shift |
| `pauseMinutes` | int | non | 0 | Durée de pause en minutes |

**Calcul des heures travaillées :**

```
Si heureFin >= heureDebut → durée = heureFin - heureDebut - pauseMinutes
Si heureFin < heureDebut  → shift de nuit : durée = (24h - heureDebut) + heureFin - pauseMinutes
Exemple : 17h → 01h = 8h - pause
```

**Contrainte unique existante** : `(service_id, zone_id, user_id)` → un employé ne peut
être affecté qu'une fois à une zone par service. Un même employé peut avoir plusieurs
postes sur le même service s'ils sont dans des zones différentes.

### 2.2 Extension de l'entité `User` (existante)

**Nouveaux champs :**

| Champ | Type | Nullable | Défaut | Notes |
|---|---|---|---|---|
| `heuresHebdo` | int | oui | null | Heures contractuelles par semaine |
| `typeContrat` | string(30) | oui | null | CDI, CDD, EXTRA, ALTERNANCE, STAGE |

> Note : `heuresHebdo` existe déjà dans ENTITES.md comme champ prévu.
> `typeContrat` est un ajout pour le planning (affichage + filtrage).

### 2.3 Nouvelle entité `PlanningWeek`

Représente l'état de publication d'une semaine de planning pour un centre.

| Champ | Type | Nullable | Défaut | Notes |
|---|---|---|---|---|
| `id` | int | non | auto | PK |
| `centre` | Centre | non | — | FK multi-tenant |
| `weekStart` | date_immutable | non | — | Lundi de la semaine (toujours un lundi) |
| `statut` | string(20) | non | BROUILLON | BROUILLON / PUBLIE |
| `publishedAt` | datetime_immutable | oui | null | Date de publication |
| `publishedBy` | User | oui | null | Manager qui a publié |
| `note` | text | oui | null | Note visible par le staff |

**Contrainte unique** : `(centre_id, week_start)` — une seule entrée par semaine par centre

**Logique métier :**
- Une semaine sans `PlanningWeek` est implicitement en brouillon (pas encore créée)
- La publication crée ou met à jour l'entrée avec `statut = PUBLIE`
- Un planning publié reste modifiable (repasse en BROUILLON si on modifie après publication)
- L'employé ne voit que les semaines PUBLIE

---

## 3. Migration SQL

```sql
-- ============================================================
-- Migration Planning Module
-- ============================================================

-- 1. Extension de poste : horaires individuels
ALTER TABLE poste
    ADD COLUMN heure_debut TIME DEFAULT NULL AFTER user_id,
    ADD COLUMN heure_fin   TIME DEFAULT NULL AFTER heure_debut,
    ADD COLUMN pause_minutes INT NOT NULL DEFAULT 0 AFTER heure_fin;

-- 2. Extension de user : contrat
ALTER TABLE `user`
    ADD COLUMN heures_hebdo INT DEFAULT NULL AFTER actif,
    ADD COLUMN type_contrat VARCHAR(30) DEFAULT NULL AFTER heures_hebdo;

-- 3. Nouvelle table planning_week
CREATE TABLE planning_week (
    id           INT AUTO_INCREMENT NOT NULL,
    centre_id    INT          NOT NULL,
    week_start   DATE         NOT NULL,               -- toujours un lundi
    statut       VARCHAR(20)  NOT NULL DEFAULT 'BROUILLON',
    published_at DATETIME     DEFAULT NULL,
    published_by INT          DEFAULT NULL,
    note         TEXT         DEFAULT NULL,
    UNIQUE KEY uniq_pw_centre_week (centre_id, week_start),
    INDEX idx_pw_centre (centre_id),
    INDEX idx_pw_published_by (published_by),
    PRIMARY KEY (id),
    CONSTRAINT FK_pw_centre       FOREIGN KEY (centre_id)    REFERENCES centre (id),
    CONSTRAINT FK_pw_published_by FOREIGN KEY (published_by) REFERENCES `user` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 4. Endpoints API

### 4.1 GET `/api/planning/week` — Planning hebdomadaire (Manager)

**Params :** `?centreId={id}&weekStart=2026-04-13`

**Réponse :**
```json
{
  "weekStart": "2026-04-13",
  "weekEnd": "2026-04-19",
  "statut": "BROUILLON",
  "note": null,
  "zones": [
    { "id": 1, "nom": "Accueil", "couleur": "#3b82f6" },
    { "id": 2, "nom": "Bar",     "couleur": "#a855f7" },
    { "id": 3, "nom": "Salle",   "couleur": "#22c55e" }
  ],
  "employees": [
    {
      "id": 1,
      "nom": "Kévin",
      "prenom": null,
      "role": "MANAGER",
      "avatarColor": "#f97316",
      "heuresHebdo": 39,
      "typeContrat": "CDI",
      "shifts": [
        {
          "posteId": 42,
          "serviceId": 10,
          "date": "2026-04-14",
          "zoneId": 1,
          "zoneNom": "Accueil",
          "zoneCouleur": "#3b82f6",
          "heureDebut": "09:00",
          "heureFin": "17:00",
          "pauseMinutes": 30
        }
      ],
      "totalHeures": 38.5,
      "ecartContrat": -0.5
    }
  ],
  "alertes": [
    {
      "type": "ZONE_NON_COUVERTE",
      "message": "Salle non couverte le mercredi 16/04",
      "date": "2026-04-16",
      "zoneId": 3
    }
  ],
  "stats": {
    "employesPlanifies": 8,
    "totalHeures": 285,
    "creneauxVides": 2,
    "sousPlanifies": 1
  }
}
```

**Controller :** `PlanningController::week()`
**Service :** `PlanningService::getWeekData(Centre, weekStart)`

### 4.2 POST `/api/planning/publish` — Publier une semaine

**Body :**
```json
{
  "weekStart": "2026-04-13"
}
```

**Logique :**
1. Vérifie que des postes existent pour cette semaine
2. Crée ou met à jour `PlanningWeek` → statut = PUBLIE, publishedAt = now()
3. Retourne le `PlanningWeek` mis à jour

**Accès :** ROLE_MANAGER uniquement

### 4.3 POST `/api/planning/duplicate` — Dupliquer une semaine

**Body :**
```json
{
  "sourceWeekStart": "2026-04-13",
  "targetWeekStart": "2026-04-20"
}
```

**Logique :**
1. Récupère tous les postes de la semaine source (via les services de la semaine)
2. Pour chaque jour : crée un service s'il n'existe pas déjà
3. Duplique les postes (user, zone, heureDebut, heureFin, pauseMinutes)
4. La semaine cible est en BROUILLON
5. Si des postes existent déjà sur la cible → erreur 409 (Conflict)

**Accès :** ROLE_MANAGER uniquement

### 4.4 GET `/api/planning/employee` — Vue employé (3 semaines)

**Params :** aucun (userId extrait du JWT)

**Réponse :**
```json
{
  "weeks": [
    {
      "weekStart": "2026-04-13",
      "weekEnd": "2026-04-19",
      "statut": "PUBLIE",
      "shifts": [
        {
          "date": "2026-04-14",
          "zoneNom": "Accueil",
          "zoneCouleur": "#3b82f6",
          "heureDebut": "09:00",
          "heureFin": "17:00",
          "pauseMinutes": 30
        },
        {
          "date": "2026-04-16",
          "zoneNom": "Bar",
          "zoneCouleur": "#a855f7",
          "heureDebut": "14:00",
          "heureFin": "22:00",
          "pauseMinutes": 30
        }
      ],
      "totalHeures": 38.5
    }
  ]
}
```

**Logique :**
- Retourne la semaine en cours + les 2 prochaines semaines **publiées uniquement**
- Si une semaine future n'est pas publiée, elle n'apparaît pas
- Conformité IDCC 1790 : l'employé doit avoir visibilité 7 jours à l'avance minimum

### 4.5 GET `/api/planning/alerts` — Alertes planning

**Params :** `?centreId={id}&weekStart=2026-04-13`

**Types d'alertes :**

| Type | Condition | Sévérité |
|---|---|---|
| `DEPASSEMENT_HEURES` | totalHeures > heuresHebdo + 2h | haute |
| `SOUS_PLANIFIE` | totalHeures < heuresHebdo - 4h | moyenne |
| `ZONE_NON_COUVERTE` | aucun poste sur une zone pour un jour avec service | haute |
| `SANS_PAUSE` | shift > 6h sans pause (pauseMinutes = 0) | moyenne |
| `JOUR_SANS_REPOS` | employé planifié 7/7 jours | haute |

---

## 5. Types TypeScript

```typescript
// types/planning.ts

// ─── Shift (poste avec horaires) ────────────────────────────────────────────

export interface PlanningShift {
  posteId:       number
  serviceId:     number
  date:          string        // 'YYYY-MM-DD'
  zoneId:        number
  zoneNom:       string
  zoneCouleur:   string
  heureDebut:    string        // 'HH:mm'
  heureFin:      string        // 'HH:mm'
  pauseMinutes:  number
}

// ─── Employé dans le planning ────────────────────────────────────────────────

export interface PlanningEmployee {
  id:            number
  nom:           string
  prenom:        string | null
  role:          'MANAGER' | 'EMPLOYE'
  avatarColor:   string | null
  heuresHebdo:   number | null
  typeContrat:   string | null
  shifts:        PlanningShift[]
  totalHeures:   number
  ecartContrat:  number         // positif = surplus, négatif = sous-planifié
}

// ─── Alerte planning ─────────────────────────────────────────────────────────

export type AlerteType =
  | 'DEPASSEMENT_HEURES'
  | 'SOUS_PLANIFIE'
  | 'ZONE_NON_COUVERTE'
  | 'SANS_PAUSE'
  | 'JOUR_SANS_REPOS'

export type AlerteSeverite = 'haute' | 'moyenne'

export interface PlanningAlerte {
  type:      AlerteType
  severite:  AlerteSeverite
  message:   string
  date?:     string
  zoneId?:   number
  userId?:   number
}

// ─── Zone résumée ────────────────────────────────────────────────────────────

export interface PlanningZone {
  id:       number
  nom:      string
  couleur:  string
}

// ─── Stats résumées ──────────────────────────────────────────────────────────

export interface PlanningStats {
  employesPlanifies:  number
  totalHeures:        number
  creneauxVides:      number
  sousPlanifies:      number
}

// ─── Réponse complète GET /planning/week ─────────────────────────────────────

export interface PlanningWeekData {
  weekStart:   string
  weekEnd:     string
  statut:      'BROUILLON' | 'PUBLIE'
  note:        string | null
  zones:       PlanningZone[]
  employees:   PlanningEmployee[]
  alertes:     PlanningAlerte[]
  stats:       PlanningStats
}

// ─── Vue employé ─────────────────────────────────────────────────────────────

export interface EmployeeShift {
  date:          string
  zoneNom:       string
  zoneCouleur:   string
  heureDebut:    string
  heureFin:      string
  pauseMinutes:  number
}

export interface EmployeeWeek {
  weekStart:    string
  weekEnd:      string
  statut:       'PUBLIE'
  shifts:       EmployeeShift[]
  totalHeures:  number
}

export interface EmployeePlanningData {
  weeks: EmployeeWeek[]
}

// ─── Payloads mutations ──────────────────────────────────────────────────────

export interface CreateShiftPayload {
  serviceId:     number
  zoneId:        number
  userId:        number
  heureDebut:    string      // 'HH:mm'
  heureFin:      string      // 'HH:mm'
  pauseMinutes?: number      // défaut 0
}

export interface UpdateShiftPayload {
  posteId:       number
  zoneId?:       number
  heureDebut?:   string
  heureFin?:     string
  pauseMinutes?: number
}

export interface PublishWeekPayload {
  weekStart: string          // 'YYYY-MM-DD' (lundi)
}

export interface DuplicateWeekPayload {
  sourceWeekStart: string
  targetWeekStart: string
}
```

---

## 6. Hooks React Query

```typescript
// hooks/usePlanning.ts

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type {
  PlanningWeekData,
  EmployeePlanningData,
  PlanningAlerte,
  CreateShiftPayload,
  UpdateShiftPayload,
  PublishWeekPayload,
  DuplicateWeekPayload,
} from '@/types/planning'

// ─── Planning hebdo (vue Manager) ────────────────────────────────────────────

export function usePlanningWeek(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningWeekData>({
    queryKey: ['planning', 'week', centreId, weekStart],
    queryFn:  () =>
      api.get('/planning/week', { params: { centreId, weekStart } })
        .then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}

// ─── Planning employé (vue 3 semaines) ───────────────────────────────────────

export function useEmployeePlanning() {
  return useQuery<EmployeePlanningData>({
    queryKey: ['planning', 'employee'],
    queryFn:  () => api.get('/planning/employee').then(r => r.data),
  })
}

// ─── Alertes planning ────────────────────────────────────────────────────────

export function usePlanningAlerts(weekStart: string) {
  const centreId = useAuthStore(s => s.centreId)

  return useQuery<PlanningAlerte[]>({
    queryKey: ['planning', 'alerts', centreId, weekStart],
    queryFn:  () =>
      api.get('/planning/alerts', { params: { centreId, weekStart } })
        .then(r => r.data),
    enabled: !!centreId && !!weekStart,
  })
}

// ─── Créer un shift (poste avec horaires) ────────────────────────────────────

export function useCreateShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateShiftPayload) =>
      api.post('/postes/create', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
      queryClient.invalidateQueries({ queryKey: ['service', 'today', centreId] })
    },
  })
}

// ─── Modifier un shift ───────────────────────────────────────────────────────

export function useUpdateShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ posteId, ...data }: UpdateShiftPayload) =>
      api.patch(`/postes/${posteId}`, data, {
        headers: { 'Content-Type': 'application/merge-patch+json' },
      }).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
    },
  })
}

// ─── Supprimer un shift ──────────────────────────────────────────────────────

export function useDeleteShift() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (posteId: number) =>
      api.delete(`/postes/${posteId}`).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'alerts', centreId] })
      queryClient.invalidateQueries({ queryKey: ['service', 'today', centreId] })
    },
  })
}

// ─── Publier une semaine ─────────────────────────────────────────────────────

export function usePublishWeek() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: PublishWeekPayload) =>
      api.post('/planning/publish', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
      queryClient.invalidateQueries({ queryKey: ['planning', 'employee'] })
    },
  })
}

// ─── Dupliquer une semaine ───────────────────────────────────────────────────

export function useDuplicateWeek() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: DuplicateWeekPayload) =>
      api.post('/planning/duplicate', payload).then(r => r.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['planning', 'week', centreId] })
    },
  })
}
```

---

## 7. Composants React — Arbre

```
app/(app)/planning/
  └── page.tsx                      ← PlanningPage (routeur Manager / Employé)

components/planning/
  ├── PlanningManagerView.tsx        ← Vue complète Manager
  │   ├── WeekNavigator.tsx          ← Navigation semaine (← S15 →) + boutons actions
  │   ├── PlanningGrid.tsx           ← Grille employés × jours
  │   │   ├── PlanningRow.tsx        ← Ligne d'un employé (7 cases + total heures)
  │   │   │   └── ShiftBlock.tsx     ← Bloc shift coloré par zone (cliquable)
  │   │   └── DayHeader.tsx          ← En-tête jour (Lun 14, Mar 15…)
  │   ├── StatsBar.tsx               ← Barre stats en bas (employés, heures, alertes)
  │   ├── AlertPanel.tsx             ← Panneau latéral d'alertes
  │   └── ShiftModal.tsx             ← Modal création / édition d'un shift
  │       ├── TimeRangePicker.tsx    ← Sélection heure début / fin
  │       └── ZoneSelector.tsx       ← Choix de la zone
  │
  └── PlanningEmployeeView.tsx       ← Vue 3 semaines pour l'employé
      ├── WeekCard.tsx               ← Carte d'une semaine
      └── EmployeeShiftRow.tsx       ← Ligne d'un jour avec shift(s)
```

### Détail des composants clés

**PlanningPage** (`page.tsx`)
- Vérifie le rôle via `useAuthStore`
- Manager → `PlanningManagerView`
- Employé → `PlanningEmployeeView`
- 3 états : loading / error / empty

**WeekNavigator**
- Affiche "Semaine 16 — 13 au 19 avril 2026"
- Boutons ← → pour naviguer
- Badge statut (BROUILLON orange / PUBLIÉ vert)
- Boutons : "Publier" / "Dupliquer semaine" / "Ajouter un shift"

**PlanningGrid**
- Grille CSS : colonne fixe (nom employé 200px) + 7 colonnes jours flex
- Scroll horizontal sur mobile
- Chaque cellule peut contenir 0-N `ShiftBlock`
- Click sur cellule vide → ouvre `ShiftModal` en mode création

**ShiftBlock**
- Bloc coloré avec la couleur de la zone
- Affiche : "09:00 – 17:00" + nom zone
- Click → ouvre `ShiftModal` en mode édition
- Bouton × pour supprimer (avec ConfirmModal)

**ShiftModal**
- Mode création : choisir employé (si ouvert depuis cellule vide), zone, heures, pause
- Mode édition : modifier zone, heures, pause
- Validation Zod : heure début < heure fin (sauf shift de nuit), pause ≤ durée shift

**StatsBar**
- Barre fixe en bas de la grille
- 4 métriques : employés planifiés, total heures, créneaux vides, sous-planifiés
- Couleurs sémantiques (vert/jaune/rouge selon seuils)

**AlertPanel**
- Panneau latéral (desktop) ou bottom sheet (mobile)
- Liste des alertes triées par sévérité
- Icônes : 🔴 haute, 🟡 moyenne
- Click sur alerte → scroll vers la ligne/cellule concernée

**PlanningEmployeeView**
- 3 cartes semaines empilées verticalement
- Chaque `WeekCard` : en-tête semaine + liste des shifts par jour
- Jours sans shift affichés en gris "Repos"
- Total heures par semaine en bas de chaque carte

---

## 8. Navigation — Modifications

### 8.1 Ajout de l'item "Planning" dans `navigation.ts`

```typescript
// Nouvel item à ajouter dans ALL_NAV_ITEMS (après Dashboard, avant Service du jour)
{ href: '/planning', label: 'Planning', icon: '📅', managerOnly: false, showOnMobile: true, mobileOrder: 1 }
```

> Note : l'icône Services (📅) actuelle devra être changée pour éviter le doublon.
> Suggestion : Services → '📊' ou '🗓️', Planning garde '📅'

### 8.2 Ordre mobile mis à jour

```
MANAGER  : Dashboard(0) · Planning(1) · Service(2) · Services(3) · Postes(4) · Staff(5) · Tutoriels(6) · Réglages(7)
EMPLOYE  : Planning(1) · Service(2) · Postes(4) · Staff(5) · Tutoriels(6) · Réglages(7)
```

### 8.3 Sidebar desktop — sections

Ajouter "Planning" dans la section principale, entre Dashboard et Service du jour.

---

## 9. Backend Symfony — Controller & Service

### 9.1 PlanningController

```
src/Controller/PlanningController.php

Routes :
  GET  /api/planning/week       → week()
  POST /api/planning/publish    → publish()
  POST /api/planning/duplicate  → duplicate()
  GET  /api/planning/employee   → employee()
  GET  /api/planning/alerts     → alerts()
```

Chaque route est sécurisée :
- `week`, `publish`, `duplicate`, `alerts` → `ROLE_MANAGER`
- `employee` → `ROLE_USER` (tout employé connecté)

Le `centreId` est extrait du JWT pour toutes les routes (multi-tenant).

### 9.2 PlanningService

```
src/Service/PlanningService.php

Méthodes principales :
  getWeekData(Centre, DateTimeImmutable weekStart): array
  getEmployeeWeeks(User): array
  publishWeek(Centre, DateTimeImmutable weekStart, User publisher): PlanningWeek
  duplicateWeek(Centre, DateTimeImmutable source, DateTimeImmutable target): void
  getAlerts(Centre, DateTimeImmutable weekStart): array
  calculateShiftDuration(Poste): float  // en heures décimales
```

**Logique `getWeekData`** :
1. Récupère les 7 services de la semaine (lundi → dimanche)
2. Pour chaque service : récupère les postes avec user + zone
3. Regroupe par employé
4. Calcule les heures totales par employé
5. Calcule l'écart vs contrat (heuresHebdo)
6. Génère les alertes
7. Calcule les stats agrégées

**Logique `duplicateWeek`** :
1. Vérifie qu'aucun poste n'existe sur la semaine cible
2. Pour chaque jour de la source :
   - Si un service source existe avec des postes → crée le service cible si manquant
   - Duplique chaque poste (user, zone, heureDebut, heureFin, pauseMinutes)
3. Flush en une seule transaction

**Logique `calculateShiftDuration`** :
```php
public function calculateShiftDuration(Poste $poste): float
{
    $debut = $poste->getHeureDebut();
    $fin   = $poste->getHeureFin();
    if (!$debut || !$fin) return 0.0;

    $minutes = ($fin->getTimestamp() - $debut->getTimestamp()) / 60;
    if ($minutes < 0) $minutes += 1440; // shift de nuit (+24h)

    $minutes -= $poste->getPauseMinutes();
    return round(max(0, $minutes) / 60, 2);
}
```

---

## 10. Entité PlanningWeek — Doctrine

```php
// src/Entity/PlanningWeek.php

#[ORM\Entity(repositoryClass: PlanningWeekRepository::class)]
#[ORM\UniqueConstraint(name: 'uniq_pw_centre_week', columns: ['centre_id', 'week_start'])]
class PlanningWeek
{
    const STATUT_BROUILLON = 'BROUILLON';
    const STATUT_PUBLIE    = 'PUBLIE';

    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Centre::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Centre $centre = null;

    #[ORM\Column(type: 'date_immutable')]
    private ?\DateTimeImmutable $weekStart = null;

    #[ORM\Column(length: 20)]
    private string $statut = self::STATUT_BROUILLON;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $publishedAt = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $publishedBy = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $note = null;

    // Getters / Setters ...
}
```

---

## 11. Ordre d'implémentation

### Phase A — Base (priorité 1)

1. **Migration SQL** : ALTER poste + ALTER user + CREATE planning_week
2. **Entité PlanningWeek** : Doctrine entity + repository
3. **Modifier Poste.php** : ajouter heureDebut, heureFin, pauseMinutes + groups
4. **Modifier User.php** : ajouter heuresHebdo, typeContrat + groups
5. **PlanningService** : getWeekData + calculateShiftDuration
6. **PlanningController** : GET /planning/week
7. **Types TypeScript** : types/planning.ts
8. **Hook usePlanningWeek** : query de base
9. **PlanningPage** : page.tsx avec routage Manager/Employé
10. **PlanningGrid** + PlanningRow + ShiftBlock + DayHeader
11. **WeekNavigator** : navigation entre semaines

### Phase B — Indicateurs (priorité 2)

12. **StatsBar** : métriques en bas de grille
13. **AlertPanel** : panneau d'alertes
14. **Hook usePlanningAlerts**
15. **PlanningController::alerts()**
16. **PlanningService::getAlerts()**
17. Barre de progression heures par employé (dans PlanningRow)

### Phase C — Confort (priorité 3)

18. **ShiftModal** : création / édition shift (React Hook Form + Zod)
19. **useCreateShift + useUpdateShift + useDeleteShift**
20. **PlanningController::publish()** + usePublishWeek
21. **PlanningController::duplicate()** + useDuplicateWeek
22. **GET /planning/employee** + useEmployeePlanning
23. **PlanningEmployeeView** : vue 3 semaines
24. **Navigation** : ajout item Planning dans sidebar + bottom nav

### Phase D — Avancé (différé)

25. Templates de semaine type
26. Drag & drop (react-beautiful-dnd ou @dnd-kit)
27. Export PDF du planning
28. Indisponibilités employé
29. Compteurs mensuels / annuels
30. Calcul automatique des coûts

---

## 12. Pièges à éviter — Notes pour l'implémentation

### 12.1 Poste.php — Ajouter une opération PATCH

L'entité Poste actuelle n'a PAS d'opération Patch dans ses déclarations API Platform.
Le hook `useUpdateShift` utilise `PATCH /postes/{posteId}`. Il faut donc ajouter :

```php
// Dans les operations de Poste.php, ajouter :
use ApiPlatform\Metadata\Patch;

new Patch(
    security: "is_granted('ROLE_MANAGER') and is_granted('DELETE', object)",
    denormalizationContext: ['groups' => ['poste:write']]
),
```

### 12.2 Groupes de sérialisation des nouveaux champs

**Poste.php** — les 3 nouveaux champs doivent avoir les bons groupes :
```php
#[ORM\Column(type: 'time_immutable', nullable: true)]
#[Groups(['poste:read', 'poste:write'])]
private ?\DateTimeImmutable $heureDebut = null;

#[ORM\Column(type: 'time_immutable', nullable: true)]
#[Groups(['poste:read', 'poste:write'])]
private ?\DateTimeImmutable $heureFin = null;

#[ORM\Column(options: ['default' => 0])]
#[Groups(['poste:read', 'poste:write'])]
private int $pauseMinutes = 0;
```

**User.php** — les 2 nouveaux champs :
```php
#[ORM\Column(nullable: true)]
#[Groups(['user:read', 'user:write'])]
private ?int $heuresHebdo = null;

#[ORM\Column(length: 30, nullable: true)]
#[Groups(['user:read', 'user:write'])]
private ?string $typeContrat = null;
```

### 12.3 Navigation — mobileOrder actuels et conflits

Les `mobileOrder` actuels dans `navigation.ts` sont :
```
Dashboard     → 0 (managerOnly)
Service       → 1
Services      → 1 (managerOnly)
Postes        → 2
Staff         → 3
Tutoriels     → 4
Réglages      → 5
```

Après ajout du Planning, **recaler tous les mobileOrder** :
```typescript
{ href: '/dashboard', label: 'Dashboard',       icon: '⚡',  managerOnly: true,  showOnMobile: true, mobileOrder: 0 },
{ href: '/planning',  label: 'Planning',        icon: '📅',  managerOnly: false, showOnMobile: true, mobileOrder: 1 },
{ href: '/service',   label: 'Service du jour', icon: '📋',  managerOnly: false, showOnMobile: true, mobileOrder: 2 },
{ href: '/services',  label: 'Services',        icon: '🗓️', managerOnly: true,  showOnMobile: true, mobileOrder: 3 },
{ href: '/postes',    label: 'Postes',          icon: '🗂️', managerOnly: false, showOnMobile: true, mobileOrder: 4 },
{ href: '/staff',     label: 'Staff',           icon: '👥',  managerOnly: false, showOnMobile: true, mobileOrder: 5 },
{ href: '/tutoriels', label: 'Tutoriels',       icon: '📖',  managerOnly: false, showOnMobile: true, mobileOrder: 6 },
{ href: '/reglages',  label: 'Réglages',        icon: '⚙️',  managerOnly: false, showOnMobile: true, mobileOrder: 7 },
```

### 12.4 PlanningWeekRepository — méthode requise

```php
// src/Repository/PlanningWeekRepository.php

class PlanningWeekRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlanningWeek::class);
    }

    /** Trouve la PlanningWeek pour un centre et un lundi donné */
    public function findByCentreAndWeek(int $centreId, \DateTimeImmutable $weekStart): ?PlanningWeek
    {
        return $this->createQueryBuilder('pw')
            ->andWhere('pw.centre = :centreId')
            ->andWhere('pw.weekStart = :weekStart')
            ->setParameter('centreId', $centreId)
            ->setParameter('weekStart', $weekStart)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /** Semaines publiées entre deux dates (pour la vue employé) */
    public function findPublishedBetween(int $centreId, \DateTimeImmutable $from, \DateTimeImmutable $to): array
    {
        return $this->createQueryBuilder('pw')
            ->andWhere('pw.centre = :centreId')
            ->andWhere('pw.statut = :statut')
            ->andWhere('pw.weekStart BETWEEN :from AND :to')
            ->setParameter('centreId', $centreId)
            ->setParameter('statut', PlanningWeek::STATUT_PUBLIE)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->orderBy('pw.weekStart', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
```

### 12.5 ServiceRepository::findBetween — déjà existant

`ServiceRepository` a déjà une méthode `findBetween(centreId, from, to)` qui retourne
les services triés par date ASC. Le `PlanningService::getWeekData()` doit l'utiliser
directement — pas besoin de la recréer.

### 12.6 Création de shift — le Service doit exister

Le hook `useCreateShift` appelle `POST /postes/create` (endpoint custom existant).
Cet endpoint doit être **modifié** pour :
1. Accepter les nouveaux champs `heureDebut`, `heureFin`, `pauseMinutes`
2. Créer automatiquement le Service du jour si aucun n'existe encore pour cette date

Vérifier le controller existant qui gère `/postes/create` (probablement dans un
PosteController custom) et l'adapter.

### 12.7 Pattern multi-tenant — à suivre

Suivre le pattern de `DashboardController` pour le guard multi-tenant :
```php
$currentUser = $this->getUser();
if ($currentUser->getCentre()?->getId() !== $centreId) {
    throw $this->createAccessDeniedException('Accès refusé à ce centre.');
}
```

---

## 13. Points d'attention

**Performance** : La requête GET /planning/week fait N+1 si mal optimisée.
Utiliser des JOINs Doctrine (QueryBuilder avec leftJoin + select) pour charger
services → postes → user + zone en une seule requête.

**Fuseau horaire** : Stocker les heures en UTC, afficher en Europe/Paris.
Le service du centre est toujours dans le même fuseau.

**Contrainte UNIQUE poste** : `(service_id, zone_id, user_id)` permet un employé
sur plusieurs zones le même jour (ex: Accueil le matin, Bar l'après-midi)
mais pas deux fois sur la même zone pour le même service.

**Convention collective IDCC 1790** :
- Planning communiqué 7 jours calendaires à l'avance minimum
- Repos hebdomadaire : 2 jours consécutifs ou non (selon accord d'entreprise)
- Durée maximale journalière : 10h (alerte si shift > 10h)
- Pause obligatoire : 20 min après 6h de travail continu

**Compatibilité Service du Jour** : Le module Planning crée des Services + Postes
qui sont ensuite utilisés par la page Service du Jour. Les deux modules partagent
les mêmes entités — pas de duplication de données.
