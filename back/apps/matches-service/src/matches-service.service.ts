import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { MatchFormat, MatchStatus } from '@prisma/client';

@Injectable()
export class MatchesServiceService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.match.create({
      data: {
        tournamentId: data.tournamentId,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        format: data.format ?? 'BO3',
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      },
    });
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
    return this.prisma.match.update({
      where: { id: data.id },
      data: {
        scoreA: data.scoreA,
        scoreB: data.scoreB,
        winnerId,
        status: 'COMPLETED',
        playedAt: new Date(),
      },
    });
  }

  async validate(data: { id: string }) {
    const match = await this.prisma.match.findUnique({ where: { id: data.id } });
    if (!match) throw new RpcException({ statusCode: 404, message: 'Match introuvable' });
    if (match.status !== 'CONTESTED') {
      throw new RpcException({ statusCode: 400, message: 'Seuls les matchs contestés peuvent être validés' });
    }
    return this.prisma.match.update({
      where: { id: data.id },
      data: { status: 'COMPLETED' },
    });
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
