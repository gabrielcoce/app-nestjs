import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { Role } from 'src/modules/auth/enums/role.enum';

export class UserDto {
  id?: string;
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  role: Role[];

  constructor(id: string, email: string, password: string, role: Role[]) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
