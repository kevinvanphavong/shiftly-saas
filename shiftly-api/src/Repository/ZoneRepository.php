<?php

namespace App\Repository;

use App\Entity\Zone;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ZoneRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Zone::class);
    }

    public function findByCentre(int $centreId): array
    {
        return $this->createQueryBuilder('z')
            ->andWhere('z.centre = :centreId')
            ->setParameter('centreId', $centreId)
            ->orderBy('z.ordre', 'ASC')
            ->getQuery()->getResult();
    }
}
