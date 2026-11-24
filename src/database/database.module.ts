import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SilverTrip,
  SilverTripSchema,
} from '../schemas/silver-trip.schema';

import {
  GoldStat,
  GoldStatSchema,
} from '../schemas/gold-stat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
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