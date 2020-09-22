import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserProfileRO {
  @ApiProperty()
  @Expose({ groups: ['profile', 'view'] })
  firstName: string;

  @ApiProperty()
  @Expose({ groups: ['profile', 'view'] })
  lastName: string;

  @ApiProperty()
  @Expose({ groups: ['profile', 'view'] })
  email: string;

  @ApiProperty()
  @Expose({ groups: ['profile', 'view'] })
  phone: string;

  @ApiProperty()
  @Expose({ groups: ['profile', 'view'] })
  avatar: string;

  @ApiProperty()
  @Expose({ groups: ['profile'] })
  gender: string;

  @ApiProperty()
  @Expose({ groups: ['profile'] })
  birthday: string;
}
