import { defaultValidationPipeOption } from '@core/pipe/default-validation-pipe';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { RequestPasswordDTO } from '../dto/request-password.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { EmailRO } from '../ro/email.ro';
import { LoginRO } from '../ro/login.ro';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@UsePipes(new ValidationPipe(defaultValidationPipeOption))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: LoginRO })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() data: LoginDTO, @Request() request) {
    return this.authService.afterLogin(request.user);
  }

  @ApiCreatedResponse({ type: LoginRO })
  @Post('register')
  register(@Body() data: RegisterDTO): Promise<LoginRO> {
    return this.authService.register(data);
  }

  @ApiCreatedResponse({ type: EmailRO })
  @Post('request-password')
  requestPassword(@Body() requestPassword: RequestPasswordDTO) {
    return this.authService.requestPassword(requestPassword.email);
  }

  @ApiOkResponse({ type: Boolean })
  @ApiQuery({ name: 'token' })
  @Get('verify-reset-password-token')
  verifyResetPasswordToken(@Query('token') token) {
    return this.authService.verifyResetPasswordToken(token);
  }

  @ApiCreatedResponse({ type: EmailRO })
  @ApiQuery({ name: 'token' })
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() data: ResetPasswordDTO,
  ) {
    return await this.authService.resetPassword(token, data);
  }
}
