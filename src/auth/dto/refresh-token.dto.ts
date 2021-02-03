import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
