import { NestFactory } from '@nestjs/core';
import { TeamsServiceModule } from './teams-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TeamsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
