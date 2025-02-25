import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
