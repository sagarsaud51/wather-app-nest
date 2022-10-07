import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreateCityDTO } from './dto/create-city.dto';
import { City } from './schema/city.schema';
import { CityService } from './service/city/city.service';
import { WeatherService } from './service/weather/weather.service';

@Controller('cities')
export class WeatherController {
  constructor(
    private weatherService: WeatherService,
    private cityService: CityService,
  ) {}

  @Get('weather')
  @ApiProperty({description: 'Returns all list of City'})
  async getAllCityWeather(): Promise<City[]> {
    return await this.cityService.getAllCities();
  }

  @Get()
  async getAllCities(): Promise<City[]> {
    return await this.cityService.getAllCities();
  }

  @Post()
  @ApiBody({type: CreateCityDTO})
  @ApiResponse({status: 200, description: 'Add City',})
  async addCity(@Body() createCityDTO: CreateCityDTO): Promise<City> {
    const city = await this.cityService.addCity(createCityDTO);
    return city;
  }

  @Delete(':id')
  async deleteCity(@Param('id') id: string) {
    return await this.cityService.removeCityById(id);
  }

  //   @Get(':name/weather')
  //   async getWeatherByCityName(@Param('name') name: string): Promise<any> {
  //     return await this.weatherService.getWeatherByCityName(name);
  //   }

  @Get('test')
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  async test() {
    return [];
  }
}
