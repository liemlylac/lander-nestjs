import { ApiProperty } from '@nestjs/swagger';

export class DistrictListRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  regionId: number;

  @ApiProperty({ required: false })
  shipCode: string = null;
}
