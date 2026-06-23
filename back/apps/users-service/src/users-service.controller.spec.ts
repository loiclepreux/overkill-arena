import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';

const mockService = {
  getMe: jest.fn(),
  getById: jest.fn(),
  getByIds: jest.fn(),
  updateProfile: jest.fn(),
};

describe('UsersServiceController', () => {
  let controller: UsersServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersServiceController],
      providers: [{ provide: UsersServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersServiceController>(UsersServiceController);
    jest.clearAllMocks();
  });

  it('forwards getMe to service', () => {
    mockService.getMe.mockResolvedValue({ profile: {}, stats: {} });
    void controller.getMe({ userId: 'uid' });
    expect(mockService.getMe).toHaveBeenCalledWith('uid');
  });

  it('forwards getByIds to service', () => {
    mockService.getByIds.mockResolvedValue([{ id: 'uid', pseudo: 'bob' }]);
    void controller.getByIds({ userIds: ['uid'] });
    expect(mockService.getByIds).toHaveBeenCalledWith(['uid']);
  });

  it('forwards updateProfile to service', () => {
    const data = { userId: 'uid', bio: 'hello' };
    mockService.updateProfile.mockResolvedValue({ message: 'ok', profile: {} });
    void controller.updateProfile(data);
    expect(mockService.updateProfile).toHaveBeenCalledWith(data);
  });
});
