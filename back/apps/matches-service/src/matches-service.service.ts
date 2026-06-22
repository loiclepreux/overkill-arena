import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { MatchFormat, MatchStatus, NotificationKind } from '@prisma/client';

@Injectable()
export class MatchesServiceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  private notify(userId: string, kind: NotificationKind, title: string, message: string) {
    this.natsClient.emit('notifications.create', { userId, kind, title, message }).subscribe();
  }

  private async notifyBothTeams(
    teamAId: string,
    teamBId: string,
    kind: NotificationKind,
    title: string,
    message: string,
  ) {
    const [teamA, teamB] = await Promise.all([
      this.prisma.team.findUnique({ where: { id: teamAId }, select: { captainId: true } }),
      this.prisma.team.findUnique({ where: { id: teamBId }, select: { captainId: true } }),
    ]);
    if (teamA) this.notify(teamA.captainId, kind, title, message);
    if (teamB) this.notify(teamB.captainId, kind, title, message);
  }

  async create(data: {
    tournamentId?: string;
    teamAId: string;
    teamBId: string;
    format?: MatchFormat;
    scheduledAt?: string;
  }) {
    if (data.teamAId === data.teamBId) {
      throw new RpcException({ statusCode: 400, message: 'Les deux équipes doivent être différentes' });
    }
    const match = await this.prisma.match.create({
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        format: data.format ?? 'BO3',
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      },
    });

    await this.notifyBothTeams(
      data.teamAId,
      data.teamBId,
      'MATCH_START',
      'Match planifié',
      'Un nouveau match a été planifié pour votre équipe.',
    );

    return match;
  }

  async getById(id: string) {
    const match = await this.prisma.match.findUnique({ where: { id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    return match;
  }

  async getByTeam(teamId: string) {
    return this.prisma.match.findMany({
      where: { OR: [{ teamAId: teamId }, { teamBId: teamId }] },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getByTournament(tournamentId: string) {
    return this.prisma.match.findMany({
      where: { tournamentId },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  private eloToRank(elo: number): string {
    if (elo >= 2000) return 'Master';
    if (elo >= 1750) return 'Diamant';
    if (elo >= 1500) return 'Platine';
    if (elo >= 1300) return 'Or';
    if (elo >= 1100) return 'Argent';
    return 'Bronze';
  }

  private async updateTeamStats(teamId: string, isWinner: boolean, isDraw: boolean) {
    const members = await this.prisma.teamMember.findMany({ where: { teamId } });
    await Promise.all(
      members.map(async (m) => {
        const stats = await this.prisma.userStats.findUnique({ where: { userId: m.userId } });
        const currentElo = stats?.elo ?? 1000;
        const currentXp = stats?.xp ?? 0;
        const newElo = Math.max(0, currentElo + (isWinner ? 25 : isDraw ? 0 : -15));
        const newXp = currentXp + (isWinner ? 100 : isDraw ? 30 : 15);
        const newLevel = Math.floor(newXp / 1000) + 1;
        return this.prisma.userStats.update({
          where: { userId: m.userId },
          data: {
            ...(isWinner && { wins: { increment: 1 } }),
            ...(!isWinner && !isDraw && { losses: { increment: 1 } }),
            elo: newElo,
            xp: newXp,
            level: newLevel,
            rank: this.eloToRank(newElo),
          },
        });
      }),
    );
  }

  async submitScore(data: { id: string; teamId: string; scoreA: number; scoreB: number }) {
    const match = await this.prisma.match.findUnique({ where: { id: data.id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    if (match.status === 'COMPLETED' || match.status === 'CANCELLED') {
      throw new RpcException({ statusCode: 400, message: 'Ce match ne peut plus être modifié' });
    }
    const isParticipant = match.teamAId === data.teamId || match.teamBId === data.teamId;
    if (!isParticipant) {
      throw new RpcException({ statusCode: 403, message: 'Votre équipe ne participe pas à ce match' });
    }
    const winnerId = data.scoreA > data.scoreB ? match.teamAId : data.scoreB > data.scoreA ? match.teamBId : null;
    const isDraw = winnerId === null;

    const updated = await this.prisma.match.update({
      where: { id: data.id },
      data: {
        scoreA: data.scoreA,
        scoreB: data.scoreB,
        winnerId,
        status: 'COMPLETED',
        playedAt: new Date(),
      },
    });

    await Promise.all([
      this.updateTeamStats(match.teamAId, winnerId === match.teamAId, isDraw),
      this.updateTeamStats(match.teamBId, winnerId === match.teamBId, isDraw),
    ]);

    await this.notifyBothTeams(
      match.teamAId,
      match.teamBId,
      'MATCH_RESULT',
      'Résultat de match enregistré',
      `Le score ${data.scoreA} - ${data.scoreB} a été soumis.`,
    );

    return updated;
  }

  async validate(data: { id: string }) {
    const match = await this.prisma.match.findUnique({ where: { id: data.id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    if (match.status !== 'CONTESTED') {
      throw new RpcException({ statusCode: 400, message: 'Seuls les matchs contestés peuvent être validés' });
    }
    const updated = await this.prisma.match.update({
      where: { id: data.id },
      data: { status: 'COMPLETED' },
    });

    await this.notifyBothTeams(
      match.teamAId,
      match.teamBId,
      'MATCH_RESULT',
      'Résultat validé',
      'Le résultat du match contesté a été validé par un administrateur.',
    );

    return updated;
  }

  async contest(data: { id: string; teamId: string }) {
    const match = await this.prisma.match.findUnique({ where: { id: data.id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    if (match.status !== 'COMPLETED') {
      throw new RpcException({ statusCode: 400, message: 'Seuls les matchs terminés peuvent être contestés' });
    }
    const isParticipant = match.teamAId === data.teamId || match.teamBId === data.teamId;
    if (!isParticipant) {
      throw new RpcException({ statusCode: 403, message: 'Votre équipe ne participe pas à ce match' });
    }
    return this.prisma.match.update({
      where: { id: data.id },
      data: { status: 'CONTESTED' },
    });
  }

  async updateStatus(data: { id: string; status: MatchStatus }) {
    const match = await this.prisma.match.findUnique({ where: { id: data.id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    return this.prisma.match.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }
}
