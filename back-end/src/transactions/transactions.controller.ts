import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transactions';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
  ) {
    return await this.transactionService.create(createTransactionDto);
  }

  @Get()
  async listTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get('/filter')
  async listFilteredTransactions(
    @Query('category') category?: string,
    @Query('type') type?: string,
    @Query('monthYear') monthYear?: string,
  ) {
    return await this.transactionService.getFilteredTransactions(
      category,
      type,
      monthYear,
    );
  }
}
