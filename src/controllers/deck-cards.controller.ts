import {
  Controller,
  UseGuards,
  Put,
  Res,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { DeckService } from '../services/deck.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Response } from 'express';
import { Card } from 'src/models/card.entity';
import { Request } from 'express';

@Controller()
export class DeckCardsController {
  constructor(private readonly deckService: DeckService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('decks.write')
  @Put('decks/:deckId')
  async store(
    @Body() request: Card,
    @Res() res: Response,
    @Param() params,
    @Req() req: Request,
  ) {
    const response = await this.deckService.addCard(
      request,
      params.deckId,
      (req.user as any).username,
    );

    if (!response.success) {
      return res.status(400).send(response);
    } else {
      return res.send(response);
    }
  }
}
