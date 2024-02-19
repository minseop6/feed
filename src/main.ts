import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import {
  BadRequestExceptionFilter,
  NotFoundExceptionFilter,
} from './common/exception/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
    .setTitle('Feed API')
    .setDescription('학교 소식을 피드 형태로 제공하는 API 입니다.')
    .setVersion('1.0')
    .addTag('feed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
