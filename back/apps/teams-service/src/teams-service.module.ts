import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';

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
  controllers: [TeamsServiceController],
  providers: [TeamsServiceService],
})
export class TeamsServiceModule {}
