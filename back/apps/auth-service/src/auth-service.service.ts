import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@app/prisma';

type RegisterPayload = {
  pseudo: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type MePayload = {
  accessToken: string;
};

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterPayload) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { pseudo: data.pseudo }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Email ou pseudo déjà utilisé.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        pseudo: data.pseudo,
        email: data.email,
        password: hashedPassword,
        role: 'PLAYER',
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    await this.prisma.profile.create({
      data: {
        userId: user.id,
        pseudo: user.pseudo,
      },
    });

    await this.prisma.userStats.create({
      data: {
        userId: user.id,
      },
    });

    const accessToken = await this.generateToken(user);

    return {
      message: 'Inscription réussie.',
      user,
      accessToken,
    };
  }

  async login(data: LoginPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const safeUser = {
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const accessToken = await this.generateToken(safeUser);

    return {
      message: 'Connexion réussie.',
      user: safeUser,
      accessToken,
    };
  }

  async promoteToAdmin(data: { userId: string }) {
    const existingAdmin = await this.prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (existingAdmin) {
      throw new ConflictException('Un administrateur existe déjà. Contactez-le pour obtenir les droits.');
    }
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: { role: 'ADMIN' },
      select: { id: true, pseudo: true, email: true, role: true, createdAt: true },
    });
    const accessToken = await this.generateToken(user);
    return { message: 'Vous êtes maintenant administrateur.', user, accessToken };
  }

  async changePassword(data: { userId: string; currentPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new UnauthorizedException('Utilisateur introuvable.');

    const valid = await bcrypt.compare(data.currentPassword, user.password);
    if (!valid) throw new UnauthorizedException('Mot de passe actuel incorrect.');

    const hash = await bcrypt.hash(data.newPassword, 10);
    await this.prisma.user.update({ where: { id: user.id }, data: { password: hash } });

    return { message: 'Mot de passe modifié avec succès.' };
  }

  async me(data: MePayload) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        pseudo: string;
        email: string;
        role: string;
      }>(data.accessToken);

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        select: {
          id: true,
          pseudo: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Utilisateur introuvable.');
      }

      return {
        user,
      };
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré.');
    }
  }

  private async generateToken(user: {
    id: string;
    pseudo: string;
    email: string;
    role: string;
  }) {
    return this.jwtService.signAsync({
      sub: user.id,
      pseudo: user.pseudo,
      email: user.email,
      role: user.role,
    });
  }
}
