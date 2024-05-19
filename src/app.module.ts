import { MongoBasicQueriesService } from './commons/services/mongo-basic-queries.service';
import { ClientsModule } from './clients/clients.module';
import { ClientsService } from './clients/clients.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { GqlUuid } from './commons/graphql/uuid.scalar';
import { LoanController } from './loan/loan.controller';
import { LoanModule } from './loan/loan.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule, MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule, GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      resolvers: { UUID: GqlUuid },
      playground: process.env.mode !== "prod"
    }),
    AuthModule,
    LoanModule],
  controllers: [AppController, LoanController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AppInterceptor
  }],
})
export class AppModule { }
