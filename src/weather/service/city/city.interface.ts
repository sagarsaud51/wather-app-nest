import { CreateCityDTO } from 'src/weather/dto/create-city.dto';
import { City } from 'src/weather/schema/city.schema';
import { Weather } from 'src/weather/schema/weather.schema';

export interface ICityService {
  addCity(createCity: CreateCityDTO): Promise<City>;
  getAllCities(): Promise<City[]>;
  removeCityById(id: string): Promise<any>;
  updateLatestWeather(cityId: string, weather: Weather): Promise<void>;
}
