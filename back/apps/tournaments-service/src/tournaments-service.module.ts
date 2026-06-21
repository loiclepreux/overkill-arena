import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { TournamentsServiceController } from './tournaments-service.controller';
import { TournamentsServiceService } from './tournaments-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [TournamentsServiceController],
  providers: [TournamentsServiceService],
})
export class TournamentsServiceModule {}
