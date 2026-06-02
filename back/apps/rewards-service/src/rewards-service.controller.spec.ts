import { Test, TestingModule } from '@nestjs/testing';
import { RewardsServiceController } from './rewards-service.controller';
import { RewardsServiceService } from './rewards-service.service';

describe('RewardsServiceController', () => {
  let rewardsServiceController: RewardsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RewardsServiceController],
      providers: [RewardsServiceService],
    }).compile();

    rewardsServiceController = app.get<RewardsServiceController>(RewardsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rewardsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
