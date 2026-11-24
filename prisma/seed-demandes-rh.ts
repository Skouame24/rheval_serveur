import { PrismaClient as PrismaDemandesClient } from "@prisma-demandes/client";

const prismaDemandes = new PrismaDemandesClient();

async function main() {
  console.log("🌱 Initialisation des types de demandes RH...");

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
      code: "INTERVENTION_TERRAIN",
      libelle: "Fiche d'Intervention Technique",
      categorie: "MISSION",
      necessiteSolde: false,
      pieceRequise: false,
      delaiMinJours: 0,
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

  // Les soldes de congés ne sont JAMAIS inventés ici : ils sont saisis ou
  // ajustés par la RH (PUT /soldes-conges/collaborateur/:id/ajuster) à partir des données réelles.
}

main()
  .catch((e) => {
    console.error("Erreur de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaDemandes.$disconnect();
  });

