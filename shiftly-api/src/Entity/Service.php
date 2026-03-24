<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(
    normalizationContext:   ['groups' => ['service:read']],
    denormalizationContext: ['groups' => ['service:write']],
    operations: [
        new GetCollection(
            security:    "is_granted('ROLE_USER')",
            description: 'Liste des services. Filtrer par ?centre=/api/centres/{id}'
        ),
        new Get(
            security:             "is_granted('ROLE_USER')",
            normalizationContext: ['groups' => ['service:read', 'service:item:read']]
        ),
        new Post(
            security:                  "is_granted('ROLE_MANAGER')",
            securityPostDenormalize:   "is_granted('CREATE', object)"
        ),
        new Put(
            security: "is_granted('ROLE_MANAGER') and is_granted('EDIT', object)"
        ),
        new Delete(
            security: "is_granted('ROLE_MANAGER') and is_granted('DELETE', object)"
        ),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['statut' => 'exact', 'centre' => 'exact'])]
#[ApiFilter(DateFilter::class,   properties: ['date'])]
#[ApiFilter(OrderFilter::class,  properties: ['date', 'statut'])]
class Service
{
    const STATUT_PLANIFIE = 'PLANIFIE';
    const STATUT_EN_COURS = 'EN_COURS';
    const STATUT_TERMINE  = 'TERMINE';

    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    #[Groups(['service:read', 'poste:read', 'incident:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Centre::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['service:read', 'service:write'])]
    private ?Centre $centre = null;

    #[ORM\Column(type: 'date')]
    #[Assert\NotNull]
    #[Groups(['service:read', 'service:write'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: 'time', nullable: true)]
    #[Groups(['service:read', 'service:write'])]
    private ?\DateTimeInterface $heureDebut = null;

    #[ORM\Column(type: 'time', nullable: true)]
    #[Groups(['service:read', 'service:write'])]
    private ?\DateTimeInterface $heureFin = null;

    #[ORM\Column(length: 20)]
    #[Groups(['service:read', 'service:write'])]
    private string $statut = self::STATUT_PLANIFIE;

    /** Postes du jour — exposés uniquement dans l'item */
    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Poste::class, cascade: ['remove'])]
    #[Groups(['service:item:read'])]
    private Collection $postes;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Incident::class)]
    private Collection $incidents;

    public function __construct()
    {
        $this->postes    = new ArrayCollection();
        $this->incidents = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getCentre(): ?Centre { return $this->centre; }
    public function setCentre(?Centre $c): static { $this->centre = $c; return $this; }
    public function getDate(): ?\DateTimeInterface { return $this->date; }
    public function setDate(?\DateTimeInterface $d): static { $this->date = $d; return $this; }
    public function getHeureDebut(): ?\DateTimeInterface { return $this->heureDebut; }
    public function setHeureDebut(?\DateTimeInterface $v): static { $this->heureDebut = $v; return $this; }
    public function getHeureFin(): ?\DateTimeInterface { return $this->heureFin; }
    public function setHeureFin(?\DateTimeInterface $v): static { $this->heureFin = $v; return $this; }
    public function getStatut(): string { return $this->statut; }
    public function setStatut(string $statut): static { $this->statut = $statut; return $this; }
    public function getPostes(): Collection { return $this->postes; }
    public function getIncidents(): Collection { return $this->incidents; }
}
