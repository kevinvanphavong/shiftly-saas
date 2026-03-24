<?php

namespace App\Repository;

use App\Entity\Competence;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CompetenceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Competence::class);
    }

    public function findByZone(int $zoneId): array
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.zone = :zoneId')
            ->setParameter('zoneId', $zoneId)
            ->orderBy('c.points', 'DESC')
            ->getQuery()->getResult();
    }
}
