import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';

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
  controllers: [MatchesServiceController],
  providers: [MatchesServiceService],
})
export class MatchesServiceModule {}
