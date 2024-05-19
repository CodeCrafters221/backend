import { Resolver, Args, Mutation, ID, Query } from '@nestjs/graphql';
import { Loan } from './dto/loan.entity';
import { LoanService } from './loan.service';
import { LoanInput } from './dto/loan.input';
import { ILoan} from "./interface/loan.interface";
import { NotFoundException } from "@nestjs/common";

@Resolver()
export class LoanResolver {
  constructor(
    private readonly loanService: LoanService,
  ) {}

  @Query(returns => [Loan])
  fetchLoans() {
    return this.loanService.findAll();
  }

  @Query(returns => Loan)
  async fetchLoan( @Args({ name: 'loanId', type: () => String }) loanId: string ) {
      const found = await this.loanService.findByLoanId(loanId);
      if(!found) {
          throw new NotFoundException();
      }
      return found;
  }


}
