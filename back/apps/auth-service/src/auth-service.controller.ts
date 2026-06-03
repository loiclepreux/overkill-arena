import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern('auth.login')
  login(@Payload() data: { email: string; password: string }) {
    return this.authServiceService.login(data);
  }

  @MessagePattern('auth.register')
  register(
    @Payload()
    data: {
      pseudo: string;
      email: string;
      password: string;
    },
  ) {
    return this.authServiceService.register(data);
  }

  @MessagePattern('auth.me')
  me(
    @Payload()
    data: {
      accessToken: string;
    },
  ) {
    return this.authServiceService.me(data);
  }
}
