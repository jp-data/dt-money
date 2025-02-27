import { CreateTransactionDto } from './dtos/create-transactions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { TransactionsListDto } from './dtos/transactions-list';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const newTransaction =
      this.transactionsRepository.create(createTransactionDto);
    return this.transactionsRepository.save(newTransaction);
  }

  async getTransactions(userId: string) {
    const transactionsForList = await this.transactionsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });

    const transactions = transactionsForList.map(
      (transactions) =>
        new TransactionsListDto(
          transactions.id,
          transactions.description,
          transactions.price,
          transactions.category,
          transactions.type,
        ),
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
