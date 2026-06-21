import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TournamentsServiceService } from './tournaments-service.service';
import { TournamentStatus, TournamentFormat } from '@prisma/client';

@Controller()
export class TournamentsServiceController {
  constructor(private readonly tournamentsService: TournamentsServiceService) {}

  @MessagePattern('tournaments.create')
  create(@Payload() payload: {
    name: string;
    game: string;
    format?: TournamentFormat;
    maxTeams: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.tournamentsService.create(payload);
  }

  @MessagePattern('tournaments.get-all')
  getAll(@Payload() payload: { status?: TournamentStatus }) {
    return this.tournamentsService.getAll(payload?.status);
  }

  @MessagePattern('tournaments.get-by-id')
  getById(@Payload() payload: { id: string }) {
    return this.tournamentsService.getById(payload.id);
  }

  @MessagePattern('tournaments.update')
  update(@Payload() payload: {
    id: string;
    name?: string;
    game?: string;
    format?: TournamentFormat;
    maxTeams?: number;
    description?: string;
    startDate?: string;
    endDate?: string;
  }) {
    return this.tournamentsService.update(payload);
  }

  @MessagePattern('tournaments.update-status')
  updateStatus(@Payload() payload: { id: string; status: TournamentStatus }) {
    return this.tournamentsService.updateStatus(payload);
  }

  @MessagePattern('tournaments.register-team')
  registerTeam(@Payload() payload: { tournamentId: string; teamId: string }) {
    return this.tournamentsService.registerTeam(payload);
  }

  @MessagePattern('tournaments.unregister-team')
  unregisterTeam(@Payload() payload: { tournamentId: string; teamId: string }) {
    return this.tournamentsService.unregisterTeam(payload);
  }

  @MessagePattern('tournaments.get-participants')
  getParticipants(@Payload() payload: { tournamentId: string }) {
    return this.tournamentsService.getParticipants(payload.tournamentId);
  }
}
