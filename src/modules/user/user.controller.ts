import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async createUser(@Body() user: UserDto) {
    return await this.userService.createUserSvc(user);
  }

  // @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('find-user/:email')
  // async findUser(@Param('email') email: string) {
  //   return await this.userService.findUserSvc(email);
  // }
  @Get('content/server')
  server() {
    return 'servidor arriba';
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('content/usuario')
  user() {
    return 'usuario contenido';
  }
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('content/administrador')
  admin() {
    return 'admin contenido';
  }
}
