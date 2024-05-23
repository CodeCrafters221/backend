import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoanService } from './loan.service';
import { ILoan, LoanDto } from './dto/loan.dto';

@ApiTags('loans')
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  /**
   *
   * @param userId
   * @description
   * Cette fonction permet de récupérer l'ensemble des prêts de tous les utilisateurs ou un seul utilisateur
   */
  @Get()
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, type: LoanDto })
  @ApiResponse({ status: 404, description: 'Loan not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async fetchLoans(@Query('userId') userId: string) {
    console.log('LOAN CONTROLLER: userId: ', userId);
    if (!userId) return this.loanService.findAll();
    const result = await this.loanService.findLoansOfUser(userId);
    console.log('LOAN CONTROLLER: result: ', result);
    return result;
  }

  /**
   *
   * @description:
   * Cette fonction permet de récupérer un seul prêt
   */
  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: LoanDto,
    description: 'Loan fetched successfully',
  })
  @ApiResponse({ status: 404, description: 'Loan not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async fetchLoan(@Param('id') loanId: string) {
    console.log('LOAN CONTROLLER: loanId: ', loanId);
    const result = await this.loanService.findOneById(loanId);
    console.log('LOAN CONTROLLER: result: ', result);
    return result;
  }

  /**
   *
   * @param loan
   * @description cette fonction permet de créer un prêt
   */
  @Post('')
  @ApiBody({ type: LoanDto, required: true })
  @ApiResponse({
    status: 201,
    type: LoanDto,
    description: 'Loan created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createLoan(@Body() loan: LoanDto) {
    console.log('LOAN CONTROLLER: loan: ', loan);
    let result = await this.loanService.insert(loan);
    console.log('LOAN CONTROLLER: createdLoan: ', result);
    result = result.toObject();
    delete result.__v;
    return { ...loan, ...result };
  }

  /**
   *
   * @param loan
   * @param loanId
   * @description cette fonction permet de mettre à jour un prét
   */
  @Put(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: LoanDto, required: true })
  @ApiResponse({
    status: 200,
    type: LoanDto,
    description: 'Loan updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateLoan(@Body() loan: ILoan, @Param('id') loanId: string) {
    console.log('LOAN CONTROLLER: loan: ', loan);
    console.log('LOAN CONTROLLER: loanId: ', loanId);
    return this.loanService.updateLoan(loan, loanId);
  }

  /**
   *
   * @param loanId
   * @description cette fonction permet de supprimer un prêt
   */
  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Loan deleted successfully' })
  async deleteLoan(@Param('id') loanId: string) {
    console.log('LOAN CONTROLLER: loanId: ', loanId);
    const result = this.loanService.deleteOneById(loanId);
    console.log('LOAN CONTROLLER: delete method: ', result);
    return result;
  }
}
