import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface payloadUser {
  sub: string;
  username: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
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

  async createLogin(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    const isAuthenticatedUser = await bcrypt.compare(password, user.password);

    if (!isAuthenticatedUser || !user) {
      throw new HttpException(
        { message: 'Invalid credentials', error: 'InvalidCredentials' },
        HttpStatus.CONFLICT,
      );
    }

    const payload: payloadUser = {
      sub: user.id,
      username: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
