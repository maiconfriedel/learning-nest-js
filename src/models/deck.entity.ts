import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';

import { Card } from './card.entity';
import { User } from './user.entity';

@Entity({ name: 'decks' })
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  colors: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @ManyToMany(
    () => Card,
    card => card.decks,
    { cascade: true },
  )
  cards: Card[];

  @ManyToOne(
    () => User,
    user => user.decks,
    {
      cascade: false,
      nullable: false,
    },
  )
  user: User;
}
