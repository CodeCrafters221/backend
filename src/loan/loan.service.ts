/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBasicQueriesService } from 'src/commons/services/mongo-basic-queries.service';
import { ILoan, LoanDto } from './dto/loan.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoanService extends MongoBasicQueriesService<LoanDto> {
  constructor(@InjectModel(LoanDto.name) private model: Model<LoanDto>,
  @Inject("AI_ASSISTANT_SERVICE") private readonly client: ClientProxy) {
    super(model);
  }

  async insert(loan: LoanDto) {
    const newLoan: LoanDto = await this.model.create({...loan}) as LoanDto;
    console.log("LOAN SERVICE: new loan", newLoan)
   const aiResponse = await firstValueFrom(this.client.send<string>({cmd: 'loan_created'}, newLoan))
   newLoan.aiResponse = aiResponse
   console.log("LOAN SERVICE: response from ai assistant")
    return newLoan;
  }


  findLoansOfUser(userId: string){
    return this.model.find({ userId })
  }

  findByLoanId(loanId: string) {
    return this.model.findOne({ loanId });
  }

  getLoans() {
    return this.model.find();
  }

  async updateLoan(loan: ILoan, loanId: string) {
    return this.model.findByIdAndUpdate(loanId, loan, { new: true});
  }

  async deleteLoan(loanId: string) {
    return this.model.deleteOne({ loanId });
  }









  async updateConfigs(configs: any){
    const res = await firstValueFrom(this.client.send<any>({cmd: 'updateConfigs'}, configs))
    return res
  }

  async getConfigs(){
    const res = await firstValueFrom(this.client.send<any>({cmd: 'getConfigs'}, {}))
    return res
  }

  async respondToClient(loanId: string, clientMessage: string){
    const res = await firstValueFrom(this.client.send<any>({cmd: 'respondToClient'}, {loanId, clientMessage}))
    return res
  }
}
