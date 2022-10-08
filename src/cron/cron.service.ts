import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import environment from 'src/config';
import { CityService } from 'src/weather/service/city/city.service';
import { WeatherService } from 'src/weather/service/weather/weather.service';

@Injectable()
export class CronService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly cityService: CityService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CronService.name);
  }

  @Cron(environment.CRON_INTERVAL)
  // @Cron(CronExpression.EVERY_10_SECONDS)
  updateLatestWeather() {
    this.logger.info(
      `Started weather update cron at ${new Date().toISOString()}`,
    );
    this.handleLatestUpdate().then(() => {
      this.logger.info(
        `Ended weather update cron at ${new Date().toISOString()}`,
      );
    });
  }

  private async handleLatestUpdate() {
    const cities = await this.cityService.getAllCities();
    await Promise.allSettled(
      cities.map(async (city) => {
        try {
          this.logger.info(`Updating weather for [${city.name}]`);
          const weatherResponse =
            await this.weatherService.getCityWeatherByName(city.name);

          await this.weatherService.updateWeather(
            weatherResponse,
            city.weather._id,
          );
          // const weather = await this.weatherService.addWeather(
          //   weatherResponse,
          //   city,
          // );
          // await this.cityService.updateLatestWeather(city._id, weather);
          this.logger.info(`Weather for [${city.name}] has been updated!!`);
        } catch (err) {
          this.logger.error(
            `Weather update [${city.name}] failed with cause ${err.message}`,
          );
        }
      }),
    );
  }
}
