import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './entities/user.mapper';
import { UserResponse } from './dto/user.response';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mapper: UserMapper,
  ) {}
  async createUserSvc(user: UserDto) {
    const dto = await this.userRepository.createUser(user);
    const userMapper = this.mapper.entityToDto(dto);
    const userRes = new UserResponse(userMapper.email, userMapper.role);
    console.log('userRes', userRes);
    return userRes;
  }

  async findUserSvc(email: string) {
    const res = await this.userRepository.findUser(email);
    if (!res)
      throw new HttpException(
        'No se encontro el usuario ' + email,
        HttpStatus.NOT_FOUND,
      );
    const userMapper = this.mapper.entityToDto(res);
    // const userRes = new UserResponse(userMapper.email, userMapper.role);
    // console.log('userRes', userRes);
    return userMapper;
  }
}
