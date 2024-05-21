/* eslint-disable prettier/prettier */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { IUser } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { Session } from './dto/session.type';
import { UserDto } from 'src/users/dto/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Session)
  register(
    @Args({ name: 'registerInput', type: () => RegisterInput })
    // registerInput: IUser,
    registerInput: UserDto,
  ): Promise<Session> {
    return this.authService.register(registerInput);
  }
}
