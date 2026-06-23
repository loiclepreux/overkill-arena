import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

const mockService = {
  login: jest.fn(),
  register: jest.fn(),
  me: jest.fn(),
  changePassword: jest.fn(),
};

describe('AuthServiceController', () => {
  let controller: AuthServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthServiceController],
      providers: [{ provide: AuthServiceService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthServiceController>(AuthServiceController);
    jest.clearAllMocks();
  });

  it('forwards login to service', () => {
    const payload = { email: 'a@b.com', password: 'pass' };
    mockService.login.mockResolvedValue({ accessToken: 'tok' });
    void controller.login(payload);
    expect(mockService.login).toHaveBeenCalledWith(payload);
  });

  it('forwards register to service', () => {
    const payload = { pseudo: 'bob', email: 'b@b.com', password: 'pass' };
    mockService.register.mockResolvedValue({ accessToken: 'tok' });
    void controller.register(payload);
    expect(mockService.register).toHaveBeenCalledWith(payload);
  });

  it('forwards changePassword to service', () => {
    const payload = {
      userId: 'uid',
      currentPassword: 'old',
      newPassword: 'new',
    };
    mockService.changePassword.mockResolvedValue({ message: 'ok' });
    void controller.changePassword(payload);
    expect(mockService.changePassword).toHaveBeenCalledWith(payload);
  });
});
