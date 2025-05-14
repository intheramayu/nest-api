import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose'],
  });
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));  
  await app.listen(process.env.PORT ?? 8888);
}
bootstrap();
