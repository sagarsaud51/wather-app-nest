import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { WeatherResponse } from 'src/weather/dto/weather.dto';
import { CityDocument } from 'src/weather/schema/city.schema';
import { Weather, WeatherDocument } from 'src/weather/schema/weather.schema';
import { IWeatherService } from './weather.interface';

@Injectable()
export class WeatherService implements IWeatherService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<WeatherDocument>,
  ) {}

  public async getCityWeatherByName(
    cityName: string,
  ): Promise<WeatherResponse> {
    const res = await this.httpService
      .get<WeatherResponse>(
        this.getWeatherURL(`data/2.5/weather?q=${cityName}`),
      )
      .toPromise();
    return res.data;
  }

  public async addWeather(
    weather: WeatherResponse,
    city: CityDocument,
  ): Promise<Weather> {
    return await this.weatherModel.create({ ...weather, city });
  }

  public async removeWeather(id: string): Promise<any> {
    return await this.weatherModel.deleteMany({ city: { _id: id } }).exec();
  }

  public async getFilteredWeather(
    filter: FilterQuery<WeatherDocument> = {},
  ): Promise<Weather[]> {
    return await this.weatherModel.find(filter);
  }

  public async getAllWeather(): Promise<Weather[]> {
    return await this.weatherModel.find();
  }

  public async getWeatherByCityName(name: string) {
    return null;
  }

  private getWeatherURL(url: string): string {
    return `${process.env.OPEN_WEATHER__BASE_URL}${url}&appId=${process.env.OPEN_WEATHER_API_KEY}`;
  }
}
