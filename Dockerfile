# Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation complète des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Génération Prisma et compilation NestJS
RUN npx prisma generate
RUN npm run build

# Étape 2 : Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copie des fichiers requis pour la prod
COPY package*.json ./
COPY prisma ./prisma/

# Installation uniquement des dépendances de production
RUN npm ci --omit=dev

# Copie du build compilé et de prisma généré
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3001

CMD ["node", "dist/main.js"]
