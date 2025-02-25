import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const saltOrRounds: number = 6;

    const email = createUserDto.email;
    const userExists = await this.usersRepository.findOne({
      where: { email },
    });

    const password = createUserDto.password;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    if (userExists) {
      throw new HttpException(
        {
          message: 'Email já cadastrado',
        },
        HttpStatus.CONFLICT,
      );
    }

    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: passwordHash,
    });
    return this.usersRepository.save(user);
  }
}
