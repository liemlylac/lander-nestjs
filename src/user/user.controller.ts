import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './services';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() request) {
    return this.userService.mapProfile(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view/:id')
  view(@Param('id') id: string) {
    return this.userService.view(id);
  }
}
