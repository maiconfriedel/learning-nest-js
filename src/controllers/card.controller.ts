import { Controller, UseGuards, Post } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(RolesGuard)
@Controller()
export class CardController {
  @UseGuards(JwtAuthGuard)
  @Roles('cards.write')
  @Post('cards')
  store(): {} {
    return { ok: true };
  }
}
