import { Controller, Get } from '@nestjs/common';
import { TeamsServiceService } from './teams-service.service';

@Controller()
export class TeamsServiceController {
  constructor(private readonly teamsServiceService: TeamsServiceService) {}

  @Get()
  getHello(): string {
    return this.teamsServiceService.getHello();
  }
}
