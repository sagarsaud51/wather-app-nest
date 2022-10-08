import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCityDTO } from './dto/create-city.dto';
import {
  CityForecastResponse,
  CityResponseDTO,
} from './dto/response/city-response.dto';
import { City } from './schema/city.schema';
import { CityService } from './service/city/city.service';

@Controller('cities')
@ApiTags('cities')
export class CitiesController {
  constructor(private cityService: CityService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns Array of City with latest updated weather',
  })
  @ApiResponse({
    status: 200,
    description: 'Success Response',
    isArray: true,
    type: CityResponseDTO,
  })
  async getAllCities(): Promise<CityResponseDTO[]> {
    return await this.cityService.fetchAllCities();
  }

  @Post()
  @ApiBody({ type: CreateCityDTO })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Successfully Added City',
    type: CityResponseDTO,
  })
  @ApiResponse({ status: 409, description: 'Conflict.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOperation({
    summary: 'Adds a new City and collects the latest weather update',
  })
  async addCity(
    @Body() createCityDTO: CreateCityDTO,
  ): Promise<CityResponseDTO> {
    return await this.cityService.addCity(createCityDTO);
  }

  @Get('weather')
  @ApiProperty({ description: 'Returns all list of City' })
  @ApiOperation({
    summary: 'Returns Array of City entity latest updated weather',
  })
  async getAllCityWeather(): Promise<City[]> {
    return await this.cityService.getAllCities();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({
    status: 204,
    description: 'City and Weather has been removed',
  })
  @ApiOperation({
    summary: 'Remove city and weather data by city Id',
  })
  async deleteCity(@Param('id') id: string) {
    return await this.cityService.removeCityById(id);
  }

  @Get(':name/weather')
  @ApiCreatedResponse({
    status: 200,
    description: 'City Weather Forcast Data',
    type: CityForecastResponse,
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Fetch City details and forecast',
  })
  async getWeatherByCityName(
    @Param('name') name: string,
  ): Promise<CityForecastResponse> {
    return await this.cityService.getWeatherAndForecastByCityName(name);
  }
}
