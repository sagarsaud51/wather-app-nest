import { FilterQuery } from 'mongoose';
import { CreateCityDTO } from 'src/weather/dto/create-city.dto';
import {
  CityForecastResponse,
  CityResponseDTO,
} from 'src/weather/dto/response/city-response.dto';
import { City, CityDocument } from 'src/weather/schema/city.schema';
import { Weather } from 'src/weather/schema/weather.schema';

export interface ICityService {
  addCity(createCity: CreateCityDTO): Promise<CityResponseDTO>;
  getAllCities(): Promise<City[]>;
  removeCityById(id: string): Promise<any>;
  updateLatestWeather(cityId: string, weather: Weather): Promise<void>;
  fetchAllCities(): Promise<CityResponseDTO[]>;
  getCityByName(filter: FilterQuery<CityDocument>): Promise<City>;
  getWeatherAndForecastByCityName(
    cityName: string,
  ): Promise<CityForecastResponse>;
}
