import { ApiProperty } from '@nestjs/swagger';
import { EmailRO } from './email.ro';

export class LoginRO extends EmailRO {
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    example: 'https://example.com/pictures/default-avatar.jpeg',
  })
  avatar?: string = null;

  @ApiProperty()
  accessToken: string;
}
