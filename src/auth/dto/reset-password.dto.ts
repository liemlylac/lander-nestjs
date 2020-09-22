import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Confirm } from './confirm.decorator';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Confirm('password') //customize decorator
  confirmPassword: string;
}
