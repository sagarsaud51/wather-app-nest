import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import environment from './config';
import { CronService } from './cron/cron.service';
import { CitiesController } from './weather/cities.controller';
import { City, CitySchema } from './weather/schema/city.schema';
import { Weather, WeatherSchema } from './weather/schema/weather.schema';
import { CityService } from './weather/service/city/city.service';
import { WeatherService } from './weather/service/weather/weather.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(environment.MONGO_URL),
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Weather.name, schema: WeatherSchema },
    ]),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({ pinoHttp: { level: environment.LOG_LEVEL } }),
  ],
  controllers: [AppController, CitiesController],
  providers: [AppService, WeatherService, CityService, CronService],
})
export class AppModule {}
