import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeORMExceptionFilter } from './filters/typeorm-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new TypeORMExceptionFilter());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sistema de Quejas')
    .setDescription('API del Banco')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
