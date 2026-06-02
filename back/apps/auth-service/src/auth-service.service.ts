import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from './prisma-service';

type RegisterPayload = {
  pseudo: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
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
