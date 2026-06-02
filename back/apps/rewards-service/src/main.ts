import { NestFactory } from '@nestjs/core';
import { RewardsServiceModule } from './rewards-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RewardsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
