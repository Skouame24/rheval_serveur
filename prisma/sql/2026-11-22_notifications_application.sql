-- ============================================================
-- Migration : notifications par application
-- Date : 2026-11-22
--
-- Sans risque : ajoute une colonne avec valeur par défaut et un index,
-- puis classe les notifications existantes d'après leur lien.
-- À exécuter UNE fois sur la base RHEVAL (DATABASE_URL), avant de
-- déployer le backend de la branche feat/notifications-par-application.
-- ============================================================

BEGIN;

ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS application TEXT NOT NULL DEFAULT 'rheval';

CREATE INDEX IF NOT EXISTS "notifications_userId_application_lu_idx"
  ON notifications ("userId", application, lu);

-- Reprise de l'existant (même règle que le backend pour les anciens appels)
UPDATE notifications SET application = 'missions'
  WHERE lien LIKE '/absences/missions%' OR lien LIKE '/absences/interventions%';

UPDATE notifications SET application = 'absences'
  WHERE lien LIKE '/absences%' AND application = 'rheval';

COMMIT;
