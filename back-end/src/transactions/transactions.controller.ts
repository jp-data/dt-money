import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transactions';
import { AuthGuard, RequestWithUser } from 'users/guard/guard';
import { TransactionsEntity } from './entities/transactions.entity';
import { UserEntity } from 'users/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) { }

  @Post()
  async createTransaction(
    @Req() req: RequestWithUser,
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
  ) {
    const dataTransaction = new TransactionsEntity();

    dataTransaction.category = createTransactionDto.category;
    dataTransaction.description = createTransactionDto.description;
    dataTransaction.price = createTransactionDto.price;
    dataTransaction.type = createTransactionDto.type;
    dataTransaction.user = { id: req.user.sub } as UserEntity;

    const newTransaction =
      await this.transactionService.create(dataTransaction);

    return newTransaction;
  }

  @Get()
  async listTransactions(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.transactionService.getTransactions(userId);
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
