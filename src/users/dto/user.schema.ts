import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

// EXPORT USER ROLE ENUMS FOR MONGOOSE SCHEMA
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
}

// USER LOGIN TYPE FOR APP
export class IUser extends Document {
  @Prop({ type: String, unique: true, required: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
}

//  SCHEMA FOR USER INHERITS FROM USERLOGIN CLASS
@Schema({ timestamps: true, collection: 'users' }) // collection: "users" defined
export class UserDto extends IUser {
  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, enum: Object.values(UserRole) })
  role: UserRole;
}

// EXPORT USER SCHEMA
export const UserSchema = SchemaFactory.createForClass(UserDto);
