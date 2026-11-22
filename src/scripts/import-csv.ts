import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ObservationsService } from '../observations/observations.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(ObservationsService);

  const cheminFichier = 'data/bixi.csv';
  const nomFichier = 'bixi.csv';

  await service.importCsv(cheminFichier, nomFichier);

  await app.close();
}

main();
