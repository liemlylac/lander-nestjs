import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Request() request) {
    return this.userService.profile(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view/:id')
  view(@Param('id') id: string) {
    return this.userService.view(id);
  }
}
