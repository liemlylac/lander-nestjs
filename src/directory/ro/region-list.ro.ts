import { ApiProperty } from '@nestjs/swagger';

export class RegionListRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty({ required: false })
  postCode: string = null;

  @ApiProperty({ required: false })
  shipCode: string = null;

  @ApiProperty()
  active: boolean;
}
