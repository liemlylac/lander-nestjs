import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseRO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  regionId: number;

  @ApiProperty()
  districtId: number;

  @ApiProperty()
  wardId: number;

  @ApiProperty()
  street: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  isVerify = false;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
