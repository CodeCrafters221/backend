import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanResolver } from './loan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './loan.controller';
import { LoanDto, LoanSchema } from './dto/loan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LoanDto.name, schema: LoanSchema }]),
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanResolver],
  exports: [LoanService],
})
export class LoanModule {}
