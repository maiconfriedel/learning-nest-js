import { UseGuards, Get, Param, Controller } from '@nestjs/common';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(RolesGuard)
@Controller()
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Roles('users.read')
  @Get('profile/:userId')
  getProfile(@Param() { userId }): {} {
    return { ok: userId };
  }
}
