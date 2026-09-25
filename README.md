# AGILLY RHEVAL — Backend API

Backend officiel NestJS & Prisma pour la plateforme de gestion des évaluations annuelles et calcul des bonus du groupe Agilly.

## 🚀 Caractéristiques

- **Framework** : NestJS (Node.js & TypeScript)
- **Base de données** : PostgreSQL (Neon) via Prisma ORM
- **Authentification** : SSO Microsoft Entra ID (Azure AD) + JWT
- **Documentation** : Swagger / OpenAPI (`/api/docs`)
- **Modules** :
  - `auth` : Synchronisation des sessions SSO & authentification
  - `employees` : Annuaire collaborateurs & hiérarchie N+1/N+2
  - `cycles` : Gestion des campagnes annuelles d'évaluation
  - `objectifs` : Fixation & suivi des objectifs collaborateurs
  - `evaluations` : Workflow d'évaluation (salarié, manager N+1, N+2, RH)
  - `rh` : Pilotage RH, gestion des arbitrages, calcul des primes/bonus & export Excel
  - `admin` : Gestion des accès & journal d'audit

## ⚙️ Prérequis & Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Skouame24/rheval_serveur.git
cd rheval_serveur

# 2. Configurer les variables d'environnement
cp .env.example .env
# Renseigner DATABASE_URL, JWT_SECRET, etc.

# 3. Installer les dépendances
npm install

# 4. Compiler le projet
npm run build

# 5. Démarrer le serveur
npm run start:prod
# Ou en dev : npm run start:dev
```

## 🐳 Déploiement Docker

```bash
docker build -t rheval-back .
docker run -d -p 3001:3001 --env-file .env --name rheval-api rheval-back
```
