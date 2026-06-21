import { Test, TestingModule } from '@nestjs/testing';
import { RewardsServiceController } from './rewards-service.controller';
import { RewardsServiceService } from './rewards-service.service';

const mockService = {
  getByUser: jest.fn(),
  award: jest.fn(),
  getStats: jest.fn(),
};

describe('RewardsServiceController', () => {
  let controller: RewardsServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsServiceController],
      providers: [{ provide: RewardsServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<RewardsServiceController>(RewardsServiceController);
    jest.clearAllMocks();
  });

  it('forwards getByUser to service', () => {
    mockService.getByUser.mockResolvedValue([]);
    controller.getByUser({ userId: 'uid' });
    expect(mockService.getByUser).toHaveBeenCalledWith('uid');
  });

  it('forwards getStats to service', () => {
    mockService.getStats.mockResolvedValue({ total: 0, medals: { total: 0, gold: 0, silver: 0, bronze: 0 }, cups: 0, titles: 0 });
    controller.getStats({ userId: 'uid' });
    expect(mockService.getStats).toHaveBeenCalledWith('uid');
  });

  it('forwards award to service', () => {
    const data = { userId: 'uid', type: 'MEDAL', medalRank: 'GOLD' };
    mockService.award.mockResolvedValue({ id: 'rid' });
    controller.award(data);
    expect(mockService.award).toHaveBeenCalledWith(data);
  });
});
