import { SharedModule } from './utils/jwt-shared-module';
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from './guard/guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [UserService, AuthGuard],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule { }
