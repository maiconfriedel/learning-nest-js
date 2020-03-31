import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  Res,
  Param,
  Req,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { DeckService } from '../services/deck.service';
import { Deck } from 'src/models/deck.entity';
import { Response, Request } from 'express';

@UseGuards(RolesGuard)
@Controller()
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('decks.write')
  @Post('decks')
  async store(
    @Body() request: Deck,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const response = await this.deckService.create(
      request,
      (req.user as any).username,
    );

    if (!response.success) {
      return res.status(400).send(response);
    } else {
      return res.send(response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('decks.read')
  @Get('decks')
  async index(@Req() req: Request) {
    return this.deckService.index((req.user as any).username);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('decks.read')
  @Get('decks/:deckId')
  async find(@Param() param, @Req() req: Request) {
    return this.deckService.find(param.deckId, (req.user as any).username);
  }
}
