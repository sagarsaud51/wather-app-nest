import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { CommonUtils } from 'src/utils/common.utils';
import { CreateCityDTO } from 'src/weather/dto/create-city.dto';
import {
  CityForecastResponse,
  CityResponseDTO,
} from 'src/weather/dto/response/city-response.dto';
import { City, CityDocument } from 'src/weather/schema/city.schema';
import { Weather } from 'src/weather/schema/weather.schema';
import { WeatherService } from '../weather/weather.service';
import { ICityService } from './city.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
    private readonly weatherService: WeatherService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(CityService.name);
  }

  public async addCity(createCity: CreateCityDTO): Promise<CityResponseDTO> {
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
      console.log(createdCity.name);
      return {
        name: createdCity.name,
        _id: createdCity._id,
        weather: CommonUtils.parseWeatherToDTO(weatherResponse),
      };
    } catch (err) {
      this.logger.error(err, `Error While adding city`);
      if (err.code == '11000')
        throw new HttpException(
          `Conflict ${createCity.name} already exists`,
          HttpStatus.CONFLICT,
        );

      if (err?.response?.data?.cod == HttpStatus.NOT_FOUND.toString()) {
        throw new HttpException(
          `Could not find ${createCity.name} in Weather API`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (err?.response?.data?.cod == HttpStatus.UNAUTHORIZED.toString()) {
        throw new HttpException(
          `Could not fetch weather API!`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        `Internal Server Error!!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateLatestWeather(
    cityId: string,
    weather: Weather,
  ): Promise<void> {
    this.logger.info(`Updating weather for cityId ${cityId}`);
    await this.cityModel.updateOne({ _id: cityId }, { weather: weather });
  }

  public async getAllCities(): Promise<City[]> {
    // return await this.cityModel.find().select('id name weather').exec();
    this.logger.info(`Retriving all cities with weather`);
    return await this.cityModel.find().populate('weather').exec();
  }

  public async fetchAllCities(): Promise<CityResponseDTO[]> {
    this.logger.info(`Feting all Cities and Weather`);
    const cities: City[] = await this.cityModel
      .find()
      .select('name weather')
      .populate('weather')
      .exec();
    const cityResponseDTOs: CityResponseDTO[] = [];
    let cityResponseDTO: CityResponseDTO;
    cities.forEach((city) => {
      cityResponseDTO = {
        _id: city._id,
        name: city.name,
        weather: CommonUtils.parseWeatherToDTO(city.weather),
      } as CityResponseDTO;
      cityResponseDTOs.push(cityResponseDTO);
    });
    return cityResponseDTOs;
  }

  async removeCityById(id: string): Promise<any> {
    this.logger.info(`Removing city and weather Data with cityID ${id}`);
    const res = await Promise.all([
      this.cityModel.deleteOne({ id }).exec(),
      this.weatherService.removeWeatherByCityId(id),
    ]);
    return res;
  }

  public async getWeatherAndForecastByCityName(
    cityName: string,
  ): Promise<CityForecastResponse> {
    let cityForecast: CityForecastResponse;
    try {
      this.logger.info(
        `Fetching weather forcast data for Cityname [${cityName}]`,
      );
      const city = await this.getCityByName({ name: cityName });
      if (city) {
        cityForecast = {
          city: {
            name: city.name,
            _id: city._id,
            weather: CommonUtils.parseWeatherToDTO(city.weather),
          },
          forecast: [],
        };
      } else {
        const newCityResponse = await this.weatherService.getCityWeatherByName(
          cityName,
        );
        cityForecast = {
          city: {
            name: cityName,
            weather: CommonUtils.parseWeatherResponseToDTO(newCityResponse),
          },
          forecast: [],
        };
      }
      cityForecast.forecast = CommonUtils.parseWeatherResponseArrayToDTO(
        (await this.weatherService.getCityWeatherForecastByName(cityName)).list,
      );
      return cityForecast;
    } catch (err) {
      this.logger.error(
        err,
        `Error While fetching weather forecast data for ${cityName}`,
      );
      if (err?.response?.data?.cod == HttpStatus.NOT_FOUND.toString()) {
        throw new HttpException(
          `Could not find ${cityName} in Weather API`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (err?.response?.data?.cod == HttpStatus.UNAUTHORIZED.toString()) {
        throw new HttpException(
          `Could not fetch weather API!`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        `Internal Server Error!!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getCityByName(
    filter: FilterQuery<CityDocument> = {},
  ): Promise<City> {
    this.logger.debug(filter, `Fetching city data with filter`);
    // return await this.cityModel.find().select('id name weather').exec();
    return await this.cityModel.findOne(filter).populate('weather').exec();
  }
}
