<?php

namespace App\Repository;

use App\Entity\Mission;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MissionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mission::class);
    }

    public function findByZone(int $zoneId): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.zone = :zoneId')->setParameter('zoneId', $zoneId)
            ->orderBy('m.ordre', 'ASC')
            ->getQuery()->getResult();
    }

    public function findByZoneAndType(int $zoneId, string $type): array
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.zone = :zoneId')->setParameter('zoneId', $zoneId)
            ->andWhere('m.type = :type')->setParameter('type', $type)
            ->orderBy('m.ordre', 'ASC')
            ->getQuery()->getResult();
    }
}
