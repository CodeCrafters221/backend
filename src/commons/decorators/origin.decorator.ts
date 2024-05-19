/*
https://docs.nestjs.com/openapi/decorators#decorators
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequestFromContext } from '../utils';

export const Origin = createParamDecorator(
  (pick: string, context: ExecutionContext) => {
    const req = getRequestFromContext(context);
    const origin = req.originDecorator;
    return origin;
  },
);
