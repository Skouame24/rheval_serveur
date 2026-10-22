const fs = require('fs');
const path = require('path');

const salariePath = path.resolve(__dirname, '..', '..', 'rheval', 'features', 'dashboard', 'components', 'DashboardSalarie.tsx');
let content = fs.readFileSync(salariePath, 'utf8');

// Remplacer les emojis par des icones corporate sobres
content = content.replace('<span className="text-base">👥</span>', `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>`);

content = content.replace('<div className="w-9 h-9 bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center font-black text-xs shrink-0">\r?\n?\\s*👔\r?\n?\\s*</div>', `
            <div className="w-9 h-9 bg-purple-100 border border-purple-300 text-purple-800 flex items-center justify-center font-black text-xs shrink-0">
              <span className="font-mono text-xs font-bold">N+1</span>
            </div>`);

content = content.replace('<div className="w-9 h-9 bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-black text-xs shrink-0">\r?\n?\\s*👑\r?\n?\\s*</div>', `
            <div className="w-9 h-9 bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-black text-xs shrink-0">
              <span className="font-mono text-xs font-bold">N+2</span>
            </div>`);

content = content.replace('<div className="w-9 h-9 bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0">\r?\n?\\s*💼\r?\n?\\s*</div>', `
            <div className="w-9 h-9 bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xs shrink-0">
              <span className="font-mono text-xs font-bold">DRH</span>
            </div>`);

// Remplacer "👑 DIRIGEANT ULTIME — NON ÉVALUÉ"
content = content.replace('👑 DIRIGEANT ULTIME — NON ÉVALUÉ', 'DIRIGEANT — NON ASSUJETTI');

fs.writeFileSync(salariePath, content, 'utf8');
console.log('DASHBOARD_SALARIE CLEANED SUCCESSFULLY');
