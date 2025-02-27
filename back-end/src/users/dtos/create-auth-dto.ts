import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'Senha deve ser informada.' })
  password: string;
}
