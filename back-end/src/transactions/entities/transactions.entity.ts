import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'description',
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  description: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Column({
    name: 'price',
    nullable: false,
    type: 'float',
  })
  price: number;

  @Column({
    name: 'category',
    nullable: false,
    length: 100,
    type: 'varchar',
  })
  category: string;

  @Column({
    name: 'type',
    nullable: false,
    length: 20,
    type: 'varchar',
  })
  type: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.transactions)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
