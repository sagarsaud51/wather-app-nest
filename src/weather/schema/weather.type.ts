import { ApiProperty } from '@nestjs/swagger';

export class WeatherBody {
  @ApiProperty({ description: `Weather condition id`, example: 301 })
  id: number;
  @ApiProperty({
    description: `Group of weather parameters (Rain, Snow, Extreme etc.)`,
    example: `Snow`,
  })
  main: string;
  @ApiProperty({
    description: `Weather condition within the group. You can get the output in your language`,
    example: 'moderate rain',
  })
  description: string;
  @ApiProperty({ description: `Weather icon id`, example: '10d' })
  icon: string;
}

export class MainData {
  @ApiProperty({ description: `Temperature.`, example: 298.48 })
  temp: number;
  @ApiProperty({ description: `Temperature`, example: 301 })
  feels_like: number;
  @ApiProperty({ description: `Minimum temperature`, example: 108 })
  temp_min: number;
  @ApiProperty({ description: `Maximum Temperate`, example: 310 })
  temp_max: number;
  @ApiProperty({ description: `Pressure`, example: 1005 })
  pressure: number;
  @ApiProperty({ description: `Humidity, %`, example: 64 })
  humidity: number;
}

export class Wind {
  @ApiProperty({ description: `Wind speed.`, example: 0.64 })
  speed: number;
  @ApiProperty({ description: `Wind direction`, example: 349 })
  deg: number;
}

export class Clouds {
  @ApiProperty({ description: `Cloudiness %`, example: 11 })
  all: number;
}
