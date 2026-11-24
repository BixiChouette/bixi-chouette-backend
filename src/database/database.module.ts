import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BronzeTrip, BronzeTripSchema, } from '../schemas/bronze-trip.schema';
import { SilverTrip, SilverTripSchema, } from '../schemas/silver-trip.schema';
import { GoldStat, GoldStatSchema, } from '../schemas/gold-stat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
              {
        name: BronzeTrip.name,
        schema: BronzeTripSchema,
      },
      {
        name: SilverTrip.name,
        schema: SilverTripSchema,
      },
      {
        name: GoldStat.name,
        schema: GoldStatSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}