const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== Fixation des Objectifs 2026 pour chaque collaborateur ===\n');

  const cycle = await prisma.cycles_evaluation.findFirst({
    where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
    orderBy: { annee: 'desc' },
  });

  if (!cycle) {
    console.error('Aucun cycle actif trouvé !');
    process.exit(1);
  }
  console.log(`Cycle actif : ${cycle.libelle} (${cycle.id})`);

  // Définition des collaborateurs et de leurs objectifs respectifs
  const collabData = [
    {
      salarieId: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb', // Ebenezer Samuel KOUAME
      managerId: 'abe87afa-a80b-4a48-bed2-72b525325c81', // Jean-Marc KOFFI
      nom: 'Ebenezer Samuel KOUAME',
      poste: 'Développeur Fullstack',
      objectifs: [
        {
          id: 'obj-ebenezer-1',
          intitule: 'Conception et livraison de l\'architecture Portail RH & intégration SSO Entra ID',
          description: 'Garantir une authentification unifiée et la synchronisation fluide des profils',
          ponderation: 40,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Livraison complète sans régression et avance sur planning' },
            { noteMin: 15, noteMax: 17, intitule: 'Livraison conforme au cahier des charges dans les délais' },
            { noteMin: 12, noteMax: 14, intitule: 'Livraison avec retards mineurs rapidement résolus' },
            { noteMin: 0, noteMax: 11, intitule: 'Retard important ou non-conformité' },
          ],
        },
        {
          id: 'obj-ebenezer-2',
          intitule: 'Optimisation de la latence API et performance du système de scoring',
          description: 'Maintenir un temps de réponse moyen inférieur à 150ms sur les requêtes SQL Prisma',
          ponderation: 30,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Temps de réponse stabilisé sous 100ms avec tests de charge validés' },
            { noteMin: 15, noteMax: 17, intitule: 'Temps de réponse moyen sous 150ms' },
            { noteMin: 12, noteMax: 14, intitule: 'Temps de réponse entre 150ms et 250ms' },
            { noteMin: 0, noteMax: 11, intitule: 'Temps de réponse supérieur à 250ms' },
          ],
        },
        {
          id: 'obj-ebenezer-3',
          intitule: 'Documentation technique, manuel d\'architecture et support projet',
          description: 'Rédiger une documentation complète et accompagner la prise en main par les équipes',
          ponderation: 30,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Documentation exemplaire et formation active des équipes' },
            { noteMin: 15, noteMax: 17, intitule: 'Documentation complète et à jour' },
            { noteMin: 12, noteMax: 14, intitule: 'Documentation partielle' },
            { noteMin: 0, noteMax: 11, intitule: 'Absence de documentation' },
          ],
        },
      ],
    },
    {
      salarieId: 'abe87afa-a80b-4a48-bed2-72b525325c81', // Jean-Marc KOFFI
      managerId: 'dir-digital-8822-4a48-bed2-72b525325c81', // Didier KABLAN
      nom: 'Jean-Marc KOFFI',
      poste: 'Responsable Pôle Digital & Web',
      objectifs: [
        {
          id: 'obj-resp-1',
          intitule: 'Pilotage de la livraison des chantiers digitaux et respect des jalons',
          description: 'Assurer la livraison des projets applicatifs dans le respect des délais et du budget',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: '100% des jalons atteints avec excellence opérationnelle' },
            { noteMin: 15, noteMax: 17, intitule: 'Jalons majeurs respectés' },
            { noteMin: 12, noteMax: 14, intitule: 'Quelques décalages résolus sans impact client' },
            { noteMin: 0, noteMax: 11, intitule: 'Retards répétés sur les livrables' },
          ],
        },
        {
          id: 'obj-resp-2',
          intitule: 'Management, accompagnement et montée en compétences de l\'équipe technique',
          description: 'Suivi individuel régulier, transmission des compétences et fluidité du travail d\'équipe',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Équipe autonome, motivée et objectifs individuels dépassés' },
            { noteMin: 15, noteMax: 17, intitule: 'Suivi managérial régulier et efficace' },
            { noteMin: 12, noteMax: 14, intitule: 'Suivi managérial intermittent' },
            { noteMin: 0, noteMax: 11, intitule: 'Déficit d\'encadrement' },
          ],
        },
      ],
    },
    {
      salarieId: 'dir-digital-8822-4a48-bed2-72b525325c81', // Didier KABLAN
      managerId: 'drh-agilly-9933-4a48-bed2-72b525325c81', // Aissatou BAH
      nom: 'Didier KABLAN',
      poste: 'Directeur des SI & Digital',
      objectifs: [
        {
          id: 'obj-dir-1',
          intitule: 'Transformation digitale du groupe et modernisation des infrastructures SI',
          description: 'Aligner la feuille de route informatique sur les priorités stratégiques de l\'entreprise',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Transformation réussie avec gain d\'efficience mesurable' },
            { noteMin: 15, noteMax: 17, intitule: 'Objectifs de transformation atteints selon la feuille de route' },
            { noteMin: 12, noteMax: 14, intitule: 'Réalisations partielles sur la période' },
            { noteMin: 0, noteMax: 11, intitule: 'Retard sur les chantiers stratégiques' },
          ],
        },
        {
          id: 'obj-dir-2',
          intitule: 'Gouvernance de la sécurité, disponibilité des plateformes (99.9%) et maîtrise des coûts',
          description: 'Garantir la résilience des systèmes et l\'optimisation des investissements IT',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Zéro faille critique, SLA > 99.9% et optimisation budgétaire' },
            { noteMin: 15, noteMax: 17, intitule: 'SLA 99.9% atteint et conformité assurée' },
            { noteMin: 12, noteMax: 14, intitule: 'Quelques incidents mineurs traités rapidement' },
            { noteMin: 0, noteMax: 11, intitule: 'Indisponibilités notables' },
          ],
        },
      ],
    },
    {
      salarieId: 'asst-rh-1144-4a48-bed2-72b525325c81', // Fatou DIOP
      managerId: 'drh-agilly-9933-4a48-bed2-72b525325c81', // Aissatou BAH
      nom: 'Fatou DIOP',
      poste: 'Assistante Ressources Humaines',
      objectifs: [
        {
          id: 'obj-asst-1',
          intitule: 'Gestion administrative du personnel, dossiers salariés et suivi rigoureux de la paie',
          description: 'Tenue à jour continue des dossiers et transmission sans retard des éléments variables',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Dossiers tenus à la perfection, zéro anomalie de paie' },
            { noteMin: 15, noteMax: 17, intitule: 'Gestion rigoureuse et respect des échéances' },
            { noteMin: 12, noteMax: 14, intitule: 'Quelques retards mineurs de transmission' },
            { noteMin: 0, noteMax: 11, intitule: 'Anomalies ou retards récurrents' },
          ],
        },
        {
          id: 'obj-asst-2',
          intitule: 'Coordination logistique des formations internes et accompagnement onboarding des recrues',
          description: 'Organiser le parcours d\'intégration et assurer la logistique des sessions de formation',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Taux de satisfaction des sessions > 95% et onboarding réussi' },
            { noteMin: 15, noteMax: 17, intitule: 'Parcours d\'intégration fluide et sessions bien coordonnées' },
            { noteMin: 12, noteMax: 14, intitule: 'Quelques aléas logistiques sans gravité' },
            { noteMin: 0, noteMax: 11, intitule: 'Déficit d\'organisation' },
          ],
        },
      ],
    },
  ];

  for (const c of collabData) {
    const ficheId = `fic-${c.salarieId.substring(0, 8)}-2026`;

    // 1. Création de la fiche d'évaluation au statut AUTO_EVALUATION
    const fiche = await prisma.fiches_evaluation.upsert({
      where: { id: ficheId },
      update: {
        statut: 'AUTO_EVALUATION',
        cycleId: cycle.id,
        salarieId: c.salarieId,
        updatedAt: new Date(),
      },
      create: {
        id: ficheId,
        statut: 'AUTO_EVALUATION',
        cycleId: cycle.id,
        salarieId: c.salarieId,
        updatedAt: new Date(),
      },
    });

    // 2. Nettoyage et insertion des objectifs & critères
    await prisma.objectifs.deleteMany({ where: { ficheId: fiche.id } });

    for (const obj of c.objectifs) {
      const createdObj = await prisma.objectifs.create({
        data: {
          id: obj.id,
          ficheId: fiche.id,
          intitule: obj.intitule,
          description: obj.description,
          ponderation: obj.ponderation,
          updatedAt: new Date(),
        },
      });

      // Critères
      if (obj.criteres && obj.criteres.length > 0) {
        await prisma.indicateurs.createMany({
          data: obj.criteres.map((crit, idx) => ({
            id: `ind-${createdObj.id}-${idx}`,
            objectifId: createdObj.id,
            intitule: crit.intitule,
            noteMin: crit.noteMin,
            noteMax: crit.noteMax,
          })),
        });
      }
    }

    // 3. Historique : Objectifs fixés par le manager
    await prisma.historique_evaluation.create({
      data: {
        id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        ficheId: fiche.id,
        statutFiche: 'AUTO_EVALUATION',
        action: 'FIXATION_OBJECTIFS_VALIDEE',
        commentaire: `Objectifs de performance fixés par le manager et transmis pour auto-évaluation.`,
        effectueParId: c.managerId,
        dateAction: new Date(),
      },
    });

    console.log(`✓ Objectifs fixés pour ${c.nom} (${c.poste}) -> Statut : AUTO_EVALUATION (prêt pour auto-évaluation)`);
  }

  console.log('\n=== Tous les objectifs sont fixés et prêts pour l\'auto-évaluation ! ===');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

