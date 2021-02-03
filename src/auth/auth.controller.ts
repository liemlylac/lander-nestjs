import {
  Body,
  Controller,
  Delete,
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
import { defaultValidationPipeOption } from '@app/common';
import * as DeviceDetector from 'device-detector-js';

import {
  EmailDto,
  LoginDto,
  RegisterDto,
  RequestPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
  LogoutDto,
  LoginResultDto,
} from './dto';
import { AuthService } from './services';

@ApiTags('Auth')
@UsePipes(new ValidationPipe(defaultValidationPipeOption))
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly detector: DeviceDetector,
  ) {}

  @Get()
  request(@Request() req) {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const info: any = this.detector.parse(req.headers['user-agent']);
    info.ip = ip;
    return info;
  }

  @ApiCreatedResponse({ type: LoginResultDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() body: LoginDto, @Request() request): Promise<LoginResultDto> {
    return this.authService.login(request.user);
  }

  @ApiCreatedResponse({ type: LoginResultDto })
  @Post('register')
  register(@Body() body: RegisterDto): Promise<LoginResultDto> {
    return this.authService.register(body);
  }

  @ApiCreatedResponse({ type: EmailDto })
  @Post('request-password')
  requestPassword(@Body() body: RequestPasswordDto) {
    return this.authService.requestPassword(body.email);
  }

  @ApiOkResponse({ type: Boolean })
  @ApiQuery({ name: 'token' })
  @Get('verify-reset-password-token')
  verifyResetPasswordToken(@Query('token') token) {
    return this.authService.verifyResetPasswordToken(token);
  }

  @ApiCreatedResponse({ type: EmailDto })
  @ApiQuery({ name: 'token' })
  @Post('reset-password')
  async resetPassword(@Query('token') token, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(token, body);
  }

  @ApiCreatedResponse({ type: RefreshTokenDto })
  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body);
  }

  @ApiOkResponse()
  @Delete('logout')
  async logout(@Body() body: LogoutDto) {
    return this.authService.logout(body);
  }
}
