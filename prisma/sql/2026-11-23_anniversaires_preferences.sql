-- ============================================================
-- Migration : anniversaires + préférences de notification + avis assistant
-- Date : 2026-11-23 — sans risque (ajouts uniquement), idempotente.
-- À exécuter sur la base RHEVAL (DATABASE_URL) AVANT de déployer le
-- backend de la branche feat/phase3-finitions :
--   npx prisma db execute --file prisma/sql/2026-11-23_anniversaires_preferences.sql --schema prisma/schema.prisma
-- ============================================================

BEGIN;

-- Anniversaire : jour + mois seulement (jamais l'année), masquable par le salarié
ALTER TABLE utilisateurs_cache
  ADD COLUMN IF NOT EXISTS "anniversaireJour" INTEGER,
  ADD COLUMN IF NOT EXISTS "anniversaireMois" INTEGER,
  ADD COLUMN IF NOT EXISTS "anniversaireVisible" BOOLEAN NOT NULL DEFAULT true;

DO $$ BEGIN
  ALTER TABLE utilisateurs_cache ADD CONSTRAINT utilisateurs_cache_anniversaire_chk CHECK (
    ("anniversaireJour" IS NULL AND "anniversaireMois" IS NULL)
    OR ("anniversaireJour" BETWEEN 1 AND 31 AND "anniversaireMois" BETWEEN 1 AND 12)
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Récapitulatif quotidien
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS "emailEnAttente" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS "notifications_emailEnAttente_idx"
  ON notifications ("emailEnAttente") WHERE "emailEnAttente";

-- Préférences d'e-mail par application
CREATE TABLE IF NOT EXISTS preferences_notifications (
  "userId"      TEXT NOT NULL,
  application   TEXT NOT NULL,
  email         TEXT NOT NULL DEFAULT 'IMMEDIAT',
  "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "preferences_notifications_pkey" PRIMARY KEY ("userId", application),
  CONSTRAINT "preferences_notifications_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES utilisateurs_cache(id_microsoft) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Avis sur l'assistant Agil
CREATE TABLE IF NOT EXISTS avis_assistant (
  id          TEXT NOT NULL,
  "userId"    TEXT NOT NULL,
  "entreeId"  TEXT,
  question    TEXT NOT NULL,
  utile       BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "avis_assistant_pkey" PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS "avis_assistant_entreeId_idx" ON avis_assistant ("entreeId");
CREATE INDEX IF NOT EXISTS "avis_assistant_createdAt_idx" ON avis_assistant ("createdAt");

COMMIT;
