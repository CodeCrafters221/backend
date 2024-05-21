import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserInput {
  @ApiProperty()
  @Field({ nullable: true })
  email: string;

  @ApiProperty()
  @Field({ nullable: true })
  password: string;
}
