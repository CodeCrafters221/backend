import { createParamDecorator } from '@nestjs/common';
import { getRequestFromContext } from 'src/commons/utils';

export const CurrentUser = createParamDecorator(
  (pick: string, context: any) => {
    //const user = context.args[0].user;
    const req = getRequestFromContext(context);
    const user = { ...req.user, id: req.user._id };
    return pick ? user[pick] : user;
  },
);
