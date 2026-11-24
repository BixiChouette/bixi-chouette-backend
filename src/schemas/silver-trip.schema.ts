import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'silver_trips' })
export class SilverTrip {
  @Prop({ required: true })
  start_station!: string;

  @Prop()
  start_arrondissement?: string;

  @Prop({ required: true })
  end_station!: string;

  @Prop()
  end_arrondissement?: string;

  @Prop({ type: Date, required: true })
  start_time!: Date;

  @Prop({ type: Date, required: true })
  end_time!: Date;

  @Prop({ type: Number, required: true, min: 0 })
  duration!: number;
}

export const SilverTripSchema =
  SchemaFactory.createForClass(SilverTrip);

SilverTripSchema.index({ start_time: -1 });
SilverTripSchema.index({ start_arrondissement: 1, start_time: -1 });