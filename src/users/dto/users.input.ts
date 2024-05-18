import { Field, InputType, } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UserInput {

  @ApiProperty()
  @Field(type => String, { nullable: true })
  firstname: string;
  

  @ApiProperty()
  @Field({ nullable: true })
  email: string;

  @ApiProperty()
  @Field({ nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Field({ nullable: true })
  address: string;

  @ApiProperty()
  @Field({ nullable: true })
  password: string;




}