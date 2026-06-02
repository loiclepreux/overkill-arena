import { Test, TestingModule } from '@nestjs/testing';
import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';

describe('TeamsServiceController', () => {
  let teamsServiceController: TeamsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeamsServiceController],
      providers: [TeamsServiceService],
    }).compile();

    teamsServiceController = app.get<TeamsServiceController>(TeamsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(teamsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
