import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { RewardsServiceController } from './rewards-service.controller';
import { RewardsServiceService } from './rewards-service.service';

@Module({
  imports: [PrismaModule],
  controllers: [RewardsServiceController],
  providers: [RewardsServiceService],
})
export class RewardsServiceModule {}
