import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { RewardsServiceController } from './rewards-service.controller';
import { RewardsServiceService } from './rewards-service.service';

const natsUrl = process.env.NATS_URL || 'nats://localhost:4222';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.NATS,
        options: { servers: [natsUrl] },
      },
    ]),
  ],
  controllers: [RewardsServiceController],
  providers: [RewardsServiceService],
})
export class RewardsServiceModule {}
