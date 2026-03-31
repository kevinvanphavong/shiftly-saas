<?php

namespace App\Service;

use App\Entity\Service;

/**
 * Calcule le statut affiché d'un service de manière dynamique.
 *
 * Le champ `statut` en BDD n'est jamais mis à jour automatiquement
 * (il reste à PLANIFIE après création). Ce service centralise la logique
 * de résolution pour que tous les controllers utilisent la même règle.
 *
 * Règles :
 *  - Si le statut BDD est TERMINE → TERMINE (statut posé manuellement)
 *  - Si la date du service < aujourd'hui → TERMINE
 *  - Si la date du service = aujourd'hui → EN_COURS
 *  - Sinon → PLANIFIE
 */
class ServiceStatutResolver
{
    public function resolve(Service $service): string
    {
        if ($service->getStatut() === 'TERMINE') {
            return 'TERMINE';
        }

        $serviceDate = $service->getDate();
        if ($serviceDate === null) {
            return $service->getStatut();
        }

        $today = new \DateTimeImmutable('today');

        if ($serviceDate < $today) {
            return 'TERMINE';
        }

        if ($serviceDate->format('Y-m-d') === $today->format('Y-m-d')) {
            return 'EN_COURS';
        }

        return 'PLANIFIE';
    }
}
