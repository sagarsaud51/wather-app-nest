import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDTO {
  @IsString({ message: 'City Name Should be String' })
  @IsNotEmpty({ message: 'City Name Should not be Empty' })
  @ApiProperty({ example: 'Kathmandu', description: 'Name of the City' })
  readonly name: string;
}
