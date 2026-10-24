import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient as PrismaDemandesClient } from "@prisma-demandes/client";
import { PrismaClient as PrismaEvalClient } from "@prisma/client";

const prismaDemandes = new PrismaDemandesClient();
const prismaEval = new PrismaEvalClient();

async function main() {
  console.log("🌱 [Seed] Début du seeding de la chaîne hiérarchique épurée (Salarié -> N+1 -> DRH -> DG)...");

  // 1. TYPES DE DEMANDES AVEC WORKFLOW CONFIGURABLE
  const typesData = [
    {
      code: "CONGE_ANNUEL",
      libelle: "Congé Annuel Payé",
      categorie: "CONGE",
      necessiteSolde: true,
      pieceRequise: false,
      delaiMinJours: 7,
      dureeMaxJours: 30,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: true,
      seuilDgJours: 0, // Validation DG systématique
      description: "Congé annuel légal avec circuit complet : Visa N+1, Contrôle DRH et Accord DG.",
    },
    {
      code: "CONGE_EXCEPTIONNEL",
      libelle: "Congé Exceptionnel / Permission Légale",
      categorie: "CONGE",
      necessiteSolde: false,
      pieceRequise: true,
      delaiMinJours: 2,
      dureeMaxJours: 5,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: false, // Circuit court N+1 -> DRH
      seuilDgJours: 0,
      description: "Événements familiaux conventionnels (mariage, naissance, etc.). Justificatif obligatoire.",
    },
    {
      code: "PERMISSION_ABSENCE",
      libelle: "Permission d'Absence (Courte Durée)",
      categorie: "PERMISSION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 1,
      dureeMaxJours: 3,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: true,
      seuilDgJours: 2, // DG requis uniquement si durée > 2 jours
      description: "Absence de courte durée. Si la durée dépasse 2 jours, l'accord DG est automatiquement sollicité.",
    },
    {
      code: "REPOS_MALADIE",
      libelle: "Repos Maladie / Convalescence",
      categorie: "MALADIE",
      necessiteSolde: false,
      pieceRequise: true,
      delaiMinJours: 0,
      dureeMaxJours: 180,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: false,
      seuilDgJours: 0,
      description: "Arrêt maladie avec certificat médical obligatoire transmis dans les 48h.",
    },
    {
      code: "ORDRE_MISSION",
      libelle: "Ordre de Mission Professionnelle",
      categorie: "MISSION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 3,
      dureeMaxJours: 60,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: true,
      seuilDgJours: 0,
      description: "Déplacement professionnel avec prise en charge de frais nécessitant arbitrage Direction.",
    },
    {
      code: "INTERVENTION_TERRAIN",
      libelle: "Intervention Terrain / Astreinte",
      categorie: "INTERVENTION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 1,
      dureeMaxJours: 14,
      workflowN1: true,
      workflowDrh: true,
      workflowDg: false,
      seuilDgJours: 0,
      description: "Interventions techniques programmées ou astreintes d'exploitation.",
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
  console.log(`✓ ${typesMap.size} types de demandes configurés.`);

  // 2. CHAÎNE ÉPURÉE STRICTEMENT 4 PERSONAS :
  // Salarié (Demandeur) -> N+1 (Manager) -> DRH (Ressources Humaines) -> DG (Direction Générale)
  const corePersonas = [
    // 1. Direction Générale
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
    // 2. Direction Ressources Humaines
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
    // 3. Manager N+1
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
    // 4. Salarié (Demandeur)
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
  ];

  // 3. SYNCHRONISATION DANS L'ANNUAIRE PRINCIPAL (utilisateurs_cache)
  console.log("Synchronisation de l'annuaire RH partagé...");
  for (const u of corePersonas) {
    const idsToSeed = [u.id];
    if ((u as any).altId) idsToSeed.push((u as any).altId);

    for (const sid of idsToSeed) {
      const emailToUse = sid === (u as any).altId ? (u as any).altEmail : u.email;
      await prismaEval.utilisateurs_cache.upsert({
        where: { id_microsoft: sid },
        update: {
          nom: u.nom,
          email: emailToUse,
          poste: u.poste,
          departement: u.departement,
          role: u.role,
          managerId: u.managerId,
          updatedAt: new Date(),
        },
        create: {
          id_microsoft: sid,
          nom: u.nom,
          email: emailToUse,
          poste: u.poste,
          departement: u.departement,
          role: u.role,
          managerId: u.managerId,
          updatedAt: new Date(),
        },
      });

      // Solde de congés 2026
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

  // 4. RÉINITIALISATION PROPRE DES ANCIENNES DEMANDES
  console.log("Nettoyage des anciennes demandes pour une visibilité 100% limpide...");
  await prismaDemandes.historique_demande.deleteMany({});
  await prismaDemandes.validations_demande.deleteMany({});
  await prismaDemandes.pieces_jointes_demande.deleteMany({});
  await prismaDemandes.demandes_rh.deleteMany({});

  // 5. SEED DES DEMANDES RÉALISTES POUR CHAQUE ACTEUR DE LA CHAÎNE
  const samuel = corePersonas[3];
  const tiangbo = corePersonas[2];
  const germaine = corePersonas[1];
  const david = corePersonas[0];

  const demandesToSeed = [
    // 1. Demande de Samuel KOUAME -> EN_ATTENTE_N1 (Ange Tiangbo Manager doit la voir !)
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
      motif: "Repos annuel légal - Période de congés programmée pour récupération.",
      statut: "EN_ATTENTE_N1",
      etapeCourante: 1,
      createdAt: new Date("2026-10-20T09:30:00Z"),
      validations: [],
    },

    // 2. Demande de Samuel KOUAME -> EN_ATTENTE_DRH (Ange Tiangbo a validé, Germaine YAO DRH doit arbitrer !)
    {
      numeroDemande: "DEM-2026-0002",
      salarieId: samuel.id,
      salarieNom: samuel.nom,
      salarieEmail: samuel.email,
      salariePoste: samuel.poste,
      salarieDirection: samuel.departement,
      managerId: tiangbo.id,
      typeId: typesMap.get("PERMISSION_ABSENCE")!,
      dateDebut: new Date("2026-11-04T08:00:00Z"),
      dateFin: new Date("2026-11-05T18:00:00Z"),
      nombreJours: 2.0,
      motif: "Permission d'absence pour obligations notariales et familiales.",
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
          motif: "Avis favorable accordé. Continuité de service organisée.",
          dateDecision: new Date("2026-10-19T10:00:00Z"),
        },
      ],
    },

    // 3. Demande d'Ange-Dieudonne TIANGBO -> EN_ATTENTE_DG (N+1 et DRH ont validé, David AKPA DG doit signer !)
    {
      numeroDemande: "DEM-2026-0003",
      salarieId: tiangbo.id,
      salarieNom: tiangbo.nom,
      salarieEmail: tiangbo.email,
      salariePoste: tiangbo.poste,
      salarieDirection: tiangbo.departement,
      managerId: david.id,
      typeId: typesMap.get("ORDRE_MISSION")!,
      dateDebut: new Date("2026-11-23T07:30:00Z"),
      dateFin: new Date("2026-11-27T18:00:00Z"),
      nombreJours: 5.0,
      destination: "Yamoussoukro / Bouaké - Sites Partenaires",
      moyenTransport: "Véhicule d'entreprise Agilly",
      fraisEstimes: 175000.0,
      motif: "Mission d'audit de conformité réglementaire RGPD et cartographie des traitements sur site.",
      statut: "EN_ATTENTE_DG",
      etapeCourante: 3,
      createdAt: new Date("2026-10-15T08:00:00Z"),
      validations: [
        {
          etape: 1,
          valideurId: david.id,
          valideurNom: david.nom,
          valideurRole: "SUPERIEUR_N1",
          decision: "APPROUVE",
          motif: "Mission stratégique pour la conformité Q4.",
          dateDecision: new Date("2026-10-16T11:20:00Z"),
        },
        {
          etape: 2,
          valideurId: germaine.id,
          valideurNom: germaine.nom,
          valideurRole: "DRH",
          decision: "APPROUVE",
          motif: "Prise en charge validée selon la grille des frais de mission.",
          dateDecision: new Date("2026-10-17T16:45:00Z"),
        },
      ],
    },

    // 4. Demande de Samuel KOUAME -> PERMISSION_EDITEE (Complètement validée avec Titre officiel)
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
      motif: "Démarches administratives consulaires urgentes.",
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
          motif: "Validé et consigné au registre des présences.",
          dateDecision: new Date("2026-10-11T14:30:00Z"),
        },
      ],
    },

    // 5. Demande de Samuel KOUAME -> RETOURNEE_EMPLOYE (Pour tester le cycle de modification et renvoi)
    {
      numeroDemande: "DEM-2026-0005",
      salarieId: samuel.id,
      salarieNom: samuel.nom,
      salarieEmail: samuel.email,
      salariePoste: samuel.poste,
      salarieDirection: samuel.departement,
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
          motif: "Merci de décaler la période de 48h afin d'assurer la livraison du sprint digital.",
          dateDecision: new Date("2026-10-13T15:00:00Z"),
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

  console.log(`✓ ${demandesToSeed.length} demandes réalistes insérées pour les 4 acteurs de la chaîne.`);
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
