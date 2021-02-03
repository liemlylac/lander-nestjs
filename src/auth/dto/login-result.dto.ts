import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenDto } from './refresh-token.dto';

export class LoginResultDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ type: RefreshTokenDto })
  token: RefreshTokenDto;
}
