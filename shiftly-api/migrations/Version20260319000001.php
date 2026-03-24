<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Shiftly — migration initiale
 * Crée les 12 tables de l'application.
 */
final class Version20260319000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Création initiale du schéma Shiftly (12 entités)';
    }

    public function up(Schema $schema): void
    {
        // Centre
        $this->addSql('CREATE TABLE centre (
            id         INT AUTO_INCREMENT NOT NULL,
            nom        VARCHAR(100) NOT NULL,
            slug       VARCHAR(120) NOT NULL,
            created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            UNIQUE INDEX UNIQ_C6A0EA75989D9B62 (slug),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // User
        $this->addSql('CREATE TABLE `user` (
            id           INT AUTO_INCREMENT NOT NULL,
            centre_id    INT NOT NULL,
            nom          VARCHAR(100) NOT NULL,
            email        VARCHAR(180) NOT NULL,
            password     VARCHAR(255) NOT NULL,
            roles        JSON NOT NULL,
            role         VARCHAR(20) NOT NULL,
            avatar_color VARCHAR(20) DEFAULT NULL,
            points       INT NOT NULL DEFAULT 0,
            created_at   DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            UNIQUE INDEX UNIQ_8D93D649E7927C74 (email),
            INDEX IDX_8D93D649463CD7C3 (centre_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Zone
        $this->addSql('CREATE TABLE zone (
            id        INT AUTO_INCREMENT NOT NULL,
            centre_id INT NOT NULL,
            nom       VARCHAR(50) NOT NULL,
            couleur   VARCHAR(20) DEFAULT NULL,
            ordre     INT NOT NULL DEFAULT 0,
            INDEX IDX_A0EBC007463CD7C3 (centre_id),
            UNIQUE INDEX uniq_zone_centre_nom (centre_id, nom),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Mission
        $this->addSql('CREATE TABLE mission (
            id       INT AUTO_INCREMENT NOT NULL,
            zone_id  INT NOT NULL,
            texte    VARCHAR(255) NOT NULL,
            type     VARCHAR(30) NOT NULL,
            priorite VARCHAR(30) NOT NULL,
            ordre    INT NOT NULL DEFAULT 0,
            INDEX IDX_9067F23C9F2C3FAB (zone_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Competence
        $this->addSql('CREATE TABLE competence (
            id         INT AUTO_INCREMENT NOT NULL,
            zone_id    INT NOT NULL,
            nom        VARCHAR(150) NOT NULL,
            points     INT NOT NULL DEFAULT 10,
            difficulte VARCHAR(30) NOT NULL,
            INDEX IDX_94D4687F9F2C3FAB (zone_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // StaffCompetence
        $this->addSql('CREATE TABLE staff_competence (
            id            INT AUTO_INCREMENT NOT NULL,
            user_id       INT NOT NULL,
            competence_id INT NOT NULL,
            acquired_at   DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            INDEX IDX_728678AEA76ED395 (user_id),
            INDEX IDX_728678AE15761DAB (competence_id),
            UNIQUE INDEX uniq_staff_comp (user_id, competence_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Service
        $this->addSql('CREATE TABLE service (
            id          INT AUTO_INCREMENT NOT NULL,
            centre_id   INT NOT NULL,
            date        DATE NOT NULL,
            heure_debut TIME DEFAULT NULL,
            heure_fin   TIME DEFAULT NULL,
            statut      VARCHAR(20) NOT NULL,
            INDEX IDX_E19D9AD2463CD7C3 (centre_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Poste
        $this->addSql('CREATE TABLE poste (
            id         INT AUTO_INCREMENT NOT NULL,
            service_id INT NOT NULL,
            zone_id    INT NOT NULL,
            user_id    INT NOT NULL,
            INDEX IDX_7C890FABED5CA9E6 (service_id),
            INDEX IDX_7C890FAB9F2C3FAB (zone_id),
            INDEX IDX_7C890FABA76ED395 (user_id),
            UNIQUE INDEX uniq_poste (service_id, zone_id, user_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Completion
        $this->addSql('CREATE TABLE completion (
            id           INT AUTO_INCREMENT NOT NULL,
            poste_id     INT NOT NULL,
            mission_id   INT NOT NULL,
            user_id      INT DEFAULT NULL,
            completed_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            INDEX IDX_38D6377EA0905086 (poste_id),
            INDEX IDX_38D6377EBE6CAE90 (mission_id),
            INDEX IDX_38D6377EA76ED395 (user_id),
            UNIQUE INDEX uniq_completion (poste_id, mission_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Incident
        $this->addSql('CREATE TABLE incident (
            id          INT AUTO_INCREMENT NOT NULL,
            centre_id   INT NOT NULL,
            service_id  INT DEFAULT NULL,
            user_id     INT DEFAULT NULL,
            titre       VARCHAR(255) NOT NULL,
            severite    VARCHAR(20) NOT NULL,
            statut      VARCHAR(20) NOT NULL,
            created_at  DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            resolved_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            INDEX IDX_3D03A11A463CD7C3 (centre_id),
            INDEX IDX_3D03A11AED5CA9E6 (service_id),
            INDEX IDX_3D03A11AA76ED395 (user_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // Tutoriel
        $this->addSql('CREATE TABLE tutoriel (
            id         INT AUTO_INCREMENT NOT NULL,
            centre_id  INT NOT NULL,
            titre      VARCHAR(200) NOT NULL,
            zone       VARCHAR(50) DEFAULT NULL,
            niveau     VARCHAR(20) NOT NULL,
            dure_min   INT DEFAULT NULL,
            contenu    JSON NOT NULL,
            created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            INDEX IDX_A2073AED463CD7C3 (centre_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // TutoRead
        $this->addSql('CREATE TABLE tuto_read (
            id          INT AUTO_INCREMENT NOT NULL,
            user_id     INT NOT NULL,
            tutoriel_id INT NOT NULL,
            read_at     DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',
            INDEX IDX_4D239655A76ED395 (user_id),
            INDEX IDX_4D2396557CB6CDBB (tutoriel_id),
            UNIQUE INDEX uniq_tutoread (user_id, tutoriel_id),
            PRIMARY KEY (id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        // ── Foreign keys ──────────────────────────────────────────────────────
        $this->addSql('ALTER TABLE `user`           ADD CONSTRAINT FK_user_centre         FOREIGN KEY (centre_id)    REFERENCES centre      (id)');
        $this->addSql('ALTER TABLE zone             ADD CONSTRAINT FK_zone_centre          FOREIGN KEY (centre_id)    REFERENCES centre      (id)');
        $this->addSql('ALTER TABLE mission          ADD CONSTRAINT FK_mission_zone         FOREIGN KEY (zone_id)      REFERENCES zone        (id)');
        $this->addSql('ALTER TABLE competence       ADD CONSTRAINT FK_comp_zone            FOREIGN KEY (zone_id)      REFERENCES zone        (id)');
        $this->addSql('ALTER TABLE staff_competence ADD CONSTRAINT FK_sc_user              FOREIGN KEY (user_id)      REFERENCES `user`      (id)');
        $this->addSql('ALTER TABLE staff_competence ADD CONSTRAINT FK_sc_competence        FOREIGN KEY (competence_id) REFERENCES competence (id)');
        $this->addSql('ALTER TABLE service          ADD CONSTRAINT FK_service_centre       FOREIGN KEY (centre_id)    REFERENCES centre      (id)');
        $this->addSql('ALTER TABLE poste            ADD CONSTRAINT FK_poste_service        FOREIGN KEY (service_id)   REFERENCES service     (id)');
        $this->addSql('ALTER TABLE poste            ADD CONSTRAINT FK_poste_zone           FOREIGN KEY (zone_id)      REFERENCES zone        (id)');
        $this->addSql('ALTER TABLE poste            ADD CONSTRAINT FK_poste_user           FOREIGN KEY (user_id)      REFERENCES `user`      (id)');
        $this->addSql('ALTER TABLE completion       ADD CONSTRAINT FK_completion_poste     FOREIGN KEY (poste_id)     REFERENCES poste       (id)');
        $this->addSql('ALTER TABLE completion       ADD CONSTRAINT FK_completion_mission   FOREIGN KEY (mission_id)   REFERENCES mission     (id)');
        $this->addSql('ALTER TABLE completion       ADD CONSTRAINT FK_completion_user      FOREIGN KEY (user_id)      REFERENCES `user`      (id)');
        $this->addSql('ALTER TABLE incident         ADD CONSTRAINT FK_incident_centre      FOREIGN KEY (centre_id)    REFERENCES centre      (id)');
        $this->addSql('ALTER TABLE incident         ADD CONSTRAINT FK_incident_service     FOREIGN KEY (service_id)   REFERENCES service     (id)');
        $this->addSql('ALTER TABLE incident         ADD CONSTRAINT FK_incident_user        FOREIGN KEY (user_id)      REFERENCES `user`      (id)');
        $this->addSql('ALTER TABLE tutoriel         ADD CONSTRAINT FK_tutoriel_centre      FOREIGN KEY (centre_id)    REFERENCES centre      (id)');
        $this->addSql('ALTER TABLE tuto_read        ADD CONSTRAINT FK_tutoread_user        FOREIGN KEY (user_id)      REFERENCES `user`      (id)');
        $this->addSql('ALTER TABLE tuto_read        ADD CONSTRAINT FK_tutoread_tutoriel    FOREIGN KEY (tutoriel_id)  REFERENCES tutoriel    (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE tuto_read        DROP FOREIGN KEY FK_tutoread_tutoriel');
        $this->addSql('ALTER TABLE tuto_read        DROP FOREIGN KEY FK_tutoread_user');
        $this->addSql('ALTER TABLE tutoriel         DROP FOREIGN KEY FK_tutoriel_centre');
        $this->addSql('ALTER TABLE incident         DROP FOREIGN KEY FK_incident_user');
        $this->addSql('ALTER TABLE incident         DROP FOREIGN KEY FK_incident_service');
        $this->addSql('ALTER TABLE incident         DROP FOREIGN KEY FK_incident_centre');
        $this->addSql('ALTER TABLE completion       DROP FOREIGN KEY FK_completion_user');
        $this->addSql('ALTER TABLE completion       DROP FOREIGN KEY FK_completion_mission');
        $this->addSql('ALTER TABLE completion       DROP FOREIGN KEY FK_completion_poste');
        $this->addSql('ALTER TABLE poste            DROP FOREIGN KEY FK_poste_user');
        $this->addSql('ALTER TABLE poste            DROP FOREIGN KEY FK_poste_zone');
        $this->addSql('ALTER TABLE poste            DROP FOREIGN KEY FK_poste_service');
        $this->addSql('ALTER TABLE service          DROP FOREIGN KEY FK_service_centre');
        $this->addSql('ALTER TABLE staff_competence DROP FOREIGN KEY FK_sc_competence');
        $this->addSql('ALTER TABLE staff_competence DROP FOREIGN KEY FK_sc_user');
        $this->addSql('ALTER TABLE competence       DROP FOREIGN KEY FK_comp_zone');
        $this->addSql('ALTER TABLE mission          DROP FOREIGN KEY FK_mission_zone');
        $this->addSql('ALTER TABLE zone             DROP FOREIGN KEY FK_zone_centre');
        $this->addSql('ALTER TABLE `user`           DROP FOREIGN KEY FK_user_centre');

        $this->addSql('DROP TABLE tuto_read');
        $this->addSql('DROP TABLE tutoriel');
        $this->addSql('DROP TABLE incident');
        $this->addSql('DROP TABLE completion');
        $this->addSql('DROP TABLE poste');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE staff_competence');
        $this->addSql('DROP TABLE competence');
        $this->addSql('DROP TABLE mission');
        $this->addSql('DROP TABLE zone');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE centre');
    }
}
