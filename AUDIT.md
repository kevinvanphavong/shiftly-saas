# AUDIT.md — Shiftly
> Généré le 2026-03-24 — Analyse statique complète de /shiftly-api et /shiftly-app

---

## LÉGENDE
- 🔴 BLOQUANT — Empêche le fonctionnement de la feature
- 🟠 IMPORTANT — Fonctionnalité incomplète ou données non persistées
- 🟡 MINEUR — Incohérence, mauvaise pratique, dette technique

---

## 1. BOUTONS SANS COMPORTEMENT

### 🔴 BLOQUANT

**1.1 Page Login — formulaire entièrement non fonctionnel**
- **Fichier** : `shiftly-app/src/app/(auth)/login/page.tsx`
- **Problème** : Aucun `onSubmit` sur le formulaire. Les inputs `email` et `password` ne sont pas contrôlés. Le bouton "Se connecter" n'a aucun handler `onClick`.
- **Impact** : Impossible de se connecter. L'application est inaccessible.
- **Endpoint concerné** : `POST /api/auth/login` existe côté Symfony mais n'est jamais appelé.

---

### 🟠 IMPORTANT

**1.2 ReadIndicator — appel API commenté, jamais exécuté**
- **Fichier** : `shiftly-app/src/components/tutoriels/ReadIndicator.tsx` (lignes ~38–43)
- **Problème** : Le toggle "lu/non lu" fait un faux `setTimeout(200ms)` à la place d'un vrai appel API :
  ```tsx
  // TODO: swap mock → real API
  await new Promise(r => setTimeout(r, 200))
  // await api.post('/tuto_reads', { tutoriel: `/api/tutoriels/${tutoId}`, ... })
  // await api.delete(`/tuto_reads/${readId}`)
  ```
- **Impact** : L'état "lu" n'est jamais persisté. Il se réinitialise au rechargement.

**1.3 ModalConfirmDelete — suppression uniquement locale**
- **Fichier** : `shiftly-app/src/components/editeur/ModalConfirmDelete.tsx` (lignes ~34–36)
- **Problème** : `handleConfirm()` appelle uniquement `onConfirm()` (setState local). Le commentaire dit "handled by caller" mais aucun caller n'effectue le `DELETE` API.
- **Impact** : Les suppressions de zones/missions/compétences disparaissent au rechargement.

---

## 2. FORMULAIRES QUI NE PERSISTENT PAS

### 🔴 BLOQUANT

**2.1 Page Éditeur — aucune persistance API, tout en état local**
- **Fichier** : `shiftly-app/src/app/(app)/reglages/editeur/page.tsx` (lignes ~28–285)
- **Problème** : L'état initial est chargé depuis `mockZones, mockMissions, mockCompetences`. Toutes les fonctions CRUD (`handleSaveZone`, `handleSaveMission`, `handleDeleteMission`, etc.) n'effectuent que des `setState`. Aucun appel API.
- **Endpoints manquants** :
  - `POST/PUT/DELETE /api/zones`
  - `POST/PUT/DELETE /api/missions`
  - `POST/PUT/DELETE /api/competences`

---

### 🟠 IMPORTANT

**2.2 ModalAddZone — USE_MOCK=true + utilise fetch() au lieu de axios**
- **Fichier** : `shiftly-app/src/components/editeur/ModalAddZone.tsx` (lignes ~6, ~32–42)
- **Problème** : `const USE_MOCK = true` désactive la persistance. Quand activé, utilise `fetch()` natif au lieu du client axios centralisé (`lib/api.ts`), sans token JWT.
- **Endpoint manquant** : `POST /api/zones` ou `PUT /api/zones/{id}`

**2.3 ModalAddMission — même problème**
- **Fichier** : `shiftly-app/src/components/editeur/ModalAddMission.tsx` (lignes ~6, ~44–51)
- **Problème** : `USE_MOCK = true` + `fetch()` natif sans JWT.
- **Endpoint manquant** : `POST /api/missions` ou `PUT /api/missions/{id}`

**2.4 ModalAddCompetence — même problème**
- **Fichier** : `shiftly-app/src/components/editeur/ModalAddCompetence.tsx` (lignes ~6, ~43–50)
- **Problème** : `USE_MOCK = true` + `fetch()` natif sans JWT.
- **Endpoint manquant** : `POST /api/competences` ou `PUT /api/competences/{id}`

**2.5 ModalMoveZone — même problème**
- **Fichier** : `shiftly-app/src/components/editeur/ModalMoveZone.tsx` (lignes ~6, ~23–29)
- **Problème** : `USE_MOCK = true` + `fetch()` natif :
  ```tsx
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions/${mission!.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ zoneId: selected }),
  }).catch(console.error)
  ```
