const fs = require('fs');
const path = require('path');

const authPath = path.resolve(__dirname, '..', '..', 'rheval', 'contexts', 'AuthContext.tsx');
let content = fs.readFileSync(authPath, 'utf8');

// 1. Purger le stockage local de toute trace de simulation ou override
content = content.replace(
  /if \(typeof window !== "undefined"\) \{[\s\S]*?localStorage\.removeItem\("agilly_user_role_override"\);[\s\S]*?\}/,
  `if (typeof window !== "undefined") {
      localStorage.removeItem("agilly_simulated_user");
      localStorage.removeItem("agilly_user_role_override");
      sessionStorage.clear();
    }`
);

// 2. Retirer la surcharge de rôle
content = content.replace(
  /\/\/ Surcharge de rôle éventuelle[\s\S]*?assignedRole = roleOverride;\s*\}\s*\}/,
  `// Pas de surcharge manuelle : rôle 100% dynamique
      if (typeof window !== "undefined") {
        localStorage.removeItem("agilly_user_role_override");
      }`
);

// 3. Dans sync-session, forcer la synchro sans bloquer 5 min et sans roleOverride
content = content.replace(
  /const isRecent = lastSyncTime && Date\.now\(\) - Number\(lastSyncTime\) < 300_000;\r?\n?\s*if \(!isRecent\) \{/,
  `if (true) {`
);

content = content.replace(
  /const roleOverride = typeof window !== "undefined" \? \(localStorage\.getItem\("agilly_user_role_override"\) as Role \| null\) : null;\r?\n?\s*const updated: User = \{\r?\n?\s*\.\.\.current,\r?\n?\s*role: roleOverride \|\| \(dbUser\.role as Role\) \|\| current\.role,/,
  `const updated: User = {
                  ...current,
                  role: (dbUser.role as Role) || current.role,`
);

fs.writeFileSync(authPath, content, 'utf8');
console.log('AUTH_CONTEXT CLEANED SUCCESSFULLY');
