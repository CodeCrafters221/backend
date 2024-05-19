import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanResolver } from './loan.resolver';

import { MongooseModule } from '@nestjs/mongoose';
import { loanSchema } from './schemas/loan.schema';
import { LoanModelName } from './schemas/loan-model-name';
import { AuthModule } from '../auth/auth.module';
import { LoanController } from './loan.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: LoanModelName, schema: loanSchema }]),
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanResolver],
  exports: [LoanService],
})
export class LoanModule {}
