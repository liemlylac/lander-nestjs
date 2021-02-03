import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { DeviceDto } from './device.dto';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'doeJohn',
  })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsString()
  deviceInfo: DeviceDto;
}
