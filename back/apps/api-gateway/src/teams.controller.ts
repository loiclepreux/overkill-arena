import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { JwtGuard } from './auth/jwt.guard';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { RespondJoinRequestDto } from './dto/respond-join-request.dto';

type Req = { user: { id: string } };

@Controller('teams')
export class TeamsController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() body: CreateTeamDto, @Request() req: Req) {
    return this.gateway.createTeam({ ...body, captainId: req.user.id });
  }

  @Get()
  getAll() {
    return this.gateway.getAllTeams();
  }

  @Get('my')
  @UseGuards(JwtGuard)
  getMyTeam(@Request() req: Req) {
    return this.gateway.getMyTeam(req.user.id);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.gateway.getTeamById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() body: UpdateTeamDto, @Request() req: Req) {
    return this.gateway.updateTeam(id, req.user.id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(@Param('id') id: string, @Request() req: Req) {
    return this.gateway.deleteTeam(id, req.user.id);
  }

  @Post(':id/join')
  @UseGuards(JwtGuard)
  requestJoin(@Param('id') teamId: string, @Request() req: Req) {
    return this.gateway.requestJoinTeam(teamId, req.user.id);
  }

  @Get(':id/requests')
  @UseGuards(JwtGuard)
  getJoinRequests(@Param('id') teamId: string, @Request() req: Req) {
    return this.gateway.getJoinRequests(teamId, req.user.id);
  }

  @Patch('requests/:requestId')
  @UseGuards(JwtGuard)
  respondRequest(
    @Param('requestId') requestId: string,
    @Body() body: RespondJoinRequestDto,
    @Request() req: Req,
  ) {
    return this.gateway.respondJoinRequest(requestId, req.user.id, body.accepted);
  }

  @Delete(':id/leave')
  @UseGuards(JwtGuard)
  leave(@Param('id') teamId: string, @Request() req: Req) {
    return this.gateway.leaveTeam(teamId, req.user.id);
  }

  @Delete(':id/members/:userId')
  @UseGuards(JwtGuard)
  kickMember(@Param('id') teamId: string, @Param('userId') userId: string, @Request() req: Req) {
    return this.gateway.kickMember(teamId, req.user.id, userId);
  }
}
