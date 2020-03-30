import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

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

  @BeforeInsert()
  hashPassword() {
    this.password = this.encrypt(`${this.password}+${this.email}`);
  }

  private encrypt(text) {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      'bbbbbbbbbbbbbbbb',
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  public decrypt(text) {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      'bbbbbbbbbbbbbbbb',
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
