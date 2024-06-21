import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanResolver } from './loan.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './loan.controller';
import { LoanDto, LoanSchema } from './dto/loan.dto';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AI_ASSISTANT_SERVICE',
        transport: Transport.TCP,
        options: {
          port: Number(process.env.AI_MICROSERVICE_PORT) || 3001,
        },
      },
    ]),
    MongooseModule.forFeature([{ name: LoanDto.name, schema: LoanSchema }]),
  ],
  controllers: [LoanController],
  providers: [LoanService, LoanResolver],
  exports: [LoanService],
})
export class LoanModule {}
