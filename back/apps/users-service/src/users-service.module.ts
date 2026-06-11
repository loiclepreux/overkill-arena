import { Module } from '@nestjs/common';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { PrismaService } from './prisma-service';

@Module({
  imports: [],
  controllers: [UsersServiceController],
  providers: [UsersServiceService, PrismaService],
})
export class UsersServiceModule {}
