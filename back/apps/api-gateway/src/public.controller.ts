import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('public')
export class PublicController {
  constructor(private readonly gateway: ApiGatewayService) {}

  @Get('stats')
  getStats() {
    return this.gateway.getPublicStats();
  }

  @Get('top-player')
  getTopPlayer() {
    return this.gateway.getTopPlayer();
  }
}
