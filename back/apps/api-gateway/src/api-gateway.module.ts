import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './auth/roles.guard';
import { UsersController } from './users.controller';
import { TeamsController } from './teams.controller';
import { TournamentsController } from './tournaments.controller';
import { MatchesController } from './matches.controller';
import { RewardsController } from './rewards.controller';
import { NotificationsController } from './notifications.controller';
import { PublicController } from './public.controller';
import { SetupController } from './setup.controller';
import { WsNotificationsGateway } from './ws/ws-notifications.gateway';
import { PushController } from './ws/push.controller';

const natsUrl = process.env.NATS_URL || 'nats://localhost:4222';

const natsClient = (name: string) => ({
  name,
  transport: Transport.NATS as const,
  options: { servers: [natsUrl] },
});

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'overkill_super_secret_dev',
    }),
    ClientsModule.register([
      natsClient('AUTH_SERVICE'),
      natsClient('USERS_SERVICE'),
      natsClient('TEAMS_SERVICE'),
      natsClient('TOURNAMENTS_SERVICE'),
      natsClient('MATCHES_SERVICE'),
      natsClient('REWARDS_SERVICE'),
      natsClient('NOTIFICATIONS_SERVICE'),
    ]),
  ],
  controllers: [
    ApiGatewayController,
    UsersController,
    TeamsController,
    TournamentsController,
    MatchesController,
    RewardsController,
    NotificationsController,
    PublicController,
    SetupController,
    PushController,
  ],
  providers: [ApiGatewayService, JwtStrategy, RolesGuard, WsNotificationsGateway],
})
export class ApiGatewayModule {}
