/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserDto, UserSchema } from './dto/user.dto';
import { LoanModule } from 'src/loan/loan.module';

@Module({
  imports: [
    LoanModule,
    MongooseModule.forFeature([{ schema: UserSchema, name: UserDto.name }]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
