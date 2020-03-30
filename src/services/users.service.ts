import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { Response } from '../models/response.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(user: User): Promise<Response<User>> {
    let userInstance: User = undefined;

    userInstance = await this.usersRepository.findOne({
      where: { username: user.username },
    });

    const emailExists = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (!userInstance) {
      if (emailExists) {
        return {
          errors: [`User with email ${user.email} already exists`],
          success: false,
        };
      }

      const instance = this.usersRepository.create(user);

      userInstance = await this.usersRepository.save(instance);
    }

    return { success: true, response: userInstance };
  }

  async find(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
