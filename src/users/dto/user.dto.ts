import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// EXPORT USER ROLE ENUMS FOR MONGOOSE SCHEMA
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
}

// USER LOGIN TYPE FOR APP
export class IUser extends Document {
  @ApiProperty()
  @Prop({ type: String, unique: true, required: true })
  email: string;
  @ApiProperty()
  @Prop({ type: String, required: true })
  password: string;
}

//  SCHEMA FOR USER INHERITS FROM USERLOGIN CLASS
@Schema({ timestamps: true, collection: 'users', strict: false }) // collection: "users" defined, strict: false to allow other fields
export class UserDto extends IUser {
  @ApiProperty()
  @Prop({ type: String, required: true })
  firstname: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  lastname: string;

  @ApiProperty()
  @Prop({ type: String, enum: Object.values(UserRole) })
  role: UserRole;
}

// EXPORT USER SCHEMA
export const UserSchema = SchemaFactory.createForClass(UserDto);
