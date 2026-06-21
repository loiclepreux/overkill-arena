import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { TournamentsServiceController } from './tournaments-service.controller';
import { TournamentsServiceService } from './tournaments-service.service';

const natsUrl = process.env.NATS_URL || 'nats://localhost:4222';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([{
      name: 'NOTIFICATIONS_SERVICE',
      transport: Transport.NATS,
      options: { servers: [natsUrl] },
    }]),
  ],
  controllers: [TournamentsServiceController],
  providers: [TournamentsServiceService],
})
export class TournamentsServiceModule {}
