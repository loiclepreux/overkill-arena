import { Module } from '@nestjs/common';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';

@Module({
  imports: [],
  controllers: [MatchesServiceController],
  providers: [MatchesServiceService],
})
export class MatchesServiceModule {}
