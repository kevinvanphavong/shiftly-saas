<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\MissionRepository;
use App\Repository\ServiceRepository;
use App\Service\ServiceStatutResolver;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

/**
 * GET /api/services/list?centreId=X
 *
 * Retourne la liste enrichie des services d'un centre :
 *  - données de base (date, heures, statut, tauxCompletion, note)
 *  - staff assigné (avatars)
 *  - progression par zone
 *
 * Triée par date décroissante.
 */
#[IsGranted('ROLE_USER')]
class ServicesListController extends AbstractController
{
    public function __construct(
        private readonly ServiceRepository    $serviceRepo,
        private readonly MissionRepository    $missionRepo,
        private readonly ServiceStatutResolver $statutResolver,
    ) {}

    #[Route('/api/services/list', name: 'api_services_list', methods: ['GET'], format: 'json', priority: 10)]
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $currentUser */
        $currentUser = $this->getUser();

        $centreId = (int) $request->query->get('centreId');

        // Multi-tenant guard
        if ($currentUser->getCentre()?->getId() !== $centreId) {
            throw $this->createAccessDeniedException('Accès refusé à ce centre.');
        }

        $services = $this->serviceRepo->findByCentreDesc($centreId);

        $result = [];

        foreach ($services as $service) {
            // ── Postes groupés par zone ───────────────────────────────────────
            $postesByZone = []; // zoneId → [poste, ...]
            $zonesMeta    = []; // zoneId → zone entity
            $staffSeen    = []; // userId → true (dédup)
            $staffList    = [];

            foreach ($service->getPostes() as $poste) {
                $zone = $poste->getZone();
                $zid  = $zone->getId();

                $zonesMeta[$zid]    ??= $zone;
                $postesByZone[$zid] ??= [];
                $postesByZone[$zid][] = $poste;

                $user = $poste->getUser();
                if ($user && !isset($staffSeen[$user->getId()])) {
                    $staffSeen[$user->getId()] = true;
                    $staffList[] = [
                        'id'          => $user->getId(),
                        'nom'         => $user->getNom(),
                        'avatarColor' => $user->getAvatarColor() ?? '#6b7280',
                    ];
                }
            }

            // ── Progression par zone ──────────────────────────────────────────
            $zonesData = [];
            $globalTotal = 0;
            $globalDone  = 0;

            foreach ($postesByZone as $zid => $postes) {
                $zone = $zonesMeta[$zid];

                // Total missions de la zone pour ce service
                $missions = $this->missionRepo->findForService($zid, $service->getId());
                $total    = count($missions);

                // Déduplication des completions par missionId (évite double-comptage
                // quand plusieurs postes existent pour la même zone)
                $doneMissionIds = [];
                foreach ($postes as $poste) {
                    foreach ($poste->getCompletions() as $completion) {
                        $doneMissionIds[$completion->getMission()->getId()] = true;
                    }
                }
                $completed = count($doneMissionIds);

                $taux = $total > 0 ? round($completed / $total * 100, 1) : 0.0;

                $globalTotal += $total;
                $globalDone  += $completed;

                // Détail des postes (staff assigné à cette zone)
                $postesData = array_map(fn($p) => [
                    'posteId'     => $p->getId(),
                    'userId'      => $p->getUser()?->getId(),
                    'nom'         => $p->getUser()?->getNom() ?? '',
                    'avatarColor' => $p->getUser()?->getAvatarColor() ?? '#6b7280',
                ], $postes);

                $zonesData[] = [
                    'id'      => $zone->getId(),
                    'nom'     => $zone->getNom(),
                    'couleur' => $zone->getCouleur(),
                    'taux'    => $taux,
                    'postes'  => $postesData,
                ];
            }

            // Taux de completion global calculé dynamiquement
            $globalTaux = $globalTotal > 0 ? round($globalDone / $globalTotal * 100, 1) : 0.0;

            // Tri des zones par ordre
            usort($zonesData, fn($a, $b) =>
                ($zonesMeta[$a['id']]->getOrdre() ?? 0) <=> ($zonesMeta[$b['id']]->getOrdre() ?? 0)
            );

            $statut = $this->statutResolver->resolve($service);

            $result[] = [
                'id'             => $service->getId(),
                'date'           => $service->getDate()?->format('Y-m-d'),
                'heureDebut'     => $service->getHeureDebut()?->format('H:i'),
                'heureFin'       => $service->getHeureFin()?->format('H:i'),
                'statut'         => $statut,
                'tauxCompletion' => $globalTaux,
                'note'           => $service->getNote(),
                'staff'          => $staffList,
                'zones'          => $zonesData,
            ];
        }

        return $this->json($result);
    }
}
