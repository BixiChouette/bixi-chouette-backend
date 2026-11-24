import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'gold_stats' })
export class GoldStat {
  @Prop({ required: true, unique: true })
  category!: string;

  @Prop({ type: SchemaTypes.Mixed, required: true })
  value!: Record<string, number>;
}

export const GoldStatSchema =
  SchemaFactory.createForClass(GoldStat);