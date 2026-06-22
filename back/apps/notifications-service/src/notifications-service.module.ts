import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([{
      name: 'NATS_CLIENT',
      transport: Transport.NATS,
      options: { servers: [process.env.NATS_URL || 'nats://localhost:4222'] },
    }]),
  ],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService],
})
export class NotificationsServiceModule {}
