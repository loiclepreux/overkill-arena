import { Test, TestingModule } from '@nestjs/testing';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';

describe('MatchesServiceController', () => {
  let matchesServiceController: MatchesServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MatchesServiceController],
      providers: [MatchesServiceService],
    }).compile();

    matchesServiceController = app.get<MatchesServiceController>(MatchesServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(matchesServiceController.getHello()).toBe('Hello World!');
    });
  });
});