- **Endpoint manquant** : `PUT /api/missions/{id}`

**2.6 Page Service du Jour — USE_MOCK=true bloque tous les appels**
- **Fichier** : `shiftly-app/src/app/(app)/service/page.tsx` (ligne ~26)
- **Problème** : `const USE_MOCK = true` court-circuite les appels vers `/completions` (lignes ~123–128) et `/incidents` (ligne ~160). Les coches de mission et les incidents ne sont jamais sauvegardés.
- **Endpoints bloqués** :
  - `POST /api/completions`
  - `DELETE /api/completions/{id}`
  - `POST /api/incidents`

---

## 3. APPELS API MANQUANTS

### 🔴 BLOQUANT — Endpoints cassés côté Symfony

**3.1 DashboardController — dump() + die() en production**
- **Fichier** : `shiftly-api/src/Controller/DashboardController.php` (lignes 51–52)
- **Code** :
  ```php
  dump($currentUser->getCentre()?->getId(), $centreId);
  die();
  ```
- **Impact** : L'endpoint `GET /api/dashboard/{centreId}` retourne du HTML Symfony Dumper et termine le script. Aucune réponse JSON n'est jamais émise.

---

### 🟠 IMPORTANT — Endpoints Symfony définis mais jamais appelés depuis le frontend

