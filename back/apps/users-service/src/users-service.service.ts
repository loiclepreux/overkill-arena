import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

type UpdateProfilePayload = {
  userId: string;
  bio?: string;
  country?: string;
  favoriteGame?: string;
  avatar?: string;
};

@Injectable()
export class UsersServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.getById(userId);
  }

  async getById(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    const stats = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!profile || !stats) {
      throw new NotFoundException('Profil utilisateur introuvable.');
    }

    return {
      profile,
      stats,
    };
  }

  async getByIds(userIds: string[]) {
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, pseudo: true },
    });
    return users;
  }

  async getAll() {
    return this.prisma.user.findMany({
      select: { id: true, pseudo: true, email: true, role: true },
      orderBy: { pseudo: 'asc' },
    });
  }

  async updateProfile(data: UpdateProfilePayload) {
    const profile = await this.prisma.profile.update({
      where: { userId: data.userId },
      data: {
        bio: data.bio,
        country: data.country,
        favoriteGame: data.favoriteGame,
        avatar: data.avatar,
      },
    });

    return {
      message: 'Profil mis à jour.',
      profile,
    };
  }
}
