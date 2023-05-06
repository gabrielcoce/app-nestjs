import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserMapper } from './entities/user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