| Endpoint Symfony | Méthodes disponibles | Appelé depuis le front |
|---|---|---|
| `/api/services` | GET, POST, PUT, DELETE | ❌ Non (page `/services` utilise données hardcodées) |
| `/api/missions` | GET, POST, PUT, DELETE | ❌ Non |
| `/api/postes` | GET, POST, PUT, DELETE | ❌ Non |
| `/api/zones` | GET, POST, PUT, DELETE | ❌ Non (fetch() derrière USE_MOCK=true) |
| `/api/competences` | GET, POST, PUT, DELETE | ❌ Non |
| `/api/users` | GET, POST, PUT, DELETE | ❌ Non |
| `/api/centres` | GET, POST, PUT, DELETE | ❌ Non |
| `/api/incidents` | GET, POST, PUT, DELETE | ❌ Non (derrière USE_MOCK=true) |
| `/api/completions` | GET, POST, DELETE | ❌ Non (derrière USE_MOCK=true) |
| `/api/tuto_reads` | POST, DELETE | ❌ Non (code commenté dans ReadIndicator) |
| `/api/dashboard/{centreId}` | GET | ❌ Non (frontend commente l'appel + backend cassé) |
| `/api/auth/login` | POST | ❌ Non (formulaire login sans handler) |

**Taux d'utilisation des endpoints API** : ~0% en conditions réelles

---

### 🟠 IMPORTANT — Appels front pointant vers des endpoints inexistants ou mal formés

**3.2 ModalMoveZone utilise `process.env.NEXT_PUBLIC_API_URL/missions/{id}` sans préfixe `/api/`**
- **Fichier** : `shiftly-app/src/components/editeur/ModalMoveZone.tsx` (ligne ~25)
- **URL construite** : `${process.env.NEXT_PUBLIC_API_URL}/missions/1`
- **URL correcte** : `${process.env.NEXT_PUBLIC_API_URL}/api/missions/1`
- **Impact** : Route 404 garantie même si USE_MOCK est désactivé.

**3.3 Même problème dans ModalAddZone, ModalAddMission, ModalAddCompetence**
- Les URLs construites avec `fetch()` omettent probablement le préfixe `/api/` ou utilisent une base URL incorrecte.

---

## 4. DONNÉES ENCORE MOCKÉES

### 🔴 BLOQUANT

**4.1 `lib/mock-data.ts` — 150+ lignes de données de service hardcodées**
- **Fichier** : `shiftly-app/src/lib/mock-data.ts`
- **Contenu** : `mockServiceData` avec services, staff, postes, missions entièrement faux.
- **Utilisé dans** : `app/(app)/service/page.tsx` ligne ~59 : `const data = mockServiceData`
- **Devrait être** : `useQuery` vers `/api/services/{id}` puis `/api/postes?service={id}`

**4.2 `lib/mock/dashboard.ts` — dashboard figé au 19 mars 2026**
- **Fichier** : `shiftly-app/src/lib/mock/dashboard.ts`
- **Utilisé dans** : `app/(app)/dashboard/page.tsx` ligne ~19
- **Note** : Le code de remplacement est commenté dans la page dashboard avec un TODO explicite.

---

### 🟠 IMPORTANT

**4.3 `lib/mock/staff.ts` — staff entièrement hardcodé**
- **Fichier** : `shiftly-app/src/lib/mock/staff.ts`
- **Contenu** : `mockStaff` et `STAFF_ZONES` avec noms et photos fictifs.
- **Utilisé dans** : `app/(app)/staff/page.tsx` ligne ~18

**4.4 `lib/mock/tutoriels.ts` — tutoriels + états "lu" hardcodés**
- **Fichier** : `shiftly-app/src/lib/mock/tutoriels.ts`
- **Contenu** : `mockTutoriels` et `INITIAL_READ_IDS` (IDs des tutoriels marqués "lus" par défaut).
- **Utilisé dans** : `app/(app)/tutoriels/page.tsx` ligne ~21

**4.5 `lib/mock/editeur.ts` — zones/missions/compétences hardcodées**
- **Fichier** : `shiftly-app/src/lib/mock/editeur.ts`
- **Contenu** : `mockZones, mockMissions, mockCompetences, CATEGORIES` entièrement faux.
- **Utilisé dans** : `app/(app)/reglages/editeur/page.tsx` lignes ~28–30

**4.6 Page Services — tableau de services hardcodé dans le composant**
- **Fichier** : `shiftly-app/src/app/(app)/services/page.tsx` (lignes ~5–10)
- **Problème** : `const services = [{ id: 1, date: "2026-03-16", ... }]` directement dans le fichier. Dates passées, figées.

**4.7 Page Postes — zones hardcodées**
- **Fichier** : `shiftly-app/src/app/(app)/postes/page.tsx` (lignes ~5–41)
- **Problème** : `const zones = [...]` avec missions et staff hardcodés.

**4.8 `CURRENT_USER_ID` hardcodé à 1**
- **Fichier** : `shiftly-app/src/app/(app)/service/page.tsx` (ligne ~31)
- **Code** : `const CURRENT_USER_ID = 1`
- **Impact** : Tous les appels API (quand USE_MOCK sera désactivé) utiliseront l'ID 1, pas l'utilisateur connecté.

---

## 5. ERREURS CONSOLE CONNUES

### 🟠 IMPORTANT

**5.1 Aucun hook React Query implémenté — dossier `hooks/` vide**
- **Fichier** : `shiftly-app/src/hooks/` (répertoire vide)
- **Problème** : CLAUDE.md exige "Hooks React Query (un par module)". Aucun hook n'existe.
- **Conséquence** : Aucun `useQuery`, aucun `useMutation` dans tout le projet.

**5.2 Aucun store Zustand auth implémenté**
- **Problème** : CLAUDE.md exige "L'état global d'authentification passe par Zustand". Aucun store Zustand d'auth trouvé.
- **Conséquence** : `CURRENT_USER_ID` est hardcodé, le centreId est inconnu, les guards de route sont absents.

**5.3 Incohérence des types Mission — frontend vs. backend**
- **Backend** (`Mission.php`, lignes ~40–43) : `TYPE_OUVERTURE | TYPE_SERVICE | TYPE_MENAGE | TYPE_FERMETURE`
- **Frontend** (`src/types/index.ts`, ligne ~30) : `type: 'FIXE' | 'PONCTUELLE'`
- **Frontend** (`lib/mock-data.ts`) : Utilise `type: "FIXE"` et `type: "PONCTUELLE"`
- **Problème** : Les deux systèmes sont incompatibles. Quand le backend sera branché, tous les `type` seront incohérents et les filtres ne fonctionneront pas.

**5.4 ModalAddMission utilise `titre` — champ inexistant dans l'entité**
- **Fichier** : `shiftly-app/src/components/editeur/ModalAddMission.tsx` (ligne ~17)
- **Code** : `const [titre, setTitre] = useState('')`
- **Réalité backend** : `Mission.php` utilise `$texte`, pas `$titre`.
- **Impact** : Le champ envoyé au backend sera ignoré ou provoquera une erreur de mapping.

**5.5 Modales éditeur utilisent fetch() sans le client axios centralisé**
- **Fichiers** : `ModalAddZone.tsx`, `ModalAddMission.tsx`, `ModalAddCompetence.tsx`, `ModalMoveZone.tsx`
- **Problème** : `fetch()` natif ne bénéficie pas de l'intercepteur JWT de `lib/api.ts`. Les requêtes seront rejetées avec 401 car aucun header `Authorization` n'est ajouté.

---

### 🟡 MINEUR

**5.6 Pas d'utilisation de `any` TypeScript** ✅
- Le projet respecte la règle TypeScript strict — aucun `any` détecté.

---

## 6. PROBLÈMES MÉTIER

### 🔴 BLOQUANT

**6.1 DashboardController — `dump()` + `die()` en dur**
- **Fichier** : `shiftly-api/src/Controller/DashboardController.php` (lignes 51–52)
- **Code** :
  ```php
  dump($currentUser->getCentre()?->getId(), $centreId);
  die();
  ```
- **Problème** : Code de debug laissé en production. L'endpoint retourne du HTML et termine le script. Aucune réponse JSON n'est jamais générée.
- **Fix** : Supprimer ces deux lignes.

---

### 🟠 IMPORTANT

**6.2 Entité Service — contrainte UNIQUE (centre_id, date) absente**
- **Fichier** : `shiftly-api/src/Entity/Service.php` (lignes ~22–50)
- **Problème** : Aucune annotation `#[ORM\UniqueConstraint]` sur la combinaison `(centre_id, date)`.
- **Conséquence** : Il est possible de créer plusieurs services le même jour pour le même centre. Corruption de données possible.
- **Fix** :
  ```php
  #[ORM\UniqueConstraint(name: 'uniq_service_centre_date', columns: ['centre_id', 'date'])]
  ```

**6.3 Entité Mission — relation Service absente pour missions PONCTUELLES**
- **Fichier** : `shiftly-api/src/Entity/Mission.php`
- **Problème** : Aucune propriété `$service` (ManyToOne vers Service). CLAUDE.md spécifie "Les missions PONCTUELLES ont service_id renseigné" et "Les missions FIXE ont service_id null".
- **Conséquence** : Impossible de créer ou filtrer des missions ponctuelles attachées à un service spécifique.
- **Fix** : Ajouter une relation ManyToOne nullable vers Service.

**6.4 Champ `taux_completion` — jamais calculé, probablement absent**
- **Fichier** : `shiftly-api/src/Entity/Service.php`
- **Problème** : CLAUDE.md spécifie "Le taux_completion se recalcule après chaque TaskCompletion". Aucun champ `taux_completion` visible sur Service, et aucun Doctrine Event Listener/Subscriber pour le recalculer.
- **Conséquence** : Le dashboard ne peut pas afficher un vrai taux de complétion.
- **Fix** : Ajouter le champ + un `PostPersist`/`PostRemove` listener sur Completion.

**6.5 Types Mission ambigus — deux systèmes incompatibles**
- **Backend** (`Mission.php`) : `OUVERTURE | SERVICE | MENAGE | FERMETURE` (catégorie temporelle)
- **Frontend** (`types/index.ts`, `mock-data.ts`) : `FIXE | PONCTUELLE` (fréquence)
- **Problème** : Ces deux systèmes semblent répondre à des besoins différents (quand vs. combien de fois), mais sont représentés par le même champ `type`. Le schéma de données est incohérent.
- **Fix requis** : Décider si Mission a un seul champ `type` ou deux (`categorie` + `frequence`). Aligner backend et frontend.

---

### 🟡 MINEUR

**6.6 Voters Symfony — filtrage par centre_id correct** ✅
- **Fichier** : `shiftly-api/src/Security/Voter/AbstractCentreVoter.php`
- **Statut** : Implémentation correcte. Vérifie que l'utilisateur appartient au même centre que la ressource.

**6.7 JWT Configuration — correcte** ✅
- **Fichier** : `shiftly-api/config/packages/security.yaml`
- **Statut** : `/api/auth/login` est en `PUBLIC_ACCESS`. Tous les autres endpoints `/api` requièrent `IS_AUTHENTICATED_FULLY`. Configuration conforme.

**6.8 Entité Completion — UniqueConstraint correct** ✅
- **Fichier** : `shiftly-api/src/Entity/Completion.php` (ligne ~24)
- **Statut** : Contrainte UNIQUE sur `(poste_id, mission_id)` correctement définie.

---

## RÉCAPITULATIF

### Comptage par sévérité

| Sévérité | Nombre |
|---|---|
| 🔴 BLOQUANT | 6 |
| 🟠 IMPORTANT | 25+ |
| 🟡 MINEUR | 5 |

### Problèmes BLOQUANTS — liste courte

1. **Login sans handler** → Impossible de se connecter
2. **`dump() + die()` dans DashboardController** → Endpoint mort
3. **`const USE_MOCK = true` dans service/page.tsx** → Missions et incidents jamais sauvegardés
4. **`mock-data.ts` utilisé en production** → Service du jour entièrement fictif
5. **Page Éditeur sans persistance API** → Toutes les modifications se perdent au rechargement
6. **Dossier `hooks/` vide + pas de store Zustand** → Aucune couche data réelle

### Taux de complétude estimé

| Dimension | Statut |
|---|---|
| Endpoints Symfony définis | ~12 endpoints disponibles |
| Endpoints effectivement appelés | ~0 (tout est mocké ou derrière USE_MOCK=true) |
| Pages avec vraies données API | 0/8 |
| Formulaires avec persistance réelle | 0/10+ |
| Hooks React Query implémentés | 0/8 attendus |

---

*Audit réalisé par Claude Code — 2026-03-24*
