import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WsNotificationsGateway } from './ws-notifications.gateway';

@Controller()
export class PushController {
  constructor(private readonly wsGateway: WsNotificationsGateway) {}

  @EventPattern('notification.pushed')
  handle(@Payload() data: { userId: string; notification: unknown }) {
    this.wsGateway.pushToUser(data.userId, data.notification);
  }
}
