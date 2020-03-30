import { Controller, Request, Post, Res } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Request as Req, Response } from 'express';

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
  async createUser(@Request() request: Req, @Res() res: Response) {
    const response = await this.usersService.create(request.body);

    if (!response.success) {
      return res.status(400).send(response);
    } else {
      return res.send(response);
    }
  }
}
