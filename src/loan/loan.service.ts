import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBasicQueriesService } from 'src/commons/services/mongo-basic-queries.service';
import { ILoan } from './interface/loan.interface';
import { LoanModelName } from './schemas/loan-model-name';

@Injectable()
export class LoanService extends MongoBasicQueriesService<ILoan> {
  constructor(@InjectModel(LoanModelName) private model: Model<ILoan>) {
    super(model);
  }

  insert(loan: ILoan) {
    return this.model.create(loan);
  }

  findByLoanId(loanId: string) {
    return this.model.findOne({ loanId });
  }

  getLoans() {
    return this.model.find();
  }

  async updateLoan(loan: ILoan) {
    return this.model.updateOne({ loanId: loan.loanId }, loan);
  }

  async deleteLoan(loanId: string) {
    return this.model.deleteOne({ loanId });
  }
}
