import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { RewardType, MedalRank, NotificationKind } from '@prisma/client';

@Injectable()
export class RewardsServiceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  private notify(userId: string, kind: NotificationKind, title: string, message: string) {
    this.natsClient.emit('notifications.create', { userId, kind, title, message }).subscribe();
  }

  async getByUser(userId: string) {
    return this.prisma.reward.findMany({
      where: { userId },
      orderBy: { awardedAt: 'desc' },
    });
  }

  async award(data: {
    userId: string;
    type: RewardType;
    medalRank?: MedalRank;
    cupName?: string;
    titleName?: string;
    description?: string;
    tournamentId?: string;
    matchId?: string;
  }) {
    if (data.type === 'MEDAL' && !data.medalRank) {
      throw new RpcException({ statusCode: 400, message: 'Le rang de la médaille est requis' });
    }
    if (data.type === 'CUP' && !data.cupName) {
      throw new RpcException({ statusCode: 400, message: 'Le nom de la coupe est requis' });
    }
    if (data.type === 'TITLE' && !data.titleName) {
      throw new RpcException({ statusCode: 400, message: 'Le nom du titre est requis' });
    }
    const reward = await this.prisma.reward.create({ data });

    const rewardLabels: Record<RewardType, string> = {
      MEDAL: data.medalRank === 'GOLD' ? '🥇 médaille d\'or' : data.medalRank === 'SILVER' ? '🥈 médaille d\'argent' : '🥉 médaille de bronze',
      CUP: `🏆 la coupe "${data.cupName}"`,
      TITLE: `🎖 le titre "${data.titleName}"`,
    };

    this.notify(
      data.userId,
      'REWARD_EARNED',
      'Nouvelle récompense !',
      `Félicitations, vous avez reçu ${rewardLabels[data.type]} !`,
    );

    return reward;
  }

  async getStats(userId: string) {
    const rewards = await this.prisma.reward.findMany({ where: { userId } });
    return {
      total: rewards.length,
      medals: {
        total: rewards.filter((r) => r.type === 'MEDAL').length,
        gold: rewards.filter((r) => r.medalRank === 'GOLD').length,
        silver: rewards.filter((r) => r.medalRank === 'SILVER').length,
        bronze: rewards.filter((r) => r.medalRank === 'BRONZE').length,
      },
      cups: rewards.filter((r) => r.type === 'CUP').length,
      titles: rewards.filter((r) => r.type === 'TITLE').length,
    };
  }
}
