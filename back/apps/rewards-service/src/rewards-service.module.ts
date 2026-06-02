import { Module } from '@nestjs/common';
import { RewardsServiceController } from './rewards-service.controller';
import { RewardsServiceService } from './rewards-service.service';

@Module({
  imports: [],
  controllers: [RewardsServiceController],
  providers: [RewardsServiceService],
})
export class RewardsServiceModule {}
