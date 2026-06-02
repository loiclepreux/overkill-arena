import { Module } from '@nestjs/common';
import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';

@Module({
  imports: [],
  controllers: [TeamsServiceController],
  providers: [TeamsServiceService],
})
export class TeamsServiceModule {}
