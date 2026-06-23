import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { AwardRewardDto } from './dto/award-reward.dto';

type Req = { user: { id: string } };

@Controller('rewards')
export class RewardsController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  getMyRewards(@Request() req: Req) {
    return this.gateway.getRewardsByUser(req.user.id);
  }

  @Get('me/stats')
  @UseGuards(JwtGuard)
  getMyStats(@Request() req: Req) {
    return this.gateway.getRewardStats(req.user.id);
  }

  @Get('user/:userId')
  @UseGuards(JwtGuard)
  getByUser(@Param('userId') userId: string) {
    return this.gateway.getRewardsByUser(userId);
  }

  @Get('user/:userId/stats')
  @UseGuards(JwtGuard)
  getStatsByUser(@Param('userId') userId: string) {
    return this.gateway.getRewardStats(userId);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  award(@Body() body: AwardRewardDto) {
    return this.gateway.awardReward(body);
  }
}
