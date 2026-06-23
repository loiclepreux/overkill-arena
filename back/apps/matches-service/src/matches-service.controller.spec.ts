import { Test, TestingModule } from '@nestjs/testing';
import { MatchesServiceController } from './matches-service.controller';
import { MatchesServiceService } from './matches-service.service';

const mockService = {
  create: jest.fn(),
  getById: jest.fn(),
  getByTeam: jest.fn(),
  getByTournament: jest.fn(),
  submitScore: jest.fn(),
  validate: jest.fn(),
  contest: jest.fn(),
  updateStatus: jest.fn(),
};

describe('MatchesServiceController', () => {
  let controller: MatchesServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesServiceController],
      providers: [{ provide: MatchesServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<MatchesServiceController>(MatchesServiceController);
    jest.clearAllMocks();
  });

  it('forwards getByTeam to service', () => {
    mockService.getByTeam.mockResolvedValue([]);
    void controller.getByTeam({ teamId: 'tid' });
    expect(mockService.getByTeam).toHaveBeenCalledWith('tid');
  });

  it('forwards submitScore to service', () => {
    const data = { id: 'mid', teamId: 'tid', scoreA: 2, scoreB: 1 };
    mockService.submitScore.mockResolvedValue({ id: 'mid' });
    void controller.submitScore(data);
    expect(mockService.submitScore).toHaveBeenCalledWith(data);
  });

  it('forwards validate to service', () => {
    mockService.validate.mockResolvedValue({ id: 'mid', status: 'COMPLETED' });
    void controller.validate({ id: 'mid' });
    expect(mockService.validate).toHaveBeenCalledWith({ id: 'mid' });
  });
});
