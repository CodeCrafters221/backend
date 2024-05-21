import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { userModelName } from './schemas/user.model-name';
// import { userSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserDto, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    // MongooseModule.forFeature([{ schema: userSchema, name: userModelName }]),
    MongooseModule.forFeature([{ schema: UserSchema, name: UserDto.name }]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
