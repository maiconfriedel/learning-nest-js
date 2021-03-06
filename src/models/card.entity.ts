import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Deck } from './deck.entity';

import { Max, IsNotEmpty } from 'class-validator';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  manaCost: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'art_crop_url', nullable: true })
  artCropUrl: string;

  @Column({ type: 'int' })
  @Max(4)
  @IsNotEmpty()
  quantity: number;

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
    () => Deck,
    deck => deck.cards,
  )
  @JoinTable()
  decks: Deck[];
}
