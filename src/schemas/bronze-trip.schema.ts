import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class BronzeTrip {
  // Données brutes d'une ligne 
  @Prop({ type: Object, required: true })
  raw_data: any;

  // Identifiant unique 
  @Prop({ required: true, unique: true })
  observation_hash: string;

  // Nom du fichier importé
  @Prop({ required: true })
  source_file: string;

  // Date de l'importation
  @Prop({ default: Date.now })
  imported_at: Date;
}

export const BronzeTripSchema = SchemaFactory.createForClass(BronzeTrip);
