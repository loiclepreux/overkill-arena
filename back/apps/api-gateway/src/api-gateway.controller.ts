import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';

import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

type AuthenticatedRequest = {
  user: { id: string; pseudo: string; email: string; role: string };
};

@Controller('auth')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.apiGatewayService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.apiGatewayService.register(body);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Request() req: AuthenticatedRequest) {
    return { user: req.user };
  }

  @Patch('change-password')
  @UseGuards(JwtGuard)
  changePassword(@Body() body: ChangePasswordDto, @Request() req: AuthenticatedRequest) {
    return this.apiGatewayService.changePassword(req.user.id, body.currentPassword, body.newPassword);
  }

}
