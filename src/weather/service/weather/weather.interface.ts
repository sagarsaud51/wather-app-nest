import { FilterQuery } from 'mongoose';
import { WeatherResponse } from 'src/weather/dto/weather.dto';
import { CityDocument } from 'src/weather/schema/city.schema';
import { Weather, WeatherDocument } from 'src/weather/schema/weather.schema';

export interface IWeatherService {
  getCityWeatherByName(cityName: string): Promise<WeatherResponse>;

  addWeather(weather: WeatherResponse, city: CityDocument): Promise<Weather>;

  removeWeather(id: string): Promise<any>;

  getFilteredWeather(filter: FilterQuery<WeatherDocument>): Promise<Weather[]>;

  getAllWeather(): Promise<Weather[]>;
}
