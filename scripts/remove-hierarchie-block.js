const fs = require('fs');
const path = require('path');

const salariePath = path.resolve(__dirname, '..', '..', 'rheval', 'features', 'dashboard', 'components', 'DashboardSalarie.tsx');
let content = fs.readFileSync(salariePath, 'utf8');

// Supprime tout le bloc "Ma Ligne Hiérarchique & Référents RH"
content = content.replace(/\{\/\*\s*Ma Ligne Hiérarchique & Référents RH\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*(\r?\n\s*\{\/\*\s*Raccourcis d'actions Salarié\s*\*\/)/, '$1');

fs.writeFileSync(salariePath, content, 'utf8');
console.log('HIERARCHIE BLOCK REMOVED SUCCESSFULLY');

