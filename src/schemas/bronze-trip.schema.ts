import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
