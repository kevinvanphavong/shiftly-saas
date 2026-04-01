SET FOREIGN_KEY_CHECKS=0;
SET NAMES utf8mb4;

-- centre (1 rows)
TRUNCATE TABLE `centre`;
INSERT INTO `centre` (`id`, `nom`, `slug`, `created_at`, `opening_hours`, `adresse`, `telephone`, `site_web`) VALUES (12, 'Family Games Center', 'family-games-center', '2026-04-01 03:27:29', NULL, '25 rue Robert Nau, 41000 Blois', NULL, NULL);

-- zone (3 rows)
TRUNCATE TABLE `zone`;
INSERT INTO `zone` (`id`, `nom`, `couleur`, `ordre`, `centre_id`) VALUES (28, 'Accueil', '#3b82f6', 1, 12);
INSERT INTO `zone` (`id`, `nom`, `couleur`, `ordre`, `centre_id`) VALUES (29, 'Bar', '#a855f7', 2, 12);
INSERT INTO `zone` (`id`, `nom`, `couleur`, `ordre`, `centre_id`) VALUES (30, 'Salle', '#22c55e', 3, 12);

-- user (12 rows)
TRUNCATE TABLE `user`;
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (58, 'Kévin', 'kevin@bowlingcentral.fr', '$2y$12$5nLXuGxquC7a0Q5lgHGL1OjkV/AvLZcnpe5k9I2XvEDo/cNyD0A1q', '[]', 'MANAGER', '#f97316', 60, '2026-04-01 03:27:29', 12, NULL, '2 polo manches longues, 1 sweat', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (59, 'Mégane', 'megane@bowlingcentral.fr', '$2y$12$zgyZrrLvT1fDoVWBRAq6QeoHBMpKD9y7xpIzrHneIg8CeT0aQdLce', '[]', 'MANAGER', '#ec4899', 10, '2026-04-01 03:27:29', 12, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (60, 'Micka', 'micka@bowlingcentral.fr', '$2y$12$lOupXd6wTt6ejW8b/onf2OJUS192BQofw9lTCrT5NioHV1QEodQzm', '[]', 'MANAGER', '#8b5cf6', 10, '2026-04-01 03:27:29', 12, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (61, 'Erwan', 'erwan@bowlingcentral.fr', '$2y$12$RbtliAESFlVyUu3eLNXlTOJjNxmJoFwQLTE2ALShh8v0qWXoxO3WW', '[]', 'EMPLOYE', '#22c55e', 35, '2026-04-01 03:27:29', 12, NULL, '2 tshirts, 1 polo manches courtes', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (62, 'Patou', 'patou@bowlingcentral.fr', '$2y$12$wloIqbsIOzYYQBgRQAvV.OU/vF3DZ4C2fpHrI.AHHI.CW82Q.P/nK', '[]', 'EMPLOYE', '#f59e0b', 75, '2026-04-01 03:27:29', 12, NULL, '1 veste sans manche', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (63, 'Pôl', 'pol@bowlingcentral.fr', '$2y$12$R.6kqv2fJHHjA.lQ/ansaulBYa/koKMRrcwX/T/Fw52/l3s8Vx/4u', '[]', 'EMPLOYE', '#0ea5e9', 10, '2026-04-01 03:27:29', 12, NULL, '1 polo manches longues (new)', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (64, 'Cynthia', 'cynthia@bowlingcentral.fr', '$2y$12$yKSFpapwtX7Hb62PMKRwCeqjQ4qEVu4xxS.UoWs.kzQmt0zPI/0yi', '[]', 'EMPLOYE', '#14b8a6', 10, '2026-04-01 03:27:29', 12, NULL, '2 t-shirts, 2 polaires manches longues', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (65, 'Gabin', 'gabin@bowlingcentral.fr', '$2y$12$P5ty/T2Z7ai4e4xpUol0P.Dne4Ikwwx21ijHLEvOSrURgTAFq03xK', '[]', 'EMPLOYE', '#a855f7', 65, '2026-04-01 03:27:29', 12, NULL, '1 polo manches longues + 2 polos', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (66, 'Aya', 'aya@bowlingcentral.fr', '$2y$12$ZjJKdMXLN6OGB1MBEu5GDuZRjs.AlmehEfWUiljYNb./BaK3ly.iO', '[]', 'EMPLOYE', '#6366f1', 50, '2026-04-01 03:27:29', 12, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (67, 'Agent de sécurité', 'securite@bowlingcentral.fr', '$2y$12$DBBrQd9EUYVH/WNzC7IcJenQV19lJZgQceGf6Klv/YiLxr0pIEjrq', '[]', 'EMPLOYE', '#475569', 25, '2026-04-01 03:27:29', 12, NULL, 'Badge', NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (68, 'Hiba', 'hiba@bowlingcentral.fr', '$2y$12$FCJ9FyRQJ9K3SSRPDJBlSuMvt6k5Fv6fQnXP1Ugq0v.oM3wFGPpHC', '[]', 'EMPLOYE', '#ef4444', 10, '2026-04-01 03:27:29', 12, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` (`id`, `nom`, `email`, `password`, `roles`, `role`, `avatar_color`, `points`, `created_at`, `centre_id`, `prenom`, `taille_haut`, `taille_bas`, `pointure`, `actif`) VALUES (69, 'Daniela', 'daniela@bowlingcentral.fr', '$2y$12$hWX1N/VnD0aMXhjnmaHKHutjyWuRjEWDTMIjgLPsTfZSmtFbx7Raa', '[]', 'EMPLOYE', '#f472b6', 10, '2026-04-01 03:27:29', 12, NULL, NULL, NULL, NULL, 1);

-- competence (9 rows)
TRUNCATE TABLE `competence`;
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (68, 'Maîtrise du logiciel de réservation', 30, 'avancee', 28, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (69, 'Gestion des groupes et attribution des pistes', 15, 'simple', 28, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (70, 'Encaissement et gestion de caisse', 25, 'avancee', 28, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (71, 'Préparation des cocktails signature (sans alcool)', 25, 'avancee', 29, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (72, 'Gestion des stocks bar et commandes fournisseurs', 40, 'experimente', 29, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (73, 'Service rapide en flux tendu', 20, 'simple', 29, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (74, 'Entretien courant des pistes (huilage)', 10, 'simple', 30, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (75, 'Diagnostic et résolution des pannes scoring', 50, 'experimente', 30, NULL);
INSERT INTO `competence` (`id`, `nom`, `points`, `difficulte`, `zone_id`, `description`) VALUES (76, 'Maintenance préventive des machines de quillage', 35, 'avancee', 30, NULL);

-- mission (98 rows)
TRUNCATE TABLE `mission`;
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (294, 'Être en tenue à l\'heure', 'OUVERTURE', 'vitale', 1, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (295, 'Allumer ordinateurs, logiciels et TPE', 'OUVERTURE', 'vitale', 2, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (296, 'Vérifier le matériel d\'accueil (rouleaux CB + imprimantes)', 'OUVERTURE', 'important', 3, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (297, 'Allumer les lumières extérieures des box karaokés', 'OUVERTURE', 'important', 4, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (298, 'Vérifier derrière les PC et imprimantes (propreté / câbles)', 'OUVERTURE', 'ne_pas_oublier', 5, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (299, 'Nettoyer la poussière du comptoir d\'accueil', 'OUVERTURE', 'important', 6, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (300, 'Nettoyer la poussière des chevalets d\'annonce', 'OUVERTURE', 'ne_pas_oublier', 7, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (301, 'Vérifier les toilettes après chaque pause', 'PENDANT', 'vitale', 1, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (302, 'Si anniversaires demain : préparer matériel (feuille bar, médailles, invitations, jetons)', 'PENDANT', 'vitale', 2, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (303, 'Vérifier propreté des toilettes et quantité de papier (3 fois/jour)', 'PENDANT', 'vitale', 3, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (304, 'Enregistrer les clients (bowling / billards / karaoké / VR)', 'PENDANT', 'vitale', 4, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (305, 'Vérifier l\'état des sur-chaussures (qualité / usure)', 'PENDANT', 'important', 5, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (306, 'Vérifier quantité de médailles (environ 10 par couleur)', 'PENDANT', 'important', 6, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (307, 'Vérifier quantité de chaussettes (environ 2 par taille)', 'PENDANT', 'important', 7, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (308, 'Vérifier quantité de sur-chaussures', 'PENDANT', 'important', 8, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (309, 'Vérifier l\'état des casiers blancs', 'PENDANT', 'important', 9, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (310, 'Vérifier quantité de jetons pour la machine Rio Carnival', 'PENDANT', 'important', 10, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (311, 'Ranger les chaussures de bas en haut (5 à 6 fois/jour)', 'PENDANT', 'important', 11, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (312, 'Vérifier les embouts des cannes de billard et remplacer si besoin', 'PENDANT', 'ne_pas_oublier', 12, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (313, 'Nettoyer les vitres de l\'entrée et de l\'accueil', 'MENAGE', 'important', 1, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (314, 'Nettoyer les bornes d\'enregistrement (support pied)', 'MENAGE', 'ne_pas_oublier', 2, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (315, 'Nettoyer la machine à barbe à papa (mercredi et dimanche)', 'MENAGE', 'ne_pas_oublier', 3, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (316, 'Nettoyer l\'intérieur des casiers blancs', 'MENAGE', 'ne_pas_oublier', 4, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (317, 'Dépoussiérer l\'écran de surveillance à l\'entrée', 'MENAGE', 'ne_pas_oublier', 5, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (318, 'Dépoussiérer les écrans de la liste d\'attente', 'MENAGE', 'ne_pas_oublier', 6, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (319, 'Nettoyer les distributeurs de gel hydro-alcoolique', 'MENAGE', 'ne_pas_oublier', 7, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (320, 'Nettoyer les barrières à l\'entrée (zone lumières, panneaux publicitaires)', 'MENAGE', 'ne_pas_oublier', 8, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (321, 'Dépoussiérer les écrans de l\'accueil', 'MENAGE', 'ne_pas_oublier', 9, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (322, 'Nettoyer l\'intérieur des meubles à chaussures', 'MENAGE', 'ne_pas_oublier', 10, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (323, 'Nettoyer la poussière sur les statues Iron Man et Spider Man', 'MENAGE', 'ne_pas_oublier', 11, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (324, 'Nettoyer la poussière et les écrans des jeux de Réalité Virtuelle', 'MENAGE', 'ne_pas_oublier', 12, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (325, 'Nettoyer la poussière des meubles à chaussures', 'MENAGE', 'ne_pas_oublier', 13, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (326, 'Vider les poubelles de l\'accueil', 'FERMETURE', 'vitale', 1, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (327, 'Mettre à propre le comptoir, ranger le matériel et mettre les TPE en charge', 'FERMETURE', 'vitale', 2, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (328, 'Ranger les chaussures dans les casiers', 'FERMETURE', 'vitale', 3, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (329, 'Balayer le sol d\'entrée, jeter les mégots et vider les poubelles (entrée)', 'FERMETURE', 'vitale', 4, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (330, 'Passer l\'aspirateur autour de l\'accueil, de l\'entrée et de la zone chaussures', 'FERMETURE', 'vitale', 5, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (331, 'Nettoyer les toilettes (fin de service)', 'FERMETURE', 'vitale', 6, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (332, 'Dépointer puis se changer (fin de service)', 'FERMETURE', 'important', 7, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (333, 'Vérifier que les casiers blancs sont bien vides (fin de service)', 'FERMETURE', 'important', 8, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (334, 'Éteindre la climatisation et les télés des pistes et de l\'accueil', 'FERMETURE', 'important', 9, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (335, 'Éteindre les jeux de la zone d\'arcade', 'FERMETURE', 'important', 10, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (336, 'Éteindre les box de karaokés', 'FERMETURE', 'important', 11, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (337, 'Éteindre les jeux VR et passer l\'aspirateur si besoin', 'FERMETURE', 'important', 12, 28, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (338, 'Être en tenue à l\'heure et pointer son heure d\'arrivée', 'OUVERTURE', 'vitale', 1, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (339, 'Vérifier mise en place snacks (crêpes, gaufres, brioche, pistache, pizza, hot dog, croque, frites)', 'OUVERTURE', 'vitale', 2, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (340, 'Relever les températures des congélateurs (début de service)', 'OUVERTURE', 'vitale', 3, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (341, 'Vérifier et changer si besoin les fûts de bière', 'OUVERTURE', 'vitale', 4, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (342, 'Allumer la machine à café et vérifier le niveau de lait', 'OUVERTURE', 'vitale', 5, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (343, 'Contrôler le stock des réfrigérateurs et compléter si nécessaire (dont jus)', 'OUVERTURE', 'vitale', 6, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (344, 'Inspecter la cave du bar et réapprovisionner si besoin (rotation FIFO)', 'OUVERTURE', 'vitale', 7, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (345, 'Vérifier mise en place citron et feuille de menthe', 'OUVERTURE', 'important', 8, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (346, 'Vérifier et remplir si besoin (sucre poudre, sucre glace, chocolat, ketchup, moutarde)', 'OUVERTURE', 'important', 9, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (347, 'Allumer le four', 'OUVERTURE', 'important', 10, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (348, 'Mettre en service la machine à glace pilée', 'OUVERTURE', 'important', 11, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (349, 'Remplir les bacs à glaçons', 'OUVERTURE', 'important', 12, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (350, 'Mettre en marche le lave-verre', 'OUVERTURE', 'important', 13, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (351, 'Recharger la machine à cocktails (bouteilles de jus pleines)', 'OUVERTURE', 'important', 14, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (352, 'Activer l\'éclairage du bar', 'OUVERTURE', 'ne_pas_oublier', 15, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (353, 'Mercredi/jeudi : s\'assurer que les snacks sont approvisionnés (gaufres, crêpes, brioches, pizzas, croque, hot dogs, frites)', 'PENDANT', 'vitale', 1, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (354, 'Mercredi/jeudi : vérifier mise en place (saucissons, chocolat, ketchup, moutarde)', 'PENDANT', 'important', 2, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (355, 'Terminer les dernières tournées de verres à laver', 'FERMETURE', 'vitale', 1, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (356, 'Remplir le frigo pour le lendemain', 'FERMETURE', 'vitale', 2, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (357, 'Balayer et passer la serpillière dans le bar et la zone d\'accueil', 'FERMETURE', 'vitale', 3, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (358, 'Nettoyer pompe à bière et intérieur', 'FERMETURE', 'vitale', 4, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (359, 'Mettre le lait au réfrigérateur', 'FERMETURE', 'vitale', 5, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (360, 'Nettoyage et remplissage de la machine à cocktails', 'FERMETURE', 'vitale', 6, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (361, 'Nettoyer la cuisine (plan de travail, four, micro-ondes, ustensiles)', 'FERMETURE', 'vitale', 7, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (362, 'Fermer le bar avec autorisation responsable (1h avant la fin)', 'FERMETURE', 'vitale', 8, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (363, 'Balai + serpillière (cuisine)', 'FERMETURE', 'vitale', 9, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (364, 'Prévoir des sacs de glaçons pour le lendemain si nécessaire', 'FERMETURE', 'important', 10, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (365, 'Vider les bacs à glaçons (fin de service)', 'FERMETURE', 'important', 11, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (366, 'Nettoyer la machine pression pour boissons softs', 'FERMETURE', 'important', 12, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (367, 'Éteindre la lumière des frigos et le lave-verre (à la fin)', 'FERMETURE', 'important', 13, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (368, 'Retirer et nettoyer la grille de la machine à café', 'FERMETURE', 'important', 14, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (369, 'Éteindre le four (fin de service)', 'FERMETURE', 'important', 15, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (370, 'Lancer nettoyage machine à café avec capsules de nettoyage', 'FERMETURE', 'important', 16, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (371, 'Éteindre la machine à café', 'FERMETURE', 'important', 17, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (372, 'Réduire le chauffage (fin de service)', 'FERMETURE', 'important', 18, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (373, 'Nettoyer le bac à marc du levier puis le remettre', 'FERMETURE', 'important', 19, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (374, 'Vider et nettoyer le bac à capsules de la machine à café', 'FERMETURE', 'important', 20, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (375, 'Nettoyer le bas de la machine à café (eau chaude + brosse)', 'FERMETURE', 'ne_pas_oublier', 21, 29, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (376, 'Être en tenue à l\'heure et pointer son heure d\'arrivée', 'OUVERTURE', 'vitale', 1, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (377, 'Vérifier fonctionnement des tablettes jusqu\'au paiement', 'OUVERTURE', 'vitale', 2, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (378, 'Vérifier propreté de la salle et des tables', 'OUVERTURE', 'vitale', 3, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (379, 'Récupérer et vérifier son fond de caisse (25€)', 'OUVERTURE', 'vitale', 4, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (380, 'Récupérer son matériel de poste (TPE + montre + limonadier)', 'OUVERTURE', 'vitale', 5, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (381, 'Vérifier la propreté de l\'entrée client', 'OUVERTURE', 'important', 6, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (382, 'Aligner tables, banquettes, fauteuils et poufs', 'OUVERTURE', 'important', 7, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (383, 'Nettoyer les écrans des tablettes des pistes et billards', 'OUVERTURE', 'important', 8, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (384, 'Nettoyer les vitres des jeux d\'arcades', 'OUVERTURE', 'ne_pas_oublier', 9, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (385, 'Vérifier la propreté des toilettes avant chaque pause', 'PENDANT', 'vitale', 1, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (386, 'Proposer au moins une fois des boissons à chaque client', 'PENDANT', 'vitale', 2, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (387, 'Vérifier les bornes de gel et remplir si besoin', 'PENDANT', 'important', 3, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (388, 'Vérifier / nettoyer / dépoussiérer les zones (arcade, fléchettes, machines à lots, machines, billards, micro-ondes libre-service)', 'PENDANT', 'important', 4, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (389, 'Nettoyer les bornes de désinfection chaussures clients', 'PENDANT', 'ne_pas_oublier', 5, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (390, 'Mardi/vendredi (1h avant fin) : rassembler les poubelles (bar, accueil, arcades, pistes)', 'FERMETURE', 'vitale', 1, 30, 'FIXE', NULL);
INSERT INTO `mission` (`id`, `texte`, `categorie`, `priorite`, `ordre`, `zone_id`, `frequence`, `service_id`) VALUES (391, 'Mardi/vendredi : nettoyer toutes les tables en salle et pistes (produit nettoyant)', 'FERMETURE', 'vitale', 2, 30, 'FIXE', NULL);

-- service (5 rows)
TRUNCATE TABLE `service`;
INSERT INTO `service` (`id`, `date`, `heure_debut`, `heure_fin`, `statut`, `centre_id`, `taux_completion`, `note`) VALUES (37, '2026-03-29', '10:00:00', '23:00:00', 'TERMINE', 12, 94.0, 'Soirée chargée, piste 4 en panne en fin de service. Réparation prévue lundi.');
INSERT INTO `service` (`id`, `date`, `heure_debut`, `heure_fin`, `statut`, `centre_id`, `taux_completion`, `note`) VALUES (38, '2026-03-30', '10:00:00', '23:00:00', 'TERMINE', 12, 87.0, 'RAS. Bon service, équipe au complet.');
INSERT INTO `service` (`id`, `date`, `heure_debut`, `heure_fin`, `statut`, `centre_id`, `taux_completion`, `note`) VALUES (39, '2026-03-31', '10:00:00', '23:00:00', 'TERMINE', 12, 72.0, NULL);
INSERT INTO `service` (`id`, `date`, `heure_debut`, `heure_fin`, `statut`, `centre_id`, `taux_completion`, `note`) VALUES (40, '2026-04-01', '10:00:00', '23:00:00', 'EN_COURS', 12, 0.0, 'Vérifier stock bière avant 18h, livraison annulée hier.');
INSERT INTO `service` (`id`, `date`, `heure_debut`, `heure_fin`, `statut`, `centre_id`, `taux_completion`, `note`) VALUES (41, '2026-04-02', '10:00:00', '23:00:00', 'PLANIFIE', 12, 0.0, NULL);

-- poste (11 rows)
TRUNCATE TABLE `poste`;
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (83, 40, 28, 58);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (84, 40, 28, 62);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (85, 40, 30, 61);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (86, 40, 29, 65);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (87, 40, 29, 64);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (88, 40, 30, 66);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (89, 39, 28, 60);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (90, 39, 28, 63);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (91, 39, 29, 68);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (92, 39, 30, 69);
INSERT INTO `poste` (`id`, `service_id`, `zone_id`, `user_id`) VALUES (93, 39, 30, 61);

-- staff_competence (12 rows)
TRUNCATE TABLE `staff_competence`;
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (116, '2026-01-10 00:00:00', 62, 68);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (117, '2026-01-05 00:00:00', 62, 69);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (118, '2026-02-01 00:00:00', 62, 70);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (119, '2026-02-15 00:00:00', 66, 71);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (120, '2026-02-20 00:00:00', 66, 73);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (121, '2025-12-01 00:00:00', 65, 71);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (122, '2026-01-20 00:00:00', 65, 72);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (123, '2026-02-10 00:00:00', 65, 74);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (124, '2026-03-01 00:00:00', 61, 69);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (125, '2026-03-05 00:00:00', 61, 74);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (126, '2025-09-01 00:00:00', 58, 68);
INSERT INTO `staff_competence` (`id`, `acquired_at`, `user_id`, `competence_id`) VALUES (127, '2025-10-15 00:00:00', 58, 72);

-- completion (15 rows)
TRUNCATE TABLE `completion`;
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (158, '2026-04-01 03:27:29', 83, 294, 58);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (159, '2026-04-01 03:27:29', 83, 295, 58);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (160, '2026-04-01 03:27:29', 84, 296, 62);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (161, '2026-04-01 03:27:29', 84, 297, 62);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (162, '2026-04-01 03:27:29', 84, 299, 62);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (163, '2026-04-01 03:27:29', 84, 303, 62);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (164, '2026-04-01 03:27:29', 84, 304, 62);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (165, '2026-04-01 03:27:29', 86, 338, 65);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (166, '2026-04-01 03:27:29', 86, 340, 65);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (167, '2026-04-01 03:27:29', 86, 341, 65);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (168, '2026-04-01 03:27:29', 86, 342, 65);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (169, '2026-04-01 03:27:29', 87, 347, 64);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (170, '2026-04-01 03:27:29', 85, 376, 61);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (171, '2026-04-01 03:27:29', 88, 378, 66);
INSERT INTO `completion` (`id`, `completed_at`, `poste_id`, `mission_id`, `user_id`) VALUES (172, '2026-04-01 03:27:29', 88, 380, 66);

-- incident (4 rows)
TRUNCATE TABLE `incident`;
INSERT INTO `incident` (`id`, `titre`, `severite`, `statut`, `created_at`, `resolved_at`, `centre_id`, `service_id`, `user_id`, `zone_id`) VALUES (28, 'Panne piste n°4 — retour boules bloqué, mécanisme coincé', 'haute', 'EN_COURS', '2026-04-01 03:27:29', NULL, 12, 37, 58, 30);
INSERT INTO `incident` (`id`, `titre`, `severite`, `statut`, `created_at`, `resolved_at`, `centre_id`, `service_id`, `user_id`, `zone_id`) VALUES (29, 'Climatisation salle — bruit anormal depuis 18h, vibrations sur la grille nord', 'moyenne', 'OUVERT', '2026-04-01 03:27:29', NULL, 12, 39, 60, 30);
INSERT INTO `incident` (`id`, `titre`, `severite`, `statut`, `created_at`, `resolved_at`, `centre_id`, `service_id`, `user_id`, `zone_id`) VALUES (30, 'Machine à cocktails — fuite au niveau du joint inférieur, serviettes posées en attendant', 'haute', 'RESOLU', '2026-04-01 03:27:29', '2026-04-01 03:27:32', 12, 38, 59, 29);
INSERT INTO `incident` (`id`, `titre`, `severite`, `statut`, `created_at`, `resolved_at`, `centre_id`, `service_id`, `user_id`, `zone_id`) VALUES (31, 'Client ivre refusé à l\'entrée, intervention sécurité requise', 'moyenne', 'RESOLU', '2026-04-01 03:27:29', '2026-04-01 03:27:32', 12, 37, 58, 28);

-- tutoriel (4 rows)
TRUNCATE TABLE `tutoriel`;
INSERT INTO `tutoriel` (`id`, `titre`, `niveau`, `dure_min`, `contenu`, `created_at`, `centre_id`, `zone_id`) VALUES (35, 'Prise en main du logiciel de réservation', 'debutant', 15, '[{"type":"intro","text":"Ce tutoriel guide les nouveaux membres \\u00e0 travers les \\u00e9tapes essentielles du logiciel de r\\u00e9servation."},{"type":"step","number":1,"title":"Se connecter","text":"Ouvrez le navigateur, allez sur l\'interface admin. Utilisez vos identifiants fournis par le manager."},{"type":"step","number":2,"title":"Cr\\u00e9er une r\\u00e9servation","text":"Cliquez sur \'Nouvelle r\\u00e9servation\', s\\u00e9lectionnez date, heure et nombre de joueurs."},{"type":"step","number":3,"title":"Attribuer une piste","text":"Le syst\\u00e8me propose une piste disponible. Vous pouvez la modifier si n\\u00e9cessaire."},{"type":"tip","text":"En cas de conflit de r\\u00e9servation, privil\\u00e9giez toujours le client sur place."}]', '2026-04-01 03:27:29', 12, 28);
INSERT INTO `tutoriel` (`id`, `titre`, `niveau`, `dure_min`, `contenu`, `created_at`, `centre_id`, `zone_id`) VALUES (36, 'Préparer les cocktails signature maison', 'intermediaire', 20, '[{"type":"intro","text":"Les cocktails maison sont la signature de l\'\\u00e9tablissement. Voici les recettes et techniques de service."},{"type":"step","number":1,"title":"Ingr\\u00e9dients","text":"R\\u00e9cup\\u00e9rez les ingr\\u00e9dients dans le frigo sous le comptoir. V\\u00e9rifiez toujours les dates."},{"type":"step","number":2,"title":"Pr\\u00e9paration","text":"Utilisez le shaker pour les cocktails frapp\\u00e9s. 3 gla\\u00e7ons minimum, secouer 10 secondes."},{"type":"step","number":3,"title":"Service","text":"Verser dans le verre appropri\\u00e9, garnir avec la tranche de citron ou la cerise selon la recette."},{"type":"tip","text":"Proposez syst\\u00e9matiquement la version sans alcool \\u00e0 tout le groupe."}]', '2026-04-01 03:27:29', 12, 29);
INSERT INTO `tutoriel` (`id`, `titre`, `niveau`, `dure_min`, `contenu`, `created_at`, `centre_id`, `zone_id`) VALUES (37, 'Procédure de clôture de caisse', 'avance', 25, '[{"type":"intro","text":"La cl\\u00f4ture de caisse est une \\u00e9tape critique. Toute erreur doit \\u00eatre signal\\u00e9e au manager."},{"type":"step","number":1,"title":"Imprimer le Z","text":"Depuis le logiciel de caisse, imprimez le rapport Z de fin de journ\\u00e9e."},{"type":"step","number":2,"title":"Compter les esp\\u00e8ces","text":"Comptez les billets et pi\\u00e8ces par coupures. Notez le total sur la fiche de caisse."},{"type":"step","number":3,"title":"Rapprocher les totaux","text":"Comparez le total esp\\u00e8ces + CB avec le Z. \\u00c9cart > 5\\u20ac : appel manager obligatoire."},{"type":"tip","text":"Ne jamais laisser la caisse ouverte sans surveillance, m\\u00eame 30 secondes."}]', '2026-04-01 03:27:29', 12, 28);
INSERT INTO `tutoriel` (`id`, `titre`, `niveau`, `dure_min`, `contenu`, `created_at`, `centre_id`, `zone_id`) VALUES (38, 'Signaler et gérer un incident', 'debutant', 10, '[{"type":"intro","text":"Tout incident doit \\u00eatre signal\\u00e9 imm\\u00e9diatement dans l\'application Shiftly, m\\u00eame mineur."},{"type":"step","number":1,"title":"Ouvrir Shiftly","text":"Dans l\'app, allez sur \'Service du Jour\' \\u2192 bouton orange \'+ Signaler un incident\'."},{"type":"step","number":2,"title":"Remplir le formulaire","text":"D\\u00e9crivez clairement l\'incident, choisissez la s\\u00e9v\\u00e9rit\\u00e9 et la zone concern\\u00e9e."},{"type":"step","number":3,"title":"Pr\\u00e9venir le manager","text":"Pour les incidents \'haute\' s\\u00e9v\\u00e9rit\\u00e9, pr\\u00e9venez oralement le manager en plus du signalement app."},{"type":"tip","text":"Un incident signal\\u00e9 rapidement = r\\u00e9solution 3 fois plus rapide en moyenne."}]', '2026-04-01 03:27:29', 12, NULL);

-- tuto_read (7 rows)
TRUNCATE TABLE `tuto_read`;
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (66, '2026-04-01 03:27:29', 62, 35);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (67, '2026-04-01 03:27:29', 62, 37);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (68, '2026-04-01 03:27:29', 65, 36);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (69, '2026-04-01 03:27:29', 61, 38);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (70, '2026-04-01 03:27:29', 66, 36);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (71, '2026-04-01 03:27:29', 66, 38);
INSERT INTO `tuto_read` (`id`, `read_at`, `user_id`, `tutoriel_id`) VALUES (72, '2026-04-01 03:27:29', 58, 38);

SET FOREIGN_KEY_CHECKS=1;