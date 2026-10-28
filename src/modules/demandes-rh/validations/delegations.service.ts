import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationsService } from '../../notifications/notifications.service';

export interface DelegationRecord {
  id: string;
  managerId: string;
  managerNom: string;
  managerEmail?: string;
  interimId: string;
  interimNom: string;
  interimEmail?: string;
  motif?: string;
  dateDebut: string;
  dateFin?: string | null;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class DelegationsService {
  private readonly logger = new Logger(DelegationsService.name);
  private readonly storagePath = path.resolve(process.cwd(), 'data', 'delegations.json');

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {
    this.ensureStorage();
  }

  private ensureStorage() {
    try {
      const dir = path.dirname(this.storagePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (!fs.existsSync(this.storagePath)) {
        fs.writeFileSync(this.storagePath, JSON.stringify([]), 'utf8');
      }
    } catch (err: any) {
      this.logger.error(`[DelegationsService] Erreur initialisation storage: ${err?.message || err}`);
    }
  }

  private readAll(): DelegationRecord[] {
    try {
      this.ensureStorage();
      const content = fs.readFileSync(this.storagePath, 'utf8');
      return JSON.parse(content) || [];
    } catch {
      return [];
    }
  }

  private saveAll(records: DelegationRecord[]) {
    try {
      this.ensureStorage();
      fs.writeFileSync(this.storagePath, JSON.stringify(records, null, 2), 'utf8');
    } catch (err: any) {
      this.logger.error(`[DelegationsService] Erreur écriture storage: ${err?.message || err}`);
    }
  }

  /**
   * Retourne la délégation active d'un manager (s'il en a une)
   */
  async getMyActiveDelegation(managerId: string): Promise<DelegationRecord | null> {
    const list = this.readAll();
    const now = new Date();

    const active = list.find((d) => {
      if (d.managerId !== managerId || !d.actif) return false;
      const debut = new Date(d.dateDebut);
      if (now < debut) return false;
      if (d.dateFin) {
        const fin = new Date(d.dateFin);
        fin.setHours(23, 59, 59, 999);
        if (now > fin) return false;
      }
      return true;
    });

    return active || null;
  }

  /**
   * Retourne la liste des managers pour lesquels l'utilisateur courant est désigné intérimaire actif
   */
  async getActiveDelegationsForInterim(userId: string): Promise<DelegationRecord[]> {
    const list = this.readAll();
    const now = new Date();

    return list.filter((d) => {
      if (d.interimId !== userId || !d.actif) return false;
      const debut = new Date(d.dateDebut);
      if (now < debut) return false;
      if (d.dateFin) {
        const fin = new Date(d.dateFin);
        fin.setHours(23, 59, 59, 999);
        if (now > fin) return false;
      }
      return true;
    });
  }

  /**
   * Vérifie si un utilisateur est habilité à valider au titre d'une délégation
   */
  async isUserActiveInterimForManager(interimId: string, managerId: string): Promise<boolean> {
    const delegations = await this.getActiveDelegationsForInterim(interimId);
    return delegations.some((d) => d.managerId === managerId);
  }

  /**
   * Active ou met à jour une délégation
   */
  async setDelegation(
    managerId: string,
    dto: { interimId: string; motif?: string; dateDebut?: string; dateFin?: string | null },
  ): Promise<DelegationRecord> {
    // 1. Récupérer manager et intérimaire
    const manager = await this.prisma.utilisateurs_cache.findFirst({
      where: { OR: [{ id_microsoft: managerId }, { email: managerId }] },
    });
    const interim = await this.prisma.utilisateurs_cache.findFirst({
      where: { OR: [{ id_microsoft: dto.interimId }, { email: dto.interimId }] },
    });

    if (!interim) {
      throw new Error(`Collaborateur intérimaire introuvable (#${dto.interimId}).`);
    }

    const list = this.readAll();

    // Désactiver toute ancienne délégation de ce manager
    const nowIso = new Date().toISOString();
    for (const item of list) {
      if (item.managerId === managerId && item.actif) {
        item.actif = false;
        item.updatedAt = nowIso;
      }
    }

    const newRecord: DelegationRecord = {
      id: `DEL-${Date.now()}`,
      managerId: manager?.id_microsoft || managerId,
      managerNom: manager?.nom || 'Responsable',
      managerEmail: manager?.email,
      interimId: interim.id_microsoft,
      interimNom: interim.nom,
      interimEmail: interim.email,
      motif: dto.motif || 'Absence ou indisponibilité temporaire',
      dateDebut: dto.dateDebut || nowIso,
      dateFin: dto.dateFin || null,
      actif: true,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    list.unshift(newRecord);
    this.saveAll(list);

    this.logger.log(
      `✅ [DelegationsService] Délégation activée : ${newRecord.managerNom} a désigné ${newRecord.interimNom} comme intérimaire.`,
    );

    // Notification à l'intérimaire
    try {
      await this.notificationsService.createNotification({
        userId: interim.id_microsoft,
        titre: `Délégation de validation confiée par ${newRecord.managerNom}`,
        message: `Vous avez été désigné(e) comme intérimaire habilité(e) à valider les demandes de l'équipe pendant l'indisponibilité de votre responsable.`,
        type: 'ACTION',
        lien: '/absences/validations',
        sendEmail: true,
      });
    } catch {}

    return newRecord;
  }

  /**
   * Révoque immédiatement la délégation active ("le retirer s'il vient")
   */
  async revokeDelegation(managerId: string): Promise<{ success: boolean; message: string }> {
    const list = this.readAll();
    let found = false;
    let interimIdToNotify: string | null = null;
    const nowIso = new Date().toISOString();

    for (const item of list) {
      if (item.managerId === managerId && item.actif) {
        item.actif = false;
        item.updatedAt = nowIso;
        found = true;
        interimIdToNotify = item.interimId;
      }
    }

    this.saveAll(list);

    if (found) {
      this.logger.log(`🛑 [DelegationsService] Délégation révoquée pour le manager ${managerId}.`);
      if (interimIdToNotify) {
        try {
          await this.notificationsService.createNotification({
            userId: interimIdToNotify,
            titre: `Fin de la délégation de validation`,
            message: `Votre responsable a repris ses validations. Votre statut d'intérimaire est désormais clôturé.`,
            type: 'INFO',
            lien: '/absences/validations',
            sendEmail: false,
          });
        } catch {}
      }
      return { success: true, message: 'Délégation révoquée avec succès. Vous reprenez la main sur vos validations.' };
    }

    return { success: true, message: 'Aucune délégation active à révoquer.' };
  }

  /**
   * Retourne les collaborateurs éligibles à être désignés comme intérimaires
   * (membres de l'équipe du manager en priorité, ou pairs)
   */
  async getEligibleInterims(managerId: string) {
    // 1. Équipe directe
    const directTeam = await this.prisma.utilisateurs_cache.findMany({
      where: { managerId },
      select: { id_microsoft: true, nom: true, email: true, poste: true, departement: true },
    });

    // 2. Si l'équipe directe est vide, proposer les collègues du même département
    if (directTeam.length === 0) {
      const me = await this.prisma.utilisateurs_cache.findUnique({ where: { id_microsoft: managerId } });
      if (me?.departement) {
        return this.prisma.utilisateurs_cache.findMany({
          where: {
            departement: me.departement,
            id_microsoft: { not: managerId },
          },
          select: { id_microsoft: true, nom: true, email: true, poste: true, departement: true },
          take: 20,
        });
      }
    }

    return directTeam;
  }
}

