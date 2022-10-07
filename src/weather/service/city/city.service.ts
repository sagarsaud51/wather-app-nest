import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateCityDTO } from 'src/weather/dto/create-city.dto';
import { City, CityDocument } from 'src/weather/schema/city.schema';
import { Weather, WeatherDocument } from 'src/weather/schema/weather.schema';
import { WeatherService } from '../weather/weather.service';
import { ICityService } from './city.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
    private readonly weatherService: WeatherService,
  ) {}

  public async addCity(createCity: CreateCityDTO): Promise<City> {
    try {
      const weather = await this.weatherService.getCityWeatherByName(
        createCity.name,
      );
      const createdCity = await this.cityModel.create({
        name: createCity.name,
      });

      const weatherResponse = await this.weatherService.addWeather(
        weather,
        createdCity,
      );
      await this.updateLatestWeather(createdCity._id, weatherResponse);
      return createdCity;
    } catch (err) {
      console.log(err.message);
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
  }

  public async updateLatestWeather(
    cityId: string,
    weather: Weather,
  ): Promise<void> {
    await this.cityModel.updateOne({ _id: cityId }, { weather: weather });
  }

  public async getAllCities(): Promise<City[]> {
    // return await this.cityModel.find().select('id name weather').exec();
    return await this.cityModel.find().populate('weather').exec();
  }

  async removeCityById(id: string): Promise<any> {
    const res = await this.cityModel.deleteOne({ id }).exec();
    await this.weatherService.removeWeather(id);
    return res;
  }

  public async getCityByName(
    filter: FilterQuery<CityDocument> = {},
  ): Promise<City[]> {
    // return await this.cityModel.find().select('id name weather').exec();
    return await this.cityModel.find(filter).populate('weather').exec();
  }
}
