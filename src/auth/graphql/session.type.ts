import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/graphql/users.entity';
import { IUser } from 'src/users/dto/user.dto';
// import { IUser } from 'src/users/interfaces/user.interface';

@ObjectType()
export class Session {
  @ApiProperty({ type: User })
  @Field(() => User)
  user: IUser;

  @ApiProperty()
  @Field()
  token: string;
}
