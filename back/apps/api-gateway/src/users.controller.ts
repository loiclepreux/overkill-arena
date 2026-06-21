import { Body, Controller, Get, Param, Patch, Query, Request, UseGuards } from '@nestjs/common';

import { JwtGuard } from './auth/jwt.guard';
import { ApiGatewayService } from './api-gateway.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

type AuthenticatedRequest = {
  user: { id: string };
};

@Controller('users')
export class UsersController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Request() req: AuthenticatedRequest) {
    return this.apiGatewayService.getMyProfile(req.user.id);
  }

  @Get('bulk')
  @UseGuards(JwtGuard)
  getBulk(@Query('ids') ids: string) {
    const userIds = ids ? ids.split(',').filter(Boolean) : [];
    return this.apiGatewayService.getUsersByIds(userIds);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getById(@Param('id') id: string) {
    return this.apiGatewayService.getUserById(id);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() body: UpdateProfileDto,
  ) {
    return this.apiGatewayService.updateProfile({ userId: req.user.id, ...body });
  }
}
