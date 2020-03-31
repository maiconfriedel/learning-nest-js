import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './models/deck.entity';
import { DeckService } from './services/deck.service';
import { User } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, User])],
  providers: [DeckService],
  exports: [DeckService],
})
export class DeckModule {}
