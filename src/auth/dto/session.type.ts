import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/users/dto/user.dto';
import { User } from 'src/users/graphql/users.entity';

@ObjectType()
export class Session {
  @ApiProperty({ type: User })
  @Field(() => User)
  user: IUser;

  @ApiProperty()
  @Field()
  token: string;
}
