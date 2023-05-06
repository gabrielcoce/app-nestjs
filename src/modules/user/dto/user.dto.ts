import { IsEmail, MinLength } from 'class-validator';
import { Role } from 'src/modules/auth/enums/role.enum';

export class UserDto {
  id?: string;
  @IsEmail()
  email: string;
  @MinLength(8)
  password: string;
  role: Role[];

  constructor(id: string, email: string, password: string, role: Role[]) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
