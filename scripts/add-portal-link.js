const fs = require('fs');
const path = require('path');

// 1. Mise à jour de Sidebar.tsx
const sidebarPath = path.resolve(__dirname, '..', '..', 'rheval', 'components', 'layout', 'Sidebar.tsx');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

const portalBlockSidebar = `
      {/* ── RETOUR AU PORTAIL AGILLY ── */}
      <div className="px-4 py-2 border-t border-slate-200/80 bg-slate-50/70">
        <Link
          href="/portail"
          className={\`
            flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#F0822A] hover:bg-orange-50 border border-slate-200 hover:border-[#F0822A]/40 transition-all rounded-none
            \${collapsed ? 'justify-center p-2.5' : 'justify-start'}
          \`}
          title="Retourner au Portail des Applications Agilly"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500 group-hover:text-[#F0822A] shrink-0">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          {!collapsed && <span>Portail Applications</span>}
        </Link>
      </div>
`;

if (!sidebarContent.includes('href="/portail"')) {
  sidebarContent = sidebarContent.replace(
    '</nav>',
    '</nav>' + portalBlockSidebar
  );
  fs.writeFileSync(sidebarPath, sidebarContent, 'utf8');
  console.log('PORTAL LINK ADDED TO SIDEBAR');
} else {
  console.log('PORTAL LINK ALREADY IN SIDEBAR');
}

// 2. Mise à jour de Header.tsx
const headerPath = path.resolve(__dirname, '..', '..', 'rheval', 'components', 'layout', 'Header.tsx');
let headerContent = fs.readFileSync(headerPath, 'utf8');

// Bouton direct Portail dans la barre supérieure à côté du titre
const portalBtnHeader = `
        <Link
          href="/portail"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#F0822A] bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-[#F0822A]/40 transition-all rounded-none shadow-2xs"
          title="Retourner au Portail des Applications Agilly"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Portail Agilly</span>
        </Link>
`;

if (!headerContent.includes('title="Retourner au Portail des Applications Agilly"')) {
  headerContent = headerContent.replace(
    '<h1 className="text-lg font-bold text-slate-900 tracking-tight m-0">\r?\n?\\s*\\{pageTitle \\|\\| "AGILLY RHEVAL"\\}\r?\n?\\s*<\\/h1>',
    `<h1 className="text-lg font-bold text-slate-900 tracking-tight m-0">
          {pageTitle || "AGILLY RHEVAL"}
        </h1>` + portalBtnHeader
  );

  // Également dans le menu déroulant du profil
  const portalDropdownItem = `
                <Link
                  href="/portail"
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#F0822A] hover:bg-orange-50 transition-colors border-b border-slate-100"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Retour au Portail des Applications</span>
                </Link>
  `;

  headerContent = headerContent.replace(
    '<div className="py-1">',
    portalDropdownItem + '\n              <div className="py-1">'
  );

  fs.writeFileSync(headerPath, headerContent, 'utf8');
  console.log('PORTAL LINK ADDED TO HEADER');
} else {
  console.log('PORTAL LINK ALREADY IN HEADER');
}
