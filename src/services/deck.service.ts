import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Deck } from '../models/deck.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'src/models/response.entity';
import { Card } from 'src/models/card.entity';
import { User } from 'src/models/user.entity';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(deck: Deck, username: string): Promise<Response<Deck>> {
    try {
      let deckCreated: Deck = undefined;

      const user = await this.userRepository.findOne({
        where: { username },
      });

      deckCreated = await this.deckRepository.findOne({
        where: { user: { id: user.id }, name: deck.name },
        relations: ['user', 'cards'],
      });

      if (!deckCreated) {
        deck.user = user;
        const instance = this.deckRepository.create(deck);

        deckCreated = await this.deckRepository.save(instance);
      }

      return { success: true, response: deckCreated };
    } catch (err) {
      return {
        success: false,
        message: [err.toString()],
        error: 'Bad Request',
      };
    }
  }

  async addCard(
    card: Card,
    deckId: number,
    username: string,
  ): Promise<Response<Deck>> {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
      });

      let deckInstance = await this.deckRepository.findOne({
        where: { id: deckId },
        relations: ['cards', 'user'],
      });

      if (!deckInstance) {
        return {
          error: 'Bad Request',
          success: false,
          message: [`Deck with id ${deckId} not found`],
        };
      }

      if (deckInstance.user.id !== user.id) {
        return {
          error: 'Bad Request',
          success: false,
          message: [`Deck with id ${deckId} is not from user ${user.id}`],
        };
      }

      let cardInstance = deckInstance.cards.filter(
        cardInstance => cardInstance.name === card.name,
      )[0];

      if (!cardInstance) {
        cardInstance = card;
      } else {
        cardInstance.quantity = card.quantity;
        cardInstance.imageUrl = card.imageUrl;
        cardInstance.manaCost = card.manaCost;
        cardInstance.artCropUrl = card.artCropUrl;
      }

      deckInstance.cards.push(cardInstance);

      await this.deckRepository.save(deckInstance);

      deckInstance = await this.deckRepository.findOne({
        where: { id: deckId },
        relations: ['cards', 'user'],
      });

      return { success: true, response: deckInstance };
    } catch (err) {
      return {
        success: false,
        message: [err.toString()],
        error: 'Bad Request',
      };
    }
  }

  async index(username: string): Promise<Deck[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    const response = await this.deckRepository.find({
      where: { user },
      relations: ['cards', 'user'],
    });

    return response;
  }

  async find(deckId: number, username: string): Promise<Deck> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    return this.deckRepository.findOne({
      where: { id: deckId, user },
      relations: ['cards', 'user'],
    });
  }
}
