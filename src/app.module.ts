import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/service/weather/weather.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityService } from './weather/service/city/city.service';
import { City, CitySchema } from './weather/schema/city.schema';
import { Weather, WeatherSchema } from './weather/schema/weather.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { environment } from './config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017/weather'),
    MongooseModule.forRoot(environment.MONGO_URL),
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Weather.name, schema: WeatherSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherService, CityService, CronService],
  exports: [WeatherService, CityService],
})
export class AppModule {}
