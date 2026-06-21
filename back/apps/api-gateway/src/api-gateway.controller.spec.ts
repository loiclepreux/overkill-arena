import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

const mockService = {
  login: jest.fn(),
  register: jest.fn(),
  changePassword: jest.fn(),
};

describe('ApiGatewayController', () => {
  let controller: ApiGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiGatewayController],
      providers: [{ provide: ApiGatewayService, useValue: mockService }],
    }).compile();

    controller = module.get<ApiGatewayController>(ApiGatewayController);
    jest.clearAllMocks();
  });

  it('forwards login to service', () => {
    const body = { email: 'a@b.com', password: 'pass' };
    mockService.login.mockReturnValue({ subscribe: jest.fn() });
    controller.login(body as any);
    expect(mockService.login).toHaveBeenCalledWith(body);
  });

  it('forwards register to service', () => {
    const body = { pseudo: 'bob', email: 'b@b.com', password: 'pass' };
    mockService.register.mockReturnValue({ subscribe: jest.fn() });
    controller.register(body as any);
    expect(mockService.register).toHaveBeenCalledWith(body);
  });

  it('me returns user from request', () => {
    const req = { user: { id: 'uid', pseudo: 'bob', email: 'b@b.com', role: 'PLAYER' } };
    const result = controller.me(req as any);
    expect(result).toEqual({ user: req.user });
  });
});
