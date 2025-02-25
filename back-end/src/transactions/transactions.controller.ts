import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transactions';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionService: TransactionsService) { }

    @Post()
    async createTransaction(
        @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
    ) {
        return await this.transactionService.create(createTransactionDto);
    }

    @Get()
    async listTransactions() { }
}
