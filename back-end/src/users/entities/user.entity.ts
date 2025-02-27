import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TransactionsEntity } from '../../transactions/entities/transactions.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    length: 30,
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'email',
    length: 70,
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Exclude()
  @Column({
    name: 'password',
    length: 250,
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @OneToMany(
    () => TransactionsEntity,
    (transactionsEntity) => transactionsEntity.user,
  )
  transactions: TransactionsEntity[];
}
