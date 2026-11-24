import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

<<<<<<< HEAD
@Schema({ collection: 'bronze_trips' })
export class BronzeTrip {
  // Données originales du trajet BIXI
  @Prop({ type: Object, required: true })
  rawData!: Record<string, unknown>;

  // Empreinte permettant de détecter les doublons
  @Prop({ required: true, unique: true })
  observation_hash!: string;

  // Nom du fichier CSV source
  @Prop({ required: true })
  source_file!: string;

  // Date d'importation
  @Prop({ type: Date, default: Date.now })
  imported_at!: Date;
}

export const BronzeTripSchema =
  SchemaFactory.createForClass(BronzeTrip);
=======

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
>>>>>>> 8492801f47fc1f5863bbab265b0772aae6b8442f
