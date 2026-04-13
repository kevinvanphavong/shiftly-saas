<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260413000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Crée la table service_manager (relation ManyToMany Service ↔ User)';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE service_manager (
            service_id INTEGER NOT NULL,
            user_id    INTEGER NOT NULL,
            PRIMARY KEY (service_id, user_id),
            CONSTRAINT FK_service_manager_service FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE,
            CONSTRAINT FK_service_manager_user    FOREIGN KEY (user_id)    REFERENCES "user" (id) ON DELETE CASCADE
        )');
        $this->addSql('CREATE INDEX IDX_service_manager_service ON service_manager (service_id)');
        $this->addSql('CREATE INDEX IDX_service_manager_user    ON service_manager (user_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX IDX_service_manager_service');
        $this->addSql('DROP INDEX IDX_service_manager_user');
        $this->addSql('DROP TABLE service_manager');
    }
}
