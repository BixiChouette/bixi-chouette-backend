import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as crypto from 'crypto';
import csv from 'csv-parser';
import { BronzeTrip } from '../schemas/bronze-trip.schema';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectModel(BronzeTrip.name)
    private bronzeModel: Model<BronzeTrip>,
  ) { }

  async importCsv(cheminFichier: string, nomFichier: string) {
    console.log(`Importation continue de : ${nomFichier}`);

    if (!fs.existsSync(cheminFichier)) {
      console.error(`Fichier introuvable : ${cheminFichier}`);
      return;
    }

    const stream = fs.createReadStream(cheminFichier).pipe(csv());
    let paquet: any[] = [];
    let totalLus = 0;

    for await (const ligne of stream) {
      totalLus++;

      paquet.push({
        rawData: ligne,
        observation_hash: crypto.createHash('md5').update(JSON.stringify(ligne)).digest('hex'),
        source_file: nomFichier,
        imported_at: new Date(),
      });

      // Insertion par lots de 5 000 
      if (paquet.length >= 5000) {
        try {
          await this.bronzeModel.collection.insertMany(paquet, { ordered: false });
        } catch (e) {
          // Ignore les doublons déjà présents
        }
        console.log(`Lignes lues : ${totalLus}`);
        paquet = [];
      }

      // Arrêt automatique dès qu'on a 100 000 observations
      if (totalLus >= 100000) {
        break;
      }
    }

    // Insérer le dernier lot restant
    if (paquet.length > 0) {
      try {
        await this.bronzeModel.collection.insertMany(paquet, { ordered: false });
      } catch (e) {
        // Ignore les doublons
      }
    }

    console.log(`Terminé avec succès ! Total lignes lues : ${totalLus}`);
  }
}
