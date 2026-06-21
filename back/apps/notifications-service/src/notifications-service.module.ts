import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService],
})
export class NotificationsServiceModule {}
