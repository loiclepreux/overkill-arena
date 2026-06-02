import { NestFactory } from '@nestjs/core';
import { MatchesServiceModule } from './matches-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MatchesServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
