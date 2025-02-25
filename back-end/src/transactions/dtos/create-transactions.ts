import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Description should not be empty' })
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  price: number;

  @IsNotEmpty({ message: 'Category should not be empty' })
  category: string;

  @IsNotEmpty({ message: 'Type should not be empty' })
  type: string;
}
