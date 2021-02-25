import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { defaultValidationPipeOption } from '@app/common';
import {
  EmailDto,
  LoginDto,
  RegisterDto,
  RequestPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
  LoginResultDto,
} from './dto';
import { AuthService } from './services';

@ApiTags('Auth')
@UsePipes(new ValidationPipe(defaultValidationPipeOption))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @ApiNoContentResponse({ description: 'Logout success without body response' })
  @ApiBearerAuth()
  @ApiParam({ name: 'deviceId' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('logout/:deviceId')
  async logout(
    @Request() req,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    return this.authService.logout(req.user.id, deviceId);
  }
}
