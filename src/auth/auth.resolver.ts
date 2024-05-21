import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './graphql/register.input';
import { Session } from './graphql/session.type';
import { UserDto } from 'src/users/dto/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Session)
  register(
    @Args({ name: 'registerInput', type: () => RegisterInput })
    registerInput: UserDto,
  ): Promise<Session> {
    return this.authService.register(registerInput);
  }
}
