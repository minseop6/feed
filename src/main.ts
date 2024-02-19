import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import {
  BadRequestExceptionFilter,
  NotFoundExceptionFilter,
} from './common/exception/exception.filter';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
