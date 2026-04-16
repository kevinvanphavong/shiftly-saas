<?php

namespace App\Controller;

use App\Repository\CentreRepository;
use App\Service\PlanningService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_MANAGER')]
#[Route('/api/planning', name: 'planning_')]
class PlanningController extends AbstractController
{
    public function __construct(
        private readonly PlanningService  $planningService,
        private readonly CentreRepository $centreRepository,
    ) {}

    /**
     * GET /api/planning/week?centreId={id}&weekStart=YYYY-MM-DD
     * Retourne les données complètes d'une semaine de planning.
     */
    #[Route('/week', name: 'week', methods: ['GET'])]
    public function week(Request $request): JsonResponse
    {
        $centreId  = (int) $request->query->get('centreId', 0);
        $weekParam = $request->query->get('weekStart', '');

        if (!$centreId) {
            return $this->json(['error' => 'centreId requis'], 400);
        }

        // Garde multi-tenant
        /** @var \App\Entity\User $currentUser */
        $currentUser = $this->getUser();
        if ($currentUser->getCentre()?->getId() !== $centreId) {
            throw $this->createAccessDeniedException('Accès refusé à ce centre.');
        }

        $centre = $this->centreRepository->find($centreId);
        if (!$centre) {
            return $this->json(['error' => 'Centre introuvable'], 404);
        }

        // Normalise weekStart au lundi de la semaine fournie
        $weekStart = $this->resolveMonday($weekParam);

        $data = $this->planningService->getWeekData($centre, $weekStart);

        return $this->json($data);
    }

    /**
     * GET /api/planning/alerts?centreId={id}&weekStart=YYYY-MM-DD
     * Retourne uniquement les alertes de la semaine.
     */
    #[Route('/alerts', name: 'alerts', methods: ['GET'])]
    public function alerts(Request $request): JsonResponse
    {
        $centreId  = (int) $request->query->get('centreId', 0);
        $weekParam = $request->query->get('weekStart', '');

        if (!$centreId) {
            return $this->json(['error' => 'centreId requis'], 400);
        }

        /** @var \App\Entity\User $currentUser */
        $currentUser = $this->getUser();
        if ($currentUser->getCentre()?->getId() !== $centreId) {
            throw $this->createAccessDeniedException('Accès refusé à ce centre.');
        }

        $centre = $this->centreRepository->find($centreId);
        if (!$centre) {
            return $this->json(['error' => 'Centre introuvable'], 404);
        }

        $weekStart = $this->resolveMonday($weekParam);
        $alertes   = $this->planningService->getAlerts($centre, $weekStart);

        return $this->json($alertes);
    }

    /**
     * Retourne le lundi de la semaine contenant la date donnée.
     * Si la date est invalide, retourne le lundi courant.
     */
    private function resolveMonday(string $dateStr): \DateTimeImmutable
    {
        try {
            $date = new \DateTimeImmutable($dateStr);
        } catch (\Exception) {
            $date = new \DateTimeImmutable();
        }

        // Calcule le lundi : ISO day of week, lundi = 1
        $dayOfWeek = (int) $date->format('N');
        if ($dayOfWeek !== 1) {
            $date = $date->modify('-' . ($dayOfWeek - 1) . ' days');
        }

        // Remet à minuit pour la comparaison
        return \DateTimeImmutable::createFromFormat('Y-m-d', $date->format('Y-m-d'));
    }
}
