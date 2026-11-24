import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< HEAD
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';

import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BronzeTrip, BronzeTripSchema} from './schemas/bronze-trip.schema';
import { SilverTrip, SilverTripSchema } from './schemas/silver-trip.schema';
import { GoldStat, GoldStatSchema } from './schemas/gold-stat.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri'),
        autoIndex: process.env.NODE_ENV !== 'production',
      }),
    }),
    DatabaseModule,
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObservationsModule } from './observations/observations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ObservationsModule,
>>>>>>> 8492801f47fc1f5863bbab265b0772aae6b8442f
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}