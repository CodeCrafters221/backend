import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getRequestFromContext } from 'src/commons/utils';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getRequestFromContext(context);
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const result = await this.authService.isTokenValid(token);
      req.user = result;
      return Boolean(result);
    }
    return false;
  }
}
