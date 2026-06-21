import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from '@app/prisma';
import { NotificationKind } from '@prisma/client';

@Injectable()
export class TeamsServiceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATIONS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  private notify(userId: string, kind: NotificationKind, title: string, message: string) {
    this.natsClient.emit('notifications.create', { userId, kind, title, message }).subscribe();
  }

  async create(data: {
    name: string;
    tag: string;
    logo?: string;
    description?: string;
    captainId: string;
  }) {
    const existing = await this.prisma.team.findFirst({
      where: { OR: [{ name: data.name }, { tag: data.tag }] },
    });
    if (existing) {
      throw new RpcException({ statusCode: 409, message: 'Ce nom ou tag est déjà pris' });
    }
    const alreadyInTeam = await this.prisma.teamMember.findUnique({
      where: { userId: data.captainId },
    });
    if (alreadyInTeam) {
      throw new RpcException({ statusCode: 409, message: 'Vous êtes déjà dans une équipe' });
    }
    const team = await this.prisma.team.create({
      data: {
        name: data.name,
        tag: data.tag,
        logo: data.logo,
        description: data.description,
        captainId: data.captainId,
        members: {
          create: { userId: data.captainId, role: 'CAPTAIN' },
        },
      },
      include: { members: true },
    });
    return team;
  }

  async getAll() {
    return this.prisma.team.findMany({
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    return team;
  }

  async getByUser(userId: string) {
    const membership = await this.prisma.teamMember.findUnique({
      where: { userId },
      include: { team: { include: { members: true } } },
    });
    if (!membership) throw new RpcException({ statusCode: 404, message: 'Vous n\'êtes dans aucune équipe' });
    return membership.team;
  }

  async update(data: {
    id: string;
    requesterId: string;
    name?: string;
    tag?: string;
    logo?: string;
    description?: string;
  }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.id } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    if (team.captainId !== data.requesterId) {
      throw new RpcException({ statusCode: 403, message: 'Seul le capitaine peut modifier l\'équipe' });
    }
    return this.prisma.team.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.tag && { tag: data.tag }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.description !== undefined && { description: data.description }),
      },
      include: { members: true },
    });
  }

  async delete(data: { id: string; requesterId: string }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.id } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    if (team.captainId !== data.requesterId) {
      throw new RpcException({ statusCode: 403, message: 'Seul le capitaine peut supprimer l\'équipe' });
    }
    await this.prisma.team.delete({ where: { id: data.id } });
    return { message: 'Équipe supprimée' };
  }

  async requestJoin(data: { teamId: string; userId: string }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.teamId } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });

    const alreadyMember = await this.prisma.teamMember.findUnique({ where: { userId: data.userId } });
    if (alreadyMember) {
      throw new RpcException({ statusCode: 409, message: 'Vous êtes déjà dans une équipe' });
    }
    const existing = await this.prisma.teamJoinRequest.findUnique({
      where: { teamId_userId: { teamId: data.teamId, userId: data.userId } },
    });
    if (existing && existing.status === 'PENDING') {
      throw new RpcException({ statusCode: 409, message: 'Demande déjà envoyée' });
    }
    const request = await this.prisma.teamJoinRequest.upsert({
      where: { teamId_userId: { teamId: data.teamId, userId: data.userId } },
      update: { status: 'PENDING' },
      create: { teamId: data.teamId, userId: data.userId },
    });

    this.notify(
      team.captainId,
      'TEAM_INVITATION',
      'Nouvelle demande d\'adhésion',
      `Un joueur souhaite rejoindre l'équipe ${team.name}.`,
    );

    return request;
  }

  async getJoinRequests(data: { teamId: string; requesterId: string }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.teamId } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    if (team.captainId !== data.requesterId) {
      throw new RpcException({ statusCode: 403, message: 'Accès réservé au capitaine' });
    }
    return this.prisma.teamJoinRequest.findMany({
      where: { teamId: data.teamId, status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async respondJoinRequest(data: { requestId: string; requesterId: string; accepted: boolean }) {
    const request = await this.prisma.teamJoinRequest.findUnique({ where: { id: data.requestId } });
    if (!request) throw new RpcException({ statusCode: 404, message: 'Demande introuvable' });

    const team = await this.prisma.team.findUnique({ where: { id: request.teamId } });
    if (!team || team.captainId !== data.requesterId) {
      throw new RpcException({ statusCode: 403, message: 'Accès réservé au capitaine' });
    }
    if (data.accepted) {
      const alreadyMember = await this.prisma.teamMember.findUnique({ where: { userId: request.userId } });
      if (alreadyMember) {
        await this.prisma.teamJoinRequest.update({ where: { id: data.requestId }, data: { status: 'REJECTED' } });
        throw new RpcException({ statusCode: 409, message: 'Cet utilisateur est déjà dans une équipe' });
      }
      await this.prisma.$transaction([
        this.prisma.teamMember.create({ data: { teamId: request.teamId, userId: request.userId, role: 'MEMBER' } }),
        this.prisma.teamJoinRequest.update({ where: { id: data.requestId }, data: { status: 'ACCEPTED' } }),
      ]);
    } else {
      await this.prisma.teamJoinRequest.update({ where: { id: data.requestId }, data: { status: 'REJECTED' } });
    }

    this.notify(
      request.userId,
      'TEAM_INVITATION',
      data.accepted ? 'Demande acceptée !' : 'Demande refusée',
      data.accepted
        ? `Bienvenue dans l'équipe ${team.name} !`
        : `Votre demande pour rejoindre ${team.name} a été refusée.`,
    );

    return { message: data.accepted ? 'Demande acceptée' : 'Demande refusée' };
  }

  async leave(data: { teamId: string; userId: string }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.teamId } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    if (team.captainId === data.userId) {
      throw new RpcException({ statusCode: 400, message: 'Le capitaine ne peut pas quitter l\'équipe, supprimez-la' });
    }
    const membership = await this.prisma.teamMember.findFirst({
      where: { teamId: data.teamId, userId: data.userId },
    });
    if (!membership) throw new RpcException({ statusCode: 404, message: 'Vous n\'êtes pas dans cette équipe' });
    await this.prisma.teamMember.delete({ where: { id: membership.id } });
    return { message: 'Vous avez quitté l\'équipe' };
  }

  async kickMember(data: { teamId: string; requesterId: string; targetUserId: string }) {
    const team = await this.prisma.team.findUnique({ where: { id: data.teamId } });
    if (!team) throw new RpcException({ statusCode: 404, message: 'Équipe introuvable' });
    if (team.captainId !== data.requesterId) {
      throw new RpcException({ statusCode: 403, message: 'Seul le capitaine peut exclure un membre' });
    }
    if (data.targetUserId === data.requesterId) {
      throw new RpcException({ statusCode: 400, message: 'Le capitaine ne peut pas s\'exclure lui-même' });
    }
    const membership = await this.prisma.teamMember.findFirst({
      where: { teamId: data.teamId, userId: data.targetUserId },
    });
    if (!membership) throw new RpcException({ statusCode: 404, message: 'Membre introuvable dans cette équipe' });
    await this.prisma.teamMember.delete({ where: { id: membership.id } });

    this.notify(
      data.targetUserId,
      'TEAM_INVITATION',
      'Exclu de l\'équipe',
      `Vous avez été exclu de l'équipe ${team.name}.`,
    );

    return { message: 'Membre exclu de l\'équipe' };
  }
}
