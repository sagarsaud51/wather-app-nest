import { MainData, Wind, Clouds, WeatherBody } from '../schema/weather.type';

export interface WeatherResponse {
  weather: WeatherBody[];
  base: string;
  main: MainData;
  visibility: number;
  wind: Wind;
  rain: any;
  clouds: Clouds;
  dt?: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  dt_txt?: string;
}

export interface WeatherForecastResponse {
  list: WeatherResponse[];
}
