import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface Anniversaire {
  jour: number;
  mois: number;
}

const JOURS_PAR_MOIS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** Valide un couple jour/mois (29 février accepté). null = effacer. */
export function validerAnniversaire(jour: unknown, mois: unknown): Anniversaire | null {
  if ((jour === null || jour === undefined || jour === '') && (mois === null || mois === undefined || mois === '')) {
    return null;
  }
  const j = Number(jour);
  const m = Number(mois);
  if (!Number.isInteger(j) || !Number.isInteger(m) || m < 1 || m > 12 || j < 1 || j > JOURS_PAR_MOIS[m - 1]) {
    throw new BadRequestException('Date d’anniversaire invalide (jour et mois attendus).');
  }
  return { jour: j, mois: m };
}

/** « 14/03 », « 14-3 », « 14.03.1990 » → { jour: 14, mois: 3 } (l'année est ignorée) */
export function lireDateCourte(valeur: string): Anniversaire | null {
  const m = valeur.trim().match(/^(\d{1,2})\s*[/.\-]\s*(\d{1,2})(?:\s*[/.\-]\s*\d{2,4})?$/);
  if (!m) return null;
  try {
    return validerAnniversaire(m[1], m[2]);
  } catch {
    return null;
  }
}

@Injectable()
export class AnniversairesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Anniversaires visibles de toute l'entreprise (pour le portail) */
  async listePubliques() {
    const lignes = await this.prisma.utilisateurs_cache.findMany({
      where: { anniversaireVisible: true, anniversaireJour: { not: null }, anniversaireMois: { not: null } },
      select: { id_microsoft: true, email: true, anniversaireJour: true, anniversaireMois: true },
    });
    return lignes.map((l) => ({
      id: l.id_microsoft,
      email: l.email,
      jour: l.anniversaireJour as number,
      mois: l.anniversaireMois as number,
    }));
  }

  async lireMien(userId: string) {
    const u = await this.prisma.utilisateurs_cache.findUnique({
      where: { id_microsoft: userId },
      select: { anniversaireJour: true, anniversaireMois: true, anniversaireVisible: true },
    });
    if (!u) throw new NotFoundException('Profil introuvable : reconnectez-vous.');
    return { jour: u.anniversaireJour, mois: u.anniversaireMois, visible: u.anniversaireVisible };
  }

  async modifierMien(userId: string, body: { jour?: unknown; mois?: unknown; visible?: unknown }) {
    const date = validerAnniversaire(body.jour, body.mois);
    await this.prisma.utilisateurs_cache.update({
      where: { id_microsoft: userId },
      data: {
        anniversaireJour: date?.jour ?? null,
        anniversaireMois: date?.mois ?? null,
        ...(typeof body.visible === 'boolean' ? { anniversaireVisible: body.visible } : {}),
      },
    });
    return this.lireMien(userId);
  }

  /** Vue RH : tout le personnel, renseigné ou non */
  async listeRh() {
    const lignes = await this.prisma.utilisateurs_cache.findMany({
      orderBy: { nom: 'asc' },
      select: {
        id_microsoft: true,
        nom: true,
        email: true,
        poste: true,
        departement: true,
        anniversaireJour: true,
        anniversaireMois: true,
        anniversaireVisible: true,
      },
    });
    return lignes.map((l) => ({
      id: l.id_microsoft,
      nom: l.nom,
      email: l.email,
      poste: l.poste,
      departement: l.departement,
      jour: l.anniversaireJour,
      mois: l.anniversaireMois,
      visible: l.anniversaireVisible,
    }));
  }

  /** La RH renseigne la date ; le choix de visibilité reste celui du salarié */
  async modifierParRh(id: string, body: { jour?: unknown; mois?: unknown }) {
    const date = validerAnniversaire(body.jour, body.mois);
    const existe = await this.prisma.utilisateurs_cache.findUnique({ where: { id_microsoft: id }, select: { id_microsoft: true } });
    if (!existe) throw new NotFoundException('Collaborateur introuvable');
    await this.prisma.utilisateurs_cache.update({
      where: { id_microsoft: id },
      data: { anniversaireJour: date?.jour ?? null, anniversaireMois: date?.mois ?? null },
    });
    return { id, jour: date?.jour ?? null, mois: date?.mois ?? null };
  }

  /**
   * Import collé depuis Excel : une ligne par personne, « e-mail ; JJ/MM ».
   * Séparateurs acceptés : point-virgule, tabulation, virgule.
   */
  async importer(texte: unknown) {
    if (typeof texte !== 'string' || !texte.trim()) throw new BadRequestException('Aucune ligne à importer.');
    const lignes = texte.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lignes.length > 2000) throw new BadRequestException('2000 lignes maximum par import.');

    const misAJour: string[] = [];
    const introuvables: string[] = [];
    const invalides: string[] = [];

    for (const ligne of lignes) {
      const [emailBrut, dateBrute] = ligne.split(/[;\t,]/).map((c) => c?.trim() ?? '');
      if (!emailBrut || !emailBrut.includes('@')) {
        // En-tête ou ligne vide de sens : ignorée sans bruit si c'est l'en-tête
        if (!/mail/i.test(emailBrut)) invalides.push(ligne);
        continue;
      }
      const date = dateBrute ? lireDateCourte(dateBrute) : null;
      if (!date) {
        invalides.push(ligne);
        continue;
      }
      const res = await this.prisma.utilisateurs_cache.updateMany({
        where: { email: { equals: emailBrut, mode: 'insensitive' } },
        data: { anniversaireJour: date.jour, anniversaireMois: date.mois },
      });
      (res.count > 0 ? misAJour : introuvables).push(emailBrut);
    }
    return { misAJour: misAJour.length, introuvables, invalides };
  }
}
