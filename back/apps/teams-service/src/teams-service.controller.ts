import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamsServiceService } from './teams-service.service';

@Controller()
export class TeamsServiceController {
  constructor(private readonly teamsService: TeamsServiceService) {}

  @MessagePattern('teams.create')
  create(@Payload() payload: { name: string; tag: string; logo?: string; description?: string; captainId: string }) {
    return this.teamsService.create(payload);
  }

  @MessagePattern('teams.get-all')
  getAll() {
    return this.teamsService.getAll();
  }

  @MessagePattern('teams.get-by-id')
  getById(@Payload() payload: { id: string }) {
    return this.teamsService.getById(payload.id);
  }

  @MessagePattern('teams.get-by-user')
  getByUser(@Payload() payload: { userId: string }) {
    return this.teamsService.getByUser(payload.userId);
  }

  @MessagePattern('teams.update')
  update(@Payload() payload: { id: string; requesterId: string; name?: string; tag?: string; logo?: string; description?: string }) {
    return this.teamsService.update(payload);
  }

  @MessagePattern('teams.delete')
  delete(@Payload() payload: { id: string; requesterId: string }) {
    return this.teamsService.delete(payload);
  }

  @MessagePattern('teams.request-join')
  requestJoin(@Payload() payload: { teamId: string; userId: string }) {
    return this.teamsService.requestJoin(payload);
  }

  @MessagePattern('teams.get-join-requests')
  getJoinRequests(@Payload() payload: { teamId: string; requesterId: string }) {
    return this.teamsService.getJoinRequests(payload);
  }

  @MessagePattern('teams.respond-join-request')
  respondJoinRequest(@Payload() payload: { requestId: string; requesterId: string; accepted: boolean }) {
    return this.teamsService.respondJoinRequest(payload);
  }

  @MessagePattern('teams.leave')
  leave(@Payload() payload: { teamId: string; userId: string }) {
    return this.teamsService.leave(payload);
  }

  @MessagePattern('teams.kick-member')
  kickMember(@Payload() payload: { teamId: string; requesterId: string; targetUserId: string }) {
    return this.teamsService.kickMember(payload);
  }
}
