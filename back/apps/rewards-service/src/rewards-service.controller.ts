import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RewardsServiceService } from './rewards-service.service';
import { RewardType, MedalRank } from '@prisma/client';

@Controller()
export class RewardsServiceController {
  constructor(private readonly rewardsService: RewardsServiceService) {}

  @MessagePattern('rewards.get-by-user')
  getByUser(@Payload() payload: { userId: string }) {
    return this.rewardsService.getByUser(payload.userId);
  }

  @MessagePattern('rewards.award')
  award(
    @Payload()
    payload: {
      userId: string;
      type: RewardType;
      medalRank?: MedalRank;
      cupName?: string;
      titleName?: string;
      description?: string;
      tournamentId?: string;
      matchId?: string;
    },
  ) {
    return this.rewardsService.award(payload);
  }

  @MessagePattern('rewards.get-stats')
  getStats(@Payload() payload: { userId: string }) {
    return this.rewardsService.getStats(payload.userId);
  }
}
