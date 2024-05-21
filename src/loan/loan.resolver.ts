import { Resolver, Args, Query } from '@nestjs/graphql';
import { Loan } from './graphql/loan.entity';
import { LoanService } from './loan.service';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class LoanResolver {
  constructor(private readonly loanService: LoanService) {}

  @Query(() => [Loan])
  fetchLoans() {
    return this.loanService.findAll();
  }

  @Query(() => Loan)
  async fetchLoan(
    @Args({ name: 'loanId', type: () => String }) loanId: string,
  ) {
    const found = await this.loanService.findByLoanId(loanId);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
