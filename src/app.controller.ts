import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { LoanService } from './loan/loan.service';

@Controller('')
export class AppController {
  constructor(private loanService: LoanService) {}

  @Put('configs')
  updateConfigs(@Body() configs?: any) {
    console.log('APP CONTROLLER: RUN METHOD TO TEST GEMINI ---->', configs);
    return this.loanService.updateConfigs(configs);
  }

  @Get('configs')
  async getConfigs() {
    console.log('APP CONTROLLER: get configs of the AI ---->');
    const result = await this.loanService.getConfigs();
    console.log('APP CONTROLLER: get configs of the AI ---->', result);
    return result;
  }

  @Post('interview')
  async respondToClient(
    @Body('loanId') loanId: string,
    @Body('clientMessage') clientMessage: string,
  ) {
    console.log('APP CONTROLLER: ---> respondToClient method: ', loanId);
    const result = await this.loanService.respondToClient(
      loanId,
      clientMessage,
    );
    console.log('APP CONTROLLER ----> response of ai assistant: ', result);
    return result;
  }
}
