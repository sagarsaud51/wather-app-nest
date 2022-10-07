import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { environment } from 'src/config';
import { CityService } from 'src/weather/service/city/city.service';
import { WeatherService } from 'src/weather/service/weather/weather.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  public interval: number;

  constructor(
    private readonly weatherService: WeatherService,
    private cityService: CityService,
  ) {}

  @Interval(parseInt(environment.CRON_INTERVAL))
  updateLatestWeather() {
    this.logger.log(parseInt(environment.CRON_INTERVAL));
    this.logger.log(`We are here`);
    this.handleLatestUpdate();
  }

  private async handleLatestUpdate() {
    const cities = await this.cityService.getAllCities();
    await Promise.all([
      cities.forEach(async (city) => {
        this.logger.log(`Updating weather for [${city.name}]`);
        const weatherResponse = await this.weatherService.getCityWeatherByName(
          city.name,
        );
        const weather = await this.weatherService.addWeather(
          weatherResponse,
          city,
        );
        await this.cityService.updateLatestWeather(city._id, weather);
      }),
    ]);
  }
}
