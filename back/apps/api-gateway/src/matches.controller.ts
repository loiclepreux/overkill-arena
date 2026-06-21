import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { CreateMatchDto } from './dto/create-match.dto';
import { SubmitScoreDto } from './dto/submit-score.dto';

type Req = { user: { id: string } };

@Controller('matches')
export class MatchesController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: CreateMatchDto) {
    return this.gateway.createMatch(body);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getById(@Param('id') id: string) {
    return this.gateway.getMatchById(id);
  }

  @Get('team/:teamId')
  getByTeam(@Param('teamId') teamId: string) {
    return this.gateway.getMatchesByTeam(teamId);
  }

  @Get('tournament/:tournamentId')
  getByTournament(@Param('tournamentId') tournamentId: string) {
    return this.gateway.getMatchesByTournament(tournamentId);
  }

  @Patch(':id/score')
  @UseGuards(JwtGuard)
  submitScore(@Param('id') id: string, @Body() body: SubmitScoreDto & { teamId: string }, @Request() req: Req) {
    return this.gateway.submitScore(id, body.teamId, body.scoreA, body.scoreB);
  }

  @Patch(':id/validate')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  validate(@Param('id') id: string) {
    return this.gateway.validateMatch(id);
  }

  @Post(':id/contest')
  @UseGuards(JwtGuard)
  contest(@Param('id') id: string, @Body('teamId') teamId: string) {
    return this.gateway.contestMatch(id, teamId);
  }
}
