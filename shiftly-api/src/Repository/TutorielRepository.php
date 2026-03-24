<?php

namespace App\Repository;

use App\Entity\Tutoriel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TutorielRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tutoriel::class);
    }

    public function findByCentre(int $centreId, ?string $zone = null, ?string $niveau = null): array
    {
        $qb = $this->createQueryBuilder('t')
            ->andWhere('t.centre = :centreId')
            ->setParameter('centreId', $centreId)
            ->orderBy('t.createdAt', 'DESC');

        if ($zone !== null) {
            $qb->andWhere('t.zone = :zone')->setParameter('zone', $zone);
        }
        if ($niveau !== null) {
            $qb->andWhere('t.niveau = :niveau')->setParameter('niveau', $niveau);
        }
        return $qb->getQuery()->getResult();
    }
}
