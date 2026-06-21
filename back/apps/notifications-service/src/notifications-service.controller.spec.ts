import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';

const mockService = {
  getByUser: jest.fn(),
  getUnreadCount: jest.fn(),
  create: jest.fn(),
  markRead: jest.fn(),
  markAllRead: jest.fn(),
};

describe('NotificationsServiceController', () => {
  let controller: NotificationsServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsServiceController],
      providers: [{ provide: NotificationsServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<NotificationsServiceController>(NotificationsServiceController);
    jest.clearAllMocks();
  });

  it('forwards getByUser to service', () => {
    mockService.getByUser.mockResolvedValue({ notifications: [], total: 0, page: 1, limit: 20 });
    controller.getByUser({ userId: 'uid', page: 1, limit: 20 });
    expect(mockService.getByUser).toHaveBeenCalled();
  });

  it('forwards getUnreadCount to service', () => {
    mockService.getUnreadCount.mockResolvedValue({ count: 3 });
    controller.getUnreadCount({ userId: 'uid' });
    expect(mockService.getUnreadCount).toHaveBeenCalledWith('uid');
  });

  it('forwards markAllRead to service', () => {
    mockService.markAllRead.mockResolvedValue({ message: 'ok', count: 2 });
    controller.markAllRead({ userId: 'uid' });
    expect(mockService.markAllRead).toHaveBeenCalledWith('uid');
  });
});
