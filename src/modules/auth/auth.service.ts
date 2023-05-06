import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/authenticate.interface';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signinSvc(authUser: AuthenticateDto): Promise<Record<string, any>> {
    const { email, password } = authUser;
    const user = await this.userService.findUserSvc(email);
    // if (!user) {
    //   console.log('not found');
    //   return { status: 401, msg: { msg: 'Invalid credentials' } };
    // }
    const isValid = this.validatePassword(password, user.password);
    if (!isValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload: IAuthenticate = { user: { email, role: user.role } };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  private validatePassword(password: string, passwordCompare: string) {
    return bcrypt.compareSync(password, passwordCompare);
  }
}
