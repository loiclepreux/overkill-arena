import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  login(data: { email: string; password: string }) {
    return this.authClient.send('auth.login', data);
  }

  register(data: { pseudo: string; email: string; password: string }) {
    return this.authClient.send('auth.register', data);
  }
}
