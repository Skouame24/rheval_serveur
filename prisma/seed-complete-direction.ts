import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient as PrismaDemandesClient } from "@prisma-demandes/client";
import { PrismaClient as PrismaEvalClient } from "@prisma/client";

const prismaDemandes = new PrismaDemandesClient();
const prismaEval = new PrismaEvalClient();

async function main() {
  console.log("🌱 [Seed] Début du seeding de la Direction Complète (Absences & Workflow)...");

  // 1. TYPES DE DEMANDES
  const typesData = [
    {
      code: "CONGE_ANNUEL",
      libelle: "Congé Annuel Payé",
      categorie: "CONGE",
      necessiteSolde: true,
      pieceRequise: false,
      delaiMinJours: 7,
      dureeMaxJours: 30,
    },
    {
      code: "CONGE_EXCEPTIONNEL",
      libelle: "Congé Exceptionnel / Permission Légale",
      categorie: "CONGE",
      necessiteSolde: false,
      pieceRequise: true,
      delaiMinJours: 2,
      dureeMaxJours: 5,
    },
    {
      code: "PERMISSION_ABSENCE",
      libelle: "Permission d'Absence (Courte Durée)",
      categorie: "PERMISSION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 1,
      dureeMaxJours: 3,
    },
    {
      code: "REPOS_MALADIE",
      libelle: "Repos Maladie / Convalescence",
      categorie: "MALADIE",
      necessiteSolde: false,
      pieceRequise: true,
      delaiMinJours: 0,
      dureeMaxJours: 180,
    },
    {
      code: "ORDRE_MISSION",
      libelle: "Ordre de Mission Professionnelle",
      categorie: "MISSION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 3,
      dureeMaxJours: 60,
    },
    {
      code: "INTERVENTION_TERRAIN",
      libelle: "Intervention Terrain / Astreinte",
      categorie: "INTERVENTION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 1,
      dureeMaxJours: 14,
    },
  ];

  const typesMap = new Map<string, string>();
  for (const td of typesData) {
    const t = await prismaDemandes.types_demande.upsert({
      where: { code: td.code },
      update: td,
      create: td,
    });
    typesMap.set(t.code, t.id);
  }
  console.log(`✓ ${typesMap.size} types de demandes opérationnels.`);

  // 2. UTILISATEURS DE LA DIRECTION COMPLÈTE
  const directionUsers = [
    // Direction Générale
    {
      id: "aaf364d4-b002-4ae1-943d-d7ab5ec90a9a",
      nom: "David Martial AKPA",
      email: "david.akpa@agilly.net",
      poste: "Directeur Exécutif & DG",
      departement: "Direction Générale",
      role: "N2",
      managerId: null,
      soldeAcquis: 30,
      soldePris: 0,
    },
    // Direction Ressources Humaines
    {
      id: "c970e84d-5fd5-4cb9-8c4e-7cccc14ad269",
      nom: "Germaine YAO",
      email: "germaine.yao@agilly.net",
      poste: "Directrice des Ressources Humaines",
      departement: "Direction des Ressources Humaines",
      role: "DRH",
      managerId: "aaf364d4-b002-4ae1-943d-d7ab5ec90a9a",
      soldeAcquis: 30,
      soldePris: 2,
    },
    // Manager N+1 (Direction Juridique)
    {
      id: "1f77edad-716c-4552-b96f-58ec7d1ee1d7",
      nom: "Ange-Dieudonne TIANGBO",
      email: "ange.tiangbo@agilly.net",
      poste: "Directeur Juridique & Conformité / DPO",
      departement: "Direction Juridique",
      role: "N1",
      managerId: "aaf364d4-b002-4ae1-943d-d7ab5ec90a9a",
      soldeAcquis: 30,
      soldePris: 3,
    },
    // Salarié 1 (Samuel KOUAME)
    {
      id: "0a5c4c64-abdd-4f4f-a3af-00057ebdddfb",
      altId: "3eef0762-8149-43c7-b673-581335cb4df8",
      nom: "Ebenezer Samuel KOUAME",
      email: "ebenezer.kouame@agilly.net",
      altEmail: "samuel.kouame@agilly.net",
      poste: "Ingénieur Développeur Fullstack",
      departement: "Direction Juridique & Digital",
      role: "SALARIE",
      managerId: "1f77edad-716c-4552-b96f-58ec7d1ee1d7",
      soldeAcquis: 30,
      soldePris: 4,
    },
    // Salarié 2 (Marie Ruth GNAGNE)
    {
      id: "4d8b00e4-b383-4beb-b819-c184b5eddce4",
      nom: "Marie Ruth GNAGNE",
      email: "ruth.gnagne@agilly.net",
      poste: "Juriste Affaires & Conformité",
      departement: "Direction Juridique",
      role: "SALARIE",
      managerId: "1f77edad-716c-4552-b96f-58ec7d1ee1d7",
      soldeAcquis: 30,
      soldePris: 5,
    },
    // Salarié 3 (Sylvain OUEDRAOGO)
    {
      id: "1e088664-6faf-484a-98ce-92de8fbdfb39",
      nom: "Sylvain Windigoudou OUEDRAOGO",
      email: "sylvain.ouedraogo@agilly.net",
      poste: "Chargé de mission GRC",
      departement: "Direction Juridique",
      role: "SALARIE",
      managerId: "1f77edad-716c-4552-b96f-58ec7d1ee1d7",
      soldeAcquis: 28,
      soldePris: 6,
    },
  ];

  // 3. SOLDES DE CONGÉS 2026
  console.log("Calcul et mise à jour des soldes 2026...");
  for (const u of directionUsers) {
    const idsToSeed = [u.id];
    if ((u as any).altId) idsToSeed.push((u as any).altId);

    for (const sid of idsToSeed) {
      await prismaDemandes.soldes_conges.upsert({
        where: { salarieId_annee: { salarieId: sid, annee: 2026 } },
        update: {
          joursAcquis: u.soldeAcquis,
          joursPris: u.soldePris,
          joursEnAttente: 4,
          reliquatN1: 2,
        },
        create: {
          salarieId: sid,
          annee: 2026,
          joursAcquis: u.soldeAcquis,
          joursPris: u.soldePris,
          joursEnAttente: 4,
          reliquatN1: 2,
        },
      });
    }
  }
  console.log(`✓ Soldes 2026 initialisés pour les membres de la Direction.`);

  // 4. RÉINITIALISATION PROPRE DES DEMANDES DE TEST
  await prismaDemandes.validations_demande.deleteMany({});
  await prismaDemandes.historique_demande.deleteMany({});
  await prismaDemandes.pieces_jointes_demande.deleteMany({});
  await prismaDemandes.demandes_rh.deleteMany({});

  // 5. CRÉATION DES DEMANDES À TRAVERS TOUTES LES ÉTAPES DU WORKFLOW DRAW.IO
  const samuel = directionUsers[3];
  const ruth = directionUsers[4];
  const sylvain = directionUsers[5];
  const tiangbo = directionUsers[2];
  const germaine = directionUsers[1];
  const david = directionUsers[0];

  const demandesToSeed = [
    // 1. Demande d'Ebenezer Samuel KOUAME -> EN_ATTENTE_N1 (Ange Tiangbo doit la voir dans sa boîte !)
    {
      numeroDemande: "DEM-2026-0001",
      salarieId: samuel.id,
      salarieNom: samuel.nom,
      salarieEmail: samuel.email,
      salariePoste: samuel.poste,
      salarieDirection: samuel.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("CONGE_ANNUEL")!,
      dateDebut: new Date("2026-11-10T08:00:00Z"),
      dateFin: new Date("2026-11-13T18:00:00Z"),
      nombreJours: 4.0,
      motif: "Repos annuel légal - Période de congés programmée.",
      statut: "EN_ATTENTE_N1",
      etapeCourante: 1,
      createdAt: new Date("2026-10-20T09:30:00Z"),
      validations: [],
    },

    // 2. Demande de Marie Ruth GNAGNE -> EN_ATTENTE_DRH (Ange Tiangbo a VALIDÉ, Germaine YAO doit arbitrer !)
    {
      numeroDemande: "DEM-2026-0002",
      salarieId: ruth.id,
      salarieNom: ruth.nom,
      salarieEmail: ruth.email,
      salariePoste: ruth.poste,
      salarieDirection: ruth.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("CONGE_EXCEPTIONNEL")!,
      dateDebut: new Date("2026-11-18T08:00:00Z"),
      dateFin: new Date("2026-11-20T18:00:00Z"),
      nombreJours: 3.0,
      motif: "Permission de mariage personnel (Droit conventionnel 3 jours).",
      statut: "EN_ATTENTE_DRH",
      etapeCourante: 2,
      createdAt: new Date("2026-10-18T14:15:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: tiangbo.id,
          valideurNom: tiangbo.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "APPROUVE",
          motif: "Avis très favorable. Intérim juridique assuré par Sylvain OUEDRAOGO.",
          dateDecision: new Date("2026-10-19T10:00:00Z"),
        },
      ],
    },

    // 3. Demande de Sylvain OUEDRAOGO -> EN_ATTENTE_DG (N+1 et DRH ont validé, David AKPA doit signer !)
    {
      numeroDemande: "DEM-2026-0003",
      salarieId: sylvain.id,
      salarieNom: sylvain.nom,
      salarieEmail: sylvain.email,
      salariePoste: sylvain.poste,
      salarieDirection: sylvain.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("ORDRE_MISSION")!,
      dateDebut: new Date("2026-11-23T07:30:00Z"),
      dateFin: new Date("2026-11-27T18:00:00Z"),
      nombreJours: 5.0,
      destination: "Yamoussoukro / Bouaké - Sites Partenaires",
      moyenTransport: "Véhicule d'entreprise Agilly",
      fraisEstimes: 175000.0,
      motif: "Mission d'audit de conformité RGPD et cartographie des traitements sur site.",
      statut: "EN_ATTENTE_DG",
      etapeCourante: 3,
      createdAt: new Date("2026-10-15T08:00:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: tiangbo.id,
          valideurNom: tiangbo.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "APPROUVE",
          motif: "Mission indispensable au plan de conformité Q4.",
          dateDecision: new Date("2026-10-16T11:20:00Z"),
        },
        {
          etape: 2,
          valideurId: germaine.id,
          valideurNom: germaine.nom,
          valideurRole: "DRH",
          decision: "APPROUVE",
          motif: "Conforme aux barèmes de frais professionnels. Transmis à la Direction.",
          dateDecision: new Date("2026-10-17T16:45:00Z"),
        },
      ],
    },

    // 4. Demande d'Ebenezer Samuel KOUAME -> PERMISSION_EDITEE (Complètement validée avec PDF)
    {
      numeroDemande: "DEM-2026-0004",
      salarieId: samuel.id,
      salarieNom: samuel.nom,
      salarieEmail: samuel.email,
      salariePoste: samuel.poste,
      salarieDirection: samuel.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("PERMISSION_ABSENCE")!,
      dateDebut: new Date("2026-10-24T08:00:00Z"),
      dateFin: new Date("2026-10-24T18:00:00Z"),
      nombreJours: 1.0,
      motif: "Démarches administratives urgentes (renouvellement de passeport).",
      statut: "PERMISSION_EDITEE",
      etapeCourante: 4,
      numeroTitre: "AGY-PERM-2026-00042",
      createdAt: new Date("2026-10-10T10:00:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: tiangbo.id,
          valideurNom: tiangbo.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "APPROUVE",
          motif: "Accordé.",
          dateDecision: new Date("2026-10-11T09:00:00Z"),
        },
        {
          etape: 2,
          valideurId: germaine.id,
          valideurNom: germaine.nom,
          valideurRole: "DRH",
          decision: "APPROUVE",
          motif: "Validé et pris en compte.",
          dateDecision: new Date("2026-10-11T14:30:00Z"),
        },
      ],
    },

    // 5. Demande de Marie Ruth GNAGNE -> RETOURNEE_EMPLOYE (Pour test du cas d'erreur / motif de retour)
    {
      numeroDemande: "DEM-2026-0005",
      salarieId: ruth.id,
      salarieNom: ruth.nom,
      salarieEmail: ruth.email,
      salariePoste: ruth.poste,
      salarieDirection: ruth.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("CONGE_ANNUEL")!,
      dateDebut: new Date("2026-12-01T08:00:00Z"),
      dateFin: new Date("2026-12-10T18:00:00Z"),
      nombreJours: 8.0,
      motif: "Congé de fin d'année.",
      statut: "RETOURNEE_EMPLOYE",
      etapeCourante: 1,
      createdAt: new Date("2026-10-12T11:00:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: tiangbo.id,
          valideurNom: tiangbo.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "RETOURNE",
          motif: "Merci de décaler la période de 48h afin d'assurer la clôture des dossiers contentieux.",
          dateDecision: new Date("2026-10-13T15:00:00Z"),
        },
      ],
    },

    // 6. Demande de Sylvain OUEDRAOGO -> ARCHIVEE (Pour test GED & Registre)
    {
      numeroDemande: "DEM-2026-0006",
      salarieId: sylvain.id,
      salarieNom: sylvain.nom,
      salarieEmail: sylvain.email,
      salariePoste: sylvain.poste,
      salarieDirection: sylvain.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("REPOS_MALADIE")!,
      dateDebut: new Date("2026-10-05T08:00:00Z"),
      dateFin: new Date("2026-10-07T18:00:00Z"),
      nombreJours: 3.0,
      motif: "Convalescence suite à certificat médical transmis.",
      statut: "ARCHIVEE",
      etapeCourante: 4,
      numeroTitre: "AGY-PERM-2026-00035",
      createdAt: new Date("2026-10-04T08:30:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: tiangbo.id,
          valideurNom: tiangbo.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "APPROUVE",
          motif: "Vu et transmis à la DRH.",
          dateDecision: new Date("2026-10-04T09:00:00Z"),
        },
        {
          etape: 2,
          valideurId: germaine.id,
          valideurNom: germaine.nom,
          valideurRole: "DRH",
          decision: "APPROUVE",
          motif: "Certificat médical conforme. Clôturé et archivé.",
          dateDecision: new Date("2026-10-04T11:00:00Z"),
        },
      ],
    },
  ];

  for (const d of demandesToSeed) {
    const { validations, ...demandeData } = d;
    const created = await prismaDemandes.demandes_rh.create({
      data: demandeData,
    });

    for (const v of validations) {
      await prismaDemandes.validations_demande.create({
        data: {
          demandeId: created.id,
          ...v,
        },
      });
    }

    // Historique d'audit
    await prismaDemandes.historique_demande.create({
      data: {
        demandeId: created.id,
        action: "CREATION",
        auteurId: created.salarieId,
        auteurNom: created.salarieNom,
        nouveauStatut: created.statut,
        commentaire: `Dépôt initial de la demande ${created.numeroDemande}`,
      },
    });
  }

  console.log(`✓ ${demandesToSeed.length} demandes réalistes insérées dans tous les états du workflow.`);
  console.log("🚀 [Seed terminé avec succès !]");
}

main()
  .catch((e) => {
    console.error("Erreur seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaDemandes.$disconnect();
    await prismaEval.$disconnect();
  });
