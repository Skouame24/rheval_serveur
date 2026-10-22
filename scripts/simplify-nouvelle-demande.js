const fs = require('fs');
const path = require('path');

const pagePath = path.resolve(__dirname, '..', '..', 'rheval', 'app', 'absences', 'nouvelle', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Ajouter la gestion d'un vrai input file
const fileUploadState = `  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fichiersList, setFichiersList] = useState<Array<{ nom: string; taille: string }>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        nom: f.name,
        taille: \`\${Math.round(f.size / 1024)} Ko\`,
      }));
      setFichiersList((prev) => [...prev, ...newFiles]);
      setFichiers((prev) => [...prev, ...newFiles.map((f) => f.nom)]);
    }
  };

  const removeFile = (idx: number) => {
    setFichiersList((prev) => prev.filter((_, i) => i !== idx));
    setFichiers((prev) => prev.filter((_, i) => i !== idx));
  };`;

// Insérer fileInputRef et les méthodes juste avant handleSubmit
content = content.replace(
  '  // Soumission\r?\n?  const handleSubmit',
  fileUploadState + '\n\n  // Soumission\n  const handleSubmit'
);

// Ajouter useRef dans les imports de react si nécessaire
if (!content.includes('useRef')) {
  content = content.replace('useState, useMemo', 'useState, useMemo, useRef');
}

// 2. Remplacer la zone de pièce jointe (prompt) par un vrai upload élégant et doux
const oldUploadSection = /\{\/\*\s*JUSTIFICATIF \(SI REQUIS OU CONSEILLÉ\)[\s\S]*?\{\/\*\s*ENGAGEMENT SUR L'HONNEUR\s*\*\/\}/;

const newUploadSection = `{/* PIÈCE JUSTIFICATIVE (FACULTATIF) */}
          <div className="p-4 bg-slate-50 border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Pièce justificative {motifActif.justificatifRequis ? "(Obligatoire)" : "(Facultatif)"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {motifActif.justificatifLabel || "Certificat médical, convocation, billet, etc."}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">PDF, JPEG, PNG (max 5 Mo)</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              multiple
              className="hidden"
            />

            {/* Liste des fichiers joints */}
            {fichiersList.length > 0 && (
              <div className="flex flex-col gap-2">
                {fichiersList.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-white border border-slate-200">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 shrink-0">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <span className="text-xs font-bold text-slate-800 truncate">{f.nom}</span>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">({f.taille})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-xs text-red-600 hover:text-red-800 font-bold px-2 py-0.5 hover:bg-red-50 cursor-pointer"
                      title="Supprimer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Zone de clic douce pour importer */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 hover:border-[#D96F1D] bg-white hover:bg-orange-50/50 p-4 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#D96F1D]">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span className="text-xs font-bold text-slate-800">
                Cliquez pour choisir un justificatif depuis votre ordinateur
              </span>
              <span className="text-[11px] text-slate-400">
                Format PDF, scan ou photo acceptés
              </span>
            </button>
          </div>

          {/* ENGAGEMENT SUR L'HONNEUR */}`;

content = content.replace(oldUploadSection, newUploadSection);

// 3. Remplacer la colonne de droite (complexe) par un Récapitulatif simple, clair et compréhensible
const oldRightCol = /\{\/\*\s*Colonne droite \(4 cols\) : Synthèse dynamique en direct\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*;\s*\}\s*export default function NouvelleDemandePage/;

const newRightCol = `{/* Colonne droite : Récapitulatif simple et limpide */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-5 flex flex-col gap-4 sticky top-20 text-xs">
          <div className="pb-3 border-b border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Synthèse de votre demande
            </span>
            <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">
              {motifActif.titre}
            </h3>
          </div>

          {/* 1. Résumé de la durée */}
          <div className="p-3 bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Durée demandée :</span>
              <span className="text-sm font-extrabold text-slate-900">
                {motifActif.isSortieHeures ? dureeHeuresMinutes?.text : \`\${joursOuvres} jour(s) ouvré(s)\`}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              <span>Dates :</span>
              <span className="font-bold text-slate-800">
                {dateDebut} {dateFin && dateFin !== dateDebut ? \`au \${dateFin}\` : ""}
              </span>
            </div>
          </div>

          {/* 2. Solde de congés (affiché clairement si congé annuel) */}
          {motifActif.impactSolde && (
            <div className="p-3 bg-blue-50/50 border border-blue-200 flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase text-blue-900">
                Votre Solde de Congés
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Solde actuel :</span>
                <span className="font-mono font-bold text-slate-900">{soldeConges.joursRestants} jours</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-blue-200 font-bold">
                <span className="text-slate-800">Nouveau solde après cette demande :</span>
                <span className={\`font-mono text-sm \${soldeSuffisant ? "text-emerald-700" : "text-red-700 font-extrabold"}\`}>
                  {soldeRestantApres} jours
                </span>
              </div>
              {!soldeSuffisant && (
                <div className="text-[10px] text-red-700 bg-red-50 p-2 border border-red-200 font-semibold mt-1">
                  Attention : votre solde est insuffisant pour couvrir cette durée.
                </div>
              )}
            </div>
          )}

          {/* 3. Circuit de validation limpide (étapes claires avec vraies flèches) */}
          <div className="p-3 bg-slate-50 border border-slate-200 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase text-slate-500">
              Circuit de validation
            </span>
            <div className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                <span className="font-bold text-slate-800">Avis de votre Manager N+1</span>
              </div>
              <div className="ml-2.5 h-3 border-l-2 border-slate-300" />
              <div className="flex items-center gap-2 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">2</span>
                <span className="text-slate-600">Vérification de la Direction RH</span>
              </div>
              {!circuitCourt && (
                <>
                  <div className="ml-2.5 h-3 border-l-2 border-slate-300" />
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">3</span>
                    <span className="text-slate-600">Accord final de la Direction</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NouvelleDemandePage`;

content = content.replace(oldRightCol, newRightCol);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('NOUVELLE DEMANDE PAGE SIMPLIFIED SUCCESSFULLY');
