// ============================================================
// common/directory.constants.ts
// Annuaire d'entreprise officiel Agilly RHEVAL
// Utilisé pour la résolution et l'auto-provisioning de la hiérarchie
// ============================================================

export interface DirectoryUser {
  id_microsoft: string;
  nom: string;
  email: string;
  poste: string;
  departement: string;
  role: string;
  managerId: string | null;
}

export const KNOWN_AGILLY_DIRECTORY: Record<string, DirectoryUser> = {
  // 1. PDG / Direction Générale (Sommet de la hiérarchie)
  'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a': {
    id_microsoft: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
    nom: 'Christian BAMBA',
    email: 'christian.bamba@agilly.net',
    poste: 'PDG & Directeur Général',
    departement: 'Direction Générale',
    role: 'N2',
    managerId: null,
  },

  // 2. Directrice des Ressources Humaines (DRH) -> Reporte au PDG
  'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269': {
    id_microsoft: 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269',
    nom: 'Germaine YAO',
    email: 'germaine.yao@agilly.net',
    poste: 'Directrice des Ressources Humaines',
    departement: 'Direction des Ressources Humaines',
    role: 'DRH',
    managerId: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
  },

  // 3. Assistante RH -> Reporte à la DRH
  'asst-rh-1144-4a48-bed2-72b525325c81': {
    id_microsoft: 'asst-rh-1144-4a48-bed2-72b525325c81',
    nom: 'Fatou DIOP',
    email: 'assistante.rh@agilly.net',
    poste: 'Assistante Ressources Humaines',
    departement: 'Direction des Ressources Humaines',
    role: 'RH',
    managerId: 'c970e84d-5fd5-4cb9-8c4e-7cccc14ad269',
  },

  // 4. Manager N+1 (Technique & Digital) -> Reporte au PDG
  'abe87afa-a80b-4a48-bed2-72b525325c81': {
    id_microsoft: 'abe87afa-a80b-4a48-bed2-72b525325c81',
    nom: 'Sevan AKOUMIA',
    email: 'sevan.akoumia@agilly.net',
    poste: 'Responsable Technique Digital',
    departement: 'Technique & Digital',
    role: 'N1',
    managerId: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
  },

  // 5. Manager N+1 (Services) -> Reporte au PDG
  '4f1e0426-b3f2-446b-9279-d830964cc8c8': {
    id_microsoft: '4f1e0426-b3f2-446b-9279-d830964cc8c8',
    nom: 'Ange Donatien EFFOLI',
    email: 'donatien.effoli@agilly.net',
    poste: 'Manager des Services',
    departement: 'Services',
    role: 'N1',
    managerId: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
  },

  // 6. Manager N+1 (IT Interne) -> Reporte au PDG
  '8eb2a86c-e426-49b6-ad49-50d19bf55ce5': {
    id_microsoft: '8eb2a86c-e426-49b6-ad49-50d19bf55ce5',
    nom: "Wilfried N'GUETTA",
    email: 'anicet.nguetta@agilly.net',
    poste: 'Responsable IT Interne',
    departement: 'IT',
    role: 'N1',
    managerId: 'aaf364d4-b002-4ae1-943d-d7ab5ec90a9a',
  },

  // 7. Salarié / Collaborateur -> Reporte à Sevan AKOUMIA
  '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb': {
    id_microsoft: '0a5c4c64-abdd-4f4f-a3af-00057ebdddfb',
    nom: 'Ebenezer Samuel KOUAME',
    email: 'ebenezer.kouame@agilly.net',
    poste: 'Développeur Fullstack',
    departement: 'Technique & Digital',
    role: 'SALARIE',
    managerId: 'abe87afa-a80b-4a48-bed2-72b525325c81',
  },
};
