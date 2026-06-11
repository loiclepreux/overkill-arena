import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  pseudo: string;
  email: string;
  password: string;
};

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,

    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
  ) {}

  login(data: LoginPayload) {
    return this.authClient.send('auth.login', data);
  }

  register(data: RegisterPayload) {
    return this.authClient.send('auth.register', data);
  }

  getMyProfile(userId: string) {
    return this.usersClient.send('users.get-me', { userId });
  }

  updateProfile(data: {
    userId: string;
    bio?: string;
    country?: string;
    favoriteGame?: string;
    avatar?: string;
  }) {
    return this.usersClient.send('users.update-profile', data);
  }
}
