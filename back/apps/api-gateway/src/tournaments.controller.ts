import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import {
  UpdateTournamentDto,
  UpdateTournamentStatusDto,
} from './dto/update-tournament.dto';
import { TournamentStatus } from '@prisma/client';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: CreateTournamentDto) {
    return this.gateway.createTournament(body);
  }

  @Get()
  getAll(@Query('status') status?: TournamentStatus) {
    return this.gateway.getAllTournaments(status);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.gateway.getTournamentById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() body: UpdateTournamentDto) {
    return this.gateway.updateTournament(id, body);
  }

  @Patch(':id/status')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateTournamentStatusDto,
  ) {
    return this.gateway.updateTournamentStatus(id, body.status);
  }

  @Post(':id/register')
  @UseGuards(JwtGuard)
  register(@Param('id') tournamentId: string, @Body('teamId') teamId: string) {
    return this.gateway.registerTeam(tournamentId, teamId);
  }

  @Delete(':id/register')
  @UseGuards(JwtGuard)
  unregister(
    @Param('id') tournamentId: string,
    @Body('teamId') teamId: string,
  ) {
    return this.gateway.unregisterTeam(tournamentId, teamId);
  }

  @Get(':id/participants')
  getParticipants(@Param('id') tournamentId: string) {
    return this.gateway.getTournamentParticipants(tournamentId);
  }
}
