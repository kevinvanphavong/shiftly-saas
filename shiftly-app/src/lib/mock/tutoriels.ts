import type { Tutoriel } from '@/types/tutoriel'

export const mockTutoriels: Tutoriel[] = [
  // ─── 1 · Featured — Accueil Débutant ───────────────────────────────────────
  {
    id: 1,
    titre:      'Prise en main du système de réservation',
    zone:       'Accueil',
    niveau:     'debutant',
    dureMin:    15,
    misEnAvant: true,
    readId:     101,
    contenu: [
      { type: 'intro', text: "Le système de réservation est le cœur de l'accueil. Maîtriser cet outil te permet de traiter chaque client rapidement, sans erreur, même en période de rush." },
      { type: 'step',  number: 1, title: 'Ouvrir la session',         text: "Connecte-toi avec ton badge NFC ou ton code personnel. L'écran principal affiche le plan des pistes en temps réel." },
      { type: 'step',  number: 2, title: 'Créer une réservation',     text: "Clique sur une piste disponible (verte) → sélectionne la durée (1h / 1h30 / 2h) → saisis le nombre de joueurs → valide." },
      { type: 'step',  number: 3, title: 'Attribuer les chaussures',  text: "Après paiement, le système génère automatiquement les tailles nécessaires. Prends-les dans le casier correspondant au numéro de piste." },
      { type: 'tip',   text: "Si la piste souhaitée est rouge (maintenance), propose toujours une alternative et note l'incident dans le logiciel." },
      { type: 'step',  number: 4, title: 'Fin de session',            text: "À la sonnerie de fin, accueille les joueurs au retour, récupère les chaussures et marque la piste comme nettoyable." },
    ],
  },

  // ─── 2 · Bar Intermédiaire ──────────────────────────────────────────────────
  {
    id: 2,
    titre:      'Préparer les cocktails signature maison',
    zone:       'Bar',
    niveau:     'intermediaire',
    dureMin:    20,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Nos cocktails signature sont un atout commercial fort. Leur préparation doit être rigoureuse pour garantir un goût identique à chaque service." },
      { type: 'step',  number: 1, title: 'Strike Sour',          text: "4 cl de whisky bourbon, 2 cl de jus de citron frais, 1 cl de sirop de sucre, 1 blanc d'œuf. Shaker sans glace 10s, puis avec glace 15s. Servir dans un verre à cocktail." },
      { type: 'step',  number: 2, title: 'Pin Fizz (sans alcool)', text: "5 cl de jus d'ananas, 3 cl de jus de citron vert, sirop de menthe, eau gazeuse. Mélanger doucement, servir sur glace avec une paille." },
      { type: 'tip',   text: "Prépare toujours tes garnitures (citrons tranchés, cerises) en début de service pour ne pas perdre de temps lors des commandes." },
      { type: 'step',  number: 3, title: 'Bowling Blue',          text: "4 cl de vodka, 2 cl de curaçao bleu, 3 cl de jus de citron, ginger ale. Shaker avec glace, filtrer, compléter au ginger ale. Garnir d'un zeste d'orange." },
    ],
  },

  // ─── 3 · Salle Avancé ───────────────────────────────────────────────────────
  {
    id: 3,
    titre:      'Entretien des pistes de bowling',
    zone:       'Salle',
    niveau:     'avance',
    dureMin:    30,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Une piste bien entretenue garantit une expérience de jeu optimale et réduit l'usure du matériel. Ce protocole est à effectuer chaque ouverture et fermeture." },
      { type: 'step',  number: 1, title: 'Nettoyage à sec',          text: "Utilise le balai spécial (fibres anti-statiques) pour retirer la poussière de surface. Toujours balayer de la ligne de faute vers les quilles." },
      { type: 'step',  number: 2, title: 'Application de l\'huile',  text: "Programme le chariot huileur : pattern 40 pieds standard. Lance le cycle complet. Ne jamais rouler sur la piste avec des chaussures normales." },
      { type: 'tip',   text: "Vérifier la viscosité de l'huile avant chaque application — si elle est trouble, remplacer immédiatement la cartouche." },
      { type: 'step',  number: 3, title: 'Contrôle des quilles',     text: "Inspecte visuellement chaque quille : fissures, écailles, poids. Toute quille endommagée est immédiatement mise en quarantaine et notée dans le registre." },
      { type: 'step',  number: 4, title: 'Test de la machine',       text: "Lance 3 cycles à vide pour vérifier le positionnement et le relevage. Contrôle le capteur de détection de quilles tombées." },
    ],
  },

  // ─── 4 · Accueil Débutant ───────────────────────────────────────────────────
  {
    id: 4,
    titre:      'Gestion des chaussures et des casiers',
    zone:       'Accueil',
    niveau:     'debutant',
    dureMin:    10,
    misEnAvant: false,
    readId:     102,
    contenu: [
      { type: 'intro', text: "La gestion des chaussures est ta première interaction physique avec le client. Rapidité et précision sont essentielles." },
      { type: 'step',  number: 1, title: 'Distribution', text: "Demande la pointure, récupère dans le casier correspondant (rangement par paire, taille visible sur la semelle). Donne toujours chaussures + chaussettes si stock disponible." },
      { type: 'tip',   text: "En cas de doute sur la pointure, propose toujours la taille au-dessus — plus facile d'adapter qu'une chaussure trop petite." },
      { type: 'step',  number: 2, title: 'Retour',       text: "À la fin de session, récupère les chaussures, vérifie l'état (lacets, semelle), vaporise le désinfectant dans chaque chaussure et replace dans le casier." },
    ],
  },

  // ─── 5 · Bar Débutant ───────────────────────────────────────────────────────
  {
    id: 5,
    titre:      'Préparer et servir les boissons chaudes',
    zone:       'Bar',
    niveau:     'debutant',
    dureMin:    12,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Café, cappuccino, chocolat chaud — les boissons chaudes représentent 30% du chiffre du bar. Qualité constante obligatoire." },
      { type: 'step',  number: 1, title: 'Démarrage machine', text: "Allume la machine 30 min avant l'ouverture. Lance le cycle de chauffe puis le flush d'eau de 20 secondes." },
      { type: 'step',  number: 2, title: 'Espresso',          text: "7g de café moulu (réglage 3 sur le broyeur), extraction 25-30 secondes, tasse préchauffée. Servir immédiatement." },
      { type: 'tip',   text: "Purge toujours la buse vapeur avant et après la mousse de lait pour éviter les résidus brûlés." },
      { type: 'step',  number: 3, title: 'Cappuccino',        text: "Espresso + 100ml lait entier froid bien moussé. Le lait doit atteindre 65°C max. Versement en spirale, finir avec la mousse." },
    ],
  },

  // ─── 6 · Salle Intermédiaire ────────────────────────────────────────────────
  {
    id: 6,
    titre:      'Détecter et signaler les pannes machine',
    zone:       'Salle',
    niveau:     'intermediaire',
    dureMin:    18,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Reconnaître une panne rapidement évite les longues interruptions de jeu et améliore la satisfaction client. Voici les pannes les plus fréquentes." },
      { type: 'step',  number: 1, title: 'Quille non relevée',     text: "Vérifier le bras de relevage (code E01 sur l'écran). Arrêter la piste via le boîtier rouge, signaler via l'application. NE PAS tenter de réparer soi-même." },
      { type: 'step',  number: 2, title: 'Boule coincée',          text: "Si le retour de boule est bloqué (code E03), couper l'alimentation du convoyeur, contacter la maintenance via l'interphone de salle." },
      { type: 'tip',   text: "Toujours informer le client avec un délai estimé. Un bon d'échange boisson peut être proposé en cas d'attente supérieure à 10 minutes." },
      { type: 'step',  number: 3, title: 'Écran de score éteint', text: "Vérifier le câble HDMI à l'arrière du pupitre. Si OK, redémarrer le boîtier avec le bouton reset (trombone dans l'orifice)." },
    ],
  },

  // ─── 7 · Accueil Intermédiaire ──────────────────────────────────────────────
  {
    id: 7,
    titre:      'Gérer les réclamations clients avec élégance',
    zone:       'Accueil',
    niveau:     'intermediaire',
    dureMin:    25,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Un client mécontent bien géré peut devenir un ambassadeur. La méthode REACH te donne un cadre pour chaque situation difficile." },
      { type: 'step',  number: 1, title: 'Reconnaître',  text: "Écoute sans interrompre. Valide l'émotion : « Je comprends que cette situation est frustrante. » Jamais défensif." },
      { type: 'step',  number: 2, title: 'Empathiser',   text: "Reformule le problème pour montrer que tu as compris. « Donc si je résume, la piste 7 s'est arrêtée au milieu de votre partie ? »" },
      { type: 'tip',   text: "Ne jamais promettre ce que tu ne peux pas tenir. Il vaut mieux sous-promettre et sur-délivrer que l'inverse." },
      { type: 'step',  number: 3, title: 'Agir',         text: "Propose une solution concrète : remboursement partiel, reprogrammation, bon cadeau. Valide avec le manager si >20€ de geste commercial." },
      { type: 'step',  number: 4, title: 'Conclure',     text: "Remercie le client pour son retour. Note l'incident dans le registre avec heure, nature du problème et solution apportée." },
    ],
  },

  // ─── 8 · Salle Avancé ───────────────────────────────────────────────────────
  {
    id: 8,
    titre:      'Calibrage avancé des détecteurs de quilles',
    zone:       'Salle',
    niveau:     'avance',
    dureMin:    45,
    misEnAvant: false,
    readId:     null,
    contenu: [
      { type: 'intro', text: "Le calibrage précis des détecteurs garantit un scoring exact et évite les litiges. Ce protocole est réservé aux techniciens certifiés Niveau 2." },
      { type: 'step',  number: 1, title: 'Accès au mode calibrage',  text: "Séquence de démarrage : maintenir bouton SERVICE 5s → entrer code 4782 → sélectionner Calibrage détecteurs dans le menu." },
      { type: 'step',  number: 2, title: 'Étalonnage de base',       text: "Placer les 10 quilles en position standard. Lancer le scan automatique (2min). Vérifier que chaque capteur retourne une valeur entre 850 et 950 mV." },
      { type: 'tip',   text: "Si un capteur lit hors plage, vérifier d'abord l'alignement physique de la quille avant de toucher au réglage électronique." },
      { type: 'step',  number: 3, title: 'Ajustement fin',           text: "Utiliser les potentiomètres P1-P10 (vis cruciforme) pour ajuster les valeurs hors plage. Quart de tour = ±15 mV environ. Valider avec un nouveau scan." },
      { type: 'step',  number: 4, title: 'Test fonctionnel',         text: "Lancer 5 séquences de test strike + spare. Vérifier le score affiché vs relevé manuel. Documenter résultats dans le registre technique." },
    ],
  },
]

/** IDs des tutos lus initialement */
export const INITIAL_READ_IDS = new Set(
  mockTutoriels.filter(t => t.readId !== null).map(t => t.id)
)
