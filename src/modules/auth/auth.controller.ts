import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}
  @Post('signin')
  async signIn(@Body() user: AuthenticateDto) {
    return await this.authSvc.signinSvc(user);
  }
}
