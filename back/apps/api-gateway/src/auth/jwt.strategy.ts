import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'overkill_super_secret_dev',
    });
  }

  validate(payload: {
    sub: string;
    pseudo: string;
    email: string;
    role: string;
  }) {
    return {
      id: payload.sub,
      pseudo: payload.pseudo,
      email: payload.email,
      role: payload.role,
    };
  }
}
