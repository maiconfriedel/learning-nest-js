import { Controller, Request, Post, Res, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Request as Req, Response } from 'express';
import { User } from 'src/models/user.entity';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sessions')
  async login(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(req.body);

    if (!response.success) {
      return res.status(400).send(response);
    } else {
      return res.send(response);
    }
  }

  @Post('users')
  async createUser(@Body() request: User, @Res() res: Response) {
    const response = await this.usersService.create(request);

    if (!response.success) {
      return res.status(400).send(response);
    } else {
      return res.send(response);
    }
  }
}
