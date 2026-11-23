-- ============================================================
-- Migration : liens des anciennes notifications de missions
-- Date : 2026-11-23 — à exécuter APRÈS 2026-11-22_notifications_application.sql
--
-- Avant la séparation Congés / Missions, les notifications d'ordres de
-- mission et de fiches d'intervention pointaient vers l'espace Congés.
-- On les reconnaît à leur libellé (« Ordre de Mission… », « Fiche
-- d'Intervention… ») et on corrige l'application et le lien.
-- Idempotent : peut être rejoué sans effet de bord.
-- ============================================================

BEGIN;

-- 1. Anciennes pages « interventions » (supprimées) → espace Missions
UPDATE notifications
   SET application = 'missions',
       lien = '/absences/missions/demandes'
 WHERE lien LIKE '/absences/interventions%';

-- 2. Notifications de missions rangées par erreur dans Congés
UPDATE notifications
   SET application = 'missions',
       lien = CASE
         WHEN lien LIKE '/absences/validations%' THEN '/absences/missions/validations'
         WHEN lien LIKE '/absences/demandes%'    THEN '/absences/missions/demandes'
         ELSE lien
       END
 WHERE application = 'absences'
   AND (titre ILIKE '%mission%' OR message ILIKE '%mission%'
        OR titre ILIKE '%intervention%' OR message ILIKE '%intervention%');

COMMIT;
