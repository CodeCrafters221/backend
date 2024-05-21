/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

// export const userSchema = new Schema(
//   {
//     email: { type: String, unique: true, required: true },
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: Object.values(UserRole) },
//   },
//   { timestamps: true },
// );

// USER LOGIN SCHEMA
export class UserLogin extends Document {
  @Prop({ type: String, unique: true, required: true })
  email: string; 
  @Prop({ type: String, required: true })
  password: string;
}

//  SCHEMA FOR USER INHERITS FROM USRLOGIN CLASS
@Schema({ timestamps: true, collection: "users" }) // collection: "users" defined
export class UserDto extends UserLogin {

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, enum: Object.values(UserRole) })
  role: UserRole;
  
}

// EXPORT USER SCHEMA
export const UserSchema = SchemaFactory.createForClass(UserDto);

