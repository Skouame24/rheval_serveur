// ============================================================
// modules/demandes-rh/utils/date-calcul.util.ts
// Calcul précis des jours ouvrés décomptés selon le droit du travail
// ============================================================

import { COTE_D_IVOIRE_JOURS_FERIES } from "../constants/statuts-demande.constant";

export function isJourOuvre(date: Date): boolean {
  const day = date.getDay();
  // 0 = Dimanche, 6 = Samedi
  if (day === 0 || day === 6) return false;

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const key = `${mm}-${dd}`;

  return !COTE_D_IVOIRE_JOURS_FERIES.includes(key);
}

export function calculerNombreJoursOuvres(
  dateDebut: Date,
  dateFin: Date,
  demiJourneeDebut: boolean = false,
  demiJourneeFin: boolean = false
): number {
  if (dateDebut > dateFin) {
    throw new Error("La date de début ne peut pas être postérieure à la date de fin.");
  }

  let jours = 0;
  const current = new Date(dateDebut);
  current.setHours(0, 0, 0, 0);

  const end = new Date(dateFin);
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    if (isJourOuvre(current)) {
      jours += 1.0;
    }
    current.setDate(current.getDate() + 1);
  }

  // Déductions pour les demi-journées
  if (jours > 0) {
    if (demiJourneeDebut) {
      jours -= 0.5; // Commence l'après-midi
    }
    if (demiJourneeFin) {
      jours -= 0.5; // Se termine le matin
    }
  }

  return Math.max(0.5, jours);
}

