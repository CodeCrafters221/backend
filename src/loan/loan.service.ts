/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBasicQueriesService } from 'src/commons/services/mongo-basic-queries.service';
import { ILoan, LoanDto } from './dto/loan.dto';

@Injectable()
export class LoanService extends MongoBasicQueriesService<LoanDto> {
  constructor(@InjectModel(LoanDto.name) private model: Model<LoanDto>) {
    super(model);
  }

  insert(loan: LoanDto) {
    return this.model.create({...loan});
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
}
