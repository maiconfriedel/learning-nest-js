import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }

    try {
      const userToken = req.headers.authorization.split(' ')[1];
      const decoded = jwtDecode(userToken);

      req.user = decoded;

      next();
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
