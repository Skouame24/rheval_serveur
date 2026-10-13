const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showHierarchyTree() {
  console.log('\n================================================================');
  console.log('       ARBRE HIERARCHIQUE & EQUIPES - PORTAIL AGILLY');
  console.log('================================================================\n');

  const users = await prisma.utilisateurs_cache.findMany({
    orderBy: { nom: 'asc' },
  });

  if (users.length === 0) {
    console.log('Aucun utilisateur dans la base.');
    return;
  }

  // 1. Qui a des subordonnés ?
  const managerMap = new Map();
  const allManagerIds = new Set(users.map((u) => u.managerId).filter(Boolean));

  for (const mgrId of allManagerIds) {
    const subs = users.filter((sub) => sub.managerId === mgrId);
    if (subs.length > 0) {
      managerMap.set(mgrId, subs);
    }
  }

  console.log(`Nombre total d'utilisateurs : ${users.length}`);
  console.log(`Nombre de managers avec équipe : ${managerMap.size}\n`);

  console.log('----------------------------------------------------------------');
  console.log('1. VUE EN CASCADE : MANAGERS ET LEURS EQUIPES DIRECTES');
  console.log('----------------------------------------------------------------');

  for (const [mgrId, subs] of managerMap.entries()) {
    const mgr = users.find((u) => u.id_microsoft === mgrId);
    if (mgr) {
      console.log(`\n👔 MANAGER : ${mgr.nom}`);
      console.log(`   Poste : ${mgr.poste || 'Non renseigné'} | Rôle en base : ${mgr.role}`);
      console.log(`   Email : ${mgr.email} | ID Microsoft : ${mgr.id_microsoft}`);
    } else {
      console.log(`\n👔 MANAGER EN ATTENTE DE 1ERE CONNEXION (ID Microsoft: ${mgrId})`);
    }
    console.log(`   └── EQUIPE DIRECTE (${subs.length} collaborateur(s)) :`);

    for (const sub of subs) {
      const subHasTeam = managerMap.has(sub.id_microsoft);
      const subTeam = subHasTeam ? managerMap.get(sub.id_microsoft) : [];
      
      if (subHasTeam) {
        console.log(`       ⭐ [RESPONSABLE / N+1] ${sub.nom}`);
        console.log(`          Poste : ${sub.poste || 'Non renseigné'} | Rôle : ${sub.role}`);
        console.log(`          ⚠️  ATTENTION : CE RESPONSABLE A AUSSI UNE EQUIPE DE ${subTeam.length} COLLABORATEUR(S) :`);
        for (const subsub of subTeam) {
          console.log(`              └── 👤 ${subsub.nom} (${subsub.poste || 'Salarié'}) [${subsub.email}]`);
        }
      } else {
        console.log(`       • [SALARIE DIRECT] ${sub.nom} (${sub.poste || 'Salarié'}) [Rôle : ${sub.role}]`);
      }
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log('2. UTILISATEURS SANS EQUIPE DIRECTE ET SANS MANAGER DECLARE');
  console.log('----------------------------------------------------------------');
  const isolated = users.filter((u) => !u.managerId && !managerMap.has(u.id_microsoft));
  if (isolated.length === 0) {
    console.log('Aucun.');
  } else {
    for (const iso of isolated) {
      console.log(`• ${iso.nom} (${iso.poste || 'Sans poste'}) [Email: ${iso.email}]`);
    }
  }

  console.log('\n================================================================\n');
}

showHierarchyTree()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
