import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';

type Req = { user: { id: string } };

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAll(
    @Request() req: Req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.gateway.getNotifications(
      req.user.id,
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get('unread-count')
  @UseGuards(JwtGuard)
  getUnreadCount(@Request() req: Req) {
    return this.gateway.getUnreadCount(req.user.id);
  }

  @Patch(':id/read')
  @UseGuards(JwtGuard)
  markRead(@Param('id') id: string, @Request() req: Req) {
    return this.gateway.markNotificationRead(id, req.user.id);
  }

  @Patch('read-all')
  @UseGuards(JwtGuard)
  markAllRead(@Request() req: Req) {
    return this.gateway.markAllNotificationsRead(req.user.id);
  }
}
