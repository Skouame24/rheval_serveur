export function mapUserToDto(u: any, n1User?: any, n2User?: any, drhUser?: any) {
  if (!u) return null;

  const parts = (u.nom || '').trim().split(' ');
  const prenom = parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
  const nom = parts.length > 1 ? parts.slice(-1).join(' ') : u.nom;

  return {
    id: u.id_microsoft,
    nom: nom || u.nom,
    prenom: prenom || '',
    email: u.email,
    role: u.role || 'SALARIE',
    poste: u.poste || '',
    departement: u.departement || '',
    telephone: u.telephone || '',
    isCodir: u.isCodir || false,
    managerId: u.managerId || null,
    n1: n1User
      ? (() => {
          const p = (n1User.nom || '').trim().split(' ');
          return {
            id: n1User.id_microsoft,
            nom: p.length > 1 ? p.slice(-1).join(' ') : n1User.nom,
            prenom: p.length > 1 ? p.slice(0, -1).join(' ') : '',
            email: n1User.email,
            role: n1User.role || 'N1',
            poste: n1User.poste || 'Manager N+1',
          };
        })()
      : undefined,
    n2: n2User
      ? (() => {
          const p = (n2User.nom || '').trim().split(' ');
          return {
            id: n2User.id_microsoft,
            nom: p.length > 1 ? p.slice(-1).join(' ') : n2User.nom,
            prenom: p.length > 1 ? p.slice(0, -1).join(' ') : '',
            email: n2User.email,
            role: n2User.role || 'N2',
            poste: n2User.poste || 'Directeur N+2',
          };
        })()
      : undefined,
    drh: drhUser
      ? (() => {
          const p = (drhUser.nom || '').trim().split(' ');
          return {
            id: drhUser.id_microsoft,
            nom: p.length > 1 ? p.slice(-1).join(' ') : drhUser.nom,
            prenom: p.length > 1 ? p.slice(0, -1).join(' ') : '',
            email: drhUser.email,
            role: drhUser.role || 'DRH',
            poste: drhUser.poste || 'Directrice des Ressources Humaines',
          };
        })()
      : undefined,
    createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: u.updatedAt ? new Date(u.updatedAt).toISOString() : new Date().toISOString(),
  };
}
