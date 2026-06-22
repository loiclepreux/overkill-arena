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
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { pseudo: true } });
    if (!user) throw new NotFoundException('Utilisateur introuvable.');

    const [profile, stats] = await Promise.all([
      this.prisma.profile.upsert({
        where: { userId },
        update: {},
        create: { userId, pseudo: user.pseudo },
      }),
      this.prisma.userStats.upsert({
        where: { userId },
        update: {},
        create: { userId },
      }),
    ]);

    return { profile, stats };
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

  async getPublicStats() {
    const [teams, tournaments, rewards, users] = await Promise.all([
      this.prisma.team.count(),
      this.prisma.tournament.count(),
      this.prisma.reward.count(),
      this.prisma.user.count(),
    ]);
    return { teams, tournaments, rewards, users };
  }

  async getTopPlayer() {
    const topStats = await this.prisma.userStats.findFirst({ orderBy: { elo: 'desc' } });
    if (!topStats) return null;
    const user = await this.prisma.user.findUnique({
      where: { id: topStats.userId },
      select: { pseudo: true },
    });
    return { pseudo: user?.pseudo ?? 'Inconnu', elo: topStats.elo, rank: topStats.rank, wins: topStats.wins };
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
