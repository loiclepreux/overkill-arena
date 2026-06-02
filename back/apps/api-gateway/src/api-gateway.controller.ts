import { Body, Controller, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('auth')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.apiGatewayService.login(body);
  }

  @Post('register')
  register(
    @Body()
    body: {
      pseudo: string;
      email: string;
      password: string;
    },
  ) {
    return this.apiGatewayService.register(body);
  }
}
