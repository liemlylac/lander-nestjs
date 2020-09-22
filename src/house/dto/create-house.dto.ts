import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateHouseDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  regionId: number;

  @ApiProperty()
  @IsNumber()
  districtId: number;

  @ApiProperty()
  @IsNumber()
  wardId: number;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
