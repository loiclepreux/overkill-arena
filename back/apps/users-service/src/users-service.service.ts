import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma-service';

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
