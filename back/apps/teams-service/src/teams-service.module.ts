import { Module } from '@nestjs/common';

import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';
import { PrismaService } from './prisma-service';

@Module({
  imports: [],
  controllers: [TeamsServiceController],
  providers: [TeamsServiceService, PrismaService],
})
export class TeamsServiceModule {}
