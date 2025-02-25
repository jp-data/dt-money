import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
