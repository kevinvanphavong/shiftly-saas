<?php

namespace App\Repository;

use App\Entity\Centre;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class CentreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Centre::class);
    }

    public function findBySlug(string $slug): ?Centre
    {
        return $this->findOneBy(['slug' => $slug]);
    }
}
