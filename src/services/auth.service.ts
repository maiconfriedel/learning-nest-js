import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

import { Response } from '../models/response.entity';
import { Token } from '../models/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (
      user &&
      user.decrypt(`${user.password}+${user.email}`) === `${pass}+${user.email}`
    ) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<Response<Token>> {
    const response = await this.validateUser(user.username, user.password);

    if (response) {
      const payload = { username: user.username, scope: user.scope };
      return {
        response: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          access_token: this.jwtService.sign(payload),
          type: 'Bearer',
        },
        success: true,
      };
    } else {
      return { errors: ['User not found or not valid!'], success: false };
    }
  }
}
