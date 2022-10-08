import { ApiProperty } from '@nestjs/swagger';
import {
  Clouds,
  MainData,
  WeatherBody,
  Wind,
} from 'src/weather/schema/weather.type';

export class WeatherResponseDTO {
  @ApiProperty({
    description: `more info Weather condition codes`,
    type: WeatherBody,
    isArray: true,
  })
  weather: WeatherBody[];
  @ApiProperty({ description: ` Internal parameter` })
  base: string;
  @ApiProperty({ description: `Main temperature data` })
  main: MainData;
  @ApiProperty({ description: `Visibility, meter`, example: 10000 })
  visibility: number;
  @ApiProperty({ description: `Wind data` })
  wind: Wind;
  @ApiProperty()
  rain: any;
  @ApiProperty({ description: `Clouds data` })
  clouds: Clouds;
  @ApiProperty({
    description: 'Time of data calculation, unix, UTC',
    example: '1661870592',
  })
  dt?: number;
  @ApiProperty({
    description: 'Time of data forecasted, ISO, UTC',
    example: '2022-03-15 12:00:00',
  })
  dt_txt?: string;
}

export class CityResponseDTO {
  @ApiProperty({
    description: 'Id of City',
    example: '633f260595415ca13da90a60',
    required: false,
  })
  _id?: string;
  @ApiProperty({ description: 'Name of the City', example: 'Kathmandu' })
  name: string;
  @ApiProperty({ description: `Latest updated weather` })
  weather: WeatherResponseDTO;
}

export class CityForecastResponse {
  @ApiProperty({ description: 'Latest Updated Weather and City' })
  city: CityResponseDTO;
  @ApiProperty({
    description: 'Weather forecast value',
    isArray: true,
    type: WeatherResponseDTO,
  })
  forecast: WeatherResponseDTO[];
}
