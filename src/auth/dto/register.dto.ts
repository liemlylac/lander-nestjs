import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @MinLength(1)
  @IsString()
  lastName: string;
}
