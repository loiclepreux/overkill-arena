import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { NotificationKind } from '@prisma/client';

@Injectable()
export class NotificationsServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUser(data: { userId: string; page?: number; limit?: number }) {
    const page = data.page ?? 1;
    const limit = data.limit ?? 20;
    const skip = (page - 1) * limit;

    const [notifications, total] = await this.prisma.$transaction([
      this.prisma.notification.findMany({
        where: { userId: data.userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({ where: { userId: data.userId } }),
    ]);

    return { notifications, total, page, limit };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { userId, read: false },
    });
    return { count };
  }

  async create(data: {
    userId: string;
    kind: NotificationKind;
    title: string;
    message: string;
  }) {
    return this.prisma.notification.create({ data });
  }

  async markRead(data: { id: string; userId: string }) {
    const notification = await this.prisma.notification.findUnique({ where: { id: data.id } });
    if (!notification) throw new RpcException({ statusCode: 404, message: 'Notification introuvable' });
    if (notification.userId !== data.userId) {
      throw new RpcException({ statusCode: 403, message: 'Accès refusé' });
    }
    return this.prisma.notification.update({ where: { id: data.id }, data: { read: true } });
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return { message: 'Toutes les notifications marquées comme lues' };
  }
}
