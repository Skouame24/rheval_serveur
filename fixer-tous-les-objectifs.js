const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== FIXATION DES OBJECTIFS PAR TOUS LES MANAGERS (CYCLE 2026) ===\n');

  const cycle = await prisma.cycles_evaluation.findFirst({
    where: { statut: { in: ['ACTIF', 'EN_COURS'] } },
    orderBy: { annee: 'desc' },
  });

  if (!cycle) {
    console.error('Erreur : Aucun cycle actif trouvé !');
    process.exit(1);
  }
  console.log(`Campagne active : ${cycle.libelle} (${cycle.id})`);

  // Nettoyage préventif pour garantir 0 doublon
  await prisma.evaluations.deleteMany({});
  await prisma.indicateurs.deleteMany({});
  await prisma.objectifs.deleteMany({});
  await prisma.historique_evaluation.deleteMany({});
  await prisma.fiches_evaluation.deleteMany({});

  const simulations = [
    {
      salarieId: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb', // Ebenezer Samuel KOUAME
      managerId: 'abe87afa-a80b-4a48-bed2-72b525325c81', // Jean-Marc KOFFI
      collaborateurNom: 'Ebenezer Samuel KOUAME',
      managerNom: 'Jean-Marc KOFFI',
      ficheId: 'fic-0a5c4c64-2026',
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
      collaborateurNom: 'Jean-Marc KOFFI',
      managerNom: 'Didier KABLAN',
      ficheId: 'fic-abe87afa-2026',
      objectifs: [
        {
          id: 'obj-jeanmarc-1',
          intitule: 'Supervision technique, respect des jalons et qualité des livrables de l\'équipe',
          description: 'Piloter les sprints de développement et garantir le zéro bug critique en production',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: '100% des jalons atteints sans retard avec niveau de qualité exceptionnel' },
            { noteMin: 15, noteMax: 17, intitule: 'Jalons majeurs respectés et équipe alignée' },
            { noteMin: 12, noteMax: 14, intitule: 'Retards mineurs sur certains livrables sans impact bloquant' },
            { noteMin: 0, noteMax: 11, intitule: 'Écarts réguliers et manque d\'anticipation' },
          ],
        },
        {
          id: 'obj-jeanmarc-2',
          intitule: 'Disponibilité des infrastructures cloud et montée en compétences de l\'équipe',
          description: 'Assurer un taux de disponibilité > 99.5% et animer les revues d\'ingénierie hebdomadaires',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Disponibilité > 99.9% et montée en autonomie exemplaire' },
            { noteMin: 15, noteMax: 17, intitule: 'Disponibilité > 99.5% et animation régulière' },
            { noteMin: 12, noteMax: 14, intitule: 'Disponibilité entre 98% et 99.5%' },
            { noteMin: 0, noteMax: 11, intitule: 'Disponibilité < 98% ou incidents non maîtrisés' },
          ],
        },
      ],
    },
    {
      salarieId: 'dir-digital-8822-4a48-bed2-72b525325c81', // Didier KABLAN
      managerId: 'drh-agilly-9933-4a48-bed2-72b525325c81', // Aissatou BAH
      collaborateurNom: 'Didier KABLAN',
      managerNom: 'Aissatou BAH',
      ficheId: 'fic-dirdigit-2026',
      objectifs: [
        {
          id: 'obj-didier-1',
          intitule: 'Déploiement stratégique des solutions numériques et adoption par les métiers',
          description: 'Piloter le schéma directeur des systèmes d\'information et l\'adhésion utilisateur',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Taux d\'adoption > 90% et alignement stratégique total' },
            { noteMin: 15, noteMax: 17, intitule: 'Taux d\'adoption conforme aux prévisions (> 75%)' },
            { noteMin: 12, noteMax: 14, intitule: 'Adoption mitigée avec résistance dans certains services' },
            { noteMin: 0, noteMax: 11, intitule: 'Faible adoption ou blocages non résolus' },
          ],
        },
        {
          id: 'obj-didier-2',
          intitule: 'Gouvernance de la sécurité des données, conformité RGPD et maîtrise budgétaire',
          description: 'Assurer la sécurité des applications d\'entreprise et le respect des coûts d\'exploitation',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Audit de sécurité sans faille et économies budgétaires constatées' },
            { noteMin: 15, noteMax: 17, intitule: 'Conformité totale et budget respecté à 100%' },
            { noteMin: 12, noteMax: 14, intitule: 'Dépassement budgétaire inférieur à 5%' },
            { noteMin: 0, noteMax: 11, intitule: 'Incidents de conformité ou dérive budgétaire' },
          ],
        },
      ],
    },
    {
      salarieId: 'asst-rh-1144-4a48-bed2-72b525325c81', // Fatou DIOP
      managerId: 'drh-agilly-9933-4a48-bed2-72b525325c81', // Aissatou BAH
      collaborateurNom: 'Fatou DIOP',
      managerNom: 'Aissatou BAH',
      ficheId: 'fic-asstrh11-2026',
      objectifs: [
        {
          id: 'obj-fatou-1',
          intitule: 'Gestion rigoureuse des dossiers administratifs et préparation des campagnes RH',
          description: 'Tenue irréprochable des fiches salariés, des contrats et des plannings de formation',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Dossiers 100% à jour, zéro retard et conformité auditable' },
            { noteMin: 15, noteMax: 17, intitule: 'Dossiers tenus dans les règles et délais respectés' },
            { noteMin: 12, noteMax: 14, intitule: 'Retards ponctuels régularisés sous 48h' },
            { noteMin: 0, noteMax: 11, intitule: 'Dossiers incomplets ou manquements répétés' },
          ],
        },
        {
          id: 'obj-fatou-2',
          intitule: 'Accompagnement de l\'intégration des nouvelles recrues et logistique des formations',
          description: 'Coordonner le parcours d\'accueil et le suivi opérationnel des plans de formation',
          ponderation: 50,
          criteres: [
            { noteMin: 18, noteMax: 20, intitule: 'Taux de satisfaction des sessions > 95% et onboarding parfait' },
            { noteMin: 15, noteMax: 17, intitule: 'Parcours d\'intégration fluide et sessions bien coordonnées' },
            { noteMin: 12, noteMax: 14, intitule: 'Quelques aléas logistiques sans gravité' },
            { noteMin: 0, noteMax: 11, intitule: 'Déficit d\'organisation ou plaintes formulées' },
          ],
        },
      ],
    },
  ];

  for (const s of simulations) {
    // Statut selon le workflow :
    // - Si le collaborateur a un N+2 (ex: Ebenezer dont le N+1 est Jean-Marc et N+2 Didier) :
    //   -> VALIDATION_OBJECTIFS_N2 (en attente de validation du N+2)
    // - Sinon (Jean-Marc sous Didier, Didier sous Aissatou, Fatou sous Aissatou) :
    //   -> VALIDATION_OBJECTIFS_SALARIE (en attente de confirmation par le salarié)
    const initialStatut = s.salarieId === '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb'
      ? 'VALIDATION_OBJECTIFS_N2'
      : 'VALIDATION_OBJECTIFS_SALARIE';

    // 1. Créer la fiche unique d'évaluation
    const fiche = await prisma.fiches_evaluation.create({
      data: {
        id: s.ficheId,
        statut: initialStatut,
        cycleId: cycle.id,
        salarieId: s.salarieId,
        updatedAt: new Date(),
      },
    });

    // 2. Insérer les objectifs et les critères
    for (const obj of s.objectifs) {
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

    // 3. Trace historique : Manager a fixé et validé les objectifs
    await prisma.historique_evaluation.create({
      data: {
        id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        ficheId: fiche.id,
        statutFiche: initialStatut,
        action: 'FIXATION_OBJECTIFS_VALIDEE',
        commentaire: `Objectifs de performance fixés et validés par ${s.managerNom}. Transmis dans le workflow (${initialStatut}).`,
        effectueParId: s.managerId,
        dateAction: new Date(),
      },
    });

    console.log(`✓ [${s.managerNom}] a fixé les objectifs de [${s.collaborateurNom}] -> Fiche: ${s.ficheId} (${initialStatut})`);
  }

  const count = await prisma.fiches_evaluation.count();
  console.log(`\n=== SUCCÈS : ${count} FICHES CRÉÉES ET TRANSMISES AUX SALARIÉS (EXACTEMENT 1 PAR COLLABORATEUR) ===`);
}

main()
  .catch((e) => {
    console.error('Erreur:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

