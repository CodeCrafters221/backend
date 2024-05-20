import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/users/enums/user-role.enum';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;
}
