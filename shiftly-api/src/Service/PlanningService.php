<?php

namespace App\Service;

use App\Entity\Centre;
use App\Entity\Poste;
use App\Entity\PlanningWeek;
use App\Repository\PlanningWeekRepository;
use App\Repository\ServiceRepository;
use App\Repository\ZoneRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Logique métier du module Planning hebdomadaire.
 */
class PlanningService
{
    public function __construct(
        private readonly ServiceRepository     $serviceRepository,
        private readonly PlanningWeekRepository $planningWeekRepository,
        private readonly ZoneRepository         $zoneRepository,
        private readonly EntityManagerInterface $em,
    ) {}

    /**
     * Calcule la durée d'un shift en heures décimales.
     * Gère les shifts de nuit (heureFin < heureDebut).
     */
    public function calculateShiftDuration(Poste $poste): float
    {
        $debut = $poste->getHeureDebut();
        $fin   = $poste->getHeureFin();

        if (!$debut || !$fin) {
            return 0.0;
        }

        $minutes = ($fin->getTimestamp() - $debut->getTimestamp()) / 60;

        // Shift de nuit : ajouter 24h
        if ($minutes < 0) {
            $minutes += 1440;
        }

        $minutes -= $poste->getPauseMinutes();

        return round(max(0.0, $minutes) / 60, 2);
    }

    /**
     * Construit les données complètes d'une semaine de planning.
     *
     * @param Centre             $centre    Centre courant
     * @param \DateTimeImmutable $weekStart Lundi de la semaine
     * @return array Structure correspondant à PlanningWeekData TypeScript
     */
    public function getWeekData(Centre $centre, \DateTimeImmutable $weekStart): array
    {
        $centreId = $centre->getId();
        $weekEnd  = $weekStart->modify('+6 days');

        // ── Récupère les services de la semaine via le repository existant ──
        $services = $this->serviceRepository->findBetween($centreId, $weekStart, $weekEnd);

        // ── Charge les postes de chaque service avec leftJoin user + zone (évite N+1) ──
        $postesParDate = [];
        foreach ($services as $service) {
            $postes = $this->em->createQueryBuilder()
                ->select('p', 'u', 'z')
                ->from(Poste::class, 'p')
                ->leftJoin('p.user', 'u')
                ->leftJoin('p.zone', 'z')
                ->andWhere('p.service = :service')
                ->setParameter('service', $service)
                ->getQuery()
                ->getResult();

            $dateKey = $service->getDate()->format('Y-m-d');
            $postesParDate[$dateKey] = $postes;
        }

        // ── Zones du centre ──
        $zones = $this->zoneRepository->findBy(['centre' => $centre], ['ordre' => 'ASC']);
        $zonesData = array_map(fn($z) => [
            'id'      => $z->getId(),
            'nom'     => $z->getNom(),
            'couleur' => $z->getCouleur() ?? '#6b7280',
        ], $zones);

        // ── Regroupe les shifts par employé ──
        $employeesMap = [];
        foreach ($postesParDate as $dateStr => $postes) {
            foreach ($postes as $poste) {
                $user   = $poste->getUser();
                $zone   = $poste->getZone();
                $userId = $user->getId();

                if (!isset($employeesMap[$userId])) {
                    $employeesMap[$userId] = [
                        'id'          => $userId,
                        'nom'         => $user->getNom(),
                        'prenom'      => $user->getPrenom(),
                        'role'        => $user->getRole(),
                        'avatarColor' => $user->getAvatarColor(),
                        'heuresHebdo' => $user->getHeuresHebdo(),
                        'typeContrat' => $user->getTypeContrat(),
                        'shifts'      => [],
                        'totalHeures' => 0.0,
                    ];
                }

                $duree = $this->calculateShiftDuration($poste);

                $employeesMap[$userId]['shifts'][] = [
                    'posteId'      => $poste->getId(),
                    'serviceId'    => $poste->getService()->getId(),
                    'date'         => $dateStr,
                    'zoneId'       => $zone->getId(),
                    'zoneNom'      => $zone->getNom(),
                    'zoneCouleur'  => $zone->getCouleur() ?? '#6b7280',
                    'heureDebut'   => $poste->getHeureDebut()?->format('H:i'),
                    'heureFin'     => $poste->getHeureFin()?->format('H:i'),
                    'pauseMinutes' => $poste->getPauseMinutes(),
                ];

                $employeesMap[$userId]['totalHeures'] += $duree;
            }
        }

        // ── Calcule l'écart contrat et arrondit les heures ──
        $employees = [];
        foreach ($employeesMap as $emp) {
            $emp['totalHeures']  = round($emp['totalHeures'], 2);
            $emp['ecartContrat'] = $emp['heuresHebdo'] !== null
                ? round($emp['totalHeures'] - $emp['heuresHebdo'], 2)
                : 0.0;
            $employees[] = $emp;
        }

        // Trier par nom
        usort($employees, fn($a, $b) => strcmp($a['nom'], $b['nom']));

        // ── Statut de la semaine ──
        $planningWeek = $this->planningWeekRepository->findByCentreAndWeek($centreId, $weekStart);
        $statut       = $planningWeek?->getStatut() ?? PlanningWeek::STATUT_BROUILLON;
        $note         = $planningWeek?->getNote();

        // ── Alertes ──
        $alertes = $this->buildAlerts($employees, $services, $zonesData);

        // ── Stats ──
        $employesPlanifies = count($employees);
        $totalHeures       = array_sum(array_column($employees, 'totalHeures'));
        $sousPlanifies     = count(array_filter($employees, fn($e) =>
            $e['heuresHebdo'] !== null && $e['ecartContrat'] < -4
        ));
        $creneauxVides = count(array_filter($alertes, fn($a) => $a['type'] === 'ZONE_NON_COUVERTE'));

        return [
            'weekStart'  => $weekStart->format('Y-m-d'),
            'weekEnd'    => $weekEnd->format('Y-m-d'),
            'statut'     => $statut,
            'note'       => $note,
            'zones'      => $zonesData,
            'employees'  => array_values($employees),
            'alertes'    => $alertes,
            'stats'      => [
                'employesPlanifies' => $employesPlanifies,
                'totalHeures'       => round($totalHeures, 1),
                'creneauxVides'     => $creneauxVides,
                'sousPlanifies'     => $sousPlanifies,
            ],
        ];
    }

