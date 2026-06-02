import { Controller, Get } from '@nestjs/common';
import { MatchesServiceService } from './matches-service.service';

@Controller()
export class MatchesServiceController {
  constructor(private readonly matchesServiceService: MatchesServiceService) {}

  @Get()
  getHello(): string {
    return this.matchesServiceService.getHello();
  }
}
