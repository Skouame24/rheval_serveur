// ============================================================
// modules/demandes-rh/constants/statuts-demande.constant.ts
// Statuts officiels du workflow selon Digitalisation_RH_Architecture.drawio
// ============================================================

export enum StatutDemandeRH {
  BROUILLON = "BROUILLON",
  SOUMISE = "SOUMISE",
  EN_ATTENTE_N1 = "EN_ATTENTE_N1",               // Étape 1 : Supérieur direct
  EN_ATTENTE_DRH = "EN_ATTENTE_DRH",             // Étape 2 : Direction RH (contrôle solde & règles)
  EN_ATTENTE_DG = "EN_ATTENTE_DG",               // Étape 3 : Direction Générale
  APPROUVEE = "APPROUVEE",                       // Validée par la Direction
  PERMISSION_EDITEE = "PERMISSION_EDITEE",       // Titre officiel / PDF généré
  ARCHIVEE = "ARCHIVEE",                         // Clôturée et archivée en GED
  RETOURNEE_EMPLOYE = "RETOURNEE_EMPLOYE",       // Refus N+1 avec motif
  RETOURNEE_N1 = "RETOURNEE_N1",                 // Refus DRH renvoyé au N+1 avec motif
  RETOURNEE_DRH = "RETOURNEE_DRH",               // Refus DG renvoyé à la DRH avec motif
  REFUSEE = "REFUSEE",                           // Refus définitif
  ANNULEE = "ANNULEE",                           // Annulée par l'employé
}

export enum DecisionValidation {
  APPROUVE = "APPROUVE",
  RETOURNE = "RETOURNE",
  REFUSE = "REFUSE",
}

export const COTE_D_IVOIRE_JOURS_FERIES = [
  "01-01", // Nouvel An
  "05-01", // Fête du Travail
  "08-07", // Fête Nationale (Indépendance)
  "08-15", // Assomption
  "11-01", // Toussaint
  "11-15", // Journée Nationale de la Paix
  "12-25", // Noël
];

