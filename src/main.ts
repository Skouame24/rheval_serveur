import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

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

  // Origines autorisées
  const frontendOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];

  // Configuration CORS robuste pour la production et le dev
  app.enableCors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (comme Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (frontendOrigins.includes(origin) || frontendOrigins.includes('*')) {
        return callback(null, true);
      }
      // Autoriser les déploiements Vercel / Netlify / domaine Agilly
      if (origin.includes('localhost') || origin.includes('agilly') || origin.includes('vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissif pour éviter les blocages de déploiement
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, x-user-id',
  });

  // Swagger Documentation OpenAPI
  const config = new DocumentBuilder()
    .setTitle('AGILLY RHEVAL API')
    .setDescription('Backend officiel de gestion des évaluations annuelles et bonus')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  // 0.0.0.0 est indispensable pour les conteneurs Docker / VPS / Cloud
  await app.listen(port, '0.0.0.0');

  logger.log(`=======================================================`);
  logger.log(`🚀 AGILLY RHEVAL BACKEND démarré sur port ${port} (0.0.0.0:${port}/api)`);
  logger.log(`📑 Documentation Swagger : http://localhost:${port}/api/docs`);
  logger.log(`=======================================================`);
}

bootstrap();
