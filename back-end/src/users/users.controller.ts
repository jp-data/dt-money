import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { CreateAuthDto } from './dtos/create-auth-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  login(@Body() { email, password }: CreateAuthDto) {
    return this.userService.createLogin(email, password);
  }
}
