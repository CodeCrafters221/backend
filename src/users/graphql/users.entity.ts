import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../dto/user.dto';

// OBJECTYPE OF USER FOR GRAPHQL SCHEMA
@ObjectType()
export class User {
  @ApiProperty()
  @Field(() => String, { nullable: true })
  firstname: string;

  @ApiProperty()
  @Field(() => String, { nullable: true })
  lastname: string;

  @ApiProperty()
  @Field({ nullable: true })
  password: string;

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
  role: UserRole;
}

// EXPORT USER ROLE ENUMS FOR GRAPHQL SCHEMA
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Possible user role',
});
