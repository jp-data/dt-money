import { CreateTransactionDto } from './dtos/create-transactions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const newTransaction =
      this.transactionsRepository.create(createTransactionDto);
    return this.transactionsRepository.save(newTransaction);
  }
}
