import { UseGuards, Get, Controller } from '@nestjs/common';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from 'src/services/users.service';

@UseGuards(RolesGuard)
@Controller()
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('users.read')
  @Get('users')
  find(): {} {
    return this.usersService.find();
  }
}
