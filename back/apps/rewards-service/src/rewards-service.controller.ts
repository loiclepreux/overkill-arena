import { Controller, Get } from '@nestjs/common';
import { RewardsServiceService } from './rewards-service.service';

@Controller()
export class RewardsServiceController {
  constructor(private readonly rewardsServiceService: RewardsServiceService) {}

  @Get()
  getHello(): string {
    return this.rewardsServiceService.getHello();
  }
}
