import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/ormconfig';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SharedModule } from './users/utils/jwt-shared-module';
import { ConfigModule } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
    }),
    UsersModule,
    TransactionsModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
