import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersServiceService } from './users-service.service';

@Controller()
export class UsersServiceController {
  constructor(private readonly usersServiceService: UsersServiceService) {}

  @MessagePattern('users.get-me')
  getMe(@Payload() data: { userId: string }) {
    return this.usersServiceService.getMe(data.userId);
  }

  @MessagePattern('users.get-by-id')
  getById(@Payload() data: { userId: string }) {
    return this.usersServiceService.getById(data.userId);
  }

  @MessagePattern('users.get-by-ids')
  getByIds(@Payload() data: { userIds: string[] }) {
    return this.usersServiceService.getByIds(data.userIds);
  }

  @MessagePattern('users.get-all')
  getAll() {
    return this.usersServiceService.getAll();
  }

  @MessagePattern('users.update-profile')
  updateProfile(
    @Payload()
    data: {
      userId: string;
      bio?: string;
      country?: string;
      favoriteGame?: string;
      avatar?: string;
    },
  ) {
    return this.usersServiceService.updateProfile(data);
  }
}
