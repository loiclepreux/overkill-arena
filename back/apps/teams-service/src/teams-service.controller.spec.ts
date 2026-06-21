import { Test, TestingModule } from '@nestjs/testing';
import { TeamsServiceController } from './teams-service.controller';
import { TeamsServiceService } from './teams-service.service';

const mockService = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  getByUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  requestJoin: jest.fn(),
  getJoinRequests: jest.fn(),
  respondJoinRequest: jest.fn(),
  leave: jest.fn(),
  kickMember: jest.fn(),
};

describe('TeamsServiceController', () => {
  let controller: TeamsServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsServiceController],
      providers: [{ provide: TeamsServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<TeamsServiceController>(TeamsServiceController);
    jest.clearAllMocks();
  });

  it('forwards getAll to service', () => {
    mockService.getAll.mockResolvedValue([]);
    controller.getAll();
    expect(mockService.getAll).toHaveBeenCalled();
  });

  it('forwards requestJoin to service', () => {
    const data = { teamId: 'tid', userId: 'uid' };
    mockService.requestJoin.mockResolvedValue({ id: 'rid' });
    controller.requestJoin(data);
    expect(mockService.requestJoin).toHaveBeenCalledWith(data);
  });

  it('forwards leave to service', () => {
    const data = { teamId: 'tid', userId: 'uid' };
    mockService.leave.mockResolvedValue({ message: 'ok' });
    controller.leave(data);
    expect(mockService.leave).toHaveBeenCalledWith(data);
  });
});
