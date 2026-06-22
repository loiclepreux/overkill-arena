import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt.guard';
import { ApiGatewayService } from './api-gateway.service';

type Req = { user: { id: string } };

@Controller('setup')
export class SetupController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Post('promote-admin')
  @UseGuards(JwtGuard)
  promoteAdmin(@Request() req: Req) {
    return this.gateway.promoteToAdmin(req.user.id);
  }
}
