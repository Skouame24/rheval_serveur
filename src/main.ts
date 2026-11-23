import * as dotenv from 'dotenv';
import * as path from 'path';

// Charge .env depuis cwd et depuis le dossier racine du projet (relatif à dist/)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { secretApi, simulationAutorisee } from './common/auth/auth.constants';

async function bootstrap() {
  const logger = new Logger('AGILLY-RHEVAL-BACKEND');
  const app = await NestFactory.create(AppModule);

  // Validation globale des payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Préfixe global /api pour correspondre au frontend
  app.setGlobalPrefix('api');

  // Le secret partagé avec le portail est obligatoire (arrêt immédiat sinon)
  secretApi();
  if (simulationAutorisee()) {
    logger.warn('⚠️  AUTORISER_SIMULATION=true : simulateur de profils actif. NE JAMAIS activer en production.');
  }

  // CORS : uniquement les origines déclarées. En pratique, le navigateur passe
  // par le proxy du portail (même origine) : CORS ne sert qu'en développement.
  const frontendOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Appels serveur à serveur (proxy du portail, cron) : pas d'en-tête Origin
      if (!origin) return callback(null, true);
      return callback(null, frontendOrigins.includes(origin));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Documentation Swagger : développement uniquement (ou ACTIVER_SWAGGER=true)
  const swaggerActif = process.env.NODE_ENV !== 'production' || process.env.ACTIVER_SWAGGER === 'true';
  if (swaggerActif) {
    const config = new DocumentBuilder()
      .setTitle('AGILLY RHEVAL API')
      .setDescription('Backend officiel de gestion des évaluations annuelles et bonus')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT || 3001;
  // 0.0.0.0 est indispensable pour les conteneurs Docker / VPS / Cloud
  await app.listen(port, '0.0.0.0');

  logger.log(`=======================================================`);
  logger.log(`🚀 AGILLY RHEVAL BACKEND démarré sur port ${port} (0.0.0.0:${port}/api)`);
  if (swaggerActif) logger.log(`📑 Documentation Swagger : http://localhost:${port}/api/docs`);
  logger.log(`=======================================================`);
}

bootstrap();
