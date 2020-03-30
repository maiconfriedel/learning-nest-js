import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  colors: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

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
}
