<?php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Service::class);
    }

    public function findToday(int $centreId): ?Service
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.centre = :centreId')
            ->andWhere('s.date = :today')
            ->setParameter('centreId', $centreId)
            ->setParameter('today', new \DateTimeImmutable('today'))
            ->getQuery()->getOneOrNullResult();
    }

    public function findRecent(int $centreId, int $limit = 10): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.centre = :centreId')
            ->setParameter('centreId', $centreId)
            ->orderBy('s.date', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()->getResult();
    }

    public function findBetween(int $centreId, \DateTimeInterface $from, \DateTimeInterface $to): array
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.centre = :centreId')
            ->andWhere('s.date BETWEEN :from AND :to')
            ->setParameter('centreId', $centreId)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->orderBy('s.date', 'ASC')
            ->getQuery()->getResult();
    }
}
