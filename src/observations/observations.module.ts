import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BronzeTrip, BronzeTripSchema } from '../schemas/bronze-trip.schema';
import { ObservationsService } from './observations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BronzeTrip.name, schema: BronzeTripSchema, collection: 'bronze_trips' },
    ]),
  ],
  providers: [ObservationsService],
  exports: [ObservationsService],
})
export class ObservationsModule { }
