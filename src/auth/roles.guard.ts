import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.scope) {
      return false;
    }

    const userScopes = (user.scope as string).split('+');

    let valid = false;

    userScopes.map(scope => {
      if (scope === roles[0]) {
        valid = true;
      }
    });

    return valid;
  }
}
