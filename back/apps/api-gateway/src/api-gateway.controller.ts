import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';

@Controller('auth')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.apiGatewayService.login(body);
  }

  @Post('register')
  register(
    @Body()
    body: {
      pseudo: string;
      email: string;
      password: string;
    },
  ) {
    return this.apiGatewayService.register(body);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(
    @Request()
    req: {
      user: { id: string; pseudo: string; email: string; role: string };
    },
  ) {
    return {
      user: req.user,
    };
  }

  @Get('admin-test')
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  adminTest() {
    return {
      message: 'Bienvenue Admin',
    };
  }
}
