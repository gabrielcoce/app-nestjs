import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  dtoToEntity(userDto: UserDto): UserEntity {
    return new UserEntity(
      userDto.id,
      userDto.email,
      userDto.password,
      userDto.role,
    );
  }

  entityToDto(userEntity: UserEntity): UserDto {
    return new UserDto(
      userEntity.id,
      userEntity.email,
      userEntity.password,
      userEntity.role,
    );
  }
}
