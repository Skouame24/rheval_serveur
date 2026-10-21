import { PrismaClient as PrismaEvalClient } from "@prisma/client";
import { PrismaClient as PrismaDemandesClient } from "@prisma-demandes/client";

const prismaEval = new PrismaEvalClient();
const prismaDemandes = new PrismaDemandesClient();

async function main() {
  console.log("🌱 Initialisation des Types de Demandes RH & Soldes...");

  // 1. TYPES DE DEMANDES OFFICIELLES
  const types = [
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
      libelle: "Congé Exceptionnel (Événement Familial)",
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
      code: "AUTRE_ABSENCE",
      libelle: "Autre Motif d'Absence",
      categorie: "AUTRE",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 1,
      dureeMaxJours: 30,
    },
  ];

  for (const t of types) {
    await prismaDemandes.types_demande.upsert({
      where: { code: t.code },
      update: t,
      create: t,
    });
  }
  console.log(`✓ ${types.length} types de demandes créés ou mis à jour.`);

  // 2. SOLDES DE CONGÉS 2026 POUR LES UTILISATEURS DU CACHE EVALUATION
  const users = await prismaEval.utilisateurs_cache.findMany();
  console.log(`Traitement des soldes pour ${users.length} utilisateur(s)...`);

  for (const u of users) {
    await prismaDemandes.soldes_conges.upsert({
      where: {
        salarieId_annee: {
          salarieId: u.id_microsoft,
          annee: 2026,
        },
      },
      update: {},
      create: {
        salarieId: u.id_microsoft,
        annee: 2026,
        joursAcquis: 26.0,
        joursPris: u.email.includes("ebenezer") ? 4.0 : 5.0,
        joursEnAttente: 0.0,
        reliquatN1: 3.5,
      },
    });
  }
  console.log(`✓ Soldes 2026 créés pour tous les salariés du référentiel.`);
}

main()
  .catch((e) => {
    console.error("Erreur de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaDemandes.$disconnect();
    await prismaEval.$disconnect();
  });

