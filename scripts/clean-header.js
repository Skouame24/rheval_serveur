const fs = require('fs');
const path = require('path');

const headerPath = path.resolve(__dirname, '..', '..', 'rheval', 'components', 'layout', 'Header.tsx');
let content = fs.readFileSync(headerPath, 'utf8');

// Supprime la section Rôles rapides / Changer de rôle dans le dropdown
content = content.replace(/\{\/\*\s*Rôles rapides\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*(\r?\n\s*<div className="py-1 border-b)/, '$1');

// Retirer les emojis dans les liens
content = content.replace('⚙️ Espace Pilotage RH', 'Espace Pilotage RH');
content = content.replace('👔 Espace Direction', 'Espace Direction');
content = content.replace('👥 Mon Équipe (Collaborateurs)', 'Mon Équipe');
content = content.replace('👤 Mon Espace Salarié', 'Mon Espace Salarié');

fs.writeFileSync(headerPath, content, 'utf8');
console.log('HEADER CLEANED SUCCESSFULLY');
