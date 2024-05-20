/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequestFromContext } from './commons/utils';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = getRequestFromContext(context);
    const origin = req.headers.origin;
    if (origin && origin.includes('admin.com')) {
      req.originDecorator = 'admin';
      // return next.handle();
    } else {
      req.originDecorator = 'dev';
      // throw new ForbiddenException();
    }
    return next.handle();
  }
}
