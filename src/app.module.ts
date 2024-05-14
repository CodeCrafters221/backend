import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { AuthService } from './auth/auth.service';
import { RService } from './users/r/r.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env}`],
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/codecrafters'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, RService, UsersService],
})
export class AppModule {}
