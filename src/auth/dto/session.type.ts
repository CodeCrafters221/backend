import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/graphql/users.entity';
import { UserLogin } from 'src/users/dto/user.schema';
// import { IUser } from 'src/users/interfaces/user.interface';

@ObjectType()
export class Session {
  @ApiProperty({ type: User })
  @Field(() => User)
  user: UserLogin;

  @ApiProperty()
  @Field()
  token: string;
}
