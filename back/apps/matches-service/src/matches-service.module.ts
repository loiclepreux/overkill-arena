import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [MatchesServiceController],
  providers: [MatchesServiceService],
})
export class MatchesServiceModule {}
