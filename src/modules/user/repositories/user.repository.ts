import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../entities/user.mapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private mapper: UserMapper
  ) {}

  async createUser(user: UserDto) {
    const newUser = this.mapper.dtoToEntity(user);
    return await this.userRepository.save(newUser);
  }

  async findUser(email: string) {
    return await this.userRepository.findOne({where: {email}});
  }
}
