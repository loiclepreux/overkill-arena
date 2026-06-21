import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsServiceController } from './tournaments-service.controller';
import { TournamentsServiceService } from './tournaments-service.service';

const mockService = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  updateStatus: jest.fn(),
  registerTeam: jest.fn(),
  unregisterTeam: jest.fn(),
  getParticipants: jest.fn(),
};

describe('TournamentsServiceController', () => {
  let controller: TournamentsServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentsServiceController],
      providers: [{ provide: TournamentsServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<TournamentsServiceController>(TournamentsServiceController);
    jest.clearAllMocks();
  });

  it('forwards getAll to service', () => {
    mockService.getAll.mockResolvedValue([]);
    controller.getAll({});
    expect(mockService.getAll).toHaveBeenCalled();
  });

  it('forwards updateStatus to service', () => {
    const data = { id: 'tid', status: 'OPEN' };
    mockService.updateStatus.mockResolvedValue({ id: 'tid', status: 'OPEN' });
    controller.updateStatus(data);
    expect(mockService.updateStatus).toHaveBeenCalledWith(data);
  });

  it('forwards registerTeam to service', () => {
    const data = { tournamentId: 'tid', teamId: 'tmid' };
    mockService.registerTeam.mockResolvedValue({ id: 'pid' });
    controller.registerTeam(data);
    expect(mockService.registerTeam).toHaveBeenCalledWith(data);
  });
});
