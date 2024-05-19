import { Controller, Get } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CurrentUser} from "../auth/decorators/current-user.decorator";
import { IUser} from "../users/interfaces/user.interface";
import { LoanService } from "./loan.service";
import { Loan } from "./dto/loan.entity";
import { ObjectId } from "mongoose";


@ApiTags('loans')
@Controller('loans')
export class LoanController {
  private id: ObjectId;
  constructor(private readonly loanService: LoanService) {}

  @Get()
@ApiQuery({name: 'loan', required: false})
@ApiResponse({status: 200, type: Loan})
@ApiResponse({status: 404, description: 'Loan not found'})
@ApiResponse({status: 500, description: 'Internal server error'})
async fetchLoans(@CurrentUser() user: IUser) {
    return this.loanService.findAll();
  }

  @Get(':id')
@ApiParam({name: 'id', required: true})
@ApiResponse({status: 200, type: Loan})
@ApiResponse({status: 404, description: 'Loan not found'})
@ApiResponse({status: 500, description: 'Internal server error'})
async fetchLoan() {
    return this.loanService.findOneById(this.id);
  }
  
  





}
