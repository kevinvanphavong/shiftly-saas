<?php

namespace App\Repository;

use App\Entity\Incident;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class IncidentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Incident::class);
    }

    public function findOpenByCentre(int $centreId): array
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.centre = :centreId')
            ->andWhere('i.statut != :resolu')
            ->setParameter('centreId', $centreId)
            ->setParameter('resolu', 'RESOLU')
            ->orderBy('i.createdAt', 'DESC')
            ->getQuery()->getResult();
    }

    public function countBySeverite(int $centreId): array
    {
        return $this->createQueryBuilder('i')
            ->select('i.severite, COUNT(i.id) as total')
            ->andWhere('i.centre = :centreId')
            ->andWhere('i.statut != :resolu')
            ->setParameter('centreId', $centreId)
            ->setParameter('resolu', 'RESOLU')
            ->groupBy('i.severite')
            ->getQuery()->getResult();
    }
}
