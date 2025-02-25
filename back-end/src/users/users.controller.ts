import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
