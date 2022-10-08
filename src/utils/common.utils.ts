import { WeatherResponseDTO } from 'src/weather/dto/response/city-response.dto';
import { WeatherResponse } from 'src/weather/dto/weather.dto';
import { Weather } from 'src/weather/schema/weather.schema';

export class CommonUtils {
  public static parseWeatherToDTO(weather: Weather): WeatherResponseDTO {
    return {
      base: weather?.baseModelName,
      weather: weather?.weather,
      main: weather?.main,
      visibility: weather?.visibility,
      wind: weather?.wind,
      rain: weather?.rain,
      clouds: weather?.clouds,
      dt: weather?.dt,
    };
  }

  public static parseWeatherResponseToDTO(
    weather: WeatherResponse,
  ): WeatherResponseDTO {
    return {
      base: weather.base,
      weather: weather?.weather,
      main: weather?.main,
      visibility: weather?.visibility,
      wind: weather?.wind,
      rain: weather?.rain,
      clouds: weather?.clouds,
      dt_txt: weather?.dt_txt,
    };
  }

  public static parseWeatherResponseArrayToDTO(
    weathers: WeatherResponse[],
  ): WeatherResponseDTO[] {
    const dtos: WeatherResponseDTO[] = [];
    weathers.forEach((w) => {
      dtos.push(this.parseWeatherResponseToDTO(w));
    });
    return dtos;
  }
}
