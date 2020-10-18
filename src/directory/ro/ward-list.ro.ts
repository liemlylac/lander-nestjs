import { ApiProperty } from '@nestjs/swagger';

export class WardListRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  districtId: number;

  @ApiProperty({ required: false })
  shipCode: string = null;

  @ApiProperty()
  active: boolean;
}
