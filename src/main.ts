import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Préfixe global des routes
  app.setGlobalPrefix('api');

  // Versionnage de l'API : /api/v1
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

   // Validation globale des DTO
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();