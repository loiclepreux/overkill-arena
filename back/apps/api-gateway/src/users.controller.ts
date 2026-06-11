import {
  Controller,
  Get,
  Request,
  UseGuards,
  Body,
  Patch,
  Param,
} from '@nestjs/common';

import { JwtGuard } from './auth/jwt.guard';
import { ApiGatewayService } from './api-gateway.service';

type AuthenticatedRequest = {
  user: {
    id: string;
  };
};

@Controller('users')
export class UsersController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Request() req: AuthenticatedRequest) {
    return this.apiGatewayService.getMyProfile(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getById(@Param('id') id: string) {
    return this.apiGatewayService.getUserById(id);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  updateProfile(
    @Request()
    req: {
      user: {
        id: string;
      };
    },
    @Body()
    body: {
      bio?: string;
      country?: string;
      favoriteGame?: string;
      avatar?: string;
    },
  ) {
    return this.apiGatewayService.updateProfile({
      userId: req.user.id,
      ...body,
    });
  }
}
