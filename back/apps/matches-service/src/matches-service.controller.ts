import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchesServiceService } from './matches-service.service';
import { MatchFormat, MatchStatus } from '@prisma/client';

@Controller()
export class MatchesServiceController {
  constructor(private readonly matchesService: MatchesServiceService) {}

  @MessagePattern('matches.create')
  create(
    @Payload()
    payload: {
      tournamentId?: string;
      teamAId: string;
      teamBId: string;
      format?: MatchFormat;
      scheduledAt?: string;
    },
  ) {
    return this.matchesService.create(payload);
  }

  @MessagePattern('matches.get-by-id')
  getById(@Payload() payload: { id: string }) {
    return this.matchesService.getById(payload.id);
  }

  @MessagePattern('matches.get-by-team')
  getByTeam(@Payload() payload: { teamId: string }) {
    return this.matchesService.getByTeam(payload.teamId);
  }

  @MessagePattern('matches.get-by-tournament')
  getByTournament(@Payload() payload: { tournamentId: string }) {
    return this.matchesService.getByTournament(payload.tournamentId);
  }

  @MessagePattern('matches.submit-score')
  submitScore(
    @Payload()
    payload: {
      id: string;
      teamId: string;
      scoreA: number;
      scoreB: number;
    },
  ) {
    return this.matchesService.submitScore(payload);
  }

  @MessagePattern('matches.validate')
  validate(@Payload() payload: { id: string }) {
    return this.matchesService.validate(payload);
  }

  @MessagePattern('matches.contest')
  contest(@Payload() payload: { id: string; teamId: string }) {
    return this.matchesService.contest(payload);
  }

  @MessagePattern('matches.update-status')
  updateStatus(@Payload() payload: { id: string; status: MatchStatus }) {
    return this.matchesService.updateStatus(payload);
  }
}
