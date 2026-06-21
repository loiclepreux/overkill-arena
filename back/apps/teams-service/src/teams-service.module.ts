import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/prisma';
import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsServiceController],
  providers: [TeamsServiceService],
})
export class TeamsServiceModule {}