    /**
     * Retourne uniquement les alertes d'une semaine (délègue à getWeekData).
     * Utilisé par GET /api/planning/alerts.
     */
    public function getAlerts(Centre $centre, \DateTimeImmutable $weekStart): array
    {
        return $this->getWeekData($centre, $weekStart)['alertes'];
    }

    /**
     * Génère les alertes pour la semaine (ZONE_NON_COUVERTE + SANS_PAUSE).
     */
    private function buildAlerts(array $employees, array $services, array $zones): array
    {
        $alertes = [];

        // Indexe les shifts par date + zoneId
        $couvertureParDate = [];
        foreach ($employees as $emp) {
            foreach ($emp['shifts'] as $shift) {
                $couvertureParDate[$shift['date']][$shift['zoneId']] = true;

                // Alerte SANS_PAUSE : shift > 6h sans pause
                if ($shift['heureDebut'] && $shift['heureFin']) {
                    $debut = \DateTimeImmutable::createFromFormat('H:i', $shift['heureDebut']);
                    $fin   = \DateTimeImmutable::createFromFormat('H:i', $shift['heureFin']);
                    if ($debut && $fin) {
                        $minutes = ($fin->getTimestamp() - $debut->getTimestamp()) / 60;
                        if ($minutes < 0) $minutes += 1440;
                        if ($minutes > 360 && $shift['pauseMinutes'] === 0) {
                            $alertes[] = [
                                'type'     => 'SANS_PAUSE',
                                'severite' => 'moyenne',
                                'message'  => sprintf(
                                    'Shift de %.0fh sans pause pour %s le %s',
                                    $minutes / 60,
                                    $emp['nom'],
                                    $shift['date']
                                ),
                                'date'   => $shift['date'],
                                'userId' => $emp['id'],
                            ];
                        }
                    }
                }
            }
        }

        // Alerte ZONE_NON_COUVERTE : zone sans poste sur un jour avec service
        foreach ($services as $service) {
            $dateStr = $service->getDate()->format('Y-m-d');
            foreach ($zones as $zone) {
                if (!isset($couvertureParDate[$dateStr][$zone['id']])) {
                    $alertes[] = [
                        'type'     => 'ZONE_NON_COUVERTE',
                        'severite' => 'haute',
                        'message'  => sprintf('%s non couverte le %s', $zone['nom'], $dateStr),
                        'date'     => $dateStr,
                        'zoneId'   => $zone['id'],
                    ];
                }
            }
        }

        // Trie par sévérité : haute en premier
        usort($alertes, fn($a, $b) => strcmp($b['severite'], $a['severite']));

        return $alertes;
    }
}
