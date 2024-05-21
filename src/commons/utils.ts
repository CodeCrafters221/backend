import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export function getRequestFromContext(context: ExecutionContext) {
  return (
    context.switchToHttp().getRequest() ||
    GqlExecutionContext.create(context).getContext().req
  );
}
