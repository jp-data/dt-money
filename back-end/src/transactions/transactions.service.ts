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

  async getTransactions() {
    const transactions = await this.transactionsRepository.query(
      `SELECT * FROM transactions
        ORDER BY "createdAt" ASC`,
    );
    return transactions;
  }

  async getFilteredTransactions(
    category: string,
    type: string,
    monthYear: string,
  ) {
    let query = `
        SELECT * FROM transactions WHERE 1=1`;
    const queryParams: any[] = [];

    if (category) {
      query += ` AND category = '${category}'`;
    }

    if (type) {
      query += ` AND type = '${type}'`;
    }

    if (monthYear) {
      query += ` AND TO_CHAR("createdAt", 'MM/YYYY') = ${monthYear}`;
    }

    return await this.transactionsRepository.query(query, queryParams);
  }
}
