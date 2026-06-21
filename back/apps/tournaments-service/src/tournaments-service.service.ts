import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { TournamentStatus, TournamentFormat } from '@prisma/client';

@Injectable()
export class TournamentsServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    game: string;
    format?: TournamentFormat;
    maxTeams: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const existing = await this.prisma.tournament.findUnique({ where: { name: data.name } });
    if (existing) throw new RpcException({ statusCode: 409, message: 'Un tournoi avec ce nom existe déjà' });

    return this.prisma.tournament.create({
      data: {
        name: data.name,
        game: data.game,
        format: data.format ?? 'SINGLE_ELIMINATION',
        maxTeams: data.maxTeams,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
      include: { participants: true },
    });
  }

  async getAll(status?: TournamentStatus) {
    return this.prisma.tournament.findMany({
      where: status ? { status } : undefined,
      include: { _count: { select: { participants: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      include: { participants: true, _count: { select: { participants: true } } },
    });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });
    return tournament;
  }

  async update(data: {
    id: string;
    name?: string;
    game?: string;
    format?: TournamentFormat;
    maxTeams?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const tournament = await this.prisma.tournament.findUnique({ where: { id: data.id } });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });
    if (tournament.status === 'COMPLETED' || tournament.status === 'CANCELLED') {
      throw new RpcException({ statusCode: 400, message: 'Ce tournoi ne peut plus être modifié' });
    }

    return this.prisma.tournament.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.game && { game: data.game }),
        ...(data.format && { format: data.format }),
        ...(data.maxTeams && { maxTeams: data.maxTeams }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
      },
      include: { participants: true },
    });
  }

  async updateStatus(data: { id: string; status: TournamentStatus }) {
    const tournament = await this.prisma.tournament.findUnique({ where: { id: data.id } });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });

    return this.prisma.tournament.update({
      where: { id: data.id },
      data: { status: data.status },
    });
  }

  async registerTeam(data: { tournamentId: string; teamId: string }) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: data.tournamentId },
      include: { _count: { select: { participants: true } } },
    });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });
    if (tournament.status !== 'OPEN') {
      throw new RpcException({ statusCode: 400, message: 'Les inscriptions ne sont pas ouvertes' });
    }
    if (tournament._count.participants >= tournament.maxTeams) {
      throw new RpcException({ statusCode: 400, message: 'Le tournoi est complet' });
    }
    const existing = await this.prisma.tournamentParticipant.findUnique({
      where: { tournamentId_teamId: { tournamentId: data.tournamentId, teamId: data.teamId } },
    });
    if (existing) throw new RpcException({ statusCode: 409, message: 'Cette équipe est déjà inscrite' });

    return this.prisma.tournamentParticipant.create({
      data: { tournamentId: data.tournamentId, teamId: data.teamId },
    });
  }

  async unregisterTeam(data: { tournamentId: string; teamId: string }) {
    const tournament = await this.prisma.tournament.findUnique({ where: { id: data.tournamentId } });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });
    if (tournament.status !== 'OPEN') {
      throw new RpcException({ statusCode: 400, message: 'Les inscriptions sont fermées' });
    }
    const participation = await this.prisma.tournamentParticipant.findUnique({
      where: { tournamentId_teamId: { tournamentId: data.tournamentId, teamId: data.teamId } },
    });
    if (!participation) throw new RpcException({ statusCode: 404, message: 'Cette équipe n\'est pas inscrite' });

    await this.prisma.tournamentParticipant.delete({ where: { id: participation.id } });
    return { message: 'Équipe désinscrite du tournoi' };
  }

  async getParticipants(tournamentId: string) {
    const tournament = await this.prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new RpcException({ statusCode: 404, message: 'Tournoi introuvable' });

    return this.prisma.tournamentParticipant.findMany({
      where: { tournamentId },
      orderBy: { registeredAt: 'asc' },
    });
  }
}
