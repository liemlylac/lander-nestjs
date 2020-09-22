import { ApiProperty } from '@nestjs/swagger';

export class EmailRO {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  email: string;
}
