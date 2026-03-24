<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\MissionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource(
    normalizationContext:   ['groups' => ['mission:read']],
    denormalizationContext: ['groups' => ['mission:write']],
    operations: [
        new GetCollection(security: "is_granted('ROLE_USER')"),
        new Get(security:           "is_granted('ROLE_USER')"),
        new Post(security:          "is_granted('ROLE_MANAGER')"),
        new Put(security:           "is_granted('ROLE_MANAGER')"),
        new Delete(security:        "is_granted('ROLE_MANAGER')"),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'texte'    => 'partial',
    'type'     => 'exact',         // ?type=OUVERTURE
    'priorite' => 'exact',         // ?priorite=vitale
    'zone'     => 'exact',         // ?zone=/api/zones/1
])]
#[ApiFilter(OrderFilter::class, properties: ['ordre', 'type', 'priorite'])]
class Mission
{
    const TYPE_OUVERTURE  = 'OUVERTURE';
    const TYPE_SERVICE    = 'SERVICE';
    const TYPE_MENAGE     = 'MENAGE';
    const TYPE_FERMETURE  = 'FERMETURE';

    const PRIO_VITALE          = 'vitale';
    const PRIO_IMPORTANT       = 'important';
    const PRIO_NE_PAS_OUBLIER  = 'ne_pas_oublier';

    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    #[Groups(['mission:read', 'completion:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Zone::class, inversedBy: 'missions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['mission:read', 'mission:write', 'completion:read'])]
    private ?Zone $zone = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['mission:read', 'mission:write', 'completion:read'])]
    private ?string $texte = null;

    #[ORM\Column(length: 30)]
    #[Groups(['mission:read', 'mission:write', 'completion:read'])]
    private string $type = self::TYPE_SERVICE;

    #[ORM\Column(length: 30)]
    #[Groups(['mission:read', 'mission:write', 'completion:read'])]
    private string $priorite = self::PRIO_NE_PAS_OUBLIER;

    #[ORM\Column]
    #[Groups(['mission:read', 'mission:write'])]
    private int $ordre = 0;

    public function getId(): ?int { return $this->id; }
    public function getZone(): ?Zone { return $this->zone; }
    public function setZone(?Zone $zone): static { $this->zone = $zone; return $this; }
    public function getTexte(): ?string { return $this->texte; }
    public function setTexte(string $texte): static { $this->texte = $texte; return $this; }
    public function getType(): string { return $this->type; }
    public function setType(string $type): static { $this->type = $type; return $this; }
    public function getPriorite(): string { return $this->priorite; }
    public function setPriorite(string $p): static { $this->priorite = $p; return $this; }
    public function getOrdre(): int { return $this->ordre; }
    public function setOrdre(int $ordre): static { $this->ordre = $ordre; return $this; }
}
