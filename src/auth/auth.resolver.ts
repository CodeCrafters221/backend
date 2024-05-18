import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { IUser } from "src/users/interfaces/user.interface";
import { AuthService } from "./auth.service";
import { RegisterInput } from "./dto/register.input";
import { Session } from "./dto/session.type";

@Resolver()

export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Session)
  register(
      @Args({ name: 'registerInput', type: () => RegisterInput }) registerInput: IUser
  ): Promise<Session> {
      return this.authService.register(registerInput);
  }
} 