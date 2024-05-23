import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '../dto/user.dto';

// OBJECTYPE OF USER FOR GRAPHQL SCHEMA
@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  role: UserRole;
}

// EXPORT USER ROLE ENUMS FOR GRAPHQL SCHEMA
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Possible user role',
});
