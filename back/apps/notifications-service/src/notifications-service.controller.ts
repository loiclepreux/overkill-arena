import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsServiceService } from './notifications-service.service';
import { NotificationKind } from '@prisma/client';

@Controller()
export class NotificationsServiceController {
  constructor(
    private readonly notificationsService: NotificationsServiceService,
  ) {}

  @MessagePattern('notifications.get-by-user')
  getByUser(
    @Payload() payload: { userId: string; page?: number; limit?: number },
  ) {
    return this.notificationsService.getByUser(payload);
  }

  @MessagePattern('notifications.get-unread-count')
  getUnreadCount(@Payload() payload: { userId: string }) {
    return this.notificationsService.getUnreadCount(payload.userId);
  }

  @MessagePattern('notifications.create')
  create(
    @Payload()
    payload: {
      userId: string;
      kind: NotificationKind;
      title: string;
      message: string;
    },
  ) {
    return this.notificationsService.create(payload);
  }

  @MessagePattern('notifications.mark-read')
  markRead(@Payload() payload: { id: string; userId: string }) {
    return this.notificationsService.markRead(payload);
  }

  @MessagePattern('notifications.mark-all-read')
  markAllRead(@Payload() payload: { userId: string }) {
    return this.notificationsService.markAllRead(payload.userId);
  }
}
